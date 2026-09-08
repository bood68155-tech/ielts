/* ============================================================
   IELTS Master — Reading & Listening Quiz Hub
   Interactive practice sets with timer, multiple-choice
   questions, auto-grading, and detailed answer explanations.
   Extends existing PRACTICE_TESTS from learning-path.js.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const QUIZ_XP = 15;
  const AWL = null; // not needed

  const state = { view: 'home', activeTab: 'reading', testKey: null, qi: 0, answers: {}, score: 0, timer: { running: false, seconds: 0, interval: null }, review: null };

  function scKey() { return 'quizhub-' + (state.testKey || 'none'); }

  function cache() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return null;
    const c = window.IELTS_AUTH.getScoped('quizhub', null);
    if (!c || !Array.isArray(c.completed)) {
      window.IELTS_AUTH.setScoped('quizhub', { completed: {}, bestScores: {} });
    }
    return window.IELTS_AUTH.getScoped('quizhub', null);
  }

  function save(c) { window.IELTS_AUTH.setScoped('quizhub', c); }

  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) { state.view = 'home'; state.testKey = null; }

  /* ---------- timer ---------- */
  function startTimer() {
    stopTimer();
    state.timer.running = true;
    state.timer.seconds = 0;
    state.timer.interval = setInterval(() => {
      state.timer.seconds++;
      const el = $('#qh-timer');
      if (el) el.textContent = fmtTime(state.timer.seconds);
    }, 1000);
  }

  function stopTimer() {
    state.timer.running = false;
    clearInterval(state.timer.interval);
  }

  function fmtTime(s) {
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  /* ---------- test data ---------- */
  function getTest(levelId, type) {
    if (type === 'listening') {
      if (window.IELTS_DATA && window.IELTS_DATA.LISTENING_TEST) {
        const test = window.IELTS_DATA.LISTENING_TEST;
        const idx = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'].indexOf(levelId);
        if (idx >= 0 && idx < test.length) return test[idx];
        return test[0];
      }
    }
    // reading from learning-path PRACTICE_TESTS
    if (window.LEARNING_PATH && window.LEARNING_PATH._tests) {
      const t = window.LEARNING_PATH._tests[levelId];
      if (t && t[0]) return t[0];
    }
    // fallback: use the same PRACTICE_TESTS in learning-path.js scope (accessible via window)
    const lt = window.LEARNING_PATH || {};
    // try reading the rendered hub's test data
    return null;
  }

  function getLevelTests(type) {
    const LEVELS = (window.IELTS_DATA && window.IELTS_DATA.LEVELS) || [];
    const user = window.IELTS_AUTH.getCurrentUser();
    const userLevel = user ? window.IELTS_AUTH.getLevel(user.xp).id : 'a1';
    return LEVELS.map((l) => {
      const completed = cache().completed[l.id + '-' + type];
      return { level: l, type, completed, recommended: l.id === userLevel };
    });
  }

  /* ---------- render ---------- */
  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) { window.IELTS_AUTH.showScreen(); return; }
    if (state.view === 'taking') { renderTaking(); return; }
    if (state.view === 'review') { renderReview(); return; }

    state.view = 'home';
    const readTests = getLevelTests('reading');
    const listenTests = getLevelTests('listening');
    const c = cache();

    const renderCard = (t) => `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl p-5 flex items-center justify-between gap-3 transition-all ${t.completed ? 'opacity-70' : 'hover:border-[rgba(212,175,55,0.5)] hover:shadow-lg'}">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-2xl">${t.level.icon}</span>
            <span class="text-sm font-bold text-[#f5f0e6]">${esc(t.level.name)} — ${t.type === 'reading' ? '📖 Reading' : '🎧 Listening'}</span>
          </div>
          <p class="text-xs text-[#f5f0e6]/60">${t.completed ? '✓ Completed' : '• 5–10 questions · Timer · Auto-graded'}</p>
        </div>
        <button class="btn-primary text-sm whitespace-nowrap" onclick="IELTS_QUIZ_HUB.start('${t.level.id}', '${t.type}')">${t.completed ? 'Review' : 'Start'}</button>
      </div>`;

    $('#quiz-hub-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <h2 class="text-2xl font-extrabold text-[#f5f0e6]">🧠 Reading & Listening Quiz Hub</h2>
        <p class="text-sm text-[#f5f0e6]/60 mt-1">Interactive practice sets with timers, auto-grading and detailed explanations.</p>
        <div class="flex gap-3 mt-4">
          <button class="tab-pill ${state.activeTab === 'reading' ? 'active' : ''}" onclick="IELTS_QUIZ_HUB.switchTab('reading')">📖 Reading</button>
          <button class="tab-pill ${state.activeTab === 'listening' ? 'active' : ''}" onclick="IELTS_QUIZ_HUB.switchTab('listening')">🎧 Listening</button>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-4 mb-6">
        ${(state.activeTab === 'reading' ? readTests : listenTests).map(renderCard).join('')}
      </div>`;
  }

  function switchTab(tab) { state.activeTab = tab; render(); }

  function start(levelId, type) {
    const test = getTest(levelId, type);
    if (!test) { window.toast && window.toast('Test not available — try another level'); return; }
    state.testKey = levelId + '-' + type;
    state.qi = 0;
    state.answers = {};
    state.score = 0;
    state.review = null;
    state.view = 'taking';
    startTimer();
    render();
  }

  function renderTaking() {
    const lvl = (state.testKey || '').split('-')[0];
    const type = (state.testKey || '').split('-').slice(1).join('-');
    const test = getTest(lvl, type);
    if (!test) return;

    let questions, total;
    if (type === 'listening' && test.questions) {
      questions = test.questions;
      total = questions.length;
    } else if (type === 'reading' && test.questions) {
      questions = test.questions;
      total = questions.length;
    } else {
      // for learning-path level tests, questions array exists directly
      questions = test.questions || [];
      total = questions.length;
    }

    const q = questions[state.qi];
    if (!q) { state.view = 'review'; render(); return; }

    const opts = (q.options || []).map((o, i) => {
      const letter = String.fromCharCode(65 + i);
      const sel = state.answers[state.qi] === letter;
      return `<button type="button" class="opt ${sel ? 'selected' : ''}" data-letter="${letter}" onclick="IELTS_QUIZ_HUB.answer(${state.qi}, '${letter}')">
        <span class="inline-block w-5 text-[#f5f0e6]/40 font-semibold">${letter}</span> ${esc(o)}
      </button>`;
    }).join('');

    const passageHtml = q.passage ? `<div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-4 mb-4"><p class="text-sm text-[#f5f0e6]/80 leading-relaxed">${esc(q.passage)}</p></div>` : '';

    $('#quiz-hub-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 class="text-lg font-extrabold text-[#f5f0e6]">${esc(test.title || 'Quiz')} — Q${state.qi + 1}/${total}</h3>
          <div class="flex items-center gap-3">
            <div id="qh-timer" class="font-mono text-sm font-bold text-[#d4af37] bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.3)] px-4 py-2 rounded-lg">${fmtTime(state.timer.seconds)}</div>
          </div>
        </div>
        <div class="h-2 bg-[rgba(20,18,15,0.85)] rounded-full overflow-hidden mb-5">
          <div class="h-full bg-gradient-to-r from-[#d4af37] to-[#f5f0e6] rounded-full transition-all" style="width:${((state.qi) / total) * 100}%"></div>
        </div>
        ${passageHtml}
        <div class="q-card">
          <p class="text-sm font-medium text-[#f5f0e6] mb-2">${esc(q.question)}</p>
          <div class="grid gap-2">${opts}</div>
          <div id="qh-explanation" class="mt-3 hidden"></div>
        </div>
        <div class="flex justify-between mt-5">
          <button class="btn-secondary text-sm ${state.qi === 0 ? 'invisible' : ''}" onclick="IELTS_QUIZ_HUB.prev()">← Prev</button>
          <button class="btn-primary text-sm" onclick="IELTS_QUIZ_HUB.next()">${state.qi === total - 1 ? 'Submit' : 'Next →'}</button>
        </div>
      </div>`;
  }

  function answer(i, letter) {
    state.answers[i] = letter;
    renderTaking();
  }

  function next() {
    const lvl = (state.testKey || '').split('-')[0];
    const type = (state.testKey || '').split('-').slice(1).join('-');
    const test = getTest(lvl, type);
    const total = (test.questions || []).length;

    if (state.qi < total - 1) {
      state.qi++;
      renderTaking();
    } else {
      finish();
    }
  }

  function prev() { if (state.qi > 0) { state.qi--; renderTaking(); } }

  function finish() {
    stopTimer();
    const lvl = (state.testKey || '').split('-')[0];
    const type = (state.testKey || '').split('-').slice(1).join('-');
    const test = getTest(lvl, type);
    const questions = test.questions || [];
    let correct = 0;
    questions.forEach((q, i) => {
      const userAnswer = state.answers[i];
      if (q.answer && userAnswer && String(userAnswer).toLowerCase() === String(q.answer).toLowerCase()) correct++;
    });
    const total = questions.length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const time = fmtTime(state.timer.seconds);

    const c = cache();
    c.completed[state.testKey] = true;
    if (!c.bestScores[state.testKey] || pct > c.bestScores[state.testKey]) c.bestScores[state.testKey] = pct;
    save(c);

    if (pct >= 60 && window.IELTS_AUTH.completeClaim('quizhub-' + state.testKey)) {
      window.IELTS_AUTH.addXp(QUIZ_XP);
      window.IELTS_AUTH.addActivity('quiz', 'Completed quiz: ' + (test.title || state.testKey), QUIZ_XP);
      window.toast && window.toast('+' + QUIZ_XP + ' XP!');
    }

    const reviewRows = questions.map((q, i) => {
      const ua = state.answers[i];
      const isCorrect = q.answer && ua && String(ua).toLowerCase() === String(q.answer).toLowerCase();
      const letterAnswer = q.options ? (isCorrect ? ua : (q.answer || '')) : '';
      return `<div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-lg p-4">
        <p class="text-sm font-semibold text-[#f5f0e6]">Q${i + 1} ${isCorrect ? '✅' : '❌'} — ${esc(q.question)}</p>
        ${!isCorrect ? '<p class="text-xs text-[#f5f0e6]/50 mt-1">Your answer: ' + esc(ua || '—') + ' · Correct: <span class="text-[#d4af37]">' + esc(String(q.answer || '')) + '</span></p>' : ''}
        <p class="text-xs text-[#f5f0e6]/60 mt-1">💡 ${esc(q.explanation || '')}</p>
      </div>`;
    }).join('');

    state.view = 'review';
    $('#quiz-hub-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-8 text-center mb-6">
        <p class="text-5xl font-extrabold ${pct >= 80 ? 'text-[#d4af37]' : pct >= 60 ? 'text-emerald-400' : 'text-[#f5f0e6]/70'}">${pct}%</p>
        <p class="text-[#f5f0e6]/70 mt-2">${correct} / ${total} correct · Time: ${time}</p>
        <p class="text-sm mt-1 ${pct >= 60 ? 'text-emerald-400 font-semibold' : 'text-[#f5f0e6]/60'}">${pct >= 80 ? 'Excellent! Band 8+ territory.' : pct >= 60 ? 'Good effort — review the explanations.' : 'Keep practising — review the answers below.'}</p>
      </div>
      <h3 class="text-lg font-bold text-[#f5f0e6] mb-4">Answer Review</h3>
      <div class="space-y-3 mb-6">${reviewRows}</div>
      <div class="flex gap-3">
        <button class="btn-secondary text-sm" onclick="IELTS_QUIZ_HUB.back()">← Back to Hub</button>
        <button class="btn-primary text-sm" onclick="IELTS_QUIZ_HUB.start('${lvl}', '${type}')">🔁 Retry</button>
      </div>`;
  }

  function renderReview() { /* already handled by finish() */ }

  function back() {
    stopTimer();
    state.view = 'home';
    state.testKey = null;
    render();
  }

  window.IELTS_QUIZ_HUB = { render, switchTab, start, answer, next, prev, back };
})();
