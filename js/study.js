/* ============================================================
   IELTS Master — daily study hours tracker
   An interactive study timer that accumulates focused minutes
   into a per-user daily log (user_<id>_study), with a daily goal,
   weekly chart, streaks and XP rewards for consistency.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const SESSION_XP = 10;     // completing a session (once per day)
  const GOAL_XP = 20;        // hitting the daily goal
  const STREAK7_XP = 50;     // 7-day streak milestone
  const ACTIVE_DAY_SECS = 600; // ≥10 min counts as an active day
  const PERSIST_EVERY = 15000; // persist running session every 15s

  let cache = null;          // user-scoped study state
  let interval = null;
  let persistTimer = null;

  /* ---------- state ---------- */
  function studyState() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return null;
    if (cache === null) {
      cache = window.IELTS_AUTH.getScoped('study', null) || {
        days: {}, goalSeconds: 3600, sessions: [], active: null
      };
      if (!cache.days) cache.days = {};
      if (!cache.goalSeconds) cache.goalSeconds = 3600;
      if (!Array.isArray(cache.sessions)) cache.sessions = [];
    }
    return cache;
  }

  function saveStudy() {
    if (cache !== null) window.IELTS_AUTH.setScoped('study', cache);
  }

  function dayKey(d) {
    const dt = d || new Date();
    return dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0');
  }

  function todayKey() { return dayKey(new Date()); }

  function todaySeconds() {
    const s = studyState();
    if (!s) return 0;
    return s.days[todayKey()] || 0;
  }

  /* active session elapsed (ms) including a persisted run.
     Accepts either the whole study state or the active object itself. */
  function elapsedMs(st) {
    const a = (st && st.active) ? st.active : st;
    if (!a) return 0;
    return a.accumulated + (a.running ? (Date.now() - a.startedAt) : 0);
  }

  function fmt(ms) {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const sec = total % 60;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
  }

  function fmtHours(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.round((secs % 3600) / 60);
    if (h === 0) return m + 'm';
    return h + 'h ' + (m > 0 ? m + 'm' : '');
  }

  /* ---------- streak ---------- */
  function activeDay(secs) { return secs >= ACTIVE_DAY_SECS; }

  function computeStreak() {
    const s = studyState();
    if (!s) return 0;
    const keys = Object.keys(s.days).sort();
    if (!keys.length) return 0;
    // build a set of active day keys
    const active = new Set(keys.filter((k) => activeDay(s.days[k])));
    let streak = 0;
    const cursor = new Date();
    if (!active.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1); // allow today still in progress
    while (active.has(dayKey(cursor))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  /* ---------- timer actions ---------- */
  function startTimer() {
    const s = studyState();
    if (!s) return;
    if (s.active && s.active.running) return;
    if (s.active) {
      s.active.running = true;
      s.active.startedAt = Date.now();
    } else {
      s.active = { running: true, startedAt: Date.now(), accumulated: 0 };
    }
    saveStudy();
    beginTick();
    render();
  }

  function pauseTimer() {
    const s = studyState();
    if (!s || !s.active || !s.active.running) return;
    s.active.accumulated += Date.now() - s.active.startedAt;
    s.active.running = false;
    saveStudy();
    render();
  }

  function stopTimer() {
    const s = studyState();
    if (!s || !s.active) return;
    const total = elapsedMs(s.active);
    s.active = null;
    if (total >= 30000) { // ignore accidental <30s taps
      const key = todayKey();
      s.days[key] = (s.days[key] || 0) + Math.round(total / 1000);
      s.sessions.push({ date: Date.now(), seconds: Math.round(total / 1000) });
      if (s.sessions.length > 200) s.sessions.splice(0, s.sessions.length - 200);
      saveStudy();
      awardSession();
    } else {
      saveStudy();
    }
    render();
  }

  function resetTimer() {
    const s = studyState();
    if (!s) return;
    s.active = null;
    saveStudy();
    render();
  }

  /* ---------- XP rewards ---------- */
  function awardSession() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    const key = todayKey();
    const auth = window.IELTS_AUTH;
    if (auth.completeClaim('study-session-' + key)) {
      auth.addXp(SESSION_XP);
      auth.addActivity('study', 'Completed a study session — ' + fmtHours(todaySeconds()) + ' today', SESSION_XP);
      window.toast && window.toast('+' + SESSION_XP + ' XP for your study session! ⏱');
    }
    const s = studyState();
    if (s && (s.days[key] || 0) >= s.goalSeconds && auth.completeClaim('study-goal-' + key)) {
      auth.addXp(GOAL_XP);
      auth.addActivity('study', 'Hit your daily study goal! 🎯', GOAL_XP);
      window.toast && window.toast('🎯 Daily goal reached — +' + GOAL_XP + ' XP!');
    }
    const streak = computeStreak();
    if (streak >= 7 && auth.completeClaim('study-streak7')) {
      auth.addXp(STREAK7_XP);
      auth.addActivity('study', '🔥 7-day study streak — incredible consistency!', STREAK7_XP);
      window.toast && window.toast('🔥 7-day streak! +' + STREAK7_XP + ' XP');
    }
  }

  /* ---------- ticking ---------- */
  function beginTick() {
    clearInterval(interval);
    interval = setInterval(() => {
      const s = studyState();
      if (!s || !s.active || !s.active.running) return;
      const el = $('#study-clock');
      if (el) el.textContent = fmt(elapsedMs(s.active));
      const live = $('#study-live');
      if (live) live.textContent = fmtHours((s.days[todayKey()] || 0) + Math.round(elapsedMs(s.active) / 1000));
    }, 1000);
    clearInterval(persistTimer);
    persistTimer = setInterval(() => {
      const st = studyState();
      if (st && st.active && st.active.running) saveStudy();
    }, PERSIST_EVERY);
  }

  function clearTicks() {
    clearInterval(interval);
    clearInterval(persistTimer);
  }

  /* switching users switches to their study environment */
  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) {
    window.IELTS_AUTH.onUserChange(() => { cache = null; clearTicks(); });
  }

  window.addEventListener('beforeunload', () => {
    const s = cache;
    if (s && s.active && s.active.running) {
      s.active.accumulated += Date.now() - s.active.startedAt;
      s.active.running = false;
      try { window.IELTS_AUTH && window.IELTS_AUTH.setScoped('study', s); } catch (e) { /* ignore */ }
    }
  });

  /* ---------- goal control ---------- */
  function setGoal(minutes) {
    const s = studyState();
    if (!s) return;
    s.goalSeconds = minutes * 60;
    saveStudy();
    render();
    window.toast && window.toast('Daily goal set to ' + minutes + ' minutes 🎯');
  }

  /* ---------- render ---------- */
  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    const s = studyState();
    if (!s) return;

    const today = todaySeconds() + (s.active ? Math.round(elapsedMs(s.active) / 1000) : 0);
    const goalPct = Math.min(100, Math.round((today / s.goalSeconds) * 100));
    const streak = computeStreak();
    const total = Object.keys(s.days).reduce((n, k) => n + s.days[k], 0);

    // last 7 days (oldest → newest)
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = dayKey(d);
      days.push({ key, label: d.toLocaleDateString(undefined, { weekday: 'short' }), secs: s.days[key] || 0, today: i === 0 });
    }
    const maxDay = Math.max(...days.map((d) => d.secs), 1);
    const bars = days.map((d) => {
      const pct = Math.max(6, Math.round((d.secs / maxDay) * 100));
      const color = d.today ? 'bg-brand-500' : (activeDay(d.secs) ? 'bg-emerald-500' : 'bg-slate-200');
      return `
        <div class="flex flex-col items-center gap-1 flex-1 min-w-0" title="${d.label}: ${fmtHours(d.secs)}">
          <span class="text-[10px] font-bold ${d.secs >= s.goalSeconds ? 'text-emerald-600' : 'text-slate-500'}">${d.secs ? fmtHours(d.secs) : ''}</span>
          <div class="w-full rounded-t-lg ${color} transition-all" style="height: ${Math.max(6, pct)}px"></div>
          <span class="text-[10px] text-slate-400">${d.label}</span>
        </div>`;
    }).join('');

    const weekSecs = days.reduce((n, d) => n + d.secs, 0);
    const bestDay = Math.max(...Object.values(s.days), 0);

    $('#study-content').innerHTML = `
      <div class="grid lg:grid-cols-3 gap-5 mb-6">
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p class="text-sm text-slate-500">Focused study timer</p>
              <p class="text-xs text-slate-400 mt-0.5">${s.active && s.active.running ? 'Session in progress — keep going!' : 'Start a session and build your streak.'}</p>
            </div>
            <span id="study-session-state" class="text-xs font-bold ${s.active && s.active.running ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'} px-3 py-1.5 rounded-full">${s.active && s.active.running ? '● RUNNING' : 'IDLE'}</span>
          </div>
          <p id="study-clock" class="text-center text-6xl font-extrabold font-mono text-slate-900 my-6 tabular-nums">${fmt(elapsedMs(s.active))}</p>
          <div class="flex flex-wrap justify-center gap-3">
            ${s.active && s.active.running
              ? '<button class="btn-secondary" onclick="IELTS_STUDY.pauseTimer()">⏸ Pause</button>'
              : '<button class="btn-primary" onclick="IELTS_STUDY.startTimer()">▶ Start</button>'}
            ${s.active ? '<button class="btn-primary" onclick="IELTS_STUDY.stopTimer()">⏹ Finish session</button>' : ''}
            ${s.active ? '<button class="btn-secondary" onclick="IELTS_STUDY.resetTimer()">✕ Discard</button>' : ''}
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div class="flex items-center justify-between">
            <p class="font-bold text-slate-900">Today</p>
            <span class="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">🔥 ${streak}-day streak</span>
          </div>
          <p class="text-4xl font-extrabold text-brand-600 mt-3">${fmtHours(today)}</p>
          <p class="text-xs text-slate-500">of your ${Math.round(s.goalSeconds / 60)}-minute goal</p>
          <div class="mt-3 h-3 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full ${goalPct >= 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-brand-500 to-indigo-500'} rounded-full transition-all" style="width: ${Math.max(goalPct, 3)}%"></div>
          </div>
          <p class="text-xs text-slate-500 mt-2">${goalPct >= 100 ? 'Goal reached — amazing! 🎯' : Math.round(s.goalSeconds / 60) - Math.round(today / 60) + ' minutes to your goal'}</p>
          <div class="mt-4 pt-4 border-t border-slate-100">
            <p class="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Daily goal</p>
            <div class="flex flex-wrap gap-1.5">
              ${[30, 60, 90, 120].map((m) => `<button class="text-[11px] font-semibold border ${s.goalSeconds === m * 60 ? 'border-brand-400 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-500 hover:border-brand-300'} rounded-full px-3 py-1.5 transition" onclick="IELTS_STUDY.setGoal(${m})">${m}m</button>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-5">
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div class="flex items-center justify-between mb-4">
            <p class="font-bold text-slate-900">Last 7 days</p>
            <p class="text-xs text-slate-500">${fmtHours(weekSecs)} this week</p>
          </div>
          <div class="flex items-end gap-2 h-28">${bars}</div>
        </div>
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <p class="font-bold text-slate-900 mb-4">Lifetime</p>
          <div class="grid grid-cols-2 gap-4">
            <div><p class="text-2xl font-extrabold text-slate-900">${fmtHours(total)}</p><p class="text-[11px] text-slate-500">total study</p></div>
            <div><p class="text-2xl font-extrabold text-slate-900">${Object.keys(s.days).filter((k) => activeDay(s.days[k])).length}</p><p class="text-[11px] text-slate-500">active days</p></div>
            <div><p class="text-2xl font-extrabold text-slate-900">${s.sessions.length}</p><p class="text-[11px] text-slate-500">sessions</p></div>
            <div><p class="text-2xl font-extrabold text-slate-900">${bestDay ? fmtHours(bestDay) : '—'}</p><p class="text-[11px] text-slate-500">best day</p></div>
          </div>
        </div>
      </div>`;

    // resume ticking if a session is running
    if (s.active && s.active.running) beginTick();
  }

  window.IELTS_STUDY = { render, startTimer, pauseTimer, stopTimer, resetTimer, setGoal };
})();
