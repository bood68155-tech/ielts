/* ============================================================
   Rami Academy — Renderer
   ------------------------------------------------------------
   A full CEFR curriculum A1 → C2 (6 levels × 5 units × 4 lessons).
   Teacher Rami explains every lesson (teach[]), shows examples,
   builds words with Arabic meanings, then runs a 4-question quiz.
   Progress is stored per-user via IELTS_AUTH scoped storage; XP
   is awarded once per lesson through completeClaim.
   ============================================================ */
(function () {
  'use strict';
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (name, cls, opts) => (window.RAMI_ICONS && window.RAMI_ICONS.icon) ? window.RAMI_ICONS.icon(name || 'spark', cls || 'w-5 h-5', opts) : '◆';

  const state = { view: 'home', levelId: null, unitIdx: null, lessonId: null, answers: {} };

  const LEVELS = (window.IELTS_DATA && window.IELTS_DATA.RAMI_ACADEMY) || [];
  const MAP = {}; /* lessonId -> { levelId, unitIdx, lessonIdx, lesson } */
  let LESSON_COUNT = 0;
  (function build() {
    LEVELS.forEach((L) => {
      L.units.forEach((U, ui) => {
        U.lessons.forEach((lesson, li) => {
          MAP[lesson.id] = { levelId: L.id, unitIdx: ui, lessonIdx: li, lesson: lesson };
          LESSON_COUNT++;
        });
      });
    });
  })();

  const SKILL_KEY = { vocab: 'vocabulary', grammar: 'grammar', listen: 'listening', read: 'reading', speak: 'speaking', write: 'writing' };

  function levelById(id) { return LEVELS.find((L) => L.id === id); }
  function unitById(L, ui) { return L.units[ui]; }

  /* ---------- persistence ---------- */
  function cache() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) return null;
    let c = window.IELTS_AUTH.getScoped('ramiacademy', null);
    if (!c) { c = { done: {} }; window.IELTS_AUTH.setScoped('ramiacademy', c); }
    return window.IELTS_AUTH.getScoped('ramiacademy', null);
  }
  function save(c) { window.IELTS_AUTH.setScoped('ramiacademy', c); }
  function progress(c) { const d = c ? Object.keys(c.done || {}).length : 0; return { done: d, total: LESSON_COUNT }; }

  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) window.IELTS_AUTH.onUserChange(() => { state.view = 'home'; state.levelId = null; state.unitIdx = null; state.lessonId = null; state.answers = {}; });

  /* ---------- actions ---------- */
  function answer(lessonId, qi, opt) {
    state.answers[lessonId + '-' + qi] = opt;
    const el = document.getElementById('raq-' + qi);
    if (el) el.innerHTML = renderQuizQ(lessonId, qi, opt);
  }
  function quizAnswered(lessonId) {
    const L = MAP[lessonId];
    if (!L) return 0;
    let n = 0;
    (L.lesson.quiz || []).forEach((_, i) => { if (state.answers[lessonId + '-' + i] != null) n++; });
    return n;
  }
  function check(lessonId) {
    const L = MAP[lessonId];
    if (!L) return;
    const lesson = L.lesson;
    if (quizAnswered(lessonId) < (lesson.quiz || []).length) { window.toast && window.toast('⚠️ Answer the whole quiz first — Rami wants to see your thinking!'); return; }
    if (quizScore(lessonId) !== (lesson.quiz || []).length) { window.toast && window.toast('📘 Review the missed questions, then Rami will mark the lesson complete.'); return; }
    if (window.IELTS_AUTH.completeClaim('ramiacademy-' + lessonId)) {
      window.IELTS_AUTH.addXp(lesson.xp);
      window.IELTS_AUTH.addActivity('ramiacademy', 'Completed lesson: ' + lesson.title + ' (' + L.levelId.toUpperCase() + ')', lesson.xp);
      const sk = SKILL_KEY[lesson.tag] || lesson.tag;
      if (window.IELTS_BAND && window.IELTS_BAND.recordMastery) {
        try { window.IELTS_BAND.recordMastery(sk, 25); } catch (e) {}
      }
      window.toast && window.toast('✅ Lesson complete! +' + lesson.xp + ' XP from Rami Academy');
    }
    const c = cache();
    if (c) { c.done[lessonId] = Date.now(); save(c); }
    render();
  }
  function quizScore(lessonId) {
    const L = MAP[lessonId];
    if (!L) return 0;
    let s = 0;
    (L.lesson.quiz || []).forEach((q, i) => { if (state.answers[lessonId + '-' + i] === q.ans) s++; });
    return s;
  }

  /* ---------- render ---------- */
  function render() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) { window.IELTS_AUTH.showScreen(); return; }
    if (state.view === 'lesson') return renderLesson();
    if (state.view === 'unit') return renderUnit();
    if (state.view === 'level') return renderLevel();
    renderHome();
  }
  function open(levelId) { state.view = 'level'; state.levelId = levelId; state.unitIdx = null; state.lessonId = null; render(); }
  function openUnit(levelId, ui) { state.view = 'unit'; state.levelId = levelId; state.unitIdx = ui; state.lessonId = null; render(); }
  function openLesson(lessonId) { state.view = 'lesson'; state.lessonId = lessonId; state.answers = {}; render(); }
  function back() {
    if (state.view === 'lesson' && state.unitIdx != null) { state.view = 'unit'; state.lessonId = null; }
    else if (state.view === 'unit' && state.levelId) { state.view = 'level'; state.unitIdx = null; }
    else { state.view = 'home'; state.levelId = null; }
    render();
  }
  function home() { state.view = 'home'; state.levelId = null; state.unitIdx = null; state.lessonId = null; render(); }

  /* ---------- level helpers ---------- */
  function levelProgress(L, c) {
    let done = 0;
    L.units.forEach((U) => U.lessons.forEach((l) => { if (c.done[l.id]) done++; }));
    return { done: done, total: L.lessonsTotal };
  }
  function unitProgress(L, U, c) {
    let done = 0;
    U.lessons.forEach((l) => { if (c.done[l.id]) done++; });
    return { done: done, total: U.lessons.length };
  }

  /* ---------- home ---------- */
  function renderHome() {
    const c = cache() || { done: {} };
    const p = progress(c);
    $('#ramiacademy-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p class="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest">Teacher Rami · Full curriculum</p>
            <h2 class="text-xl font-extrabold text-[#f5f0e6]">Rami Academy — CEFR A1 → C2</h2>
            <p class="text-sm text-[#f5f0e6]/60 mt-1">6 levels · 5 units each · 4 lessons per unit. Rami explains every lesson step by step, then quizzes you before you earn the XP.</p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-extrabold text-[#d4af37]">${p.done}<span class="text-sm text-[#f5f0e6]/50">/${p.total}</span></p>
            <p class="text-[10px] font-bold text-[#f5f0e6]/50 uppercase tracking-wide">Lessons done</p>
          </div>
        </div>
        <div class="w-full h-2 bg-[rgba(212,175,55,0.15)] rounded-full mt-4 overflow-hidden">
          <div class="h-full bg-[#d4af37] rounded-full transition-all" style="width:${Math.round((p.done / p.total) * 100)}%"></div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        ${LEVELS.map((L) => {
          const lp = levelProgress(L, c);
          const doneAll = lp.done === lp.total;
          return `
          <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.2)] rounded-2xl p-5 cursor-pointer hover:border-[#d4af37] transition" onclick="IELTS_ACADEMY.open('${L.id}')">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center" style="color:${L.accent}">${doneAll ? '✓' : icon(L.id === 'a1' ? 'read' : L.id === 'a2' ? 'spark' : L.id === 'b1' ? 'grammar' : L.id === 'b2' ? 'write' : L.id === 'c1' ? 'evaluate' : 'exam', 'w-6 h-6', { anim: true })}</div>
                <div>
                  <h3 class="text-lg font-extrabold text-[#f5f0e6]">${esc(L.name)}</h3>
                  <p class="text-xs text-[#f5f0e6]/55">${esc(L.tagline)} · ${L.lessonsTotal} lessons · ${L.xpTotal} XP</p>
                </div>
              </div>
              <span class="text-xs font-bold text-[#f5f0e6]/70">${lp.done}/${lp.total}</span>
            </div>
            <p class="text-sm text-[#f5f0e6]/60 mt-2 leading-relaxed">${esc(L.blurb)}</p>
            <div class="flex flex-wrap gap-2 mt-4">
              ${L.units.map((U) => `<span class="text-[10px] font-bold px-2 py-1 rounded border border-[rgba(212,175,55,0.25)] text-[#f5f0e6]/75">${esc(U.title)} · ${U.lessons.length}</span>`).join('')}
            </div>
          </div>`;
        }).join('')}
      </div>
      <p class="text-center text-xs text-[#f5f0e6]/40 mt-6">Answer every quiz question correctly to claim the lesson XP — Rami teaches, then you prove it.</p>`;
  }

  /* ---------- level (units) ---------- */
  function renderLevel() {
    const L = levelById(state.levelId);
    if (!L) { renderHome(); return; }
    const c = cache() || { done: {} };
    const lp = levelProgress(L, c);
    $('#ramiacademy-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest" style="color:${L.accent}">${esc(L.name)} · ${L.lessonsTotal} lessons</p>
            <h2 class="text-xl font-extrabold text-[#f5f0e6]">${esc(L.label)} — ${esc(L.tagline)}</h2>
            <p class="text-sm text-[#f5f0e6]/60 mt-1">${esc(L.blurb)}</p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-extrabold" style="color:${L.accent}">${lp.done}<span class="text-sm text-[#f5f0e6]/50">/${lp.total}</span></p>
            <button class="btn-secondary text-sm mt-2" onclick="IELTS_ACADEMY.home()">← All levels</button>
          </div>
        </div>
        <div class="w-full h-2 bg-[rgba(212,175,55,0.15)] rounded-full mt-4 overflow-hidden">
          <div class="h-full rounded-full transition-all" style="width:${Math.round((lp.done / lp.total) * 100)}%;background:${L.accent}"></div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${L.units.map((U, ui) => {
          const up = unitProgress(L, U, c);
          return `
          <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-5 cursor-pointer hover:border-[#d4af37] transition" onclick="IELTS_ACADEMY.openUnit('${L.id}',${ui})">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center" style="color:${L.accent}">${icon(U.icon, 'w-6 h-6', { anim: true })}</div>
                <div>
                  <h3 class="font-extrabold text-[#f5f0e6]">${esc(U.title)}</h3>
                  <p class="text-xs text-[#f5f0e6]/55">${U.lessons.length} guided lessons</p>
                </div>
              </div>
              <span class="text-xs font-bold text-[#f5f0e6]/70">${up.done}/${up.total}</span>
            </div>
            <p class="text-sm text-[#f5f0e6]/60 mt-2 leading-relaxed">${esc(U.desc || '')}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              ${U.lessons.map((l) => c.done[l.id] ? '<span class="text-[10px] font-bold text-emerald-300">✓</span>' : '').join('')}
              <span class="text-[10px] font-bold px-2 py-1 rounded border border-[rgba(212,175,55,0.25)] text-[#f5f0e6]/75">${U.lessons.reduce((a, l) => a + l.mins, 0)} min total</span>
            </div>
          </div>`;
        }).join('')}
      </div>`;
  }

  /* ---------- unit (lessons) ---------- */
  function renderUnit() {
    const L = levelById(state.levelId);
    const c = cache() || { done: {} };
    if (!L || state.unitIdx == null || !L.units[state.unitIdx]) { renderLevel(); return; }
    const U = L.units[state.unitIdx];
    const up = unitProgress(L, U, c);
    $('#ramiacademy-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex items-start justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center" style="color:${L.accent}">${icon(U.icon, 'w-6 h-6', { anim: true })}</div>
            <div>
              <p class="text-[10px] font-bold uppercase tracking-widest" style="color:${L.accent}">${esc(L.name)}</p>
              <h2 class="text-xl font-extrabold text-[#f5f0e6]">${esc(U.title)}</h2>
            </div>
          </div>
          <div class="flex items-center gap-3 flex-wrap">
            <span class="text-xs font-bold text-[#f5f0e6]/70 border border-[rgba(212,175,55,0.25)] px-2 py-1 rounded">${up.done}/${up.total} done</span>
            <button class="btn-secondary text-sm" onclick="IELTS_ACADEMY.open('${L.id}')">← ${esc(L.label)}</button>
          </div>
        </div>
      </div>
      <div class="space-y-2">
        ${U.lessons.map((ls) => {
          const isDone = !!c.done[ls.id];
          return `
          <div class="flex items-center gap-3 rounded-xl border ${isDone ? 'border-emerald-400/30 bg-emerald-400/5' : 'border-[rgba(212,175,55,0.2)] hover:border-[#d4af37]'} p-3 cursor-pointer transition" onclick="IELTS_ACADEMY.openLesson('${ls.id}')">
            <div class="w-9 h-9 rounded-lg ${isDone ? 'bg-emerald-400/15 text-emerald-300' : 'bg-[rgba(212,175,55,0.12)]'} flex items-center justify-center" style="color:${isDone ? '' : L.accent}">${isDone ? '✓' : icon(ls.icon, 'w-5 h-5')}</div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-[#f5f0e6]">${esc(ls.title)}</p>
              <p class="text-xs text-[#f5f0e6]/50">${esc(ls.objective)}</p>
            </div>
            <div class="text-right shrink-0">
              <p class="text-xs font-bold text-[#f5f0e6]/70">${ls.mins} min</p>
              <p class="text-[10px]" style="color:${L.accent}">+${ls.xp} XP</p>
            </div>
          </div>`;
        }).join('')}
      </div>`;
  }

  /* ---------- lesson ---------- */
  function renderLesson() {
    const M = MAP[state.lessonId];
    if (!M) { renderHome(); return; }
    const L = levelById(M.levelId);
    const U = L.units[M.unitIdx];
    const lesson = M.lesson;
    const c = cache() || { done: {} };
    const isDone = !!c.done[lesson.id];
    const answered = quizAnswered(lesson.id);
    const qn = (lesson.quiz || []).length;
    const score = quizScore(lesson.id);
    const ready = !isDone && answered === qn && score === qn;
    $('#ramiacademy-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-widest" style="color:${L.accent}">${esc(L.name)} · ${esc(U.title)}</p>
            <h2 class="text-xl font-extrabold text-[#f5f0e6] mt-1">${icon(lesson.icon, 'w-6 h-6 inline-block mr-1 align-[-2px]')}${esc(lesson.title)}</h2>
            <p class="text-sm text-[#f5f0e6]/60 mt-1">${esc(lesson.objective)}</p>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            ${isDone ? '<span class="text-xs font-bold text-emerald-300 border border-emerald-400/40 px-2 py-1 rounded">✓ Completed</span>' : ''}
            <span class="text-xs font-bold text-[#f5f0e6]/70 border border-[rgba(212,175,55,0.25)] px-2 py-1 rounded">${lesson.mins} min · +${lesson.xp} XP</span>
            <button class="btn-secondary text-sm" onclick="IELTS_ACADEMY.openUnit('${L.id}',${M.unitIdx})">← Unit</button>
          </div>
        </div>
      </div>

      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-5 mb-4">
        <div class="flex items-center gap-2 mb-3">
          ${icon('speak', 'w-5 h-5')}<p class="text-xs font-bold text-[#d4af37] uppercase tracking-widest">Rami explains</p>
        </div>
        <ul class="space-y-2">
          ${lesson.teach.map((x) => `<li class="text-sm text-[#f5f0e6]/85 flex gap-2"><span class="text-[#d4af37] shrink-0">•</span><span>${esc(x)}</span></li>`).join('')}
        </ul>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-5">
          <div class="flex items-center gap-2 mb-3">
            ${icon('read', 'w-5 h-5')}<p class="text-xs font-bold text-[#d4af37] uppercase tracking-widest">Examples in the wild</p>
          </div>
          <div class="space-y-2">
            ${(lesson.examples || []).map((ex) => `
              <div class="rounded-lg border border-[rgba(212,175,55,0.15)] p-3">
                <p class="text-sm text-[#f5f0e6] font-semibold">${esc(ex.en)}</p>
                <p class="text-xs text-[#f5f0e6]/50 mt-1">${esc(ex.note)}</p>
              </div>`).join('') || '<p class="text-sm text-[#f5f0e6]/50">—</p>'}
          </div>
        </div>
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-5">
          <div class="flex items-center gap-2 mb-3">
            ${icon('vocab', 'w-5 h-5')}<p class="text-xs font-bold text-[#d4af37] uppercase tracking-widest">Words to keep</p>
          </div>
          <div class="space-y-2">
            ${(lesson.words || []).map((w) => `
              <div class="rounded-lg border border-[rgba(212,175,55,0.15)] p-3">
                <p class="text-sm font-bold text-[#f5f0e6]">${esc(w.w)} <span class="text-xs font-normal text-[#d4af37]">${esc(w.ar)}</span></p>
                <p class="text-xs text-[#f5f0e6]/50 mt-1">${esc(w.ex)}</p>
              </div>`).join('') || '<p class="text-sm text-[#f5f0e6]/50">—</p>'}
          </div>
        </div>
      </div>

      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div class="flex items-center gap-2">
            ${icon('exam', 'w-5 h-5')}<p class="text-xs font-bold text-[#d4af37] uppercase tracking-widest">Rami's quiz</p>
          </div>
          <p class="text-xs text-[#f5f0e6]/55">${answered}/${qn} answered · ${score}/${qn} correct</p>
        </div>
        <div id="raq-quiz" class="space-y-3">
          ${(lesson.quiz || []).map((_, i) => `<div id="raq-${i}">${renderQuizQ(lesson.id, i)}</div>`).join('')}
        </div>
        <div class="flex items-center justify-between mt-5 flex-wrap gap-3">
          <p class="text-sm text-[#f5f0e6]/70">
            ${isDone ? 'You already earned the XP for this lesson.' : (answered < qn ? 'Finish the quiz to unlock the lesson XP.' : (score < qn ? 'Rami wants a perfect score — review the red ones and try again.' : 'Perfect! Claim your XP.'))}
          </p>
          <button class="btn-primary text-sm" onclick="IELTS_ACADEMY.check('${lesson.id}')" ${isDone ? 'disabled' : !ready ? 'disabled' : ''} style="${!isDone && !ready ? 'opacity:.5;cursor:not-allowed' : ''}">${isDone ? '✓ Completed' : (ready ? '✅ Claim ' + lesson.xp + ' XP' : '🔒 Answer the quiz first')}</button>
        </div>
      </div>`;
    const sc = document.getElementById('ramiacademy-content');
    if (sc) sc.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderQuizQ(lessonId, qi, chosen) {
    const M = MAP[lessonId];
    if (!M) return '';
    const q = M.lesson.quiz[qi];
    if (!q) return '';
    const sel = chosen != null ? chosen : (state.answers[lessonId + '-' + qi] != null ? state.answers[lessonId + '-' + qi] : null);
    const answered = sel != null;
    const correct = answered && sel === q.ans;
    return `
      <div class="rounded-lg border p-3 ${answered ? (correct ? 'border-emerald-400/40 bg-emerald-400/5' : 'border-red-400/40 bg-red-400/5') : 'border-[rgba(212,175,55,0.2)]'}">
        <p class="text-sm text-[#f5f0e6] font-semibold mb-2">${qi + 1}. ${esc(q.q)}</p>
        <div class="flex flex-wrap gap-2">
          ${q.opts.map((o, i) => `
            <button onclick="IELTS_ACADEMY.answer('${lessonId}',${qi},${i})" class="px-3 py-1.5 rounded-lg text-xs border transition ${answered ? (i === q.ans ? 'border-emerald-400/60 text-emerald-300 bg-emerald-400/10' : (i === sel ? 'border-red-400/60 text-red-300 bg-red-400/10' : 'border-[rgba(212,175,55,0.15)] text-[#f5f0e6]/50')) : 'border-[rgba(212,175,55,0.25)] text-[#f5f0e6]/85 hover:border-[#d4af37] hover:text-[#f5f0e6]'}">${esc(o)}</button>`).join('')}
        </div>
        ${answered ? `<p class="text-xs mt-2 leading-relaxed ${correct ? 'text-emerald-300' : 'text-red-300'}">${correct ? '✅ Correct — ' : '❌ The answer is: ' + esc(q.opts[q.ans]) + ' — '}${esc(q.why)}</p>` : ''}
      </div>`;
  }

  window.IELTS_ACADEMY = { render, open, openUnit, openLesson, back, home, check, answer };
})();