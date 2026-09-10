/* ============================================================
   IELTS PA — Teacher Rami · Master Classroom
   ------------------------------------------------------------
   A live teaching hub where Teacher Rami (الأستاذ رامي) is the
   visible centre of the learning experience:

     • a pulsing stage avatar — Rami is "on" right now
     • a live Socratic whiteboard that mirrors every lesson as
       it happens on screen (concept, skill, step progress)
     • a real-time grade feed — every verdict (Strong /
       Developing / Off) lands here the instant it is given
     • step-by-step IELTS module walkthroughs (R / W / L / S)
       plus quick Socratic lessons, all launchable in one click

   Also bootstraps the bespoke heritage iconography: any
   [data-imi-icon] element (static HTML or rendered later) is
   filled from window.RAMI_ICONS, so every surface of the app
   uses the Palestinian-motif line art instead of clichéd emoji.
   ============================================================ */
(function () {
  'use strict';
  if (window.__MASTERCLASS__) return;
  window.__MASTERCLASS__ = true;

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const raf = window.requestAnimationFrame || ((fn) => setTimeout(fn, 16));

  /* ================= heritage icon bootstrap ================= */
  function iconify(rootEl) {
    const make = window.RAMI_ICONS && window.RAMI_ICONS.icon;
    if (!make || !rootEl || !rootEl.querySelectorAll) return;
    const spans = rootEl.querySelectorAll('[data-imi-icon]');
    for (let i = 0; i < spans.length; i++) {
      const el = spans[i];
      if (el.dataset.imiDone) continue;
      const name = el.getAttribute('data-imi-icon');
      if (!name) continue;
      const size = el.getAttribute('data-imi-size') || 'w-5 h-5';
      const svg = make(name, size);
      if (!svg) continue;
      el.innerHTML = svg;
      el.dataset.imiDone = '1';
    }
  }

  let iconTimer = null;
  function scheduleIconify() {
    if (iconTimer) return;
    iconTimer = raf(() => { iconTimer = null; iconify(document.body); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => iconify(document.body));
  } else {
    iconify(document.body);
  }

  /* ================= classroom state ================= */
  const MC_KEY = 'mc-classroom';

  function mcStore() {
    let c = null;
    try { c = (window.IELTS_AUTH && window.IELTS_AUTH.getScoped) ? window.IELTS_AUTH.getScoped(MC_KEY, null) : null; } catch (e) { /* ignore */ }
    if (!c || typeof c !== 'object') c = { sessions: 0, feed: [] };
    if (typeof c.sessions !== 'number') c.sessions = 0;
    if (!Array.isArray(c.feed)) c.feed = [];
    return c;
  }
  function mcSave(c) { try { if (window.IELTS_AUTH && window.IELTS_AUTH.setScoped) window.IELTS_AUTH.setScoped(MC_KEY, c); } catch (e) { /* ignore */ } }

  const mcSeen = new Set();
  let mcLive = false;

  /* ================= lesson catalog ================= */
  const MODULES = [
    { icon: 'read', title: 'Reading Walkthrough', tag: 'True / False / Not Given', lesson: 'reading-tfng', steps: ['Read the statement word by word.', 'Locate the exact passage lines.', 'Match → True · contradict → False · passage silent → Not Given.'] },
    { icon: 'write', title: 'Writing Walkthrough', tag: 'The PEEL Paragraph', lesson: 'writing-peel', steps: ['Point — one clear main idea.', 'Explain — why is it true?', 'Example + Link — evidence, then tie it back.'] },
    { icon: 'listen', title: 'Listening Walkthrough', tag: 'Predict from question words', lesson: 'listening-predict', steps: ['Read the questions before the audio.', 'Predict the answer type (WHO / WHEN / WHERE / HOW MUCH).', 'Catch the exact words and transfer fast.'] },
    { icon: 'speak', title: 'Speaking Walkthrough', tag: 'Three-beat fluency', lesson: 'speaking-three-beats', steps: ['Opinion — "I strongly believe…"', 'Reason — "The main reason is…"', 'Example — "For example, in my own experience…"'] }
  ];

  const QUICK_LESSONS = [
    { icon: 'grammar', label: 'Grammar · the -s rule', lesson: 'grammar-third-s' },
    { icon: 'vocab', label: 'Vocabulary · collocations', lesson: 'vocab-collocations' },
    { icon: 'idiom', label: 'Idioms · five exam-safe', lesson: 'idioms-five' },
    { icon: 'exam', label: 'Exam · 60-minute budget', lesson: 'exam-time' }
  ];

  const SKILL_LABEL = { reading: 'Reading', writing: 'Writing', speaking: 'Speaking', vocab: 'Vocabulary', grammar: 'Grammar', listening: 'Listening', idioms: 'Idioms', exam: 'Exam strategy' };
  const SKILL_ICON = { reading: 'read', writing: 'write', speaking: 'speak', vocab: 'vocab', grammar: 'grammar', listening: 'listen', idioms: 'idiom', exam: 'exam' };
  const VERDICT_TEXT = { strong: 'Strong', developing: 'Developing', off: 'Off' };
  const VERDICT_CLS = { strong: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/30', developing: 'bg-amber-400/15 text-amber-400 border-amber-400/30', off: 'bg-rose-400/15 text-rose-400 border-rose-400/30' };

  const ico = (name, cls, fallback) => (window.RAMI_ICONS && window.RAMI_ICONS.icon ? window.RAMI_ICONS.icon(name, cls || 'w-5 h-5') : (fallback || ''));
  const badge = (label, iconName) => (window.RAMI_ICONS && window.RAMI_ICONS.badge ? window.RAMI_ICONS.badge(label, iconName) : '<span class="imi-badge"><span>' + label + '</span></span>');

  /* ================= action ================= */
  function beginLesson(lessonId) {
    const c = mcStore();
    c.sessions += 1;
    mcSave(c);
    const b = document.getElementById('mc-session-count');
    if (b) b.textContent = c.sessions;
    if (window.IELTS_AI && window.IELTS_AI.startTutorSession) {
      try { window.IELTS_AI.startTutorSession(lessonId || undefined); } catch (e) { /* keep classroom resilient */ }
    }
  }

  /* ================= stage / whiteboard / feed ================= */

  function renderStage() {
    const c = mcStore();
    const avatar = (window.IELTS_AI && window.IELTS_AI.MENTOR_AVATAR) ? window.IELTS_AI.MENTOR_AVATAR : '';
    return '<div class="relative overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.35)] bg-[rgba(20,18,15,0.9)] p-6 mb-6 shadow-lg">' +
      '<div class="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[rgba(212,175,55,0.08)] blur-3xl pointer-events-none"></div>' +
      '<div class="absolute -bottom-20 -left-10 w-44 h-44 rounded-full bg-[rgba(180,50,50,0.08)] blur-3xl pointer-events-none"></div>' +
      '<div class="relative flex flex-wrap items-center gap-5">' +
        '<div class="mc-ring relative shrink-0">' +
          '<div class="w-24 h-24 rounded-full overflow-hidden bg-[#14120f] border-2 border-[rgba(212,175,55,0.7)] shadow-[0_0_30px_rgba(212,175,55,0.35)]">' + avatar + '</div>' +
          '<span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#14120f]"></span>' +
        '</div>' +
        '<div class="min-w-0 flex-1">' +
          '<p class="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">Master Classroom · live now</p>' +
          '<h2 class="text-2xl font-extrabold text-[#f5f0e6] leading-tight">Teacher Rami <span class="text-[#d4af37]">(الأستاذ رامي)</span></h2>' +
          '<p class="text-sm text-[#f5f0e6]/65 mt-1 max-w-lg leading-relaxed">Your visible teaching authority. Watch him write on the live board below, step through every IELTS module, and get each answer graded in real time.</p>' +
          '<div class="flex flex-wrap gap-1.5 mt-3">' +
            '<span class="imi-badge"><span><b class="text-[#d4af37]" id="mc-session-count">' + c.sessions + '</b> · live lessons coached</span></span>' +
            badge('Socratic whiteboard', 'roadmap') +
            badge('real-time grading', 'evaluate') +
          '</div>' +
        '</div>' +
        '<div class="flex flex-col gap-2 shrink-0">' +
          '<button class="px-4 py-2 rounded-lg text-sm font-bold text-[#14120f] bg-[#d4af37] hover:bg-[#b8962e] transition shadow" onclick="window.IELTS_MC && window.IELTS_MC.beginLesson()">' + ico('spark', 'w-3.5 h-3.5 inline-block mr-1 -mt-0.5', '') + 'Surprise lesson</button>' +
          '<button class="px-4 py-2 rounded-lg text-sm font-bold text-[#f5f0e6] border border-[rgba(212,175,55,0.35)] hover:bg-[rgba(212,175,55,0.1)] transition" onclick="showSection(\'teacher-chat\')">Open live chat</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function mcScoreProgress() {
    const prog = document.getElementById('tutor-progress');
    if (!prog) return { skillLabel: 'IELTS Skill', skillIcon: 'spark', pct: 0, counts: '' };
    const txt = String(prog.textContent || '');
    const line = String(txt.split('\n')[0] || '').trim();
    const key = String(line.split('·')[0] || '').trim().toLowerCase();
    const cm = txt.match(/\d+\/\d+/g);
    const bar = prog.querySelector('div[style*="width"]');
    let pct = 0;
    if (bar) {
      const w = bar.getAttribute('style');
      const mm = w && w.match(/width:\s*([\d.]+)%/);
      if (mm) pct = parseInt(mm[1], 10) || 0;
    }
    return { skillLabel: SKILL_LABEL[key] || 'IELTS Skill', skillIcon: SKILL_ICON[key] || 'spark', pct, counts: cm && cm.length ? cm[cm.length - 1] : '' };
  }

  function mcSetIdle() {
    mcLive = false;
    const status = document.getElementById('mc-board-status');
    if (status) {
      status.textContent = 'standby';
      status.classList.remove('text-emerald-400');
      status.classList.add('text-[#f5f0e6]/50');
    }
    const body = document.getElementById('mc-whiteboard-body');
    if (body) {
      body.className = 'mt-2 mc-chalk flex items-start gap-3';
      body.setAttribute('style', 'min-height:64px');
      body.innerHTML =
        '<span class="mt-0.5 shrink-0">' + ico('spark', 'w-5 h-5 text-[#d4af37]', '') + '</span>' +
        '<p class="text-sm text-[#f5f0e6]/70 leading-relaxed">Classroom in standby — pick a module walkthrough below. Rami writes every concept on this board and grades your answers in the feed.</p>';
    }
    const bp = document.getElementById('mc-board-progress');
    if (bp) bp.style.width = '0%';
  }

  function feedChipHtml(f) {
    const cls = VERDICT_CLS[f.v] || '';
    const label = VERDICT_TEXT[f.v] || esc(f.v);
    const tm = f.at ? new Date(f.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    return '<div class="flex items-center gap-2.5 rounded-lg border px-3 py-2 ' + cls + '">' +
      '<span class="text-[10px] font-extrabold uppercase tracking-widest shrink-0">' + label + '</span>' +
      '<span class="text-[11px] text-[#f5f0e6]/70 truncate flex-1">' + esc(f.s || '') + '</span>' +
      (tm ? '<span class="text-[10px] text-[#f5f0e6]/40 shrink-0">' + tm + '</span>' : '') +
    '</div>';
  }

  function mcFeedReRender() {
    const el = document.getElementById('mc-feed');
    if (!el) return;
    const c = mcStore();
    const chips = c.feed.slice(0, 8).map(feedChipHtml).join('');
    el.innerHTML = chips || '<p class="text-xs text-[#f5f0e6]/40 italic">No graded answers yet — start a lesson and every verdict lands here instantly.</p>';
  }

  /* Mirrors an active tutor session (when open in the AI modal) onto the
     classroom board + grade feed without touching the tutor engine itself. */
  function mcSync() {
    const modal = document.getElementById('ielts-ai-modal');
    if (!modal) return;
    const open = !modal.classList.contains('hidden');
    if (!open) { if (mcLive) mcSetIdle(); return; }
    if (!document.getElementById('tutor-progress')) return; /* unrelated AI modal */

    mcLive = true;
    const status = document.getElementById('mc-board-status');
    if (status) { status.textContent = 'teaching live'; status.classList.remove('text-[#f5f0e6]/50'); status.classList.add('text-emerald-400'); }

    const titleEl = document.getElementById('ielts-ai-modal-title');
    const title = titleEl ? String(titleEl.textContent || '') : '';
    const clean = title.replace(/^Socratic Lesson\s*[-–]+\s*/i, '').trim();

    const pi = mcScoreProgress();

    const msgs = document.getElementById('tutor-messages');
    let lastTeach = '';
    if (msgs) {
      const rows = msgs.children;
      for (let i = rows.length - 1; i >= 0; i--) {
        const p = rows[i].querySelector('p');
        if (p && !rows[i].querySelector('span.uppercase')) { lastTeach = (p.textContent || '').trim().slice(0, 220); break; }
      }
    }

    const body = document.getElementById('mc-whiteboard-body');
    if (body) {
      body.className = 'mt-2 mc-chalk flex items-start gap-3';
      body.setAttribute('style', 'min-height:64px');
      body.innerHTML =
        '<span class="mt-0.5 shrink-0">' + ico(pi.skillIcon, 'w-5 h-5 text-[#d4af37]', '') + '</span>' +
        '<div class="min-w-0 flex-1">' +
          '<p class="text-xs font-bold text-[#d4af37] uppercase tracking-widest mb-1">' + esc(pi.skillLabel) + (pi.counts ? ' · ' + esc(pi.counts) + ' steps' : '') + '</p>' +
          '<p class="text-sm text-[#f5f0e6]/85 leading-relaxed">' + (lastTeach ? esc(lastTeach) : '<span class="text-[#f5f0e6]/50">' + esc(clean || 'Lesson in progress…') + '</span>') + '</p>' +
        '</div>';
    }
    const bp = document.getElementById('mc-board-progress');
    if (bp) bp.style.width = Math.max(0, Math.min(100, pi.pct)) + '%';

    collectVerdicts(msgs);
  }

  function collectVerdicts(msgs) {
    if (!msgs) return;
    const rows = msgs.children;
    let changed = false;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      let chip = null;
      const spans = row.querySelectorAll('span');
      for (let j = 0; j < spans.length; j++) {
        const t = String(spans[j].textContent || '').trim().toLowerCase();
        if ((t === 'strong' || t === 'developing' || t === 'off') && String(spans[j].className || '').indexOf('uppercase') >= 0) { chip = t; break; }
      }
      if (!chip) continue;
      const p = row.querySelector('p');
      const snippet = String((p ? p.textContent : '') || '').trim().slice(0, 90);
      const key = chip + '|' + snippet;
      if (mcSeen.has(key)) continue;
      mcSeen.add(key);
      const c = mcStore();
      c.feed.unshift({ v: chip, s: snippet, at: Date.now() });
      if (c.feed.length > 12) c.feed.length = 12;
      mcSave(c);
      changed = true;
    }
    if (changed) mcFeedReRender();
  }

  /* ================= section renderers ================= */

  function moduleCard(m) {
    const icon = (window.RAMI_ICONS && window.RAMI_ICONS.skill)
      ? window.RAMI_ICONS.skill(m.icon, 'imi-skill-lg', 'w-14 h-14')
      : '<span class="w-14 h-14"></span>';
    const steps = m.steps.map((s, i) =>
      '<li class="flex items-start gap-2 text-xs text-[#f5f0e6]/70">' +
        '<span class="shrink-0 w-5 h-5 rounded-full bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.35)] text-[#d4af37] text-[10px] font-extrabold flex items-center justify-center mt-px">' + (i + 1) + '</span>' +
        '<span>' + esc(s) + '</span>' +
      '</li>').join('');
    return '<div class="rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[rgba(20,18,15,0.9)] p-5 flex flex-col hover:border-[rgba(212,175,55,0.5)] transition">' +
      '<div class="flex items-center gap-3 mb-3">' + icon +
        '<div class="min-w-0"><p class="font-bold text-[#f5f0e6] text-sm">' + esc(m.title) + '</p><p class="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest mt-0.5">' + esc(m.tag) + '</p></div>' +
      '</div>' +
      '<ul class="space-y-2 mb-4 flex-1">' + steps + '</ul>' +
      '<button class="px-4 py-2 rounded-lg text-sm font-bold text-[#14120f] bg-[#d4af37] hover:bg-[#b8962e] transition shadow self-start" onclick="window.IELTS_MC && window.IELTS_MC.beginLesson(\'' + m.lesson + '\')">Teach me live →</button>' +
    '</div>';
  }

  function quickChips() {
    return QUICK_LESSONS.map((q) => '<button class="tc-lesson-chip inline-flex items-center gap-1.5" onclick="window.IELTS_MC && window.IELTS_MC.beginLesson(\'' + q.lesson + '\')">' + ico(q.icon, 'w-3.5 h-3.5', '') + '<span>' + esc(q.label) + '</span></button>').join('');
  }

  function renderWhiteboard() {
    return '<div class="rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[rgba(15,23,42,0.85)] p-5 mb-6 overflow-hidden mc-whiteboard">' +
      '<div class="flex items-center justify-between gap-3 mb-1">' +
        '<p class="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Live Socratic whiteboard</p>' +
        '<span id="mc-board-status" class="text-[10px] font-bold text-[#f5f0e6]/50 uppercase tracking-widest">standby</span>' +
      '</div>' +
      '<div id="mc-whiteboard-body" class="mt-2 mc-chalk flex items-start gap-3" style="min-height:64px">' +
        '<span class="mt-0.5 shrink-0">' + ico('spark', 'w-5 h-5 text-[#d4af37]', '') + '</span>' +
        '<p class="text-sm text-[#f5f0e6]/70 leading-relaxed">Classroom in standby — pick a module walkthrough below. Rami writes every concept on this board and grades your answers in the feed.</p>' +
      '</div>' +
      '<div class="mt-3 h-1.5 bg-[rgba(212,175,55,0.1)] rounded-full overflow-hidden"><div id="mc-board-progress" class="h-full bg-[#d4af37] transition-all" style="width:0%"></div></div>' +
    '</div>';
  }

  function renderFeed() {
    const c = mcStore();
    const chips = c.feed.slice(0, 8).map(feedChipHtml).join('');
    return '<div class="rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[rgba(15,23,42,0.85)] p-5 mb-6">' +
      '<div class="flex flex-wrap items-center justify-between gap-2 mb-3">' +
        '<p class="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Real-time grade feed</p>' +
        '<div class="flex gap-1.5 text-[10px] font-bold">' +
          '<span class="px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400 border border-emerald-400/30">Strong</span>' +
          '<span class="px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-400 border border-amber-400/30">Developing</span>' +
          '<span class="px-2 py-0.5 rounded-full bg-rose-400/15 text-rose-400 border border-rose-400/30">Off</span>' +
        '</div>' +
      '</div>' +
      '<div id="mc-feed" class="space-y-1.5">' + (chips || '<p class="text-xs text-[#f5f0e6]/40 italic">No graded answers yet — start a lesson and every verdict lands here instantly.</p>') + '</div>' +
    '</div>';
  }

  function renderModules() {
    return '<div class="mb-8">' +
      '<div class="flex items-center gap-2 mb-4">' + ico('roadmap', 'w-5 h-5 text-[#d4af37]', '') +
        '<h3 class="text-lg font-extrabold text-[#f5f0e6]">Step-by-step module walkthroughs</h3>' +
      '</div>' +
      '<div class="grid sm:grid-cols-2 gap-4 mb-6">' + MODULES.map(moduleCard).join('') + '</div>' +
      '<div class="flex items-center gap-2 mb-2">' + ico('spark', 'w-4 h-4 text-[#d4af37]', '') +
        '<p class="text-sm font-extrabold text-[#f5f0e6]">Quick Socratic lessons</p>' +
      '</div>' +
      '<div class="flex flex-wrap gap-1.5">' + quickChips() + '</div>' +
    '</div>';
  }

  function renderChat() {
    return '<div class="rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[rgba(15,23,42,0.85)] overflow-hidden mb-8">' +
      '<div id="mc-embed"></div>' +
    '</div>';
  }

  function render() {
    const root = document.getElementById('masterclass-content');
    if (!root) return;
    root.innerHTML = renderStage() + renderWhiteboard() + renderFeed() + renderModules() + renderChat();
    if (window.IELTS_RAMI_CHAT && window.IELTS_RAMI_CHAT.mountEmbed) {
      try { window.IELTS_RAMI_CHAT.mountEmbed('mc-embed'); } catch (e) { /* ignore */ }
    }
    mcSetIdle();
    mcFeedReRender();
    mcSync();
    window.scrollTo && window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ================= live mirroring + icon observer ================= */
  if ('MutationObserver' in window) {
    const mo = new MutationObserver((muts) => {
      let relevant = false;
      for (let i = 0; i < muts.length; i++) {
        const m = muts[i];
        const t = m.target;
        const tid = t && t.getAttribute ? t.getAttribute('id') : '';
        if (tid === 'ielts-ai-modal' || tid === 'tutor-messages' || tid === 'tutor-progress') relevant = true;
        const added = m.addedNodes;
        if (added && added.length) {
          for (let k = 0; k < added.length; k++) {
            const n = added[k];
            if (n.nodeType !== 1) continue;
            const aId = n.getAttribute ? n.getAttribute('id') : '';
            if (aId === 'tutor-messages' || aId === 'tutor-progress' || String(n.className || '').indexOf('tutor-') >= 0) relevant = true;
          }
        }
      }
      if (relevant) mcSync();
      scheduleIconify();
    });
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  }

  window.IELTS_MASTERCLASS = { render };
  window.IELTS_MC = { beginLesson };
})();