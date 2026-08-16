/* ============================================================
   IELTS Master — weekly exam module
   15 questions picked deterministically from the pool each week,
   a 15-minute timer, and per-user score history.
   Exam history + in-progress state live under a user-scoped key.
   ============================================================ */
(function () {
  'use strict';

  const { WEEKLY_EXAM_POOL, XP_REWARDS } = window.IELTS_DATA;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const EXAM_SIZE = 15;
  const EXAM_SECONDS = 15 * 60;

  let exam = null; // { week, questions, answers: {}, secondsLeft, interval, submitted }

  /* --- persist/resume the in-progress exam under user_<id>_exam --- */
  function saveExamState() {
    const state = window.IELTS_AUTH.getScoped('exam', null) || { history: window.IELTS_AUTH.getExamHistory(), inProgress: null };
    if (!Array.isArray(state.history)) state.history = window.IELTS_AUTH.getExamHistory();
    state.inProgress = (exam && !exam.submitted)
      ? { week: exam.week, questions: exam.questions, answers: exam.answers, secondsLeft: exam.secondsLeft, submitted: false }
      : null;
    window.IELTS_AUTH.setScoped('exam', state);
  }

  function loadInProgressExam() {
    const state = window.IELTS_AUTH.getScoped('exam', null);
    return state && state.inProgress ? state.inProgress : null;
  }

  /* --- countdown shared by start() and resumed exams --- */
  function startTimer() {
    return setInterval(() => {
      exam.secondsLeft--;
      const t = $('#exam-timer');
      if (t) {
        t.textContent = formatTime(Math.max(0, exam.secondsLeft));
        t.classList.toggle('timer-late', exam.secondsLeft <= 60);
      }
      if (exam.secondsLeft <= 0) {
        clearInterval(exam.interval);
        window.toast && window.toast('Time is up — submitting your exam…');
        submit(true);
      }
    }, 1000);
  }

  /* switching users switches to their exam environment */
  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) {
    window.IELTS_AUTH.onUserChange(() => {
      if (exam && exam.interval) clearInterval(exam.interval);
      exam = null;
    });
  }

  /* --- deterministic weekly seed: week number of current ISO week --- */
  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  /* --- mulberry32 PRNG for stable per-week question selection --- */
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pickQuestions(week) {
    const rng = mulberry32(week * 7919 + 13);
    const pool = WEEKLY_EXAM_POOL.slice();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, EXAM_SIZE);
  }

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  /* --- answer checking (mirrors app.js) --- */
  function checkAnswer(q, userAnswer) {
    if (!userAnswer) return false;
    if (q.type === 'fill') {
      const ua = String(userAnswer).trim().toLowerCase().replace(/\s+/g, ' ');
      return q.answer.some((a) => String(a).trim().toLowerCase().replace(/\s+/g, ' ') === ua);
    }
    return String(userAnswer).toLowerCase() === String(q.answer).toLowerCase();
  }

  function render() {
    // resume an in-progress exam saved for the active user
    if (exam === null) {
      const saved = loadInProgressExam();
      if (saved && !saved.submitted) {
        exam = saved;
        exam.interval = startTimer();
      }
    }
    const week = getWeekNumber(new Date());
    const history = window.IELTS_AUTH.getExamHistory();
    const weekResults = history.filter((h) => h.week === week);
    const bestThisWeek = weekResults.length ? Math.max(...weekResults.map((h) => h.score)) : null;
    const total = weekResults.length ? weekResults[0].total : EXAM_SIZE;

    $('#exam-content').innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 class="text-lg font-extrabold text-slate-900">Week ${week} exam</h3>
            <p class="text-sm text-slate-500 mt-0.5">15 questions · 15 minutes · mix of grammar, vocabulary and sentence completion</p>
            ${bestThisWeek !== null ? `<p class="text-sm text-emerald-600 font-semibold mt-1">Best score this week: ${bestThisWeek} / ${total}</p>` : ''}
          </div>
          <div class="text-right">
            <p class="text-xs text-slate-400 uppercase tracking-wide font-bold mb-1">New questions every week</p>
            <button class="btn-primary" onclick="IELTS_EXAM.start()" ${exam ? 'disabled' : ''}>${exam ? 'Exam in progress…' : bestThisWeek !== null ? 'Retake exam' : 'Start exam'}</button>
          </div>
        </div>
      </div>
      <div id="exam-run"></div>
      <div id="exam-gradebook"></div>
      <div id="exam-history"></div>`;

    renderGradeBook(history);
    renderHistory(history);
    if (exam && exam.week === week && !exam.submitted) {
      renderExamRun();
    } else if (exam) {
      renderExamResult();
    }
  }

  function renderExamRun() {
    const container = $('#exam-run');
    if (!container) return;

    const qHtml = exam.questions.map((q, qi) => {
      const key = 'E' + (qi + 1);
      const saved = exam.answers[key];

      let control = '';
      if (q.type === 'mcq') {
        control = `
          <div class="grid gap-2 mt-3" data-options>
            ${q.options.map((opt, oi) => {
              const letter = String.fromCharCode(65 + oi);
              return `<button type="button" class="opt ${saved === letter ? 'selected' : ''}" data-letter="${letter}" onclick="IELTS_EXAM.selectOption(${qi}, '${letter}', this)">
                <span class="inline-block w-5 text-slate-400 font-semibold">${letter}</span> ${esc(opt)}
              </button>`;
            }).join('')}
          </div>`;
      } else {
        control = `<input type="text" class="fill-input mt-3" value="${esc(saved || '')}" oninput="IELTS_EXAM.saveFill(${qi}, this.value)" placeholder="Type your answer…" />`;
      }

      return `
        <div class="q-card" data-qkey="${key}">
          <div class="flex items-start gap-3">
            <span class="q-number shrink-0">${qi + 1}</span>
            <div class="flex-1">
              <p class="text-sm font-medium text-slate-800">${esc(q.question)}</p>
              ${control}
            </div>
          </div>
        </div>`;
    }).join('');

    container.innerHTML = `
      <div class="flex items-center justify-between bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-3 mb-4 sticky top-20 z-30">
        <p class="text-sm font-semibold text-slate-700">⏱ Time remaining: <span id="exam-timer" class="font-mono font-bold ${exam.secondsLeft <= 60 ? 'timer-late' : ''}">${formatTime(exam.secondsLeft)}</span></p>
        <button class="btn-primary !py-2 text-xs" onclick="IELTS_EXAM.submit()">Submit exam</button>
      </div>
      <div class="space-y-4">${qHtml}</div>`;
  }

  function renderExamResult() {
    const container = $('#exam-run');
    if (!container) return;
    const correct = exam.questions.reduce((n, q, i) => n + (checkAnswer(q, exam.answers['E' + (i + 1)]) ? 1 : 0), 0);
    const pct = Math.round((correct / exam.questions.length) * 100);

    const detail = exam.questions.map((q, i) => {
      const key = 'E' + (i + 1);
      const ua = exam.answers[key];
      const ok = checkAnswer(q, ua);
      const shown = q.type === 'mcq' ? q.answer + ' — ' + q.options[q.answer.charCodeAt(0) - 65] : q.answer.join(' / ');
      return `
        <p class="text-sm">
          <span class="font-semibold text-slate-700">Q${i + 1} ${ua ? (ok ? '✅' : '❌') : '—'}</span>
          <span class="${ok ? 'answer-correct' : 'answer-wrong'}">${ok ? 'Correct' : 'Incorrect'}</span>
          <span class="text-slate-500">· Answer: <span class="font-semibold text-slate-700">${esc(shown)}</span></span>
          ${ok ? '' : `<span class="text-slate-400">· ${esc(q.explanation)}</span>`}
        </p>`;
    }).join('');

    container.innerHTML = `
      <div class="result-banner ${pct >= 60 ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'} mb-4">
        <p class="text-lg font-extrabold text-slate-900">You scored ${correct} / ${exam.questions.length} (${pct}%)</p>
        <p class="text-sm text-slate-600 mt-1">${pct >= 80 ? 'Excellent — keep it up!' : pct >= 60 ? 'Good effort — review the answers below.' : 'Review the answers and try again next week.'}</p>
        <button class="btn-secondary mt-4" onclick="IELTS_EXAM.start()">Retake</button>
        <button class="btn-primary mt-4 ml-2" onclick="IELTS_EXAM.shareScore()">📣 Share score</button>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">${detail}</div>`;
  }

  function renderHistory(history) {
    const container = $('#exam-history');
    if (!container) return;

    if (!history.length) {
      container.innerHTML = `
        <div class="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <p class="text-3xl mb-2">📊</p>
          <p class="font-bold text-slate-800">No exam history yet</p>
          <p class="text-sm text-slate-500 mt-1">Take your first weekly exam to start tracking your scores.</p>
        </div>`;
      return;
    }

    const recent = history.slice(-8);
    const maxScore = Math.max(...recent.map((h) => h.score), 1);
    const bars = recent.map((h) => {
      const pct = Math.max(6, Math.round((h.score / maxScore) * 100));
      const color = h.score / h.total >= 0.6 ? 'bg-emerald-500' : h.score / h.total >= 0.4 ? 'bg-amber-500' : 'bg-rose-500';
      const date = new Date(h.date);
      return `
        <div class="flex flex-col items-center gap-1 flex-1 min-w-0">
          <span class="text-[10px] font-bold text-slate-600">${h.score}</span>
          <div class="w-full rounded-t-lg ${color} transition-all" style="height: ${pct * 1.6}px" title="Week ${h.week}: ${h.score}/${h.total}"></div>
          <span class="text-[10px] text-slate-400">W${h.week}</span>
          <span class="text-[9px] text-slate-300 hidden sm:block">${date.getDate()}/${date.getMonth() + 1}</span>
        </div>`;
    }).join('');

    const rows = history.slice().reverse().slice(0, 10).map((h) => {
      const date = new Date(h.date);
      const mins = Math.floor(h.secondsUsed / 60);
      const secs = h.secondsUsed % 60;
      return `
        <tr class="border-t border-slate-100">
          <td class="px-3 py-2 text-sm font-semibold text-slate-700">Week ${h.week}</td>
          <td class="px-3 py-2 text-sm text-slate-500">${date.toLocaleDateString()}</td>
          <td class="px-3 py-2 text-sm font-bold ${h.score / h.total >= 0.6 ? 'text-emerald-600' : 'text-rose-500'}">${h.score} / ${h.total}</td>
          <td class="px-3 py-2 text-sm text-slate-500">${mins}:${String(secs).padStart(2, '0')}</td>
        </tr>`;
    }).join('');

    container.innerHTML = `
      <div class="grid lg:grid-cols-2 gap-5">
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <p class="font-bold text-slate-900 mb-4">Score history <span class="text-xs font-normal text-slate-400">(last ${recent.length} exams)</span></p>
          <div class="flex items-end gap-2 h-36">${bars}</div>
        </div>
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <p class="font-bold text-slate-900 mb-2">Recent attempts</p>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead><tr class="text-[11px] uppercase tracking-wide text-slate-400">
                <th class="px-3 py-1">Week</th><th class="px-3 py-1">Date</th><th class="px-3 py-1">Score</th><th class="px-3 py-1">Time</th>
              </tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </div>`;
  }

  /* --- weekly grade book: pass/fail per week + level unlock progress --- */
  function renderGradeBook(history) {
    const el = $('#exam-gradebook');
    if (!el) return;
    const user = window.IELTS_AUTH.getCurrentUser();
    const next = window.IELTS_AUTH.getNextLevel(user ? user.xp : 0);

    // best score per week
    const byWeek = {};
    history.forEach((h) => {
      if (!byWeek[h.week] || h.score > byWeek[h.week].score) {
        byWeek[h.week] = { week: h.week, score: h.score, total: h.total };
      }
    });
    const sorted = Object.keys(byWeek).map((k) => byWeek[k]).sort((a, b) => a.week - b.week).slice(-10);

    const bars = sorted.map((w) => {
      const pct = Math.round((w.score / w.total) * 100);
      const pass = pct >= 60;
      const hpx = Math.max(10, Math.round((pct / 100) * 120));
      return `
        <div class="flex flex-col items-center gap-1 flex-1 min-w-0">
          <span class="text-[10px] font-bold ${pass ? 'text-emerald-600' : 'text-rose-500'}">${w.score}/${w.total}</span>
          <div class="w-full rounded-t-lg ${pass ? 'bg-emerald-500' : 'bg-rose-400'} transition-all" style="height: ${hpx}px" title="Week ${w.week}: ${pct}%"></div>
          <span class="text-[10px] text-slate-400">W${w.week}</span>
          <span class="text-[9px] font-bold ${pass ? 'text-emerald-600' : 'text-rose-500'}">${pass ? 'PASS' : 'FAIL'}</span>
        </div>`;
    }).join('');

    // countdown to the next weekly exam (next Monday)
    const now = new Date();
    const dayIdx = (now.getDay() + 6) % 7; // Monday = 0
    const daysToMonday = (7 - dayIdx) % 7 || 7;
    const nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysToMonday);
    const diff = Math.max(0, nextMonday - now);
    const dLeft = Math.floor(diff / 86400000);
    const hLeft = Math.floor((diff % 86400000) / 3600000);
    const mLeft = Math.floor((diff % 3600000) / 60000);

    el.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <p class="font-bold text-slate-900">📊 Weekly grade book <span class="text-xs font-normal text-slate-400">(pass = 60% or more)</span></p>
          <p class="text-xs text-slate-500">🔄 New questions every Monday · next exam in <span class="font-semibold text-slate-700">${dLeft}d ${hLeft}h ${mLeft}m</span></p>
        </div>
        ${sorted.length ? `
          <div class="relative">
            <div class="flex items-end gap-2 h-[120px]">${bars}</div>
            <div class="absolute left-0 right-0 border-t-2 border-dashed border-emerald-400/70" style="bottom: 72px">
              <span class="absolute -top-2.5 left-0 text-[9px] font-bold text-emerald-600 bg-white px-1">PASS 60%</span>
            </div>
          </div>
        ` : `
          <div class="text-center py-6 text-sm text-slate-500">
            <p class="text-3xl mb-2">📝</p>
            <p class="font-bold text-slate-700">No exams yet</p>
            <p class="mt-1">Take this week's assessment to start your grade book and earn XP.</p>
          </div>
        `}
        <div class="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm text-slate-600">${next ? '📈 <b>' + esc(next.name) + '</b> unlocks at <b>' + next.minXp + ' XP</b> — ' + (next.minXp - (user ? user.xp : 0)) + ' XP to go. Weekly exams are the fastest way to level up.' : '🏆 You reached the top level — keep practising to stay sharp!'}</p>
          <button class="btn-secondary !py-2 text-xs" onclick="showSection('levels')">View learning path</button>
        </div>
      </div>`;
  }

  /* --- share the latest result to the community feed --- */
  function shareScore() {
    if (!exam || !exam.submitted || !window.IELTS_FEED) return;
    const correct = exam.questions.reduce((n, q, i) => n + (checkAnswer(q, exam.answers['E' + (i + 1)]) ? 1 : 0), 0);
    window.IELTS_FEED.shareProgress('exam', { week: exam.week, score: correct, total: exam.questions.length });
  }

  /* --- actions --- */
  function start() {
    const week = getWeekNumber(new Date());
    if (exam && exam.week === week && !exam.submitted) return;

    exam = {
      week,
      questions: pickQuestions(week),
      answers: {},
      secondsLeft: EXAM_SECONDS,
      interval: null,
      submitted: false
    };

    renderExamRun();
    exam.interval = startTimer();
    saveExamState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function selectOption(qIndex, letter, btn) {
    if (!exam || exam.submitted) return;
    exam.answers['E' + (qIndex + 1)] = letter;
    const wrap = btn.closest('[data-options]');
    wrap.querySelectorAll('.opt').forEach((o) => o.classList.remove('selected'));
    btn.classList.add('selected');
    saveExamState();
  }

  function saveFill(qIndex, value) {
    if (!exam || exam.submitted) return;
    exam.answers['E' + (qIndex + 1)] = value;
    saveExamState();
  }

  function submit(auto) {
    if (!exam || exam.submitted) return;
    clearInterval(exam.interval);
    exam.submitted = true;
    exam.secondsUsed = EXAM_SECONDS - exam.secondsLeft;
    saveExamState(); // clears inProgress for this user

    const correct = exam.questions.reduce((n, q, i) => n + (checkAnswer(q, exam.answers['E' + (i + 1)]) ? 1 : 0), 0);

    // record & award XP only on the first attempt each week
    const history = window.IELTS_AUTH.getExamHistory();
    const alreadyTaken = history.some((h) => h.week === exam.week);
    window.IELTS_AUTH.recordExam(exam.week, correct, exam.questions.length, exam.secondsUsed);
    if (!alreadyTaken && !auto) {
      window.IELTS_AUTH.addXp(correct * XP_REWARDS.exam);
    }
    window.IELTS_AUTH.addActivity('exam', 'Completed Week ' + exam.week + ' Assessment Exam — ' + correct + '/' + exam.questions.length + ' correct', correct * XP_REWARDS.exam);

    render(); // refresh best-this-week banner, result and history
  }

  window.IELTS_EXAM = { render, start, submit, selectOption, saveFill, shareScore };
})();
