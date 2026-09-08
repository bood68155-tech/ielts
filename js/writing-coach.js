/* ============================================================
   IELTS Master — Writing AI Coach & Studio
   Task 1 & Task 2 with Band 9 model answers, structure
   generators, vocabulary boosters and self-coaching checklist.
   ============================================================ */
(function () {
  'use strict';
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const state = { view: 'home', task: 1, model: null, draft: '', checklist: [false, false, false, false, false], submitted: 0 };

  const TASK1_TYPES = [
    { key: 'line', name: 'Line Graph', frames: ['The line graph illustrates ____ over a ___-year period.', 'Overall, the trend in X contrasts with Y.', 'In detail, watching X rise steadily from A to B, while Y fluctuates between C and D.'] },
    { key: 'bar', name: 'Bar Chart', frames: ['The bar chart compares ____ in (year).', 'Overall, X is the highest figure, whereas Y is the lowest.', 'Looking more closely, X exceeds Y by roughly Z units, with a noticeable gap in the middle categories.'] },
    { key: 'pie', name: 'Pie Charts', frames: ['The pie charts illustrate the proportion of ____ in (year) compared with (year).', 'Overall, the dominant share shifted from X to Y.', 'By contrast circular 2, the share of X rose from A% to B%.'] },
    { key: 'table', name: 'Table', frames: ['The table gives information about ____ across four categories.', 'Overall, X records the highest value, while Y records the lowest.', 'In terms of Q1, X reached a peak of A, far ahead of its nearest rival at B.'] },
    { key: 'process', name: 'Process / Flow', frames: ['The diagram shows the process of ____ in __ stages.', 'Overall, the process is linear, beginning with raw materials and ending with the finished product.', 'In the first stage, X is collected and transported to Y, where it undergoes Z.'] },
    { key: 'map', name: 'Map', frames: ['The maps show the changes that took place in ____ between (year) and (year).', 'Overall, the area underwent significant redevelopment, most notably in the northern quarter.', 'By way of contrast, the industrial zone was converted into residential housing, while the riverfront gained a park.'] }
  ];

  const TASK2_TYPES = [
    { key: 'opinion', name: 'Opinion / Agree-Disagree', frames: ['The statement that ____ is a widely debated issue.', 'I largely agree with this view because…', 'Nevertheless, an important counter-argument is that…', 'In conclusion, while the opposing side has some merit, I believe that…'] },
    { key: 'discussion', name: 'Discussion (Both Views)', frames: ['Some people argue that ____, while others maintain that ____.', 'On the one hand, proponents of X point to ____, since ____.', 'On the other hand, advocates of Y contend that ____.', 'In my view, a balanced position is preferable because…'] },
    { key: 'problem', name: 'Problem & Solution', frames: ['It is undeniable that ____ has become a pressing concern.', 'The principal cause of this problem is ____, compounded by ____.', 'A viable solution would be to ____, through initiatives such as ____.', 'In summary, addressing the root causes rather than the symptoms is essential.'] },
    { key: 'advantage', name: 'Advantages / Disadvantages', frames: ['There is little doubt that ____ offers considerable benefits.', 'The most obvious advantage is ____, which enables…', 'However, these gains are offset by notable drawbacks, particularly…', 'On balance, the merits outweigh the demerits provided that…'] }
  ];

  const BOOSTERS = {
    task1: {
      verbs: ['illustrates', 'compares', 'depicts', 'shows', 'reveals', 'highlights'],
      trend: ['rose steadily', 'climbed sharply', 'fluctuated', 'plateaued', 'declined gradually', 'remained stable'],
      comparative: ['substantially higher', 'marginally lower', 'a striking contrast', 'an upward trajectory', 'in stark contrast'],
      quant: ['roughly', 'approximately', 'just over', 'slightly above', 'in the region of']
    },
    opinion: { intro: ['widely debated', 'contested', 'a matter of contention', 'polarising'], stance: ['I firmly believe that', 'I am inclined to agree that', 'I take the view that', 'The evidence strongly suggests that'] },
    discussion: { intro: ['attracts fierce debate', 'divided opinion', 'two rival perspectives'], link: ['On the one hand', 'Conversely', 'Advocates contend that', 'Detractors argue that'] },
    problem: { intro: ['a growing concern', 'an escalating challenge', 'a pressing issue'], cause: ['is chiefly driven by', 'stems largely from', 'is exacerbated by'], solution: ['a multi-faceted approach', 'targeted interventions', 'coordinated action'] },
    advantage: { intro: ['offers undeniable benefits', 'brings considerable gains'], adv: ['A key advantage is that', 'Its principal benefit lies in'], dis: ['offset by shortcomings', 'balanced against clear drawbacks'], concl: ['on balance', 'all things considered', 'weighing the evidence'] }
  };

  const MODELS = [
    {
      task: 1, type: 'line', name: 'Line Graph — Internet Penetration', prompt: 'IELTS Task 1: The line graph shows the percentage of households with internet access in three countries between 2000 and 2020.',
      body: 'The line graph illustrates the proportion of households with internet access in Country A, Country B and Country C over the period from 2000 to 2020.\n\nOverall, all three countries experienced a marked upward trend, although Country A consistently led the way, while Country C recorded the most dramatic rise despite its low starting point.\n\nIn detail, Country A began at roughly 20% in 2000 and climbed steadily to just over 80% by 2020. Country B followed a similar trajectory, rising from 15% to around 65%, with a noticeable slowdown between 2010 and 2015. Country C, by contrast, grew slowly at first, reaching only 10% by 2010, before surging to approximately 60% during the final decade.\n\nTo summarise, the graphs reveal a general convergence in access levels, yet Country A retained its lead throughout the twenty-year period.',
      checks: [{ t: 'The overview is placed in the second paragraph', ok: true }, { t: 'Comparisons use comparative language, not random numbers alone', ok: true }, { t: 'Past tense is used consistently', ok: true }]
    },
    {
      task: 2, type: 'opinion', name: 'Opinion — Remote Work', prompt: 'IELTS Task 2: Some people believe that remote work will benefit society, while others think it damages workplace culture and productivity. To what extent do you agree or disagree?',
      body: 'The question of whether remote work ultimately benefits society has become increasingly prominent since the pandemic reshaped the labour market. While the drawbacks are real, I largely agree that remote work brings a net positive to individuals and communities.\n\nOn the one hand, the critics point to genuine losses. Collaboration often depends on informal exchanges that video calls struggle to replicate, and many employees report feeling isolated. For industries built on teamwork, prolonged absence from the office can erode both morale and the tacit knowledge that circulates in corridors and canteens.\n\nNevertheless, the advantages are compelling. Remote work dramatically reduces commuting, which cuts carbon emissions and gives workers hours back for family, exercise and study. It also widens opportunity, allowing talented people in smaller towns to access metropolitan salaries, and enabling parents and carers to remain in the workforce. These effects ripple outward: local economies are revived, and pressure on urban housing is relieved.\n\nIn conclusion, although remote work is not without its challenges, its capacity to redistribute time and opportunity, while easing environmental strain, makes it a broadly progressive development for society as a whole.',
      checks: [{ t: 'A clear position is stated in the introduction', ok: true }, { t: 'Each body paragraph has a topic sentence and a concrete example', ok: true }, { t: 'The conclusion restates the position without new arguments', ok: true }]
    },
    {
      task: 2, type: 'discussion', name: 'Discussion — University Fees', prompt: 'IELTS Task 2: Some people think university education should be free for all citizens. Others believe students should bear the cost. Discuss both views and give your own opinion.',
      body: 'The financing of higher education is a subject of fierce debate in almost every society. While free university education promises equality of access, charging students preserves institutional quality, and I believe the most equitable answer lies between the two positions.\n\nOn the one hand, advocates of free tuition argue that education is a public good. By removing fees, governments unlock talent regardless of background, break cycles of poverty, and raise the general skill level of the economy. Countries such as Norway demonstrate that high participation rates are possible without individual debt.\n\nOn the other hand, opponents contend that free tuition is neither free nor fair. It is paid for by general taxation, which places a heavy burden on those who never attend university, and it risks crowding out spending on primary and vocational education. Moreover, fully subsidised places can inflate demand, forcing caps that paradoxically make access more selective.\n\nIn my view, a hybrid model is the most pragmatic: heavily subsidised tuition for all, with additional means-tested grants for the least affluent. This preserves quality, shares the cost fairly across society, and keeps the doors of higher education open to those for whom it is genuinely transformative.\n\nIn conclusion, free tuition is seductive but fiscally and socially problemat; charge students in full is equally short-sighted. The wisest course is a shared-cost system calibrated to need.',
      checks: [{ t: 'Both views are given balanced treatment', ok: true }, { t: 'A personal position is clearly signalled', ok: true }, { t: 'Complex sentences and academic connectors are used', ok: true }]
    },
    {
      task: 1, type: 'process', name: 'Process — Recycled Paper', prompt: 'IELTS Task 1: The diagram outlines the stages of manufacturing recycled paper. Summarise the information by selecting and reporting the main features.',
      body: 'The diagram illustrates the nine-stage process by which waste paper is transformed into fresh paper for reuse.\n\nOverall, the process is linear and mechanical, beginning with the collection of raw material and ending with the delivery of finished rolls of paper.\n\nIn the first stage, used paper is deposited and soaked in water before being pulped mechanically to break the fibres apart. The resulting pulp is filtered to remove solids, then passed through a cleaning stage where it is bleached and de-inked. Next, the clean pulp is pressed into sheets on a rolling conveyor, where much of the moisture is expelled. These sheets are then dried over heated rollers, cut to the required size, and rolled into large reels ready for shipping to printers.\n\nIn short, the process converts discarded paper into a commercial product through a combination of soaking, filtering, bleaching and mechanical pressing that is almost entirely automated.',
      checks: [{ t: 'Stage nouns and passive voice dominate', ok: true }, { t: 'The overview captures the linear nature of the process', ok: true }, { t: 'Sequence words (first, next, then) structure the detail', ok: true }]
    }
  ];

  function cache() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) return null;
    let c = window.IELTS_AUTH.getScoped('writecoach', null);
    if (!c) { c = { submitted: [], ratings: {} }; window.IELTS_AUTH.setScoped('writecoach', c); }
    return window.IELTS_AUTH.getScoped('writecoach', null);
  }
  function save(c) { window.IELTS_AUTH.setScoped('writecoach', c); }

  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) window.IELTS_AUTH.onUserChange(() => { state.view = 'home'; });

  function ser(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function overlap(aw, bw) {
    const a = aw.split(' '), b = bw.split(' ');
    let m = 0;
    a.forEach((w) => { b.forEach((w2) => { if (w.length > 3 && w === w2) m++; }); });
    return m;
  }

  function openTask(t) { state.task = t; state.view = 'coach'; state.model = null; render(); }

  function chooseType() {
    state.view = 'generator';
    render();
  }

  function gen() {
    const idx = state.typeIdx || 0;
    const t2 = TASK2_TYPES[idx] || TASK2_TYPES[0];
    const booster = state.task === 1 ? BOOSTERS.task1 : BOOSTERS[t2.key];
    const frames = state.task === 1 ? TASK1_TYPES[idx].frames : t2.frames;
    const topic = $('#wt-topic') ? $('#wt-topic').value : 'the issue in question';
    let para = '';
    frames.forEach((f) => {
      para += f.split('____').join(esc(topic)) + ' ';
    });
    para += 'To enrich this frame, replace generic phrases with items from your vocabulary booster: ' +
      Object.values(booster).flat().slice(0, 8).join(', ') + '.\n\n' +
      'Your paragraph (draft in the box below):';
    state.draft = frames.join(' ').split('____').join(esc(topic));
    state.view = 'draft';
    render();
  }

  function prompt(t, bt) {
    const booster = t === 1 ? BOOSTERS.task1 : (BOOSTERS[bt] || { intro: [] });
    const ops = Object.entries(booster).flatMap(([k, v]) => v);
    const link = ops.slice(0, 5).join(' ');
    if (t === 1) return 'Open with: "' + (TASK1_TYPES[0].frames[0].split('____').join('the period')) + '" then vary the reporting verb — e.g. ' + BOOSTERS.task1.verbs.slice(0, 3).join(', ') + '. Try: ' + link;
    return 'Try framing: ' + (BOOSTERS[bt] ? Object.values(BOOSTERS[bt]).flat().slice(0, 8).join(', ') : 'each idea with a linked connector') + '.';
  }

  function loadExample(key) {
    const m = MODELS.find((x) => x.name === key);
    if (!m) return;
    state.model = m;
    state.view = 'model';
    render();
  }

  function setCheck(i, v) { state.checklist[i] = v; render(); }

  function feedback(len) {
    if (len < 100) return { band: 'Marks prompt', tip: 'Minimum 150 (Task 1) / 250 (Task 2) words.' };
    if (len >= 250) return { band: 'Approx. 5.5-6.5', tip: 'Good length. Now tighten the paragraph structure.' };
    return { band: 'Approx. 5.0-6.0', tip: 'Below the word count. Expand the middle paragraphs.' };
  }

  function submit() {
    const w = state.draft.trim().length;
    if (w < 40) { window.toast && window.toast('Write a draft first to self-assess.'); return; }
    const c = cache();
    c.submitted.push({ task: state.task, w, at: Date.now() });
    c.ratings[state.task] = state.checklist.filter(Boolean).length;
    save(c);
    state.submitted++;
    window.IELTS_AUTH.addActivity('writing', 'Writing Task ' + state.task + ' draft (' + w + ' words)', 5);
    if (window.IELTS_BAND && window.IELTS_BAND.recordMastery) window.IELTS_BAND.recordMastery('writing', state.checklist.filter(Boolean).length * 20);
    if (window.IELTS_DIAG && window.IELTS_DIAG.record) {
      const checked = state.checklist.filter(Boolean).length;
      window.IELTS_DIAG.record('writing', 'Writing Task ' + state.task + ' self-assessment', checked, state.checklist.length, { correct: checked, total: state.checklist.length });
    }
    render();
  }

  function render() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) { window.IELTS_AUTH.showScreen(); return; }
    if (state.view === 'coach') return renderCoach();
    if (state.view === 'generator') return renderGenerator();
    if (state.view === 'draft') return renderDraft();
    if (state.view === 'model') return renderModel();
    renderHome();
  }
  function back() { state.view = 'home'; render(); }

  function renderHome() {
    const c = cache();
    const subs = c.submitted.length;
    $('#writing-coach-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <h2 class="text-2xl font-extrabold text-[#f5f0e6]">✍️ Writing AI Coach & Studio</h2>
        <p class="text-sm text-[#f5f0e6]/60 mt-1">Task 1 &amp; 2 with Band 9 model answers, structure generators and vocabulary boosters.</p>
        ${subs ? '<p class="text-xs text-[#d4af37] mt-2">Drafts submitted: ' + subs + ' · Last self-ratings: Task 1 ' + (c.ratings[1] || 0) + '/5, Task 2 ' + (c.ratings[2] || 0) + '/5</p>' : ''}
      </div>
      <div class="grid md:grid-cols-2 gap-4 md:mb-4">
        <button class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] hover:border-[rgba(212,175,55,0.5)] rounded-xl p-6 text-left transition-all" onclick="IELTS_WRITING_COACH.open(1)">
          <p class="text-3xl mb-2">📊</p>
          <p class="font-bold text-[#f5f0e6]">Academic Task 1</p>
          <p class="text-xs text-[#f5f0e6]/60 mt-1">Report on charts, tables, processes and maps. 150 words minimum, 20 minutes.</p>
        </button>
        <button class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] hover:border-[rgba(212,175,55,0.5)] rounded-xl p-6 text-left transition-all" onclick="IELTS_WRITING_COACH.open(2)">
          <p class="text-3xl mb-2">📝</p>
          <p class="font-bold text-[#f5f0e6]">Task 2 Essay</p>
          <p class="text-xs text-[#f5f0e6]/60 mt-1">Opinion, discussion, problem-solution and advantage/disadvantage essays. 250 words, 40 minutes.</p>
        </button>
      </div>
      <h3 class="text-lg font-bold text-[#f5f0e6] mt-6 mb-3">Band 9 Model Answers</h3>
      <div class="grid md:grid-cols-2 gap-4">
        ${MODELS.map((m) => `
          <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.4)] rounded-xl p-5 flex items-start justify-between gap-3 transition-all">
            <div>
              <span class="text-[10px] font-bold text-[#d4af37] border border-[rgba(212,175,55,0.3)] px-2 py-0.5 rounded">Task ${m.task}</span>
              <p class="text-sm font-bold text-[#f5f0e6] mt-2">${esc(m.name)}</p>
              <p class="text-xs text-[#f5f0e6]/50 mt-1">${esc(m.prompt)}</p>
            </div>
            <button class="btn-primary text-sm shrink-0" onclick="IELTS_WRITING_COACH.load('${esc(m.name)}')">Study</button>
          </div>`).join('')}
      </div>`;
  }

  function renderCoach() {
    const is1 = state.task === 1;
    const types = is1 ? TASK1_TYPES : TASK2_TYPES;
    const bt = is1 ? 'task1' : (TASK2_TYPES[state.typeIdx || 0] ? TASK2_TYPES[state.typeIdx || 0].key : 'opinion');
    $('#writing-coach-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-extrabold text-[#f5f0e6]">✍️ Task ${is1 ? '1 · Charts & Datasets' : '2 · Essay'}</h2>
            <p class="text-sm text-[#f5f0e6]/60 mt-1">${is1 ? 'Report writing · 150 words · 20 minutes' : 'Essay writing · 250 words · 40 minutes'}</p>
          </div>
          <button class="btn-secondary text-sm" onclick="IELTS_WRITING_COACH.back()">← Back</button>
        </div>
        <p class="text-xs text-[#d4af37] mt-3">💡 ${esc(prompt(state.task, bt))}</p>
      </div>
      <div class="grid md:grid-cols-2 gap-4 md:mb-4">
        <button class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.4)] rounded-xl p-6 text-left transition-all" onclick="IELTS_WRITING_COACH.gen()">
          <p class="text-3xl mb-2">🧱</p>
          <p class="font-bold text-[#f5f0e6]">Structure Generator</p>
          <p class="text-xs text-[#f5f0e6]/60 mt-1">Pick ${is1 ? 'a chart type' : 'an essay type'} and get a paragraph skeleton with Academic English sentence frames.</p>
        </button>
        <button class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.4)] rounded-xl p-6 text-left transition-all" onclick="IELTS_WRITING_COACH.draft()">
          <p class="text-3xl mb-2">📝</p>
          <p class="font-bold text-[#f5f0e6]">Your Draft &amp; Self-Check</p>
          <p class="text-xs text-[#f5f0e6]/60 mt-1">Write your response, run the plan-do-review checklist and get an estimated band.</p>
        </button>
      </div>`;
  }

  function renderGenerator() {
    const is1 = state.task === 1;
    const types = is1 ? TASK1_TYPES : TASK2_TYPES;
    const t = types[state.typeIdx || 0];
    const idx = state.typeIdx || 0;
    const booster = is1 ? BOOSTERS.task1 : (BOOSTERS[t.key] || {});
    $('#writing-coach-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-extrabold text-[#f5f0e6]">🧱 Structure Generator</h2>
          <button class="btn-secondary text-sm" onclick="IELTS_WRITING_COACH.back()">← Back</button>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 mb-5">
        ${types.map((x, i) => `<button class="tab-pill ${i === idx ? 'active' : ''}" onclick="IELTS_WRITING_COACH.pick(${i})">${esc(x.name)}</button>`).join('')}
      </div>
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-5 mb-4">
        <p class="text-xs font-bold text-[#d4af37] mb-2">SENTENCE FRAMES</p>
        ${t.frames.map((f, i) => `<p class="text-sm text-[#f5f0e6]/85 mb-2"><span class="text-[#d4af37]/80 font-semibold mr-1">${i + 1}.</span><input type="text" value="${esc(f)}" class="w-full bg-transparent border-b border-[rgba(212,175,55,0.3)] text-[#f5f0e6] text-sm focus:outline-none focus:border-[#d4af37]" onfocus="this.select()" /></p>`).join('')}
      </div>
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-5">
        <p class="text-xs font-bold text-[#d4af37] mb-2">VOCABULARY BOOSTER</p>
        <div class="flex flex-wrap gap-2">
          ${is1
            ? [['reporting', BOOSTERS.task1.verbs], ['trends', BOOSTERS.task1.trend], ['comparisons', BOOSTERS.task1.comparative], ['quantifiers', BOOSTERS.task1.quant]].map(([k, v]) => `<span class="text-[10px] font-bold text-[#f5f0e6]/50 px-2" style="align-self:center">${k}:</span>` + v.map((x) => `<span class="text-xs border border-[rgba(212,175,55,0.25)] px-2 py-1 rounded cursor-pointer hover:border-[#d4af37] text-[#f5f0e6]" onclick="IELTS_WRITING_COACH.copy('${esc(x)}', this)">${esc(x)}</span>`).join('')).join('')
            : Object.entries(BOOSTERS[t.key] || {}).map(([k, v]) => `<span class="text-[10px] font-bold text-[#f5f0e6]/50 px-2" style="align-self:center">${k}:</span>` + v.map((x) => `<span class="text-xs border border-[rgba(212,175,55,0.25)] px-2 py-1 rounded cursor-pointer hover:border-[#d4af37] text-[#f5f0e6]" onclick="IELTS_WRITING_COACH.copy('${esc(x)}', this)">${esc(x)}</span>`).join('')).join('')}
        </div>
      </div>
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-5 mt-4">
        <p class="text-xs font-bold text-[#d4af37] mb-2">APPLY TO YOUR QUESTION</p>
        <textarea id="wt-topic" rows="2" class="w-full bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.3)] rounded-lg px-4 py-3 text-sm text-[#f5f0e6] focus:border-[rgba(212,175,55,0.6)] outline-none mb-3" placeholder="Paste the chart caption or essay question here…"></textarea>
        <div class="flex gap-3 flex-wrap">
          <button class="btn-primary text-sm" onclick="IELTS_WRITING_COACH.gen()">⚡ Generate Paragraph</button>
          <button class="btn-secondary text-sm" onclick="IELTS_WRITING_COACH.draft()">Write my draft →</button>
        </div>
      </div>`;
  }

  function renderDraft() {
    const is1 = state.task === 1;
    const nb = is1 ? 150 : 250;
    const f = feedback(state.draft.trim().length);
    const count = state.draft.length || 0;
    $('#writing-coach-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 class="text-xl font-extrabold text-[#f5f0e6]">📝 Your Draft</h2>
            <p class="text-sm text-[#f5f0e6]/60 mt-1">Task ${state.task} · Minimum ${nb} words · Word count: <span id="wt-count" class="text-[#d4af37] font-bold">${count}</span></p>
          </div>
          <button class="btn-secondary text-sm" onclick="IELTS_WRITING_COACH.back()">← Back</button>
        </div>
      </div>
      <textarea id="wt-draft" rows="12" placeholder="Paste your question above, then write your response here…" oninput="IELTS_WRITING_COACH.onDraft(this.value)" class="w-full bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.3)] rounded-lg px-4 py-3 text-sm text-[#f5f0e6] focus:border-[rgba(212,175,55,0.6)] outline-none">${esc(state.draft)}</textarea>
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-5 mt-4">
        <p class="text-xs font-bold text-[#d4af37] mb-3">PLAN-DO-REVIEW CHECKLIST</p>
        ${['I answered the question directly (task response).', 'My paragraphs each have a clear topic sentence (cohesion).', 'I used topic-specific vocabulary from the booster (lexical resource).', 'I varied sentence structures and used linking words (grammar & range).', 'I checked spelling and articles before submitting (accuracy).'].map((x, i) => `
          <label class="flex items-center gap-3 mb-2 cursor-pointer">
            <input type="checkbox" ${state.checklist[i] ? 'checked' : ''} onchange="IELTS_WRITING_COACH.check(${i}, this.checked)" class="accent-[#d4af37]" />
            <span class="text-sm text-[#f5f0e6]/80">${esc(x)}</span>
          </label>`).join('')}
        <div class="flex items-center justify-between mt-4 flex-wrap gap-3">
          <p class="text-sm text-[#f5f0e6]">Self-assessed band: <span class="font-bold text-[#d4af37]">${esc(f.band)}</span></p>
          <button class="btn-primary text-sm" onclick="IELTS_WRITING_COACH.submit()">✅ Mark Draft Submitted</button>
        </div>
      </div>
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-5 mt-4" id="wt-feedback">
        <p class="text-xs font-bold text-[#d4af37] mb-1">COACH'S TIP</p>
        <p id="wt-feedback-tip" class="text-sm text-[#f5f0e6]/75">${esc(f.tip)}</p>
      </div>`;
  }

  function onDraft(v) {
    state.draft = v;
    const c = $('#wt-count');
    if (c) c.textContent = String(v.length);
    const tip = $('#wt-feedback-tip');
    if (tip) tip.textContent = feedback(v.trim().length).tip;
  }

  function renderModel() {
    const m = state.model;
    if (!m) { renderHome(); return; }
    $('#writing-coach-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <span class="text-[10px] font-bold text-[#d4af37] border border-[rgba(212,175,55,0.3)] px-2 py-0.5 rounded">Task ${m.task} · Band 9</span>
            <h2 class="text-xl font-extrabold text-[#f5f0e6] mt-2">${esc(m.name)}</h2>
            <p class="text-sm text-[#f5f0e6]/60 mt-1">${esc(m.prompt)}</p>
          </div>
          <button class="btn-secondary text-sm" onclick="IELTS_WRITING_COACH.back()">← Back</button>
        </div>
      </div>
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-6 mb-4">
        <p class="text-xs font-bold text-[#d4af37] mb-3">MODEL ANSWER</p>
        <p class="text-sm text-[#f5f0e6]/85 leading-relaxed whitespace-pre-wrap">${esc(m.body)}</p>
      </div>
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-5">
        <p class="text-xs font-bold text-[#d4af37] mb-3">WHAT MAKES IT BAND 9</p>
        ${m.checks.map((c) => `<p class="text-sm text-[#f5f0e6]/80 mb-1.5">✅ ${esc(c.t)}</p>`).join('')}
      </div>`;
  }

  function pick(i) { state.typeIdx = i; render(); }
  function copy(t, el) {
    navigator.clipboard && navigator.clipboard.writeText(t).then(() => { if (el) { el.style.color = '#d4af37'; } }).catch(() => {});
  }

  window.IELTS_WRITING_COACH = { render, open: openTask, draft: () => { state.view = 'draft'; render(); }, onDraft, gen, pick, load: loadExample, back, submit, check: setCheck, copy, renderModel };
})();