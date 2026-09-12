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
    'My band is stuck at 6.5',
    'Fix this: "I am agree"',
    'Three-beat speaking method',
    'Task 2 essay outline',
    'Boost my vocabulary',
    'I feel like giving up'
  ];

  const QUICK_ICONS = { 'My band is stuck at 6.5': 'roadmap', 'Fix this: "I am agree"': 'grammar', 'Three-beat speaking method': 'speak', 'Task 2 essay outline': 'write', 'Boost my vocabulary': 'vocab', 'I feel like giving up': 'spark' };

  const state = {
    messages: [],
    busy: false,
    panelOpen: false,
    speaking: null,
    micOn: false,
    recognizer: null
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  const SPEAKER_ICON = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12"/></svg>';

  const MIC_ICON = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11v1a7 7 0 0 0 14 0v-1"/><path d="M12 19v2M8 21h8"/></svg>';

  /* Hear Rami's reply out loud (Web Speech API, British voice preferred). */
  function say(text) {
    if (!text || !('speechSynthesis' in window)) { window.toast && window.toast('Voice is not available in this browser'); return; }
    if (state.speaking && state.speaking === text) { speechSynthesis.cancel(); state.speaking = null; return; }
    speechSynthesis.cancel();
    const clean = String(text).replace(/[*_`#]/g, '');
    const utter = new SpeechSynthesisUtterance(clean);
    const vs = speechSynthesis.getVoices();
    const voice = vs.find((v) => /en[-_]GB/i.test(v.lang)) || vs.find((v) => /^en/i.test(v.lang)) || null;
    if (voice) { utter.voice = voice; utter.lang = voice.lang; } else { utter.lang = 'en-US'; }
    utter.rate = 0.95;
    utter.pitch = 1.0;
    state.speaking = text;
    utter.onend = utter.onerror = function () { if (state.speaking === text) state.speaking = null; };
    speechSynthesis.speak(utter);
  }

  function setMic(on) {
    state.micOn = !!on;
    const setOn = (b) => b.classList.toggle('on', !!on);
    document.querySelectorAll('.tc-mic').forEach((b) => setOn(b));
    if (on) { window.toast && window.toast('Listening… speak now 🎤'); }
  }

  /* Talk to Rami with your voice — dictation in the composer. */
  function startVoice(id) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { window.toast && window.toast('Voice input needs Chrome or Edge'); return; }
    if (!state.recognizer) {
      const rec = new SR();
      rec.lang = 'en-GB';
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = function (e) {
        let t = '';
        for (let i = 0; i < e.results.length; i++) if (e.results[i].isFinal) t += e.results[i][0].transcript + ' ';
        t = t.trim();
        const inp = document.getElementById(id + '-input');
        if (inp && t) {
          const hadText = String(inp.value).trim().length > 0;
          inp.value = hadText ? inp.value + ' ' + t : t;
          if (!hadText && !state.busy) sendFrom(id);
        }
      };
      rec.onerror = function () { setMic(false); };
      rec.onend = function () { setMic(false); };
      state.recognizer = rec;
    }
    if (state.micOn) { try { state.recognizer.stop(); } catch (e) { /* noop */ } setMic(false); return; }
    state.recognizer.lang = 'en-GB';
    try { state.recognizer.start(); setMic(true); } catch (e) { setMic(false); }
  }

  /* Download the whole conversation as a Markdown study-note file. */
  function exportChat() {
    const out = ['# Conversation with Teacher Rami (الأستاذ رامي) · IELTS PA', ''];
    state.messages.forEach((m) => {
      out.push((m.role === 'user' ? '**You:** ' : '**Rami:** ') + String(m.text).trim());
      out.push('');
    });
    try {
      const blob = new Blob([out.join('\n')], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'teacher-rami-conversation.md';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      window.toast && window.toast('Conversation exported — keep it as a study note!');
    } catch (e) {
      window.toast && window.toast('Export failed in this browser');
    }
  }

  /* safe encoding for a suggestion/quick chip's on-click payload */
  function chipSafe(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/'/g, '\\u0027');
  }
  function chipsHtml(list) {
    if (!list || !list.length) return '';
    return '<div class="mt-2.5 flex flex-wrap gap-1.5">' + list.map((s) =>
      '<button class="tc-chip" onclick="window.IELTS_RAMI_CHAT.quick(\'' + chipSafe(s) + '\')">' + esc(s) + '</button>'
    ).join('') + '</div>';
  }

  /* Teacher Rami portrait — cartoon robot in a Palestinian keffiyeh */
  const MENTOR_AVATAR = (window.IELTS_AI && window.IELTS_AI.MENTOR_AVATAR) ? window.IELTS_AI.MENTOR_AVATAR : '';
  function ravi(sz, txtCls) {
    if (MENTOR_AVATAR) {
      return '<div class="' + sz + ' shrink-0 rounded-full overflow-hidden bg-[#14120f] border border-[rgba(212,175,55,0.5)]">' + MENTOR_AVATAR + '</div>';
    }
    return '<div class="' + sz + ' shrink-0 rounded-full bg-[#14120f] border border-[rgba(212,175,55,0.5)] text-[#d4af37] flex items-center justify-center ' + (txtCls || 'text-[11px]') + ' font-extrabold">ر</div>';
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
      state.messages = [{ role: 'assistant', text: 'Salam! I’m Teacher Rami (أستاذ رامي). Write me one or two sentences of English — anything — and I’ll coach them the way a private tutor would: correction, the reason, and your next step. You can also ask me anything about IELTS: strategy, grammar, vocabulary, writing or speaking.', suggestions: ['My biggest IELTS worry', 'Fix this: "I am agree with that"', 'Plan a 4-week study schedule'] }];
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
      ravi('w-7 h-7', 'text-[11px]') +
      '<div class="max-w-[85%] bg-[rgba(245,240,230,0.07)] border border-[rgba(245,240,230,0.12)] text-[#f5f0e6] text-sm rounded-2xl rounded-tl-md px-4 py-2.5">' +
        '<p class="whitespace-pre-wrap">' + esc(m.text) + '</p>' +
        correctionHtml(m.corrections) +
        (m.suggestions && m.suggestions.length ? chipsHtml(m.suggestions) : '') +
        (m.demo ? '<p class="text-[10px] text-[#f5f0e6]/35 mt-2">coached from Rami’s built-in knowledge pack</p>' : '') +
      '</div>' +
      '<button class="shrink-0 w-7 h-7 rounded-lg text-[#f5f0e6]/45 hover:text-[#d4af37] hover:bg-[rgba(212,175,55,0.12)] flex items-center justify-center transition mt-1" onclick="window.IELTS_RAMI_CHAT.say(\'' + chipSafe(m.text) + '\')" title="Hear Rami’s reply out loud" aria-label="Play Rami’s reply">' + SPEAKER_ICON + '</button>' +
      '</div>';
  }

  function typingHtml() {
    return '<div class="flex items-start gap-2.5">' +
      ravi('w-7 h-7', 'text-[11px]') +
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
    try { root.dataset.rendered = String(state.messages.length); } catch (e) { /* ignore */ }
    root.scrollTop = root.scrollHeight;
  }

  /* ---------------- Actions ---------------- */
  function clearConversation() {
    state.messages = [];
    push({ role: 'assistant', text: 'Fresh start — the slate is clean. Give me a sentence about your day and I’ll coach it, or pick a topic below.', suggestions: ['Fix this: "He don’t like coffee"', 'Boost my vocabulary', 'Speaking Part 2 tips'] });
    rerenderAll();
  }

  function rerenderAll() {
    const sec = $('#teacher-chat-content');
    if (sec) renderInto($('#tc-messages'));
    if (state.panelOpen) renderInto($('#tc-panel-messages'));
  }

  /* Live, incremental rendering — appends only the newly arrived bubbles to the
     shared message roots instead of rebuilding the entire HTML list on every
     send, keeping typing, scrolling and long conversations smooth. */
  function liveRoots() {
    const roots = [];
    const sec = $('#tc-messages'); if (sec) roots.push(sec);
    const emb = $('#tc-embed-msgs'); if (emb) roots.push(emb);
    if (state.panelOpen) { const p = $('#tc-panel-messages'); if (p && p !== sec && p !== emb) roots.push(p); }
    return roots;
  }

  function appendBubbles(root) {
    if (!root) return;
    try {
      const from = Math.max(0, parseInt(root.dataset.rendered || '0', 10));
      root.dataset.rendered = String(state.messages.length);
      const typingRow = (root.lastElementChild && root.lastElementChild.querySelector) ? root.lastElementChild : null;
      if (typingRow && typingRow.querySelector('.tc-dot') && typingRow.parentNode === root) root.removeChild(typingRow);
      let html = '';
      for (let i = from; i < state.messages.length; i++) html += bubbleHtml(state.messages[i]);
      if (state.busy) html += typingHtml();
      if (html) {
        if (root.insertAdjacentHTML) root.insertAdjacentHTML('beforeend', html);
        else root.innerHTML += html;
      }
      while (root.children && root.children.length > 42) root.removeChild(root.firstElementChild);
      root.scrollTop = root.scrollHeight;
    } catch (e) { /* keep the chat resilient */ }
  }

  function updateLive() { liveRoots().forEach(appendBubbles); }

  async function send(text) {
    text = String(text || '').trim();
    if (!text || state.busy) return;
    push({ role: 'user', text });
    state.busy = true;
    updateLive();
    try {
      const res = await (window.IELTS_AI && window.IELTS_AI.teacherChat
        ? window.IELTS_AI.teacherChat({
            user: text,
            level: learnerLevel(),
            history: state.messages.slice(0, -1).map((m) => ({ role: m.role, text: m.text }))
          })
        : Promise.resolve({ reply: 'Salam! I’m Teacher Rami (أستاذ رامي). Ask me anything about IELTS — or send me a sentence to correct.', corrections: [], demo: true }));
      push({ role: 'assistant', text: (res && res.reply) || 'Salam — write me a sentence and I’ll coach it.', corrections: (res && res.corrections) || [], demo: !!(res && res.demo), suggestions: (res && res.suggestions) || [] });
      awardXp();
    } catch (e) {
      push({ role: 'assistant', text: 'Something interrupted me — try that again, one sentence is fine.', corrections: [], demo: true });
    }
    state.busy = false;
    updateLive();
  }

  function composerHtml(targetId) {
    return '<div class="tc-composer">' +
      '<div class="flex gap-1.5 overflow-x-auto pb-1.5 tc-chips">' +
      QUICK_PROMPTS.slice(0, 6).map((p) => {
        const ico = (window.RAMI_ICONS && QUICK_ICONS[p]) ? window.RAMI_ICONS.icon(QUICK_ICONS[p], 'w-3 h-3 inline-block mr-1 -mt-0.5') : '';
        return '<button class="tc-chip shrink-0" onclick="window.IELTS_RAMI_CHAT.quick(\'' + p.replace(/'/g, '\\u0027') + '\')">' + ico + esc(p) + '</button>';
      }).join('') +
      '</div>' +
      '<div class="flex items-center gap-2">' +
        '<input id="' + targetId + '-input" type="text" placeholder="Write or speak in English… ' + (state.busy ? 'Rami is writing…' : 'Teacher Rami replies instantly') + '" class="flex-1 bg-[rgba(20,18,15,0.9)] border border-[rgba(212,175,55,0.3)] rounded-xl px-4 py-2.5 text-sm text-[#f5f0e6] placeholder-[#f5f0e6]/40 focus:outline-none focus:border-[rgba(212,175,55,0.6)]" ' + (state.busy ? 'disabled' : '') + ' />' +
        '<button class="shrink-0 w-10 h-10 rounded-xl border border-[rgba(212,175,55,0.4)] text-[#f5f0e6]/80 hover:text-[#d4af37] hover:border-[rgba(212,175,55,0.8)] flex items-center justify-center transition tc-mic" onclick="window.IELTS_RAMI_CHAT.startVoice(\'' + targetId + '\')" title="Talk to Rami with your voice" aria-label="Speak to Rami">' + MIC_ICON + '</button>' +
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

  /* ---------------- Embedded classroom chat ---------------- */
  function mountEmbed(id) {
    const root = document.getElementById(id);
    if (!root) return;
    root.innerHTML =
      '<div class="flex items-center justify-between gap-3 px-4 py-3 border-b border-[rgba(212,175,55,0.2)] bg-[rgba(20,18,15,0.7)]">' +
        '<div class="flex items-center gap-2.5">' +
          ravi('w-9 h-9', 'text-xs') +
          '<div><p class="font-bold text-[#f5f0e6] text-sm leading-tight">Teacher Rami · live coach</p><p class="text-[10px] text-emerald-400 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>online — every message graded</p></div>' +
        '</div>' +
      '</div>' +
      '<div id="' + id + '-msgs" class="tc-messages h-64 overflow-y-auto px-3 py-3 space-y-3"></div>' +
      '<div class="px-3 pb-3">' + composerHtml(id) + '</div>';
    renderInto(document.getElementById(id + '-msgs'));
    const inp = document.getElementById(id + '-input');
    if (inp) inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') window.IELTS_RAMI_CHAT.sendFrom(id); });
    return root;
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
            ravi('w-11 h-11', 'text-sm') +
            '<div>' +
              '<p class="font-extrabold text-[#f5f0e6]">Teacher Rami (الأستاذ رامي)</p>' +
              '<p class="text-[11px] text-emerald-400 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>online — visits every message</p>' +
            '</div>' +
          '</div>' +
          '<div class="flex items-center gap-2">' +
            '<button class="px-3 py-1.5 rounded-lg text-[11px] font-bold text-[#f5f0e6]/60 border border-[rgba(245,240,230,0.15)] hover:bg-[rgba(245,240,230,0.08)] transition" onclick="window.IELTS_RAMI_CHAT.clearConversation()">Clear</button>' +
            '<button class="px-3 py-1.5 rounded-lg text-[11px] font-bold text-[#f5f0e6]/60 border border-[rgba(245,240,230,0.15)] hover:bg-[rgba(245,240,230,0.08)] transition" onclick="window.IELTS_RAMI_CHAT.exportChat()" title="Download this conversation as a study note">Export</button>' +
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
      '<button id="tc-fab" class="tc-fab" onclick="window.IELTS_RAMI_CHAT.togglePanel()" aria-label="Talk with Teacher Rami">' +
        '<span class="tc-fab-dot" aria-hidden="true"></span>' +
        '<span class="tc-fab-avatar" aria-hidden="true">' + ravi('w-7 h-7', 'text-[11px]') + '</span>' +
        '<span class="tc-fab-label">Talk with Teacher Rami</span>' +
        '<span class="tc-fab-chevron">▲</span>' +
      '</button>' +
      '<div id="tc-panel" class="tc-panel hidden">' +
        '<div class="flex items-center justify-between gap-3 px-4 py-3 border-b border-[rgba(212,175,55,0.2)] bg-[rgba(20,18,15,0.8)]">' +
          '<div class="flex items-center gap-2.5">' +
            ravi('w-9 h-9', 'text-xs') +
            '<div><p class="font-bold text-[#f5f0e6] text-sm leading-tight">Teacher Rami</p><p class="text-[10px] text-emerald-400">online — replies instantly</p></div>' +
          '</div>' +
          '<button class="text-[#f5f0e6]/50 hover:text-[#f5f0e6] text-lg leading-none px-1" onclick="window.IELTS_RAMI_CHAT.togglePanel()" aria-label="Close chat">×</button>' +
        '</div>' +
        '<div id="tc-panel-messages" class="h-64 overflow-y-auto px-3 py-3 space-y-3 tc-messages"></div>' +
        '<div class="px-3 pb-3">' + composerHtml('tc-panel') + '</div>' +
      '</div>' +
      '</div>';
  }

  function togglePanel() {
    const panel = $('#tc-panel');
    if (!panel) return;
    const willOpen = panel.classList.contains('hidden');
    panel.classList.toggle('hidden', !willOpen);
    state.panelOpen = willOpen;
    const fab = $('#tc-fab');
    if (fab) fab.classList.toggle('open', willOpen);
    if (willOpen) {
      renderInto($('#tc-panel-messages'));
      const inp = $('#tc-panel-input');
      if (inp) inp.focus();
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
    window.IELTS_RAMI_CHAT = { render, sendFrom, quick, togglePanel, closePanel, clearConversation, mountEmbed, say, exportChat, startVoice };
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
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') window.IELTS_RAMI_CHAT.closePanel(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();