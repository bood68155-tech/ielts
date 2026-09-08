/* ============================================================
   IELTS PA — Interactive Vocabulary Trainer
   Academic Word List (AWL) cards, interactive flashcards and
   daily word quizzes with score tracking. State is stored per
   user under user_<id>_vocab and mirrored to Supabase when
   configured.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const AWL_XP = 3;        // per flashcard mastered
  const QUIZ_XP = 2;       // per correct daily quiz answer
  const QUIZ_SIZE = 5;     // questions per daily quiz
  const DAY = 86400000;    // ms in one day (spaced repetition)

  /* Academic Word List (sample of the most useful AWL headwords) */
  const AWL = [
    { word: 'analyse', pos: 'verb', meaning: 'to examine in detail to understand its parts or structure', ar: 'يحلل', example: 'Scientists analyse the data to find patterns.' },
    { word: 'approach', pos: 'noun', meaning: 'a way of dealing with a situation or problem', ar: 'منهج', example: 'We need a new approach to solving this issue.' },
    { word: 'assess', pos: 'verb', meaning: 'to judge or decide the amount, value, quality or importance', ar: 'يقيم', example: 'Teachers assess students to measure their progress.' },
    { word: 'concept', pos: 'noun', meaning: 'an idea or abstract principle', ar: 'مفهوم', example: 'The concept of sustainability is central to the essay.' },
    { word: 'consistent', pos: 'adjective', meaning: 'always behaving or happening in a similar way', ar: 'متسق', example: 'Consistent practice leads to steady improvement.' },
    { word: 'construct', pos: 'verb', meaning: 'to build or make something physically or abstractly', ar: 'يبني', example: 'The researcher will construct a detailed survey.' },
    { word: 'context', pos: 'noun', meaning: 'the circumstances that form the setting for an event or idea', ar: 'سياق', example: 'Understanding the context is key to interpretation.' },
    { word: 'create', pos: 'verb', meaning: 'to bring something into existence', ar: 'ينشئ', example: 'Urban planners aim to create greener cities.' },
    { word: 'derive', pos: 'verb', meaning: 'to obtain something from a source', ar: 'يشتق', example: 'Many English words derive from Latin.' },
    { word: 'distribute', pos: 'verb', meaning: 'to give or spread something out among a number of people', ar: 'يوزع', example: 'The aid was distributed to all affected regions.' },
    { word: 'economy', pos: 'noun', meaning: 'the system of trade and industry by which wealth is created', ar: 'اقتصاد', example: 'The economy grew steadily last year.' },
    { word: 'establish', pos: 'verb', meaning: 'to start or create something intended to last', ar: 'يؤسس', example: 'The institute was established in 1950.' },
    { word: 'evident', pos: 'adjective', meaning: 'clearly seen or understood; obvious', ar: 'واضح', example: 'The benefits of exercise are evident in her health.' },
    { word: 'factor', pos: 'noun', meaning: 'one of the things that influences a result', ar: 'عامل', example: 'Cost is a major factor in the decision.' },
    { word: 'function', pos: 'noun', meaning: 'the purpose or task that something is designed to do', ar: 'وظيفة', example: 'The heart has a vital function in the body.' },
    { word: 'income', pos: 'noun', meaning: 'money received from work or investments', ar: 'دخل', example: 'Families with low incomes need support.' },
    { word: 'indicate', pos: 'verb', meaning: 'to show, point out or suggest something', ar: 'يشير', example: 'The results indicate a clear improvement.' },
    { word: 'interpret', pos: 'verb', meaning: 'to explain the meaning of something', ar: 'يفسر', example: 'Different experts interpret the findings differently.' },
    { word: 'involve', pos: 'verb', meaning: 'to include something as a necessary part', ar: 'يشمل', example: 'The project involves a number of stages.' },
    { word: 'major', pos: 'adjective', meaning: 'important, serious or significant', ar: 'رئيسي', example: 'Pollution is a major global concern.' },
    { word: 'method', pos: 'noun', meaning: 'a particular way of doing something', ar: 'طريقة', example: 'The method used here is widely accepted.' },
    { word: 'occur', pos: 'verb', meaning: 'to happen or take place', ar: 'يحدث', example: 'Accidents are more likely to occur in wet weather.' },
    { word: 'percent', pos: 'noun', meaning: 'one part in every hundred', ar: 'بالمائة', example: 'Over 70 percent of students passed.' },
    { word: 'policy', pos: 'noun', meaning: 'a plan or course of action decided by a government or organisation', ar: 'سياسة', example: 'The new policy affects all public schools.' },
    { word: 'principle', pos: 'noun', meaning: 'a fundamental truth or rule that guides behaviour', ar: 'مبدأ', example: 'Fairness is an important principle in law.' },
    { word: 'proceed', pos: 'verb', meaning: 'to continue as planned', ar: 'يتابع', example: 'Once approved, the work can proceed.' },
    { word: 'process', pos: 'noun', meaning: 'a series of actions or steps taken to achieve a result', ar: 'عملية', example: 'Learning a language is a gradual process.' },
    { word: 'require', pos: 'verb', meaning: 'to need something or make it necessary', ar: 'يتطلب', example: 'This task requires careful attention.' },
    { word: 'research', pos: 'noun', meaning: 'careful study to discover new facts or information', ar: 'بحث', example: 'She conducts research on climate change.' },
    { word: 'respond', pos: 'verb', meaning: 'to reply or react to something', ar: 'يستجيب', example: 'Participants respond to a short survey.' },
    { word: 'significant', pos: 'adjective', meaning: 'important or large enough to be noticed', ar: 'مهم', example: 'There was a significant increase in sales.' },
    { word: 'similar', pos: 'adjective', meaning: 'almost the same as something else', ar: 'مشابه', example: 'The two reports reached similar conclusions.' },
    { word: 'source', pos: 'noun', meaning: 'a place, person or thing from which something comes', ar: 'مصدر', example: 'The article cites a reliable source.' },
    { word: 'structure', pos: 'noun', meaning: 'the way in which the parts of something are arranged', ar: 'بنية', example: 'An essay needs a clear structure.' },
    { word: 'theory', pos: 'noun', meaning: 'a set of ideas intended to explain something', ar: 'نظرية', example: 'The theory explains how languages change.' },
    { word: 'vary', pos: 'verb', meaning: 'to be different or change between cases', ar: 'يختلف', example: 'Results vary from person to person.' }
  ];

  const state = { view: 'home', flashcards: null, quiz: null, filter: 'all', search: '' };

  function cache() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return null;
    let c = window.IELTS_AUTH.getScoped('vocab', null);
    if (!c || !Array.isArray(c.mastered)) {
      c = { mastered: {}, quizHistory: {}, best: {}, srs: {} };
      window.IELTS_AUTH.setScoped('vocab', c);
    } else if (!c.srs) {
      c.srs = {};
      save(c);
    }
    return window.IELTS_AUTH.getScoped('vocab', null);
  }

  function save(c) {
    window.IELTS_AUTH.setScoped('vocab', c);
  }

  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) {
    window.IELTS_AUTH.onUserChange(() => { state.view = 'home'; state.flashcards = null; state.quiz = null; });
  }

  /* ---------- helpers ---------- */
  function dailyKey() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function buildQuiz() {
    const today = dailyKey();
    const daySeed = today.split('-').join('') % AWL.length;
    const idx = [];
    for (let i = 0; i < QUIZ_SIZE; i++) idx.push((daySeed + i * 7) % AWL.length);
    const qs = idx.map((wi) => {
      const word = AWL[wi];
      const distractors = AWL.filter((w, j) => j !== wi && w.word !== word.word).sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [word, ...distractors].sort(() => Math.random() - 0.5);
      return { word, options, guess: null };
    });
    state.quiz = { today, questions: qs, answered: 0 };
  }

  function quizScore(c) {
    const h = c.quizHistory || {};
    const k = dailyKey();
    return h[k] || 0;
  }

  /* ---------- spaced repetition (SM-2 style) ---------- */
  function srsGet(c, word) {
    if (c.srs[word]) return c.srs[word];
    c.srs[word] = { ease: 2.5, interval: 0, reps: 0, lapses: 0, due: Date.now() };
    return c.srs[word];
  }

  function schedule(c, word, grade) {
    const e = srsGet(c, word);
    if (grade < 3) {
      // Again / lapse: re-surface today, cut ease
      e.reps = 0;
      e.interval = 0;
      e.lapses = (e.lapses || 0) + 1;
      e.ease = Math.max(1.3, (e.ease || 2.5) - 0.2);
      e.due = Date.now();
    } else {
      // Good / easy: grow the interval
      e.reps = (e.reps || 0) + 1;
      e.ease = Math.min(2.8, (e.ease || 2.5) + (grade >= 5 ? 0.1 : 0));
      e.interval = e.reps === 1 ? 1 : e.reps === 2 ? 3 : Math.round(((e.interval || 1) * (e.ease || 2.5)));
      e.due = Date.now() + e.interval * DAY;
    }
    return e;
  }

  /* Words to review: overdue, recently failed (hard), or brand-new learning words. */
  function dueWords(c) {
    const now = Date.now();
    return AWL
      .filter((w) => {
        const e = c.srs[w.word];
        if (e) return e.due <= now;
        return !c.mastered[w.word];
      })
      .sort((a, b) => {
        const ea = c.srs[a.word] || { due: 0 };
        const eb = c.srs[b.word] || { due: 0 };
        const hardBonus = (e) => (e && e.reps === 0 && e.lapses > 0 ? -3 * DAY : 0);
        return (ea.due + hardBonus(ea)) - (eb.due + hardBonus(eb));
      });
  }

  function srsBadge(c, w) {
    const e = c.srs[w.word];
    if (!e) return '';
    if ((e.lapses || 0) > 0 && e.reps === 0) return '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">⚠ Weak</span>';
    if (e.due <= Date.now() && !c.mastered[w.word]) return '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Due now</span>';
    if ((e.interval || 0) > 0) return '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Next in ' + e.interval + 'd</span>';
    return '';
  }

  /* ---------- render ---------- */
  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) { if (window.IELTS_AUTH) window.IELTS_AUTH.showScreen(); return; }
    const c = cache();
    if (!c) return;

    if (state.view === 'flashcards') { renderFlashcards(c); return; }
    if (state.view === 'quiz') { renderQuiz(c); return; }

    const mastered = Object.keys(c.mastered || {}).length;
    const learning = AWL.length - mastered;
    const today = dailyKey();
    const dueCount = dueWords(c).length;

    const awlRows = AWL
      .filter((w) => !state.search || w.word.toLowerCase().includes(state.search.toLowerCase()))
      .filter((w) => state.filter === 'all' || (state.filter === 'mastered' && c.mastered[w.word]) || (state.filter === 'learning' && !c.mastered[w.word]))
      .map((w) => `
        <div class="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <p class="font-extrabold text-slate-900">${esc(w.word)}</p>
              <span class="text-[10px] text-slate-400 uppercase tracking-wide">${esc(w.pos)}</span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${c.mastered[w.word] ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">${c.mastered[w.word] ? '✓ Mastered' : 'Learning'}</span>
              ${srsBadge(c, w)}
            </div>
            <p class="text-sm text-slate-600 mt-1">${esc(w.meaning)}</p>
            <p class="text-sm text-emerald-700 font-semibold mt-0.5" dir="rtl">${esc(w.ar)}</p>
            <p class="text-xs text-slate-500 italic mt-1">“${esc(w.example)}”</p>
          </div>
          <button class="btn-secondary !py-1.5 !px-3 text-[11px] shrink-0" onclick="IELTS_VOCAB_TRAINER.toggleMaster('${esc(w.word)}')">${c.mastered[w.word] ? '↺ Reset' : '✓ Master'}</button>
        </div>`).join('');

    $('#vocab-trainer-content').innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <h2 class="text-2xl font-extrabold text-slate-900">📚 Interactive Vocabulary Trainer</h2>
        <p class="text-sm text-slate-500 mt-1">Master the Academic Word List with flashcards, daily quizzes and spaced-repetition review.</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          <div class="bg-slate-50 rounded-xl p-4 text-center"><p class="text-2xl font-extrabold text-slate-900">${AWL.length}</p><p class="text-xs text-slate-500">AWL words</p></div>
          <div class="bg-emerald-50 rounded-xl p-4 text-center"><p class="text-2xl font-extrabold text-emerald-600">${mastered}</p><p class="text-xs text-emerald-600">Mastered</p></div>
          <div class="bg-amber-50 rounded-xl p-4 text-center"><p class="text-2xl font-extrabold text-amber-600">${learning}</p><p class="text-xs text-amber-600">Learning</p></div>
          <div class="bg-rose-50 rounded-xl p-4 text-center"><p class="text-2xl font-extrabold ${dueCount ? 'text-rose-600' : 'text-slate-400'}">${dueCount}</p><p class="text-xs ${dueCount ? 'text-rose-600' : 'text-slate-400'}">Due today</p></div>
        </div>
        <div class="flex flex-wrap gap-3 mt-6">
          <button class="btn-primary" onclick="IELTS_VOCAB_TRAINER.startFlashcards()">🎴 ${dueCount ? 'Review due words (' + dueCount + ')' : 'Start Flashcards'}</button>
          <button class="btn-secondary" onclick="IELTS_VOCAB_TRAINER.startDailyQuiz()">📅 Daily Quiz (${today})</button>
          <span class="text-sm text-slate-500 self-center">Today's quiz score: <b class="text-brand-600">${quizScore(c)} / ${QUIZ_SIZE}</b></span>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 class="text-lg font-bold text-slate-900">Academic Word List</h3>
            <p class="text-xs text-slate-500 mt-0.5">Master each word to earn +${AWL_XP} XP. Wrong answers and hard words are re-surfaced automatically.</p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <input id="vocab-trainer-search" type="text" placeholder="Search words…" value="${esc(state.search)}" class="px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" oninput="IELTS_VOCAB_TRAINER.setSearch(this.value)" />
            ${['all', 'learning', 'mastered'].map((f) => `<button class="tab-pill ${state.filter === f ? 'active' : ''}" onclick="IELTS_VOCAB_TRAINER.setFilter('${f}')">${f === 'all' ? 'All' : f === 'learning' ? 'Learning' : 'Mastered'}</button>`).join('')}
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-3">${awlRows}</div>
      </div>`;
  }

  /* ---------- flashcards ---------- */
  function startFlashcards() {
    const c = cache();
    if (!c) return;
    state.view = 'flashcards';
    let queue = dueWords(c);
    if (!queue.length) queue = AWL.filter((w) => !c.mastered[w.word]).slice();
    if (!queue.length) {
      window.toast && window.toast('All words mastered — reflash everything 🎉');
      queue.push.apply(queue, AWL.slice());
    }
    state.flashcards = { queue, index: 0 };
    render();
  }

  function renderFlashcards(c) {
    const r = state.flashcards;
    if (!r) return;

    if (r.index >= r.queue.length) {
      state.view = 'home';
      state.flashcards = null;
      render();
      window.toast && window.toast('Flashcard review complete! 🎉');
      return;
    }

    const w = r.queue[r.index];
    $('#vocab-trainer-content').innerHTML = `
      <div class="max-w-xl mx-auto">
        <div class="flex items-center justify-between mb-4">
          <button class="text-sm text-slate-500 hover:text-slate-800 border border-slate-300 px-4 py-2 rounded-lg transition" onclick="IELTS_VOCAB_TRAINER.exitFlashcards()">← Back</button>
          <span class="text-xs font-bold text-slate-500">${r.index + 1} / ${r.queue.length}</span>
        </div>
        <div class="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 shadow-sm p-10 text-center cursor-pointer" onclick="IELTS_VOCAB_TRAINER.flipCard()">
          <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">AWL · tap to flip</p>
          <div id="vt-front">
            <p class="text-4xl font-extrabold text-brand-700">${esc(w.word)}</p>
            <p class="text-xs text-slate-400 mt-2">${esc(w.pos)}</p>
          </div>
          <div id="vt-back" class="hidden">
            <p class="text-2xl font-extrabold text-slate-900">${esc(w.word)}</p>
            <p class="text-sm text-slate-600 mt-3">${esc(w.meaning)}</p>
            <p class="text-xl text-emerald-700 font-semibold mt-2" dir="rtl">${esc(w.ar)}</p>
            <p class="text-xs text-slate-500 italic mt-3">“${esc(w.example)}”</p>
          </div>
        </div>
        <div class="flex justify-center gap-3 mt-6">
          <button class="btn-secondary" onclick="IELTS_VOCAB_TRAINER.cardAgain()">🔄 Still learning</button>
          <button class="btn-primary" onclick="IELTS_VOCAB_TRAINER.cardGotIt()">✅ Got it</button>
        </div>
      </div>`;
  }

  function flipCard() {
    const f = $('#vt-front');
    const b = $('#vt-back');
    if (f) f.classList.toggle('hidden');
    if (b) b.classList.toggle('hidden');
  }

  function cardGotIt() {
    const c = cache();
    if (!c || !state.flashcards) return;
    const w = state.flashcards.queue[state.flashcards.index];
    const firstTime = !c.mastered[w.word];
    schedule(c, w.word, 5);
    if (firstTime) c.mastered[w.word] = true;
    save(c);
    if (firstTime && window.IELTS_AUTH.completeClaim('vocab-awl-' + w.word)) {
      window.IELTS_AUTH.addXp(AWL_XP);
      window.IELTS_AUTH.addActivity('vocabulary', 'Mastered AWL word “' + w.word + '”', AWL_XP);
    }
    state.flashcards.index++;
    render();
  }

  function cardAgain() {
    const c = cache();
    if (!c || !state.flashcards) return;
    const w = state.flashcards.queue[state.flashcards.index];
    schedule(c, w.word, 1);
    save(c);
    const q = state.flashcards.queue;
    q.push(q.splice(state.flashcards.index, 1)[0]);
    render();
  }

  function exitFlashcards() { state.view = 'home'; state.flashcards = null; render(); }

  /* ---------- daily quiz ---------- */
  function startDailyQuiz() {
    const c = cache();
    if (!c) return;
    buildQuiz();
    state.view = 'quiz';
    render();
  }

  function renderQuiz(c) {
    const q = state.quiz;
    if (!q) return;

    if (q.answered >= q.questions.length) {
      const questions = q.questions;
      const correct = questions.filter((x) => x.guess === x.word.word).length;
      const today = dailyKey();
      const fixed = correct;
      // record best score for today
      if (fixed > (c.quizHistory[today] || 0)) { c.quizHistory[today] = fixed; save(c); }
      let xpEarned = 0;
      if (fixed >= QUIZ_SIZE) {
        if (window.IELTS_AUTH.completeClaim('vocab-quiz-' + today)) {
          window.IELTS_AUTH.addXp(20);
          xpEarned = 20;
          window.IELTS_AUTH.addActivity('vocabulary', 'Perfect daily quiz score!', 20);
        }
      } else if (fixed > 0) {
        if (window.IELTS_AUTH.completeClaim('vocab-quiz-any-' + today)) {
          window.IELTS_AUTH.addXp(fixed * QUIZ_XP);
          xpEarned = fixed * QUIZ_XP;
        }
      }

      $('#vocab-trainer-content').innerHTML = `
        <div class="bg-white rounded-2xl border border-emerald-200 ring-2 ring-emerald-100 shadow-sm p-10 text-center max-w-xl mx-auto">
          <p class="text-5xl font-extrabold ${fixed >= 4 ? 'text-emerald-600' : 'text-brand-600'}">${fixed} / ${questions.length}</p>
          <p class="text-sm text-slate-500 mt-2">Daily quiz result · ${xpEarned ? '+' + xpEarned + ' XP earned!' : 'No XP this round'}</p>
          <div class="mt-4 text-left space-y-2">
            ${questions.map((x) => `<p class="text-sm"><b class="${x.guess === x.word.word ? 'text-emerald-600' : 'text-rose-500'}">${x.guess === x.word.word ? '✓' : '✗'}</b> ${esc(x.word.word)} — <span class="text-slate-500">${esc(x.word.meaning)}</span></p>`).join('')}
          </div>
          <div class="flex justify-center gap-3 mt-6">
            <button class="btn-secondary" onclick="IELTS_VOCAB_TRAINER.backToHome()">Back to Trainer</button>
            <button class="btn-primary" onclick="IELTS_VOCAB_TRAINER.startDailyQuiz()">🔁 Try daily quiz again</button>
          </div>
        </div>`;
      return;
    }

    const qi = q.answered;
    const qq = q.questions[qi];
    $('#vocab-trainer-content').innerHTML = `
      <div class="max-w-xl mx-auto">
        <div class="flex items-center justify-between mb-4">
          <button class="text-sm text-slate-500 hover:text-slate-800 border border-slate-300 px-4 py-2 rounded-lg transition" onclick="IELTS_VOCAB_TRAINER.backToHome()">← Back</button>
          <span class="text-xs font-bold text-slate-500">${qi + 1} / ${q.questions.length}</span>
        </div>
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Daily Quiz · ${q.today}</p>
          <p class="text-lg font-extrabold text-slate-900 mb-5">Which word matches “${esc(qq.word.meaning)}”?</p>
          <div class="grid gap-3">
            ${qq.options.map((o, i) => `<button class="opt text-left" data-letter="${String.fromCharCode(65 + i)}" onclick="IELTS_VOCAB_TRAINER.quizAnswer(${i})">${esc(o.word)}</button>`).join('')}
          </div>
          <div class="mt-5 h-2 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-brand-500 rounded-full transition-all" style="width:${(qi / q.questions.length) * 100}%"></div></div>
        </div>
      </div>`;
  }

  function quizAnswer(i) {
    const q = state.quiz;
    if (!q) return;
    const qq = q.questions[q.answered];
    qq.guess = qq.options[i].word;
    q.answered++;
    // immediate feedback toast
    if (qq.guess === qq.word.word) {
      window.toast && window.toast('Correct! ✅');
    } else {
      // wrong answer → re-surface the word in SRS review
      const c = cache();
      if (c) { schedule(c, qq.word.word, 1); save(c); }
      window.toast && window.toast('Not quite — the answer is “' + qq.word.word + '” (added to review)');
    }
    render();
  }

  /* ---------- misc ---------- */
  function toggleMaster(word) {
    const c = cache();
    if (!c) return;
    if (c.mastered[word]) {
      delete c.mastered[word];
      delete c.srs[word]; // reset SRS history too
    } else {
      c.mastered[word] = true;
      schedule(c, word, 5);
    }
    save(c);
    render();
  }

  function backToHome() { state.view = 'home'; state.quiz = null; state.flashcards = null; render(); }

  function setSearch(v) { state.search = v; render(); }
  function setFilter(f) { state.filter = f; render(); }

  window.IELTS_VOCAB_TRAINER = {
    render,
    startFlashcards,
    flipCard,
    cardGotIt,
    cardAgain,
    exitFlashcards,
    startDailyQuiz,
    quizAnswer,
    toggleMaster,
    backToHome,
    setSearch,
    setFilter
  };
})();
