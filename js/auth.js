/* ============================================================
   IELTS Master — authentication, user profiles & level system
   Demo auth: accounts live only in this browser (localStorage).
   ============================================================ */
(function () {
  'use strict';

  const { LEVELS, LEVEL_UNLOCKS, XP_REWARDS } = window.IELTS_DATA;

  const USERS_KEY = 'ielts-users';
  const SESSION_KEY = 'ielts-session';

  const $ = (sel) => document.querySelector(sel);

  /* --- tiny demo hash (not for real security; see note in UI) --- */
  function hashPassword(pw) {
    let h = 5381;
    const salted = 'ielts::' + pw;
    for (let i = 0; i < salted.length; i++) {
      h = ((h << 5) + h + salted.charCodeAt(i)) | 0;
    }
    return 'h' + (h >>> 0).toString(16);
  }

  function loadUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch (e) { return []; }
  }

  /* --- stable id for a username (used for migrated/legacy accounts) --- */
  function idFromUsername(username) {
    let h = 0;
    const s = String(username).toLowerCase();
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return 'u' + h.toString(36);
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getUser(username) {
    const users = loadUsers();
    return users.find((u) => u.username.toLowerCase() === String(username).trim().toLowerCase());
  }

  function currentSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
    catch (e) { return null; }
  }

  /* --- the user currently signed in (null if none) --- */
  let currentUser = null;

  function getCurrentUser() {
    return currentUser;
  }

  /* --- user-scoped storage: every data key is prefixed with the active user id --- */
  let activeUserId = null;

  function getActiveUserId() {
    return activeUserId;
  }

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
    localStorage.setItem(scopedKey(suffix), JSON.stringify(value));
  }

  function removeScoped(suffix) {
    localStorage.removeItem(scopedKey(suffix));
  }

  /* --- notify modules when the active user changes (login / logout / restore) --- */
  const userChangeHandlers = [];
  function onUserChange(cb) { userChangeHandlers.push(cb); }
  function notifyUserChange() {
    userChangeHandlers.forEach((cb) => { try { cb(); } catch (e) {} });
  }

  /* --- one-time move of legacy per-user data into scoped keys --- */
  function migrateLegacyData(user) {
    if (!user) return;
    if (getScoped('profile', null) === null) {
      setScoped('profile', {
        displayName: user.displayName || user.username,
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
  }

  function persistSession(username) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ username, userId: activeUserId }));
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  /* --- level helpers --- */
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

  function isUnlocked(skill, index) {
    if (!currentUser) return false;
    const levelId = getLevel(currentUser.xp).id;
    const count = (LEVEL_UNLOCKS[skill] || {})[levelId] || 0;
    return index < count;
  }

  /* --- persistence of the signed-in user's mutable profile --- */
  function saveCurrentUser() {
    if (!currentUser) return;
    const users = loadUsers();
    const i = users.findIndex((u) => u.username === currentUser.username);
    if (i >= 0) users[i] = currentUser;
    saveUsers(users);
    persistSession(currentUser.username);
  }

  /* --- XP & progression --- */
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

  /* --- record a weekly exam result for the current user --- */
  function recordExam(week, score, total, secondsUsed) {
    if (!currentUser) return;
    const state = getScoped('exam', null) || { history: [], inProgress: null };
    if (!Array.isArray(state.history)) state.history = [];
    state.history.push({ week, score, total, secondsUsed, date: Date.now() });
    setScoped('exam', state);
    // legacy mirror so older readers keep working
    if (!currentUser.examHistory) currentUser.examHistory = [];
    currentUser.examHistory.push({ week, score, total, secondsUsed, date: Date.now() });
    saveCurrentUser();
  }

  function getExamHistory() {
    const state = getScoped('exam', null);
    if (state && Array.isArray(state.history)) return state.history.slice();
    return currentUser && currentUser.examHistory ? currentUser.examHistory.slice() : [];
  }

  /* --- completion claims (which activities already gave XP) --- */
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

  /* --- header UI --- */
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
      $('#user-avatar').textContent = user.username.charAt(0).toUpperCase();
      $('#user-name').textContent = user.username;
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

  /* --- auth screen control --- */
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
    $('#auth-tab-login').classList.toggle('active', tab === 'login');
    $('#auth-tab-register').classList.toggle('active', tab === 'register');
    $('#auth-form-login').classList.toggle('hidden', tab !== 'login');
    $('#auth-form-register').classList.toggle('hidden', tab !== 'register');
    $('#auth-error').classList.add('hidden');
  }

  function showError(msg) {
    const el = $('#auth-error');
    el.textContent = msg;
    el.classList.remove('hidden');
  }

  function register(event) {
    if (event) event.preventDefault();
    const username = $('#reg-username').value.trim();
    const email = $('#reg-email').value.trim();
    const password = $('#reg-password').value;
    const password2 = $('#reg-password2').value;

    if (username.length < 3) return showError('Username must be at least 3 characters.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showError('Please enter a valid email address.');
    if (password.length < 6) return showError('Password must be at least 6 characters.');
    if (password !== password2) return showError('Passwords do not match.');
    if (getUser(username)) return showError('That username is already taken.');

    const users = loadUsers();
    users.push({
      userId: 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      username,
      email,
      passwordHash: hashPassword(password),
      createdAt: Date.now(),
      xp: 0,
      claims: [],
      examHistory: [],
      displayName: username,
      bio: '',
      targetBand: '',
      avatar: null,
      training: {},
      activity: []
    });
    saveUsers(users);

    signInAs(username);
    window.toast && window.toast('Account created — welcome, ' + username + '! 🎉');
    if (window.showSection) window.showSection('dashboard');
  }

  function login(event) {
    if (event) event.preventDefault();
    const username = $('#login-username').value.trim();
    const password = $('#login-password').value;
    const user = getUser(username);
    if (!user || user.passwordHash !== hashPassword(password)) {
      return showError('Incorrect username or password.');
    }
    signInAs(user.username);
    window.toast && window.toast('Welcome back, ' + user.username + '!');
    if (window.showSection) window.showSection('dashboard');
  }

  function signInAs(username) {
    const users = loadUsers();
    currentUser = users.find((u) => u.username === username) || null;
    if (currentUser) {
      if (!currentUser.userId) currentUser.userId = idFromUsername(currentUser.username);
      activeUserId = currentUser.userId;
      migrateLegacyData(currentUser);
    } else {
      activeUserId = null;
    }
    persistSession(username);
    hideScreen();
    refreshHeader();
    renderDashboardIfVisible();
    notifyUserChange();
  }

  function logout() {
    currentUser = null;
    activeUserId = null;
    clearSession();
    refreshHeader();
    showScreen();
    switchTab('login');
    if (window.showSection) window.showSection('dashboard');
    window.toast && window.toast('Signed out. See you soon!');
    notifyUserChange();
  }

  /* --- profile & activity helpers --- */
  function updateProfile(updates) {
    if (!currentUser) return;
    const profile = getScoped('profile', null) || {
      displayName: currentUser.displayName || currentUser.username,
      bio: '', targetBand: '', avatar: null, activity: []
    };
    Object.assign(profile, updates);
    setScoped('profile', profile);
    Object.assign(currentUser, updates);
    saveCurrentUser();
    refreshHeader();
    renderDashboardIfVisible();
  }

  function addActivity(type, text, xp) {
    if (!currentUser) return;
    const profile = getScoped('profile', null) || {
      displayName: currentUser.displayName || currentUser.username,
      bio: '', targetBand: '', avatar: null, activity: []
    };
    if (!Array.isArray(profile.activity)) profile.activity = [];
    profile.activity.unshift({ type, text, xp: xp || 0, date: Date.now() });
    if (profile.activity.length > 40) profile.activity.length = 40;
    setScoped('profile', profile);
    // legacy mirror so older readers keep working
    if (!currentUser.activity) currentUser.activity = [];
    currentUser.activity.unshift({ type, text, xp: xp || 0, date: Date.now() });
    if (currentUser.activity.length > 40) currentUser.activity.length = 40;
    saveCurrentUser();
  }

  function getUserByUsername(username) {
    return getUser(username) || null;
  }

  /* --- init: restore session or show the auth screen --- */
  function init() {
    const session = currentSession();
    if (session && session.username) {
      const user = getUser(session.username);
      if (user) {
        currentUser = user;
        if (!currentUser.userId) currentUser.userId = session.userId || idFromUsername(currentUser.username);
        activeUserId = currentUser.userId;
        migrateLegacyData(currentUser);
        hideScreen();
        refreshHeader();
        notifyUserChange();
        return;
      }
    }
    currentUser = null;
    activeUserId = null;
    showScreen();
    refreshHeader();
    notifyUserChange();
  }

  window.IELTS_AUTH = {
    init,
    register,
    login,
    logout,
    switchTab,
    showScreen,
    hideScreen,
    getCurrentUser,
    getLevel,
    getNextLevel,
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
    save: saveCurrentUser
  };
})();
