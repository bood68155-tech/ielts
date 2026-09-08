/* ============================================================
   IELTS PA — authentication, user profiles & level system
   Supports: register, login, logout, email verification,
   session persistence, and Neon DB profile state reload.
   Accounts sync to Neon DB when configured; otherwise they live
   in localStorage. Demo auth — not real security.
   ============================================================ */
(function () {
  'use strict';

  const { LEVELS, LEVEL_UNLOCKS, XP_REWARDS } = window.IELTS_DATA;

  const USERS_KEY = 'ielts-users';
  const SESSION_KEY = 'ielts-session';
  const VERIFICATION_KEY = 'ielts-verification';

  const $ = (sel) => document.querySelector(sel);
  const db = () => window.IELTS_DB || null;

  // ============================================================================
  // PASSWORD HASHING (demo-only, not for real security)
  // ============================================================================
  function hashPassword(pw) {
    let h = 5381;
    const salted = 'ielts::' + pw;
    for (let i = 0; i < salted.length; i++) {
      h = ((h << 5) + h + salted.charCodeAt(i)) | 0;
    }
    return 'h' + (h >>> 0).toString(16);
  }

  // ============================================================================
  // LOCAL STORAGE HELPERS
  // ============================================================================
  function loadUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveUsers(users) {
    try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch (e) { /* ignore quota errors */ }
  }

  function getUser(username) {
    const users = loadUsers();
    return users.find((u) => u.username.toLowerCase() === String(username).trim().toLowerCase());
  }

  function getuserByEmail(email) {
    const users = loadUsers();
    return users.find((u) => u.email.toLowerCase() === String(email).trim().toLowerCase());
  }

  function currentSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
    catch (e) { return null; }
  }

  function getVerificationToken() {
    try { return JSON.parse(localStorage.getItem(VERIFICATION_KEY)) || null; }
    catch (e) { return null; }
  }

  function setVerificationToken(token, email) {
    try { localStorage.setItem(VERIFICATION_KEY, JSON.stringify({ token, email, createdAt: Date.now() })); } catch (e) {}
  }

  function clearVerificationToken() {
    try { localStorage.removeItem(VERIFICATION_KEY); } catch (e) {}
  }

  // ============================================================================
  // ID GENERATION
  // ============================================================================
  function idFromUsername(username) {
    let h = 0;
    const s = String(username).toLowerCase();
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return 'u' + h.toString(36);
  }

  function generateUserId() {
    return 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function generateVerificationCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // ============================================================================
  // USER OBJECT CONSTRUCTION
  // ============================================================================
  function createUserObject(username, email, passwordHash, userId) {
    const now = Date.now();
    return {
      userId: userId || generateUserId(),
      username: username,
      email: email || '',
      passwordHash: passwordHash,
      createdAt: now,
      updatedAt: now,
      xp: 0,
      claims: [],
      examHistory: [],
      displayName: username,
      fullName: '',
      bio: '',
      targetBand: '',
      avatar: null,
      training: {},
      activity: [],
      emailVerified: false,
      emailVerificationCode: null,
      emailVerificationSentAt: null
    };
  }

  function userFromRemote(remote) {
    return Object.assign(createUserObject(
      remote.username,
      remote.email || '',
      remote.passwordHash,
      remote.userId
    ), {
      xp: remote.xp || 0,
      claims: remote.claims || [],
      createdAt: remote.createdAt || Date.now(),
      updatedAt: remote.updatedAt || Date.now(),
      displayName: remote.displayName || remote.username,
      fullName: remote.fullName || '',
      bio: remote.bio || '',
      targetBand: remote.targetBand || '',
      avatar: remote.avatar || null,
      training: remote.training || {},
      activity: remote.activity || [],
      emailVerified: remote.emailVerified || false,
      emailVerificationCode: remote.emailVerificationCode || null,
      emailVerificationSentAt: remote.emailVerificationSentAt || null
    });
  }

  // ============================================================================
  // CURRENT USER STATE
  // ============================================================================
  let currentUser = null;
  let activeUserId = null;

  function getCurrentUser() {
    return currentUser;
  }

  function getActiveUserId() {
    return activeUserId;
  }

  // ============================================================================
  // USER-SCOPED STORAGE
  // ============================================================================
  function scopedKey(suffix) {
    return 'user_' + (activeUserId || 'guest') + '_' + suffix;
  }

  function getScoped(suffix, fallback) {
    try {
      const raw = localStorage.getItem(scopedKey(suffix));
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }

  function setScoped(suffix, value) {
    const ts = Date.now();
    if (suffix === 'profile') {
      try { value = Object.assign({}, value, { updatedAt: ts }); } catch (e) { /* ignore */ }
    }
    localStorage.setItem(scopedKey(suffix), JSON.stringify(value));
    pushScopedToDb(suffix, value, ts);
  }

  function removeScoped(suffix) {
    localStorage.removeItem(scopedKey(suffix));
  }

  // ============================================================================
  // NEON DB SYNC LAYER
  // ============================================================================
  function pushScopedToDb(suffix, value, ts) {
    const d = db();
    if (!d || !d.isConfigured() || !activeUserId) return;

    if (suffix === 'profile') {
      d.upsertProfile(activeUserId, value);
    } else if (suffix === 'training') {
      if (value && typeof value === 'object' && Object.keys(value).length) {
        d.upsertTraining(activeUserId, value);
        d.setMeta(activeUserId, { trainingUpdatedAt: ts });
      }
    } else if (suffix === 'words') {
      if (value && typeof value === 'object' && Object.keys(value).length) {
        d.upsertSavedWords(activeUserId, value);
        d.setMeta(activeUserId, { wordsUpdatedAt: ts });
      }
    } else if (suffix === 'study') {
      if (value && typeof value === 'object' && Object.keys(value).length) {
        d.upsertStudyLog(activeUserId, value);
        d.setMeta(activeUserId, { studyUpdatedAt: ts });
      }
    } else if (suffix === 'diagnostics') {
      if (value && typeof value === 'object' && Object.keys(value).length) {
        d.upsertDiagnostics(activeUserId, value);
        d.setMeta(activeUserId, { diagnosticsUpdatedAt: ts });
      }
    }
  }

  function pushUserToDb() {
    const d = db();
    if (!d || !d.isConfigured() || !currentUser) return;
    clearTimeout(window._userPushTimer);
    window._userPushTimer = setTimeout(() => {
      d.upsertUser(currentUser);
      // Reload profile state from Neon DB after user update
      reloadProfileFromNeon();
    }, 400);
  }

  // ============================================================================
  // PROFILE STATE RELOAD FROM NEON DB
  // ============================================================================
  async function reloadProfileFromNeon() {
    const d = db();
    if (!d || !d.isConfigured() || !activeUserId) return;

    try {
      // Fetch fresh profile data from Neon DB
      const profile = await d.pullProfile(activeUserId);
      if (profile) {
        setScoped('profile', {
          displayName: profile.displayName,
          bio: profile.bio,
          targetBand: profile.targetBand,
          initialBand: profile.initialBand || '',
          avatar: profile.avatar,
          activity: profile.activity || [],
          updatedAt: profile.updatedAt
        });

        // Hydrate the placement cache from the DB baseline band so level
        // gating + the roadmap work on a fresh device before a new test.
        if (profile.initialBand) {
          const pl = getScoped('placement', null);
          if (!pl || !pl.completed) {
            const lvl = LEVELS.find((L) => L.id === profile.initialBand);
            if (lvl) setScoped('placement', { lastScore: null, lastTotal: null, lastLevel: lvl, completed: true, restored: true, savedAt: Date.now() });
          }
        }
      }

      // Fetch fresh training progress
      const training = await d.pullTraining(activeUserId);
      if (training && training.data) {
        setScoped('training', training.data);
      }

      // Fetch fresh saved words
      const words = await d.pullSavedWords(activeUserId);
      if (words && words.data) {
        setScoped('words', words.data);
      }

      // Fetch fresh study log
      const study = await d.pullStudyLog(activeUserId);
      if (study && study.data) {
        setScoped('study', study.data);
      }

      // Update current user object with any changes
      if (currentUser) {
        const localProfile = getScoped('profile', {});
        currentUser.displayName = localProfile.displayName || currentUser.displayName;
        currentUser.fullName = localProfile.displayName || currentUser.fullName;
        currentUser.bio = localProfile.bio || currentUser.bio;
        currentUser.targetBand = localProfile.targetBand || currentUser.targetBand;
        currentUser.avatar = localProfile.avatar || currentUser.avatar;
        currentUser.activity = localProfile.activity || currentUser.activity;
        currentUser.training = getScoped('training', {}) || currentUser.training;
        currentUser.save();
      }

      // Notify all modules to refresh their UI
      notifyUserChange();
      window.toast && window.toast('Profile synced from cloud ☁️');
    } catch (e) {
      console.warn('[auth] Failed to reload profile from Neon DB:', e);
    }
  }

  // ============================================================================
  // SESSION PERSISTENCE
  // ============================================================================
  function persistSession(username, userId) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        username: username,
        userId: userId,
        persistedAt: Date.now()
      }));
    } catch (e) { /* ignore */ }
  }

  function clearSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* ignore */ }
  }

  // ============================================================================
  // USER CHANGE NOTIFICATIONS
  // ============================================================================
  const userChangeHandlers = [];
  function onUserChange(cb) { userChangeHandlers.push(cb); }
  function notifyUserChange() {
    userChangeHandlers.forEach((cb) => { try { cb(); } catch (e) {} });
  }

  // ============================================================================
  // LEGACY DATA MIGRATION
  // ============================================================================
  function migrateLegacyData(user) {
    if (!user) return;

    if (getScoped('profile', null) === null) {
      setScoped('profile', {
        displayName: user.displayName || user.username,
        fullName: user.fullName || '',
        bio: user.bio || '',
        targetBand: user.targetBand || '',
        avatar: user.avatar || null,
        activity: Array.isArray(user.activity) ? user.activity.slice() : []
      });
    }

    if (getScoped('training', null) === null && user.training && Object.keys(user.training).length) {
      setScoped('training', user.training);
    }

    if (getScoped('exam', null) === null && Array.isArray(user.examHistory) && user.examHistory.length) {
      setScoped('exam', { history: user.examHistory.slice(), inProgress: null });
    }

    if (getScoped('words', null) === null && user.words) {
      setScoped('words', user.words);
    }

    if (getScoped('study', null) === null && user.studyLog) {
      setScoped('study', user.studyLog);
    }
  }

  // ============================================================================
  // LEVEL HELPERS
  // ============================================================================
  function getLevel(xp) {
    let lvl = LEVELS[0];
    for (const l of LEVELS) {
      if (xp >= l.minXp) lvl = l;
    }
    return lvl;
  }

  function getNextLevel(xp) {
    const idx = LEVELS.findIndex((l) => l.id === getLevel(xp).id);
    return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
  }

  // Placement baseline: the CEFR band diagnosed by the placement test, or null.
  function getPlacementBand() {
    if (!currentUser) return null;
    try {
      const c = getScoped('placement', null);
      return (c && c.completed && c.lastLevel) ? c.lastLevel : null;
    } catch (e) { return null; }
  }

  // Content unlocks are driven by XP level, upgraded to the diagnosed
  // placement band when the learner is stronger on paper than their XP.
  function isUnlocked(skill, index) {
    if (!currentUser) return false;
    const levelId = getLevel(currentUser.xp).id;
    let count = (LEVEL_UNLOCKS[skill] || {})[levelId] || 0;
    const band = getPlacementBand();
    if (band && band.id) {
      const bandCount = (LEVEL_UNLOCKS[skill] || {})[band.id] || 0;
      count = Math.max(count, bandCount);
    }
    return index < count;
  }

  // ============================================================================
  // USER SAVING
  // ============================================================================
  function saveCurrentUser() {
    if (!currentUser) return;
    currentUser.updatedAt = Date.now();
    const users = loadUsers();
    const i = users.findIndex((u) => u.username === currentUser.username);
    if (i >= 0) users[i] = currentUser;
    saveUsers(users);
    persistSession(currentUser.username, currentUser.userId);
    pushUserToDb();
  }

  // ============================================================================
  // XP & PROGRESSION
  // ============================================================================
  function addXp(amount) {
    if (!currentUser) return;
    const before = getLevel(currentUser.xp);
    currentUser.xp = Math.max(0, (currentUser.xp || 0) + amount);
    const after = getLevel(currentUser.xp);
    saveCurrentUser();
    if (after.id !== before.id) {
      window.toast && window.toast('🎉 Level up! You are now ' + after.name + ' (' + after.icon + ')');
    }
    refreshHeader();
    renderDashboardIfVisible();
  }

  // ============================================================================
  // EXAM HISTORY
  // ============================================================================
  function recordExam(week, score, total, secondsUsed) {
    if (!currentUser) return;
    const entry = {
      id: 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      week, score, total, secondsUsed, date: Date.now()
    };
    const state = getScoped('exam', null) || { history: [], inProgress: null };
    if (!Array.isArray(state.history)) state.history = [];
    state.history.push(entry);
    setScoped('exam', state);
    if (!currentUser.examHistory) currentUser.examHistory = [];
    currentUser.examHistory.push(Object.assign({}, entry));
    saveCurrentUser();
    const d = db();
    if (d && d.isConfigured() && activeUserId) {
      d.insertExamResult({ id: entry.id, userId: activeUserId, week, score, total, secondsUsed, date: entry.date });
    }
  }

  function getExamHistory() {
    const state = getScoped('exam', null);
    if (state && Array.isArray(state.history)) return state.history.slice();
    return currentUser && currentUser.examHistory ? currentUser.examHistory.slice() : [];
  }

  // ============================================================================
  // COMPLETION CLAIMS
  // ============================================================================
  function claimCompleted(claimKey) {
    if (!currentUser) return false;
    if (!currentUser.claims) currentUser.claims = [];
    return currentUser.claims.includes(claimKey);
  }

  function completeClaim(claimKey) {
    if (!currentUser) return false;
    if (!currentUser.claims) currentUser.claims = [];
    if (currentUser.claims.includes(claimKey)) return false;
    currentUser.claims.push(claimKey);
    saveCurrentUser();
    return true;
  }

  // ============================================================================
  // HEADER UI
  // ============================================================================
  function refreshHeader() {
    const user = currentUser;
    const chip = $('#user-chip');
    const signout = $('#signout-btn');
    const loginCta = $('#header-login-cta');
    if (!chip || !signout) return;

    if (user) {
      chip.classList.remove('hidden');
      signout.classList.remove('hidden');
      if (loginCta) loginCta.classList.add('hidden');
      $('#user-avatar').textContent = (user.fullName && user.fullName.charAt(0)) || user.username.charAt(0).toUpperCase();
      $('#user-name').textContent = user.fullName || user.username;
      $('#user-level-badge').textContent = getLevel(user.xp).name;
      $('#user-level-badge').className = 'text-[10px] font-bold px-2 py-0.5 rounded-full level-badge-' + getLevel(user.xp).color;
      $('#user-xp').textContent = user.xp + ' XP';
    } else {
      chip.classList.add('hidden');
      signout.classList.add('hidden');
      if (loginCta) loginCta.classList.remove('hidden');
    }
  }

  function renderDashboardIfVisible() {
    if (window.__IELTS_STATE && window.__IELTS_STATE.currentSection === 'dashboard' && window.renderDashboard) {
      window.renderDashboard();
    }
  }

  // ============================================================================
  // AUTH SCREEN CONTROL
  // ============================================================================
  function showScreen() {
    const el = $('#auth-screen');
    if (el) {
      el.classList.remove('hidden');
      el.classList.add('flex');
    }
  }

  function hideScreen() {
    const el = $('#auth-screen');
    if (el) {
      el.classList.add('hidden');
      el.classList.remove('flex');
    }
  }

  function switchTab(tab) {
    const loginTab = $('#auth-tab-login');
    const regTab = $('#auth-tab-register');
    const loginForm = $('#auth-form-login');
    const regForm = $('#auth-form-register');
    const err = $('#auth-error');
    if (loginTab) loginTab.classList.toggle('active', tab === 'login');
    if (regTab) regTab.classList.toggle('active', tab === 'register');
    if (loginForm) loginForm.classList.toggle('hidden', tab !== 'login');
    if (regForm) regForm.classList.toggle('hidden', tab !== 'register');
    if (err) err.classList.add('hidden');
  }

  function showError(msg) {
    const el = $('#auth-error');
    el.textContent = msg;
    el.classList.remove('hidden');
  }

  function showSuccess(msg) {
    const el = $('#auth-success');
    if (el) {
      el.textContent = msg;
      el.classList.remove('hidden');
    }
  }

  function hideSuccess() {
    const el = $('#auth-success');
    if (el) el.classList.add('hidden');
  }

  // ============================================================================
  // EMAIL VERIFICATION
  // ============================================================================
  async function sendVerificationEmail(email, username) {
    const verificationCode = generateVerificationCode();
    const verificationUrl = `${window.location.origin}${window.location.pathname}?verify-email=${verificationCode}`;

    // Store verification token locally
    setVerificationToken(verificationCode, email);

    // Try to send via email service if configured
    const emailServiceUrl = localStorage.getItem('ielts-email-service-url');
    if (emailServiceUrl) {
      try {
        await fetch(emailServiceUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            subject: 'Verify your IELTS PA account',
            html: `
                              <h1>Email Verification</h1>
                              <p>Hello ${username},</p>
                              <p>Please click the link below to verify your email address:</p>
                              <p><a href="${verificationUrl}" style="background-color: #009736; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
                              <p>Or copy and paste this code: <strong>${verificationCode}</strong></p>
                              <p>This link expires in 24 hours.</p>
                            `
          })
        });
      } catch (e) {
        console.warn('[auth] Failed to send verification email:', e);
      }
    }

    // Show verification UI
    showVerificationUI(verificationCode, email, username);
    return verificationCode;
  }

  function showVerificationUI(code, email, username) {
    const verificationContainer = $('#verification-container');
    const authForms = $('.auth-forms-container');

    if (verificationContainer && authForms) {
      verificationContainer.classList.remove('hidden');
      authForms.classList.add('hidden');

      verificationContainer.innerHTML = `
        <div class="verification-content">
          <div class="verification-icon">📧</div>
          <h3 class="verification-title">Check Your Email</h3>
          <p class="verification-subtitle">A verification code has been sent to <strong>${escapeHtml(email)}</strong></p>
          <p class="verification-subtitle" style="margin-bottom: 1rem;">Enter the code below to verify your email address</p>
          <div class="verification-digits">
            ${Array(6).fill(0).map((_, i) => `
              <input type="text" maxlength="1" class="verification-digit" data-index="${i}" autocomplete="off">
            `).join('')}
          </div>
          <div class="verification-actions">
            <button id="verify-email-btn" class="btn-primary">Verify Email</button>
          </div>
          <p class="verification-meta">
            Didn't receive the code? 
            <button type="button" id="resend-verification">Resend</button>
          </p>
          <button id="skip-verification" class="verification-skip">
            Skip for now (continue as guest)
          </button>
        </div>
      `;

      // Setup verification inputs
      setupVerificationInputs(code, email, username);
    }
  }

  function setupVerificationInputs(code, email, username) {
    const inputs = document.querySelectorAll('.verification-digit');
    let currentIndex = 0;

    inputs.forEach((input, index) => {
      input.addEventListener('input', function(e) {
        const value = this.value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
        this.value = value;

        if (value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }

        // Auto-submit when all digits are filled
        if (inputs.length === inputs.filter(i => i.value).length) {
          verifyEmailCode(code, email, username);
        }
      });

      input.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && !this.value && index > 0) {
          inputs[index - 1].focus();
          inputs[index - 1].value = '';
        }
      });

      input.addEventListener('focus', function() {
        currentIndex = index;
      });
    });

    // Verify button
    const verifyBtn = $('#verify-email-btn');
    if (verifyBtn) {
      verifyBtn.addEventListener('click', () => {
        verifyEmailCode(code, email, username);
      });
    }

    // Resend button
    const resendBtn = $('#resend-verification');
    if (resendBtn) {
      resendBtn.addEventListener('click', () => {
        sendVerificationEmail(email, username);
      });
    }

    // Skip verification
    const skipBtn = $('#skip-verification');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        clearVerificationToken();
        hideScreen();
        window.toast && window.toast('Email verification skipped. You can verify later in settings.');
      });
    }
  }

  async function verifyEmailCode(code, email, username) {
    const inputs = document.querySelectorAll('.verification-digit');
    const enteredCode = Array.from(inputs).map(i => i.value).join('');

    if (enteredCode.length !== 6) {
      showError('Please enter the complete 6-digit code.');
      return;
    }

    const verificationToken = getVerificationToken();
    if (!verificationToken || verificationToken.email !== email) {
      showError('Verification session expired. Please try again.');
      return;
    }

    // Check if code matches
    if (enteredCode.toUpperCase() !== code.toUpperCase()) {
      showError('Incorrect verification code. Please try again.');
      inputs.forEach(i => i.value = '');
      inputs[0].focus();
      return;
    }

    // Update user with verified status
    const users = loadUsers();
    const userIndex = users.findIndex(u => u.email === email && u.username === username);

    if (userIndex >= 0) {
      users[userIndex].emailVerified = true;
      users[userIndex].emailVerificationCode = null;
      users[userIndex].emailVerificationSentAt = null;
      saveUsers(users);

      // Update current user if logged in
      if (currentUser && currentUser.email === email) {
        currentUser.emailVerified = true;
        currentUser.emailVerificationCode = null;
        currentUser.emailVerificationSentAt = null;
        saveCurrentUser();
      }

      // Save to Neon DB
      const d = db();
      if (d && d.isConfigured() && currentUser) {
        d.upsertUser(currentUser);
      }

      clearVerificationToken();
      hideScreen();
      window.toast && window.toast('✅ Email verified successfully! Welcome to IELTS PA.');
      hideSuccess();
    }
  }

  // Check URL for verification code parameter
  function checkUrlVerification() {
    const urlParams = new URLSearchParams(window.location.search);
    const verificationCode = urlParams.get('verify-email');

    if (verificationCode) {
      const storedToken = getVerificationToken();
      if (storedToken && storedToken.token.toUpperCase() === verificationCode.toUpperCase()) {
        const users = loadUsers();
        const userIndex = users.findIndex(u => u.email === storedToken.email);

        if (userIndex >= 0) {
          users[userIndex].emailVerified = true;
          users[userIndex].emailVerificationCode = null;
          users[userIndex].emailVerificationSentAt = null;
          saveUsers(users);

          if (currentUser && currentUser.email === storedToken.email) {
            currentUser.emailVerified = true;
            currentUser.emailVerificationCode = null;
            currentUser.emailVerificationSentAt = null;
            saveCurrentUser();
          }

          clearVerificationToken();
          window.history.replaceState({}, document.title, window.location.pathname);
          window.toast && window.toast('✅ Email verified successfully! Welcome to IELTS PA.');
          return true;
        }
      }
    }
    return false;
  }

  // ============================================================================
  // REGISTRATION
  // ============================================================================
  async function register(event) {
    if (event) event.preventDefault();
    hideError();
    hideSuccess();

    const username = $('#reg-username').value.trim();
    const email = $('#reg-email').value.trim();
    const fullName = $('#reg-fullname').value.trim();
    const password = $('#reg-password').value;
    const password2 = $('#reg-password2').value;

    // Validation
    if (username.length < 3) return showError('Username must be at least 3 characters.');
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return showError('Username can only contain letters, numbers, and underscores.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showError('Please enter a valid email address.');
    if (password.length < 6) return showError('Password must be at least 6 characters.');
    if (password !== password2) return showError('Passwords do not match.');

    // Check if username exists
    if (getUser(username)) return showError('That username is already taken.');

    // Check if email exists
    if (getuserByEmail(email)) return showError('That email is already registered.');

    // Check database for existing accounts
    const d = db();
    if (d && d.isConfigured()) {
      const existingUsername = await d.pullUserByUsername(username);
      if (existingUsername) return showError('That username is already taken.');

      const existingEmail = await d.pullUserByEmail(email);
      if (existingEmail) return showError('That email is already registered.');
    }

    // Create new user
    const now = Date.now();
    const newUser = createUserObject(username, email, hashPassword(password), null);
    newUser.userId = generateUserId();
    newUser.displayName = fullName || username;
    newUser.fullName = fullName || '';
    newUser.emailVerificationCode = generateVerificationCode();
    newUser.emailVerificationSentAt = now;

    // Save to local storage
    const users = loadUsers();
    users.push(newUser);
    saveUsers(users);

    // Save to Neon DB
    if (d && d.isConfigured()) {
      await d.upsertUser(newUser);
    }

    // Send verification email
    const verificationCode = await sendVerificationEmail(email, username);

    // Sign in the user
    signInAs(username);

    window.toast && window.toast('Account created! Please verify your email. 📧');
  }

  // ============================================================================
  // LOGIN
  // ============================================================================
  async function login(event) {
    if (event) event.preventDefault();
    hideError();
    hideSuccess();

    const identifier = $('#login-username').value.trim();
    const password = $('#login-password').value;

    if (!identifier) return showError('Please enter your username or email.');
    if (!password) return showError('Please enter your password.');

    let user = null;

    // Try to find user by username first, then by email
    user = getUser(identifier);
    if (!user) {
      user = getuserByEmail(identifier);
    }

    // If not found locally, check database
    if (!user) {
      const d = db();
      if (d && d.isConfigured()) {
        const remote = await d.pullUserByUsername(identifier);
        if (remote && remote.passwordHash === hashPassword(password)) {
          user = userFromRemote(remote);
          const users = loadUsers();
          if (!users.some((u) => u.username === user.username)) {
            users.push(user);
            saveUsers(users);
          }
        } else if (!remote) {
          // Try by email
          const remoteByEmail = await d.pullUserByEmail(identifier);
          if (remoteByEmail && remoteByEmail.passwordHash === hashPassword(password)) {
            user = userFromRemote(remoteByEmail);
            const users = loadUsers();
            if (!users.some((u) => u.username === user.username)) {
              users.push(user);
              saveUsers(users);
            }
          }
        }
      }
    }

    // Verify password
    if (!user || user.passwordHash !== hashPassword(password)) {
      return showError('Incorrect username/email or password.');
    }

    // Check if email is verified (optional - can be configured)
    if (user.email && !user.emailVerified) {
      // Prompt for email verification
      if (confirm('Your email address has not been verified yet. Would you like to verify it now?')) {
        await sendVerificationEmail(user.email, user.username);
      }
      // Continue login anyway (can be changed to require verification)
    }

    signInAs(user.username);
    window.toast && window.toast('Welcome back, ' + (user.fullName || user.username) + '!');
    if (window.showSection) window.showSection('dashboard');
  }

  // ============================================================================
  // SIGN IN AS (internal helper)
  // ============================================================================
  function signInAs(username) {
    const users = loadUsers();
    const user = users.find((u) => u.username === username) || null;
    if (user) {
      activateUser(user, user.userId);
    } else {
      currentUser = null;
      activeUserId = null;
      clearSession();
      showScreen();
      refreshHeader();
      notifyUserChange();
    }
  }

  // ============================================================================
  // LOGOUT
  // ============================================================================
  function logout() {
    currentUser = null;
    activeUserId = null;
    clearTimeout(window._userPushTimer);
    clearSession();
    refreshHeader();
    showScreen();
    switchTab('login');
    if (window.showSection) window.showSection('dashboard');
    window.toast && window.toast('Signed out. See you soon! 👋');
    notifyUserChange();
  }

  // ============================================================================
  // ACTIVATE USER (called after login/registration/session restore)
  // ============================================================================
  function activateUser(user, sessionUserId) {
    currentUser = user;
    if (!currentUser.userId) currentUser.userId = sessionUserId || idFromUsername(currentUser.username);
    activeUserId = currentUser.userId;
    migrateLegacyData(currentUser);
    persistSession(currentUser.username, currentUser.userId);
    hideScreen();
    refreshHeader();
    renderDashboardIfVisible();
    notifyUserChange();

    // Reload profile state from Neon DB on activation
    reloadProfileFromNeon();

    // Start background sync
    startBackgroundSync();
  }

  // ============================================================================
  // SESSION RESTORE
  // ============================================================================
  async function restoreSession(session) {
    if (!session || !session.username) {
      showGuest();
      return;
    }

    let user = getUser(session.username);
    if (!user) {
      // Try to restore from Neon DB
      const d = db();
      if (d && d.isConfigured()) {
        try {
          const remote = await d.pullUserByUsername(session.username);
          if (remote && remote.passwordHash) {
            user = userFromRemote(remote);
            const users = loadUsers();
            if (!users.some((u) => u.username === user.username)) {
              users.push(user);
              saveUsers(users);
            }
          }
        } catch (e) { /* fall through to guest state */ }
      }
    }

    if (user) {
      activateUser(user, session.userId || user.userId);
    } else {
      clearSession();
      showGuest();
    }
  }

  function showGuest() {
    currentUser = null;
    activeUserId = null;
    showScreen();
    refreshHeader();
    notifyUserChange();
  }

  // ============================================================================
  // BACKGROUND SYNC
  // ============================================================================
  function startBackgroundSync() {
    const d = db();
    if (!d || !d.isConfigured() || !activeUserId) return;
    d.syncUserData(activeUserId).then(() => {
      if (window.IELTS_DB && window.IELTS_DB.onSynced) window.IELTS_DB.onSynced();
    });
  }

  // ============================================================================
  // PROFILE & ACTIVITY HELPERS
  // ============================================================================
  function updateProfile(updates) {
    if (!currentUser) return;
    const profile = getScoped('profile', null) || {
      displayName: currentUser.displayName || currentUser.username,
      fullName: currentUser.fullName || '',
      bio: '',
      targetBand: '',
      avatar: null,
      activity: []
    };
    Object.assign(profile, updates);
    setScoped('profile', profile);
    Object.assign(currentUser, updates);
    saveCurrentUser();

    // Reload from Neon DB to ensure state is current
    reloadProfileFromNeon();

    refreshHeader();
    renderDashboardIfVisible();
  }

  function addActivity(type, text, xp) {
    if (!currentUser) return;
    const profile = getScoped('profile', null) || {
      displayName: currentUser.displayName || currentUser.username,
      fullName: currentUser.fullName || '',
      bio: '',
      targetBand: '',
      avatar: null,
      activity: []
    };
    if (!Array.isArray(profile.activity)) profile.activity = [];
    profile.activity.unshift({ type, text, xp: xp || 0, date: Date.now() });
    if (profile.activity.length > 40) profile.activity.length = 40;
    setScoped('profile', profile);

    if (!currentUser.activity) currentUser.activity = [];
    currentUser.activity.unshift({ type, text, xp: xp || 0, date: Date.now() });
    if (currentUser.activity.length > 40) currentUser.activity.length = 40;
    saveCurrentUser();
  }

  function getUserByUsername(username) {
    return getUser(username) || null;
  }

  // ============================================================================
  // WIRE SYNC UI
  // ============================================================================
  function wireSyncUi() {
    if (window.IELTS_DB) {
      window.IELTS_DB.onSynced = function () {
        const s = window.__IELTS_STATE && window.__IELTS_STATE.currentSection;
        if (!s) return;
        if (s === 'profile' && window.IELTS_PROFILE) window.IELTS_PROFILE.render();
        else if (s === 'exam' && window.IELTS_EXAM) window.IELTS_EXAM.render();
        else if (s === 'training' && window.IELTS_TRAINING) window.IELTS_TRAINING.render();
        else if (s === 'levels' && window.IELTS_LEVELS) window.IELTS_LEVELS.render();
        else if (s === 'feed' && window.IELTS_FEED) window.IELTS_FEED.render();
        else if (s === 'readings' && window.IELTS_READINGS) window.IELTS_READINGS.render();
        else if (s === 'translator' && window.IELTS_TRANSLATOR) window.IELTS_TRANSLATOR.render();
        else if (s === 'study' && window.IELTS_STUDY) window.IELTS_STUDY.render();
        else if (s === 'words' && window.IELTS_VOCAB) window.IELTS_VOCAB.render();
        else if (s === 'chat' && window.IELTS_CHAT) window.IELTS_CHAT.render();
        else if (s === 'dashboard' && window.renderDashboard) window.renderDashboard();
      };
    }
  }

  // ============================================================================
  // ERROR/SUCCESS HELPERS
  // ============================================================================
  function hideError() {
    const el = $('#auth-error');
    if (el) el.classList.add('hidden');
  }

  function showErrorMessage(msg) {
    const el = $('#auth-error');
    el.textContent = msg;
    el.classList.remove('hidden');
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================
  function init() {
    wireSyncUi();

    // Check for email verification in URL first
    checkUrlVerification();

    // Restore session
    restoreSession(currentSession());

    // Setup cross-tab sync
    setupCrossTabSync();
  }

  function setupCrossTabSync() {
    if (typeof window === 'undefined') return;

    window.addEventListener('storage', function (e) {
      if (e.key !== SESSION_KEY) return;

      const session = currentSession();
      if (!session || !session.username) {
        if (currentUser) {
          currentUser = null;
          activeUserId = null;
          hideScreen();
          refreshHeader();
          notifyUserChange();
        }
        return;
      }

      const other = getUser(session.username);
      if (other && (!currentUser || currentUser.username !== other.username)) {
        activateUser(other, session.userId);
      }
    });
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================
  window.IELTS_AUTH = {
    // Core auth
    init,
    register,
    login,
    logout,
    switchTab,
    showScreen,
    hideScreen,

    // User state
    getCurrentUser,
    getLevel,
    getNextLevel,
    getPlacementBand,
    isUnlocked,
    addXp,
    recordExam,
    getExamHistory,
    claimCompleted,
    completeClaim,
    refreshHeader,
    updateProfile,
    addActivity,
    getUserByUsername,
    getActiveUserId,
    scopedKey,
    getScoped,
    setScoped,
    removeScoped,
    onUserChange,
    save: saveCurrentUser,

    // Email verification
    sendVerificationEmail,
    verifyEmailCode,
    checkUrlVerification,
    reloadProfileFromNeon
  };

  // Utility function for HTML escaping
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
})();
