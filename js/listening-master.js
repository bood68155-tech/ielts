/* ============================================================
   IELTS Master — Listening Master Suite
   Parts 1-4 with transcripts, auto-grading, speed controls
   (0.75x / 1x / 1.25x) and band feedback.
   ============================================================ */
(function () {
  'use strict';
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const state = { view: 'home', pt: null, qi: 0, answers: {}, speed: 1 };

  const SECTIONS = [
    {
      part: 1, band: '5.0', title: 'Part 1 · Accommodation Enquiry', timerMin: 10,
      script: [
        'RECEPTIONIST: Good morning, Riverside Accommodation Services. How can I help you?',
        'STUDENT: Hello, I\'m calling about the studio flat advertised on your website for £650 a month.',
        'RECEPTIONIST: Ah yes, that\'s on Green Lane, near the university. It has a small kitchen, a bathroom and a main room with a double bed.',
        'STUDENT: Is the rent inclusive?',
        'RECEPTIONIST: It includes water and gas, but electricity is separate, around £35 a month. Council tax is not included.',
        'STUDENT: And is there a bus stop nearby?',
        'RECEPTIONIST: Yes, the number 42 bus stops at the end of the road, and the train station is a ten-minute walk in the opposite direction.',
        'STUDENT: That sounds good. Could I make a viewing?',
        'RECEPTIONIST: Of course. The landlord is available on Tuesday and Thursday evenings after six. Shall I book Thursday at six thirty?',
        'STUDENT: Perfect, thank you.'
      ],
      questions: [
        { q: 'The flat is located on: (address)', a: 'Green Lane', t: 'fill', exp: 'The receptionist confirms the flat "is on Green Lane, near the university."' },
        { q: 'How much is the monthly rent?', a: '£650 / 650 pounds', t: 'fill', exp: 'The student quotes "£650 a month."' },
        { q: 'Which bills are included in the rent?', a: 'water and gas', t: 'fill', exp: '"It includes water and gas, but electricity is separate."' },
        { q: 'How much is electricity per month?', a: '£35 / 35 pounds', t: 'fill', exp: 'Electricity is separate, "around £35 a month."' },
        { q: 'Which bus stops near the flat?', a: 'number 42 / the 42', t: 'fill', exp: '"the number 42 bus stops at the end of the road."' },
        { q: 'When is the viewing booked?', a: 'Thursday at 6:30', t: 'fill', exp: 'The viewing is "Thursday at six thirty."' },
        { q: 'The student asked if the rent was ___', opts: ['inclusive', 'furnished', 'negotiable', 'discounted'], a: 'A', t: 'mcq', exp: '"Is the rent inclusive?" is the student\'s question.' },
        { q: 'How far is the train station?', opts: ['5-minute walk', '10-minute walk', '15-minute walk', 'On the same street'], a: 'B', t: 'mcq', exp: '"the train station is a ten-minute walk in the opposite direction."' },
        { q: 'What does the flat have?', opts: ['A garden', 'A balcony', 'A small kitchen and a main room', 'A garage'], a: 'C', t: 'mcq', exp: '"a small kitchen, a bathroom and a main room."' },
        { q: 'When is the landlord available?', opts: ['Tuesdays and Thursdays after 6pm', 'Weekdays before 3pm', 'Weekends only', 'Mondays and Fridays'], a: 'A', t: 'mcq', exp: '"available on Tuesday and Thursday evenings after six."' }
      ]
    },
    {
      part: 2, band: '6.0', title: 'Part 2 · Museum Tour Guide', timerMin: 10,
      script: [
        'GUIDE: Welcome to the City Museum. Before we start the tour, here are a few points. Photography is welcome everywhere except the Egyptian Gallery, where the exhibits are on loan from a private collection. Our audio guides are free and available in eight languages at the entrance desk.',
        'GUIDE: We\'ll begin in the Industrial Revolution Wing on the ground floor. This houses a restored steam engine that is fired up for demonstrations at 11 a.m. and 3 p.m. each day. Each demonstration lasts twenty minutes.',
        'GUIDE: After that, we\'ll take the lift to the second floor, home of the Roman Gallery. The highlight is a perfect mosaic floor uncovered in 1982 during work on the metro system. Experts believe it dates from the third century AD.',
        'GUIDE: On the third floor you\'ll find the temporary exhibition, "Sea to Sky," which traces the history of flight machines from kites to airships. It runs until the end of September.',
        'GUIDE: Finally, the museum shop is on the way out. Passes that include a 10% discount on the shop are available with any adult ticket. The café, which serves hot and cold food, closes at 5 p.m.'
      ],
      questions: [
        { q: 'Where is photography not allowed?', a: 'Egyptian Gallery', t: 'fill', exp: '"Photography is welcome everywhere except the Egyptian Gallery."' },
        { q: 'How many languages is the audio guide available in?', a: '8 / eight', t: 'fill', exp: '"available in eight languages."' },
        { q: 'How long does each steam engine demonstration last?', a: '20 minutes', t: 'fill', exp: '"Each demonstration lasts twenty minutes."' },
        { q: 'In which year was the Roman mosaic uncovered?', a: '1982', t: 'fill', exp: '"uncovered in 1982 during work on the metro system."' },
        { q: 'What is the temporary exhibition called?', a: 'Sea to Sky', t: 'fill', exp: 'The exhibition is called "Sea to Sky."' },
        { q: 'When does the café close?', a: '5 p.m.', t: 'fill', exp: '"The café... closes at 5 p.m."' },
        { q: 'Where is the Industrial Revolution Wing?', opts: ['First floor', 'Ground floor', 'Second floor', 'Third floor'], a: 'B', t: 'mcq', exp: '"We\'ll begin in the Industrial Revolution Wing on the ground floor."' },
        { q: 'When is the steam engine fired up?', opts: ['At 11am and 3pm', 'At noon and 4pm', 'Only at weekends', 'Every hour'], a: 'A', t: 'mcq', exp: '"fired up for demonstrations at 11 a.m. and 3 p.m. each day."' },
        { q: 'The mosaic is believed to date from:', opts: ['The 1st century BC', 'The 3rd century AD', 'The 5th century AD', 'The Middle Ages'], a: 'B', t: 'mcq', exp: '"dates from the third century AD."' },
        { q: 'What discount is available with an adult ticket?', opts: ['20% on the café', '10% on the shop', 'Free audio guide', 'Free parking'], a: 'B', t: 'mcq', exp: '"a 10% discount on the shop... with any adult ticket."' }
      ]
    },
    {
      part: 3, band: '7.0', title: 'Part 3 · Tutorial: Tourism Research', timerMin: 10,
      script: [
        'TUTOR: Right, so your group project on sustainable tourism. Sam, what have you decided to examine?',
        'SAM: We\'re focusing on the effect of cruise tourism on the port cities of the Baltic. Geographically it\'s compact, and the data is accessible.',
        'TUTOR: A sensible choice. What methodology are you proposing?',
        'SAM: We\'ll triangulate three sources — port statistics, local business surveys, and interviews with residents. We\'re intending to conduct around twenty interviews across two cities.',
        'TUTOR: Triangulation strengthens your conclusions, though I\'d caution you about interview bias. You should aim for a spread of ages and occupations, and record consent properly.',
        'SAM: That\'s noted. We were also considering a questionnaire with a Likert scale for residents\' attitudes.',
        'TUTOR: Good. The dissertation deadline is the 14th of May. Have you set milestones?',
        'SAM: We plan to finish the survey collection by the end of March, complete the analysis over two weeks in April, and begin drafting by mid-April.',
        'TUTOR: That timeline leaves you a comfortable margin. One last point — apply for ethical clearance before you start interviewing; it typically takes a week to process.'
      ],
      questions: [
        { q: 'What is the focus of the group project?', a: 'Cruise tourism in Baltic port cities', t: 'fill', exp: '"the effect of cruise tourism on the port cities of the Baltic."' },
        { q: 'How many sources will they triangulate?', a: '3 / three', t: 'fill', exp: '"triangulate three sources — port statistics, local business surveys, and interviews."' },
        { q: 'Approximately how many interviews are planned?', a: '20 / twenty', t: 'fill', exp: '"around twenty interviews across two cities."' },
        { q: 'What extra measurement does Sam propose for residents\' attitudes?', a: 'a Likert scale questionnaire', t: 'fill', exp: '"a questionnaire with a Likert scale for residents\' attitudes."' },
        { q: 'When is the dissertation deadline?', a: '14 May', t: 'fill', exp: '"The dissertation deadline is the 14th of May."' },
        { q: 'Why did the tutor caution the student about interviews?', a: 'interview bias / consent issues', t: 'fill', exp: '"I\'d caution you about interview bias... record consent properly."' },
        { q: 'What must they do before starting interviews?', opts: ['Submit questionnaires', 'Apply for ethical clearance', 'Book a room', 'Buy recording equipment'], a: 'B', t: 'mcq', exp: '"apply for ethical clearance before you start interviewing."' },
        { q: 'How long does ethical clearance take?', opts: ['About a day', 'About a week', 'Two weeks', 'A month'], a: 'B', t: 'mcq', exp: '"it typically takes a week to process."' },
        { q: 'Why is the Baltic a good geographic choice?', opts: ['It has the most tourists', 'It is compact with accessible data', 'It is cheap to travel to', 'It has no cruise ports'], a: 'B', t: 'mcq', exp: '"Geographically it\'s compact, and the data is accessible."' },
        { q: 'What does triangulation do, according to the tutor?', opts: ['It reduces cost', 'It strengthens conclusions', 'It speeds up analysis', 'It removes the need for interviews'], a: 'B', t: 'mcq', exp: '"Triangulation strengthens your conclusions."' }
      ]
    },
    {
      part: 4, band: '8.0', title: 'Part 4 · Lecture: Ocean Acidification', timerMin: 10,
      script: [
        'PROFESSOR: Today we turn to ocean acidification, often called the "other CO2 problem." Since the industrial revolution, the oceans have absorbed roughly a third of anthropogenic carbon dioxide, and this uptake has altered the chemistry of seawater, lowering its average pH by about 0.1 units — a significant change in a solution that is naturally buffered.',
        'PROFESSOR: The primary biological consequence is on calcifying organisms. Corals, shellfish and certain plankton construct shells and skeletons from calcium carbonate, and acidified water reduces the availability of carbonate ions they need. Laboratory studies show that under elevated carbon dioxide, coral calcification can decline by 15 to 40 percent.',
        'PROFESSOR: Ecosystem knock-on effects are profound. In the Southern Ocean, the supply of essential nutrients to phytoplankton has already shifted, with implications for the entire food web, including commercial fisheries such as krill and cod.',
        'PROFESSOR: On the policy side, the UN\'s Intergovernmental Panel on Climate Change projects that by 2100, under a high-emissions pathway, surface ocean pH could fall by a further 0.3 units. Reducing emissions remains the only comprehensive solution; local measures, such as reducing runoff, can only delay local acidification, and even then only marginally.',
        'PROFESSOR: Consequently, ocean acidification is not simply an ecological issue; it is an acute economic and humanitarian concern for the nearly three billion people who depend on marine resources for their protein.'
      ],
      questions: [
        { q: 'What fraction of anthropogenic CO2 have the oceans absorbed?', a: 'a third / roughly 1/3', t: 'fill', exp: '"the oceans have absorbed roughly a third of anthropogenic carbon dioxide."' },
        { q: 'By how much has the average ocean pH fallen?', a: '0.1 units', t: 'fill', exp: '"lowering its average pH by about 0.1 units."' },
        { q: 'By how much can coral calcification decline under elevated CO2?', a: '15 to 40 percent', t: 'fill', exp: '"coral calcification can decline by 15 to 40 percent."' },
        { q: 'Which ocean has seen shifts in nutrient supply to phytoplankton?', a: 'the Southern Ocean', t: 'fill', exp: '"In the Southern Ocean, the supply of essential nutrients to phytoplankton has already shifted."' },
        { q: 'What could fall by a further 0.3 units by 2100?', a: 'surface ocean pH', t: 'fill', exp: '"surface ocean pH could fall by a further 0.3 units."' },
        { q: 'Why is acidification called "the other CO2 problem"?', a: 'It is caused by CO2 but less well known', t: 'fill', exp: 'The lecture contrasts it with the more familiar climate impacts of CO2.' },
        { q: 'Which organisms are most affected by acidification?', opts: ['Mammals', 'Calcifying organisms like corals and shellfish', 'Birds', 'Freshwater fish'], a: 'B', t: 'mcq', exp: '"The primary biological consequence is on calcifying organisms."' },
        { q: 'How many people depend on marine protein?', opts: ['1 billion', '2 billion', '3 billion', '5 billion'], a: 'C', t: 'mcq', exp: '"the nearly three billion people who depend on marine resources."' },
        { q: 'What is the ONLY comprehensive solution mentioned?', opts: ['Reducing emissions', 'Building sea walls', 'Reducing fishing', 'Adding buffers to the ocean'], a: 'A', t: 'mcq', exp: '"Reducing emissions remains the only comprehensive solution."' },
        { q: 'Can local measures meaningfully solve acidification?', opts: ['Yes, fully', 'Only marginally and with delay', 'No, they make it worse', 'Only in the Arctic'], a: 'B', t: 'mcq', exp: '"local measures... can only delay local acidification, and even then only marginally."' }
      ]
    }
  ];

  function cache() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) return null;
    let c = window.IELTS_AUTH.getScoped('listmaster', null);
    if (!c) { c = { scores: {}, best: {} }; window.IELTS_AUTH.setScoped('listmaster', c); }
    return window.IELTS_AUTH.getScoped('listmaster', null);
  }
  function save(c) { window.IELTS_AUTH.setScoped('listmaster', c); }

  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) window.IELTS_AUTH.onUserChange(() => { state.view = 'home'; });

  function fmtTime(s) { return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }

  function setSpeed(v) { state.speed = v; render(); }

  function start(title) {
    const p = SECTIONS.find((x) => x.title === title);
    if (!p) return;
    state.pt = p;
    state.qi = 0;
    state.answers = {};
    state.view = 'taking';
    render();
  }
  function answer(i, val) {
    state.answers[i] = val;
    const q = state.pt && state.pt.questions[i];
    if (!q || q.t === 'fill') return;
    render();
  }
  function next() { if (state.qi < state.pt.questions.length - 1) { state.qi++; render(); } else { finish(); } }
  function prev() { if (state.qi > 0) { state.qi--; render(); } }

  function norm(ans) { return String(ans || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function isCorrect(q, ua) {
    if (q.t === 'mcq') return ua && String(ua).toLowerCase() === String(q.a).toLowerCase();
    const target = String((q.a || '[object Object]')).split('/').map((x) => norm(x));
    const u = norm(ua);
    return target.some((t) => u === t || u.indexOf(t) >= 0 || t.indexOf(u) >= 0);
  }

  function finish() {
    const p = state.pt;
    let correct = 0;
    p.questions.forEach((q, i) => { if (isCorrect(q, state.answers[i])) correct++; });
    const total = p.questions.length;
    const pct = Math.round((correct / total) * 100);
    const c = cache();
    c.scores[p.title] = { pct, correct, total, band: p.band, at: Date.now() };
    if (!c.best[p.title] || pct > c.best[p.title]) c.best[p.title] = pct;
    save(c);
    if (pct >= 55 && window.IELTS_AUTH.completeClaim('listmaster-' + p.title)) {
      window.IELTS_AUTH.addXp(20);
      window.IELTS_AUTH.addActivity('listening', 'Listening: ' + p.title + ' (' + pct + '%)', 20);
      window.toast && window.toast('+20 XP!');
    }
    if (window.IELTS_BAND && window.IELTS_BAND.recordMastery) window.IELTS_BAND.recordMastery('listening', pct);
    if (window.IELTS_DIAG && window.IELTS_DIAG.record) {
      const qtypes = { fill: { correct: 0, total: 0 }, mcq: { correct: 0, total: 0 } };
      p.questions.forEach((q, i) => {
        const k = q.t === 'mcq' ? 'mcq' : 'fill';
        qtypes[k].total++;
        if (isCorrect(q, state.answers[i])) qtypes[k].correct++;
      });
      window.IELTS_DIAG.record('listening', p.title, correct, total, { qtypes });
    }
    state.view = 'review';
    render();
  }

  function bandFeed(pct) {
    if (pct >= 85) return { band: '7.5-8.5', tip: 'Excellent. You capture detail and inference accurately.' };
    if (pct >= 70) return { band: '6.5-7.0', tip: 'Very good. Focus on numbers, dates and speaker attitude.' };
    if (pct >= 55) return { band: '6.0', tip: 'Good. Practise predicting answers from question wording.' };
    if (pct >= 40) return { band: '5.0', tip: 'Build listening stamina; try the 0.75x speed and repeat.' };
    return { band: '4.0', tip: 'Start with Part 1 and replay transcripts while reading along.' };
  }

  function render() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) { window.IELTS_AUTH.showScreen(); return; }
    if (state.view === 'taking') { renderTaking(); return; }
    if (state.view === 'review') return renderReview();
    const c = cache();
    $('#listmaster-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <h2 class="text-2xl font-extrabold text-[#f5f0e6]">🎧 Listening Master Suite</h2>
        <p class="text-sm text-[#f5f0e6]/60 mt-1">Parts 1-4 with transcript exercises, auto-grading and speed controls.</p>
        <div class="flex items-center gap-2 mt-4 text-sm">
          <span class="text-[#f5f0e6]/60 text-xs">Speed:</span>
          ${[0.75, 1, 1.25].map((v) => `<button class="tab-pill ${state.speed === v ? 'active' : ''}" onclick="IELTS_LISTMASTER.speed(${v})">${v}x</button>`).join('')}
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        ${SECTIONS.map((p) => {
          const best = c.best[p.title];
          return `
          <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl p-5 flex items-center justify-between gap-3 transition-all hover:border-[rgba(212,175,55,0.5)] hover:shadow-lg">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-[#d4af37] border border-[rgba(212,175,55,0.3)] px-2 py-0.5 rounded">Band ${esc(p.band)}</span>
                ${state.speed !== 1 ? '<span class="text-[10px] text-emerald-400">@' + state.speed + 'x</span>' : ''}
              </div>
              <p class="text-sm font-bold text-[#f5f0e6] mt-1">${esc(p.title)}</p>
              <p class="text-xs text-[#f5f0e6]/60">${p.questions.length} questions ${best ? '· Best: <span class="text-[#d4af37]">' + best + '%</span>' : ''}</p>
            </div>
            <button class="btn-primary text-sm" onclick="IELTS_LISTMASTER.start('${esc(p.title)}')">${best ? 'Retake' : 'Start'}</button>
          </div>`;
        }).join('')}
      </div>`;
  }

  function renderTaking() {
    const p = state.pt;
    const q = p.questions[state.qi];
    const total = p.questions.length;
    const sel = state.answers[state.qi];
    const isFill = q.t === 'fill';

    const inputHtml = isFill
      ? `<input type="text" id="lst-answer" value="${esc(sel || '')}" placeholder="Type your answer…" oninput="IELTS_LISTMASTER.answer(${state.qi}, this.value)" class="w-full bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.3)] rounded-lg px-4 py-3 text-sm text-[#f5f0e6] focus:border-[rgba(212,175,55,0.6)] outline-none" />`
      : `<div class="grid gap-2">` + q.opts.map((o, i) => {
          const letter = String.fromCharCode(65 + i);
          return `<button type="button" class="text-left w-full bg-[rgba(20,18,15,0.85)] backdrop-blur-md border ${sel === letter ? 'border-[#d4af37]' : 'border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.4)]'} rounded-lg px-4 py-3 transition-all flex items-center gap-3" onclick="IELTS_LISTMASTER.answer(${state.qi}, '${letter}')">
            <span class="inline-block w-5 text-[#f5f0e6]/40 font-semibold">${letter}</span><span class="text-sm text-[#f5f0e6]">${esc(o)}</span>
          </button>`;
        }).join('') + `</div>`;

    $('#listmaster-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="text-lg font-extrabold text-[#f5f0e6]">${esc(p.title)}</h3>
            <p class="text-xs text-[#f5f0e6]/60">Q${state.qi + 1} / ${total} · Band ${esc(p.band)} · Speed ${state.speed}x</p>
          </div>
        </div>
        <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.1)] rounded-xl p-4 mb-5 max-h-64 overflow-y-auto">
          <p class="text-xs font-semibold text-[#d4af37]/70 mb-1">Transcript (simulated audio):</p>
          <p class="text-sm text-[#f5f0e6]/75 leading-relaxed">${esc(p.script.join(' '))}</p>
        </div>
        <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.1)] rounded-xl p-4 mb-5">
          <p class="text-sm font-medium text-[#f5f0e6] mb-3">${esc(q.q)}</p>
          ${inputHtml}
        </div>
        <div class="flex justify-between">
          <button class="btn-secondary text-sm ${state.qi === 0 ? 'invisible' : ''}" onclick="IELTS_LISTMASTER.prev()">← Prev</button>
          <button class="btn-primary text-sm" onclick="IELTS_LISTMASTER.next()">${state.qi === total - 1 ? 'Submit' : 'Next →'}</button>
        </div>
      </div>`;
  }

  function renderReview() {
    const p = state.pt;
    const c = cache();
    const res = c.scores[p.title];
    if (!res) { state.view = 'home'; render(); return; }
    const bf = bandFeed(res.pct);
    const rows = p.questions.map((q, i) => {
      const ua = state.answers[i];
      const ok = isCorrect(q, ua);
      return `<div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-lg p-4">
        <p class="text-sm font-semibold text-[#f5f0e6]">Q${i + 1} ${ok ? '✅' : '❌'} — ${esc(q.q)}</p>
        ${!ok ? '<p class="text-xs text-[#f5f0e6]/50 mt-1">Your: ' + esc(ua || '—') + ' · Correct: <span class="text-[#d4af37]">' + esc(String(q.a) || '') + '</span></p>' : ''}
        <p class="text-xs text-[#f5f0e6]/60 mt-1">💡 ${esc(q.exp)}</p>
      </div>`;
    }).join('');
    $('#listmaster-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-8 text-center mb-6">
        <p class="text-5xl font-extrabold ${res.pct >= 80 ? 'text-[#d4af37]' : res.pct >= 60 ? 'text-emerald-400' : 'text-[#f5f0e6]/70'}">${res.pct}%</p>
        <p class="text-[#f5f0e6]/70 mt-2">${res.correct} / ${res.total} correct · Part Band ${esc(res.band)}</p>
        <p class="text-sm text-[#d4af37] mt-2 font-bold">Estimated IELTS Listening: Band ${esc(bf.band)}</p>
        <p class="text-xs text-[#f5f0e6]/60 mt-1">${esc(bf.tip)}</p>
      </div>
      <h3 class="text-lg font-bold text-[#f5f0e6] mb-4">Answer Review</h3>
      <div class="space-y-3 mb-6">${rows}</div>
      <div class="flex gap-3">
        <button class="btn-secondary text-sm" onclick="IELTS_LISTMASTER.back()">← Back to Suite</button>
        <button class="btn-primary text-sm" onclick="IELTS_LISTMASTER.start('${esc(p.title)}')">🔁 Retake</button>
      </div>`;
  }

  function back() { state.view = 'home'; render(); }

  window.IELTS_LISTMASTER = { render, speed: setSpeed, start, answer, next, prev, back };
})();