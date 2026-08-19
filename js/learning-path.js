/* ============================================================
   IELTS Master — Learning Path & Reading Comprehension Hub
   Integrates: British Council, ReadTheory, BBC Learning English
   ============================================================ */
(function () {
  'use strict';

  var RESOURCES = {
    a1: {
      britishCouncil: { title: 'British Council A1', url: 'https://learnenglish.britishcouncil.org/en/general-english/a1', desc: 'Basic grammar, vocabulary and everyday expressions', topics: ['Greetings', 'Numbers', 'Colors', 'Family', 'Daily Routine'] },
      readTheory: { title: 'ReadTheory A1', url: 'https://readtheory.org/', desc: 'Adaptive reading comprehension exercises', topics: ['Simple sentences', 'Basic comprehension', 'Short paragraphs'] },
      bbcLearning: { title: 'BBC Learning English A1', url: 'https://www.bbc.co.uk/learningenglish/english/a1', desc: 'Essential English for beginners', topics: ['Vocabulary', 'Grammar', 'Pronunciation'] }
    },
    a2: {
      britishCouncil: { title: 'British Council A2', url: 'https://learnenglish.britishcouncil.org/en/general-english/a2', desc: 'Elementary grammar and vocabulary', topics: ['Past tense', 'Comparisons', 'Directions', 'Shopping'] },
      readTheory: { title: 'ReadTheory A2', url: 'https://readtheory.org/', desc: 'Building reading stamina', topics: ['Paragraph comprehension', 'Main ideas', 'Context clues'] },
      bbcLearning: { title: 'BBC Learning English A2', url: 'https://www.bbc.co.uk/learningenglish/english/a2', desc: 'Elementary English skills', topics: ['Phrasal verbs', 'Common idioms', 'Conversation'] }
    },
    b1: {
      britishCouncil: { title: 'British Council B1', url: 'https://learnenglish.britishcouncil.org/en/general-english/b1', desc: 'Intermediate grammar and communication', topics: ['Conditionals', 'Reported speech', 'Formal writing'] },
      readTheory: { title: 'ReadTheory B1', url: 'https://readtheory.org/', desc: 'Intermediate reading comprehension', topics: ['Inference', 'Author purpose', 'Text structure'] },
      bbcLearning: { title: 'BBC Learning English B1', url: 'https://www.bbc.co.uk/learningenglish/english/b1', desc: 'Intermediate English', topics: ['News English', 'Academic vocabulary', 'Essay structure'] }
    },
    b2: {
      britishCouncil: { title: 'British Council B2', url: 'https://learnenglish.britishcouncil.org/en/general-english/b2', desc: 'Advanced grammar and expression', topics: ['Complex sentences', 'Persuasive writing', 'Debate'] },
      readTheory: { title: 'ReadTheory B2', url: 'https://readtheory.org/', desc: 'Advanced reading skills', topics: ['Critical analysis', 'Argumentation', 'Research texts'] },
      bbcLearning: { title: 'BBC Learning English B2', url: 'https://www.bbc.co.uk/learningenglish/english/b2', desc: 'Upper intermediate English', topics: ['Business English', 'Academic writing', 'Presentations'] }
    },
    c1: {
      britishCouncil: { title: 'British Council C1', url: 'https://learnenglish.britishcouncil.org/en/general-english/c1', desc: 'Advanced language mastery', topics: ['Academic writing', 'Research papers', 'Formal debate'] },
      readTheory: { title: 'ReadTheory C1', url: 'https://readtheory.org/', desc: 'Expert reading comprehension', topics: ['Academic texts', 'Literary analysis', 'Critical thinking'] },
      bbcLearning: { title: 'BBC Learning English C1', url: 'https://www.bbc.co.uk/learningenglish/english/c1', desc: 'Advanced English', topics: ['Idiomatic expressions', 'Nuanced vocabulary', 'Style'] }
    },
    c2: {
      britishCouncil: { title: 'British Council C2', url: 'https://learnenglish.britishcouncil.org/en/general-english/c2', desc: 'Native-level proficiency', topics: ['Literature', 'Philosophy', 'Academic research'] },
      readTheory: { title: 'ReadTheory C2', url: 'https://readtheory.org/', desc: 'Expert-level comprehension', topics: ['Complex literature', 'Scientific papers', 'Legal texts'] },
      bbcLearning: { title: 'BBC Learning English C2', url: 'https://www.bbc.co.uk/learningenglish/english/c2', desc: 'Proficiency English', topics: ['Advanced idioms', 'Cultural references', 'Literary analysis'] }
    }
  };

  var PRACTICE_TESTS = {
    a1: [{ id: 'pt-a1', title: 'Basic Reading', source: 'British Council A1', timeLimit: 10, questions: [
      { type: 'mcq', passage: 'My name is Maria. I am from Spain. I am 25 years old. I live in Madrid with my family. I have two brothers and one sister. My father is a teacher and my mother is a nurse.', question: 'Where is Maria from?', options: ['England', 'Spain', 'France', 'Germany'], answer: 'B', explanation: 'The passage says "I am from Spain."' },
      { type: 'mcq', passage: 'My name is Maria. I am from Spain. I am 25 years old.', question: 'How old is Maria?', options: ['22', '23', '25', '27'], answer: 'C', explanation: 'The passage says "I am 25 years old."' },
      { type: 'mcq', passage: 'My father is a teacher and my mother is a nurse.', question: "What does Maria's father do?", options: ['Doctor', 'Nurse', 'Teacher', 'Engineer'], answer: 'C', explanation: 'The passage says "My father is a teacher."' }
    ]}],
    a2: [{ id: 'pt-a2', title: 'Elementary Reading', source: 'British Council A2', timeLimit: 12, questions: [
      { type: 'mcq', passage: 'Last summer Tom went on holiday to Italy. The flight from London to Rome took about two and a half hours.', question: 'How long was the flight?', options: ['About two hours', 'About two and a half hours', 'About three hours', 'About four hours'], answer: 'B', explanation: 'The passage says "about two and a half hours."' },
      { type: 'mcq', passage: 'They stayed in a small hotel near the city centre.', question: 'Where did they stay?', options: ['A large hotel', 'A small hotel near the centre', 'A campsite', "A friend's house"], answer: 'B', explanation: 'The passage says "a small hotel near the city centre."' },
      { type: 'tf', passage: 'Tom especially liked the Colosseum because it was very old and impressive.', question: 'Tom thought the Colosseum was modern.', answer: 'False', explanation: 'The passage says it was "very old and impressive."' }
    ]}],
    b1: [{ id: 'pt-b1', title: 'Intermediate Reading', source: 'ReadTheory B1', timeLimit: 18, questions: [
      { type: 'mcq', passage: 'Sustainable development refers to development that meets the needs of the present without compromising the ability of future generations.', question: 'What does sustainable development mean?', options: ['Economic growth at any cost', 'Meeting present needs without harming future generations', 'Protecting only the environment', 'Social inclusion above all else'], answer: 'B', explanation: 'The passage defines it as meeting present needs without compromising future generations.' },
      { type: 'mcq', passage: 'This definition was first introduced by the United Nations in 1987.', question: 'When was the definition introduced?', options: ['1977', '1987', '1997', '2007'], answer: 'B', explanation: 'The passage says 1987.' },
      { type: 'tfng', passage: 'Economic growth often comes at the expense of the environment.', question: 'Economic growth always benefits the environment.', answer: 'False', explanation: 'It "often comes at the expense of the environment."' }
    ]}],
    b2: [{ id: 'pt-b2', title: 'Upper-Intermediate Reading', source: 'BBC Learning English B2', timeLimit: 22, questions: [
      { type: 'mcq', passage: 'The opacity of many AI systems — often described as "black boxes" — makes it difficult to understand how decisions are reached.', question: 'What does "black boxes" mean?', options: ['Physical hardware', 'Opaque decision-making systems', 'Illegal applications', 'Always wrong systems'], answer: 'B', explanation: '"Black boxes" refers to systems whose decision-making is opaque.' },
      { type: 'mcq', passage: 'Algorithmic bias can perpetuate existing inequalities if the training data reflects historical prejudices.', question: 'Why is algorithmic bias a concern?', options: ['It makes AI slower', 'It perpetuates inequalities', 'It increases costs', 'It prevents learning'], answer: 'B', explanation: 'It "can perpetuate existing inequalities."' }
    ]}],
    c1: [{ id: 'pt-c1', title: 'Advanced Reading', source: 'ReadTheory C1', timeLimit: 28, questions: [
      { type: 'mcq', passage: 'The Sapir-Whorf hypothesis in its strong form has largely been discredited. The weaker version — linguistic relativity — contends that language influences thought in measurable ways.', question: 'What does the passage suggest about the hypothesis?', options: ['Both forms are accepted', 'Strong form discredited, weak form has support', 'Completely rejected', 'Only applies to color'], answer: 'B', explanation: 'Strong version discredited, weak form has research support.' },
      { type: 'mcq', passage: 'Speakers of languages with more color terms can distinguish between colors more rapidly.', question: 'What evidence supports linguistic relativity?', options: ['Different speaker numbers', 'More color terms = faster distinction', 'Same number of terms', 'No influence'], answer: 'B', explanation: 'Speakers with more color terms distinguish colors faster.' }
    ]}],
    c2: [{ id: 'pt-c2', title: 'Proficiency Reading', source: 'British Council C2', timeLimit: 32, questions: [
      { type: 'mcq', passage: 'The Copenhagen interpretation maintains that quantum systems do not possess definite properties until they are measured — a position that elevates the role of the observer.', question: 'What does the Copenhagen interpretation do?', options: ['Proven correct', 'Gives measurement a special role', 'Is deterministic', 'Abandoned'], answer: 'B', explanation: 'It elevates the role of measurement.' },
      { type: 'mcq', passage: 'The preference for the Copenhagen interpretation may owe more to pragmatic considerations than to any demonstrated philosophical superiority.', question: 'Why do physicists prefer it?', options: ['Philosophical superiority', 'Practical convenience', 'Experimental proof', 'Easier understanding'], answer: 'B', explanation: 'Preference is pragmatic, not philosophical.' }
    ]}]
  };

  var $ = function(sel) { return document.querySelector(sel); };
  var esc = function(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); };

  function renderLearningPath() {
    var auth = window.IELTS_AUTH;
    var user = auth ? auth.getCurrentUser() : null;
    var xp = user ? user.xp : 0;
    var LEVELS = window.IELTS_DATA.LEVELS;
    var current = LEVELS[0];
    for (var i = 0; i < LEVELS.length; i++) { if (xp >= LEVELS[i].minXp) current = LEVELS[i]; }
    var next = null;
    for (var j = 0; j < LEVELS.length; j++) { if (LEVELS[j].minXp > xp) { next = LEVELS[j]; break; } }
    var pct = next ? Math.min(100, Math.round(((xp - current.minXp) / (next.minXp - current.minXp)) * 100)) : 100;
    var res = RESOURCES[current.id] || RESOURCES.a1;

    var colorMap = { emerald: '#059669', sky: '#0284c7', amber: '#d97706', orange: '#ea580c', violet: '#7c3aed', rose: '#e11d48' };
    var bgMap = { emerald: '#ecfdf5', sky: '#f0f9ff', amber: '#fffbeb', orange: '#fff7ed', violet: '#f5f3ff', rose: '#fff1f2' };

    var levelCards = '';
    for (var k = 0; k < LEVELS.length; k++) {
      var l = LEVELS[k];
      var reached = xp >= l.minXp;
      levelCards += '<div class="bg-white rounded-2xl border ' + (reached ? 'border-brand-300 shadow-md hover:shadow-lg' : 'border-slate-200 opacity-60') + ' p-5 transition-all cursor-pointer" onclick="' + (reached ? "window.LEARNING_PATH.showDetail('" + l.id + "')" : '') + '"><div class="flex items-center justify-between mb-2"><span class="text-3xl">' + l.icon + '</span><span class="text-xs font-bold px-2 py-1 rounded-full" style="background:' + (bgMap[l.color] || '#f1f5f9') + ';color:' + (colorMap[l.color] || '#64748b') + '">' + l.name + '</span></div><p class="text-sm text-slate-600">' + esc(l.desc) + '</p><p class="text-xs mt-2 ' + (reached ? 'text-emerald-600 font-semibold' : 'text-slate-400') + '">' + (reached ? '\u2713 Unlocked' : '\uD83D\uDD12 Requires ' + l.minXp + ' XP') + '</p></div>';
    }

    var topicTags = function(topics, color) { return topics.map(function(t) { return '<span class="px-2 py-1 bg-' + color + '-100 text-' + color + '-700 text-xs rounded-full">' + t + '</span>'; }).join(''); };

    var testCards = '';
    var tests = PRACTICE_TESTS[current.id] || [];
    for (var ti = 0; ti < tests.length; ti++) {
      var t = tests[ti];
      testCards += '<div class="bg-slate-50 rounded-xl p-4 hover:shadow-md transition cursor-pointer" onclick="window.LEARNING_PATH.startTest(\'' + current.id + '\')"><h4 class="font-semibold text-slate-800">' + t.title + '</h4><p class="text-xs text-slate-500 mt-1">Source: ' + t.source + ' \u00B7 \u23F1\uFE0F ' + t.timeLimit + ' min \u00B7 ' + t.questions.length + ' questions</p><button class="mt-3 px-4 py-2 bg-brand-600 text-white text-sm rounded-lg hover:bg-brand-700 transition">Start Test</button></div>';
    }

    var el = $('#levels-content');
    if (!el) return;
    el.innerHTML = '<div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6"><div class="flex flex-wrap items-center justify-between gap-4"><div><p class="text-sm text-slate-500">Learning Path</p><p class="text-2xl font-extrabold text-slate-900">' + current.icon + ' ' + current.name + '</p></div><div class="text-right"><p class="text-3xl font-extrabold text-brand-600">' + xp + ' <span class="text-sm font-semibold text-slate-400">XP</span></p><p class="text-xs text-slate-500">' + (next ? (next.minXp - xp) + ' XP to ' + next.name : 'Max level! \uD83C\uDFC6') + '</p></div></div><div class="mt-4 h-3 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full transition-all" style="width:' + pct + '%"></div></div></div>' +
    '<div class="mb-8"><h3 class="text-lg font-bold text-slate-900 mb-4">\uD83D\uDCDA Current Level Resources</h3><div class="grid md:grid-cols-3 gap-4">' +
    '<div class="bg-blue-50 rounded-2xl p-5 border border-blue-100"><div class="flex items-center gap-2 mb-2"><span class="text-xl">\uD83C\uDFDB\uFE0F</span><h4 class="font-bold text-blue-800">British Council</h4></div><p class="text-sm text-slate-600 mb-2">' + esc(res.britishCouncil.desc) + '</p><div class="flex flex-wrap gap-1.5 mb-3">' + topicTags(res.britishCouncil.topics, 'blue') + '</div><a href="' + res.britishCouncil.url + '" target="_blank" class="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">Practice \u2192</a></div>' +
    '<div class="bg-green-50 rounded-2xl p-5 border border-green-100"><div class="flex items-center gap-2 mb-2"><span class="text-xl">\uD83D\uDCD6</span><h4 class="font-bold text-green-800">ReadTheory</h4></div><p class="text-sm text-slate-600 mb-2">' + esc(res.readTheory.desc) + '</p><div class="flex flex-wrap gap-1.5 mb-3">' + topicTags(res.readTheory.topics, 'green') + '</div><a href="' + res.readTheory.url + '" target="_blank" class="inline-block px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition">Practice \u2192</a></div>' +
    '<div class="bg-red-50 rounded-2xl p-5 border border-red-100"><div class="flex items-center gap-2 mb-2"><span class="text-xl">\uD83D\uDCFB</span><h4 class="font-bold text-red-800">BBC Learning English</h4></div><p class="text-sm text-slate-600 mb-2">' + esc(res.bbcLearning.desc) + '</p><div class="flex flex-wrap gap-1.5 mb-3">' + topicTags(res.bbcLearning.topics, 'red') + '</div><a href="' + res.bbcLearning.url + '" target="_blank" class="inline-block px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition">Practice \u2192</a></div>' +
    '</div></div>' +
    '<div class="mb-8"><h3 class="text-lg font-bold text-slate-900 mb-4">\uD83E\uDDEA Practice Tests \u2014 ' + current.name + '</h3>' + (testCards ? '<div class="grid md:grid-cols-2 gap-4">' + testCards + '</div>' : '<p class="text-sm text-slate-500">Complete activities to unlock practice tests for this level.</p>') + '</div>' +
    '<h3 class="text-lg font-bold text-slate-900 mb-4">\uD83D\uDDFA\uFE0F All CEFR Levels</h3><div class="grid md:grid-cols-3 gap-4">' + levelCards + '</div>';
  }

  function showLevelDetail(levelId) {
    var LEVELS = window.IELTS_DATA.LEVELS;
    var lvl = null;
    for (var i = 0; i < LEVELS.length; i++) { if (LEVELS[i].id === levelId) { lvl = LEVELS[i]; break; } }
    if (!lvl) return;
    var res = RESOURCES[levelId] || RESOURCES.a1;
    var topicTags = function(topics, color) { return topics.map(function(t) { return '<span class="px-2 py-1 bg-' + color + '-100 text-' + color + '-700 text-xs rounded-full">' + t + '</span>'; }).join(''); };

    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = '<div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"><div class="flex justify-between items-center mb-4"><h3 class="text-xl font-extrabold text-slate-900">' + lvl.icon + ' ' + esc(lvl.name) + '</h3><button onclick="this.closest(\'.fixed\').remove()" class="text-2xl text-slate-400 hover:text-slate-600">&times;</button></div><p class="text-slate-600 mb-6">' + esc(lvl.desc) + '</p><div class="grid md:grid-cols-3 gap-4 mb-6"><div class="bg-blue-50 rounded-xl p-4"><h4 class="font-bold text-blue-800 mb-1">\uD83C\uDFDB\uFE0F British Council</h4><p class="text-xs text-slate-500 mb-2">' + esc(res.britishCouncil.desc) + '</p><div class="flex flex-wrap gap-1 mb-2">' + topicTags(res.britishCouncil.topics, 'blue') + '</div><a href="' + res.britishCouncil.url + '" target="_blank" class="text-blue-600 hover:underline text-sm">Visit \u2192</a></div><div class="bg-green-50 rounded-xl p-4"><h4 class="font-bold text-green-800 mb-1">\uD83D\uDCD6 ReadTheory</h4><p class="text-xs text-slate-500 mb-2">' + esc(res.readTheory.desc) + '</p><div class="flex flex-wrap gap-1 mb-2">' + topicTags(res.readTheory.topics, 'green') + '</div><a href="' + res.readTheory.url + '" target="_blank" class="text-green-600 hover:underline text-sm">Visit \u2192</a></div><div class="bg-red-50 rounded-xl p-4"><h4 class="font-bold text-red-800 mb-1">\uD83D\uDCFB BBC Learning</h4><p class="text-xs text-slate-500 mb-2">' + esc(res.bbcLearning.desc) + '</p><div class="flex flex-wrap gap-1 mb-2">' + topicTags(res.bbcLearning.topics, 'red') + '</div><a href="' + res.bbcLearning.url + '" target="_blank" class="text-red-600 hover:underline text-sm">Visit \u2192</a></div></div><button onclick="this.closest(\'.fixed\').remove(); window.LEARNING_PATH.startTest(\'' + levelId + '\')" class="w-full py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition">Start Practice Test</button></div>';
    document.body.appendChild(modal);
  }

  var testState = { test: null, qi: 0, score: 0, answers: [], timer: null };

  function startTest(levelId) {
    var tests = PRACTICE_TESTS[levelId];
    if (!tests || !tests.length) { alert('No practice tests for this level yet.'); return; }
    var modals = document.querySelectorAll('.fixed');
    for (var m = 0; m < modals.length; m++) modals[m].remove();
    if (window.showSection) window.showSection('levels');
    testState = { test: tests[0], qi: 0, score: 0, answers: [], timer: null };
    renderTestQuestion();
    startTestTimer();
  }

  function renderTestQuestion() {
    var test = testState.test, qi = testState.qi, score = testState.score;
    var q = test.questions[qi];
    var opts = '';
    if (q.type === 'mcq') {
      opts = '<div class="space-y-2">';
      for (var i = 0; i < q.options.length; i++) {
        opts += '<label class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition border border-transparent hover:border-brand-200"><input type="radio" name="pt-answer" value="' + String.fromCharCode(65 + i) + '" class="accent-brand-600"><span class="text-sm text-slate-700">' + esc(q.options[i]) + '</span></label>';
      }
      opts += '</div>';
    } else {
      opts = '<div class="space-y-2"><label class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition"><input type="radio" name="pt-answer" value="True" class="accent-brand-600"><span class="text-sm">True</span></label><label class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition"><input type="radio" name="pt-answer" value="False" class="accent-brand-600"><span class="text-sm">False</span></label>' + (q.type === 'tfng' ? '<label class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition"><input type="radio" name="pt-answer" value="Not Given" class="accent-brand-600"><span class="text-sm">Not Given</span></label>' : '') + '</div>';
    }
    var pct = ((qi + 1) / test.questions.length * 100).toFixed(0);
    var el = $('#levels-content');
    if (!el) return;
    el.innerHTML = '<div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"><div class="flex justify-between items-center mb-4"><h3 class="text-lg font-extrabold text-slate-900">' + esc(test.title) + '</h3><div id="pt-timer" class="font-mono text-brand-600 font-bold text-lg"></div></div><div class="mb-4"><div class="flex justify-between text-xs text-slate-500 mb-1"><span>Q' + (qi + 1) + ' / ' + test.questions.length + '</span><span>Score: ' + score + '</span></div><div class="h-2 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-brand-500 rounded-full transition-all" style="width:' + pct + '%"></div></div></div><div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5"><p class="text-slate-700 leading-relaxed">' + esc(q.passage) + '</p></div><h4 class="font-semibold text-slate-800 mb-3">' + esc(q.question) + '</h4>' + opts + '<div class="flex justify-between mt-6"><button onclick="window.LEARNING_PATH.prev()" class="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition ' + (qi === 0 ? 'invisible' : '') + '">\u2190 Previous</button><button onclick="window.LEARNING_PATH.submit()" class="px-5 py-2.5 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition">' + (qi === test.questions.length - 1 ? 'Submit Test' : 'Next \u2192') + '</button></div></div>';
    startTestTimer();
  }

  function submit() {
    var q = testState.test.questions[testState.qi];
    var sel = document.querySelector('input[name="pt-answer"]:checked');
    var ua = sel ? sel.value : null;
    var ok = (q.type === 'mcq') ? (ua === q.answer) : (ua === q.answer);
    if (ok) testState.score++;
    testState.answers.push({ question: q.question, userAnswer: ua, correctAnswer: q.answer, isCorrect: ok, explanation: q.explanation });
    if (testState.qi < testState.test.questions.length - 1) { testState.qi++; renderTestQuestion(); }
    else finishTest();
  }

  function prev() { if (testState.qi > 0) { testState.qi--; renderTestQuestion(); } }

  function startTestTimer() {
    if (testState.timer) clearInterval(testState.timer);
    var el = document.getElementById('pt-timer');
    if (!el || !testState.test) return;
    var rem = testState.test.timeLimit * 60;
    testState.timer = setInterval(function() {
      var m = Math.floor(rem / 60), s = rem % 60;
      el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
      if (rem <= 0) { clearInterval(testState.timer); finishTest(); }
      rem--;
    }, 1000);
  }

  function finishTest() {
    if (testState.timer) clearInterval(testState.timer);
    var test = testState.test, score = testState.score, answers = testState.answers;
    var pct = Math.round(score / test.questions.length * 100);
    var xp = score * 5;
    var auth = window.IELTS_AUTH;
    if (auth && auth.getCurrentUser()) {
      var u = auth.getCurrentUser();
      u.xp = (u.xp || 0) + xp;
      if (auth.saveUser) auth.saveUser(u);
      else localStorage.setItem('ielts_user', JSON.stringify(u));
    }
    var rows = '';
    for (var i = 0; i < answers.length; i++) {
      var a = answers[i];
      rows += '<div class="p-3 rounded-xl ' + (a.isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200') + '"><div class="flex items-start gap-2"><span>' + (a.isCorrect ? '\u2705' : '\u274C') + '</span><div><p class="font-semibold text-slate-800 text-sm">Q' + (i + 1) + ': ' + esc(a.question) + '</p><p class="text-xs text-slate-500">Your answer: ' + (a.userAnswer || 'No answer') + '</p>' + (!a.isCorrect ? '<p class="text-xs text-emerald-600 font-medium">Correct: ' + esc(String(a.correctAnswer)) + '</p><p class="text-xs text-slate-400 mt-0.5">' + esc(a.explanation) + '</p>' : '') + '</div></div></div>';
    }
    var el = $('#levels-content');
    if (!el) return;
    el.innerHTML = '<div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"><h3 class="text-xl font-extrabold text-slate-900 mb-4">\uD83C\uDF89 Test Complete!</h3><div class="text-center mb-6"><p class="text-5xl font-extrabold text-brand-600">' + pct + '%</p><p class="text-slate-500 mt-2">' + score + ' / ' + test.questions.length + ' correct</p><p class="text-emerald-600 font-bold mt-1">+' + xp + ' XP earned!</p></div><div class="space-y-3 mb-6">' + rows + '</div><div class="flex gap-4"><button onclick="window.LEARNING_PATH.render()" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition">\u2190 Back to Learning Path</button><button onclick="window.LEARNING_PATH.startTest(\'' + test.id.replace('pt-', '') + '\')" class="flex-1 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition">Retry Test</button></div></div>';
  }

  function renderReadingHub() { var _targetId = 'reading-hub-content'; var _el = $('#reading-hub-content') || $('#levels-content'); var _origEl = null; try { _origEl = $('#levels-content'); } catch(e) {}
    var LEVELS = window.IELTS_DATA.LEVELS;
    var colorMap = { emerald: '#059669', sky: '#0284c7', amber: '#d97706', orange: '#ea580c', violet: '#7c3aed', rose: '#e11d48' };
    var bgMap = { emerald: '#ecfdf5', sky: '#f0f9ff', amber: '#fffbeb', orange: '#fff7ed', violet: '#f5f3ff', rose: '#fff1f2' };

    var lvlBtns = '';
    for (var i = 0; i < LEVELS.length; i++) {
      var l = LEVELS[i];
      lvlBtns += '<button onclick="window.LEARNING_PATH.startTest(\'' + l.id + '\')" class="px-4 py-2 rounded-xl text-sm font-bold border-2 transition hover:scale-105" style="border-color:' + (colorMap[l.color] || '#94a3b8') + ';color:' + (colorMap[l.color] || '#64748b') + ';background:' + (bgMap[l.color] || '#f1f5f9') + '">' + l.icon + ' ' + l.shortName + '</button>';
    }

    var bcResources = [
      { title: 'General English', url: 'https://learnenglish.britishcouncil.org/en/', levels: 'All' },
      { title: 'Grammar & Vocabulary', url: 'https://learnenglish.britishcouncil.org/en/grammar-vocabulary', levels: 'All' },
      { title: 'Skills (R/W/L/S)', url: 'https://learnenglish.britishcouncil.org/en/skills', levels: 'All' },
      { title: 'IELTS Preparation', url: 'https://learnenglish.britishcouncil.org/en/ielts', levels: 'B1\u2013C2' },
      { title: 'Everyday English', url: 'https://learnenglish.britishcouncil.org/en/everyday-english', levels: 'A1\u2013B1' }
    ];
    var rtResources = [
      { title: 'Adaptive Reading', url: 'https://readtheory.org/', desc: 'Personalized exercises that adapt to your level' },
      { title: 'Practice Tests', url: 'https://readtheory.org/', desc: 'Timed comprehension practice' }
    ];
    var bbcResources = [
      { title: '6 Minute English', url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english', levels: 'B1\u2013B2' },
      { title: 'News Report English', url: 'https://www.bbc.co.uk/learningenglish/english/features/news-review', levels: 'B1\u2013C1' },
      { title: 'The Writers Room', url: 'https://www.bbc.co.uk/learningenglish/english/features/writing', levels: 'B2\u2013C2' },
      { title: 'English at University', url: 'https://www.bbc.co.uk/learningenglish/english/features/english-at-university', levels: 'B2\u2013C2' },
      { title: 'The English We Speak', url: 'https://www.bbc.co.uk/learningenglish/english/features/the-english-we-speak', levels: 'B1\u2013C1' }
    ];

    var bcItems = '', rtItems = '', bbcItems = '';
    for (var j = 0; j < bcResources.length; j++) bcItems += '<li class="flex items-center gap-2"><a href="' + bcResources[j].url + '" target="_blank" class="text-blue-600 hover:underline text-sm">' + bcResources[j].title + '</a><span class="text-[10px] text-slate-400">' + bcResources[j].levels + '</span></li>';
    for (var k = 0; k < rtResources.length; k++) rtItems += '<li><a href="' + rtResources[k].url + '" target="_blank" class="text-green-600 hover:underline text-sm">' + rtResources[k].title + '</a><p class="text-[10px] text-slate-400">' + rtResources[k].desc + '</p></li>';
    for (var m = 0; m < bbcResources.length; m++) bbcItems += '<li class="flex items-center gap-2"><a href="' + bbcResources[m].url + '" target="_blank" class="text-red-600 hover:underline text-sm">' + bbcResources[m].title + '</a><span class="text-[10px] text-slate-400">' + bbcResources[m].levels + '</span></li>';

    var allTestCards = '';
    var keys = Object.keys(PRACTICE_TESTS);
    for (var ki = 0; ki < keys.length; ki++) {
      var lid = keys[ki];
      var tests = PRACTICE_TESTS[lid];
      var lvl = null;
      for (var li = 0; li < LEVELS.length; li++) { if (LEVELS[li].id === lid) { lvl = LEVELS[li]; break; } }
      for (var ti = 0; ti < tests.length; ti++) {
        var t = tests[ti];
        allTestCards += '<div class="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition"><div class="flex items-center gap-2 mb-2"><span class="text-2xl">' + (lvl ? lvl.icon : '\uD83D\uDCDD') + '</span><span class="text-xs font-bold text-slate-500">' + (lvl ? lvl.name : lid.toUpperCase()) + '</span></div><h4 class="font-bold text-slate-800">' + t.title + '</h4><p class="text-xs text-slate-500 mt-1">Source: ' + t.source + ' \u00B7 \u23F1\uFE0F ' + t.timeLimit + ' min \u00B7 ' + t.questions.length + ' Qs</p><button onclick="window.LEARNING_PATH.startTest(\'' + lid + '\')" class="mt-3 px-4 py-2 bg-brand-600 text-white text-sm rounded-lg font-bold hover:bg-brand-700 transition">Start</button></div>';
      }
    }

    var el = $('#reading-hub-content') || document.getElementById('reading-hub-content');
    if (!el) return;
    el.innerHTML = '<div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6"><h2 class="text-2xl font-extrabold text-slate-900 mb-2">\uD83D\uDCDA Reading &amp; Comprehension Hub</h2><p class="text-slate-500 text-sm">Practice reading comprehension with curated resources from British Council, ReadTheory, and BBC Learning English.</p></div>' +
    '<div class="mb-6"><h3 class="text-lg font-bold text-slate-900 mb-3">Select a Level for Practice Tests</h3><div class="flex flex-wrap gap-3">' + lvlBtns + '</div></div>' +
    '<div class="mb-8"><h3 class="text-lg font-bold text-slate-900 mb-4">\uD83E\uDDEA Practice Tests by Level</h3><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">' + allTestCards + '</div></div>' +
    '<h3 class="text-lg font-bold text-slate-900 mb-4">\uD83C\uDF10 External Reading Resources</h3><div class="grid md:grid-cols-3 gap-4"><div class="bg-blue-50 rounded-2xl p-5 border border-blue-100"><h4 class="font-bold text-blue-800 mb-3">\uD83C\uDFDB\uFE0F British Council</h4><ul class="space-y-2">' + bcItems + '</ul></div><div class="bg-green-50 rounded-2xl p-5 border border-green-100"><h4 class="font-bold text-green-800 mb-3">\uD83D\uDCD6 ReadTheory</h4><ul class="space-y-2">' + rtItems + '</ul></div><div class="bg-red-50 rounded-2xl p-5 border border-red-100"><h4 class="font-bold text-red-800 mb-3">\uD83D\uDCFB BBC Learning English</h4><ul class="space-y-2">' + bbcItems + '</ul></div></div>';
  }

  window.LEARNING_PATH = { render: renderLearningPath, renderHub: renderReadingHub, showDetail: showLevelDetail, startTest: startTest, submit: submit, prev: prev };
  window.LEARNING_RESOURCES = RESOURCES;
  window.PRACTICE_TESTS = PRACTICE_TESTS;
})();
