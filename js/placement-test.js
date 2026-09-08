/* ============================================================
   IELTS Master — Level Placement Test
   Diagnostic test across Grammar, Reading, and Listening sections.
   Auto-scores → LEVELS lookup → updates XP + Supabase profile.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const PLACEMENT_XP = 50;
  const state = { view: 'home', qi: 0, answers: {}, score: 0, section: 'grammar', timer: { running: false, seconds: 0, interval: null }, result: null };

  /* ---------- test questions ---------- */
  /* Grammar: 12 questions across A1–C1 */
  const GRAMMAR = [
    { id: 'g1', level: 'a1', q: 'She ___ to school every day.', opts: ['go', 'goes', 'going', 'gone'], ans: 'B', tip: 'Third person singular uses -s/-es.' },
    { id: 'g2', level: 'a1', q: 'There ___ a cat on the roof.', opts: ['is', 'are', 'has', 'have'], ans: 'A', tip: '"There is" with a singular noun.' },
    { id: 'g3', level: 'a2', q: 'I ___ here since 2020.', opts: ['live', 'lived', 'have lived', 'am living'], ans: 'C', tip: 'Present perfect for unfinished time periods.' },
    { id: 'g4', level: 'a2', q: 'She was tired, ___ she kept working.', opts: ['and', 'but', 'or', 'so'], ans: 'B', tip: '"But" shows contrast.' },
    { id: 'g5', level: 'a2', q: 'By the time we arrived, the train ___.', opts: ['left', 'has left', 'had left', 'was leaving'], ans: 'C', tip: 'Past perfect for an action before another past action.' },
    { id: 'g6', level: 'b1', q: 'If I ___ rich, I would travel the world.', opts: ['am', 'was', 'were', 'be'], ans: 'C', tip: 'Second conditional uses "were" for all persons.' },
    { id: 'g7', level: 'b1', q: 'The book ___ by J.K. Rowling is very popular.', opts: ['writing', 'written', 'wrote', 'write'], ans: 'B', tip: 'Past participle in a passive/reduced clause.' },
    { id: 'g8', level: 'b1', q: 'He asked me where I ___.', opts: ['live', 'lived', 'had lived', 'am living'], ans: 'B', tip: 'Reported speech backshifts the tense.' },
    { id: 'g9', level: 'b2', q: 'Not only ___ the exam, but she also got the highest score.', opts: ['she passed', 'did she pass', 'she did pass', 'passed she'], ans: 'B', tip: 'Inversion after "not only" at the start of a clause.' },
    { id: 'g10', level: 'b2', q: 'Had I known about the meeting, I ___ attended.', opts: ['would', 'would have', 'will', 'have'], ans: 'B', tip: 'Third conditional with inversion: Had I known… I would have…' },
    { id: 'g11', level: 'c1', q: 'The report ___ to have been completed by Friday.', opts: ['claims', 'is claimed', 'claimed', 'claiming'], ans: 'B', tip: 'Passive infinitive in a reporting structure.' },
    { id: 'g12', level: 'c1', q: 'So absorbed ___ in her book that she didn\'t hear the doorbell.', opts: ['she was', 'was she', 'she is', 'is she'], ans: 'B', tip: 'Inversion after "so… that" at the start of a clause.' }
  ];

  /* Reading: 8 passages with MCQ */
  const READING = [
    {
      id: 'r1', level: 'a1', passage: 'My name is Sara. I am 12 years old. I live in a small town. I go to school every day. I like reading books and playing with my friends.',
      q: 'How old is Sara?', opts: ['10', '11', '12', '13'], ans: 'C', tip: 'Direct detail: "I am 12 years old."' },
    {
      id: 'r2', level: 'a2', passage: 'The library is open from Monday to Saturday, 9 a.m. to 5 p.m. It is closed on Sundays. You can borrow up to five books at a time. You must return them within two weeks.',
      q: 'How many books can you borrow at once?', opts: ['Three', 'Four', 'Five', 'Six'], ans: 'C', tip: '"You can borrow up to five books at a time."' },
    {
      id: 'r3', level: 'b1', passage: 'Climate change is one of the most serious challenges facing the world today. Rising temperatures are causing glaciers to melt, sea levels to rise, and weather patterns to become more extreme. Scientists agree that human activity, particularly the burning of fossil fuels, is the primary cause of these changes.',
      q: 'What do scientists say is the main cause of climate change?', opts: ['Natural weather cycles', 'Human activity', 'Volcanic eruptions', 'Solar radiation'], ans: 'B', tip: '"Scientists agree that human activity… is the primary cause."' },
    {
      id: 'r4', level: 'b1', passage: 'Many cities are now investing in cycling infrastructure to reduce traffic congestion and improve air quality. Amsterdam and Copenhagen are often cited as examples of cities that have successfully encouraged cycling through dedicated lanes, secure parking and affordable bike-sharing schemes.',
      q: 'Why are cities investing in cycling infrastructure?', opts: ['To increase car sales', 'To reduce congestion and pollution', 'To attract tourists', 'To build new roads'], ans: 'B', tip: '"to reduce traffic congestion and improve air quality"' },
    },
    {
      id: 'r5', level: 'b2', passage: 'The concept of "food miles" — the distance food travels from farm to plate — has gained attention as consumers become more aware of the environmental impact of their choices. However, research suggests that transportation accounts for only about 11% of food-related greenhouse gas emissions. Production methods, storage and packaging are often far more significant factors.',
      q: 'What percentage of food-related emissions comes from transportation?', opts: ['About 5%', 'About 11%', 'About 25%', 'About 50%'], ans: 'B', tip: '"transportation accounts for only about 11%"' },
    {
      id: 'r6', level: 'b2', passage: 'Studies show that bilingual children often outperform monolingual peers in tasks requiring cognitive flexibility and problem-solving. This advantage, known as the "bilingual advantage," is thought to arise because managing two languages constantly exercises the brain\'s executive function systems.',
      q: 'What is the "bilingual advantage" attributed to?', opts: ['Better memory', 'Higher intelligence', 'Exercising executive function', 'More education'], ans: 'C', tip: '"managing two languages constantly exercises the brain\'s executive function systems"' },
    {
      id: 'r7', level: 'c1', passage: 'Quantum computing represents a paradigm shift in processing power. Unlike classical computers, which process information in binary (0s and 1s), quantum computers use qubits that can exist in multiple states simultaneously through a phenomenon called superposition. This allows quantum machines to solve certain complex problems exponentially faster than their classical counterparts, though practical, large-scale quantum computers remain largely theoretical.',
      q: 'What allows quantum computers to process information faster than classical computers?', opts: ['Larger memory capacity', 'Multiple binary states', 'Superposition of qubits', 'Faster electricity flow'], ans: 'C', tip: '"qubits that can exist in multiple states simultaneously through… superposition"' },
    {
      id: 'r8', level: 'c1', passage: 'The paradox of choice suggests that while some choice is better than none, an abundance of options can lead to decision fatigue, anxiety and reduced satisfaction. Psychologist Barry Schwartz argues that modern consumers face far more choices than previous generations, and this "overchoice" often results in less happiness rather than more.',
      q: 'According to the passage, what is the paradox of choice?', opts: ['More choice always leads to more happiness', 'Some choice is better than none, but too much causes problems', 'People prefer fewer options', 'Consumers make better decisions with more options'], ans: 'B', tip: '"while some choice is better than none, an abundance of options can lead to decision fatigue"' }
  ];

  /* Listening: 6 script-based questions (simulated — user reads the script) */
  const LISTENING = [
    {
      id: 'l1', level: 'a1',
      script: 'WOMAN: What time does the train leave? MAN: It leaves at half past three. WOMAN: Is that 3:15 or 3:30? MAN: 3:30. We should arrive at the station by 3:15.',
      q: 'What time does the train leave?', opts: ['3:15', '3:30', '3:00', '3:45'], ans: 'B', tip: '"It leaves at half past three" = 3:30.' },
    {
      id: 'l2', level: 'a2',
      script: 'RECEPTIONIST: Good morning, Health Clinic. How can I help you? PATIENT: I\'d like to make an appointment with Dr. Khan, please. RECEPTIONIST: The earliest available is Thursday at 2:15 p.m. PATIENT: That\'s fine, thank you.',
      q: 'When is the patient\'s appointment?', opts: ['Thursday at 12:15', 'Thursday at 2:15', 'Friday at 2:15', 'Thursday at 2:45'], ans: 'B', tip: '"Thursday at 2:15 p.m."' },
    {
      id: 'l3', level: 'b1',
      script: 'LECTURER: Today we\'ll discuss renewable energy. Wind power has grown rapidly over the last decade — global capacity increased from 240 gigawatts in 2011 to over 740 gigawatts by 2020. However, the main challenge remains energy storage, since wind is intermittent.',
      q: 'What does the lecturer say is the main challenge of wind power?', opts: ['High cost', 'Energy storage', 'Lack of government support', 'Noise pollution'], ans: 'B', tip: '"the main challenge remains energy storage, since wind is intermittent"' },
    {
      id: 'l4', level: 'b2',
      script: 'INTERVIEWER: What inspired you to start your own business? ENTREPRENEUR: I was working in a large corporation for ten years, but I felt I wasn\'t making a real difference. I wanted to create something from scratch — something that directly solved a problem I\'d seen firsthand in the healthcare industry.',
      q: 'Why did the entrepreneur leave the corporation?', opts: ['Low salary', 'Health problems', 'Wanted to make a direct impact', 'The company went bankrupt'], ans: 'C', tip: '"I felt I wasn\'t making a real difference… I wanted to create something from scratch"' },
    {
      id: 'l5', level: 'c1',
      script: 'PROFESSOR: While the initial findings appear promising, we must exercise caution in drawing broad conclusions. The sample size was limited to 200 participants in a single region, and the study\'s duration — only three months — may not capture long-term effects. Future research should aim for larger, more diverse cohorts.',
      q: 'What concern does the professor raise about the study?', opts: ['The methodology was flawed', 'The sample size and duration were too limited', 'The results were insignificant', 'The researchers lacked funding'], ans: 'B', tip: '"sample size was limited to 200… duration — only three months — may not capture long-term effects"' },
    {
      id: 'l6', level: 'c1',
      script: 'AIRPORT ANNOUNCEMENT: Attention passengers: Flight BA247 to Istanbul, originally scheduled for 4:10 p.m., has been delayed until 5:45 p.m. due to adverse weather conditions. We apologise for the inconvenience. Passengers are advised to proceed to Gate 14 once the updated departure time is confirmed.',
      q: 'What caused the flight delay?', opts: ['Technical problem', 'Crew shortage', 'Adverse weather', 'Passenger overcrowding'], ans: 'C', tip: '"delayed… due to adverse weather conditions"' }
  ];

  const ALL_QUESTIONS = [
    ...GRAMMAR.map((q) => ({ ...q, section: 'grammar' })),
    ...READING.map((q) => ({ ...q, section: 'reading' })),
    ...LISTENING.map((q) => ({ ...q, section: 'listening' }))
  ];

  /* ---------- helpers ---------- */
  function fmtTime(s) { return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }

  function cache() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return null;
    let c = window.IELTS_AUTH.getScoped('placement', null);
    if (!c) { c = { lastScore: null, lastLevel: null, completed: false }; window.IELTS_AUTH.setScoped('placement', c); }
    return c;
  }
  function save(c) { window.IELTS_AUTH.setScoped('placement', c); }

  function startTimer() {
    stopTimer();
    state.timer = { running: true, seconds: 0, interval: null };
    state.timer.interval = setInterval(() => {
      state.timer.seconds++;
      const el = $('#pt-timer');
      if (el) el.textContent = fmtTime(state.timer.seconds);
    }, 1000);
  }
  function stopTimer() { state.timer.running = false; clearInterval(state.timer.interval); }

  function getLevel(score, total) {
    const pct = total ? score / total : 0;
    const LEVELS = (window.IELTS_DATA && window.IELTS_DATA.LEVELS) || [];
    if (pct >= 0.90) return LEVELS.find((l) => l.id === 'c2') || LEVELS[5];
    if (pct >= 0.78) return LEVELS.find((l) => l.id === 'c1') || LEVELS[4];
    if (pct >= 0.63) return LEVELS.find((l) => l.id === 'b2') || LEVELS[3];
    if (pct >= 0.45) return LEVELS.find((l) => l.id === 'b1') || LEVELS[2];
    if (pct >= 0.28) return LEVELS.find((l) => l.id === 'a2') || LEVELS[1];
    return LEVELS[0] || { id: 'a1', name: 'A1 Beginner', minXp: 0 };
  }

  /* ---------- render ---------- */
  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) { window.IELTS_AUTH.showScreen(); return; }
    if (state.view === 'taking') { renderTaking(); return; }
    if (state.view === 'result') { renderResult(); return; }

    state.view = 'home';
    const c = cache();

    $('#placement-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <h2 class="text-2xl font-extrabold text-[#f5f0e6]">📋 Level Placement Test</h2>
        <p class="text-sm text-[#f5f0e6]/60 mt-1">Find your CEFR level with a comprehensive diagnostic test across Grammar, Reading, and Listening.</p>
      </div>

      ${c.completed ? `
        <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-5 mb-5">
          <p class="text-sm text-[#f5f0e6]/70 mb-1">Your current level:</p>
          <p class="text-xl font-extrabold text-[#d4af37]">${esc(c.lastLevel ? c.lastLevel.name : 'A1 Beginner')}</p>
          <p class="text-xs text-[#f5f0e6]/50 mt-1">Last score: ${c.lastScore != null ? (c.lastScore) + '/' + ALL_QUESTIONS.length : '—'}</p>
        </div>` : ''}

      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl p-5">
          <p class="text-2xl mb-2">📝</p>
          <h3 class="text-sm font-bold text-[#f5f0e6]">Grammar</h3>
          <p class="text-xs text-[#f5f0e6]/60 mt-1">${GRAMMAR.length} questions — A1 to C1 difficulty</p>
        </div>
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl p-5">
          <p class="text-2xl mb-2">📖</p>
          <h3 class="text-sm font-bold text-[#f5f0e6]">Reading</h3>
          <p class="text-xs text-[#f5f0e6]/60 mt-1">${READING.length} passages — A1 to C1 difficulty</p>
        </div>
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl p-5">
          <p class="text-2xl mb-2">🎧</p>
          <h3 class="text-sm font-bold text-[#f5f0e6]">Listening</h3>
          <p class="text-xs text-[#f5f0e6]/60 mt-1">${LISTENING.length} scripts — A1 to C1 difficulty</p>
        </div>
      </div>

      <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-5 mb-6">
        <p class="text-sm font-semibold text-[#f5f0e6] mb-2">How it works</p>
        <ul class="text-xs text-[#f5f0e6]/70 space-y-1">
          <li>• ${ALL_QUESTIONS.length} questions total · ~15–20 minutes</li>
          <li>• Questions increase in difficulty within each section</li>
          <li>• Your score maps to a CEFR level (A1 → C2)</li>
          <li>• Your profile level and XP will be updated automatically</li>
          <li>• You earn +${PLACEMENT_XP} XP for completing the test</li>
        </ul>
      </div>

      <div class="text-center">
        <button class="btn-primary text-lg px-8 py-3" onclick="IELTS_PLACEMENT.start()">${c.completed ? '🔁 Retake Test' : '🚀 Start Placement Test'}</button>
      </div>`;
  }

  function start() {
    state.qi = 0;
    state.answers = {};
    state.score = 0;
    state.section = 'grammar';
    state.result = null;
    state.view = 'taking';
    startTimer();
    render();
  }

  function renderTaking() {
    const q = ALL_QUESTIONS[state.qi];
    if (!q) { finish(); return; }
    const total = ALL_QUESTIONS.length;
    const sectionLabel = q.section === 'grammar' ? '📝 Grammar' : q.section === 'reading' ? '📖 Reading' : '🎧 Listening';
    const progressPct = ((state.qi) / total) * 100;

    const passageHtml = q.passage
      ? `<div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.1)] rounded-xl p-4 mb-4">
          <p class="text-xs font-semibold text-[#d4af37]/70 mb-1">Passage:</p>
          <p class="text-sm text-[#f5f0e6]/70 leading-relaxed">${esc(q.passage)}</p>
        </div>`
      : '';

    const scriptHtml = q.script
      ? `<div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.1)] rounded-xl p-4 mb-4">
          <p class="text-xs font-semibold text-[#d4af37]/70 mb-1">Audio script (simulated):</p>
          <p class="text-sm text-[#f5f0e6]/70 leading-relaxed italic">${esc(q.script)}</p>
        </div>`
      : '';

    const optsHtml = q.opts.map((o, i) => {
      const letter = String.fromCharCode(65 + i);
      const sel = state.answers[state.qi] === letter;
      return `<button type="button" class="text-left w-full bg-[rgba(20,18,15,0.85)] backdrop-blur-md border ${sel ? 'border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.15)]' : 'border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.4)]'} rounded-lg px-4 py-3 transition-all flex items-center gap-3" onclick="IELTS_PLACEMENT.answer('${letter}')">
        <span class="inline-block w-5 text-[#f5f0e6]/40 font-semibold">${letter}</span>
        <span class="text-sm text-[#f5f0e6]">${esc(o)}</span>
      </button>`;
    }).join('');

    $('#placement-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <span class="text-xs font-bold text-[#d4af37]">${esc(sectionLabel)}</span>
            <h3 class="text-lg font-extrabold text-[#f5f0e6] mt-1">Q${state.qi + 1} / ${total}</h3>
          </div>
          <div id="pt-timer" class="font-mono text-sm font-bold text-[#d4af37] bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.3)] px-4 py-2 rounded-lg">${fmtTime(state.timer.seconds)}</div>
        </div>
        <div class="h-2 bg-[rgba(20,18,15,0.85)] rounded-full overflow-hidden mb-5">
          <div class="h-full bg-gradient-to-r from-[#d4af37] to-[#f5f0e6] rounded-full transition-all" style="width:${progressPct}%"></div>
        </div>
        ${passageHtml}${scriptHtml}
        <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.1)] rounded-xl p-4 mb-5">
          <p class="text-sm font-medium text-[#f5f0e6]">${esc(q.q)}</p>
        </div>
        <div class="grid gap-2 mb-5">${optsHtml}</div>
        <div class="flex justify-between">
          <button class="btn-secondary text-sm ${state.qi === 0 ? 'invisible' : ''}" onclick="IELTS_PLACEMENT.prev()">← Back</button>
          <button class="btn-primary text-sm" onclick="IELTS_PLACEMENT.next()">${state.qi === total - 1 ? 'Finish' : 'Next →'}</button>
        </div>
      </div>`;
  }

  function answer(letter) { state.answers[state.qi] = letter; renderTaking(); }
  function prev() { if (state.qi > 0) { state.qi--; renderTaking(); } }
  function next() { if (state.qi < ALL_QUESTIONS.length - 1) { state.qi++; renderTaking(); } else { finish(); } }

  function finish() {
    stopTimer();
    let correct = 0;
    const details = ALL_QUESTIONS.map((q, i) => {
      const ua = state.answers[i];
      const isCorrect = ua && ua.toLowerCase() === q.ans.toLowerCase();
      if (isCorrect) correct++;
      return { question: q.q, userAnswer: ua || '—', correctAnswer: q.ans, isCorrect, tip: q.tip, section: q.section, level: q.level };
    });

    const total = ALL_QUESTIONS.length;
    const detectedLevel = getLevel(correct, total);

    /* update user XP to match detected level */
    const user = window.IELTS_AUTH.getCurrentUser();
    if (user && detectedLevel.minXp > user.xp) {
      const xpToAdd = detectedLevel.minXp - user.xp;
      window.IELTS_AUTH.addXp(xpToAdd);
    } else if (user && window.IELTS_AUTH.completeClaim('placement-first')) {
      window.IELTS_AUTH.addXp(PLACEMENT_XP);
    }

    window.IELTS_AUTH.addActivity('placement', 'Completed placement test: ' + detectedLevel.name + ' (' + correct + '/' + total + ')', PLACEMENT_XP);

    /* Supabase profile update */
    try {
      if (user && window.IELTS_DB && window.IELTS_DB.upsertProfile) {
        window.IELTS_DB.upsertProfile(user.id, { level: detectedLevel.id, levelName: detectedLevel.name, placementScore: correct, placementTotal: total, placementPct: Math.round((correct / total) * 100) });
      }
    } catch (e) { /* offline or no supabase */ }

    const c = cache();
    c.lastScore = correct;
    c.lastLevel = detectedLevel;
    c.completed = true;
    save(c);

    window.toast && window.toast('+' + PLACEMENT_XP + ' XP! Your level: ' + detectedLevel.name);

    state.view = 'result';
    state.result = { correct, total, detectedLevel, details };
    render();
  }

  function renderResult() {
    const r = state.result;
    if (!r) return;
    const pct = Math.round((r.correct / r.total) * 100);
    const bySection = { grammar: { c: 0, t: 0 }, reading: { c: 0, t: 0 }, listening: { c: 0, t: 0 } };
    r.details.forEach((d) => { bySection[d.section].t++; if (d.isCorrect) bySection[d.section].c++; });

    const sectionBar = (label, icon, sec) => {
      const secPct = sec.t ? Math.round((sec.c / sec.t) * 100) : 0;
      return `
        <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-bold text-[#f5f0e6]">${icon} ${label}</span>
            <span class="text-sm font-bold ${secPct >= 60 ? 'text-emerald-400' : 'text-[#d4af37]'}">${sec.c}/${sec.t}</span>
          </div>
          <div class="h-2 bg-[rgba(245,240,230,0.1)] rounded-full overflow-hidden">
            <div class="h-full ${secPct >= 60 ? 'bg-emerald-500' : 'bg-[#d4af37]'} rounded-full transition-all" style="width:${secPct}%"></div>
          </div>
        </div>`;
    };

    const reviewRows = r.details.map((d, i) => `
      <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.1)] rounded-lg p-3">
        <div class="flex items-start gap-2">
          <span class="text-sm">${d.isCorrect ? '✅' : '❌'}</span>
          <div>
            <p class="text-xs font-semibold text-[#f5f0e6]">Q${i + 1} — ${esc(d.question)}</p>
            ${!d.isCorrect ? `<p class="text-xs text-[#f5f0e6]/50 mt-1">Your: <span class="text-[#f5f0e6]/70">${esc(d.userAnswer)}</span> · Correct: <span class="text-[#d4af37]">${esc(d.correctAnswer)}</span></p>` : ''}
            <p class="text-xs text-[#f5f0e6]/40 mt-1">💡 ${esc(d.tip)}</p>
          </div>
        </div>
      </div>`).join('');

    $('#placement-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-8 text-center mb-6">
        <p class="text-6xl mb-3">${r.detectedLevel.icon}</p>
        <p class="text-3xl font-extrabold text-[#d4af37]">${esc(r.detectedLevel.name)}</p>
        <p class="text-lg text-[#f5f0e6]/70 mt-2">${r.correct} / ${r.total} correct · ${pct}%</p>
        <p class="text-sm text-[#f5f0e6]/50 mt-1">Time: ${fmtTime(state.timer.seconds)}</p>
        <p class="text-sm text-[#f5f0e6]/60 mt-3">${esc(r.detectedLevel.desc)}</p>
      </div>

      <div class="grid md:grid-cols-3 gap-4 mb-6">
        ${sectionBar('Grammar', '📝', bySection.grammar)}
        ${sectionBar('Reading', '📖', bySection.reading)}
        ${sectionBar('Listening', '🎧', bySection.listening)}
      </div>

      <h3 class="text-lg font-bold text-[#f5f0e6] mb-4">Detailed Review</h3>
      <div class="space-y-2 mb-6">${reviewRows}</div>

      <div class="flex gap-3">
        <button class="btn-secondary text-sm" onclick="IELTS_PLACEMENT.back()">← Back</button>
        <button class="btn-primary text-sm" onclick="IELTS_PLACEMENT.start()">🔁 Retake</button>
      </div>`;
  }

  function back() { stopTimer(); state.view = 'home'; render(); }

  window.IELTS_PLACEMENT = { render, start, answer, prev, next, back };
})();
