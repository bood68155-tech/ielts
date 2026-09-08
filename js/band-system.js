/* ============================================================
   IELTS Master — Band 1.0-9.0 Progression Architecture
   Dynamic level paths (Foundation / Intermediate / Advanced),
   daily skill roadmaps, band badges, and Neon/Supabase sync.
   ============================================================ */
(function () {
  'use strict';
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* Band tiers: id -> (bandStart, bandEnd, xp range) */
  const BAND_TIERS = [
    { id: 'band1', name: 'Band 1.0', band: '1.0-2.0', path: 'Foundation', icon: '🌱', minXp: 0, color: '#6b7280', req: { band: 1 } },
    { id: 'band2', name: 'Band 2.0', band: '2.0-3.0', path: 'Foundation', icon: '🌱', minXp: 50, color: '#4ade80', req: { band: 2, pct: 25 } },
    { id: 'band3', name: 'Band 3.0', band: '3.0-4.0', path: 'Foundation', icon: '🌿', minXp: 120, color: '#22c55e', req: { band: 3, pct: 35 } },
    { id: 'band4', name: 'Band 4.0', band: '4.0-4.5', path: 'Foundation', icon: '🌿', minXp: 220, color: '#84cc16', req: { band: 4, pct: 45 } },
    { id: 'band5', name: 'Band 5.0', band: '4.5-5.0', path: 'Intermediate', icon: '🚀', minXp: 350, color: '#facc15', req: { band: 5, pct: 50 } },
    { id: 'band6', name: 'Band 6.0', band: '5.5-6.0', path: 'Intermediate', icon: '📈', minXp: 500, color: '#fb923c', req: { band: 6, pct: 60 } },
    { id: 'band6.5', name: 'Band 6.5', band: '6.0-6.5', path: 'Intermediate', icon: '📈', minXp: 650, color: '#f97316', req: { band: 6.5, pct: 65 } },
    { id: 'band7', name: 'Band 7.0', band: '7.0', path: 'Advanced', icon: '🏆', minXp: 800, color: '#a78bfa', req: { band: 7, pct: 70 } },
    { id: 'band7.5', name: 'Band 7.5', band: '7.5', path: 'Advanced', icon: '🏆', minXp: 1000, color: '#8b5cf6', req: { band: 7.5, pct: 75 } },
    { id: 'band8', name: 'Band 8.0', band: '8.0', path: 'Advanced', icon: '👑', minXp: 1250, color: '#f472b6', req: { band: 8, pct: 80 } },
    { id: 'band8.5', name: 'Band 8.5', band: '8.5', path: 'Advanced', icon: '👑', minXp: 1550, color: '#e879f9', req: { band: 8.5, pct: 85 } },
    { id: 'band9', name: 'Band 9.0', band: '9.0', path: 'Advanced', icon: '💎', minXp: 2000, color: '#fbbf24', req: { band: 9, pct: 90 } }
  ];

  /* Daily roadmap template: one entry per skill, filled by band */
  const SKILLS = [
    { key: 'vocabulary', name: 'Vocabulary', icon: '📚' },
    { key: 'reading', name: 'Reading', icon: '📖' },
    { key: 'listening', name: 'Listening', icon: '🎧' },
    { key: 'writing', name: 'Writing', icon: '✍️' },
    { key: 'speaking', name: 'Speaking', icon: '🗣️' }
  ];

  const DAILY_TASK_POOL = {
    vocabulary: [
      { title: 'AWL 10 words — flashcards', desc: 'Review 10 high-frequency academic words with spaced repetition.', target: 10, section: 'awl' },
      { title: 'Collocation drill', desc: 'Practise 8 academic collocations in context sentences.', target: 8, section: 'awl' },
      { title: 'Vocabulary quiz', desc: 'Complete a 10-question AWL gap-fill quiz.', target: 10, section: 'awl' }
    ],
    reading: [
      { title: 'Graded passage + quiz', desc: 'Read a Band-matched passage and answer comprehension questions.', target: 10, section: 'reading' },
      { title: 'Timed reading exam', desc: 'Attempt a timed passage with passage scanning practice.', target: 10, section: 'reading' }
    ],
    listening: [
      { title: 'Transcript listening drill', desc: 'Listen/read and answer section questions.', target: 8, section: 'listening' },
      { title: 'Speed-varied repeat', desc: 'Replay a section at 0.75x to catch missed answers.', target: 8, section: 'listening' }
    ],
    writing: [
      { title: 'Structure builder', desc: 'Build a Band-matched essay/task structure from the generator.', target: 1, section: 'writing' },
      { title: 'Model answer study', desc: 'Study a Band 9 model and note 5 advanced phrases.', target: 5, section: 'writing' }
    ],
    speaking: [
      { title: 'Part response practice', desc: 'Record yourself answering a Part question and replay.', target: 3, section: 'speaking' },
      { title: 'Fluency checklist', desc: 'Self-assess fluency, cohesion and vocabulary range.', target: 1, section: 'speaking' }
    ]
  };

  const state = { view: 'home', skill: null };

  function cache() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) return null;
    let c = window.IELTS_AUTH.getScoped('bandsys', null);
    if (!c) {
      c = {
        badges: {},
        completed: {},     // { '2026-09-08-vocabulary': true }
        dailyCount: {},
        masteryScores: {}, // { reading: 0-100 }
        xp: u.xp || 0
      };
      window.IELTS_AUTH.setScoped('bandsys', c);
    }
    return window.IELTS_AUTH.getScoped('bandsys', null);
  }
  function save(c) { window.IELTS_AUTH.setScoped('bandsys', c); }

  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) window.IELTS_AUTH.onUserChange(() => { state.view = 'home'; });

  function todayKey() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  /* Resolve band tier from XP and mastery */
  function getBandTier() {
    const c = cache();
    const xp = window.IELTS_AUTH.getCurrentUser() ? window.IELTS_AUTH.getCurrentUser().xp : 0;
    // Effective band = base from XP, boosted by mastery (avg skill score)
    const mastery = c.masteryScores || {};
    const avg = Object.keys(mastery).length ? Object.values(mastery).reduce((a, b) => a + b, 0) / Object.keys(mastery).length : 0;
    let tier = BAND_TIERS[0];
    for (const t of BAND_TIERS) {
      // Requirement: XP >= minXp AND mastery pct >= req.pct (if any mastery recorded)
      if (xp >= t.minXp && (avg === 0 || avg >= (t.req && t.req.pct || 0))) tier = t;
    }
    return tier;
  }

  function currentBandLabel() {
    const c = cache();
    const mastery = c.masteryScores || {};
    const avg = Object.keys(mastery).length ? Math.round(Object.values(mastery).reduce((a, b) => a + b, 0) / Object.keys(mastery).length) : 0;
    const tier = getBandTier();
    return { tier, avg, mastery };
  }

  function unlockedBandIds() {
    const c = cache();
    return Object.keys(c.badges || {});
  }

  /* ---------- XP <-> band bridging ---------- */
  function awardBandXp(amount, activity, type) {
    if (window.IELTS_AUTH) {
      window.IELTS_AUTH.addXp(amount);
      window.IELTS_AUTH.addActivity(type, activity, amount);
    }
  }

  function recordMastery(skill, scorePct) {
    const c = cache();
    c.masteryScores[skill] = Math.max(c.masteryScores[skill] || 0, scorePct);
    const tier = getBandTierFrom(c);
    if (tier && !c.badges[tier.id]) {
      c.badges[tier.id] = { unlockedAt: Date.now(), band: tier.name };
      awardBandXp(40, 'Earned ' + tier.name + ' mastery badge', 'badge');
      window.toast && window.toast('🏅 New badge: ' + tier.name + '! +40 XP');
    }
    save(c);
    pushToDb(c);
  }

  function getBandTierFrom(c) {
    const xp = window.IELTS_AUTH.getCurrentUser() ? window.IELTS_AUTH.getCurrentUser().xp : 0;
    const m = c.masteryScores || {};
    const avg = Object.keys(m).length ? Object.values(m).reduce((a, b) => a + b, 0) / Object.keys(m).length : 0;
    let tier = BAND_TIERS[0];
    for (const t of BAND_TIERS) {
      if (xp >= t.minXp && (avg === 0 || avg >= (t.req && t.req.pct || 0))) tier = t;
    }
    return tier;
  }

  /* ---------- NeoDB/Supabase persistence ---------- */
  function pushToDb(c) {
    try {
      const u = window.IELTS_AUTH.getCurrentUser();
      if (u && window.IELTS_DB && window.IELTS_DB.isConfigured()) {
        window.IELTS_DB.upsertProfile(u.id, {
          targetBand: c.targetBand || window.IELTS_AUTH.getScoped('profile', {}).targetBand || '',
          bandBadges: c.badges,
          masteryScores: c.masteryScores,
          bandSystem: { badges: c.badges, masteryScores: c.masteryScores, dailyCount: c.dailyCount }
        });
      }
    } catch (e) { /* offline */ }
  }

  function setTargetBand(val) {
    const c = cache();
    c.targetBand = val;
    save(c);
    try {
      const u = window.IELTS_AUTH.getCurrentUser();
      const prof = window.IELTS_AUTH.getScoped('profile', {}) || {};
      prof.targetBand = val;
      window.IELTS_AUTH.setScoped('profile', prof);
      if (u && window.IELTS_DB) window.IELTS_DB.upsertProfile(u.id, { targetBand: val });
    } catch (e) {}
  }

  /* ---------- daily completion ---------- */
  function completeTask(skill, taskIndex) {
    const c = cache();
    const key = todayKey() + '-' + skill;
    c.completed[key] = (c.completed[key] || {});
    c.completed[key][taskIndex] = true;
    c.dailyCount[skill] = (c.dailyCount[skill] || 0) + 1;
    save(c);
    awardBandXp(10, 'Completed daily task: ' + skill, 'daily');
    const task = DAILY_TASK_POOL[skill][taskIndex];
    if (task && task.section === 'awl') openSection('awl');
    else if (task && task.section === 'reading') openSection('reading');
    else if (task && task.section === 'listening') openSection('listening');
    else if (task && task.section === 'writing') openSection('writing');
    else if (task && task.section === 'speaking') openSection('speaking');
    window.toast && window.toast('+10 XP!');
    render();
  }

  function openSection(name) {
    const map = { awl: 'awl', reading: 'reading-master', listening: 'listening-master', writing: 'writing-coach', speaking: 'speaking-sim' };
    const target = map[name];
    if (target && window.showSection) window.showSection(target);
  }

  /* ---------- render ---------- */
  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) { window.IELTS_AUTH.showScreen(); return; }
    const c = cache();
    const info = currentBandLabel();
    const tier = info.tier;
    const nextTier = BAND_TIERS[BAND_TIERS.findIndex((t) => t.id === tier.id) + 1];
    const xp = user.xp;
    const xpInto = xp - tier.minXp;
    const tierSpan = nextTier ? nextTier.minXp - tier.minXp : 200;
    const progress = nextTier ? Math.min(100, Math.round((xpInto / tierSpan) * 100)) : 100;

    $('#bandsys-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="text-2xl font-extrabold text-[#f5f0e6]">🎯 Band Mastery System</h2>
            <p class="text-sm text-[#f5f0e6]/60 mt-1">Level up from <strong>Band 1.0</strong> to <strong>Band 9.0</strong> across all four skills + vocabulary.</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-3xl">${tier.icon}</span>
            <div>
              <p class="text-xl font-extrabold text-[#d4af37]">${esc(tier.name)}</p>
              <p class="text-xs text-[#f5f0e6]/50">${esc(tier.path)} path</p>
            </div>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-3">
          <div class="flex-1 h-3 bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.2)] rounded-full overflow-hidden">
            <div class="h-full rounded-full transition-all" style="width:${progress}%;background:linear-gradient(90deg, ${tier.color}, #d4af37)"></div>
          </div>
          <span class="text-xs font-bold text-[#f5f0e6]/70">${xp} XP</span>
        </div>
        ${nextTier ? '<p class="text-xs text-[#f5f0e6]/50 mt-2">Next: ' + esc(nextTier.name) + ' at ' + nextTier.minXp + ' XP · Band mastery avg ' + (tier.req && tier.req.pct || 0) + '%+</p>' : '<p class="text-xs text-[#d4af37] mt-2">🏆 Maximum band reached!</p>'}
      </div>

      ${targetBandPanel(c)}
      ${pathPanel()}
      ${skillMasteryPanel(info)}
      ${diagPanel()}
      ${roadmapPanel(c)}
      ${badgePanel()}
    `;
  }

  /* ---------- diagnostic analytics widget (band report engine) ---------- */
  function diagPanel() {
    if (window.IELTS_DIAG && window.IELTS_DIAG.widgetHTML) {
      try { return window.IELTS_DIAG.widgetHTML(); } catch (e) { return ''; }
    }
    return '';
  }

  function targetBandPanel(c) {
    const bands = ['6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'];
    return `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6 mb-6">
        <h3 class="text-lg font-bold text-[#f5f0e6] mb-3">🎯 Set Your Target Band</h3>
        <p class="text-sm text-[#f5f0e6]/60 mb-3">Your roadmap tasks dynamically adapt to your target.</p>
        <div class="flex flex-wrap gap-2">
          ${bands.map((b) => `<button class="tab-pill ${c.targetBand === b ? 'active' : ''}" onclick="IELTS_BAND.setTarget('${b}')">Band ${b}</button>`).join('')}
        </div>
        ${c.targetBand ? '<p class="text-xs text-[#f5f0e6]/70 mt-3">Current target: <strong class="text-[#d4af37]">Band ' + esc(c.targetBand) + '</strong></p>' : ''}
      </div>`;
  }

  function pathPanel() {
    const paths = [
      { name: 'Foundation', band: 'Band 1.0-4.5', icon: '🌱', desc: 'Build core vocabulary, basic reading/listening, simple writing & speaking.', color: '#22c55e', skills: ['esl basics', 'common words', 'simple sentences'] },
      { name: 'Intermediate', band: 'Band 5.0-6.5', icon: '🚀', desc: 'Expand academic range, handle complex passages, develop arguments.', color: '#fb923c', skills: ['AWL + collocations', 'passage analysis', 'structured essays'] },
      { name: 'Advanced', band: 'Band 7.0-9.0', icon: '👑', desc: 'Master low-frequency vocabulary, dense texts, nuanced discussion & Band 9 style.', color: '#a78bfa', skills: ['advanced collocations', 'critical reading', 'native-like fluency'] }
    ];
    const tier = getBandTier();
    return `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6 mb-6">
        <h3 class="text-lg font-bold text-[#f5f0e6] mb-4">🗺️ Level Paths</h3>
        <div class="grid md:grid-cols-3 gap-4">
          ${paths.map((p) => `
            <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-5 ${tier.path === p.name ? 'ring-2 ring-[#d4af37]/60' : ''}">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-2xl">${p.icon}</span>
                <div>
                  <p class="font-bold text-[#f5f0e6]">${esc(p.name)}</p>
                  <p class="text-xs text-[#f5f0e6]/50">${esc(p.band)}</p>
                </div>
              </div>
              <p class="text-xs text-[#f5f0e6]/60 mb-3">${esc(p.desc)}</p>
              <div class="flex flex-wrap gap-1.5">
                ${p.skills.map((s) => '<span class="text-[10px] bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.25)] text-[#d4af37] px-2 py-0.5 rounded-full">' + esc(s) + '</span>').join('')}
              </div>
              ${tier.path === p.name ? '<p class="text-xs text-[#d4af37] font-bold mt-3">● Your current path</p>' : ''}
            </div>`).join('')}
        </div>
      </div>`;
  }

  function skillMasteryPanel(info) {
    const defs = { vocabulary: 25, reading: 40, listening: 35, writing: 15, speaking: 12 };
    return `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6 mb-6">
        <h3 class="text-lg font-bold text-[#f5f0e6] mb-1">📊 Skill Mastery</h3>
        <p class="text-sm text-[#f5f0e6]/60 mb-4">Improve each skill to reach your next band. Average mastery: <strong class="text-[#d4af37]">${info.avg}%</strong></p>
        <div class="grid md:grid-cols-2 gap-3">
          ${SKILLS.map((s) => {
            const val = info.mastery[s.key] || 0;
            const nextVal = Math.min(100, val + (defs[s.key] || 20));
            return `
              <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-bold text-[#f5f0e6]">${s.icon} ${esc(s.name)}</span>
                  <span class="text-sm font-bold text-[#d4af37]">${val}%</span>
                </div>
                <div class="h-2 bg-[rgba(245,240,230,0.1)] rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all" style="width:${val}%;background:linear-gradient(90deg,#d4af37,#fff)"></div>
                </div>
                ${val < 60 ? '<p class="text-[10px] text-[#f5f0e6]/40 mt-2">Complete exercises to reach ' + nextVal + '% →</p>' : (val < 90 ? '<p class="text-[10px] text-[#f5f0e6]/40 mt-2">Great progress — push toward ' + nextVal + '%</p>' : '<p class="text-[10px] text-[#d4af37] mt-2">⭐ Mastered</p>')}
              </div>`;
          }).join('')}
        </div>
      </div>`;
  }

  function roadmapPanel(c) {
    const targetBandNum = parseFloat(c.targetBand || '7.0');
    const tier = getBandTier();
    // difficulty scale based on target: higher band -> harder tasks
    return `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-[#f5f0e6]">📅 Today's Skill Roadmap</h3>
          <span class="text-xs text-[#f5f0e6]/50">${todayKey()} · target Band ${c.targetBand || '—'}</span>
        </div>
        <div class="space-y-3">
          ${SKILLS.map((s) => {
            const tasks = DAILY_TASK_POOL[s.key];
            const done = (c.completed[todayKey() + '-' + s.key]) || {};
            const doneCount = Object.keys(done).length;
            return `
              <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.1)] rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-bold text-[#f5f0e6]">${s.icon} ${esc(s.name)} <span class="text-xs text-[#f5f0e6]/40">(${doneCount}/${tasks.length})</span></span>
                </div>
                <div class="space-y-2 mt-2">
                  ${tasks.map((t, ti) => `
                    <div class="flex items-start gap-2 ${done[ti] ? 'opacity-50' : ''}">
                      <span class="mt-0.5 text-sm">${done[ti] ? '✅' : '⬜'}</span>
                      <button class="text-left flex-1" onclick="IELTS_BAND.complete('${s.key}', ${ti})">
                        <p class="text-sm text-[#f5f0e6] ${done[ti] ? 'line-through' : ''}">${esc(t.title)}</p>
                        <p class="text-xs text-[#f5f0e6]/50">${esc(t.desc)}</p>
                      </button>
                    </div>`).join('')}
                </div>
              </div>`;
          }).join('')}
        </div>
        <button class="btn-primary w-full text-sm mt-4 py-3" onclick="IELTS_BAND.goPractice()">🚀 Launch Today's Practice</button>
      </div>`;
  }

  function badgePanel() {
    const c = cache();
    const earned = unlockedBandIds();
    return `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6">
        <h3 class="text-lg font-bold text-[#f5f0e6] mb-4">🏅 Band Badges</h3>
        <div class="flex flex-wrap gap-3">
          ${BAND_TIERS.map((t) => {
            const has = c.badges[t.id];
            return `
              <div class="w-20 h-20 rounded-xl flex flex-col items-center justify-center border text-center ${has ? 'border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[rgba(212,175,55,0.15)] opacity-40'}">
                <span class="text-2xl">${has ? t.icon : '🔒'}</span>
                <span class="text-[9px] font-bold text-[#f5f0e6] mt-1">${esc(t.name)}</span>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  }

  function goPractice() {
    // launch lowest-mastery skill's first incomplete task
    const c = cache();
    const pref = ['vocabulary', 'reading', 'listening', 'writing', 'speaking'];
    for (const s of pref) {
      const done = (c.completed[todayKey() + '-' + s]) || {};
      const tasks = DAILY_TASK_POOL[s];
      for (let ti = 0; ti < tasks.length; ti++) {
        if (!done[ti]) { openSection(tasks[ti].section); return; }
      }
    }
    window.toast && window.toast('All today\'s tasks complete! 🎉');
  }

  window.IELTS_BAND = {
    render,
    setTarget: setTargetBand,
    complete: completeTask,
    goPractice,
    recordMastery,
    getBandTier,
    currentBandLabel,
    BAND_TIERS
  };
})();
