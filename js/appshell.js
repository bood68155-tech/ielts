/* ============================================================
   IELTS PA — appshell.js
   Install banner · daily reminders · offline sync · streak &
   study calendar · band certificate · new-version updater.
   Loads LAST (after app.js) so dashboard is already rendered.
   ============================================================ */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const T = () => (window.I18N ? window.I18N.t : (k) => k)();
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const storeGet = (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } };
  const storeSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } };
  const toast = (m) => window.toast && window.toast(m);
  const LISTEN = 'ielts:langchanged';

  /* ---------------- Root mount ---------------- */
  function ensureRoot() {
    if ($('appshell-root')) return $('appshell-root');
    const root = document.createElement('div');
    root.id = 'appshell-root';
    document.body.appendChild(root);
    return root;
  }
  function ensureCards() {
    let cards = $('appshell-cards');
    if (!cards) {
      const anchor = $('#dashboard-roadmap');
      if (!anchor) return null;
      const wrap = document.createElement('div');
      wrap.id = 'appshell-cards';
      anchor.after(wrap);
      cards = wrap;
    }
    return cards;
  }

  /* ============================================================
     1. INSTALL BANNER
     ============================================================ */
  const INSTALL_HIDE_KEY = 'ielts-install-hide';
  let deferredPrompt = null;
  function isStandalone() {
    return window.matchMedia && (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true);
  }
  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }
  function installDismissedRecently() {
    const t = parseInt(storeGet(INSTALL_HIDE_KEY, '0'), 10);
    return t && (Date.now() - t) < 3 * 24 * 3600 * 1000;
  }
  function hideInstallBanner() {
    const b = $('install-banner');
    if (b) b.remove();
  }
  function showInstallBanner(kind) {
    if (isStandalone() || installDismissedRecently() || $('install-banner')) return;
    const root = ensureRoot();
    const div = document.createElement('div');
    div.id = 'install-banner';
    let body = T('install_desc_android');
    if (kind === 'ios') body = T('install_desc_ios');
    div.innerHTML =
      '<div class="shell-banner shell-install">' +
        '<button class="shell-banner-x" aria-label="Close">&times;</button>' +
        '<div class="shell-banner-body">' +
          '<img src="icons/icon-192.png" alt="" width="34" height="34" class="shell-install-icon" decoding="async">' +
          '<div><div class="shell-banner-title">' + T('install_title') + '</div>' +
          '<div class="shell-banner-text">' + body + '</div></div>' +
        '</div>' +
        '<div class="shell-banner-actions">' +
          (kind === 'ios' ? '' : '<button class="shell-btn" id="install-now">' + T('install_btn') + '</button>') +
          '<button class="shell-btn ghost" id="install-dismiss">' + T('install_dismiss') + '</button>' +
        '</div>' +
      '</div>';
    root.appendChild(div);
    const nowBtn = $('install-now');
    if (nowBtn) nowBtn.addEventListener('click', async function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      try { await deferredPrompt.userChoice; } catch (e) { /* ignore */ }
      deferredPrompt = null;
      hideInstallBanner();
    });
    div.querySelector('[id="install-dismiss"]').addEventListener('click', function () {
      storeSet(INSTALL_HIDE_KEY, String(Date.now()));
      hideInstallBanner();
    });
    div.querySelector('.shell-banner-x').addEventListener('click', function () {
      storeSet(INSTALL_HIDE_KEY, String(Date.now()));
      hideInstallBanner();
    });
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner('android');
  });
  window.addEventListener('appinstalled', hideInstallBanner);
  if (!isStandalone() && isIOS() && !installDismissedRecently() && document.readyState !== 'loading') {
    showInstallBanner('ios');
  }

  /* ============================================================
     2. DAILY STUDY REMINDERS
     ============================================================ */
  const REMIND_KEY = 'ielts-remind-enabled';
  const REMIND_TIME = 'ielts-remind-time';
  const REMIND_LAST = 'ielts-remind-last';
  function remindersEnabled() { return storeGet(REMIND_KEY, '') === 'on'; }
  function dayKey() { return new Date().toISOString().slice(0, 10); }
  function notificationsSupported() { return 'Notification' in window && 'serviceWorker' in navigator; }
  function notifyNow(title, body) {
    if (!notificationsSupported()) return Promise.resolve(false);
    return navigator.serviceWorker.ready.then(function (reg) {
      return reg.showNotification(title || T('notify_banner_title'), {
        body: body || T('notify_banner_body'),
        icon: 'icons/icon-192.png',
        badge: 'icons/favicon.png',
        tag: 'ielts-daily-reminder',
        vibrate: [120, 60, 120]
      });
    }).catch(function () { return false; });
  }
  function minutesNow() {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  }
  function targetMinutes() {
    const t = storeGet(REMIND_TIME, '18:00').split(':');
    return parseInt(t[0], 10) * 60 + parseInt(t[1], 10);
  }
  function reminderTick() {
    if (!remindersEnabled()) return;
    if (storeGet(REMIND_LAST, '') === dayKey()) return;
    if (minutesNow() < targetMinutes()) return;
    if (document.hidden) return;
    storeSet(REMIND_LAST, dayKey());
    notifyNow();
  }
  function requestPermission() {
    if (!notificationsSupported()) return Promise.resolve('unsupported');
    return Notification.requestPermission();
  }

  /* ============================================================
     3. OFFLINE SYNC QUEUE
     ============================================================ */
  const SYNC_KEY = 'ielts-sync-queue';
  function loadQueue() { try { return JSON.parse(localStorage.getItem(SYNC_KEY) || '[]'); } catch (e) { return []; } }
  function saveQueue(q) { try { localStorage.setItem(SYNC_KEY, JSON.stringify(q)); } catch (e) { /* ignore */ } }
  const dbConfigured = () => !!(window.IELTS_DB && typeof window.IELTS_DB.isConfigured === 'function' && window.IELTS_DB.isConfigured());

  const IELTS_SYNC = {
    push: function (type, payload) {
      try {
        const q = loadQueue();
        q.push({ type: type, payload: payload, at: Date.now() });
        saveQueue(q);
      } catch (e) { /* never break the caller */ }
      renderCards();
    },
    flush: function () {
      if (!navigator.onLine || !window.IELTS_DB) return;
      let q = loadQueue();
      if (!q.length) return;
      if (!dbConfigured()) {
        // No live backend: data already lives in local storage — nothing to push.
        saveQueue([]);
        renderCards();
        return;
      }
      const tableMap = { activity: 'training', exam: 'examHistory', study: 'studyLog' };
      const rest = [];
      q.forEach(function (item) {
        const table = tableMap[item.type] || 'training';
        const payload = item.payload || {};
        const body = Object.assign({}, payload, item.type === 'exam' ? { week: payload.week, score: payload.score, total: payload.total, secondsUsed: payload.secondsUsed } : {});
        const ok = (function () {
          try {
            if (typeof IELT_DB.upsert === 'function') return IELT_DB.upsert(table, body);
            if (typeof IELT_DB.insert === 'function') return IELT_DB.insert(table, body);
          } catch (e) { return null; }
          return null;
        })();
        if (ok && typeof ok.then === 'function') { if (!ok) rest.push(item); else ok.catch(function () { rest.push(item); }); }
        else if (!ok) rest.push(item);
      });
      saveQueue(rest);
      if (q.length !== rest.length) toast(T('sync_ok') + ' ✓');
      renderCards();
    }
  };
  window.IELTS_SYNC = IELTS_SYNC;
  window.addEventListener('online', function () {
    IELTS_SYNC.flush();
    const pending = loadQueue().length;
    if (pending) toast(pending + ' ' + T('sync_pending'));
  });
  window.addEventListener('offline', function () { renderCards(); });

  // Patch the two main activity writers so their results are queued
  // for retry whenever the network comes back.
  function patchAuth() {
    try {
      const A = window.IELTS_AUTH;
      if (!A) return;
      const origExam = A.recordExam;
      if (origExam && !origExam.__patched) {
        A.recordExam = function () {
          const r = origExam.apply(this, arguments);
          try { IELTS_SYNC.push('exam', { week: arguments[0], score: arguments[1], total: arguments[2], secondsUsed: arguments[3] }); } catch (e) { /* ignore */ }
          return r;
        };
        A.recordExam.__patched = true;
      }
      const origAct = A.addActivity;
      if (origAct && !origAct.__patched) {
        A.addActivity = function () {
          const r = origAct.apply(this, arguments);
          try { IELTS_SYNC.push('activity', { type: arguments[0], text: arguments[1], xp: arguments[2] }); } catch (e) { /* ignore */ }
          return r;
        };
        A.addActivity.__patched = true;
      }
    } catch (e) { /* ignore */ }
  }

  /* ============================================================
     4. STREAK + STUDY CALENDAR
     ============================================================ */
  function studyData() {
    try {
      if (window.IELTS_AUTH && typeof window.IELTS_AUTH.getScoped === 'function') {
        return window.IELTS_AUTH.getScoped('study', null);
      }
    } catch (e) { /* ignore */ }
    return null;
  }
  function computeStreak(days) {
    const active = Object.keys(days).filter((k) => (days[k] || 0) > 0).sort();
    if (!active.length) return 0;
    let streak = 0;
    const d = new Date();
    if (!active.includes(d.toISOString().slice(0, 10))) {
      d.setDate(d.getDate() - 1);
    }
    for (;;) {
      const key = d.toISOString().slice(0, 10);
      if (active.includes(key)) { streak++; d.setDate(d.getDate() - 1); }
      else break;
    }
    return streak;
  }
  function calendarGrid(days) {
    const cells = [];
    const d = new Date();
    d.setDate(d.getDate() - 41);
    for (let i = 0; i < 42; i++) {
      const key = d.toISOString().slice(0, 10);
      const secs = days[key] || 0;
      cells.push({ key, secs, today: key === dayKey(), active: secs > 0 });
      d.setDate(d.getDate() + 1);
    }
    return cells;
  }

  /* ============================================================
     5. BAND CERTIFICATE
     ============================================================ */
  function profileForCert() {
    try {
      const p = window.IELTS_AUTH && typeof window.IELTS_AUTH.getScoped === 'function' ? window.IELTS_AUTH.getScoped('profile', null) : null;
      return p || {};
    } catch (e) { return {}; }
  }
  function certData() {
    const prof = profileForCert();
    let name = prof.displayName || prof.fullName || prof.username || 'Learner';
    const user = window.IELTS_AUTH && window.IELTS_AUTH.getCurrentUser && window.IELTS_AUTH.getCurrentUser();
    if (user && (user.displayName || user.fullName || user.username)) name = user.displayName || user.fullName || user.username;
    let level = '';
    try {
      if (window.IELTS_AUTH && window.IELTS_AUTH.getLevel) {
        const l = window.IELTS_AUTH.getLevel(user && user.xp);
        if (l) level = l.name || l.id || l.label || '';
      }
    } catch (e) { /* ignore */ }
    let band = '';
    try {
      const pl = window.IELTS_AUTH && typeof window.IELTS_AUTH.getScoped === 'function' ? window.IELTS_AUTH.getScoped('placement', null) : null;
      if (pl) band = pl.lastBand != null ? String(pl.lastBand) : pl.lastLevel || '';
    } catch (e) { /* ignore */ }
    return { name: name, level: level, band: band };
  }
  function starPath(size, cx, cy, r) {
    // 8-point star silhouette
    let p = '';
    for (let i = 0; i < 8; i++) {
      const ang = (Math.PI / 8) * (2 * i) - Math.PI / 2;
      p += (i === 0 ? 'M' : 'L') + (cx + 0.382 * r * 1.1 * Math.cos(ang)).toFixed(1) + ' ' + (cy + 0.382 * r * 1.1 * Math.sin(ang)).toFixed(1) + ' ';
    }
    p += 'Z';
    return p;
  }
  function drawCertificate(name, level, bandLabel, dateStr) {
    const W = 1240, H = 1754, S = window.devicePixelRatio > 1 ? 2 : 1;
    const c = document.createElement('canvas');
    c.width = W * S; c.height = H * S;

    // High-res bitmap for crisp text at any zoom
    c.style.width = W + 'px'; c.style.height = H + 'px';
    const g = c.getContext('2d');
    g.scale(S, S);

    g.fillStyle = '#0f172a';
    g.fillRect(0, 0, W, H);
    // gold border
    g.strokeStyle = '#d4af37';
    g.lineWidth = 8;
    g.strokeRect(24, 24, W - 48, H - 48);
    g.lineWidth = 2;
    g.strokeRect(44, 44, W - 88, H - 88);

    const cx = W / 2;
    const gold = '#d4af37', cream = '#f9e9b4', faint = 'rgba(212,175,55,0.55)';

    // star emblem
    g.fillStyle = gold;
    g.beginPath(); g.moveTo(cx, 220); g.lineTo(cx + 46, 330); g.lineTo(cx + 140, 330); g.lineTo(cx + 46, 398); g.lineTo(cx + 92, 470);
    g.lineTo(cx, 432); g.lineTo(cx - 92, 470); g.lineTo(cx - 46, 398); g.lineTo(cx - 140, 330); g.lineTo(cx - 46, 330); g.closePath(); g.fill();
    g.fillStyle = cream; g.beginPath(); g.arc(cx, 330, 52, 0, 7); g.fill();

    g.fillStyle = fade(gold, 'f5f0e6');
    g.textAlign = 'center';
    g.font = '700 52px Inter, Arial, sans-serif';
    g.fillStyle = gold;
    g.fillText('IELTS PA', cx, 560);
    g.font = '400 26px Inter, Arial, sans-serif';
    g.fillStyle = faint;
    g.fillText(T('cert_star'), cx, 606);

    // heading
    g.font = '800 92px Georgia, "Times New Roman", serif';
    g.fillStyle = cream;
    g.fillText(T('cert_name'), cx, 760);
    g.strokeStyle = gold; g.lineWidth = 3;
    g.beginPath(); g.moveTo(cx - 200, 800); g.lineTo(cx + 200, 800); g.stroke();

    // body
    g.font = '400 36px Inter, Arial, sans-serif';
    g.fillStyle = 'rgba(245,240,230,0.85)';
    g.fillText(T('cert_aria'), cx, 900);

    g.font = '800 80px Georgia, "Times New Roman", serif';
    g.fillStyle = '#f5f0e6';
    g.fillText(ellipsize(name, 28), cx, 1000);

    g.font = '400 34px Inter, Arial, sans-serif';
    g.fillStyle = 'rgba(245,240,230,0.85)';
    g.fillText(T('cert_has'), cx, 1075);

    let levelLine = level ? esc(level) : 'A1';
    g.font = '800 64px Inter, Arial, sans-serif';
    g.fillStyle = gold;
    g.fillText(levelLine, cx, 1165);

    if (bandLabel) {
      g.font = '400 34px Inter, Arial, sans-serif';
      g.fillStyle = 'rgba(245,240,230,0.85)';
      g.fillText(T('cert_band') + ' ' + bandLabel, cx, 1235);
    }

    // date + seal
    g.font = '400 30px Inter, Arial, sans-serif';
    g.fillStyle = faint;
    g.fillText(T('cert_on') + '  ' + dateStr, cx, 1320);

    // seal
    g.save();
    g.translate(cx, 1490);
    g.strokeStyle = gold; g.lineWidth = 4;
    g.beginPath(); g.arc(0, 0, 120, 0, 7); g.stroke();
    g.beginPath(); g.arc(0, 0, 104, 0, 7); g.stroke();
    g.fillStyle = gold;
    g.beginPath();
    const pts = starPath(10, 0, 0, 85);
    const poly = pts.trim().slice(1).split(/[ML]/).filter(Boolean).map((s) => { const [x, y] = s.trim().split(/\s+/).map(Number); return [x, y]; });
    g.moveTo(poly[0][0], poly[0][1]);
    poly.forEach((pt) => g.lineTo(pt[0], pt[1]));
    g.closePath(); g.fill();
    g.fillStyle = cream; g.beginPath(); g.arc(0, 0, 34, 0, 7); g.fill();
    g.font = '700 26px Inter, Arial, sans-serif'; g.fillStyle = gold;
    g.fillText('IELTS PA', 0, 162);
    g.restore();

    // signature
    g.strokeStyle = 'rgba(212,175,55,0.8)'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(cx - 140, 1410); g.lineTo(cx + 140, 1410); g.stroke();
    g.font = '400 26px Inter, Arial, sans-serif';
    g.fillStyle = faint;
    g.fillText('Teacher Rami', cx, 1445);

    canvasToPng(c, 'IELTS-PA-Certificate.png');
  }
  function fade(hex, to) {
    const h = hex.replace('#', '');
    return '#' + h.slice(0, 2) + h.slice(2, 4) + h.slice(4, 6);
  }
  function ellipsize(s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s; }
  function canvasToPng(canvas, filename) {
    try {
      const b = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = b;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) { toast('Certificate error'); }
  }
  const IELTS_CERT = {
    open: function () {
      const root = ensureRoot();
      const d = certData();
      const ov = document.createElement('div');
      ov.id = 'cert-modal';
      ov.className = 'shell-modal';
      ov.innerHTML =
        '<div class="shell-modal-card">' +
          '<button class="shell-banner-x" id="cert-close">&times;</button>' +
          '<div class="shell-banner-title">' + T('cert_card_title') + '</div>' +
          '<label class="shell-field">' + T('cert_level') + '<br><input id="cert-name" value="' + esc(d.name) + '"></label>' +
          '<label class="shell-field">' + T('cert_card_title') + '- Level<br><input id="cert-level" value="' + esc(d.level || 'A1') + '"></label>' +
          '<label class="shell-field">' + T('cert_band') + '<br><input id="cert-band" value="' + esc(d.band || '') + '"></label>' +
          '<button class="shell-btn" id="cert-gen" style="justify-content:center">' + T('cert_gen') + '</button>' +
        '</div>';
      root.appendChild(ov);
      ov.addEventListener('click', function (e) { if (e.target === ov) ov.remove(); });
      $('cert-close').addEventListener('click', function () { ov.remove(); });
      $('cert-gen').addEventListener('click', function () {
        const name = $('cert-name').value || 'Learner';
        const level = $('cert-level').value || 'A1';
        const band = $('cert-band').value || '';
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
        drawCertificate(name, level, band, dateStr);
      });
    }
  };
  window.IELTS_CERT = IELTS_CERT;

  /* ============================================================
     6. NEW-VERSION UPDATER
     ============================================================ */
  const APP_VERSION = 'v1.0.0';
  const CHECK_KEY = 'ielts-skip-release';
  function checkForUpdate() {
    const skip = storeGet(CHECK_KEY, '');
    fetch('https://api.github.com/repos/bood68155-tech/ielts/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
      cache: 'no-store'
    }).then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (rel) {
        const tag = rel.tag_name || '';
        if (!tag || tag === skip) return;
        const cur = APP_VERSION.replace('v', '');
        const latest = tag.replace('v', '');
        const curP = cur.split('.').map(Number);
        const latP = latest.split('.').map(Number);
        const newer = latP[0] > curP[0] || (latP[0] === curP[0] && (latP[1] > curP[1] || (latP[1] === curP[1] && latP[2] > (curP[2] || 0))));
        if (!newer) return;
        const root = ensureRoot();
        const div = document.createElement('div');
        div.id = 'update-banner';
        div.innerHTML =
          '<div class="shell-banner shell-update">' +
            '<button class="shell-banner-x" id="update-dismiss">&times;</button>' +
            '<div class="shell-banner-body">' +
              '<div class="shell-banner-title">' + T('update_title') + '</div>' +
              '<div class="shell-banner-text">' + tag + '</div>' +
            '</div>' +
            '<div class="shell-banner-actions">' +
              '<a class="shell-btn" href="' + esc(rel.html_url || ('https://github.com/bood68155-tech/ielts/releases/latest')) + '" target="_blank" rel="noopener">' + T('update_btn') + tag + '</a>' +
            '</div>' +
          '</div>';
        root.appendChild(div);
        $('update-dismiss').addEventListener('click', function () { storeSet(CHECK_KEY, tag); div.remove(); });
      }).catch(function () { /* silent */ });
  }

  /* ============================================================
     CARDS RENDER
     ============================================================ */
  function renderCards() {
    const cards = ensureCards();
    if (!cards) return;
    cards.innerHTML = '';

    // --- Streak + calendar
    const st = studyData();
    const days = (st && st.days) || {};
    const streak = computeStreak(days);
    const activeCount = Object.keys(days).filter((k) => (days[k] || 0) > 0).length;
    const grid = calendarGrid(days);
    const cells = grid.map(function (c) {
      const cls = c.active ? 'shell-day on' : 'shell-day';
      return '<div class="' + cls + (c.today ? ' today' : '') + '" title="' + c.key + '" data-l="0"></div>';
    }).join('');

    cards.innerHTML +=
      '<div class="shell-card">' +
        '<div class="shell-card-title">⭐ ' + T('streak_title') + '</div>' +
        '<div class="shell-streak-line">' +
          '<div class="shell-streak-big">' + streak + '</div>' +
          '<div class="shell-streak-label">' + (streak === 1 ? T('streak_day') : T('streak_day')) + '</div>' +
        '</div>' +
        '<div class="shell-cal">' + cells + '</div>' +
        '<div class="shell-card-foot">' + activeCount + ' ' + T('streak_days') + ' · ' + T('streak_today') + ': ' + grid[grid.length - 1].secs + 's</div>' +
      '</div>';

    // --- Reminders
    const on = remindersEnabled();
    cards.innerHTML +=
      '<div class="shell-card">' +
        '<div class="shell-card-title">🔔 ' + T('reminder_card_title') + '</div>' +
        '<div class="shell-banner-text">' + T('reminder_desc') + '</div>' +
        '<div class="shell-row">' +
          '<input type="time" id="remind-time" value="' + esc(storeGet(REMIND_TIME, '18:00')) + '" class="shell-input">' +
          '<button class="shell-btn" id="remind-toggle">' + (on ? T('reminder_off') : T('reminder_enable')) + '</button>' +
        '</div>' +
        '<div class="shell-row">' +
          '<button class="shell-btn ghost" id="remind-test">' + T('reminder_test') + '</button>' +
        '</div>' +
      '</div>';

    // --- Sync + certificate
    const pending = loadQueue().length;
    let syncText = '';
    if (!navigator.onLine) syncText = '🔴 ' + T('sync_off');
    else if (dbConfigured()) syncText = pending ? '🟠 ' + pending + ' ' + T('sync_pending') : '🟢 ' + T('sync_ok');
    else syncText = '🟢 ' + T('sync_ok');
    cards.innerHTML +=
      '<div class="shell-card">' +
        '<div class="shell-card-title">🔄 ' + T('sync_title') + '</div>' +
        '<div class="shell-banner-text">' + syncText + '</div>' +
        '<div class="shell-row">' +
          '<button class="shell-btn ghost" id="sync-retry">' + T('sync_retry') + '</button>' +
          '<button class="shell-btn" id="cert-open">🏅 ' + T('cert_btn') + '</button>' +
        '</div>' +
      '</div>';

    wireCards();
  }

  function wireCards() {
    const rt = $('remind-time');
    if (rt) rt.addEventListener('change', function () { storeSet(REMIND_TIME, rt.value || '18:00'); });
    const togg = $('remind-toggle');
    if (togg) togg.addEventListener('click', function () {
      if (remindersEnabled()) {
        storeSet(REMIND_KEY, '');
        renderCards();
      } else {
        requestPermission().then(function (perm) {
          if (perm === 'granted') {
            storeSet(REMIND_KEY, 'on');
            storeSet(REMIND_LAST, '');
            renderCards();
            toast(T('reminder_enable') + ' ✓');
            reminderTick(); // notify right away if past time
          } else {
            toast(T('reminder_off'));
          }
        });
      }
    });
    const test = $('remind-test');
    if (test) test.addEventListener('click', function () {
      requestPermission().then(function (perm) {
        if (perm === 'granted') notifyNow(T('notify_banner_title'), T('notify_banner_body'));
        else toast(T('reminder_off'));
      });
    });
    const retry = $('sync-retry');
    if (retry) retry.addEventListener('click', function () { IELTS_SYNC.flush(); });
    const cert = $('cert-open');
    if (cert) cert.addEventListener('click', function () { IELTS_CERT.open(); });
  }

  /* ---------------- Init ---------------- */
  function init() {
    ensureRoot();
    patchAuth();
    renderCards();
    if (!isStandalone() && isIOS()) showInstallBanner('ios');
    setInterval(reminderTick, 60000);
    window.addEventListener('online', IELTS_SYNC.flush);
    // reminder on first load if enabled & not yet reminded today
    setTimeout(function () {
      reminderTick();
      checkForUpdate();
    }, 4000);
    document.addEventListener(LISTEN, renderCards);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }
})();