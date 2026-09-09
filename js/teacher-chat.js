/* ============================================================
   Chat & Speak Lab — Teacher Rami (الأستاذ رامي)
   Full-section chat + floating companion docked bottom-right.
   Every message is coached: Rami replies conversationally,
   corrects mistakes with the "why", and keeps one follow-up
   question alive. Runs off teacherChat() in ai-engine.js with
   a built-in coaching fallback when no model key is set.
   ============================================================ */
(function () {
  if (window.__TEACHER_CHAT__) return;
  window.__TEACHER_CHAT__ = true;

  const $ = (sel) => document.querySelector(sel);

  const CHAT_XP = 5;          // every 3rd practising message of the day

  const QUICK_PROMPTS = [
    'How do I go from Band 6 to 7?',
    'Correct this: "I am very excited to meeting you."',
    '5 natural ways to say "very important"',
    'How do I open Speaking Part 2?',
    'Fix my sentence: "He don\'t like coffee anymore"',
    'In, on or at — how do I choose?'
  ];

  const state = {
    messages: [],
    busy: false,
    panelOpen: false
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  function learnerLevel() {
    try {
      const u = window.IELTS_AUTH && window.IELTS_AUTH.getCurrentUser && window.IELTS_AUTH.getCurrentUser();
      if (u && window.IELTS_AUTH.getLevel) return window.IELTS_AUTH.getLevel(u.xp).name;
      return 'B1 Intermediate';
    } catch (e) { return 'B1 Intermediate'; }
  }

  function store() {
    try {
      const c = (window.IELTS_AUTH && window.IELTS_AUTH.getScoped) ? window.IELTS_AUTH.getScoped('teacherchat', null) : null;
      if (c && Array.isArray(c.messages)) return c;
    } catch (e) { /* ignore */ }
    const c = { messages: [] };
    save(c);
    return c;
  }

  function save(c) {
    try { if (window.IELTS_AUTH && window.IELTS_AUTH.setScoped) window.IELTS_AUTH.setScoped('teacherchat', c); } catch (e) { /* ignore */ }
  }

  function load() {
    const c = store();
    state.messages = c.messages || [];
    if (!state.messages.length) {
      state.messages = [{ role: 'assistant', text: 'Salam! I’m Teacher Rami (أستاذ رامي). Write me one or two sentences of English — anything — and I’ll coach them the way a private tutor would: correction, the reason, and your next step.' }];
      save({ messages: state.messages });
    }
  }

  function push(msg) {
    state.messages.push(msg);
    if (state.messages.length > 40) {
      const cut = state.messages.length - 40;
      state.messages.splice(0, cut % 2 === 0 ? cut : cut + 1);
    }
    save({ messages: state.messages });
  }

  function awardXp() {
    try {
      if (!window.IELTS_AUTH || !window.IELTS_AUTH.getCurrentUser || !window.IELTS_AUTH.completeClaim) return;
      const u = window.IELTS_AUTH.getCurrentUser();
      if (!u) return;
      const day = new Date().toISOString().slice(0, 10);
      let st = window.IELTS_AUTH.getScoped('teacherchat-xp', null) || {};
      if (st.day !== day) st = { day: day, count: 0 };
      st.count += 1;
      if (st.count % 3 === 0 && window.IELTS_AUTH.completeClaim('rami-chat-' + day + '-' + st.count)) {
        if (window.IELTS_AUTH.addXp) window.IELTS_AUTH.addXp(CHAT_XP);
        if (window.IELTS_AUTH.addActivity) window.IELTS_AUTH.addActivity('chat', 'Practised live English with Teacher Rami (أستاذ رامي)', CHAT_XP);
        if (window.toast) window.toast('+' + CHAT_XP + ' XP — great session!');
      }
      window.IELTS_AUTH.setScoped('teacherchat-xp', st);
    } catch (e) { /* ignore */ }
  }

  /* ---------------- Rendering ---------------- */
  function correctionHtml(corrs) {
    if (!corrs || !corrs.length) return '';
    return '<div class="mt-3 border-t border-[rgba(212,175,55,0.2)] pt-2">' +
      '<p class="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-1.5">Rami’s corrections · say each fix twice</p>' +
      corrs.map((c) => '<div class="mb-1.5">' +
        '<p class="text-xs text-[#f5f0e6]/55"><span class="line-through decoration-rose-400/70">' + esc(c.original) + '</span> ' +
        '<span class="text-[#d4af37] font-bold">→ ' + esc(c.corrected) + '</span></p>' +
        '<p class="text-[11px] text-[#f5f0e6]/45 italic">' + esc(c.why) + '</p>' +
        '</div>').join('') +
      '</div>';
  }

  function bubbleHtml(m) {
    if (m.role === 'user') {
      return '<div class="flex justify-end">' +
        '<div class="max-w-[82%] bg-[rgba(212,175,55,0.18)] border border-[rgba(212,175,55,0.35)] text-[#f5f0e6] text-sm rounded-2xl rounded-br-md px-4 py-2.5 whitespace-pre-wrap">' + esc(m.text) + '</div>' +
        '</div>';
    }
    return '<div class="flex items-start gap-2.5">' +
      '<div class="w-7 h-7 shrink-0 rounded-full bg-[#14120f] border border-[rgba(212,175,55,0.5)] text-[#d4af37] flex items-center justify-center text-[11px] font-extrabold">ر</div>' +
      '<div class="max-w-[85%] bg-[rgba(245,240,230,0.07)] border border-[rgba(245,240,230,0.12)] text-[#f5f0e6] text-sm rounded-2xl rounded-tl-md px-4 py-2.5">' +
        '<p class="whitespace-pre-wrap">' + esc(m.text) + '</p>' +
        correctionHtml(m.corrections) +
        (m.demo ? '<p class="text-[10px] text-[#f5f0e6]/35 mt-2">coached from Rami’s built-in knowledge pack</p>' : '') +
      '</div>' +
      '</div>';
  }

  function typingHtml() {
    return '<div class="flex items-start gap-2.5">' +
      '<div class="w-7 h-7 shrink-0 rounded-full bg-[#14120f] border border-[rgba(212,175,55,0.5)] text-[#d4af37] flex items-center justify-center text-[11px] font-extrabold">ر</div>' +
      '<div class="bg-[rgba(245,240,230,0.07)] border border-[rgba(245,240,230,0.12)] rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">' +
        '<span class="tc-dot"></span><span class="tc-dot"></span><span class="tc-dot"></span>' +
      '</div>' +
      '</div>';
  }

  function messagesHtml(showTyping) {
    if (!state.messages.length) return '<p class="text-center text-xs text-[#f5f0e6]/40 py-8">No conversation yet — write something below.</p>';
    return state.messages.map(bubbleHtml).join('') + (showTyping ? typingHtml() : '');
  }

  function renderInto(root) {
    if (!root) return;
    root.innerHTML = messagesHtml(state.busy);
    root.scrollTop = root.scrollHeight;
  }

  /* ---------------- Actions ---------------- */
  function clearConversation() {
    state.messages = [];
    push({ role: 'assistant', text: 'Fresh start — the slate is clean. Give me a sentence about your day and I’ll coach it.' });
    rerenderAll();
  }

  function rerenderAll() {
    const sec = $('#teacher-chat-content');
    if (sec) renderInto($('#tc-messages'));
    if (state.panelOpen) renderInto($('#tc-panel-messages'));
  }

  async function send(text) {
    text = String(text || '').trim();
    if (!text || state.busy) return;
    push({ role: 'user', text });
    state.busy = true;
    rerenderAll();
    try {
      const res = await (window.IELTS_AI && window.IELTS_AI.teacherChat
        ? window.IELTS_AI.teacherChat({
            user: text,
            level: learnerLevel(),
            history: state.messages.slice(0, -1).map((m) => ({ role: m.role, text: m.text }))
          })
        : Promise.resolve({ reply: 'Salam! I’m Teacher Rami (أستاذ رامي). Ask me anything about IELTS — or send me a sentence to correct.', corrections: [], demo: true }));
      push({ role: 'assistant', text: (res && res.reply) || 'Salam — write me a sentence and I’ll coach it.', corrections: (res && res.corrections) || [], demo: !!(res && res.demo) });
      awardXp();
    } catch (e) {
      push({ role: 'assistant', text: 'Something interrupted me — try that again, one sentence is fine.', corrections: [], demo: true });
    }
    state.busy = false;
    rerenderAll();
  }

  function composerHtml(targetId) {
    return '<div class="tc-composer">' +
      '<div class="flex gap-1.5 overflow-x-auto pb-1.5 tc-chips">' +
      QUICK_PROMPTS.slice(0, 4).map((p) => '<button class="tc-chip shrink-0" onclick="window.IELTS_RAMI_CHAT.quick(\'' + p.replace(/'/g, '\\u0027') + '\')">' + esc(p) + '</button>').join('') +
      '</div>' +
      '<div class="flex items-center gap-2">' +
        '<input id="' + targetId + '-input" type="text" placeholder="Write in English… ' + (state.busy ? 'Rami is writing…' : 'Teacher Rami replies instantly') + '" class="flex-1 bg-[rgba(20,18,15,0.9)] border border-[rgba(212,175,55,0.3)] rounded-xl px-4 py-2.5 text-sm text-[#f5f0e6] placeholder-[#f5f0e6]/40 focus:outline-none focus:border-[rgba(212,175,55,0.6)]" ' + (state.busy ? 'disabled' : '') + ' />' +
        '<button class="shrink-0 w-10 h-10 rounded-xl bg-[#d4af37] hover:bg-[#b8962e] transition text-[#14120f] font-bold flex items-center justify-center" onclick="window.IELTS_RAMI_CHAT.sendFrom(\'' + targetId + '\')">' +
          '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 12h14"/></svg>' +
        '</button>' +
      '</div>' +
      '</div>';
  }

  function sendFrom(id) {
    const input = document.getElementById(id + '-input');
    if (!input) return;
    const v = input.value;
    input.value = '';
    send(v);
  }

  function quick(p) {
    send(String(p).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
  }

  /* ---------------- Full section page ---------------- */
  function render() {
    closePanel();
    const root = $('#teacher-chat-content');
    if (!root) return;
    root.innerHTML =
      '<div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl overflow-hidden shadow-xl">' +
        '<div class="flex items-center justify-between gap-3 px-5 py-4 border-b border-[rgba(212,175,55,0.2)] bg-[rgba(20,18,15,0.6)]">' +
          '<div class="flex items-center gap-3">' +
            '<div class="w-11 h-11 rounded-full bg-[#14120f] border border-[rgba(212,175,55,0.5)] text-[#d4af37] flex items-center justify-center text-sm font-extrabold">ر</div>' +
            '<div>' +
              '<p class="font-extrabold text-[#f5f0e6]">Teacher Rami (الأستاذ رامي)</p>' +
              '<p class="text-[11px] text-emerald-400 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>online — visits every message</p>' +
            '</div>' +
          '</div>' +
          '<div class="flex items-center gap-2">' +
            '<button class="px-3 py-1.5 rounded-lg text-[11px] font-bold text-[#f5f0e6]/60 border border-[rgba(245,240,230,0.15)] hover:bg-[rgba(245,240,230,0.08)] transition" onclick="window.IELTS_RAMI_CHAT.clearConversation()">Clear</button>' +
            '<button class="px-3 py-1.5 rounded-lg text-[11px] font-bold text-[#d4af37] border border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.1)] transition" onclick="showSection(\'speaking-sim\')">Speaking Lab →</button>' +
          '</div>' +
        '</div>' +
        '<div id="tc-messages" class="h-[52vh] min-h-[340px] overflow-y-auto px-4 py-4 space-y-3 tc-messages"></div>' +
        '<div class="p-4 border-t border-[rgba(245,240,230,0.08)]">' + composerHtml('tc') + '</div>' +
      '</div>' +
      '<p class="text-center text-[11px] text-[#f5f0e6]/40 mt-4">Chat to build natural, exam-ready English. Every message earns coaching — not just a reply.</p>';
    renderInto($('#tc-messages'));
    const inp = $('#tc-input');
    if (inp) inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') window.IELTS_RAMI_CHAT.sendFrom('tc'); });
    const fab = $('#tc-fab');
    if (fab) fab.classList.add('hidden');
  }

  /* ---------------- Floating companion ---------------- */
  function companionHtml() {
    return '<div id="tc-fab-wrap">' +
      '<button id="tc-fab" class="tc-fab" onclick="window.IELTS_RAMI_CHAT.togglePanel()" aria-label="Chat with Teacher Rami">' +
        '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.845L3 20l1.154-3.145C3.41 15.43 3 13.77 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>' +
        '<span class="tc-fab-label">Talk to Rami</span>' +
      '</button>' +
      '<div id="tc-panel" class="tc-panel hidden">' +
        '<div class="flex items-center justify-between gap-3 px-4 py-3 border-b border-[rgba(212,175,55,0.2)] bg-[rgba(20,18,15,0.8)]">' +
          '<div class="flex items-center gap-2.5">' +
            '<div class="w-9 h-9 rounded-full bg-[#14120f] border border-[rgba(212,175,55,0.5)] text-[#d4af37] flex items-center justify-center text-xs font-extrabold">ر</div>' +
            '<div><p class="font-bold text-[#f5f0e6] text-sm leading-tight">Teacher Rami</p><p class="text-[10px] text-emerald-400">online — replies instantly</p></div>' +
          '</div>' +
          '<button class="text-[#f5f0e6]/50 hover:text-[#f5f0e6] text-lg leading-none px-1" onclick="window.IELTS_RAMI_CHAT.togglePanel()">×</button>' +
        '</div>' +
        '<div id="tc-panel-messages" class="h-64 overflow-y-auto px-3 py-3 space-y-3 tc-messages"></div>' +
        '<div class="px-3 pb-3">' + composerHtml('tc-panel') + '</div>' +
      '</div>' +
      '</div>';
  }

  function togglePanel() {
    const panel = $('#tc-panel');
    if (!panel) return;
    state.panelOpen = !panel.classList.contains('hidden');
    panel.classList.toggle('hidden', !state.panelOpen);
    if (state.panelOpen) {
      const fab = $('#tc-fab');
      if (fab) fab.classList.add('open');
      renderInto($('#tc-panel-messages'));
      const inp = $('#tc-panel-input');
      if (inp) inp.focus();
    } else {
      const fab = $('#tc-fab');
      if (fab) fab.classList.remove('open');
    }
  }

  function closePanel() {
    state.panelOpen = false;
    const panel = $('#tc-panel');
    if (panel) panel.classList.add('hidden');
    const fab = $('#tc-fab');
    if (fab) fab.classList.remove('open');
  }

  /* ---------------- Boot ---------------- */
  function boot() {
    load();
    const holder = document.createElement('div');
    holder.id = 'tc-fab-wrap';
    holder.innerHTML = companionHtml();
    document.body.appendChild(holder);
    window.IELTS_RAMI_CHAT = { render, sendFrom, quick, togglePanel, closePanel, clearConversation };
    const sec = $('#section-teacher-chat');
    if (sec && 'MutationObserver' in window) {
      const ob = new MutationObserver(() => {
        const fab = $('#tc-fab');
        if (fab) {
          const inSection = !sec.classList.contains('hidden');
          fab.classList.toggle('hidden', inSection);
          if (inSection) fab.classList.remove('open');
        }
      });
      ob.observe(sec, { attributes: true, attributeFilter: ['class'] });
    }
    const inp = $('#tc-input');
    if (inp) inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') window.IELTS_RAMI_CHAT.sendFrom('tc'); });
    const pinp = $('#tc-panel-input');
    if (pinp) pinp.addEventListener('keydown', (e) => { if (e.key === 'Enter') window.IELTS_RAMI_CHAT.sendFrom('tc-panel'); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();