/* ============================================================
   IELTS Master — learning path (levels) module
   ============================================================ */
(function () {
  'use strict';

  const { LEVELS, LEVEL_UNLOCKS, LISTENING_TEST, READING_TEST, WRITING_TASKS } = window.IELTS_DATA;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const SKILL_LABELS = {
    listening: { name: 'Listening', icon: '🎧', total: LISTENING_TEST.length },
    reading: { name: 'Reading', icon: '📖', total: READING_TEST.length },
    writing: { name: 'Writing', icon: '✍️', total: WRITING_TASKS.length },
    speaking: { name: 'Speaking', icon: '🗣️', total: 3 }
  };

  function render() {
    const auth = window.IELTS_AUTH;
    const user = auth.getCurrentUser();
    const xp = user ? user.xp : 0;
    const current = auth.getLevel(xp);
    const next = auth.getNextLevel(xp);

    const currentIdx = LEVELS.findIndex((l) => l.id === current.id);
    const pctToNext = next
      ? Math.min(100, Math.round(((xp - current.minXp) / (next.minXp - current.minXp)) * 100))
      : 100;

    const levelCards = LEVELS.map((lvl, i) => {
      const isCurrent = lvl.id === current.id;
      const isReached = xp >= lvl.minXp;
      const isNext = next && lvl.id === next.id;
      const barPct = isCurrent && next ? pctToNext : (isReached ? 100 : 0);

      return `
        <div class="bg-white rounded-2xl border ${isCurrent ? 'border-brand-400 ring-2 ring-brand-100' : 'border-slate-200'} shadow-sm p-6 relative overflow-hidden">
          <div class="flex items-start justify-between mb-3">
            <div class="text-4xl">${lvl.icon}</div>
            ${isCurrent ? '<span class="text-xs font-bold bg-brand-100 text-brand-700 px-3 py-1 rounded-full">CURRENT LEVEL</span>' : isReached ? '<span class="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">COMPLETED</span>' : '<span class="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">🔒 LOCKED</span>'}
          </div>
          <h3 class="text-lg font-extrabold text-slate-900">${lvl.name}</h3>
          <p class="text-xs text-slate-500 mt-1">Requires ${lvl.minXp} XP${lvl.minXp === 0 ? '' : ' or more'}</p>
          <p class="text-sm text-slate-600 mt-2 leading-relaxed">${esc(lvl.desc)}</p>
          <div class="mt-4">
            <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full ${isCurrent ? 'bg-brand-500' : isReached ? 'bg-emerald-500' : 'bg-slate-200'} rounded-full transition-all" style="width: ${barPct}%"></div>
            </div>
            <p class="text-[11px] text-slate-400 mt-1.5">
              ${isCurrent && next ? xp + ' / ' + next.minXp + ' XP' : isReached ? 'Completed' : lvl.minXp + ' XP'}
            </p>
          </div>
        </div>`;
    }).join('');

    // What's unlocked at the current level (and locked for the next)
    const unlockBlocks = Object.keys(SKILL_LABELS).map((skill) => {
      const info = SKILL_LABELS[skill];
      const unlockedNow = LEVEL_UNLOCKS[skill][current.id] || 0;
      const nextUnlock = next ? (LEVEL_UNLOCKS[skill][next.id] || 0) : info.total;
      const items = [];

      for (let i = 0; i < info.total; i++) {
        const open = i < unlockedNow;
        const soon = next && i >= unlockedNow && i < nextUnlock;
        items.push(`
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold
            ${open ? 'bg-emerald-50 text-emerald-700' : soon ? 'bg-brand-50 text-brand-600' : 'bg-slate-50 text-slate-400'}">
            ${open ? '✅' : soon ? '🔓' : '🔒'} ${info.icon} ${i + 1}
          </span>`);
      }

      return `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <p class="font-bold text-slate-900 mb-2">${info.icon} ${info.name}</p>
          <div class="flex flex-wrap gap-1.5">${items.join('')}</div>
        </div>`;
    }).join('');

    $('#levels-content').innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-sm text-slate-500">Your progress</p>
            <p class="text-2xl font-extrabold text-slate-900">${user ? esc(user.username) : 'Guest'} · ${current.icon} ${current.name}</p>
          </div>
          <div class="text-right">
            <p class="text-3xl font-extrabold text-brand-600">${xp} <span class="text-sm font-semibold text-slate-400">XP</span></p>
            <p class="text-xs text-slate-500">${next ? next.minXp - xp + ' XP to ' + next.name : 'Maximum level reached! 🏆'}</p>
          </div>
        </div>
        <div class="mt-4 h-3 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full transition-all" style="width: ${pctToNext}%"></div>
        </div>
        <p class="text-xs text-slate-400 mt-2">${next ? 'Complete activities and weekly exams to earn XP and unlock the next level.' : 'You have reached the top level. Keep practising to stay sharp!'}</p>
      </div>

      <h3 class="text-lg font-bold text-slate-900 mb-3">Levels</h3>
      <div class="grid md:grid-cols-3 gap-5 mb-8">${levelCards}</div>

      <h3 class="text-lg font-bold text-slate-900 mb-1">Content unlocked by level</h3>
      <p class="text-sm text-slate-500 mb-4">✅ = available now · 🔓 = unlocks at the next level · 🔒 = locked</p>
      <div class="grid sm:grid-cols-2 gap-5">${unlockBlocks}</div>`;

    // Also show weekly exam progress snippet
    const history = auth.getExamHistory();
    if (history.length) {
      const last = history[history.length - 1];
      $('#levels-content').insertAdjacentHTML('beforeend', `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mt-5">
          <p class="font-bold text-slate-900 mb-1">📅 Last weekly exam</p>
          <p class="text-sm text-slate-600">Week ${last.week}: ${last.score} / ${last.total} correct</p>
        </div>`);
    }
  }

  window.IELTS_LEVELS = { render };
})();
