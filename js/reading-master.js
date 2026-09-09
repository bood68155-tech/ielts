/* ============================================================
   IELTS PA — Reading Master Suite
   Full Band 1-9 graded passage library with timed exams,
   automatic scoring, and Band-specific answer analysis.
   ============================================================ */
(function () {
  'use strict';
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const state = { view: 'home', pt: null, qi: 0, answers: {}, running: false, timer: { remaining: 0, interval: null } };

  /* Passage bank: [band, title, passage, questions[], timerMin] */
  const PASSAGES = [
    {
      band: '3.0', title: 'A Day at the Farm', timerMin: 10, levelLabel: 'Foundation',
      text: 'Tom lives on a small farm with his parents. Every morning he feeds the chickens and collects the eggs. After breakfast, he helps his father in the field. They grow potatoes and carrots. On Saturdays, Tom\'s mother sells vegetables at the market in town. Tom likes Saturdays best because he can eat an ice cream after the work is done.',
      questions: [
        { q: 'What does Tom do every morning?', opts: ['Collects eggs', 'Goes to school', 'Sells vegetables', 'Feeds the sheep'], a: 'A', exp: 'The passage says "Every morning he feeds the chickens and collects the eggs."' },
        { q: 'What do Tom and his father grow?', opts: ['Apples and pears', 'Potatoes and carrots', 'Rice and corn', 'Tomatoes and peas'], a: 'B', exp: '"They grow potatoes and carrots."' },
        { q: 'When does his mother sell vegetables?', opts: ['On Sundays', 'On Saturdays', 'Every morning', 'After school'], a: 'B', exp: '"On Saturdays, Tom\'s mother sells vegetables at the market."' },
        { q: 'Why does Tom like Saturdays?', opts: ['He has no work', 'He eats ice cream', 'He visits friends', 'He buys toys'], a: 'B', exp: '"Tom likes Saturdays best because he can eat an ice cream."' },
        { q: 'Where is the market?', opts: ['In town', 'On the farm', 'By the lake', 'In the field'], a: 'A', exp: '"his mother sells vegetables at the market in town."' }
      ]
    },
    {
      band: '4.0', title: 'The History of Tea', timerMin: 15, levelLabel: 'Foundation',
      text: 'Tea is the most widely consumed drink in the world after water. According to legend, Chinese Emperor Shen Nong discovered tea around 2737 BCE when a leaf from a wild tree blew into his boiling water. For centuries, tea was consumed mainly in China and Japan for its medicinal properties. It was not until the 1600s that Dutch and Portuguese traders introduced tea to Europe, where it quickly became fashionable among the wealthy. By the 1700s, Britain had become the greatest tea-consuming nation, developing a taste that led to the famous East India trading routes.',
      questions: [
        { q: 'When was tea discovered, according to legend?', opts: ['Around 1600', 'Around 2737 BCE', 'In the 1700s', 'In the 1800s'], a: 'B', exp: '"Chinese Emperor Shen Nong discovered tea around 2737 BCE."' },
        { q: 'How was tea used for centuries?', opts: ['As money', 'For medicinal properties', 'As fuel', 'For building'], a: 'B', exp: 'Tea was consumed "mainly in China and Japan for its medicinal properties."' },
        { q: 'Who introduced tea to Europe?', opts: ['British traders', 'Dutch and Portuguese traders', 'French sailors', 'Japanese merchants'], a: 'B', exp: '"Dutch and Portuguese traders introduced tea to Europe."' },
        { q: 'Which nation became the greatest tea consumer?', opts: ['China', 'Japan', 'Britain', 'Holland'], a: 'C', exp: '"Britain had become the greatest tea-consuming nation."' },
        { q: 'What does the passage say tea led to?', opts: ['The discovery of America', 'The East India trading routes', 'The Industrial Revolution', 'The invention of boiling water'], a: 'B', exp: '"developing a taste that led to the famous East India trading routes."' }
      ]
    },
    {
      band: '5.0', title: 'Urban Green Spaces', timerMin: 20, levelLabel: 'Intermediate',
      text: 'Parks and green spaces are more than just decoration in a city; they are essential to the health and well-being of urban residents. Research has consistently shown that access to green areas reduces stress, encourages physical activity, and improves mental health. City planners now recognise that trees can lower summer temperatures by several degrees, reducing the need for air conditioning. Furthermore, green spaces absorb rainwater, helping to prevent flooding in urban areas. However, as cities expand, protecting existing green spaces and creating new ones requires careful planning and community support.',
      questions: [
        { q: 'What is the main idea of this passage?', opts: ['Cities should be built without trees', 'Green spaces are essential for urban health', 'Air conditioning is harmful', 'Flooding is unavoidable'], a: 'B', exp: 'The passage argues green spaces are "essential to the health and well-being of urban residents."' },
        { q: 'Which benefit of trees is mentioned?', opts: ['They filter noise', 'They lower summer temperatures', 'They attract tourists', 'They increase humidity'], a: 'B', exp: '"trees can lower summer temperatures by several degrees."' },
        { q: 'How do green spaces help with flooding?', opts: ['They block floodwater', 'They absorb rainwater', 'They store water in pipes', 'They slow winds'], a: 'B', exp: '"green spaces absorb rainwater, helping to prevent flooding."' },
        { q: 'What does the passage say about city expansion?', opts: ['It needs careful planning to protect green space', 'It makes green spaces unnecessary', 'It is always harmful', 'It reduces the need for parks'], a: 'A', exp: '"protecting existing green spaces and creating new ones requires careful planning."' },
        { q: 'Why is the word "essential" used in the first sentence?', opts: ['To show parks are optional', 'To emphasise their importance', 'To describe their beauty', 'To compare them to decoration'], a: 'B', exp: '"essential" means of the greatest importance — used to emphasise how vital green spaces are.' }
      ]
    },
    {
      band: '6.0', title: 'The Psychology of Decision Making', timerMin: 20, levelLabel: 'Intermediate',
      text: 'When people make decisions, they rarely act as purely rational calculators. Nobel Prize-winning psychologist Daniel Kahneman described two systems of thinking: System 1, which is fast, automatic and intuitive, and System 2, which is slower, more deliberate and logical. Most everyday decisions rely on System 1, which is why people often make choices based on habit or emotion rather than careful analysis. This tendency, known as cognitive bias, can lead to systematic errors. For example, the "anchoring effect" shows that when people are presented with an initial reference point, even a random one, their subsequent judgements are unconsciously influenced by it.',
      questions: [
        { q: 'According to the passage, how do people typically make decisions?', opts: ['As purely rational calculators', 'Rarely in a purely rational way', 'Only after careful analysis', 'Always with logical reasoning'], a: 'B', exp: '"they rarely act as purely rational calculators."' },
        { q: 'Which of these describes System 1 thinking?', opts: ['Slow and logical', 'Reflective and careful', 'Fast and automatic', 'Emotional and wrong'], a: 'C', exp: 'System 1 is "fast, automatic and intuitive."' },
        { q: 'What is the anchoring effect?', opts: ['Being influenced by an initial reference point', 'Building on previous knowledge', 'Avoiding risky choices', 'Following the majority'], a: 'A', exp: '"their subsequent judgements are unconsciously influenced by it."' },
        { q: 'The word "systematic" in the passage most nearly means:', opts: ['Random and unpredictable', 'Methodical and consistent', 'Emotional and impulsive', 'Slow and complex'], a: 'B', exp: 'Systematic errors are regular and predictable errors, not random ones.' },
        { q: 'Who is Daniel Kahneman?', opts: ['A city planner', 'A psychologist and Nobel Prize winner', 'An economist who invented the market', 'A decision-making coach'], a: 'B', exp: '"Nobel Prize-winning psychologist Daniel Kahneman."' }
      ]
    },
    {
      band: '7.0', title: 'Renewable Energy and Grid Integration', timerMin: 20, levelLabel: 'Advanced Master',
      text: 'The economic case for renewable energy has strengthened dramatically over the past decade, with the levelised cost of solar photovoltaics falling by almost 90%. Yet the integration of intermittent renewable sources into existing electricity grids presents an engineering challenge of considerable complexity. Because the output of wind and solar farms fluctuates with weather conditions, grid operators must balance supply and demand in real time. Energy storage, including grid-scale batteries and pumped hydroelectric systems, offers a partial solution by storing surplus energy for release during peak demand. Smart grid technologies, which use digital communication to adjust consumption automatically, further enhance flexibility. Critics note, however, that storage capacity remains insufficient to guarantee supply through prolonged periods of low wind and sun, arguing that dispatchable baseload capacity — whether nuclear, fossil, or long-duration storage — will remain necessary for the foreseeable future.',
      questions: [
        { q: 'What is the main challenge discussed in the passage?', opts: ['The cost of renewable energy', 'Integrating intermittent renewable sources into grids', 'The shortage of solar panels', 'The price of electricity'], a: 'B', exp: '"the integration of intermittent renewable sources into existing electricity grids presents an engineering challenge."' },
        { q: 'Why does the output of wind and solar farms fluctuate?', opts: ['Because of grid failures', 'Because it depends on weather conditions', 'Because of storage limits', 'Because of demand'], a: 'B', exp: '"the output of wind and solar farms fluctuates with weather conditions."' },
        { q: 'Which has fallen by almost 90% per the passage?', opts: ['Energy demand', 'The levelised cost of solar PV', 'Grid capacity', 'Storage prices'], a: 'B', exp: '"the levelised cost of solar photovoltaics falling by almost 90%."' },
        { q: 'What is a "dispatchable" power source?', opts: ['One that can be turned on or off on demand', 'One that relies on the wind', 'One that cannot be stored', 'One that is always intermittent'], a: 'A', exp: 'Dispatchable baseload capacity means power that can be deployed as needed.' },
        { q: 'What is the critics\' main concern?', opts: ['Storage is too expensive', 'Storage capacity cannot guarantee supply in low-wind periods', 'Solar panels are inefficient', 'Wind farms damage the environment'], a: 'B', exp: '"storage capacity remains insufficient to guarantee supply through prolonged periods of low wind and sun."' }
      ]
    },
    {
      band: '7.5', title: 'Cultural Heritage and Identity', timerMin: 20, levelLabel: 'Advanced Master',
      text: 'Cultural heritage, encompassing both tangible assets such as monuments and artefacts and intangible traditions like language and ritual, functions as a repository of collective memory. Scholars argue that heritage is not simply inherited but actively constructed: communities continually redefine what is worth preserving, often in response to present-day concerns. This process of selection inevitably raises questions of power, as dominant groups may seek to privilege certain narratives while marginalising others. Digital technologies have added new dimensions to this debate. Virtual reconstructions of damaged sites allow global audiences to experience heritage remotely, yet critics caution that such representations can flatten the authenticity of the original, reducing complex historical places to simplified, commercially packaged images. Proponents counter that digital preservation, far from diminishing heritage, ensures its survival in an era of climate risk and political instability.',
      questions: [
        { q: 'The passage suggests heritage is best understood as:', opts: ['A fixed set of ancient objects', 'Actively constructed and continually redefined', 'Purely a matter of government policy', 'Identical to tourism'], a: 'B', exp: '"heritage is not simply inherited but actively constructed."' },
        { q: 'Which TWO types of heritage does the passage mention?', opts: ['Taste and smell', 'Tangible assets and intangible traditions', 'Public and private goods', 'Modern and ancient buildings'], a: 'B', exp: 'It distinguishes "tangible assets" from "intangible traditions like language and ritual."' },
        { q: 'What concern do critics raise about digital reconstructions?', opts: ['They are too expensive to produce', 'They can flatten authenticity and simplify history', 'They are always inaccurate', 'They exclude local audiences'], a: 'B', exp: 'Critics warn "such representations can flatten the authenticity of the original."' },
        { q: 'Why might communities "redefine what is worth preserving"?', opts: ['To forget the past', 'In response to present-day concerns', 'To increase tourism', 'To reduce costs'], a: 'B', exp: '"often in response to present-day concerns."' }
      ]
    },
    {
      band: '8.0', title: 'Quantum Computing Fundamentals', timerMin: 25, levelLabel: 'Advanced Master',
      text: 'Quantum computing represents a fundamental departure from classical computation. Whereas classical bits exist in a definite state of 0 or 1, quantum bits, or qubits, can exist in a superposition of both states simultaneously. This property allows a quantum computer to explore many computational paths at once. Moreover, entanglement — a phenomenon Einstein famously called "spooky action at a distance" — correlates the states of qubits such that measuring one instantly affects another, regardless of distance. These properties underpin algorithms such as Shor\'s algorithm, which can factor large numbers in polynomial time, and Grover\'s algorithm, which accelerates unstructured search. Nevertheless, the technology faces formidable obstacles: qubits are extraordinarily sensitive to environmental interference, a fragility that leads to high error rates. Error correction, which requires many physical qubits to encode a single logical qubit, constitutes a major engineering hurdle, and researchers concede that large-scale, fault-tolerant quantum machines remain years away despite rapid progress in the field.',
      questions: [
        { q: 'What distinguishes qubits from classical bits?', opts: ['They are slower', 'They can exist in a superposition of both states', 'They cannot be measured', 'They store two bits of data'], a: 'B', exp: '"qubits can exist in a superposition of both states simultaneously."' },
        { q: 'What does the passage say entanglement does?', opts: ['Slows computation', 'Correlates qubit states so measuring one affects another', 'Prevents errors', 'Increases the number of bits'], a: 'B', exp: 'Entanglement "correlates the states of qubits such that measuring one instantly affects another."' },
        { q: 'The phrase "spooky action at a distance" refers to:', opts: ['Errors in computation', 'Quantum entanglement', 'Classical speed limits', 'Data storage'], a: 'B', exp: 'Einstein called entanglement "spooky action at a distance."' },
        { q: 'What is the main obstacle to large-scale quantum computing?', opts: ['The cost of materials', 'Qubit fragility causing high error rates', 'Lack of algorithms', 'Shortage of researchers'], a: 'B', exp: '"qubits are extraordinarily sensitive to environmental interference, a fragility that leads to high error rates."' },
        { q: 'According to the passage, how far are fault-tolerant quantum machines from reality?', opts: ['Completely ready', 'Years away', 'Impossible', 'Available this year'], a: 'B', exp: '"researchers concede that large-scale, fault-tolerant quantum machines remain years away."' }
      ]
    },
    {
      band: '9.0', title: 'The Economics of Common-Pool Resources', timerMin: 30, levelLabel: 'Advanced Master',
      text: 'Common-pool resources — fisheries, groundwater basins, the atmosphere — are characterised by two defining features: subtractability, meaning that one person\'s use diminishes the supply available to others, and non-excludability, meaning that it is difficult to prevent potential beneficiaries from accessing them. These properties create a notorious collective-action problem, famously encapsulated by ecologist Garrett Hardin\'s "tragedy of the commons," in which rational individuals, each pursuing their own interest, collectively deplete a resource upon which all depend. Elinor Ostrom, the first woman to win a Nobel Prize in Economics, challenged Hardin\'s pessimistic conclusion. Drawing on decades of field studies, she demonstrated that communities frequently devise robust governance arrangements — comprising clear boundaries, monitoring by resource users, graduated sanctions, and conflict-resolution mechanisms — that successfully sustain shared resources over the long term. Ostrom\'s work reframed the debate: the tragedy of the commons is not inevitable but conditional on institutional failure, and the design principles she identified continue to inform contemporary climate and fisheries policy.',
      questions: [
        { q: 'What are the two defining features of common-pool resources?', opts: ['Rarity and value', 'Subtractability and non-excludability', 'Ownership and price', 'Renewability and abundance'], a: 'B', exp: 'The passage explicitly names "subtractability" and "non-excludability."' },
        { q: 'What does the "tragedy of the commons" describe?', opts: ['The destruction of parks', 'Individuals rationally depleting a shared resource', 'Government failure', 'Market competition'], a: 'B', exp: '"rational individuals, each pursuing their own interest, collectively deplete a resource."' },
        { q: 'What was Ostrom\'s major contribution?', opts: ['Proving the tragedy is unavoidable', 'Showing communities can sustain shared resources with effective governance', 'Inventing fisheries policy', 'Winning the first Nobel in Economics'], a: 'B', exp: 'She "demonstrated that communities frequently devise robust governance arrangements... that successfully sustain shared resources."' },
        { q: 'Which of the following is a governance design principle identified by Ostrom?', opts: ['Centralised control', 'Clear boundaries and monitoring by users', 'Unlimited access', 'Government ownership'], a: 'B', exp: 'The passage lists "clear boundaries, monitoring by resource users, graduated sanctions, and conflict-resolution mechanisms."' },
        { q: 'According to the passage, the tragedy of the commons is:', opts: ['Inevitable', 'Conditional on institutional failure', 'Impossible to prevent', 'Caused by technology'], a: 'B', exp: '"the tragedy of the commons is not inevitable but conditional on institutional failure."' }
      ]
    }
  ];

  function cache() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) return null;
    let c = window.IELTS_AUTH.getScoped('readmaster', null);
    if (!c) { c = { scores: {}, best: {} }; window.IELTS_AUTH.setScoped('readmaster', c); }
    return window.IELTS_AUTH.getScoped('readmaster', null);
  }
  function save(c) { window.IELTS_AUTH.setScoped('readmaster', c); }

  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) window.IELTS_AUTH.onUserChange(() => { state.view = 'home'; });

  function bandFromTitle(t) { const p = PASSAGES.find((x) => x.title === t); return p ? p.band : '?'; }

  function start(title) {
    const p = PASSAGES.find((x) => x.title === title);
    if (!p) return;
    clearExamTimer();
    state.pt = p;
    state.qi = 0;
    state.answers = {};
    state.running = true;
    state.view = 'taking';
    state.timer.remaining = (p.timerMin || 20) * 60;
    state.timer.last = Date.now();
    state.timer.interval = setInterval(examTick, 1000);
    render();
  }

  function clearExamTimer() {
    clearInterval(state.timer.interval);
    state.timer.interval = null;
    state.timer.remaining = 0;
  }

  function examTick() {
    if (state.view !== 'taking') { clearExamTimer(); return; }
    state.timer.remaining--;
    const el = $('#rm-time');
    if (el) {
      el.textContent = fmtTime(Math.max(0, state.timer.remaining));
      if (state.timer.remaining <= 60 && state.timer.remaining > 0) el.classList.add('text-[#ff6b6b]');
    }
    if (state.timer.remaining <= 0) {
      clearExamTimer();
      window.toast && window.toast('⏰ Time is up — auto-submitting your answers');
      finish();
    }
  }

  function answer(i, letter) { state.answers[i] = letter; render(); }
  function next() {
    if (state.qi < state.pt.questions.length - 1) { state.qi++; render(); } else { finish(); }
  }
  function prev() { if (state.qi > 0) { state.qi--; render(); } }

  function fmtTime(s) { return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }

  function finish() {
    state.running = false;
    clearExamTimer();
    const p = state.pt;
    let correct = 0;
    p.questions.forEach((q, i) => {
      const a = state.answers[i];
      if (a && a.toLowerCase() === q.a.toLowerCase()) correct++;
    });
    const total = p.questions.length;
    const pct = Math.round((correct / total) * 100);
    const c = cache();
    c.scores[p.title] = { pct, correct, total, band: p.band, at: Date.now() };
    if (!c.best[p.title] || pct > c.best[p.title]) c.best[p.title] = pct;
    save(c);
    if (pct >= 60 && window.IELTS_AUTH.completeClaim('readmaster-' + p.title)) {
      window.IELTS_AUTH.addXp(20);
      window.IELTS_AUTH.addActivity('reading', 'Reading exam: ' + p.title + ' (' + pct + '%)', 20);
      window.toast && window.toast('+20 XP!');
    }
    if (window.IELTS_BAND && window.IELTS_BAND.recordMastery) window.IELTS_BAND.recordMastery('reading', pct);
    if (window.IELTS_DIAG && window.IELTS_DIAG.record) window.IELTS_DIAG.record('reading', p.title, correct, total);
    state.view = 'review';
    render();
  }

  function bandAnalysis(pct) {
    if (pct >= 85) return { band: '7.5-9.0', tip: 'Excellent! You can handle complex passages and infer meaning effectively.' };
    if (pct >= 70) return { band: '6.5-7.0', tip: 'Very good. Focus on distinguishing implied meaning from direct statements.' };
    if (pct >= 55) return { band: '6.0', tip: 'Good effort. Practise skimming for gist and scanning for specific detail.' };
    if (pct >= 40) return { band: '5.0-5.5', tip: 'Build vocabulary and practise identifying main ideas in each paragraph.' };
    return { band: '4.0-4.5', tip: 'Start with shorter passages and focus on key vocabulary before attempting full passages.' };
  }

  function render() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) { window.IELTS_AUTH.showScreen(); return; }
    if (state.view === 'taking') { renderTaking(); return; }
    if (state.view === 'review') { renderReview(); return; }
    const c = cache();
    const aiPassageCount = (window.IELTS_AI && window.IELTS_AI.listByKind) ? window.IELTS_AI.listByKind('passage').length : 0;
    $('#readmaster-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <h2 class="text-2xl font-extrabold text-[#f5f0e6]">📖 Reading Master Suite</h2>
        <p class="text-sm text-[#f5f0e6]/60 mt-1">Band-graded passages from Band 3 to 9 with timed exams and detailed analysis.</p>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-[rgba(124,58,237,0.28)] to-[rgba(217,70,239,0.18)] border border-[rgba(167,139,250,0.45)] rounded-2xl p-5 mb-6">
        <div>
          <p class="font-bold text-[#f5f0e6]">✨ AI Passage Builder</p>
          <p class="text-xs text-[#f5f0e6]/65 mt-0.5">Generate a Cambridge-style passage on any topic — then save it to your library and practise here.</p>
        </div>
        <div class="flex gap-2 flex-wrap">
          <button class="px-4 py-2 rounded-lg text-sm font-bold text-[#14120f] bg-[#d4af37] hover:bg-[#b8962e] transition" onclick="window.IELTS_AI.openPassageModal()">🧠 Build a passage</button>
          <button class="px-4 py-2 rounded-lg text-sm font-bold text-[#f5f0e6] border border-[rgba(167,139,250,0.5)] hover:bg-[rgba(167,139,250,0.12)] transition" onclick="window.IELTS_AI.openLibraryModal('passage')">📚 My AI passages (${aiPassageCount})</button>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        ${PASSAGES.map((p) => {
          const best = c.best[p.title];
          return `
          <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl p-5 flex items-center justify-between gap-3 transition-all hover:border-[rgba(212,175,55,0.5)] hover:shadow-lg">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-[#d4af37] border border-[rgba(212,175,55,0.3)] px-2 py-0.5 rounded">Band ${esc(p.band)}</span>
                <span class="text-[10px] text-[#f5f0e6]/40">${esc(p.levelLabel)}</span>
              </div>
              <p class="text-sm font-bold text-[#f5f0e6] mt-1">${esc(p.title)}</p>
              <p class="text-xs text-[#f5f0e6]/60">${p.questions.length} questions · ${p.timerMin} min ${best ? '· Best: <span class="text-[#d4af37]">' + best + '%</span>' : ''}</p>
            </div>
            <button class="btn-primary text-sm" onclick="IELTS_READMASTER.start('${esc(p.title)}')">${best ? 'Retake' : 'Start'}</button>
          </div>`;
        }).join('')}
      </div>`;
  }

  function renderTaking() {
    const p = state.pt;
    const q = p.questions[state.qi];
    const total = p.questions.length;
    const sel = state.answers[state.qi];
    $('#readmaster-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="text-lg font-extrabold text-[#f5f0e6]">${esc(p.title)}</h3>
            <p class="text-xs text-[#f5f0e6]/60">Q${state.qi + 1} / ${total} · Band ${esc(p.band)} · ${p.timerMin} min</p>
          </div>
          <span id="rm-time" class="font-mono text-sm font-bold text-[#d4af37] bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.3)] px-4 py-2 rounded-lg">${fmtTime(Math.max(0, state.timer.remaining))}</span>
        </div>
        <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.1)] rounded-xl p-4 mb-5 max-h-56 overflow-y-auto">
          <p class="text-sm text-[#f5f0e6]/75 leading-relaxed">${esc(p.text)}</p>
        </div>
        <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.1)] rounded-xl p-4 mb-5">
          <p class="text-sm font-medium text-[#f5f0e6]">${esc(q.q)}</p>
        </div>
        <div class="grid gap-2 mb-5">
          ${q.opts.map((o, i) => {
            const letter = String.fromCharCode(65 + i);
            return `<button type="button" class="text-left w-full bg-[rgba(20,18,15,0.85)] backdrop-blur-md border ${sel === letter ? 'border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.15)]' : 'border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.4)]'} rounded-lg px-4 py-3 transition-all flex items-center gap-3" onclick="IELTS_READMASTER.answer(${state.qi}, '${letter}')">
              <span class="inline-block w-5 text-[#f5f0e6]/40 font-semibold">${letter}</span>
              <span class="text-sm text-[#f5f0e6]">${esc(o)}</span>
            </button>`;
          }).join('')}
        </div>
        <div class="flex justify-between">
          <button class="btn-secondary text-sm ${state.qi === 0 ? 'invisible' : ''}" onclick="IELTS_READMASTER.prev()">← Prev</button>
          <button class="btn-primary text-sm" onclick="IELTS_READMASTER.next()">${state.qi === total - 1 ? 'Submit' : 'Next →'}</button>
        </div>
      </div>`;
  }

  function renderReview() {
    const p = state.pt;
    const c = cache();
    const res = c.scores[p.title];
    if (!res) { state.view = 'home'; render(); return; }
    const ba = bandAnalysis(res.pct);
    const rows = p.questions.map((q, i) => {
      const ua = state.answers[i];
      const isOk = ua && ua.toLowerCase() === q.a.toLowerCase();
      return `<div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-lg p-4">
        <p class="text-sm font-semibold text-[#f5f0e6]">Q${i + 1} ${isOk ? '✅' : '❌'} — ${esc(q.q)}</p>
        ${!isOk ? '<p class="text-xs text-[#f5f0e6]/50 mt-1">Your: ' + esc(ua || '—') + ' · Correct: <span class="text-[#d4af37]">' + esc(q.a) + '</span></p>' : ''}
        <p class="text-xs text-[#f5f0e6]/60 mt-1">💡 ${esc(q.exp)}</p>
      </div>`;
    }).join('');
    $('#readmaster-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-8 text-center mb-6">
        <p class="text-5xl font-extrabold ${res.pct >= 80 ? 'text-[#d4af37]' : res.pct >= 60 ? 'text-emerald-400' : 'text-[#f5f0e6]/70'}">${res.pct}%</p>
        <p class="text-[#f5f0e6]/70 mt-2">${res.correct} / ${res.total} correct · Passage Band ${esc(res.band)}</p>
        <p class="text-sm text-[#d4af37] mt-2 font-bold">Estimated IELTS Reading: Band ${esc(ba.band)}</p>
        <p class="text-xs text-[#f5f0e6]/60 mt-1 max-w-md mx-auto">${esc(ba.tip)}</p>
      </div>
      <h3 class="text-lg font-bold text-[#f5f0e6] mb-4">Band-Specific Analysis</h3>
      <div class="space-y-3 mb-6">${rows}</div>
      <div class="flex gap-3">
        <button class="btn-secondary text-sm" onclick="IELTS_READMASTER.back()">← Back to Suite</button>
        <button class="btn-primary text-sm" onclick="IELTS_READMASTER.start('${esc(p.title)}')">🔁 Retake</button>
      </div>`;
  }

  function back() { clearExamTimer(); state.view = 'home'; render(); }

  window.IELTS_READMASTER = { render, start, answer, next, prev, back };
})();