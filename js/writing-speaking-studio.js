/* ============================================================
   IELTS PA — Writing & Speaking Studio
   Extended writing prompts with band descriptors & structure
   templates, plus MediaRecorder-based speaking practice.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const WRITING_XP = 10;
  const SPEAKING_XP = 10;

  const state = {
    view: 'home',
    tab: 'writing',
    writing: { taskId: 0, checks: [], timer: { running: false, seconds: 0, interval: null } },
    speaking: { part: 1, prepTimer: { running: false, seconds: 0, interval: null }, speakTimer: { running: false, seconds: 0, interval: null }, recording: false, mediaRecorder: null, chunks: [], audioUrl: null }
  };

  function cache() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return null;
    const c = window.IELTS_AUTH.getScoped('wss', null);
    if (!c) { window.IELTS_AUTH.setScoped('wss', { writingDone: {}, speakingDone: {} }); }
    return window.IELTS_AUTH.getScoped('wss', null);
  }
  function save(c) { window.IELTS_AUTH.setScoped('wss', c); }

  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) { window.IELTS_AUTH.onUserChange(() => { state.view = 'home'; }); }

  /* ---------- Writing data ---------- */
  const WRITING_PROMPTS = [
    {
      id: 'w1', type: 'Task 1', label: 'Academic — process diagram', minutes: 20, wordLimit: 150,
      prompt: 'The diagram below shows the process of making chocolate. Summarise the process by selecting and reporting the main steps.',
      template: {
        intro: ['Paraphrase the task in your own words.\nExample: "The diagram illustrates the various stages involved in the production of chocolate, from the raw cocoa bean to the final product."'],
        body: ['Describe each stage in chronological order.\nUse sequencing language: first, next, then, after that, finally.\nCombine related steps into one paragraph if appropriate.'],
        conclusion: ['Summarise the overall process (optional for process diagrams).\nExample: "Overall, the process involves several distinct stages, beginning with the harvesting of cocoa beans and ending with the packaging of the finished chocolate."']
      },
      bands: [
        { label: 'Task Achievement', desc: 'Have you covered all key stages? Is the overview clear?' },
        { label: 'Coherence & Cohesion', desc: 'Is the sequence logical? Do you use linking words effectively?' },
        { label: 'Lexical Resource', desc: 'Do you use topic-specific vocabulary (e.g. fermentation, roasting, conching)?' },
        { label: 'Grammatical Range', desc: 'Do you use passive voice appropriately? Are tenses consistent?' }
      ]
    },
    {
      id: 'w2', type: 'Task 1', label: 'Academic — line graph', minutes: 20, wordLimit: 150,
      prompt: 'The line graph shows the average monthly temperature in three different cities from January to December. Summarise the information by selecting and reporting the main features.',
      template: {
        intro: ['Paraphrase: "The line graph compares the average monthly temperatures in three cities over the course of a year."'],
        body: ['Identify overall trends (highest, lowest, most stable).\nGroup data: describe cities with similar patterns together.\nUse language of change: increased, decreased, fluctuated, peaked, remained stable.'],
        conclusion: ['Give an overview of the main pattern.\nExample: "Overall, City A had the highest temperatures throughout the year, while City C was consistently the coldest."']
      },
      bands: [
        { label: 'Task Achievement', desc: 'Have you reported the key features and provided an overview?' },
        { label: 'Coherence & Cohesion', desc: 'Is your essay well-organised with clear paragraphing?' },
        { label: 'Lexical Resource', desc: 'Do you use a range of vocabulary for describing trends?' },
        { label: 'Grammatical Range', desc: 'Do you vary between simple and complex structures?' }
      ]
    },
    {
      id: 'w3', type: 'Task 2', label: 'Academic/GT — discursive essay', minutes: 40, wordLimit: 250,
      prompt: 'Some people believe that children should be taught to be competitive, while others think they should learn to cooperate. Discuss both views and give your opinion.',
      template: {
        intro: ['Paraphrase the topic.\nState your position clearly.\nExample: "While some argue that competitiveness is essential for success, others believe cooperation is more valuable. In my view, both qualities are important, but cooperation should be prioritised."'],
        body: ['View 1: Present arguments for competitiveness with examples.\nView 2: Present arguments for cooperation with examples.\nUse connectors: On the one hand / On the other hand / However / Furthermore.'],
        conclusion: ['Restate your opinion.\nSuggest a balanced approach if applicable.\nAvoid introducing new ideas.']
      },
      bands: [
        { label: 'Task Achievement', desc: 'Have you addressed all parts of the question? Is your position clear?' },
        { label: 'Coherence & Cohesion', desc: 'Are ideas logically sequenced with appropriate paragraphing?' },
        { label: 'Lexical Resource', desc: 'Do you use a wide range of vocabulary with minimal errors?' },
        { label: 'Grammatical Range & Accuracy', desc: 'Do you use complex structures accurately?' }
      ]
    },
    {
      id: 'w4', type: 'Task 2', label: 'GT — letter', minutes: 20, wordLimit: 150,
      prompt: 'You recently attended a training course at work that was poorly organised. Write a letter to your manager describing what happened, explaining how it affected you, and suggesting improvements.',
      template: {
        intro: ['State the purpose of the letter.\nUse appropriate tone (formal/semi-formal).\nExample: "I am writing to express my concerns about the training course held on 15th March."'],
        body: ['Describe what happened (specific details).\nExplain the impact on you or your work.\nSuggest concrete improvements.'],
        conclusion: ['Request action or express hope for improvement.\nUse a suitable closing: "I look forward to hearing from you" / "Yours sincerely."']
      },
      bands: [
        { label: 'Task Achievement', desc: 'Have you covered all three bullet points? Is the tone appropriate?' },
        { label: 'Coherence & Cohesion', desc: 'Is the letter well-structured with clear paragraphs?' },
        { label: 'Lexical Resource', desc: 'Do you use appropriate formal/semi-formal vocabulary?' },
        { label: 'Grammatical Range', desc: 'Do you use a variety of sentence structures?' }
      ]
    }
  ];

  const SPEAKING_PARTS = [
    {
      part: 1, label: 'Interview', description: 'The examiner asks you questions about familiar topics. Answer each for 30–40 seconds.',
      questions: [
        { id: 'ws-s1-1', q: 'Do you work or study?', tip: 'Give a direct answer, then add a reason or example.' },
        { id: 'ws-s1-2', q: 'What do you like about your job or course?', tip: 'Use adjectives: interesting, challenging, rewarding.' },
        { id: 'ws-s1-3', q: 'How do you usually travel to work or university?', tip: 'Compare options if relevant.' },
        { id: 'ws-s1-4', q: 'What do you usually do in the evenings?', tip: 'Use frequency adverbs: usually, sometimes, often.' },
        { id: 'ws-s1-5', q: 'Do you enjoy cooking? Why or why not?', tip: 'Give reasons and personal examples.' }
      ]
    },
    {
      part: 2, label: 'Long Turn', description: 'You have 1 minute to prepare, then speak for 1–2 minutes.',
      cueCard: {
        topic: 'Describe a place you would like to visit.',
        bullets: ['where it is', 'why you want to go there', 'what you would do there', 'and explain how you learned about this place.']
      },
      prepSeconds: 60, speakSeconds: 120
    },
    {
      part: 3, label: 'Discussion', description: 'Answer each abstract question in about 1 minute, giving reasons and examples.',
      questions: [
        { id: 'ws-s3-1', q: 'How has tourism changed in your country in recent years?', tip: 'Use compare/contrast language: used to / now / increasingly.' },
        { id: 'ws-s3-2', q: 'Do you think international travel will become more or less common in the future?', tip: 'Give a clear opinion with supporting reasons.' },
        { id: 'ws-s3-3', q: 'Some people say that tourism damages local cultures. Do you agree?', tip: 'Discuss both sides, then give your view.' },
        { id: 'ws-s3-4', q: 'What responsibilities do tourists have when visiting other countries?', tip: 'Use modal verbs: should, ought to, must.' }
      ]
    }
  ];

  const BAND_DESCRIPTORS = [
    { band: 9, writing: 'Fully addresses the task, uses a wide range of vocabulary and grammar with full accuracy, seamless cohesion.', speaking: 'Fluent and spontaneous, wide range of structures, precise pronunciation, fully appropriate responses.' },
    { band: 8, writing: 'Sufficiently addresses all parts, uses a wide range of features with only occasional errors.', speaking: 'Fluent with only occasional repetition, wide vocabulary, generally accurate grammar.' },
    { band: 7, writing: 'Addresses all parts, uses a variety of complex structures, some errors do not impede communication.', speaking: 'Speaks at length without noticeable effort, good range of vocabulary and grammar, some self-correction.' },
    { band: 6, writing: 'Addresses all parts, uses adequate range of vocabulary and grammar, errors do not cause major issues.', speaking: 'Willing to speak at length, generally clear, adequate vocabulary, mixing simple and complex forms.' },
    { band: 5, writing: 'Addresses the task only partially, limited range of vocabulary and grammar, some errors may cause confusion.', speaking: 'Responds with reasonable fluency, limited vocabulary, frequent self-correction, basic grammar structures.' },
    { band: 4, writing: 'Limited task coverage, vocabulary is basic, frequent errors in grammar.', speaking: 'Cannot respond without noticeable pauses, limited vocabulary, frequent errors.' }
  ];

  /* ---------- helper ---------- */
  function fmtTime(s) {
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }
  function countWords(t) { return t.trim().split(/\s+/).filter(Boolean).length; }

  /* ---------- render ---------- */
  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) { window.IELTS_AUTH.showScreen(); return; }
    if (state.view === 'writing-practice') { renderWritingPractice(); return; }
    if (state.view === 'speaking-practice') { renderSpeakingPractice(); return; }

    state.view = 'home';
    const c = cache();

    const renderWritingCard = (p) => `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl p-5 flex items-center justify-between gap-3 transition-all hover:border-[rgba(212,175,55,0.5)] hover:shadow-lg">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-lg">${p.type === 'Task 1' ? '📊' : '📝'}</span>
            <span class="text-sm font-bold text-[#f5f0e6]">${esc(p.type)} — ${esc(p.label)}</span>
          </div>
          <p class="text-xs text-[#f5f0e6]/60">⏱ ${p.minutes} min · ≥${p.wordLimit} words · Band descriptors included</p>
        </div>
        <button class="btn-primary text-sm whitespace-nowrap" onclick="IELTS_WSS.startWriting('${p.id}')">Start</button>
      </div>`;

    const renderSpeakingCard = (part) => `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl p-5 flex items-center justify-between gap-3 transition-all hover:border-[rgba(212,175,55,0.5)] hover:shadow-lg">
        <div>
          <span class="text-sm font-bold text-[#f5f0e6]">🗣️ Part ${part.part} — ${esc(part.label)}</span>
          <p class="text-xs text-[#f5f0e6]/60 mt-1">${esc(part.description)}</p>
        </div>
        <button class="btn-primary text-sm whitespace-nowrap" onclick="IELTS_WSS.startSpeaking(${part.part})">Start</button>
      </div>`;

    $('#wss-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <h2 class="text-2xl font-extrabold text-[#f5f0e6]">✍️🗣️ Writing & Speaking Studio</h2>
        <p class="text-sm text-[#f5f0e6]/60 mt-1">Practice prompts with band descriptors, structure templates, and audio recording.</p>
        <div class="flex gap-3 mt-4">
          <button class="tab-pill ${state.tab === 'writing' ? 'active' : ''}" onclick="IELTS_WSS.switchTab('writing')">✍️ Writing</button>
          <button class="tab-pill ${state.tab === 'speaking' ? 'active' : ''}" onclick="IELTS_WSS.switchTab('speaking')">🗣️ Speaking</button>
        </div>
      </div>
      ${state.tab === 'writing' ? `
        <div class="grid md:grid-cols-2 gap-4 mb-6">${WRITING_PROMPTS.map(renderWritingCard).join('')}</div>
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6">
          <h3 class="text-lg font-bold text-[#f5f0e6] mb-4">📊 IELTS Writing Band Descriptors (Simplified)</h3>
          <div class="space-y-3">
            ${BAND_DESCRIPTORS.map((b) => `
              <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-lg p-4">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-lg font-extrabold text-[#d4af37]">Band ${b.band}</span>
                </div>
                <p class="text-xs text-[#f5f0e6]/70">${esc(b.writing)}</p>
              </div>`).join('')}
          </div>
        </div>
      ` : `
        <div class="grid md:grid-cols-2 gap-4 mb-6">${SPEAKING_PARTS.map(renderSpeakingCard).join('')}</div>
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6">
          <h3 class="text-lg font-bold text-[#f5f0e6] mb-4">📊 IELTS Speaking Band Descriptors (Simplified)</h3>
          <div class="space-y-3">
            ${BAND_DESCRIPTORS.map((b) => `
              <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-lg p-4">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-lg font-extrabold text-[#d4af37]">Band ${b.band}</span>
                </div>
                <p class="text-xs text-[#f5f0e6]/70">${esc(b.speaking)}</p>
              </div>`).join('')}
          </div>
        </div>
      `}`;
  }

  function switchTab(tab) { state.tab = tab; render(); }

  /* ---------- Writing practice ---------- */
  function startWriting(id) {
    const p = WRITING_PROMPTS.find((x) => x.id === id);
    if (!p) return;
    state.writing.taskId = id;
    state.writing.timer = { running: false, seconds: 0, interval: null };
    state.view = 'writing-practice';
    render();
  }

  function renderWritingPractice() {
    const p = WRITING_PROMPTS.find((x) => x.id === state.writing.taskId);
    if (!p) return;
    if (state.writing.checks.length !== p.bands.length) {
      state.writing.checks = new Array(p.bands.length).fill(false);
    }
    const t = state.writing.timer;
    const draft = localStorage.getItem('ielts-wss-draft-' + p.id) || '';

    $('#wss-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="text-lg font-extrabold text-[#f5f0e6]">${esc(p.type)} — ${esc(p.label)}</h3>
            <p class="text-xs text-[#f5f0e6]/60 mt-1">⏱ ${p.minutes} min · ≥${p.wordLimit} words</p>
          </div>
          <div class="flex items-center gap-3">
            <span id="wss-wordcount" class="text-sm font-bold text-[#f5f0e6] bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.3)] px-3 py-1.5 rounded-lg">0 words</span>
            <span id="wss-timer" class="font-mono text-sm font-bold text-[#d4af37] bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.3)] px-4 py-2 rounded-lg">${fmtTime(t.seconds)}</span>
            <button class="btn-primary text-sm" onclick="IELTS_WSS.toggleWritingTimer()" id="wss-timer-btn">${t.running ? 'Pause' : 'Start timer'}</button>
          </div>
        </div>

        <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-5 mb-5">
          <p class="text-sm font-semibold text-[#d4af37] mb-2">📝 Writing prompt</p>
          <p class="text-sm text-[#f5f0e6]/80 leading-relaxed">${esc(p.prompt)}</p>
        </div>

        <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-5 mb-5">
          <p class="text-sm font-semibold text-[#d4af37] mb-3">🏗️ Structure template</p>
          <div class="space-y-3">
            ${Object.entries(p.template).map(([section, tips]) => `
              <div>
                <p class="text-xs font-bold text-[#f5f0e6]/70 uppercase tracking-wide mb-1">${esc(section)}</p>
                ${tips.map((tip) => `<p class="text-xs text-[#f5f0e6]/60 leading-relaxed whitespace-pre-line">• ${esc(tip)}</p>`).join('')}
              </div>`).join('')}
          </div>
        </div>

        <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-5 mb-5">
          <p class="text-sm font-semibold text-[#d4af37] mb-3">📊 Band self-assessment checklist</p>
          <div class="space-y-2 band-checklist">
            ${p.bands.map((b, i) => `
              <label class="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" class="mt-1 accent-[#d4af37]" onchange="IELTS_WSS.checkBand(${i})" ${state.writing.checks[i] ? 'checked' : ''}>
                <span class="text-xs text-[#f5f0e6]/80"><strong>${esc(b.label)}:</strong> ${esc(b.desc)}</span>
              </label>`).join('')}
          </div>
          <p class="text-xs text-[#f5f0e6]/60 mt-3">Estimated band: <span id="wss-band-est" class="font-bold text-[#d4af37]">${state.writing.checks.length ? 'Band ' + esc(wssBandEstimate()) : 'Band —'}</span> · based on the official Writing descriptors (Task Response · Cohesion · Lexical · Grammar).</p>
        </div>

        <textarea id="wss-textarea" class="writing-area mt-4" placeholder="Write your answer here…">${esc(draft)}</textarea>

        <div class="flex flex-wrap gap-3 mt-4">
          <button class="btn-primary text-sm" onclick="IELTS_WSS.checkWriting()">Check word count</button>
          <button class="btn-secondary text-sm" onclick="IELTS_WSS.toggleSample()">Show sample answer</button>
          <button class="btn-secondary text-sm" onclick="IELTS_WSS.clearDraft()">Clear draft</button>
          <button class="btn-secondary text-sm" onclick="IELTS_WSS.back()">← Back</button>
        </div>

        <div id="wss-feedback" class="mt-4"></div>
        <div id="wss-sample" class="hidden mt-4 bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-5">
          <p class="font-bold text-[#d4af37] text-sm mb-2">✅ Sample answer</p>
          <p class="text-sm text-[#f5f0e6]/80 leading-relaxed whitespace-pre-line">${esc(p.sample || 'Sample answer coming soon — focus on the structure template above.')}</p>
        </div>
      </div>`;

    const ta = $('#wss-textarea');
    ta.addEventListener('input', () => {
      const count = countWords(ta.value);
      $('#wss-wordcount').textContent = count + ' words';
      localStorage.setItem('ielts-wss-draft-' + p.id, ta.value);
    });
    $('#wss-wordcount').textContent = countWords(draft) + ' words';
  }

  function toggleWritingTimer() {
    const t = state.writing.timer;
    if (t.running) { stopWritingTimer(); return; }
    t.running = true;
    t.interval = setInterval(() => {
      t.seconds++;
      const el = $('#wss-timer');
      if (el) { el.textContent = fmtTime(t.seconds); if (t.seconds >= 3600) el.classList.add('timer-late'); }
    }, 1000);
    const btn = $('#wss-timer-btn');
    if (btn) btn.textContent = 'Pause';
  }

  function stopWritingTimer() {
    state.writing.timer.running = false;
    clearInterval(state.writing.timer.interval);
    const btn = $('#wss-timer-btn');
    if (btn) btn.textContent = 'Start timer';
  }

  function checkBand(i) {
    state.writing.checks[i] = !state.writing.checks[i];
    const el = $('#wss-band-est');
    if (el) el.textContent = state.writing.checks.some(Boolean) ? 'Band ' + wssBandEstimate() : 'Band —';
  }

  function wssBandEstimate() {
    const p = WRITING_PROMPTS.find((x) => x.id === state.writing.taskId);
    if (!p || !p.bands.length) return '—';
    const n = state.writing.checks.filter(Boolean).length;
    if (!n) return '—';
    const b = Math.round((1 + (n / p.bands.length) * 8) * 2) / 2;
    return Math.max(1, Math.min(9, b)).toFixed(1);
  }

  function checkWriting() {
    const p = WRITING_PROMPTS.find((x) => x.id === state.writing.taskId);
    if (!p) return;
    const text = $('#wss-textarea').value;
    const count = countWords(text);
    const ok = count >= p.wordLimit;
    const checked = state.writing.checks.filter(Boolean).length;
    const band = wssBandEstimate();
    const fb = [];
    if (count === 0) fb.push('You haven\'t written anything yet.');
    else if (count < p.wordLimit * 0.8) fb.push('Under target — aim for at least ' + p.wordLimit + ' words.');
    else if (ok) fb.push('Good length for this task.');

    $('#wss-feedback').innerHTML = `
      <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border ${ok ? 'border-emerald-500/30' : 'border-[#d4af37]/30'} rounded-xl p-5">
        <p class="font-extrabold text-[#f5f0e6]">Word count: <span class="${ok ? 'text-emerald-400' : 'text-[#d4af37]'}">${count}</span> / ${p.wordLimit}+</p>
        ${band !== '—' ? '<p class="text-sm font-bold text-[#d4af37] mt-1">🎖 Estimated IELTS Band: ' + band + ' <span class="text-[10px] font-bold text-[#f5f0e6]/50 uppercase">(' + checked + '/' + p.bands.length + ' checklist)</span></p>' : '<p class="text-xs text-[#f5f0e6]/50 mt-1">Tick the Band 9 checklist to see your estimated band.</p>'}
        ${fb.length ? '<ul class="text-sm text-[#f5f0e6]/60 mt-2 space-y-1">' + fb.map((f) => '<li>• ' + esc(f) + '</li>').join('') + '</ul>' : ''}
      </div>`;

    if (window.IELTS_AUTH && window.IELTS_AUTH.completeClaim('wss-writing-' + p.id)) {
      window.IELTS_AUTH.addXp(WRITING_XP);
      window.IELTS_AUTH.addActivity('writing', 'Wrote ' + count + ' words for ' + p.type + (band !== '—' ? ' · Band ' + band : ''), WRITING_XP);
      window.toast && window.toast('+' + WRITING_XP + ' XP!');
    }
    if (window.IELTS_DIAG && window.IELTS_DIAG.record) {
      window.IELTS_DIAG.record('writing', 'WSS ' + p.type + ' self-assessment', checked, p.bands.length, { correct: checked, total: p.bands.length, band: band === '—' ? null : parseFloat(band) });
    }
  }

  function toggleSample() { $('#wss-sample').classList.toggle('hidden'); }
  function clearDraft() {
    const p = WRITING_PROMPTS.find((x) => x.id === state.writing.taskId);
    if (p) localStorage.removeItem('ielts-wss-draft-' + p.id);
    const ta = $('#wss-textarea'); if (ta) ta.value = '';
    const wc = $('#wss-wordcount'); if (wc) wc.textContent = '0 words';
    const fb = $('#wss-feedback'); if (fb) fb.innerHTML = '';
  }

  /* ---------- Speaking practice ---------- */
  function startSpeaking(partNum) {
    const part = SPEAKING_PARTS.find((x) => x.part === partNum);
    if (!part) return;
    state.speaking.part = partNum;
    state.speaking.prepTimer = { running: false, seconds: 0, interval: null };
    state.speaking.speakTimer = { running: false, seconds: 0, interval: null };
    state.speaking.recording = false;
    state.speaking.chunks = [];
    state.speaking.audioUrl = null;
    if (state.speaking.mediaRecorder) { try { state.speaking.mediaRecorder.stop(); } catch (e) {} state.speaking.mediaRecorder = null; }
    state.view = 'speaking-practice';
    render();
  }

  function renderSpeakingPractice() {
    const part = SPEAKING_PARTS.find((x) => x.part === state.speaking.part);
    if (!part) return;
    const sp = state.speaking;
    const fmtS = (sec) => String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0');

    let bodyHtml = '';
    if (part.part === 1 || part.part === 3) {
      bodyHtml = `
        <div class="space-y-5">
          ${part.questions.map((q) => `
            <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-lg p-4">
              <p class="text-sm font-semibold text-[#f5f0e6] mb-2">🎤 ${esc(q.q)}</p>
              <p class="text-xs text-[#f5f0e6]/50 italic mb-2">💡 Tip: ${esc(q.tip)}</p>
              <label class="flex items-start gap-2 cursor-pointer mt-2">
                <input type="checkbox" class="mt-1 accent-[#d4af37]">
                <span class="text-xs text-[#f5f0e6]/70">I practised this question</span>
              </label>
            </div>`).join('')}
        </div>`;
    } else {
      bodyHtml = `
        <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.2)] rounded-xl p-5 mb-5">
          <p class="text-sm font-semibold text-[#d4af37] mb-3">Cue card — ${esc(part.cueCard.topic)}</p>
          <ul class="text-sm text-[#f5f0e6]/80 space-y-1.5">
            ${part.cueCard.bullets.map((b) => '<li>• ' + esc(b) + '</li>').join('')}
          </ul>
        </div>
        <div class="flex flex-wrap items-center gap-3 mb-5">
          <div id="wss-prep-timer" class="font-mono text-sm font-bold text-[#f5f0e6] bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.3)] px-4 py-2 rounded-lg">${fmtS(part.prepSeconds)}</div>
          <button class="btn-primary text-sm" onclick="IELTS_WSS.startPrepTimer()" id="wss-prep-btn">Start 1-min prep</button>
          <div id="wss-speak-timer" class="font-mono text-sm font-bold text-[#f5f0e6] bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.3)] px-4 py-2 rounded-lg">${fmtS(part.speakSeconds)}</div>
          <button class="btn-primary text-sm" onclick="IELTS_WSS.startSpeakTimer()" id="wss-speak-btn">Start 2-min talk</button>
        </div>`;
    }

    const recBtnLabel = sp.recording ? '⏹ Stop Recording' : (sp.audioUrl ? '🎙️ Record Again' : '🎙️ Start Recording');

    $('#wss-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="text-lg font-extrabold text-[#f5f0e6]">🗣️ Part ${part.part} — ${esc(part.label)}</h3>
            <p class="text-xs text-[#f5f0e6]/60 mt-1">${esc(part.description)}</p>
          </div>
          <button class="btn-secondary text-sm" onclick="IELTS_WSS.back()">← Back</button>
        </div>
        ${bodyHtml}
        <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-4 mb-4">
          <p class="text-sm font-semibold text-[#d4af37] mb-2">🎙️ Audio Recording</p>
          <p class="text-xs text-[#f5f0e6]/50 mb-3">Record yourself answering, then play it back to check fluency and pronunciation.</p>
          <button class="btn-primary text-sm" onclick="IELTS_WSS.toggleRecording()" id="wss-rec-btn">${recBtnLabel}</button>
          ${sp.audioUrl ? `
            <div class="mt-3">
              <audio id="wss-audio" controls src="${sp.audioUrl}" class="w-full"></audio>
            </div>` : ''}
        </div>
        <div class="mt-4 bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-4">
          <p class="text-sm font-semibold text-[#d4af37] mb-2">✅ Self-assessment</p>
          <div class="space-y-2">
            <label class="flex items-start gap-2 cursor-pointer"><input type="checkbox" class="mt-1 accent-[#d4af37]"><span class="text-xs text-[#f5f0e6]/80">I answered all parts of the question</span></label>
            <label class="flex items-start gap-2 cursor-pointer"><input type="checkbox" class="mt-1 accent-[#d4af37]"><span class="text-xs text-[#f5f0e6]/80">I used a range of vocabulary</span></label>
            <label class="flex items-start gap-2 cursor-pointer"><input type="checkbox" class="mt-1 accent-[#d4af37]"><span class="text-xs text-[#f5f0e6]/80">I used complex grammar structures</span></label>
            <label class="flex items-start gap-2 cursor-pointer"><input type="checkbox" class="mt-1 accent-[#d4af37]"><span class="text-xs text-[#f5f0e6]/80">I spoke fluently without long pauses</span></label>
          </div>
        </div>
      </div>`;
  }

  function startPrepTimer() {
    const part = SPEAKING_PARTS.find((x) => x.part === state.speaking.part);
    if (!part || part.part !== 2) return;
    const t = state.speaking.prepTimer;
    clearInterval(t.interval);
    t.seconds = part.prepSeconds;
    t.running = true;
    const fmtS = (sec) => String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0');
    t.interval = setInterval(() => {
      t.seconds--;
      const el = $('#wss-prep-timer');
      if (el) { el.textContent = fmtS(Math.max(0, t.seconds)); if (t.seconds <= 10) el.classList.add('timer-late'); }
      if (t.seconds <= 0) { clearInterval(t.interval); t.running = false; window.toast && window.toast('Prep time finished — start speaking!'); }
    }, 1000);
  }

  function startSpeakTimer() {
    const part = SPEAKING_PARTS.find((x) => x.part === state.speaking.part);
    if (!part || part.part !== 2) return;
    const t = state.speaking.speakTimer;
    clearInterval(t.interval);
    t.seconds = part.speakSeconds;
    t.running = true;
    const fmtS = (sec) => String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0');
    t.interval = setInterval(() => {
      t.seconds--;
      const el = $('#wss-speak-timer');
      if (el) { el.textContent = fmtS(Math.max(0, t.seconds)); if (t.seconds <= 30) el.classList.add('timer-late'); }
      if (t.seconds <= 0) { clearInterval(t.interval); t.running = false; window.toast && window.toast('Time\'s up!'); }
    }, 1000);
  }

  /* ---------- Audio recording ---------- */
  async function toggleRecording() {
    const sp = state.speaking;
    if (sp.recording) {
      if (sp.mediaRecorder && sp.mediaRecorder.state !== 'inactive') sp.mediaRecorder.stop();
      sp.recording = false;
      const btn = $('#wss-rec-btn');
      if (btn) btn.textContent = '🎙️ Record Again';
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      sp.mediaRecorder = mr;
      sp.chunks = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) sp.chunks.push(e.data); };
      mr.onstop = () => {
        stream.getTracks().forEach((tr) => tr.stop());
        if (sp.chunks.length) {
          const blob = new Blob(sp.chunks, { type: 'audio/webm' });
          if (sp.audioUrl) URL.revokeObjectURL(sp.audioUrl);
          sp.audioUrl = URL.createObjectURL(blob);
          renderSpeakingPractice();
          if (window.IELTS_AUTH && window.IELTS_AUTH.completeClaim('wss-speaking-rec')) {
            window.IELTS_AUTH.addXp(SPEAKING_XP);
            window.IELTS_AUTH.addActivity('speaking', 'Recorded speaking practice', SPEAKING_XP);
            window.toast && window.toast('+' + SPEAKING_XP + ' XP!');
          }
        }
      };
      mr.start();
      sp.recording = true;
      const btn = $('#wss-rec-btn');
      if (btn) btn.textContent = '⏹ Stop Recording';
    } catch (err) {
      window.toast && window.toast('Microphone access denied — allow it in your browser settings.');
    }
  }

  function back() {
    stopWritingTimer();
    state.speaking.prepTimer.interval && clearInterval(state.speaking.prepTimer.interval);
    state.speaking.speakTimer.interval && clearInterval(state.speaking.speakTimer.interval);
    if (state.speaking.mediaRecorder) { try { state.speaking.mediaRecorder.stop(); } catch (e) {} state.speaking.mediaRecorder = null; }
    state.view = 'home';
    render();
  }

  window.IELTS_WSS = { render, switchTab, startWriting, toggleWritingTimer, checkWriting, toggleSample, clearDraft, startSpeaking, startPrepTimer, startSpeakTimer, toggleRecording, back };
})();
