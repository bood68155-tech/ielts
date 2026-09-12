/* ============================================================
   IELTS PA — Live AI Content & Content-Generation Engine
   ------------------------------------------------------------
   A client-side AI service that powers:
     1. AI Vocab & Collocation Generator  (Band 8-9 word banks)
     2. AI Reading & Listening Passage Builder (Cambridge-style)
     3. AI Writing & Speaking Evaluator (band + errors + rewrite)

   Uses the Google Gemini REST API (browser-friendly CORS) when a
   key is configured. Without a key it transparently falls back to
   a deterministic "Demo mode" so the UX never breaks. All generated
   content is saved locally (user-scoped) and mirrored best-effort
   to the configured Supabase/Neon database via IELTS_DB.insert,
   and every generation tracks XP + activity + diagnostics.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* Bespoke heritage line icons (js/rami-icons.js) */
  const ic = (name, cls) => (window.RAMI_ICONS && window.RAMI_ICONS.icon ? window.RAMI_ICONS.icon(name, cls || 'w-5 h-5') : '');
  const DAY_ICONS = ['read', 'listen', 'write', 'speak', 'vocab', 'grammar', 'idiom', 'exam', 'roadmap', 'evaluate', 'library', 'settings', 'spark', 'clock', 'bookmark', 'marker', 'dome', 'olive', 'chat'];
  const dayIcon = (d) => { const n = String((d && d.icon) || '').trim(); return DAY_ICONS.indexOf(n) >= 0 ? ic(n, 'w-5 h-5') : '<span class="text-lg">' + esc(n || '📘') + '</span>'; };

  const DEFAULT_MODEL = 'gemini-2.0-flash';
  const FALLBACK_MODELS = [DEFAULT_MODEL, 'gemini-1.5-flash'];

  /* The permanent identity of the AI English teacher — Teacher Rami (أستاذ رامي) */
  const MENTOR = { ar: 'أستاذ رامي', name: 'Teacher Rami' };
  const mentorName = () => MENTOR.name;
  const mentorLabel = () => MENTOR.name + ' · ' + MENTOR.ar;
  const mentorGreeting = () => 'Salam! I am ' + MENTOR.name + ' (' + MENTOR.ar + '), your expert English teacher and mentor. Follow today’s task, do it out loud, and I will tell you exactly how to think, write and phrase like a native professional.';
  const mentorShort = () => '— ' + MENTOR.name + ' (' + MENTOR.ar + ')';

  /* Teacher Rami's official avatar — rami-avatar.jpg (kuffiyeh-robot portrait). */
  const MENTOR_AVATAR = '<img class="rami-avatar" src="rami-avatar.jpg" alt="Teacher Rami (الأستاذ رامي)" loading="lazy" decoding="async" />';

  /* ================= scoped storage ================= */
  function cfg() {
    let c = null;
    if (window.IELTS_AUTH) c = window.IELTS_AUTH.getScoped('aikey', null);
    if (!c || typeof c !== 'object') c = {};
    const key = c.key || window.__IELTS_AI_KEY__ || '';
    return { key, model: c.model || DEFAULT_MODEL, demo: !key };
  }

  function store() {
    if (!window.IELTS_AUTH) return { myLibrary: [] };
    let c = window.IELTS_AUTH.getScoped('ai', null);
    if (!c || !Array.isArray(c.myLibrary)) { c = { myLibrary: [], attempts: [] }; window.IELTS_AUTH.setScoped('ai', c); }
    if (!Array.isArray(c.myLibrary)) c.myLibrary = [];
    if (!Array.isArray(c.attempts)) c.attempts = [];
    return c;
  }

  function saveStore(c) { if (window.IELTS_AUTH) window.IELTS_AUTH.setScoped('ai', c); }

  /* ================= modal host ================= */
  function ensureModal() {
    if ($('#ielts-ai-modal')) return;
    const div = document.createElement('div');
    div.id = 'ielts-ai-modal';
    div.className = 'fixed inset-0 z-[100] hidden';
    div.innerHTML = `
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="window.IELTS_AI && window.IELTS_AI.closeModal()"></div>
      <div class="relative h-full overflow-y-auto flex items-start justify-center p-4 md:p-8">
        <div class="w-full max-w-2xl bg-[rgba(15,23,42,0.97)] border border-[rgba(212,175,55,0.35)] rounded-2xl shadow-2xl overflow-hidden">
          <div class="flex items-center justify-between gap-3 px-5 py-4 border-b border-[rgba(212,175,55,0.2)]">
            <h3 id="ielts-ai-modal-title" class="font-extrabold text-[#f5f0e6] text-lg"></h3>
            <button class="text-[#f5f0e6]/50 hover:text-[#f5f0e6] text-xl leading-none px-2" onclick="window.IELTS_AI && window.IELTS_AI.closeModal()">×</button>
          </div>
          <div id="ielts-ai-modal-body" class="p-5 max-h-[75vh] overflow-y-auto"></div>
        </div>
      </div>`;
    document.body.appendChild(div);
  }

  function openModal(title, bodyHtml) {
    ensureModal();
    const m = $('#ielts-ai-modal');
    if (!m) return;
    $('#ielts-ai-modal-title').textContent = title;
    $('#ielts-ai-modal-body').innerHTML = bodyHtml;
    m.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeModal() {
    const m = $('#ielts-ai-modal');
    if (m) m.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  function demoBanner() {
    return '<p class="text-[11px] text-[#f5f0e6]/50 mb-4 bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.25)] rounded-lg px-3 py-2"><b class="text-[#d4af37]">' + esc(mentorName()) + ' (' + MENTOR.ar + ')</b> is coaching you from his built-in knowledge pack. Add a model key in <button class="underline text-[#d4af37] hover:text-[#f5f0e6]" onclick="window.IELTS_AI.openSettings()">' + esc(mentorName()) + '’s studio settings</button> to unlock fully live, personal tutoring.</p>';
  }

  function loader(msg) {
    return `<div class="text-center py-14">
      <div class="mx-auto w-10 h-10 rounded-full border-2 border-[rgba(212,175,55,0.3)] border-t-[#d4af37] animate-spin"></div>
      <p class="text-sm text-[#f5f0e6]/70 mt-4">${esc(msg || 'Generating with AI…')}</p>
    </div>`;
  }

  function field(id, label, placeholder, value, opts) {
    opts = opts || {};
    return `<label class="block mb-3">
      <span class="text-xs font-bold text-[#f5f0e6]/70 uppercase tracking-wide mb-1 block">${esc(label)}</span>
      ${opts.select
        ? `<select id="${id}" class="w-full bg-[rgba(20,18,15,0.9)] border border-[rgba(212,175,55,0.3)] rounded-lg px-4 py-2.5 text-sm text-[#f5f0e6] focus:border-[rgba(212,175,55,0.6)] outline-none">${opts.options.map((o) => `<option ${value === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`
        : `<input id="${id}" type="${opts.type || 'text'}" value="${esc(value || '')}" placeholder="${esc(placeholder || '')}" class="w-full bg-[rgba(20,18,15,0.9)] border border-[rgba(212,175,55,0.3)] rounded-lg px-4 py-2.5 text-sm text-[#f5f0e6] focus:border-[rgba(212,175,55,0.6)] outline-none" ${opts.multiline ? 'rows="4"' : ''} />`}
    </label>`;
  }

  function gradientBtn(label, onclick) {
    return `<button onclick="${onclick}" class="px-5 py-2.5 rounded-lg text-sm font-bold text-[#14120f] bg-[#d4af37] hover:bg-[#b8962e] active:bg-[#a3852a] transition shadow-lg border border-[rgba(255,235,180,0.35)] inline-flex items-center gap-2">${ic('spark', 'w-4 h-4')}${label}</button>`;
  }

  /* ================= Gemini client ================= */
  const GEMINI_URL = (model) => 'https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent';

  // Use the Vercel serverless proxy (reads GEMINI_API_KEY server-side)
  // whenever we are on a deployed domain and no client-side key is set.
  function useProxy() {
    try {
      if (typeof window === 'undefined' || typeof window.location === 'undefined') return false;
      if (window.location.protocol === 'file:') return false;
      const host = String(window.location.hostname || '').toLowerCase();
      if (!host || host === 'localhost' || host === '127.0.0.1') return false;
      return true;
    } catch (e) { return false; }
  }

  async function gemini(systemPrompt, userPrompt, jsonOut) {
    const c = cfg();
    if (!c.key && !useProxy()) return null;
    const models = [c.model || DEFAULT_MODEL].concat(FALLBACK_MODELS.filter((m) => m !== (c.model || DEFAULT_MODEL)));
    let lastErr = null;
    for (const model of models) {
      try {
        let out = '';
        if (c.key) {
          const res = await fetch(GEMINI_URL(model) + '?key=' + encodeURIComponent(c.key), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: systemPrompt + '\n\n' + userPrompt }] }],
              generationConfig: Object.assign({ temperature: 0.85, maxOutputTokens: 4096 }, jsonOut ? { responseMimeType: 'application/json' } : {})
            })
          });
          if (!res.ok) { lastErr = new Error('HTTP ' + res.status); if (res.status === 404) continue; throw lastErr; }
          const data = await res.json();
          const text = (((data.candidates || [])[0] || {}).content || {}).parts;
          out = Array.isArray(text) ? text.map((p) => p.text || '').join('') : '';
        } else {
          const res = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model, system: systemPrompt, user: userPrompt, json: !!jsonOut })
          });
          if (!res.ok) return null;
          const data = await res.json().catch(() => null);
          if (!data || typeof data.text !== 'string' || !data.text.trim()) return null;
          out = data.text;
        }
        if (out.trim()) return out.trim();
        lastErr = new Error('Empty AI response');
      } catch (e) { lastErr = e; }
    }
    console.warn('[IELTS_AI] Gemini call failed:', lastErr);
    return null;
  }

  function parseJson(text) {
    try { return JSON.parse(text); } catch (e) { /* fall through */ }
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (fenced) { try { return JSON.parse(fenced[1]); } catch (e2) { /* fall through */ } }
    const open = text.indexOf('{');
    const openArr = text.indexOf('[');
    const start = openArr >= 0 && (open < 0 || openArr < open) ? openArr : open;
    if (start < 0) return null;
    for (let i = text.length - 1; i > start; i--) {
      const ch = text[i];
      if (ch === '}' || ch === ']') {
        try { return JSON.parse(text.slice(start, i + 1)); } catch (e3) { continue; }
      }
    }
    return null;
  }

  function hashStr(s) {
    let h = 0;
    const t = String(s || '');
    for (let i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  /* ================= XP / activity / diagnostics / DB ================= */
  function track(area, label, xp) {
    try {
      if (window.IELTS_AUTH && window.IELTS_AUTH.addXp) {
        window.IELTS_AUTH.addXp(xp);
        if (window.IELTS_AUTH.addActivity) window.IELTS_AUTH.addActivity(area, label, xp);
      }
    } catch (e) { /* ignore */ }
  }

  function diag(area, label, correct, total, opts) {
    try {
      if (window.IELTS_DIAG && window.IELTS_DIAG.record) window.IELTS_DIAG.record(area, label, correct, total, opts || {});
    } catch (e) { /* ignore */ }
  }

  function persistDb(row) {
    try {
      if (window.IELTS_DB && typeof window.IELTS_DB.insert === 'function') window.IELTS_DB.insert('ai_content', row);
    } catch (e) { /* table may not exist offline — content stays local */ }
  }

  function addToLibrary(kind, label, payload) {
    const c = store();
    const id = 'ai-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const created = Date.now();
    const row = { id, kind, label, createdAt: created, payload };
    c.myLibrary.unshift(row);
    // prune to the newest 60 items so localStorage stays lean
    if (c.myLibrary.length > 60) c.myLibrary = c.myLibrary.slice(0, 60);
    saveStore(c);
    let userId = null;
    try { const u = window.IELTS_AUTH && window.IELTS_AUTH.getCurrentUser(); userId = u ? (u.id || u.username || null) : null; } catch (e) {}
    persistDb({ id, kind, label, user_id: userId, content: payload, created_at: created });
    return id;
  }

  function removeFromLibrary(id) {
    const c = store();
    c.myLibrary = c.myLibrary.filter((x) => x.id !== id);
    saveStore(c);
  }

  function listByKind(kind) {
    const c = store();
    return kind ? c.myLibrary.filter((x) => x.kind === kind) : c.myLibrary.slice();
  }

  /* ============================================================
     FALLBACK ENGINE (deterministic demo content, used when no
     API key is set, so the feature is always functional)
     ============================================================ */

  const FALLBACK_WORDS = [
    { word: 'ubiquitous', pos: 'adjective', definition: 'present, appearing, or found everywhere', collocation: 'ubiquitous in modern society / a ubiquitous presence', example: 'Smartphones have become ubiquitous in modern society, shaping daily communication and commerce.' },
    { word: 'detrimental', pos: 'adjective', definition: 'causing harm or damage', collocation: 'detrimental to health / a detrimental effect', example: 'Sedentary lifestyles are detrimental to long-term health and well-being.' },
    { word: 'mitigate', pos: 'verb', definition: 'to make something less harmful or severe', collocation: 'mitigate the effects / mitigate against', example: 'Governments must mitigate the effects of climate change through coordinated policy.' },
    { word: 'paradigm', pos: 'noun', definition: 'a typical example or pattern of something', collocation: 'a paradigm shift / the prevailing paradigm', example: 'Remote work represents a paradigm shift in how organisations measure productivity.' },
    { word: 'disparity', pos: 'noun', definition: 'a great difference between two or more things', collocation: 'a widening disparity / socioeconomic disparity', example: 'Income disparity between urban and rural areas continues to widen.' },
    { word: 'prevalent', pos: 'adjective', definition: 'widespread or generally accepted', collocation: 'increasingly prevalent / prevalent among', example: 'Digital distraction is increasingly prevalent among younger learners.' },
    { word: 'catalyst', pos: 'noun', definition: 'something that speeds up a change or event', collocation: 'a catalyst for change / act as a catalyst', example: 'Public pressure acted as a catalyst for stricter environmental regulation.' },
    { word: 'cumulative', pos: 'adjective', definition: 'increasing by successive additions', collocation: 'a cumulative effect / cumulative impact', example: 'The cumulative impact of small daily habits determines long-term academic success.' },
    { word: 'entrenched', pos: 'adjective', definition: 'firmly established and difficult to change', collocation: 'deeply entrenched / entrenched attitudes', example: 'Deeply entrenched attitudes about gender roles persist across many societies.' },
    { word: 'scarcity', pos: 'noun', definition: 'the state of being in short supply', collocation: 'resource scarcity / scarcity of opportunity', example: 'Water scarcity drives regional conflict and forces policy innovation.' },
    { word: 'robust', pos: 'adjective', definition: 'strong and effective in all circumstances', collocation: 'a robust framework / robust evidence', example: 'The study provides robust evidence that bilingual education benefits cognitive development.' },
    { word: 'imperative', pos: 'adjective/noun', definition: 'of vital importance; a need or requirement', collocation: 'a moral imperative / strategically imperative', example: 'Reducing carbon emissions is an economic and moral imperative for governments.' },
    { word: 'alleviate', pos: 'verb', definition: 'to make pain or a problem less severe', collocation: 'alleviate poverty / alleviate congestion', example: 'Public investment in rail networks helps alleviate urban congestion.' },
    { word: 'disproportionate', pos: 'adjective', definition: 'too large or too small compared with what is fair', collocation: 'a disproportionate share / disproportionately affected', example: 'Low-income families bear a disproportionate share of housing costs.' },
    { word: 'comprehensive', pos: 'adjective', definition: 'including everything that is necessary', collocation: 'a comprehensive strategy / comprehensive coverage', example: 'A comprehensive strategy is required to tackle the skills gap.' },
    { word: 'facilitate', pos: 'verb', definition: 'to make an action or process possible or easier', collocation: 'facilitate access / facilitate dialogue', example: 'Digital platforms facilitate access to higher education for rural learners.' },
    { word: 'implication', pos: 'noun', definition: 'a likely consequence of an action', collocation: 'a serious implication / wider implications', example: 'The wider implications of automation on employment remain contested.' },
    { word: 'sustainable', pos: 'adjective', definition: 'able to continue over time without depletion', collocation: 'sustainable development / environmentally sustainable', example: 'Sustainable urban design seeks to balance growth with environmental limits.' },
    { word: 'substantial', pos: 'adjective', definition: 'of considerable importance, size, or worth', collocation: 'a substantial increase / substantial evidence', example: 'There is substantial evidence linking early intervention to better outcomes.' },
    { word: 'advocate', pos: 'verb/noun', definition: 'to publicly support a cause; a supporter', collocation: 'advocate reform / a strong advocate', example: 'Educators advocate a shift from rote memorisation towards critical thinking.' },
    { word: 'constraint', pos: 'noun', definition: 'a limitation or restriction', collocation: 'budgetary constraints / time constraints', example: 'Budgetary constraints often force cities to prioritise road repair over cycle lanes.' },
    { word: 'corroborate', pos: 'verb', definition: 'to confirm or give support to a statement', collocation: 'corroborate the findings', example: 'Independent studies corroborate the findings of the initial report.' },
    { word: 'elevate', pos: 'verb', definition: 'to raise to a higher level or standard', collocation: 'elevate the debate / elevate standards', example: 'Better data hygiene would elevate the quality of public decision-making.' },
    { word: 'noteworthy', pos: 'adjective', definition: 'worth paying attention to', collocation: 'a noteworthy achievement / particularly noteworthy', example: 'The decline in commuting time is a particularly noteworthy outcome.' },
    { word: 'pervasive', pos: 'adjective', definition: 'spreading widely throughout an area or group', collocation: 'a pervasive influence / pervasive inequality', example: 'The pervasive influence of social media complicates adolescent identity formation.' }
  ];

  const MENTOR_WORD_TIPS = [
    'Native professionals do not hop between registers — own this word and it will lift the whole sentence around it.',
    'Push this word into your next answer on purpose; a word is only yours after the third active use.',
    'Pair it: native fluency is built on collocations, so always recall this word with its partner.',
    'Say it out loud in a full sentence before writing it — your ear catches what your eye forgives.',
    'Teach it to a friend for one minute and it moves from passive to active vocabulary.'
  ];

  function fallbackWords(topic, count, band) {
    const h = hashStr(topic);
    const out = [];
    for (let i = 0; i < count; i++) {
      const base = FALLBACK_WORDS[(h + i * 7) % FALLBACK_WORDS.length];
      out.push({
        word: base.word,
        pos: base.pos,
        definition: base.definition,
        collocation: base.collocation.replace(/\b(society|health|environment|policy|attitudes|families|learners|growth|access|debate|standards|decision-making|governments|cities|education)\b/gi, topic || 'society'),
        example: base.example.replace(/\b(societies|governments|organisations|society|learners|cities|communities|health|policy)\b/gi, topic || 'society'),
        band: band || 'Band 8-9',
        tip: MENTOR_WORD_TIPS[(h + i) % MENTOR_WORD_TIPS.length]
      });
    }
    return out;
  }

  const FALLBACK_P1 = 'The growing importance of {T} has attracted considerable attention from researchers and policymakers. Recent studies indicate that {T} shapes economic, social and environmental outcomes in ways that are rarely fully anticipated. While some observers dismiss these developments as short-lived trends, the evidence increasingly suggests that they will have enduring consequences.';
  const FALLBACK_P2 = 'A second body of research examines the mechanisms through which {T} operates. Scholars argue that a combination of institutional design, individual behaviour and technological change determines how effectively societies respond. Crucially, the effectiveness of any policy intervention depends less on its scale than on its timing and the degree of public support it commands.This insight, though intuitively obvious, is frequently overlooked in public debate.';
  const FALLBACK_P3 = 'Finally, the long-term outlook for {T} remains uncertain. The most plausible scenarios diverge sharply, reflecting different assumptions about innovation, governance and social values. Nevertheless, there is broad agreement that early, evidence-based action is considerably cheaper than later correction.In summary, the debate surrounding {T} is unlikely to disappear; rather, it will continue to evolve as new evidence emerges.';

  function fallbackPassage(topic, kind, band, n) {
    const t = topic || 'the topic';
    const p1 = FALLBACK_P1.split('{T}').join(t);
    const p2 = FALLBACK_P2.split('{T}').join(t);
    const p3 = FALLBACK_P3.split('{T}').join(t);
    const text = kind === 'listening'
      ? 'Narrator: Listen to the following short talk about ' + t + '.\n\n' + p1 + '\n' + p2 + '\n' + p3
      : p1 + '\n\n' + p2 + '\n\n' + p3;
    const Q = [
      { q: 'According to the passage, why has ' + t + ' attracted the attention of researchers and policymakers?', opts: ['Because it is a short-lived trend', 'Because it shapes economic, social and environmental outcomes', 'Because it is easy to measure', 'Because its effects are predictable'], a: 'B', exp: 'Paragraph one states that "' + t + ' shapes economic, social and environmental outcomes in ways that are rarely fully anticipated."' },
      { q: 'What does the passage suggest about dismissing these developments as trends?', opts: ['It is fully justified', 'The evidence suggests they will have enduring consequences', 'It is recommended by policymakers', 'It has no consequences'], a: 'B', exp: 'The writer cautions that "the evidence increasingly suggests that they will have enduring consequences."' },
      { q: 'According to paragraph two, the effectiveness of a policy intervention depends mainly on:', opts: ['Its scale alone', 'Its timing and the degree of public support', 'The number of institutions involved', 'The cost of technology'], a: 'B', exp: 'Paragraph two states it "depends less on its scale than on its timing and the degree of public support it commands."' },
      { q: 'The word "enduring" in paragraph one is closest in meaning to:', opts: ['Temporary', 'Long-lasting', 'Unpredictable', 'Costly'], a: 'B', exp: '"Enduring" means continuing or long-lasting, as used to describe the consequences of the developments.' },
      { q: 'What is the writer\'s overall conclusion?', opts: ['The debate is likely to disappear', 'Early, evidence-based action is cheaper than later correction', 'Innovation makes planning unnecessary', 'Social values will remain unchanged'], a: 'B', exp: 'The final paragraph concludes that "early, evidence-based action is considerably cheaper than later correction."' }
    ];
    const questions = [];
    for (let i = 0; i < n && i < Q.length; i++) questions.push(Q[(i + hashStr(t)) % Q.length]);
    while (questions.length < n) questions.push(Q[questions.length % Q.length]);
    return { title: 'AI: ' + t + (kind === 'listening' ? ' (Listening)' : ''), text, band, questions };
  }

  function fallbackEvaluate(text, kind) {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wc = words.length;
    const charTotal = text.replace(/\s+/g, '').length;
    const avgW = wc ? charTotal / wc : 0;
    const sent = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const avgS = sent.length ? wc / sent.length : 0;
    const longWeight = wc ? words.filter((w) => w.length > 7).length / wc : 0;
    const conWeight = (text.match(/\b(however|therefore|moreover|consequently|furthermore|although|despite|nevertheless|in addition|as a result|whereas)\b/gi) || []).length;
    let band = 4.5;
    if (wc >= (kind === 'speaking' ? 80 : 250)) band = 5.5;
    if (avgW >= 4.4) band += 0.5;
    if (longWeight >= 0.14) band += 0.5;
    if (conWeight >= 3) band += 0.5;
    if (avgS <= 22 && avgS > 8) band += 0.5;
    if (wc >= 320) band += 0.5;
    band = Math.round(Math.min(9, Math.max(3, band)) * 2) / 2;
    const criteria = kind === 'speaking'
      ? { 'Fluency & Coherence': band, 'Lexical Resource': Math.min(9, band + 0.5), 'Grammatical Range': Math.min(9, band - 0.5), 'Pronunciation': Math.min(9, band) }
      : { 'Task Response': band, 'Coherence & Cohesion': Math.min(9, band + 0.5), 'Lexical Resource': Math.min(9, band), 'Grammar & Accuracy': Math.min(9, band - 0.5) };
    return {
      band,
      demo: true,
      summary: 'Demo evaluation set by the offline heuristic engine: ' + wc + ' words, ' + Math.round(avgW * 10) / 10 + ' average letter length per word, ~' + Math.max(1, Math.round(avgS)) + ' words per sentence and ' + conWeight + ' discourse markers. Live mode (with an API key) produces examiner-level feedback, precise grammar corrections and a full Band 9 rewrite.',
      strengths: [
        'You produced ' + wc + ' words' + (wc >= 250 ? ' — a strong length for the writing task.' : ', though the writing tasks expect at least 250 words.'),
        (conWeight ? 'You use discourse markers to connect ideas (opening up cohesion marks).' : 'Your sentences are direct, which helps clarity; linking devices would lift cohesion.'),
        (longWeight >= 0.14 ? 'A good share of your vocabulary is more advanced (7+ letters), supporting lexical range.' : 'Broadening the range of advanced academic vocabulary would raise the lexical score.')
      ].slice(0, 3),
      weaknesses: [
        wc < 250 ? 'Length is below the 250-word minimum for Task 2.' : 'Length is adequate; focus on developing ideas rather than padding.',
        'Vary sentence openings to give the writing a more natural academic rhythm.',
        'Re-read and correct minor slips (articles, prepositions, verb forms) before submitting.'
      ],
      errors: fallbackErrors(text),
      vocab: fallbackVocabUpgrades(text),
      criteria,
      rewrite: null,
      demoNote: 'Add a Gemini API key in AI Settings to generate a full Band 9 rewrite and precise grammar corrections.',
      coaching: kind === 'speaking'
        ? [
            'Think in ideas, not grammar: before you speak, hold three beats in your mind — opinion, reason, example — and let the words follow.',
            'Answer like a native professional: open with a direct claim, then one illustration from your own life; long answers signal confidence only when they stay on point.',
            'Buy fluency with fill-phrases natives use, such as "What I mean is…" or "The point I am making is…" — never with dead air.',
            'Record yourself, then replay once: count hesitations and replace each with a linking phrase your next take.'
          ]
        : [
            'Think before you type: 5 minutes of planning beats any amount of polishing. One idea per paragraph, ordered strongest first.',
            'Native professionals open with the claim, not a ritual like "Nowadays…": lead each paragraph with your point, then explain, example, and link.',
            'Say what you mean in plain words first, then upgrade only the key nouns and verbs with precise vocabulary — precision over decoration.',
            'Build a 60-second self-review routine: re-read once for ideas, once for grammar slips, once aloud to catch unnatural phrasing — then submit.'
          ]
    };
  }

  function fallbackErrors(text) {
    const out = [];
    const doubleSpace = (text.match(/\s{2,}/g) || []).length;
    if (doubleSpace) out.push({ type: 'Formatting', original: '(repeated spaces)', correction: 'Use a single space between words', explanation: doubleSpace + ' double-space instances found — tighten the layout before submission.' });
    if (/\s[,.!?]/.test(text)) out.push({ type: 'Punctuation', original: '(space before punctuation)', correction: 'Place punctuation directly after the word', explanation: 'A space before a full stop or comma is a common low-band slip.' });
    const repeated = (text.match(/\b(\w+)\s+\1\b/gi) || []).length;
    if (repeated) out.push({ type: 'Repetition', original: '(repeated word)', correction: 'Remove or rephrase the duplicate', explanation: 'Repetition of a word within one sentence weakens lexical range.' });
    if (!out.length) out.push({ type: 'Fluency', original: '(sample)', correction: 'Vary sentence length and add topic-specific collocations', explanation: 'No automated slips detected by the demo engine — a live AI evaluation catches deeper grammar and cohesion issues.' });
    return out;
  }

  const BASIC_TO_UPGRADED = [
    { re: /\bgood\b/gi, original: 'good', upgraded: 'substantial / commendable', why: 'Precision beats praise: name the exact quality your work delivers.' },
    { re: /\bbad\b/gi, original: 'bad', upgraded: 'detrimental / substandard', why: 'A Band 8 essay quantifies the downside instead of labelling it.' },
    { re: /\bbig\b/gi, original: 'big', upgraded: 'considerable / substantial', why: 'Formal registers prefer measurable size over playground vocabulary.' },
    { re: /\bsmall\b/gi, original: 'small', upgraded: 'marginal / modest', why: 'Academic writing signals degree — marginal says how small, not just small.' },
    { re: /\bmany\b/gi, original: 'many', upgraded: 'a considerable number of / a significant proportion of', why: 'Countable precision reads as native-professional analysis rather than lists.' },
    { re: /\bpeople\b/gi, original: 'people', upgraded: 'individuals / the general public', why: 'Demographic words make your argument sound researched, not casual.' },
    { re: /\bthings?\b/gi, original: 'things', upgraded: 'aspects / factors / elements', why: '"Things" is vague; name the factors driving your argument.' },
    { re: /\bimportant\b/gi, original: 'important', upgraded: 'crucial / pivotal / paramount', why: 'Intensify once with one precise word — it reads more forceful than "very important".' },
    { re: /\bthink\b/gi, original: 'think', upgraded: 'contend / maintain / argue', why: 'Verbs of assertion frame an opinion that an examiner can weigh.' },
    { re: /\bsay\b/gi, original: 'say', upgraded: 'assert / state / illustrate', why: 'Report and support claims with verbs that define your role as analyst.' }
  ];

  function fallbackVocabUpgrades(text) {
    const upgrades = [];
    BASIC_TO_UPGRADED.forEach((item) => {
      if (upgrades.length >= 4) return;
      if (item.re.test(text)) upgrades.push({ original: item.original, upgraded: item.upgraded, why: item.why });
    });
    if (!upgrades.length) upgrades.push({ original: '(topic nouns)', upgraded: 'domain-specific collocations', why: 'Replace neutral nouns with the exact terms of the subject (e.g. sustainable, emissions, infrastructure) to unlock Band 8 lexical resource.' });
    return upgrades;
  }

  /* ============================================================
     PUBLIC GENERATORS
     ============================================================ */

  async function generateWordBank(opts) {
    opts = opts || {};
    const topic = String(opts.topic || '').trim() || 'Climate change';
    const count = Math.min(12, Math.max(3, parseInt(opts.count, 10) || 6));
    const band = opts.band || 'Band 8-9';
    const c = cfg();
    if (!c.key && !useProxy()) return { demo: true, topic, band, words: fallbackWords(topic, count, band) };
    const sys = 'You are an expert IELTS academic vocabulary lexicographer. Generate a precise, error-free word bank of Band ' + band + ' academic vocabulary for the IELTS exam. Every field must be exam-appropriate: precise definitions, natural native collocations (word + partner words), and an IELTS-style example sentence in the specified topic. No invented words, no duplicate words.';
    const usr = 'Topic: ' + topic + '\nCount: ' + count + '\nOutput ONLY strict JSON with no commentary:\n{"words":[{"word":"...","pos":"noun/verb/adjective...","definition":"...","collocation":"..." ,"example":"..." ,"band":"Band 8-9","tip":"one-sentence native-professional usage tip (how to activate this word)"}...]}';
    const raw = await gemini(sys, usr, true);
    const data = raw ? parseJson(raw) : null;
    if (!data || !Array.isArray(data.words) || !data.words.length) return { demo: true, topic, band, words: fallbackWords(topic, count, band) };
    const words = data.words.slice(0, count).map((w) => ({
      word: String(w.word || '').trim(),
      pos: String(w.pos || '').trim(),
      definition: String(w.definition || '').trim(),
      collocation: String(w.collocation || '').trim(),
      example: String(w.example || '').trim(),
      band: String(w.band || band),
      tip: String(w.tip || '').trim().slice(0, 220)
    })).filter((w) => w.word);
    return { demo: false, topic, band, words: words.length ? words : fallbackWords(topic, count, band) };
  }

  async function generatePassage(opts) {
    opts = opts || {};
    const topic = String(opts.topic || '').trim() || 'urban transport';
    const kind = opts.kind === 'listening' ? 'listening' : 'reading';
    const band = opts.band || 'Band 7';
    const n = Math.min(6, Math.max(3, parseInt(opts.questions, 10) || 5));
    const c = cfg();
    if (!c.key && !useProxy()) return { demo: true, kind, topic, band, ...fallbackPassage(topic, kind, band, n) };
    const sys = 'You are a Cambridge-exam IELTS passage writer. Write a ' + band + ' ' + (kind === 'listening' ? 'monologue transcript' : 'academic reading passage') + ' about the topic given. The passage must be cohesive, academic, roughly 250-300 words, with exactly N exam-style multiple-choice questions testing detail, vocabulary meaning, and global understanding. Answer keys and one-line explanations must quote or paraphrase the passage accurately.';
    const usr = 'Topic: ' + topic + '\nQuestions: ' + n + '\nOutput ONLY strict JSON:\n{"title":"...","text":"...","questions":[{"q":"...","opts":["A: ...","B: ...","C: ...","D: ..."],"a":"A","exp":"..."}...]}';
    const raw = await gemini(sys, usr, true);
    const data = raw ? parseJson(raw) : null;
    if (!data || !String(data.text || '').trim() || !Array.isArray(data.questions) || !data.questions.length) {
      return { demo: true, kind, topic, band, ...fallbackPassage(topic, kind, band, n) };
    }
    const questions = data.questions.slice(0, n).map((qq) => {
      const optsList = Array.isArray(qq.opts) ? qq.opts.map((o) => String(o).replace(/^[A-D]:\s*/i, '').trim()) : [];
      return { q: String(qq.q || '').trim(), opts: optsList, a: String(qq.a || 'A').toUpperCase(), exp: String(qq.exp || '').trim() };
    }).filter((qq) => qq.q && qq.opts.length >= 2);
    return { demo: false, kind, topic, band, title: String(data.title || ('AI: ' + topic)).trim(), text: String(data.text).trim(), questions };
  }

  async function evaluateWriting(opts) {
    opts = opts || {};
    const text = String(opts.text || '').trim();
    const kind = opts.kind === 'speaking' ? 'speaking' : 'writing';
    if (text.length < 40) {
      return { error: true, message: 'Please provide at least 40 words of text to evaluate.' };
    }
    const c = cfg();
    if (!c.key && !useProxy()) return { demo: true, kind, ...fallbackEvaluate(text, kind) };
    const sys = 'You are a strict, experienced IELTS examiner and a native-professional English mentor. Evaluate the learner text. Give a precise half-band score (e.g. 6.5), a 2-3 sentence summary, 3 strengths, 3 weaknesses, a list of 3-6 concrete vocabulary upgrades (basic word/phrase → a precise Band 8+ alternative, each with a one-line reason), a list of concrete grammatical errors with exact corrections and explanations, sub-scores for each official criterion out of 9, a full Band 9 rewrite of the entire text that preserves the learner\'s ideas, and 4 coaching steps that teach the student HOW to think and speak like a native professional (mindset, structure, phrasing habits, self-review routine).';
    const usr = 'Register: ' + (kind === 'speaking' ? 'IELTS Speaking (Part 2 transcript)' : 'IELTS Writing Task 2 essay') + (opts.prompt ? '\nExam task prompt: "' + opts.prompt + '"' : '') + '\n\n"Here is the text:\n' + text.slice(0, 6000) + '"\n\nOutput ONLY strict JSON:\n{"band":6.5,"summary":"...","strengths":["..."],"weaknesses":["..."],"vocab":[{"original":"basic word/phrase","upgraded":"precise Band 8+ alternative","why":"why it lifts the band"}],"errors":[{"type":"grammar","original":"...","correction":"...","explanation":"..."}],"criteria":{"Task Response":6.5,"Coherence and Cohesion":6.5,"Lexical Resource":6.5,"Grammatical Range and Accuracy":6.5},"rewrite":"...","coaching":["native-professional thinking/structuring/speaking step 1","step 2","step 3","step 4"]}';
    const raw = await gemini(sys, usr, true);
    const data = raw ? parseJson(raw) : null;
    if (!data || typeof data.band === 'undefined') return { demo: true, kind, ...fallbackEvaluate(text, kind) };
    return {
      demo: false,
      kind,
      band: Math.min(9, Math.max(1, Math.round((parseFloat(data.band) || 5) * 2) / 2)),
      summary: String(data.summary || '').trim(),
      strengths: Array.isArray(data.strengths) ? data.strengths.map(String) : [],
      weaknesses: Array.isArray(data.weaknesses) ? data.weaknesses.map(String) : [],
      errors: Array.isArray(data.errors) ? data.errors.slice(0, 8).map((e) => ({ type: String(e.type || 'grammar'), original: String(e.original || ''), correction: String(e.correction || ''), explanation: String(e.explanation || '') })) : [],
      criteria: data.criteria || {},
      rewrite: String(data.rewrite || '').trim(),
      coaching: Array.isArray(data.coaching) ? data.coaching.map(String).map((s) => s.trim()).filter(Boolean).slice(0, 6) : [],
      vocab: Array.isArray(data.vocab) ? data.vocab.slice(0, 6).map((v) => ({ original: String(v.original || ''), upgraded: String(v.upgraded || ''), why: String(v.why || '') })) : []
    };
  }

  /* ============================================================
     PRESENTATION — Word bank modal
     ============================================================ */
  function openWordBankModal() {
    openModal(mentorName() + "'s Word Bank", `
      ${demoBanner()}
      ${field('aiwb-topic', 'Topic', 'e.g. Climate change, Urbanisation, Artificial intelligence…', 'Climate change')}
      <div class="grid grid-cols-2 gap-3">
        ${field('aiwb-count', 'Words', '', '6', { type: 'number' })}
        ${field('aiwb-band', 'Band goal', '', 'Band 8-9', { select: true, options: ['Band 8-9', 'Band 7', 'Band 7-8', 'Band 6-7'] })}
      </div>
      <div class="flex items-center gap-3 mt-4">
        ${gradientBtn('Generate word bank', 'window.IELTS_AI.wordBankLive()')}
        <button class="px-5 py-2.5 rounded-lg text-sm font-bold text-[#f5f0e6] border border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.1)] transition" onclick="window.IELTS_AI.openSettings()">${esc(mentorName())}’s settings</button>
      </div>`);
    const body = $('#ielts-ai-modal-body');
    const cnt = body.querySelector('#aiwb-count');
    if (cnt) cnt.value = '6';
  }

  async function wordBankLive() {
    const body = $('#ielts-ai-modal-body');
    if (!body) return;
    const topic = (body.querySelector('#aiwb-topic') || {}).value || 'Climate change';
    const count = parseInt((body.querySelector('#aiwb-count') || {}).value, 10) || 6;
    const band = (body.querySelector('#aiwb-band') || {}).value || 'Band 8-9';
    const title = $('#ielts-ai-modal-title');
    if (title) title.textContent = 'Generating word bank…';
    body.innerHTML = loader('Building your ' + count + '-word ' + band + ' bank for “' + topic + '”…');
    const res = await generateWordBank({ topic, count, band });
    if (title) title.textContent = res.demo ? mentorName() + "'s Word Bank (built-in)" : mentorName() + "'s Word Bank";
    const saved = [];
    body.innerHTML = `
      <div class="mb-4 flex items-center justify-between flex-wrap gap-3">
        <p class="text-sm text-[#f5f0e6]/70">Topic: <b class="text-[#d4af37]">${esc(topic)}</b> · ${res.words.length} words · ${esc(band)} ${res.demo ? '· <span class="text-[#e879f9]">demo</span>' : ''}</p>
        ${gradientBtn('＋ Add all ' + res.words.length + ' to vocabulary', 'window.IELTS_AI.wordBankAddAll()')}
      </div>
      ${res.demo ? demoBanner() : ''}
      <div id="aiwb-list" class="grid gap-3">
        ${res.words.map((w, i) => `<div class="bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.15)] rounded-xl p-4">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <p class="font-extrabold text-[#f5f0e6]">${esc(w.word)}</p>
                <span class="text-[10px] text-[#f5f0e6]/40 uppercase">${esc(w.pos)}</span>
                <span class="text-[10px] font-bold text-[#d4af37] border border-[rgba(212,175,55,0.3)] px-1.5 py-0.5 rounded">${esc(w.band)}</span>
              </div>
              <p class="text-sm text-[#f5f0e6]/75 mt-1">${esc(w.definition)}</p>
              <p class="text-xs text-[#e879f9] mt-1"><b>Collocation:</b> ${esc(w.collocation)}</p>
              <p class="text-xs text-[#f5f0e6]/55 italic mt-1">“${esc(w.example)}”</p>
              ${w.tip ? `<p class="text-xs text-[#f5f0e6]/70 mt-1.5 bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.3)] rounded-md px-2 py-1.5"><b class="text-[#e879f9]">${esc(mentorName())}:</b> ${esc(w.tip)}</p>` : ''}
            </div>
            <button id="aiwb-add-${i}" class="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold border border-[rgba(212,175,55,0.4)] text-[#d4af37] hover:bg-[rgba(212,175,55,0.12)] transition" onclick="window.IELTS_AI.wordBankAddOne(${i})">＋ Save</button>
          </div>
        </div>`).join('')}
      </div>
      <div class="flex items-center justify-between gap-3 mt-5 flex-wrap">
        <p id="aiwb-status" class="text-xs text-[#f5f0e6]/50">Words are saved to your personal vocabulary and synced to your database.</p>
        <div class="flex gap-2">
          <button class="px-4 py-2 rounded-lg text-sm font-bold text-[#f5f0e6] border border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.1)] transition" onclick="window.IELTS_AI.openWordBankModal()">↺ New bank</button>
          ${gradientBtn('✓ Save library item', 'window.IELTS_AI.wordBankSaveLib()')}
        </div>
      </div>`;
    window.__AIWB = { words: res.words, topic, band, saved: [] };
  }

  function wordBankAddOne(i) {
    const data = window.__AIWB;
    if (!data || !data.words[i]) return;
    const w = data.words[i];
    let added = false;
    try {
      if (window.IELTS_VOCAB && window.IELTS_VOCAB.hasWord && window.IELTS_VOCAB.hasWord(w.word)) {
        window.toast && window.toast('“' + w.word + '” already in vocabulary');
      } else if (window.IELTS_VOCAB && window.IELTS_VOCAB.addWord) {
        added = window.IELTS_VOCAB.addWord({ word: w.word, meaning: w.definition, example: w.example, pos: w.pos, source: 'AI · ' + data.topic });
      }
    } catch (e) {}
    if (added) {
      if (data.saved.indexOf(i) < 0) data.saved.push(i);
      const btn = $('#aiwb-add-' + i);
      if (btn) { btn.textContent = '✓ Saved'; btn.classList.add('opacity-60'); btn.classList.add('pointer-events-none'); }
      const status = $('#aiwb-status');
      if (status) status.textContent = data.saved.length + ' / ' + data.words.length + ' words saved to your vocabulary.';
    }
  }

  function wordBankAddAll() {
    const data = window.__AIWB;
    if (!data) return;
    for (let i = 0; i < data.words.length; i++) if (data.saved.indexOf(i) < 0) wordBankAddOne(i);
    const list = $('#aiwb-list');
    if (list) list.querySelectorAll('[id^="aiwb-add-"]').forEach((b) => { b.textContent = '✓ Saved'; b.classList.add('opacity-60'); b.classList.add('pointer-events-none'); });
  }

  function wordBankSaveLib() {
    const d = window.__AIWB;
    if (!d) return;
    const id = addToLibrary('wordbank', 'AI Word Bank · ' + d.topic + ' (' + d.words.length + ' words)', { topic: d.topic, band: d.band, words: d.words });
    track('vocabulary', 'Generated AI word bank for “' + d.topic + '”', d.words.length);
    diag('vocabulary', 'AI word bank · ' + d.topic, Math.min(d.saved.length, d.words.length), d.words.length, { band: parseFloat(d.band.replace(/[^0-9.]/g, '') || '0') || null });
    if (window.IELTS_AUTH && window.IELTS_AUTH.completeClaim('ai-wordbank-' + id)) {
      window.IELTS_AUTH.addXp(10);
      window.IELTS_AUTH.addActivity('vocabulary', 'Generated AI word bank “' + d.topic + '”', 10);
    }
    window.toast && window.toast('Word bank saved to your library ✔');
  }

  /* ============================================================
     PRESENTATION — Passage builder modal
     ============================================================ */
  function openPassageModal(topic, kind) {
    openModal(mentorName() + "'s Reading Studio", `
      ${demoBanner()}
      <div class="grid grid-cols-2 gap-3">
        ${field('aipb-type', 'Type', '', kind === 'listening' ? 'Listening' : 'Reading', { select: true, options: ['Reading', 'Listening'] })}
        ${field('aipb-band', 'Difficulty', '', 'Band 7', { select: true, options: ['Band 7', 'Band 6', 'Band 8', 'Band 9'] })}
      </div>
      ${field('aipb-topic', 'Topic', 'e.g. renewable energy, remote work, space exploration…', topic || 'renewable energy')}
      ${field('aipb-questions', 'Questions (3-6)', '', '5', { type: 'number' })}
      <div class="flex items-center gap-3 mt-4">
        ${gradientBtn('Build my passage', 'window.IELTS_AI.passageLive()')}
        <button class="px-5 py-2.5 rounded-lg text-sm font-bold text-[#f5f0e6] border border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.1)] transition" onclick="window.IELTS_AI.openSettings()">${esc(mentorName())}’s settings</button>
      </div>`);
    const body = $('#ielts-ai-modal-body');
    const el = body.querySelector('#aipb-questions');
    if (el) el.value = '5';
  }

  async function passageLive() {
    const body = $('#ielts-ai-modal-body');
    if (!body) return;
    const topic = (body.querySelector('#aipb-topic') || {}).value || 'renewable energy';
    const kind = ((body.querySelector('#aipb-type') || {}).value || 'Reading') === 'Listening' ? 'listening' : 'reading';
    const band = (body.querySelector('#aipb-band') || {}).value || 'Band 7';
    const questions = parseInt((body.querySelector('#aipb-questions') || {}).value, 10) || 5;
    const title = $('#ielts-ai-modal-title');
    if (title) title.textContent = 'Building passage…';
    body.innerHTML = loader('Writing a Cambridge-style ' + kind + ' passage about “' + topic + '”…');
    const res = await generatePassage({ topic, kind, band, questions });
    if (!res.id) res.id = 'ai-live-' + Date.now().toString(36);
    if (title) title.textContent = res.demo ? mentorName() + "'s Reading Studio (built-in)" : mentorName() + "'s Reading Studio";
    window.__AIP = res;
    body.innerHTML = `
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="font-bold text-[#f5f0e6]">${esc(res.title)}</p>
          <p class="text-xs text-[#f5f0e6]/60">${res.kind === 'listening' ? ic('listen', 'w-3.5 h-3.5 inline-block mr-1 -mt-0.5') + 'Listening transcript' : ic('read', 'w-3.5 h-3.5 inline-block mr-1 -mt-0.5') + 'Reading passage'} · ${esc(res.band)} · ${res.questions.length} questions ${res.demo ? '· <span class="text-[#e879f9]">demo</span>' : ''}</p>
        </div>
        ${gradientBtn('✓ Save to library', 'window.IELTS_AI.passageSaveLib()')}
      </div>
      ${res.demo ? demoBanner() : ''}
      <div id="ai-passage-practice"></div>`;
    renderPassagePractice(res, 'ai-passage-practice', false);
  }

  function passageSaveLib() {
    const p = window.__AIP;
    if (!p) return;
    const id = addToLibrary('passage', (p.kind === 'listening' ? 'Listening transcript · ' : 'Reading passage · ') + p.title + ' · ' + p.band, { kind: p.kind, title: p.title, band: p.band, text: p.text, questions: p.questions });
    if (window.IELTS_AUTH && window.IELTS_AUTH.completeClaim('ai-passage-' + id)) {
      window.IELTS_AUTH.addXp(15);
      window.IELTS_AUTH.addActivity('reading', 'Generated AI ' + p.kind + ' passage “' + p.title + '”', 15);
    }
    window.toast && window.toast('Passage saved to library ✔');
  }

  /* ---------- inline passage practice ---------- */
  function renderPassagePractice(p, containerId, embedded) {
    const host = $(containerId ? '#' + containerId : '#ai-passage-practice');
    if (!host) return;
    const qid = 'aiq-' + p.id + '-';
    host.innerHTML = `
      <div class="bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.15)] rounded-xl p-4 mb-4 max-h-64 overflow-y-auto">
        <p class="text-xs font-bold text-[#d4af37] uppercase tracking-widest mb-2">${p.kind === 'listening' ? ic('listen', 'w-3.5 h-3.5 inline-block mr-1 -mt-0.5') + 'Audio transcript' : ic('read', 'w-3.5 h-3.5 inline-block mr-1 -mt-0.5') + 'Passage'}</p>
        <p class="text-sm text-[#f5f0e6]/80 leading-relaxed whitespace-pre-line">${esc(p.text)}</p>
      </div>
      <div class="grid gap-4 mb-4">
        ${p.questions.map((qq, i) => `
          <div class="bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.15)] rounded-xl p-4">
            <p class="text-sm font-semibold text-[#f5f0e6] mb-3">${i + 1}. ${esc(qq.q)}</p>
            <div class="grid gap-2">
              ${qq.opts.map((o, j) => {
                const L = String.fromCharCode(65 + j);
                return `<label class="flex items-center gap-3 bg-[rgba(15,23,42,0.6)] border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.4)] rounded-lg px-3 py-2 cursor-pointer transition">
                  <input type="radio" name="${qid}${i}" value="${L}" class="accent-[#d4af37]">
                  <span class="text-xs w-4 text-[#f5f0e6]/40 font-bold">${L}</span>
                  <span class="text-sm text-[#f5f0e6]">${esc(o)}</span>
                </label>`;
              }).join('')}
            </div>
            <div id="${qid}fb-${i}" class="text-xs text-[#f5f0e6]/70 pt-2"></div>
          </div>`).join('')}
      </div>
      <div class="flex items-center justify-between flex-wrap gap-3">
        <button class="btn-primary text-sm inline-flex items-center gap-1.5" onclick="window.IELTS_AI.practiceCheck('${p.id}')">${ic('marker', 'w-4 h-4')}Check answers</button>
        <p id="${qid}score" class="text-sm font-bold text-[#d4af37]"></p>
      </div>`;
  }

  function practiceCheck(id) {
    const lib = listByKind('passage');
    let p = null;
    for (let i = 0; i < lib.length; i++) if (lib[i].id === id) { p = lib[i].payload; break; }
    if (p && window.__AIP && window.__AIP.title === p.title) p = window.__AIP;
    let src = p || (window.__AIP && id === (window.__AIP.id || 'ai-practice') ? window.__AIP : null);
    if (!src) { window.toast && window.toast('Practice not found'); return; }
    const qid = 'aiq-' + id + '-';
    let correct = 0;
    for (let i = 0; i < src.questions.length; i++) {
      const sel = document.querySelector('input[name="' + qid + i + '"]:checked');
      const fb = $(qid + 'fb-' + i);
      if (!fb) continue;
      const qq = src.questions[i];
      const ans = sel ? sel.value : null;
      if (ans === qq.a) { correct++; fb.innerHTML = '<span class="text-emerald-400 font-bold">✓ Correct</span> <span class="text-[#f5f0e6]/60">— ' + esc(qq.exp) + '</span>'; }
      else fb.innerHTML = '<span class="text-rose-400 font-bold">✗ Your answer: ' + esc(ans || 'no answer') + ' · Correct: ' + esc(qq.a) + '</span> <span class="text-[#f5f0e6]/60">— ' + esc(qq.exp) + '</span>';
    }
    const pct = Math.round((correct / src.questions.length) * 100);
    const scoreEl = $(qid + 'score');
    const band = (src.kind === 'listening' ? (window.IELTS_BAND_SCORE && window.IELTS_BAND_SCORE.listening) : (window.IELTS_BAND_SCORE && window.IELTS_BAND_SCORE.academicReading));
    const bandTxt = band ? band(correct) : null;
    if (scoreEl) scoreEl.innerHTML = correct + '/' + src.questions.length + ' · ' + pct + '%' + (bandTxt ? ' · Band ' + bandTxt : '');
    const c = store();
    c.attempts.unshift({ at: Date.now(), title: src.title, kind: src.kind, correct, total: src.questions.length });
    if (c.attempts.length > 40) c.attempts = c.attempts.slice(0, 40);
    saveStore(c);
    track(src.kind === 'listening' ? 'listening' : 'reading', 'Completed AI passage “' + src.title + '” (' + pct + '%)', src.questions.length);
    try {
      if (window.IELTS_AUTH && window.IELTS_AUTH.completeClaim('ai-practice-' + id + '-done')) window.IELTS_AUTH.addXp(Math.max(2, Math.round(correct * 2)));
    } catch (e) {}
    diag(src.kind === 'listening' ? 'listening' : 'reading', src.title, correct, src.questions.length, { band: bandTxt ? parseFloat(bandTxt) : null });
  }

  /* ============================================================
     PRESENTATION — Evaluator modal
     ============================================================ */
  function openEvaluationModal(text, kind) {
    openModal(mentorName() + "'s Writing & Speech Evaluator", `
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-full overflow-hidden bg-[#14120f] border border-[rgba(212,175,55,0.5)] shrink-0">${MENTOR_AVATAR}</div>
        <div>
          <p class="font-extrabold text-[#f5f0e6]">${esc(mentorLabel())} <span class="text-[10px] font-bold uppercase tracking-widest bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] text-[#d4af37] rounded-full px-2 py-0.5 align-middle">Master Control</span></p>
          <p class="text-[11px] text-[#f5f0e6]/55">Grades against the official band descriptors · grammar fixes · vocabulary upgrades · native coaching</p>
        </div>
      </div>
      ${demoBanner()}
      ${field('aieval-kind', 'Register', '', kind === 'speaking' ? 'Speaking transcript' : 'Writing (Task 2)', { select: true, options: ['Writing (Task 2)', 'Writing (Task 1)', 'Speaking transcript'] })}
      <label class="block mb-3">
        <span class="text-xs font-bold text-[#f5f0e6]/70 uppercase tracking-wide mb-1 block">Your text</span>
        <textarea id="aieval-text" rows="8" class="w-full bg-[rgba(20,18,15,0.9)] border border-[rgba(212,175,55,0.3)] rounded-lg px-4 py-3 text-sm text-[#f5f0e6] focus:border-[rgba(212,175,55,0.6)] outline-none" placeholder="Paste your essay or speaking answer here…">${esc(text || '')}</textarea>
      </label>
      <div class="flex items-center gap-3 mt-4">
        ${gradientBtn('Evaluate my work', 'window.IELTS_AI.evalLive()')}
        <button class="px-5 py-2.5 rounded-lg text-sm font-bold text-[#f5f0e6] border border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.1)] transition" onclick="window.IELTS_AI.openSettings()">${esc(mentorName())}’s settings</button>
      </div>`);
  }

  async function evalLive() {
    const body = $('#ielts-ai-modal-body');
    if (!body) return;
    const text = (body.querySelector('#aieval-text') || {}).value || '';
    const kindSel = (body.querySelector('#aieval-kind') || {}).value || '';
    const kind = (kindSel.indexOf('Speaking') >= 0) ? 'speaking' : 'writing';
    const title = $('#ielts-ai-modal-title');
    if (title) title.textContent = 'Evaluating…';
    body.innerHTML = loader('Applying official IELTS band descriptors to your ' + kind + '…');
    const res = await evaluateWriting({ text, kind });
    renderEvaluation(res);
  }

  function renderEvaluation(res) {
    if (res.error) { openModal('Evaluator', '<p class="text-sm text-rose-300">' + esc(res.message) + '</p>'); return; }
    const title = $('#ielts-ai-modal-title');
    if (title) title.textContent = (res.demo ? 'Evaluation (built-in)' : 'Evaluation') + ' · ' + mentorName();
    let body = '';
    body += '<div class="bg-gradient-to-r from-[rgba(212,175,55,0.12)] to-transparent border border-[rgba(212,175,55,0.25)] rounded-xl p-5 mb-4">';
    body += '<div class="flex flex-wrap items-center gap-5">';
    body += '<div class="text-center"><p class="text-5xl font-extrabold text-[#d4af37]">' + esc(String(res.band)) + '</p><p class="text-[10px] uppercase tracking-widest text-[#f5f0e6]/50 mt-1">Estimated band</p></div>';
    body += '<div class="flex-1"><p class="text-sm text-[#f5f0e6]/80 leading-relaxed">' + esc(res.summary || '') + '</p></div>';
    body += '</div>';
    if (res.criteria && Object.keys(res.criteria).length) {
      body += '<div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">' + Object.keys(res.criteria).map((k) => '<div class="bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.15)] rounded-lg px-3 py-2 text-center"><p class="text-sm font-bold text-[#f5f0e6]">' + esc(String(res.criteria[k])) + '</p><p class="text-[10px] text-[#f5f0e6]/50 mt-0.5">' + esc(k) + '</p></div>').join('') + '</div>';
    }
    body += '</div>';
    body += res.demo ? '<div class="mb-4">' + demoBanner() + '</div>' : '';
    if (res.strengths && res.strengths.length) {
      body += '<div class="mb-4"><p class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Strengths</p><ul class="space-y-1">' + res.strengths.map((s) => '<li class="text-sm text-[#f5f0e6]/75 flex gap-2"><span>•</span><span>' + esc(s) + '</span></li>').join('') + '</ul></div>';
    }
    if (res.weaknesses && res.weaknesses.length) {
      body += '<div class="mb-4"><p class="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">To improve</p><ul class="space-y-1">' + res.weaknesses.map((s) => '<li class="text-sm text-[#f5f0e6]/75 flex gap-2"><span>•</span><span>' + esc(s) + '</span></li>').join('') + '</ul></div>';
    }
    if (res.coaching && res.coaching.length) {
      body += '<div class="mb-4 bg-gradient-to-br from-[rgba(212,175,55,0.12)] to-[rgba(212,175,55,0.04)] border border-[rgba(212,175,55,0.3)] rounded-xl p-4"><p class="text-xs font-bold text-[#d4af37] uppercase tracking-widest mb-2">' + esc(mentorName()) + '’s coaching · think &amp; speak like a native professional</p><ol class="space-y-2">' + res.coaching.map((s, i) => '<li class="text-sm text-[#f5f0e6]/85 flex gap-3"><span class="shrink-0 w-5 h-5 rounded-full bg-[#d4af37] text-[#14120f] text-[10px] font-bold flex items-center justify-center mt-0.5">' + (i + 1) + '</span><span>' + esc(s) + '</span></li>').join('') + '</ol></div>';
    }
    if (res.vocab && res.vocab.length) {
      body += '<div class="mb-4"><p class="text-xs font-bold text-sky-300 uppercase tracking-widest mb-2">Vocabulary upgrades · lexical precision</p><div class="space-y-2">' + res.vocab.map((v) => '<div class="bg-[rgba(20,18,15,0.85)] border border-[rgba(56,189,248,0.25)] rounded-lg p-3"><p class="text-sm"><span class="text-[#f5f0e6]/60 line-through">' + esc(v.original || '…') + '</span> → <span class="text-sky-300 font-semibold">' + esc(v.upgraded || '…') + '</span></p><p class="text-xs text-[#f5f0e6]/50 mt-1">' + esc(v.why || '') + '</p></div>').join('') + '</div></div>';
    }
    if (res.errors && res.errors.length) {
      body += '<div class="mb-4"><p class="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">Grammar &amp; accuracy fixes</p><div class="space-y-2">' + res.errors.map((e) => '<div class="bg-[rgba(20,18,15,0.85)] border border-[rgba(248,113,113,0.2)] rounded-lg p-3"><p class="text-xs text-[#f5f0e6]/40 uppercase tracking-wide">' + esc(e.type) + '</p><p class="text-sm text-[#f5f0e6]/85 mt-1">✗ <span class="text-rose-300 line-through">' + esc(e.original || '…') + '</span> → <span class="text-emerald-300 font-semibold">' + esc(e.correction || '…') + '</span></p><p class="text-xs text-[#f5f0e6]/50 mt-1">' + esc(e.explanation || '') + '</p></div>').join('') + '</div></div>';
    }
    if (res.rewrite) {
      body += '<div class="mb-4 bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.25)] rounded-xl p-4"><div class="flex items-center justify-between gap-3 mb-2"><p class="text-xs font-bold text-[#d4af37] uppercase tracking-widest">Band 9 rewrite</p><button class="text-xs font-bold text-[#f5f0e6] border border-[rgba(212,175,55,0.3)] px-3 py-1.5 rounded-lg hover:bg-[rgba(212,175,55,0.1)] transition" onclick="window.IELTS_AI.copyRewrite()">' + ic('write', 'w-3.5 h-3.5 inline-block mr-1 -mt-0.5') + 'Copy rewrite</button></div><p class="text-sm text-[#f5f0e6]/85 leading-relaxed whitespace-pre-line">' + esc(res.rewrite) + '</p></div>';
    } else if (res.demoNote) {
      body += '<p class="text-xs text-[#f5f0e6]/50 italic mb-4">' + esc(res.demoNote) + '</p>';
    }
    body += '<div class="flex items-center justify-between gap-3 flex-wrap pt-2"><p class="text-xs text-[#f5f0e6]/50">Evaluation is saved to your AI library and diagnostics.</p><button class="btn-primary text-sm inline-flex items-center gap-1.5" onclick="window.IELTS_AI.evalSaveLib()">Save evaluation</button></div>';
    const titleEl = $('#ielts-ai-modal-title');
    openModal(title.textContent, body);
    window.__AIEVAL = res;
  }

  function evalSaveLib() {
    const r = window.__AIEVAL;
    if (!r) return;
    const id = addToLibrary('evaluation', 'AI Evaluation · Band ' + r.band, { kind: r.kind || 'writing', band: r.band, summary: r.summary, strengths: r.strengths, weaknesses: r.weaknesses, errors: r.errors, criteria: r.criteria, rewrite: r.rewrite, coaching: r.coaching, vocab: r.vocab });
    if (window.IELTS_AUTH && window.IELTS_AUTH.completeClaim('ai-eval-' + id)) {
      window.IELTS_AUTH.addXp(10);
      window.IELTS_AUTH.addActivity('writing', 'AI evaluation · Band ' + r.band, 10);
    }
    const bandNum = parseFloat(r.band) || 5;
    diag(r.kind === 'speaking' ? 'speaking' : 'writing', 'AI evaluation', Math.min(bandNum, 9), 9, { band: bandNum });
    window.toast && window.toast('Evaluation saved ✔');
  }

  function copyRewrite() {
    const r = window.__AIEVAL;
    if (!r || !r.rewrite) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(r.rewrite).then(() => window.toast && window.toast('Band 9 rewrite copied'));
        return;
      }
    } catch (e) {}
    const ta = document.createElement('textarea');
    ta.value = r.rewrite;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); window.toast && window.toast('Band 9 rewrite copied'); } catch (e2) {}
    document.body.removeChild(ta);
  }

  /* ============================================================
     PRESENTATION — Writing Lab (Teacher Rami)
     ============================================================ */
  const WRITING_PROMPTS = [
    { level: 'A2', type: 'Task 2', prompt: 'Some people think school children should be given more free time to play and relax. Do you agree? Give reasons and examples.', hint: 'Give your opinion in the first sentence, then two short paragraphs of support.' },
    { level: 'A2', type: 'Task 2', prompt: 'Many students prefer to study at home rather than in a classroom. What do you think about this?', hint: 'Answer directly — do not open with "Nowadays…".' },
    { level: 'A2', type: 'Task 1', prompt: 'The chart shows how a family from your city spends its monthly money. Write a short report of the main features.', hint: 'Start with an overview sentence: "Overall, most of the budget goes to food and housing."' },
    { level: 'B1', type: 'Task 2', prompt: 'Advertising influences what people buy. To what extent do you agree or disagree?', hint: 'Take one clear position and test a counter-argument in the middle paragraph.' },
    { level: 'B1', type: 'Task 2', prompt: 'Many people move to big cities for work. Discuss the advantages and disadvantages of living in a large city.', hint: 'Discuss both sides fairly, then give your own judgment in the conclusion.' },
    { level: 'B1', type: 'Task 1', prompt: 'The table shows the number of tourists visiting four countries between 2015 and 2020. Write a short report.', hint: 'Report numbers precisely: "nearly doubled", "a slight fall of 12%" — never give your opinion.' },
    { level: 'B2', type: 'Task 2', prompt: 'Some people believe that university education should be free for everyone, while others think students should pay. Discuss both views and give your own opinion.', hint: 'Cost-benefit logic: contrast public good with funding reality, then give your stance.' },
    { level: 'B2', type: 'Task 2', prompt: 'Technology makes teenagers less able to communicate face to face. To what extent do you agree?', hint: 'Avoid extremes — a balanced extent ("largely but not entirely") reads more Band 7.' },
    { level: 'B2', type: 'Task 1', prompt: 'The graph shows the percentage of people working from home in three countries over ten years. Write a report.', hint: 'Compare trends ("in contrast, Denmark climbed steadily") before quoting data.' },
    { level: 'C1', type: 'Task 2', prompt: 'Economic growth is often prioritised over environmental protection. Discuss the implications of this priority and argue for a more sustainable balance.', hint: 'Abstract nouns carry the argument: sustainability, trade-offs, long-term viability.' },
    { level: 'C1', type: 'Task 2', prompt: 'In many societies the gap between rich and poor is widening. What are the causes, and what measures could governments take?', hint: 'Separate causes from solutions strictly — two clean movements, not mixed paragraphs.' },
    { level: 'C1', type: 'Task 1', prompt: 'The charts compare expenditure on healthcare in four European countries. Write a detailed report highlighting the most significant differences.', hint: 'Managerial tone: "the most striking difference is…" — then select, not list everything.' }
  ];

  function learnerLevel() {
    try {
      const pc = window.IELTS_AUTH && window.IELTS_AUTH.getScoped ? window.IELTS_AUTH.getScoped('placement', null) : null;
      if (pc && pc.lastLevel && pc.lastLevel.name) return pc.lastLevel.name;
    } catch (e) { /* ignore */ }
    return 'B1';
  }

  function promptPool(level, type) {
    return WRITING_PROMPTS.filter((p) => p.level === level && p.type === type);
  }

  function writingLabHtml(level, type) {
    const pool = promptPool(level, type);
    const options = pool.length
      ? pool.map((p) => '<option value="' + esc(p.prompt + '||' + p.hint) + '">' + esc(p.prompt.length > 70 ? p.prompt.slice(0, 70) + '…' : p.prompt) + '</option>').join('')
      : '<option value="free">No prompt for this level yet — use a free topic</option>';
    const box = pool.length
      ? '<p class="text-sm text-[#f5f0e6]/75 bg-[rgba(20,18,15,0.7)] border border-[rgba(212,175,55,0.2)] rounded-lg px-4 py-3 italic">' + esc(pool[0].prompt) + '</p>' + (pool[0].hint ? '<p class="text-[11px] text-[#e879f9]/70 mt-1.5">' + esc(pool[0].hint) + ' — stick to the word goal: 250+ words for Task 2, 150+ for Task 1.</p>' : '')
      : '<p class="text-xs text-[#f5f0e6]/50 italic">Choose a free topic below and type your own question in the box that appears.</p>';
    return `
      <div class="flex items-start gap-3 bg-gradient-to-r from-[rgba(212,175,55,0.12)] to-transparent border border-[rgba(212,175,55,0.25)] rounded-xl p-4 mb-4">
        <div class="w-12 h-12 rounded-full overflow-hidden bg-[#14120f] border border-[rgba(212,175,55,0.5)] shrink-0">${MENTOR_AVATAR}</div>
        <p class="text-sm text-[#f5f0e6]/85 leading-relaxed">${esc(mentorGreeting())}</p>
      </div>
      <div class="grid grid-cols-2 gap-3">
        ${field('wl-level', 'Your level', '', level, { select: true, options: ['A2', 'B1', 'B2', 'C1'] })}
        ${field('wl-type', 'Task type', '', type, { select: true, options: ['Task 2', 'Task 1'] })}
      </div>
      <label class="block mb-3">
        <span class="text-xs font-bold text-[#f5f0e6]/70 uppercase tracking-wide mb-1 block">Choose a prompt</span>
        <select id="wl-prompt" class="w-full bg-[rgba(20,18,15,0.9)] border border-[rgba(212,175,55,0.3)] rounded-lg px-4 py-2.5 text-sm text-[#f5f0e6] focus:border-[rgba(212,175,55,0.6)] outline-none">${options}<option value="free">Free topic (write your own question in the box below)</option></select>
      </label>
      <div id="wl-prompt-box" class="mb-3">${box}</div>
      <label class="block mb-3">
        <span class="text-xs font-bold text-[#f5f0e6]/70 uppercase tracking-wide mb-1 block">Your essay</span>
        <textarea id="wl-text" rows="9" class="w-full bg-[rgba(20,18,15,0.9)] border border-[rgba(212,175,55,0.3)] rounded-lg px-4 py-3 text-sm text-[#f5f0e6] focus:border-[rgba(212,175,55,0.6)] outline-none" placeholder="Write your answer here — ${esc(mentorName())} will grade it against the official band descriptors, fix your grammar, upgrade your vocabulary and coach your thinking."></textarea>
      </label>
      <div class="flex items-center gap-3 mt-4">
        ${gradientBtn('Evaluate with ' + esc(mentorName()), 'window.IELTS_AI.writingLabLive()')}
        <button class="px-5 py-2.5 rounded-lg text-sm font-bold text-[#f5f0e6] border border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.1)] transition" onclick="window.IELTS_AI.openSettings()">${ic('settings', 'w-4 h-4 inline-block mr-1 -mt-0.5')}AI Settings</button>
      </div>`;
  }

  function openWritingLab(opts) {
    opts = opts || {};
    const lvl = (opts.level && ['A2', 'B1', 'B2', 'C1'].indexOf(opts.level) >= 0) ? opts.level : learnerLevel();
    const type = opts.type === 'Task 1' ? 'Task 1' : 'Task 2';
    openModal(esc(mentorShort()) + ' Writing Lab', writingLabHtml(lvl, type));
    bindWritingLab();
  }

  function bindWritingLab() {
    const body = $('#ielts-ai-modal-body');
    if (!body) return;
    const syncPrompt = () => {
      const sel = body.querySelector('#wl-prompt');
      const box = body.querySelector('#wl-prompt-box');
      if (!sel || !box) return;
      const val = sel.value || '';
      if (val === 'free') {
        box.innerHTML = '<label class="block"><span class="text-xs font-bold text-[#f5f0e6]/70 uppercase tracking-wide mb-1 block">Your own task</span><input id="wl-prompt-text" type="text" placeholder="e.g. Do the benefits of social media outweigh the drawbacks?" class="w-full bg-[rgba(20,18,15,0.9)] border border-[rgba(212,175,55,0.3)] rounded-lg px-4 py-2.5 text-sm text-[#f5f0e6] focus:border-[rgba(212,175,55,0.6)] outline-none" /></label>';
        return;
      }
      const parts = val.split('||');
      box.innerHTML = '<p class="text-sm text-[#f5f0e6]/75 bg-[rgba(20,18,15,0.7)] border border-[rgba(212,175,55,0.2)] rounded-lg px-4 py-3 italic">' + esc(parts[0] || '') + '</p>' + (parts[1] ? '<p class="text-[11px] text-[#e879f9]/70 mt-1.5">' + esc(parts[1]) + ' — stick to the word goal: 250+ words for Task 2, 150+ for Task 1.</p>' : '');
    };
    const reOpt = () => {
      const level = (body.querySelector('#wl-level') || {}).value || 'B1';
      const type = (body.querySelector('#wl-type') || {}).value || 'Task 2';
      const sel = body.querySelector('#wl-prompt');
      if (!sel) return;
      const prev = sel.value;
      const pool = promptPool(level, type);
      sel.innerHTML = (pool.length ? pool.map((p) => '<option value="' + esc(p.prompt + '||' + p.hint) + '">' + esc(p.prompt.length > 70 ? p.prompt.slice(0, 70) + '…' : p.prompt) + '</option>').join('') : '<option value="free">No prompt for this level yet — use a free topic</option>') + '<option value="free">Free topic (write your own question in the box below)</option>';
      if (prev && prev !== 'free') {
        let ok = false;
        for (let i = 0; i < sel.options.length; i++) if (sel.options[i].value === prev) ok = true;
        if (ok) sel.value = prev;
      }
      syncPrompt();
    };
    const levelSel = body.querySelector('#wl-level');
    const typeSel = body.querySelector('#wl-type');
    const promptSel = body.querySelector('#wl-prompt');
    if (levelSel) levelSel.onchange = reOpt;
    if (typeSel) typeSel.onchange = reOpt;
    if (promptSel) promptSel.onchange = syncPrompt;
    syncPrompt();
  }

  async function writingLabLive() {
    const body = $('#ielts-ai-modal-body');
    if (!body) return;
    const text = (body.querySelector('#wl-text') || {}).value || '';
    if (text.trim().split(/\s+/).filter(Boolean).length < 40) { window.toast && window.toast('Write at least 40 words first'); return; }
    const sel = body.querySelector('#wl-prompt');
    const val = sel ? sel.value : '';
    let prompt = '';
    if (val === 'free') prompt = (body.querySelector('#wl-prompt-text') || {}).value || '';
    else if (val) prompt = val.split('||')[0];
    const title = $('#ielts-ai-modal-title');
    if (title) title.textContent = 'Grading your essay with the official band descriptors…';
    body.innerHTML = loader(mentorName() + ' is applying the official IELTS band descriptors to your essay…');
    const res = await evaluateWriting({ text, kind: 'writing', prompt });
    renderEvaluation(res);
  }

  /* ============================================================
     PRESENTATION — Library + Settings
     ============================================================ */
  function openLibraryModal(kind) {
    lastLibraryKind = kind || null;
    const items = listByKind(kind);
    const kinds = kind ? [kind] : ['wordbank', 'passage', 'evaluation'];
    const kindTabs = (k) => '<button class="tab-pill ' + (kind === k ? 'active' : '') + '" onclick="window.IELTS_AI.openLibraryModal(\'' + k + '\')">' + ({ wordbank: ic('library', 'w-3.5 h-3.5 inline-block mr-1 -mt-0.5') + 'Word banks', passage: ic('read', 'w-3.5 h-3.5 inline-block mr-1 -mt-0.5') + 'Passages', evaluation: ic('evaluate', 'w-3.5 h-3.5 inline-block mr-1 -mt-0.5') + 'Evaluations' }[k]) + '</button>';
    openModal("My AI Content — " + mentorName(), `
      <div class="flex flex-wrap gap-2 mb-4">${kinds.map(kindTabs).join('')}<button class="tab-pill ${!kind ? 'active' : ''}" onclick="window.IELTS_AI.openLibraryModal()">All</button></div>
      ${items.length ? '<div class="grid gap-3">' + items.map((it) => {
        const sub = it.kind === 'wordbank' ? (it.payload.words ? it.payload.words.length : 0) + ' words · ' + esc(it.payload.band || '')
          : it.kind === 'passage' ? (it.payload.questions ? it.payload.questions.length : 0) + ' questions · ' + esc(it.payload.band || '')
          : 'Band ' + esc(String(it.payload.band || ''));
        return `<div class="bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.15)] rounded-xl p-4 flex items-center justify-between gap-3">
          <div class="min-w-0">
            <p class="font-bold text-[#f5f0e6] text-sm truncate">${esc(it.label)}</p>
            <p class="text-xs text-[#f5f0e6]/50 mt-0.5">${sub} · ${new Date(it.createdAt).toLocaleDateString()}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button class="px-3 py-1.5 rounded-lg text-xs font-bold text-[#f5f0e6] border border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.1)] transition" onclick="window.IELTS_AI.openLibraryItem('${it.id}')">Open</button>
            <button class="px-3 py-1.5 rounded-lg text-xs font-bold text-rose-300 border border-[rgba(248,113,113,0.3)] hover:bg-[rgba(248,113,113,0.1)] transition" onclick="window.IELTS_AI.removeLibraryItem('${it.id}')">Delete</button>
          </div>
        </div>`;
      }).join('') + '</div>' : '<p class="text-sm text-[#f5f0e6]/50 text-center py-10">Nothing here yet — generate some content with an AI generator to build your library.</p>'}
      <div class="flex justify-end mt-5">
        ${gradientBtn('✚ New content', 'window.IELTS_AI.openPassageModal()')}
      </div>`);
  }

  function openLibraryItem(id) {
    const c = store();
    const it = c.myLibrary.find((x) => x.id === id);
    if (!it) return;
    if (it.kind === 'wordbank') {
      openModal(mentorName() + "'s Word Bank", '<div class="grid gap-3">' + (it.payload.words || []).map((w) => '<div class="bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.15)] rounded-xl p-4"><div class="flex items-center gap-2"><p class="font-extrabold text-[#f5f0e6]">' + esc(w.word) + '</p><span class="text-[10px] text-[#f5f0e6]/40 uppercase">' + esc(w.pos) + '</span></div><p class="text-sm text-[#f5f0e6]/75 mt-1">' + esc(w.definition) + '</p><p class="text-xs text-[#e879f9] mt-1"><b>Collocation:</b> ' + esc(w.collocation) + '</p><p class="text-xs text-[#f5f0e6]/55 italic mt-1">"' + esc(w.example) + '"</p>' + (w.tip ? '<p class="text-xs text-[#f5f0e6]/70 mt-1.5 bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.3)] rounded-md px-2 py-1.5"><b class="text-[#e879f9]">' + esc(mentorName()) + ':</b> ' + esc(w.tip) + '</p>' : '') + '</div>').join('') + '</div>');
    } else if (it.kind === 'passage') {
      window.__AIP = it.payload;
      openModal(esc(it.payload.title), '<div id="ai-library-practice"></div>');
      renderPassagePractice(Object.assign({ id: it.id }, it.payload), 'ai-library-practice', true);
    } else if (it.kind === 'evaluation') {
      window.__AIEVAL = it.payload;
      renderEvaluation(it.payload);
    }
  }

  function removeLibraryItem(id) {
    removeFromLibrary(id);
    window.toast && window.toast('Deleted from library');
    openLibraryModal(currentLibraryKind());
  }

  let lastLibraryKind = null;
  function currentLibraryKind() { return lastLibraryKind; }

  function openSettings() {
    const c = cfg();
    openModal(mentorName() + ' (أستاذ رامي) — Studio Settings', `
      <p class="text-sm text-[#f5f0e6]/70 mb-4 leading-relaxed">These keys power <b class="text-[#d4af37]">${mentorName()} (أستاذ رامي)</b>’s live coaching. Get a free model key at <span class="text-[#d4af37]">aistudio.google.com/apikey</span> and paste it below. Without a key, everything still works — he coaches from his built-in knowledge pack.</p>
      ${field('ai-key', 'Model API key', 'Paste your API key', c.key, { type: 'password' })}
      ${field('ai-model', 'Model', '', c.model, { select: true, options: ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.5-flash'] })}
      <div class="flex items-center gap-3 mt-4">
        ${gradientBtn('Save settings', 'window.IELTS_AI.saveSettings()')}
        ${c.key ? '<button class="px-5 py-2.5 rounded-lg text-sm font-bold text-rose-300 border border-[rgba(248,113,113,0.3)] hover:bg-[rgba(248,113,113,0.1)] transition" onclick="window.IELTS_AI.clearSettings()">Remove key</button>' : ''}
      </div>
      <p id="ai-key-msg" class="text-xs text-[#f5f0e6]/50 mt-3"></p>`);
  }

  function saveSettings() {
    const body = $('#ielts-ai-modal-body');
    const key = ((body.querySelector('#ai-key') || {}).value || '').trim();
    const model = (body.querySelector('#ai-model') || {}).value || DEFAULT_MODEL;
    if (window.IELTS_AUTH) window.IELTS_AUTH.setScoped('aikey', { key, model });
    const msg = $('#ai-key-msg');
    if (msg) msg.textContent = key ? 'Saved — ' + mentorName() + '’s live coaching is enabled.' : 'Key removed — ' + mentorName() + ' will use his built-in coaching pack.';
    window.toast && window.toast(key ? 'Key saved — live coaching on' : 'No key — built-in coaching');
  }

  function clearSettings() {
    if (window.IELTS_AUTH) window.IELTS_AUTH.setScoped('aikey', { key: '', model: DEFAULT_MODEL });
    openSettings();
    window.toast && window.toast('AI key removed');
  }

  /* ============================================================
     FULL-SPECTRUM HOLISTIC STUDY PLAN — Teacher Rami (أستاذ رامي)
     Generates a tailored 4-week (28-day) roadmap that blends
     IELTS-specific tasks with core English mastery: Advanced
     Vocabulary SRS, Grammar correction, Natural phrasing and
     Idioms. Every day carries a mentor coaching tip.
     ============================================================ */
  const PLAN_ACTIONS = ['listening', 'reading', 'readings', 'writing', 'speaking', 'catlango', 'training', 'reading-hub', 'learning-path', 'translator', 'exam'];
  const PLAN_SKILLS = ['listening', 'reading', 'writing', 'speaking', 'vocab', 'grammar', 'idioms', 'exam'];

  function sanitizeAction(a) { return PLAN_ACTIONS.indexOf(a) >= 0 ? a : 'reading-hub'; }

  const MENTOR_TIPS = {
    listening: 'Train yourself to predict answers from question words (who / what / when / how) before the audio starts — top scorers do this instinctively.',
    reading: 'Never read every word. Skim for the main idea, then scan for keywords and their synonyms — examiners reward controlled speed, not slow reading.',
    writing: 'Point → Explain → Example → Link. One idea per paragraph. Native professionals open with the strongest claim, not a cliché like “nowadays”.',
    speaking: 'Think in ideas, not grammar. Answer in three beats: opinion → reason → example. It buys fluency and instantly sounds more confident.',
    vocab: 'Learn words in pairs (word + collocation), then force yourself to use each one in a sentence about your own life — that is what makes it stick.',
    grammar: 'Find the ONE pattern you keep breaking and drill it with five corrections a day, rather than memorising fifty rules you never apply.',
    idioms: 'Idioms impress only when they carry meaning — use one idiom per idea, and double-check the register so it never sounds forced.',
    exam: 'Review every mistake in three columns: what went wrong, why, and the fix. This single habit raises bands faster than any course.'
  };

  function mentorTipFor(skill) {
    return MENTOR_TIPS[skill] || MENTOR_TIPS.vocab;
  }

  /* ============================================================
     Teacher Rami — dynamic placement test + assessment
     ============================================================ */
  const PLACEMENT_SECTION_COUNTS = { grammar: 12, reading: 8, listening: 6 };

  function sanitizePlacement(questions) {
    const levels = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
    const out = [];
    questions.forEach((qq, i) => {
      const raw = (typeof qq === 'object' && qq) ? qq : {};
      const opts = Array.isArray(raw.opts) ? raw.opts.map(String).map((o) => o.replace(/^[A-D][.)]\s*/, '').trim()).filter(Boolean).slice(0, 4) : [];
      if (opts.length < 2) return;
      const secRaw = String(raw.section || 'grammar').toLowerCase();
      const sec = secRaw.indexOf('read') >= 0 ? 'reading' : secRaw.indexOf('listen') >= 0 ? 'listening' : 'grammar';
      const ansRaw = String(raw.ans || raw.answer || '').toUpperCase().trim();
      let ans = ansRaw.indexOf(')') >= 0 ? (ansRaw.replace(/[^A-D]/g, '').slice(0, 1)) : ansRaw.slice(0, 1);
      if (!/^[A-D]$/.test(ans)) {
        const idx = opts.indexOf(String(raw.correct || ''));
        if (idx >= 0) ans = String.fromCharCode(65 + idx);
        else return;
      }
      const label = String(raw.q || raw.question || '').trim();
      if (!label) return;
      out.push({
        id: 'ai' + (i + 1) + sec.charAt(0),
        section: sec,
        level: levels.indexOf(String(raw.level || 'b1').toLowerCase()) >= 0 ? String(raw.level).toLowerCase() : 'b1',
        q: label.slice(0, 200),
        opts,
        ans,
        tip: String(raw.tip || 'Teacher Rami’s note: reread the passage and listen for exact wording.').trim().slice(0, 160),
        passage: raw.passage ? String(raw.passage).trim().slice(0, 700) : undefined,
        script: raw.script ? String(raw.script).trim().slice(0, 900) : undefined
      });
    });
    return out.slice(0, 26);
  }

  async function generatePlacementTest(opts) {
    opts = opts || {};
    const c = cfg();
    if (!c.key && !useProxy()) return null;
    const counts = opts.counts || PLACEMENT_SECTION_COUNTS;
    const sys = 'You are ' + mentorName() + ' (أستاذ رامي), an expert IELTS English teacher. Generate a completely fresh, RANDOM placement test. Every call must produce new questions — never repeat a standard textbook question. Questions must climb in difficulty within each section.';
    const usr = 'Output ONLY strict JSON, no commentary:\n{"questions":[{"section":"grammar","level":"a1","q":"...","opts":["...","...","...","..."],"ans":"B","tip":"one-line teaching explanation"}, ...]} — exactly ' + counts.grammar + ' grammar items, ' + counts.reading + ' reading items (each with a 3-6 sentence "passage" and one detail/inference question), and ' + counts.listening + ' listening items (each with a short simulated dialogue "script" and one question). Use levels only from: a1,a2,b1,b2,c1. "ans" must be the CORRECT option letter; tips are short explanations that teach the learner.';
    const raw = await gemini(sys, usr, true);
    const data = raw ? parseJson(raw) : null;
    const qs = (data && Array.isArray(data.questions)) ? data.questions : ((Array.isArray(data) && data) ? data : null);
    if (!qs) return null;
    const questions = sanitizePlacement(qs);
    if (questions.length < 12) return null;
    return { demo: false, questions, generatedAt: Date.now() };
  }

  function fallbackPlacementAnalysis(info) {
    const bySection = info.sections || {};
    const rows = Object.keys(bySection).map((k) => ({ key: k, c: (bySection[k] && bySection[k].c) || 0, t: (bySection[k] && bySection[k].t) || 1, pct: bySection[k] && bySection[k].t ? (bySection[k].c / bySection[k].t) : 0 }));
    rows.sort((a, b) => a.pct - b.pct);
    const focus = rows.filter((w) => w.pct < 0.65).slice(0, 3).map((w) => w.key);
    const levelName = (info.lastLevel && info.lastLevel.name) || 'B1 Intermediate';
    return {
      level: levelName,
      analysis: 'Demo assessment: with ' + (info.lastScore || 0) + '/' + (info.lastTotal || 0) + ' correct, your results point to ' + levelName + '. In live mode I weigh every section, confirm your exact level and hand you a personalised study plan.',
      strengths: rows.length ? ['Your best section was ' + rows[rows.length - 1].key + ' (' + Math.round(rows[rows.length - 1].pct * 100) + '%).'] : ['Great first attempt!'],
      focus: focus.length ? focus : ['grammar'],
      nextStep: 'Open your roadmap below — I have built 28 daily tasks around the areas that matter most for you.'
    };
  }

  async function analyzePlacement(info) {
    const c = cfg();
    if (!c.key && !useProxy()) return fallbackPlacementAnalysis(info);
    const sys = 'You are ' + mentorName() + ' (أستاذ رامي), an expert IELTS English teacher. Analyse this learner\'s placement test: confirm the exact CEFR level, be honest about section scores, and give pointed, warm, professional coaching.';
    const usr = 'Result: ' + (info.lastScore || 0) + '/' + (info.lastTotal || 0) + ' correct. Sections: ' + JSON.stringify(info.sections || {}) + '. Current level: ' + (info.lastLevel ? info.lastLevel.name : 'none') + '.\nOutput ONLY strict JSON:\n{"level":"B1 Intermediate","analysis":"2-3 sentences of coaching","strengths":["..."],"focus":["grammar","listening"],"nextStep":"one motivating sentence"}';
    const raw = await gemini(sys, usr, true);
    const data = raw ? parseJson(raw) : null;
    if (!data || !data.analysis) return fallbackPlacementAnalysis(info);
    return {
      level: String(data.level || (info.lastLevel && info.lastLevel.name) || '').trim(),
      analysis: String(data.analysis).trim().slice(0, 500),
      strengths: Array.isArray(data.strengths) ? data.strengths.map(String).slice(0, 3) : [],
      focus: Array.isArray(data.focus) ? data.focus.map(String).filter((f) => ['grammar', 'reading', 'listening', 'writing', 'speaking'].indexOf(f) >= 0).slice(0, 4) : [],
      nextStep: String(data.nextStep || '').trim().slice(0, 200)
    };
  }

  /* ============================================================
     Teacher Rami — Chat & Speak Lab
     Daily live conversation coaching: Rami answers, corrects the
     learner's English gently (with the "why"), and keeps the
     conversation moving with one follow-up question.
     ============================================================ */
  const CHAT_THIRD_S = { go: 'goes', do: 'does', have: 'has', study: 'studies', try: 'tries', say: 'says', play: 'plays', work: 'works', live: 'lives', like: 'likes', want: 'wants', need: 'needs', know: 'knows', think: 'thinks', write: 'writes', read: 'reads', make: 'makes', take: 'takes', speak: 'speaks', talk: 'talks', eat: 'eats', watch: 'watches', teach: 'teaches', come: 'comes', become: 'becomes', begin: 'begins', start: 'starts', finish: 'finishes', learn: 'learns', buy: 'buys', pay: 'pays', travel: 'travels', drive: 'drives', ride: 'rides', fly: 'flies', cook: 'cooks', clean: 'cleans', wash: 'washes', wear: 'wears', put: 'puts', open: 'opens', close: 'closes', call: 'calls', answer: 'answers', ask: 'asks', help: 'helps', love: 'loves', hate: 'hates', prefer: 'prefers', believe: 'believes', hope: 'hopes', wish: 'wishes', feel: 'feels', seem: 'seems', mean: 'means', mind: 'minds', matter: 'matters', remain: 'remains', stay: 'stays', depend: 'depends', include: 'includes', exist: 'exists' };
  const CHAT_GERUND = (w) => {
    const g = String(w).toLowerCase();
    if (g.endsWith('ie')) return g.slice(0, -2) + 'ying';
    if (g.endsWith('e')) return g.slice(0, -1) + 'ing';
    return g + 'ing';
  };

  /* ------------------------------------------------------------------
     Teacher Rami — offline conversation brain (no API key needed).
     An intent engine over a tutor knowledge pack: Rami detects what
     the learner is asking about, teaches one clear idea, corrects
     English gently with the why, ends with ONE follow-up question,
     and suggests 2-3 tappable chips to keep the dialogue moving.
     ------------------------------------------------------------------ */
  function pushCorr(list, original, corrected, why) {
    if (!original || !corrected || list.length >= 6) return;
    if (list.some((c) => c.original === original && c.corrected === corrected)) return;
    list.push({ original, corrected, why });
  }

  const IRREG_PAST = { goed: 'went', buyed: 'bought', eated: 'ate', runned: 'ran', writed: 'wrote', catched: 'caught', teached: 'taught', thinked: 'thought', keeped: 'kept', knowed: 'knew', seed: 'saw', maked: 'made', swimmed: 'swam', payed: 'paid', sayed: 'said', feeled: 'felt', leaved: 'left', telled: 'told' };
  const IRREG_BASE = { went: 'go', ate: 'eat', saw: 'see', did: 'do', bought: 'buy', ran: 'run', wrote: 'write', took: 'take', came: 'come', left: 'leave', brought: 'bring', thought: 'think', made: 'make', told: 'tell', paid: 'pay', felt: 'feel', got: 'get' };
  const UNCOUNT = { informations: 'information', advices: 'advice', furnitures: 'furniture', knowledges: 'knowledge', homeworks: 'homework', evidences: 'evidence', researches: 'research', staffs: 'staff', luggages: 'luggage', equipments: 'equipment', contents: 'content' };
  const CONTRACT = { dont: "don't", doesnt: "doesn't", didnt: "didn't", isnt: "isn't", arent: "aren't", wasnt: "wasn't", werent: "weren't", havent: "haven't", hasnt: "hasn't", hadnt: "hadn't", wont: "won't", cant: "can't", couldnt: "couldn't", shouldnt: "shouldn't", wouldnt: "wouldn't", im: "I'm", ive: "I've", id: "I'd", youre: "you're", youve: "you've", whats: "what's", thats: "that's", theres: "there's" };
  const COUNTABLE = ['people', 'things', 'cars', 'students', 'words', 'children', 'countries', 'days', 'problems', 'questions', 'mistakes', 'books', 'ideas', 'hours', 'kinds'];
  const MASS_NOUNS = ['work', 'homework', 'information', 'knowledge', 'advice', 'money', 'time', 'water', 'traffic', 'furniture', 'research', 'evidence', 'stuff', 'news', 'progress'];

  function runGrammarCoaching(t, low, c) {
    /* pronoun I */
    if (/\bi\b/.test(low) && !/\bI\b/.test(t)) pushCorr(c, 'i', 'I', 'Pronoun “I” is always capitalised in English — even mid-sentence.');
    /* third-person -s */
    const tps = low.match(/\b(he|she|it)\s+(go|do|have|study|try|say|come|become|begin|start|finish|learn|buy|pay|travel|drive|ride|fly|cook|clean|wash|wear|put|open|close|call|answer|ask|help|love|hate|prefer|believe|hope|wish|feel|seem|mean|mind|matter|remain|stay|play|work|live|like|want|need|know|think|write|read|make|take|speak|talk|eat|watch|teach)\b/);
    if (tps && CHAT_THIRD_S[tps[2]]) pushCorr(c, tps[0], tps[1] + ' ' + CHAT_THIRD_S[tps[2]], 'With he / she / it, the present-simple verb takes “s” (or “es”).');
    /* you/they + is/was */
    const yPron = low.match(/\b(you|they)\s+(is|was)\b/);
    if (yPron) pushCorr(c, yPron[0], yPron[1] + ' ' + (yPron[2] === 'is' ? 'are' : 'were'), '“Are / were” travel with you and they; “is / was” only with he, she, it.');
    /* gerund after specific verbs */
    const ger = low.match(/\b(enjoy|finish|avoid|consider|suggest|mind|deny|keep|imagine|practice|miss|admit|recommend|stop)\s+to\s+([a-z]+)\b/);
    if (ger) pushCorr(c, ger[0], ger[1] + ' ' + CHAT_GERUND(ger[2]), 'These verbs take the “-ing” form, not “to + verb”.');
    /* missing apostrophes */
    const ct = CONTRACT;
    const conRe = new RegExp('\\b(' + Object.keys(ct).join('|') + ')\\b', 'ig');
    let conM;
    while ((conM = conRe.exec(t))) {
      const w = conM[0].toLowerCase();
      pushCorr(c, conM[0], ct[w], 'Missing apostrophe — “' + ct[w] + '” is two words squeezed together.');
      if (c.length >= 6) break;
    }
    /* irregular past */
    let m;
    const irrRe = new RegExp('\\b(' + Object.keys(IRREG_PAST).join('|') + ')\\b', 'ig');
    while ((m = irrRe.exec(low))) pushCorr(c, m[0], IRREG_PAST[m[0]], '“' + IRREG_PAST[m[0]] + '” is the correct past form of this verb.');
    /* uncountable nouns */
    const unRe = new RegExp('\\b(' + Object.keys(UNCOUNT).join('|') + ')\\b', 'ig');
    while ((m = unRe.exec(low))) pushCorr(c, m[0], UNCOUNT[m[0]], '“' + UNCOUNT[m[0]] + '” is uncountable in English — no “s”.');
    /* would/could/should of */
    m = low.match(/\b(would|could|should)\s+of\b/);
    if (m) pushCorr(c, m[0], m[1] + ' have', '“' + m[1] + ' of” should be “' + m[1] + ' have” — of is never a verb helper.');
    /* I am agree */
    m = low.match(/\bi\s+am\s+agree\b/);
    if (m) pushCorr(c, m[0], 'I agree', 'Agree is a verb, not an adjective — so there is no “am agree”.');
    /* did + past verb */
    m = low.match(/\bdid\s+(went|ate|saw|did|bought|ran|wrote|took|came|left|brought|thought|made|told|paid|felt|got)\b/);
    if (m && IRREG_BASE[m[2]]) pushCorr(c, m[0], 'did ' + IRREG_BASE[m[2]], 'After “did”, the verb returns to the base form.');
    /* more better */
    m = low.match(/\bmore\s+better\b/);
    if (m) pushCorr(c, m[0], 'much better', '“Better” is already comparative — “more better” is never correct.');
    /* a/an before vowel-start words */
    m = low.match(/\ba\s+([aeiou][a-z]+)\b/);
    if (m) pushCorr(c, m[0], 'an ' + m[1], 'Before a vowel sound, “a” becomes “an”.');
    m = low.match(/\ban\s+([bcdfgjklmnpqrstvwxz][a-z]+)\b/);
    if (m) pushCorr(c, m[0], 'a ' + m[1], 'Before a consonant sound, “an” becomes “a”.');
    /* its vs it's */
    m = low.match(/\bits\s+(going|raining|hard|important|a|an|time|possible|difficult|easy|not|never|always|nice|great|my|your|the)\b/);
    if (m) pushCorr(c, m[0], "it's " + m[1], '“It’s” = it is. “Its” is only the possessive (its colour).');
    /* much / many */
    m = low.match(new RegExp('\\bmuch\\s+(' + COUNTABLE.join('|') + ')\\b'));
    if (m) pushCorr(c, m[0], 'many ' + m[1], '“Many” goes with countable plurals — “much” with uncountable ideas.');
    m = low.match(new RegExp('\\bmany\\s+(' + MASS_NOUNS.join('|') + ')\\b'));
    if (m) pushCorr(c, m[0], 'much ' + m[1], '“Much” goes with uncountable ideas like “' + m[1] + '”.');
    m = low.match(/\bless\s+(people|things|cars|books|mistakes|students|words|children|days|hours)\b/);
    if (m) pushCorr(c, m[0], 'fewer ' + m[1], 'For countable plurals, use “fewer”, not “less”.');
  }

  /* one-line tappable follow-ups used across intents */
  const SYNONYM_EXTRA = { children: 'young people / the younger generation / minors', happy: 'content / pleased / delighted', sad: 'unhappy / dejected / disheartened', old: 'aged / long-standing / dated (context)', new: 'novel / emerging / unprecedented', fast: 'rapid / swift / accelerated', slow: 'gradual / sluggish / protracted', difficult: 'challenging / arduous / demanding', easy: 'straightforward / effortless / uncomplicated', tired: 'exhausted / fatigued / drained', interesting: 'compelling / captivating / thought-provoking', boring: 'tedious / monotonous / uninspiring' };
  const SALAM = 'Marhaba! I’m ' + MENTOR.name + ' (' + MENTOR.ar + ') — your personal IELTS coach, and I love a long conversation. ';

  function fallbackTeacherReply(text, level) {
    const t = String(text || '').trim().slice(0, 600);
    const low = t.toLowerCase();
    const corrections = [];
    runGrammarCoaching(t, low, corrections);
    const cap = corrections.slice(0, 5);
    const hasAr = /[\u0600-\u06FF]/.test(t);
    const S = (a) => (Array.isArray(a) ? a.slice(0, 3) : []);

    let out = null;

    const greetTest = /^\s*(hi+|hello+|hey+|salam|marhab[a-z]*|selam)/i.test(t) || /(^|\s)(مرحبا|أهلا|اهلا|أهلاً|هلا|السلام عليكم)/.test(t);
    if (greetTest && t.length < 40) {
      out = hasAr
        ? {
            reply: 'مرحبا بك! أنا الأستاذ رامي، مدرّسك الخاص بالإنجليزي والـ IELTS. سؤال بسيط عشان نبدأ: أكثر مهارة قلقان عليها — سبيكينغ، رايترينغ، ريفدينغ، لسننغ، ولا كل الامتحان؟',
            suggestions: ['السبيكينغ بيخوّفني', 'بدي خطة دراسة', 'صحح هالجملة: "He don\'t live here"']
          }
        : {
            reply: SALAM + 'Tell me one thing straight: which skill scares you most right now — speaking, writing, reading, listening, or the whole exam?',
            suggestions: ['Speaking makes me nervous', 'How do I start preparing?', 'Correct this: "I am agree with that"']
          };
    } else if (/\b(how are you|how is it going|كيف حالك|كيفك|شلونك|كيف الحال|عامل ايه)\b/i.test(low)) {
      out = {
        reply: 'I am genuinely excellent — a full day of teaching English is my idea of fun. Now, more importantly, you: on a scale of 1 to 10, how confident do you feel speaking English today?',
        suggestions: ['Seven, but I freeze in Part 3', 'Honestly, a three', 'Help me increase my confidence']
      };
    } else if (/\b(thank|thx|شكرا|شكراً|تسلم|ممنون)\b/i.test(low)) {
      out = {
        reply: 'You are most welcome — and the professional upgrade is “my pleasure”, which lands warmer than a plain “ok”. Tell me: which phrase from today did you actually say out loud?',
        suggestions: ['Give me five native phrases', 'I used "my pleasure"!', 'Coach my next sentence']
      };
    } else if (/\b(bye|goodbye|good night|goodnight|see you|مع السلامة|مع السلامه|باي)\b/i.test(low) && t.length < 30) {
      out = {
        reply: 'Goodbye — before you go, here is tonight’s drill: write one sentence describing your day, record it out loud once, then come back and I will coach it. Deal?',
        suggestions: ['Deal — see you soon', 'Give me a writing task instead', 'one more question']
      };
    } else if (/\b(who are you|what are you|what can you do|help me|مين انت|مين انتي|وش بتعرف تعمل|شو بتحكي)\b/i.test(low)) {
      out = {
        reply: 'I am ' + MENTOR.name + ' (' + MENTOR.ar + '): your live English teacher inside this platform. I correct your sentences, teach grammar and exam strategy, grow your vocabulary, and keep you motivated — like a real private tutor. So, what shall we talk about first?',
        suggestions: ['My biggest IELTS worry', 'Speaking Part 2 strategy', 'Name five common mistakes']
      };
    } else if (/\b(band|نسبة|المعيار)\b/i.test(low) && /\b(6|7|7\.5|8|8\.5|9|higher|raise|increase|improve|get to|reach|aim|target|score|علامة)\b/i.test(low)) {
      out = {
        reply: 'Bands are built from four engines working together: accurate grammar, precise vocabulary, fluent structure, and exam technique. To jump a band you do not need harder materials — you need to fix your five most repeated mistakes and practise them until automatic. Send me ONE sentence you wrote today and I will find your pattern for you.',
        suggestions: ['Here is my sentence…', 'Improve my vocabulary', 'Plan a 4-week schedule']
      };
    } else if (/\b(start|schedule|plan|prepare|begin|roa[d]? ?m?ap|study plan|how many hours|منين أبدأ|أبدأ|ابدأ|خطة)\b/i.test(low)) {
      out = {
        reply: 'Perfect question — this is exactly where serious learners begin. The order: 1) Diagnose (take the placement test and let me find your level), 2) Build daily blocks of 30–60 minutes mixing one skill + one grammar/vocab drill, 3) Take a weekly full exam and re-plan. Consistency beats intensity every time. Where do you want to start the first week?',
        suggestions: ['Give me a sample Week 1', 'I want to focus on speaking', 'Open the placement test']
      };
    } else if (/\b(motivat|stress|exhaust|burned ?out|nervous|scared|afraid|anxious|worried|cannot|can't do|give up|يأس|توتر|خوف|قلق|احباط|إحباط)\b/i.test(low)) {
      out = {
        reply: 'Sit with this for a second: language learning is not a talent, it is a habit. Every single expert English speaker was once exactly where you are — the difference is they did not stop. Shrink the goal: one sentence today, one correction, one win. That is how confidence is actually built. What is the smallest English win you can get today?',
        suggestions: ['I will write one sentence', 'How do I stay consistent?', 'Give me encouragement for speaking']
      };
    } else if (/\b(reading|skim|scan|true false|tfng|not given|paragraph|قراءة)\b/i.test(low)) {
      out = {
        reply: 'Reading rewards a two-pass system: 1) Skim headings and the topic sentences of each paragraph (~60 seconds), 2) Scan for the exact keywords of each question before reading closely. And the band-decisive skill: for True / False / Not Given, a statement is TRUE only if the passage matches it word-for-word in meaning; False only if it directly contradicts; everything else is Not Given. Which question type trips you most?',
        suggestions: ['Strategy for "Not Given"', 'Practice a reading passage', 'How to skim faster']
      };
    } else if (/\b(listen|listening|audio|speaker|استماع)\b/i.test(low)) {
      out = {
        reply: 'Listening is won before the audio starts. In the gap, read the questions and predict the ANSWER TYPE — is it a number, a name, a date, a place? Then listen for the words you predicted. One more habit: the examiner loves when you transfer answers during the provided pause, not at the end. Which section do you lose the most marks in?',
        suggestions: ['Listening Part 4 is brutal', 'How to predict answer types', 'Practice a listening section']
      };
    } else if (/\b(task 2|task two|essay|argumentative|opinion essay|مقال)\b/i.test(low)) {
      out = {
        reply: 'Task 2 is won in the first 5 minutes of planning. Build every paragraph on the PEEL skeleton: Point → Explain → Example → Link back. A Band 7 essay never argues two ideas in one paragraph, and it always spends 5 minutes outlining before the first word. The examiner grades ideas, structure, vocabulary and grammar — not length beyond 250 words. Want to build a paragraph together?',
        suggestions: ['Drill the PEEL skeleton', 'Give me a Task 2 question', 'Correct my essay sentence']
      };
    } else if (/\b(task 1|task one|report|graph|chart|diagram|map|خط بياني|رسم بياني)\b/i.test(low)) {
      out = {
        reply: 'Task 1 is a report, not a story. The winning shape: one sentence summarising what the data shows overall (the overview — your Band 7 lifeline), then two organised paragraphs comparing the biggest rises, falls, and contrasts. Use precise verbs — “rose sharply”, “levelled off”, “peaked at” — and keep it around 150 words written in the past tense for past data. What kind of graph are you practising?',
        suggestions: ['Line graph trends', 'How to write the overview', 'Give me a sample report']
      };
    } else if (/\b(speaking|part 1|part 2|part 3|fluency|cue card|speak|تحدث|كلام|محادثة)\b/i.test(low) && !/\b(lab|simulator)\b/.test(low)) {
      const p2 = /\bpart 2|part two|cue card\b/.test(low);
      const p3 = /\bpart 3|part three\b/.test(low);
      if (p2) {
        out = {
          reply: 'Cue cards punish memorisation. Instead, use four beats: What it is → When/Where → Why it matters to you → What happened next. Structure buys you the full 2 minutes without running dry, and examiners give fluency marks for organisation, not for fancy words. Try the opening: “I would like to talk about…” and then just follow your beats. Which cue card are you dreading?',
          suggestions: ['Describe a place you love', 'Describe a person who inspires you', 'Three-beat method']
        };
      } else if (p3) {
        out = {
          reply: 'Part 3 is where Bands 7–9 are decided. The examiner wants OPINION → REASON → EXAMPLE in every answer, and they push you with extra questions on purpose — that is a gift, not a trap. Say your claim directly, defend it with a reason, then anchor it with a real example from your life or the news. Which part of Part 3 feels hardest?',
          suggestions: ['I run out of things to say', 'Teach me the three-beat method', 'Give me a Part 3 question']
        };
      } else {
        out = {
          reply: 'Speaking fluency is structure, not speed. My three-beat rule: every answer holds Opinion → Reason → Example. Beat one buys you confidence, beat two buys you depth, beat three buys you a natural finish — and natives fill pauses with phrases like “What I mean is…”, never silence. Try it now: tell me your opinion about your hometown in three beats.',
          suggestions: ['My three-beat answer…', 'Part 2 cue card tips', 'Fix my speaking sentence']
        };
      }
    } else if ((low.match(/(?:synonym|another word|another way) (?:for|to say) ([a-zA-Z][a-zA-Z ]*)/) || [])[1]) {
      const synWord = low.match(/(?:synonym|another word|another way) (?:for|to say) ([a-zA-Z][a-zA-Z ]*)/)[1].trim().toLowerCase();
      const synHit = BASIC_TO_UPGRADED.find((e) => e.original.toLowerCase() === synWord);
      const synExtra = SYNONYM_EXTRA[synWord];
      if (synHit) {
        out = {
          reply: 'Good eye — “' + synWord + '” is clear and correct, but for a sharper tone reach for “' + synHit.upgraded + '”. ' + synHit.why + ' Now drop it into ONE sentence from your own life and send it to me.',
          suggestions: ['My sentence using it…', 'Another synonym to upgrade', 'Build me a word bank']
        };
      } else if (synExtra) {
        out = {
          reply: 'For “' + synWord + '”, stronger options are “' + synExtra + '”. Choose the one that matches your exact idea, then use it in a sentence from your own life and send it to me — that is how a word becomes yours.',
          suggestions: ['My sentence using it…', 'Another synonym to upgrade', 'Give me 5 exam-ready words']
        };
      } else {
        out = {
          reply: 'The best replacement for “' + synWord + '” depends on your exact context, so I do not want to guess and teach you a weak fit. Send me the full sentence you are writing and I will upgrade it precisely, with the reason for each choice.',
          suggestions: ['Here is my sentence…', 'Boost my vocabulary', 'Give me 5 exam-ready words']
        };
      }
    } else if (/\b(word|vocab|vocabulary|synonym|another word|phrase|يمعنى|يعني|كلمة|كلمات)\b/i.test(low) && !/\bsentence\b/.test(low)) {
      const vow = (low.match(/\b(?:how (?:do|can) (?:i|we) say|how (?:do|can) (?:i|we) (?:say|translate)|what is the word|another word for)\s+([a-z\s?]+?)\s*[?.]?$/) || [])[1];
      if (vow) {
        out = {
          reply: 'For the idea “' + vow.trim() + '”, the exact English word depends on the context, so give me the full Arabic sentence and I will correct it word-for-word — that is how we build real active vocabulary. Right now, capture it in English simply (even imperfectly) and we will polish it together.',
          suggestions: ['The idea is "hard work"', 'Correct this Arabic sentence', 'Build me a word bank']
        };
      } else {
        out = {
          reply: 'Vocabulary only counts when it is used. My rule of three: you own a word after using it in three different sentences out loud. Skip the word-of-the-day lists — instead, when you meet a new word, record its exact meaning, its collocation (partner word), and one sentence from your own life. Send me a sentence containing a new word you want to own.',
          suggestions: ['Give me 5 exam-ready words', 'Word: "resilient"', 'How to use collocations']
        };
      }
    } else if (/\b(grammar|tense|preposition|article|plural|rules|قواعد|قاعدة)\b/i.test(low)) {
      out = {
        reply: 'Grammar is only worth studying in the exact error you make. The five patterns my students repeat most: third-person -s (“she go” → “she goes”), articles (a/an/the), the verb after “did”, uncountable nouns (information, advice), and apostrophes (don’t). Pick the one you know you break — or send me a sentence now and I will find it for you.',
        suggestions: ['Check my sentence', 'Explain articles simply', 'Verb tenses — which matter?']
      };
    } else if (/\b(idioms?|expression)\b/i.test(low)) {
      out = {
        reply: 'Idioms only lift your band if they are natural and you can explain them. Five exam-safe ones: “a double-edged sword”, “hit the nail on the head”, “on the same page”, “a blessing in disguise”, “go the extra mile”. Use one per speaking answer max — an idiom you explain well beats three you cannot. Which context do you want an idiom for?',
        suggestions: ['An idiom for success', 'An idiom for problems', 'Use one in a sentence']
      };
    } else if (/\b(correct|fix|check|right|wrong|mistake|صحح|صحّح|صلح|غلط|غلطت|هل الجملة)\b/i.test(low)) {
      const target = (t.match(/["'“”]([^"'“”]+)["'“”]/) || [])[1] || (t.split(/[::]/).slice(1).join(':').trim());
      if (target && target.length > 2 && target.length <= 200) {
        const tc = [];
        runGrammarCoaching(target, target.toLowerCase(), tc);
        out = {
          reply: tc.length
            ? 'Good instinct — correcting your own sentences is how bands climb. I fixed the slips in “' + target + '” above; say each fix twice out loud, then rewrite the whole sentence clean and send it back.'
            : 'That sentence already reads clean — nice work. To make it shine at Band 8, tighten the vocabulary: name the exact idea instead of the general one, and link it with a precise connector. What is the idea behind the sentence?',
          suggestions: ['My rewrite…', 'Give me a harder sentence to fix']
        };
      }
    } else if (hasAr) {
      out = {
        reply: 'سؤال حلو — حكيني بأي مجال بدك مساعدة: مهارة معينة (سبيكينغ/رايترينغ/ريفدينغ/لسننغ)، قواعد، مفردات، أو خطة دراسة. اقدر أحكي معك عربي وبرجع لكلّك بالإنجليزي لأنه هيك بنتعلم. وش أكثر شي بدك تبدأ فيه؟',
        suggestions: ['أريد خطة دراسة', 'صحح جملة كتبتها', 'مفردات للرايترينغ']
      };
    }

    /* natural text: treat as a sentence to coach */
    if (!out) {
      if (cap.length) {
        out = {
          reply: 'Nice — you wrote in English, and that is exactly how band scores climb. I fixed the small slips above; read each fix twice, out loud, then send me the rewritten sentence — one clean version.',
          suggestions: ['My rewritten sentence…', 'Explain the -s rule again', 'Give me a new topic']
        };
      } else if (/\?\s*$/.test(t)) {
        out = {
          reply: 'Great question — and honestly, I would rather teach you the thinking behind it than hand you a list. Tell me which area you are asking about (speaking, writing, reading, listening, grammar or vocabulary) and I will give you the exact strategy with a live example.',
          suggestions: ['Speaking strategy', 'Writing strategy', 'Grammar question']
        };
      } else {
        out = {
          reply: 'That reads well — clear and natural. Push it one level: say the same idea again but swap a general word for a precise one, or open with a stronger connector like “on top of that”. What is the next idea you want to say?',
          suggestions: ['My upgraded version…', 'How to link ideas better', 'Give me a sentence to fix']
        };
      }
    }

    return { reply: out.reply, corrections: cap, demo: true, suggestions: S(out.suggestions || []) };
  }

  async function teacherChat(opts) {
    opts = opts || {};
    const user = String(opts.user || '').trim().slice(0, 600);
    const level = String(opts.level || 'B1 Intermediate');
    const history = Array.isArray(opts.history) ? opts.history.slice(-12) : [];
    const c = cfg();
    if (!user) return { reply: 'Write something and I’ll respond — one honest sentence is all it takes.', corrections: [], demo: true };
    if (!c.key && !useProxy()) return fallbackTeacherReply(user, level);
    const sys = 'You are ' + MENTOR.name + ' (' + MENTOR.ar + '), the learner\'s personal IELTS English teacher — warm, sharp and encouraging, like a real private tutor texting a student. Match the learner\'s language but always reply in English (unless they write in Arabic, then answer warmly in Arabic first, then continue in English). Cover IELTS strategy, grammar, vocabulary, speaking and writing with concrete examples. Correct their English gently: for each mistake say what was wrong, why it is wrong, and the natural way a professional would say it. ALWAYS end your reply with ONE short follow-up question to keep the conversation alive. Keep the whole reply brief and human — never robotic, never a list of rules.';
    const usr = 'Learner level: ' + level + '.\nRecent conversation:\n' + history.map((m) => (String(m.role) === 'user' ? 'Learner: ' : MENTOR.name + ': ') + String(m.text || '')).join('\n') + '\n\nNow respond to the learner\'s LATEST message: "' + user + '"\nOutput ONLY strict JSON:\n{"reply":"your warm reply ending in one question","corrections":[{"original":"mistaken phrase","corrected":"natural fix","why":"one-line reason"}],"suggestions":["2 or 3 short tappable follow-up messages, varied"]}';
    const raw = await gemini(sys, usr, true);
    const data = raw ? parseJson(raw) : null;
    if (!data || !String(data.reply || '').trim()) return fallbackTeacherReply(user, level);
    const suggestions = Array.isArray(data.suggestions)
      ? data.suggestions.map((s) => String(s || '').trim()).filter((s) => s && s.length >= 3 && s.length <= 80).slice(0, 3)
      : [];
    return {
      reply: String(data.reply).trim().slice(0, 900),
      corrections: Array.isArray(data.corrections)
        ? data.corrections.map((cc) => ({
            original: String((cc && cc.original) || '').trim().slice(0, 120),
            corrected: String((cc && cc.corrected) || '').trim().slice(0, 120),
            why: String((cc && cc.why) || '').trim().slice(0, 200)
          })).filter((cc) => cc.original || cc.corrected).slice(0, 6)
        : [],
      suggestions,
      demo: false
    };
  }

  /* ============================================================
     Tutor Engine — Socratic Discussion Sessions
     Teacher Rami leads interactive lessons in a chat modal:
     teach → question → evaluate → guide → repeat. Works in
     demo mode (keyword evaluation) or fully live via Gemini.
     ============================================================ */

  const TUTOR_SKILL_ICONS = { grammar: 'grammar', writing: 'write', speaking: 'speak', vocab: 'vocab', reading: 'read', listening: 'listen', idioms: 'idiom', exam: 'exam' };

  const TUTOR_LESSONS = [
    {
      id: 'grammar-third-s', title: 'The -s Rule: He / She / It', skill: 'grammar', level: 'A2–B1',
      intro: 'Today we nail one of the most common English mistakes — the -s on verbs with he, she and it. I will teach you the rule, you try it, and we build from there.',
      steps: [
        { type: 'teach', text: 'In the present simple, he / she / it (or any singular noun) takes -s or -es on the verb:\n\n• He go → He goe*s*\n• She study → She studie*s*\n• It teach → It teach*e*s*\n\nWith I, you, we, they — no -s.' },
        { type: 'question', prompt: 'Write a sentence using "she" + a present-simple verb. Something real in your life.', expected: ['she'], hint: 'She + verb-s. E.g. "She work*s* at a hospital."', feedback: { strong: 'Excellent — you added -s naturally. Exactly what examiners listen for.', developing: 'Close! Check your verb — does it have -s?', off: 'Remember: with she, the verb needs -s. Try: "She [verb]-s …"' } },
        { type: 'question', prompt: 'Now use "it" — describe something a machine or animal does every day.', expected: ['it'], hint: 'e.g. "It run*s* every morning."', feedback: { strong: 'Perfect — that -s is doing its job.', developing: 'Almost! Add -s to the verb.', off: 'Remember: it + verb-s. Try again.' } },
        { type: 'question', prompt: 'Final challenge: a negative with "he" using "does not" + base verb.', expected: ['he', 'does not'], hint: 'He does *not* + base verb (no -s on the verb).', feedback: { strong: 'Outstanding — the negative form is correct. You are ready.', developing: 'Close! In negatives, "does not" + base verb.', off: 'Try: "He does not [base verb] …"' } }
      ],
      conclusion: 'You just mastered the third-person -s — one of the most tested grammar points in IELTS. Keep practising until it is automatic.'
    },
    {
      id: 'writing-peel', title: 'The PEEL Paragraph', skill: 'writing', level: 'B1–B2',
      intro: 'Every strong IELTS essay paragraph follows a skeleton: Point → Explain → Example → Link. Today we build one together.',
      steps: [
        { type: 'teach', text: 'PEEL — four pillars of a band-7+ paragraph:\n\nP — Point: state your main idea in one sentence.\nE — Explain: why is this true?\nE — Example: give a concrete example.\nE — Link: connect it back to your argument.\n\nOne idea per paragraph. No mixing.' },
        { type: 'question', prompt: 'Write the Point sentence for this topic: "Online learning is better than classroom learning." State your opinion.', expected: ['online', 'learning', 'better'], hint: 'Start with "I believe…" or "It is clear that…"', feedback: { strong: 'Clear and direct — exactly what an examiner wants first.', developing: 'Good start. Make it stronger: state your position without hedging.', off: 'One sentence stating your opinion. E.g. "I believe online learning is superior because…".' } },
        { type: 'question', prompt: 'Add the Explain. Why do you think so? 1–2 sentences.', expected: ['because', 'reason'], hint: 'Use "because" or "this is because".', feedback: { strong: 'Strong reasoning — you are building a real argument.', developing: 'Push further — why does your Point matter? Use "because…".', off: 'Add 1–2 sentences explaining *why*.' } },
        { type: 'question', prompt: 'Add an Example. One real or realistic case that proves your point.', expected: ['example', 'for'], hint: '"For example," or "For instance," — then a specific case.', feedback: { strong: 'Concrete example — this separates Band 7 from Band 5.', developing: 'Make it more specific: a name, a number, a place.', off: '"For example, in [country/situation]…"' } }
      ],
      conclusion: 'You built a complete PEEL paragraph. Every paragraph in your Task 2 should follow this skeleton.'
    },
    {
      id: 'speaking-three-beats', title: 'Thinking in Three Beats', skill: 'speaking', level: 'B1–B2',
      intro: 'Fluency is not speed — it is structure. The three-beat method: Opinion → Reason → Example. You will never run out of things to say.',
      steps: [
        { type: 'teach', text: 'Three beats for any speaking question:\n\n1. Opinion — "I strongly believe that…"\n2. Reason — "The main reason is…"\n3. Example — "For example, in my own experience…"\n\nThis buys you time, keeps you structured, and sounds confident.' },
        { type: 'question', prompt: 'Answer this Part 3 question: "Do you think technology has made people less creative?" Use all three beats.', expected: ['think', 'believe', 'because', 'example'], hint: 'Opinion → Reason → Example.', feedback: { strong: 'Beautiful structure — exactly how a Band 7 candidate sounds.', developing: 'Good try! Make sure all three beats are there.', off: 'Break it into three: 1) What do you think? 2) Why? 3) Example.' } },
        { type: 'question', prompt: '"What are the advantages of learning a foreign language?" Three beats again.', expected: ['advantage', 'benefit'], hint: '"The biggest advantage is…" then add a second point.', feedback: { strong: 'Excellent — you sounded like a trained professional.', developing: 'Good structure. Add one more reason or a concrete example.', off: '"The main advantage is…, and another benefit is…"' } }
      ],
      conclusion: 'The three-beat method works for every Part 2 and Part 3 question. Practise it out loud until it becomes your default.'
    },
    {
      id: 'vocab-collocations', title: 'Words That Belong Together', skill: 'vocab', level: 'B1–B2',
      intro: 'English learners translate word-by-word and create unnatural phrases. Today you learn how native speakers pair words.',
      steps: [
        { type: 'teach', text: 'Collocations — natural word pairs:\n\n• We *make* a decision (not "do" a decision)\n• We *do* research (not "make" research)\n• We *take* a photo (not "make" a photo)\n\nNative speakers feel these pairs instinctively. You can too.' },
        { type: 'question', prompt: 'Complete: "She ________ a decision about her career."', expected: ['made', 'make', 'makes'], hint: 'We *make* a decision.', feedback: { strong: 'Perfect collocation — "make a decision" is natural English.', developing: 'The verb that pairs with "decision" is *make*.', off: 'The correct collocation is "make a decision".' } },
        { type: 'question', prompt: 'What verb goes with "research"? "They ________ research into renewable energy."', expected: ['did', 'do', 'does', 'conduct'], hint: 'We *do* research.', feedback: { strong: 'Excellent — "do research" is the natural pair.', developing: 'We say "do research".', off: '"Do research" — try: "They do/did research…"' } },
        { type: 'question', prompt: '"He ________ an important discovery." What verb pairs with "discovery"?', expected: ['made', 'make'], hint: 'We *make* a discovery.', feedback: { strong: 'Spot on — "make a discovery" is Band 8 vocabulary.', developing: '"Make a discovery" — try again.', off: 'The phrase is "make a discovery".' } }
      ],
      conclusion: 'Collocations are the difference between correct English and natural English. Start noticing them when you read.'
    },
    {
      id: 'reading-tfng', title: 'True / False / Not Given', skill: 'reading', level: 'B1–B2',
      intro: 'T/F/NG is the trickiest question type because "Not Given" and "False" feel the same. Today I teach you the difference.',
      steps: [
        { type: 'teach', text: 'The golden rule:\n\n• TRUE = passage says the same thing (synonym match).\n• FALSE = passage says the OPPOSITE.\n• NOT GIVEN = passage says NOTHING about this.\n\nKey: for FALSE you can prove it wrong from the passage. For NOT GIVEN there is simply no information.' },
        { type: 'question', prompt: 'Passage: "The company was founded in 1985 and employs over 500 people."\nStatement: "The company was established in 1990." — True, False, or Not Given?', expected: ['false'], hint: '"Founded" and "established" mean the same. But 1985 ≠ 1990.', feedback: { strong: 'Correct! 1985 ≠ 1990 — contradiction = FALSE.', developing: 'Check the dates. 1985 ≠ 1990 — that is a contradiction.', off: 'The passage says 1985, statement says 1990. Contradiction — FALSE.' } },
        { type: 'question', prompt: 'Same passage. Statement: "The company has offices in Asia." — True, False, or Not Given?', expected: ['not given', 'not'], hint: 'Does the passage mention where the offices are?', feedback: { strong: 'Correct! Nothing about Asia — NOT GIVEN.', developing: 'Does the passage mention Asia at all?', off: 'The passage never mentions Asia. No information = NOT GIVEN.' } }
      ],
      conclusion: 'Always check whether the passage actually discusses the topic. If not mentioned at all, it is Not Given.'
    },
    {
      id: 'idioms-five', title: 'Five Exam-Safe Idioms', skill: 'idioms', level: 'B2–C1',
      intro: 'Idioms impress examiners when they fit naturally. Five idioms today, practised in real sentences.',
      steps: [
        { type: 'teach', text: 'Five IELTS-safe idioms:\n\n1. "A blessing in disguise" — bad thing turns out good.\n2. "The ball is in your court" — your decision now.\n3. "Burn the midnight oil" — study/work late.\n4. "Break the ice" — start conversation in awkward situation.\n5. "A piece of cake" — something very easy.\n\nUse ONE per idea. Never force two into one sentence.' },
        { type: 'question', prompt: 'Write a sentence using "burn the midnight oil" about your study habits.', expected: ['burn', 'midnight', 'oil'], hint: '"I often burn the midnight oil before exams."', feedback: { strong: 'Natural use — that idiom fits perfectly in a study context.', developing: 'Include the full phrase: "burn the midnight oil".', off: '"Burn the midnight oil" means study late. Use it in a sentence.' } },
        { type: 'question', prompt: 'Use "a blessing in disguise" about a difficulty that turned out well.', expected: ['blessing', 'disguise'], hint: '"Losing that job was a blessing in disguise because…"', feedback: { strong: 'Brilliant — exactly how a native speaker would use it.', developing: 'Include the full phrase "a blessing in disguise".', off: '"[Event] was a blessing in disguise because [positive outcome]."' } }
      ],
      conclusion: 'Five idioms ready for exam day. Use one per speaking answer — that is the sweet spot.'
    },
    {
      id: 'listening-predict', title: 'Predicting from Question Words', skill: 'listening', level: 'B1–B2',
      intro: 'Top scorers do not just listen — they predict. Read question words and know what answer to expect before the audio starts.',
      steps: [
        { type: 'teach', text: 'Question word → answer type:\n\n• WHO → person or job title\n• WHEN → time, date, or day\n• WHERE → place or room\n• HOW MUCH → number with currency/quantity\n• WHY → reason (often "because…")\n\nBefore the audio plays, read questions and predict.' },
        { type: 'question', prompt: '"When does the library close on Saturdays?" — What type of answer should you listen for?', expected: ['time', 'hour', 'clock'], hint: '"When" = a time. Listen for a number.', feedback: { strong: 'Exactly — you will listen for a specific time.', developing: 'Close — "when" means a time or clock.', off: '"When" tells you to listen for a time (e.g. "5 PM").' } },
        { type: 'question', prompt: '"How much does the course cost?" — What will the answer look like?', expected: ['number', 'price', 'cost', 'currency', 'money', 'pound', 'dollar'], hint: 'Number + currency. Listen for "pounds", "dollars", etc.', feedback: { strong: 'Perfect — number with currency. You are ready.', developing: 'A price: number + currency.', off: 'The answer is a number with currency — "$200", "£50", etc.' } }
      ],
      conclusion: 'Prediction is the biggest listening hack. Spend 30 seconds before each section predicting answer types from question words.'
    },
    {
      id: 'exam-time', title: 'Time Budgeting: The 60-Minute Rule', skill: 'exam', level: 'B1–C1',
      intro: 'Many students know the English but lose marks running out of time. Today: a time budget that keeps you in control.',
      steps: [
        { type: 'teach', text: 'IELTS time budget:\n\n• Listening: 30 min + 10 min transfer (fixed).\n• Reading: 60 min for 3 passages → 20 min each.\n• Writing: 60 min → 20 min Task 1 + 40 min Task 2.\n• Speaking: 11–14 min (fixed).\n\nGolden rule: Task 2 is worth DOUBLE Task 1. Write Task 2 first.' },
        { type: 'question', prompt: 'You have 60 min for Reading. Passage 1 took 25 min. How much time remains for Passages 2 and 3? Is this a problem?', expected: ['35', 'minutes', 'time'], hint: '60 − 25 = 35 minutes for 2 passages → ~17.5 min each.', feedback: { strong: 'Correct — 35 min left. Slightly tight but doable.', developing: '60 minus 25 = 35. About 17–18 min per remaining passage.', off: '35 minutes left. That is less than the ideal 20 min each — speed up on easy questions.' } },
        { type: 'question', prompt: 'Why write Task 2 before Task 1? Give two reasons.', expected: ['double', 'worth', 'more', 'marks'], hint: 'Task 2 is worth more marks, and you are fresher at the start.', feedback: { strong: 'Spot on — Task 2 carries double the weight.', developing: 'One reason is right. The other: Task 2 is worth double the marks.', off: 'Two reasons: 1) Task 2 is worth double. 2) You are fresher at the start.' } }
      ],
      conclusion: 'Time management separates nervous candidates from controlled ones. Practise with a stopwatch until the budget is automatic.'
    }
  ];

  let tutorState = null;

  /* ---- Tutor UI helpers ---- */

  function tutorBubble(m) {
    if (m.role === 'user') {
      return '<div class="flex justify-end my-1.5"><div class="max-w-[82%] bg-[rgba(212,175,55,0.18)] border border-[rgba(212,175,55,0.35)] text-[#f5f0e6] text-sm rounded-2xl rounded-br-md px-4 py-2.5 whitespace-pre-wrap">' + esc(m.text) + '</div></div>';
    }
    const badge = m.verdict ? '<span class="inline-block ml-2 text-[9px] font-bold uppercase tracking-widest rounded px-1.5 py-0.5 align-middle ' + ({ strong: 'bg-emerald-400/15 text-emerald-400 border border-emerald-400/30', developing: 'bg-amber-400/15 text-amber-400 border border-amber-400/30', off: 'bg-rose-400/15 text-rose-400 border border-rose-400/30' }[m.verdict] || '') + '">' + esc(m.verdict) + '</span>' : '';
    return '<div class="flex items-start gap-2.5 my-1.5"><div class="w-7 h-7 rounded-full overflow-hidden bg-[#14120f] border border-[rgba(212,175,55,0.5)] shrink-0">' + MENTOR_AVATAR + '</div><div class="max-w-[85%] bg-[rgba(245,240,230,0.07)] border border-[rgba(245,240,230,0.12)] text-[#f5f0e6] text-sm rounded-2xl rounded-tl-md px-4 py-2.5"><p class="whitespace-pre-wrap">' + esc(m.text) + '</p>' + badge + '</div></div>';
  }

  function tutorTypingHtml() {
    return '<div class="flex items-start gap-2.5 my-1.5" id="tutor-typing"><div class="w-7 h-7 rounded-full overflow-hidden bg-[#14120f] border border-[rgba(212,175,55,0.5)] shrink-0">' + MENTOR_AVATAR + '</div><div class="bg-[rgba(245,240,230,0.07)] border border-[rgba(245,240,230,0.12)] rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce"></span><span class="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce" style="animation-delay:0.15s"></span><span class="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce" style="animation-delay:0.3s"></span></div></div>';
  }

  function tutorAppend(html) {
    var el = document.getElementById('tutor-messages');
    if (!el) return;
    el.insertAdjacentHTML('beforeend', html);
    el.scrollTop = el.scrollHeight;
  }

  function tutorRemoveTyping() {
    var el = document.getElementById('tutor-typing');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function tutorSetInput(on) {
    var inp = document.getElementById('tutor-input');
    var btn = document.getElementById('tutor-send');
    if (inp) { inp.disabled = !on; if (on) inp.focus(); }
    if (btn) btn.disabled = !on;
  }

  function tutorProgressHtml() {
    if (!tutorState) return '';
    var lesson = tutorState.lesson;
    var idx = Math.min(tutorState.stepIndex, lesson.steps.length);
    var total = lesson.steps.length;
    var pct = Math.round((idx / total) * 100);
    return '<div class="flex items-center justify-between mb-1"><p class="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest">' + ic(TUTOR_SKILL_ICONS[lesson.skill] || 'spark', 'w-3 h-3 inline-block mr-1 -mt-0.5') + esc(lesson.skill) + ' · ' + esc(lesson.level) + '</p><p class="text-[10px] text-[#f5f0e6]/50">' + idx + '/' + total + '</p></div><div class="h-1.5 bg-[rgba(212,175,55,0.1)] rounded-full overflow-hidden mb-3"><div class="h-full bg-[#d4af37] rounded-full transition-all" style="width:' + pct + '%"></div></div>';
  }

  function tutorUpdateProgress() {
    var el = document.getElementById('tutor-progress');
    if (el) el.innerHTML = tutorProgressHtml();
  }

  function tutorShellHtml() {
    return '<div class="flex flex-col">' +
      '<div id="tutor-progress">' + tutorProgressHtml() + '</div>' +
      '<div id="tutor-messages" class="overflow-y-auto pr-1 mb-3" style="max-height:55vh"></div>' +
      '<div class="flex items-center gap-2 pt-3 border-t border-[rgba(212,175,55,0.15)]">' +
        '<input id="tutor-input" type="text" class="flex-1 bg-[rgba(20,18,15,0.9)] border border-[rgba(212,175,55,0.3)] rounded-xl px-4 py-2.5 text-sm text-[#f5f0e6] placeholder-[#f5f0e6]/40 focus:outline-none focus:border-[rgba(212,175,55,0.6)]" placeholder="Type your answer…" />' +
        '<button id="tutor-send" class="shrink-0 w-10 h-10 rounded-xl bg-[#d4af37] hover:bg-[#b8962e] transition text-[#14120f] font-bold flex items-center justify-center">' +
          ic('send', 'w-5 h-5') +
        '</button>' +
      '</div>' +
      (cfg().demo ? demoBanner() : '') +
      '</div>';
  }

  function tutorAppendUser(text) { tutorAppend(tutorBubble({ role: 'user', text: text })); }
  function tutorAppendRami(text, verdict) { tutorAppend(tutorBubble({ role: 'assistant', text: text, verdict: verdict })); }
  function tutorShowTyping() { tutorAppend(tutorTypingHtml()); }
  function tutorHideTyping() { tutorRemoveTyping(); }

  /* ---- Socratic session lifecycle ---- */

  async function startTutorSession(lessonId) {
    var lesson = null;
    if (lessonId) {
      for (var i = 0; i < TUTOR_LESSONS.length; i++) { if (TUTOR_LESSONS[i].id === lessonId) { lesson = TUTOR_LESSONS[i]; break; } }
    }
    if (!lesson) {
      var pc = window.IELTS_AUTH && window.IELTS_AUTH.getScoped ? window.IELTS_AUTH.getScoped('placement', null) : null;
      var weak = pc && pc.sections ? Object.keys(pc.sections).filter(function (k) { var s = pc.sections[k]; return s.t && (s.c / s.t) < 0.65; }) : [];
      var pool = weak.length ? TUTOR_LESSONS.filter(function (l) { return weak.indexOf(l.skill) >= 0; }) : TUTOR_LESSONS;
      lesson = pool[Math.floor(Math.random() * pool.length)];
    }
    tutorState = { lesson: lesson, stepIndex: 0, score: 0, attempts: 0, busy: false };
    ensureModal();
    openModal('Socratic Lesson — ' + lesson.title, tutorShellHtml());
    var inp = document.getElementById('tutor-input');
    var btn = document.getElementById('tutor-send');
    if (inp) inp.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); tutorUserSend(); } });
    if (btn) btn.addEventListener('click', tutorUserSend);
    if (lesson.intro) tutorAppendRami(lesson.intro);
    tutorShowNextStep();
  }

  function tutorShowNextStep() {
    if (!tutorState) return;
    var steps = tutorState.lesson.steps;
    while (tutorState.stepIndex < steps.length) {
      var step = steps[tutorState.stepIndex];
      if (step.type === 'teach') {
        tutorAppendRami(step.text);
        tutorState.stepIndex++;
        tutorUpdateProgress();
      } else {
        tutorAppendRami(step.prompt);
        tutorSetInput(true);
        return;
      }
    }
    tutorConclude();
  }

  function tutorConclude() {
    if (!tutorState) return;
    var lesson = tutorState.lesson;
    var qCount = lesson.steps.filter(function (s) { return s.type === 'question'; }).length;
    var pct = qCount ? Math.round((tutorState.score / qCount) * 100) : 0;
    var grade = pct >= 80 ? 'Strong' : pct >= 50 ? 'Developing' : 'Keep practising';
    tutorAppendRami(lesson.conclusion + '\n\nSession score: ' + tutorState.score + '/' + qCount + ' (' + pct + '%) — ' + grade + '.');
    var xp = Math.max(3, Math.round(tutorState.score * 2));
    track(lesson.skill, 'Tutor session: ' + lesson.title, xp);
    diag(lesson.skill, 'Tutor: ' + lesson.title, tutorState.score, qCount, { band: pct });
    tutorAppend('<div class="text-center mt-4">' + gradientBtn('Try another lesson', 'window.IELTS_AI.startTutorSession()') + '</div>');
    tutorSetInput(false);
    var inp = document.getElementById('tutor-input');
    if (inp) inp.placeholder = 'Lesson complete — close or start another.';
    tutorState = null;
  }

  function tutorUserSend() {
    if (!tutorState || tutorState.busy) return;
    var inp = document.getElementById('tutor-input');
    var text = (inp ? inp.value : '').trim();
    if (!text) return;
    inp.value = '';
    tutorAppendUser(text);
    tutorState.busy = true;
    tutorSetInput(false);
    tutorShowTyping();
    handleTeacherReply(text, { lesson: tutorState.lesson, stepIndex: tutorState.stepIndex }).then(function (res) {
      tutorHideTyping();
      if (!tutorState) return;
      tutorAppendRami(res.reply, res.verdict);
      tutorState.busy = false;
      if (res.lessonComplete) {
        tutorConclude();
      } else if (res.verdict === 'strong') {
        tutorState.score++;
        tutorState.stepIndex++;
        tutorState.attempts = 0;
        tutorUpdateProgress();
        tutorShowNextStep();
      } else {
        tutorState.attempts++;
        if (tutorState.attempts >= 3) {
          var st = tutorState.lesson.steps[tutorState.stepIndex];
          tutorAppendRami('Let me help — ' + (st && st.hint ? st.hint : 'review this carefully.') + ' Moving on.');
          tutorState.stepIndex++;
          tutorState.attempts = 0;
          tutorUpdateProgress();
          tutorShowNextStep();
        } else {
          tutorSetInput(true);
        }
      }
    }).catch(function () {
      tutorHideTyping();
      if (!tutorState) return;
      tutorAppendRami('Something interrupted — try again.');
      tutorState.busy = false;
      tutorSetInput(true);
    });
  }

  /* ---- Core exported functions ---- */

  async function evaluateUserResponse(response, step, opts) {
    opts = opts || {};
    if (!step || step.type !== 'question') return { verdict: 'strong', score: 1, feedback: '', correction: '' };
    var c = cfg();
    if (c.key || useProxy()) {
      try {
        var sys = 'You are ' + MENTOR.name + ' (' + MENTOR.ar + '), an expert IELTS tutor evaluating a student\'s answer in a Socratic lesson. Be encouraging but honest.';
        var usr = 'Lesson: ' + (opts.lessonTitle || 'English lesson') + '\nQuestion: ' + step.prompt + '\nStudent answer: ' + response + '\nExpected concepts: ' + (step.expected || []).join(', ') + '\n\nReturn ONLY strict JSON:\n{"verdict":"strong"|"developing"|"off-topic","score":0-100,"feedback":"one sentence of specific encouragement","correction":"corrected version if needed, else empty string"}';
        var raw = await gemini(sys, usr, true);
        var data = raw ? parseJson(raw) : null;
        if (data && data.verdict) {
          return {
            verdict: ['strong', 'developing', 'off-topic'].indexOf(data.verdict) >= 0 ? data.verdict : 'developing',
            score: Math.min(100, Math.max(0, parseInt(data.score) || 50)),
            feedback: String(data.feedback || '').trim().slice(0, 300),
            correction: String(data.correction || '').trim().slice(0, 200)
          };
        }
      } catch (e) { /* fall through to demo */ }
    }
    var expected = (step.expected || []).map(function (w) { return w.toLowerCase(); });
    var low = response.toLowerCase();
    var hits = expected.filter(function (w) { return low.indexOf(w) >= 0; }).length;
    var ratio = expected.length ? hits / expected.length : 0;
    var verdict = ratio >= 0.6 ? 'strong' : ratio > 0 ? 'developing' : 'off-topic';
    var fb = step.feedback || {};
    return {
      verdict: verdict,
      score: Math.round(ratio * 100),
      feedback: fb[verdict] || (verdict === 'strong' ? 'Good work — that shows understanding.' : verdict === 'developing' ? 'Almost — add more detail.' : 'Not quite. Reread the hint and try again.'),
      correction: ''
    };
  }

  async function handleTeacherReply(studentText, opts) {
    opts = opts || {};
    var lesson = opts.lesson;
    var stepIndex = opts.stepIndex || 0;
    if (!lesson) return { reply: 'No lesson active.', corrections: [], complete: true, lessonComplete: true, verdict: 'off-topic', score: 0 };
    var step = lesson.steps[stepIndex];
    if (!step || step.type !== 'question') return { reply: 'No question to evaluate.', corrections: [], complete: true, lessonComplete: true, verdict: 'strong', score: 0 };
    var ev = await evaluateUserResponse(studentText, step, { lessonTitle: lesson.title });
    var lessonComplete = ev.verdict === 'strong' && stepIndex >= lesson.steps.length - 1;
    var reply = ev.feedback;
    if (ev.correction) reply += '\n\n✏\uFE0F ' + ev.correction;
    if (!lessonComplete && ev.verdict === 'strong') reply += '\n\nNow for the next part…';
    if (ev.verdict !== 'strong') reply += '\n\n' + (step.hint || 'Try again — you are close.');
    return {
      reply: reply,
      corrections: ev.correction ? [{ original: studentText, corrected: ev.correction, why: ev.feedback }] : [],
      score: 0,
      verdict: ev.verdict,
      complete: false,
      lessonComplete: lessonComplete
    };
  }

  /* 28-day blended curriculum: IELTS tasks + core English mastery */
  const PLAN_TEMPLATE = [
    { title: 'Advanced Vocabulary SRS',           skill: 'vocab',    icon: 'vocab', section: 'training',     action: 'training',     desc: 'Start your AI SRS deck — learn 10 Band 8-9 words with collocations and review them in a daily spacing cycle.' },
    { title: 'Listening Fundamentals',             skill: 'listening', icon: 'listen', section: 'listening-master', action: 'listening', desc: 'Learn the Section 1 format and train yourself to predict answers from question words.' },
    { title: 'Reading Basics',                     skill: 'reading',  icon: 'read', section: 'readings',       action: 'readings',     desc: 'Practice skimming and scanning on a graded passage — time each attempt under exam pressure.' },
    { title: 'Grammar Correction Lab',             skill: 'grammar',  icon: 'write', section: 'training',       action: 'training',     desc: 'Write five sentences, find your repeated grammar slip, and correct it out loud three times.' },
    { title: 'Natural Phrasing',                   skill: 'grammar',  icon: 'speak', section: 'speaking-sim',   action: 'speaking',     desc: 'Re-record common answers until they sound like a native professional — short phrases, linked ideas.' },
    { title: 'Idioms & Collocations',              skill: 'idioms',   icon: 'idiom', section: 'training',       action: 'training',     desc: 'Learn five exam-safe idioms and place each one in a sentence about your daily routine.' },
    { title: 'Weekly Review + Exam',               skill: 'exam',     icon: 'clock', section: 'exam',           action: 'exam',         desc: 'Re-test the week’s words, idioms and grammar, then take the Weekly Exam.' },
    { title: 'SRS Vocab: Education & Work',        skill: 'vocab',    icon: 'vocab', section: 'training',       action: 'training',     desc: 'New AI word bank on education and career topics; add the words to your SRS deck before reviewing.' },
    { title: 'Listening Section 2',                skill: 'listening', icon: 'listen', section: 'listening-master', action: 'listening', desc: 'Master monologues and note-taking — predict the answer type before you listen.' },
    { title: 'Reading Passages',                   skill: 'reading',  icon: 'read', section: 'reading-hub',    action: 'reading-hub',  desc: 'Work through an academic passage and time each question type with a strict stopwatch.' },
    { title: 'Writing Task 2 Essay',               skill: 'writing',  icon: 'write', section: 'writing',        action: 'writing',      desc: 'Plan an opinion essay in 5 minutes, then write it with one clear idea per paragraph.' },
    { title: 'Speaking Part 2 Cue Card',           skill: 'speaking', icon: 'speak', section: 'speaking-sim',  action: 'speaking',     desc: 'Speak for two minutes on a cue card; structure the long turn with a mini story arc.' },
    { title: 'Grammar: Conditionals & Inversion',  skill: 'grammar',  icon: 'write', section: 'training',       action: 'training',     desc: 'Drill second/third conditionals and “Not only… / Had I…” inversions with five self-corrections.' },
    { title: 'Weekly Review + Exam',               skill: 'exam',     icon: 'clock', section: 'exam',           action: 'exam',         desc: 'Consolidate the week and sit the Weekly Exam under real timing.' },
    { title: 'SRS Vocab: Science & Environment',   skill: 'vocab',    icon: 'vocab', section: 'training',       action: 'training',     desc: 'Generate a science-themed AI word bank and attach each word to a mental image.' },
    { title: 'Listening Academic Monologue',       skill: 'listening', icon: 'listen', section: 'listening-master', action: 'listening', desc: 'Follow an academic talk and capture the gist first — detail only comes after gist.' },
    { title: 'Reading True/False/Not Given',       skill: 'reading',  icon: 'read', section: 'reading-hub',    action: 'reading-hub',  desc: 'Attack T/F/NG systematically: synonym = True, contradiction = False, unknown = Not Given.' },
    { title: 'Writing Task 1',                     skill: 'writing',  icon: 'write', section: 'writing',        action: 'writing',      desc: 'Describe a chart with an overview sentence first — the examiner looks for it within 30 seconds.' },
    { title: 'Speaking Part 3 Abstract Ideas',     skill: 'speaking', icon: 'speak', section: 'speaking-sim',  action: 'speaking',     desc: 'Discuss abstract questions with a claim-justify-example structure to sound like a trained professional.' },
    { title: 'Idioms in Context',                  skill: 'idioms',   icon: 'idiom', section: 'training',       action: 'training',     desc: 'Deploy today’s idioms inside a mini speech — meaning first, decoration second.' },
    { title: 'Weekly Review + Exam',               skill: 'exam',     icon: 'clock', section: 'exam',           action: 'exam',         desc: 'Full review of the week and the Weekly Exam under timed conditions.' },
    { title: 'Full Listening Test',                skill: 'listening', icon: 'listen', section: 'listening-master', action: 'listening', desc: 'All four sections in one timed sitting — no pausing, then mark yourself honestly.' },
    { title: 'Full Reading Test',                  skill: 'reading',  icon: 'read', section: 'reading-master', action: 'reading',     desc: 'Three passages in 60 minutes with a strict answer-transfer habit.' },
    { title: 'Full Writing Test',                  skill: 'writing',  icon: 'write', section: 'writing-coach',  action: 'writing',      desc: 'Task 1 + Task 2 in 60 minutes; budget 20 + 40 and leave five minutes to proofread.' },
    { title: 'Full Speaking Test',                 skill: 'speaking', icon: 'speak', section: 'speaking-sim',  action: 'speaking',     desc: 'All three parts back to back; record yourself and listen once for hesitation patterns.' },
    { title: 'SRS Vocab Review + Spelling',        skill: 'vocab',    icon: 'vocab', section: 'training',       action: 'training',     desc: 'Review the whole deck; spell every word out loud — spelling is an exam earner.' },
    { title: 'Grammar Deep Review',                skill: 'grammar',  icon: 'write', section: 'training',       action: 'training',     desc: 'Re-sit your placement grammar section and correct every slip from memory.' },
    { title: 'Final Exam + Celebration',           skill: 'exam',     icon: 'marker', section: 'exam',           action: 'exam',         desc: 'Take the Final Exam — then celebrate: you have built a complete English-mentor system.' }
  ];

  function weakSkills(profile) {
    const out = [];
    const s = (profile && profile.sections) || {};
    ['grammar', 'reading', 'listening'].forEach((k) => {
      const sec = s[k] || {};
      const pct = sec.t ? (sec.c / sec.t) : null;
      if (pct !== null && pct < 0.65) out.push(k);
    });
    return out;
  }

  function buildPlanDays(profile, focus) {
    const weight = {};
    PLAN_SKILLS.forEach((k) => { weight[k] = 0; });
    (focus || []).forEach((k) => { weight[k] = 1; });
    // weak skills get scheduled earlier inside each week so they are trained first
    const ordered = PLAN_TEMPLATE.map((t, i) => ({ t, i, w: weight[t.skill] || 0 }))
      .sort((a, b) => {
        const weekOf = (idx) => Math.floor(idx / 7);
        if (weekOf(a.i) !== weekOf(b.i)) return weekOf(a.i) - weekOf(b.i);
        if (b.w !== a.w) return b.w - a.w;
        return a.i - b.i;
      });
    return ordered.map(({ t }, dayIndex) => ({
      day: dayIndex + 1,
      title: t.title,
      skill: t.skill,
      icon: t.icon,
      section: t.section,
      action: sanitizeAction(t.action),
      desc: t.desc,
      mentor: MENTOR_TIPS[t.skill] || MENTOR_TIPS.vocab
    }));
  }

  function fallbackStudyPlan(profile) {
    const focus = weakSkills(profile);
    const levelName = (profile && profile.levelName) || 'A1 Beginner';
    const total = (profile && profile.total) || 26;
    const correct = (profile && profile.correct) || (total / 2);
    const focusTxt = focus.length
      ? 'Your weakest areas are ' + focus.map((f) => ({ grammar: 'Grammar', reading: 'Reading', listening: 'Listening' }[f])).join(', ') + ' — so this roadmap trains them first every week, interleaved with core English mastery.'
      : 'Your placement shows a balanced profile — this roadmap keeps every skill sharp with daily core-English mastery alongside IELTS tasks.';
    const pct = Math.round((correct / Math.max(1, total)) * 100);
    return {
      demo: true,
      summary: levelName + ' · ' + correct + '/' + total + ' on placement (' + pct + '%). ' + focusTxt,
      focus,
      level: levelName,
      days: buildPlanDays(profile, focus),
      generatedAt: Date.now()
    };
  }

  async function generateStudyPlan(opts) {
    opts = opts || {};
    const profile = opts.profile || {};
    const c = cfg();
    if (!c.key && !useProxy()) return fallbackStudyPlan(profile);
    const sys = 'You are a world-class IELTS mentor and native-English coach. Design a personalised 4-week (exactly 28 days) study roadmap that targets the student\'s weakest areas while blending IELTS skills (Academic Writing, Reading, Listening, Speaking) with core English mastery (Advanced Vocabulary SRS, Grammar correction, Natural phrasing, Idioms). Every day needs a concrete task and a one-sentence mentor tip that teaches the student HOW to think and speak like a native professional.';
    const usr = 'Profile: level=' + (profile.levelName || 'unknown') + ', correct=' + (profile.correct || 0) + '/' + (profile.total || 0) + ', section results=' + JSON.stringify(profile.sections || {}).slice(0, 300) + '.\nOutput ONLY strict JSON with 28 days:\n{"summary":"...","focus":["grammar","reading","listening"],"days":[{"day":1,"title":"...","skill":"listening|reading|writing|speaking|vocab|grammar|idioms|exam","icon":"🔥","section":"...","action":"listening|reading|readings|writing|speaking|catlango|training|reading-hub|learning-path|translator|exam","desc":"concrete task","mentor":"native-professional coaching tip"}...]}';
    const raw = await gemini(sys, usr, true);
    const data = raw ? parseJson(raw) : null;
    if (!data || !Array.isArray(data.days) || !data.days.length) return fallbackStudyPlan(profile);
    const days = data.days.slice(0, 28).map((d, i) => ({
      day: i + 1,
      title: String(d.title || ('Day ' + (i + 1))).trim().slice(0, 80),
      skill: PLAN_SKILLS.indexOf(String(d.skill)) >= 0 ? String(d.skill) : 'vocab',
      icon: String(d.icon || '📘').trim().slice(0, 4),
      section: String(d.section || 'training').trim().slice(0, 30),
      action: sanitizeAction(String(d.action)),
      desc: String(d.desc || '').trim().slice(0, 220),
      mentor: String(d.mentor || '').trim().slice(0, 220)
    }));
    return {
      demo: false,
      summary: String(data.summary || '').trim().slice(0, 400),
      focus: Array.isArray(data.focus) ? data.focus.map(String).filter((f) => ['grammar', 'reading', 'listening', 'writing', 'speaking'].indexOf(f) >= 0).slice(0, 4) : weakSkills(profile),
      level: profile.levelName,
      days,
      generatedAt: Date.now()
    };
  }

  /* ---------- roadmap storage (scoped 'studyplan') ---------- */
  function planStore() {
    let c = null;
    if (window.IELTS_AUTH) c = window.IELTS_AUTH.getScoped('studyplan', null);
    if (!c || typeof c !== 'object') c = {};
    return c;
  }
  function getStudyPlan() { return planStore().plan || null; }
  function saveStudyPlan(plan) {
    if (!window.IELTS_AUTH) return;
    const c = planStore();
    c.plan = plan;
    window.IELTS_AUTH.setScoped('studyplan', c);
  }

  function buildRoadmapFromPlacement(placementCache) {
    if (!placementCache || placementCache.completed !== true) return null;
    const profile = {
      levelName: (placementCache.lastLevel && placementCache.lastLevel.name) || 'Learner',
      correct: placementCache.lastScore,
      total: placementCache.lastTotal,
      sections: placementCache.sections
    };
    return generateStudyPlan({ profile }).then((plan) => {
      saveStudyPlan(plan);
      if (window.IELTS_AUTH) {
        try {
          if (window.IELTS_AUTH.completeClaim('ai-roadmap-' + plan.generatedAt)) {
            window.IELTS_AUTH.addXp(15);
            window.IELTS_AUTH.addActivity('study', mentorName() + ' generated a personalised 4-week roadmap (' + plan.days.length + ' days)', 15);
          }
        } catch (e) { /* ignore */ }
      }
      window.toast && window.toast(mentorName() + ' has built your roadmap — open Study Plan');
      return plan;
    }).catch(() => null);
  }

  function launchPlanDay(action) {
    try {
      if (window.STUDY_PLAN && window.STUDY_PLAN.launchTask) window.STUDY_PLAN.launchTask(action);
      else window.showSection && window.showSection(['listening-master', 'reading-master', 'readings', 'writing-coach', 'speaking-sim', 'catlango', 'training', 'reading-hub', 'learning-path', 'translator', 'exam'].indexOf(action) >= 0 ? action : 'training');
    } catch (e) { /* ignore */ }
  }

  /* ---------- roadmap UI ---------- */
  function roadmapCTA() {
    return '<div class="bg-gradient-to-r from-[rgba(212,175,55,0.16)] to-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.35)] rounded-2xl p-6 shadow-lg"><div class="flex flex-wrap items-center justify-between gap-4"><div class="flex items-center gap-3"><div class="w-14 h-14 rounded-full overflow-hidden bg-[#14120f] border-2 border-[rgba(212,175,55,0.6)] shadow-lg shrink-0">' + MENTOR_AVATAR + '</div><div><p class="font-extrabold text-[#f5f0e6] text-lg">' + esc(mentorLabel()) + ' <span class="text-[10px] font-bold uppercase tracking-widest bg-[rgba(212,175,55,0.15)] text-[#d4af37] border border-[rgba(212,175,55,0.35)] rounded-full px-2 py-0.5 align-middle">Master Control</span></p><p class="text-[15px] font-bold text-[#d4af37] mt-0.5">Your personalised 4-week roadmap</p><p class="text-[#f5f0e6]/70 text-sm mt-1 max-w-md">Complete the placement test and I will build your day-by-day plan — IELTS tasks blended with core English mastery, every day coached.</p></div></div><button class="px-6 py-2.5 rounded-lg text-sm font-bold text-[#14120f] bg-[#d4af37] hover:bg-[#b8962e] transition shadow" onclick="window.IELTS_AI && window.IELTS_AI.openRoadmapModal()">Generate my roadmap</button></div></div>';
  }

  function roadmapCardHtml(plan) {
    const badge = plan.demo
      ? '<span class="text-[10px] font-bold text-[#e879f9] bg-white/15 border border-white/30 px-1.5 py-0.5 rounded">demo</span>'
      : '<span class="text-[10px] font-bold text-emerald-300 bg-black/20 border border-white/30 px-1.5 py-0.5 rounded">AI live</span>';
    const focusChips = (plan.focus || []).length
      ? '<div class="flex flex-wrap gap-1.5 mt-2">' + plan.focus.map((f) => '<span class="text-[10px] font-bold text-white bg-[rgba(255,255,255,0.18)] border border-white/25 px-2 py-0.5 rounded-full capitalize">' + esc(f) + '</span>').join('') + '</div>'
      : '';
    return '<div class="bg-gradient-to-r from-[rgba(212,175,55,0.16)] to-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.35)] rounded-2xl p-6 shadow-lg">'
      + '<div class="flex flex-wrap items-start justify-between gap-4">'
      + '<div class="min-w-0 flex-1">'
      + '<div class="flex flex-wrap items-center gap-2 mb-1"><p class="font-extrabold text-white text-lg">' + esc(mentorLabel()) + ' · 4-Week Roadmap</p>' + badge + '</div>'
      + '<p class="text-white/85 text-sm leading-relaxed max-w-2xl">' + esc(plan.summary || '') + '</p>'
      + focusChips
      + '<p class="text-[11px] text-white/70 mt-3">' + (plan.days || []).length + ' daily tasks · writing sessions open in the ' + esc(mentorName()) + ' Writing Lab</p>'
      + '</div>'
      + '<div class="flex flex-col gap-2 shrink-0">'
      + '<button class="px-4 py-2 rounded-lg text-sm font-bold text-[#14120f] bg-[#d4af37] hover:bg-[#b8962e] transition shadow" onclick="window.IELTS_AI && window.IELTS_AI.openRoadmapModal()">Open full roadmap</button>'
      + '<button class="px-4 py-2 rounded-lg text-sm font-bold text-white border border-white/40 hover:bg-white/10 transition" onclick="window.IELTS_AI && window.IELTS_AI.regenerateRoadmap()">Regenerate</button>'
      + '</div>'
      + '</div>'
      + '</div>';
  }

  function mountRoadmap() {
    const root = $('#ai-roadmap-root');
    if (!root) return;
    const plan = getStudyPlan();
    root.innerHTML = plan ? roadmapCardHtml(plan) : roadmapCTA();
  }

  async function regenerateRoadmap() {
    const root = $('#ai-roadmap-root');
    if (root) root.innerHTML = '<div class="text-center py-8 bg-gradient-to-r from-[rgba(212,175,55,0.16)] to-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.35)] rounded-2xl"><div class="mx-auto w-10 h-10 rounded-full border-2 border-[rgba(212,175,55,0.4)] border-t-[#d4af37] animate-spin"></div><p class="text-sm text-[#f5f0e6]/90 mt-3">' + esc(mentorName()) + ' is designing your 4-week roadmap…</p></div>';
    let profile = null;
    try {
      const pc = window.IELTS_AUTH && window.IELTS_AUTH.getScoped ? window.IELTS_AUTH.getScoped('placement', null) : null;
      if (pc && pc.completed) profile = { levelName: (pc.lastLevel && pc.lastLevel.name) || 'Learner', correct: pc.lastScore, total: pc.lastTotal, sections: pc.sections };
    } catch (e) { /* ignore */ }
    const plan = await generateStudyPlan({ profile });
    saveStudyPlan(plan);
    mountRoadmap();
    if (window.IELTS_AUTH && window.IELTS_AUTH.completeClaim('ai-roadmap-' + plan.generatedAt)) {
      window.IELTS_AUTH.addXp(15);
      window.IELTS_AUTH.addActivity('study', 'Regenerated ' + mentorName() + ' roadmap', 15);
    }
    window.toast && window.toast(plan.demo ? 'Roadmap generated (demo)' : mentorName() + ' has built your roadmap');
  }

  function openRoadmapModal() {
    let plan = getStudyPlan();
    if (plan && openModal) {
      renderRoadmapModal(plan);
      return;
    }
    regenerateRoadmap().then(() => { const p = getStudyPlan(); if (p) renderRoadmapModal(p); });
  }

  function renderRoadmapModal(plan) {
    if (!plan) return;
    const weeks = [[], [], [], []];
    (plan.days || []).forEach((d) => { weeks[Math.floor((d.day - 1) / 7)] && weeks[Math.floor((d.day - 1) / 7)].push(d); });
    const weekHtml = weeks.map((wdays, wi) => {
      if (!wdays.length) return '';
      return '<div class="mb-4"><div class="flex items-center justify-between mb-2"><p class="text-sm font-extrabold text-[#d4af37]">Week ' + (wi + 1) + '</p><p class="text-[10px] text-[#f5f0e6]/50 uppercase tracking-widest">Days ' + (wi * 7 + 1) + '–' + (wi * 7 + wdays.length) + '</p></div><div class="space-y-2">' + wdays.map((d) => {
      const labBtn = (d.skill === 'writing' || d.action === 'writing')
        ? '<button class="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-[rgba(212,175,55,0.4)] hover:bg-[rgba(212,175,55,0.12)] transition" onclick="window.IELTS_AI && window.IELTS_AI.openWritingLab()">' + ic('write', 'w-3.5 h-3.5 inline-block mr-1 -mt-0.5') + 'Lab</button>'
        : '';
      return '<div class="bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.15)] rounded-xl px-4 py-3"><div class="flex items-center gap-3"><span class="shrink-0">' + dayIcon(d) + '</span><div class="min-w-0 flex-1"><p class="text-sm font-bold text-[#f5f0e6]">Day ' + d.day + ': ' + esc(d.title) + '</p><p class="text-xs text-[#f5f0e6]/65 mt-0.5">' + esc(d.desc) + '</p><p class="text-xs text-[#e879f9]/70 mt-1"><b class="text-[#e879f9]">' + esc(mentorName()) + ':</b> ' + esc(d.mentor || '—') + '</p></div><div class="flex flex-col gap-2 shrink-0">' + labBtn + '<button class="px-3 py-1.5 rounded-lg text-xs font-bold text-[#14120f] bg-[#d4af37] hover:bg-[#b8962e] transition shadow" onclick="window.IELTS_AI && window.IELTS_AI.launchPlanDay(\'' + d.action + '\')">Start</button></div></div></div>';
    }).join('') + '</div></div>';
    }).join('');
    const skills = plan.demo ? '<p class="text-[11px] text-[#f5f0e6]/50 italic mb-3">Built-in coaching roadmap — when live, mentor tips become fully personalised.</p>' : '';
    openModal(mentorLabel() + ' · 4-Week Roadmap', `
      <div class="bg-gradient-to-r from-[rgba(212,175,55,0.12)] to-transparent border border-[rgba(212,175,55,0.25)] rounded-xl p-4 mb-4">
        <p class="text-sm text-[#f5f0e6]/90 font-semibold mb-2">${esc(mentorGreeting())}</p>
        <p class="text-sm text-[#f5f0e6]/75 leading-relaxed">${esc(plan.summary || '')}</p>
        ${(plan.focus || []).length ? '<div class="flex flex-wrap gap-1.5 mt-2">' + plan.focus.map((f) => '<span class="text-[10px] font-bold text-[#d4af37] border border-[rgba(212,175,55,0.4)] px-2 py-0.5 rounded-full capitalize">Weak focus: ' + esc(f) + '</span>').join('') + '</div>' : ''}
      </div>
      ${skills}
      ${weekHtml}
      <div class="flex items-center justify-between gap-3 flex-wrap pt-2">
        <p class="text-xs text-[#f5f0e6]/50">Every day blends an IELTS task with core English mastery — writing days open ${esc(mentorName())}’s Writing Lab.</p>
        <button class="px-4 py-2 rounded-lg text-sm font-bold text-[#f5f0e6] border border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.1)] transition" onclick="window.IELTS_AI && window.IELTS_AI.regenerateRoadmap()">${ic('arrow', 'w-3.5 h-3.5 inline-block mr-1 -mt-0.5')}Regenerate</button>
      </div>`);
  }

  /* ============================================================
     Convenience entry points used by hub modules
     ============================================================ */
  async function evaluateBook(text, kind) {
    openEvaluationModal(text, kind);
    if (text && text.trim().length >= 40) return; // user can press Evaluate
  }

  function start() { ensureModal(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  window.IELTS_AI = {
    isLive: () => !!cfg().key,
    config: cfg,
    ensureModal: start,
    openModal, closeModal,
    openSettings, saveSettings, clearSettings,
    generateWordBank, generatePassage, evaluateWriting,
    openWordBankModal, openPassageModal, openLibraryModal, openLibraryItem, removeLibraryItem,
    openEvaluationModal, evaluateBook,
    wordBankLive, wordBankAddOne, wordBankAddAll, wordBankSaveLib,
    passageLive, passageSaveLib,
    evalLive, evalSaveLib, copyRewrite,
    openWritingLab, writingLabLive,
    renderPassagePractice, practiceCheck,
    listByKind, removeFromLibrary,
    generateStudyPlan, getStudyPlan, saveStudyPlan, buildRoadmapFromPlacement,
    mountRoadmap, regenerateRoadmap, openRoadmapModal, launchPlanDay,
    mentorTipFor, generatePlacementTest, analyzePlacement,
    teacherChat,
    startTutorSession, handleTeacherReply, evaluateUserResponse,
    MENTOR_AVATAR
  };
})();