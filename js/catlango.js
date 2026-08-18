/* ============================================================
   IELTS Master — Catlango 🐱📚
   A dedicated vocabulary and word-learning section.
   Curated word packs organised by CEFR level (A1 Beginner →
   C2 Proficiency), studied with interactive flip flashcards.
   Progress is saved per user under user_<id>_catlango, XP is
   awarded for mastering words and completing levels, and any
   word can be sent straight into the personal "My Words"
   vocabulary builder with one tap.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const WORD_XP = 2;    // mastering a word for the first time
  const LEVEL_XP = 30;  // completing every word in a level

  /* ---------------- curated word packs (A1 → C2) ---------------- */
  const PACKS = [
    {
      id: 'a1', name: 'A1 Beginner', icon: '🌱', color: 'emerald', badge: 'level-badge-emerald',
      desc: 'Everyday essentials — family, food, home and basic actions.',
      words: [
        { word: 'family', pos: 'noun', meaning: 'a group of parents and children', ar: 'عائلة', example: 'My family is small.' },
        { word: 'friend', pos: 'noun', meaning: 'a person you like and know well', ar: 'صديق', example: 'Ali is my best friend.' },
        { word: 'teacher', pos: 'noun', meaning: 'a person who helps students learn', ar: 'معلّم', example: 'Our teacher speaks slowly.' },
        { word: 'student', pos: 'noun', meaning: 'a person who studies', ar: 'طالب', example: 'I am a student at the university.' },
        { word: 'house', pos: 'noun', meaning: 'a building where people live', ar: 'منزل', example: 'They live in a big house.' },
        { word: 'school', pos: 'noun', meaning: 'a place where children learn', ar: 'مدرسة', example: 'The school opens at eight.' },
        { word: 'water', pos: 'noun', meaning: 'the clear liquid we drink', ar: 'ماء', example: 'Please drink more water.' },
        { word: 'food', pos: 'noun', meaning: 'the things you eat', ar: 'طعام', example: 'The food at this café is good.' },
        { word: 'morning', pos: 'noun', meaning: 'the early part of the day', ar: 'صباح', example: 'I study in the morning.' },
        { word: 'today', pos: 'adverb', meaning: 'on this day', ar: 'اليوم', example: 'We have an exam today.' },
        { word: 'happy', pos: 'adjective', meaning: 'feeling good', ar: 'سعيد', example: 'She looks very happy.' },
        { word: 'big', pos: 'adjective', meaning: 'large in size', ar: 'كبير', example: 'Cairo is a big city.' },
        { word: 'small', pos: 'adjective', meaning: 'little in size', ar: 'صغير', example: 'The room is very small.' },
        { word: 'eat', pos: 'verb', meaning: 'to put food in your mouth', ar: 'يأكل', example: 'I eat breakfast at seven.' },
        { word: 'go', pos: 'verb', meaning: 'to move from one place to another', ar: 'يذهب', example: 'I go to work by bus.' },
        { word: 'help', pos: 'verb', meaning: 'to do something useful for someone', ar: 'يساعد', example: 'Can you help me, please?' }
      ]
    },
    {
      id: 'a2', name: 'A2 Elementary', icon: '🌿', color: 'sky', badge: 'level-badge-sky',
      desc: 'Daily life and travel — shopping, transport, health and plans.',
      words: [
        { word: 'weather', pos: 'noun', meaning: 'the sun, rain or wind outside', ar: 'طقس', example: 'The weather is lovely today.' },
        { word: 'travel', pos: 'verb', meaning: 'to go to another place', ar: 'يسافر', example: 'We travel to Spain every summer.' },
        { word: 'station', pos: 'noun', meaning: 'a place where trains stop', ar: 'محطة', example: 'Meet me at the station.' },
        { word: 'ticket', pos: 'noun', meaning: 'a paper that lets you travel', ar: 'تذكرة', example: 'I bought a ticket for the bus.' },
        { word: 'expensive', pos: 'adjective', meaning: 'costing a lot of money', ar: 'غالي', example: 'The hotel is too expensive.' },
        { word: 'cheap', pos: 'adjective', meaning: 'costing little money', ar: 'رخيص', example: 'This market is cheap.' },
        { word: 'borrow', pos: 'verb', meaning: 'to use something and give it back', ar: 'يستعير', example: 'Can I borrow your pen?' },
        { word: 'lend', pos: 'verb', meaning: 'to give something for a short time', ar: 'يُعير', example: 'I will lend you my book.' },
        { word: 'arrive', pos: 'verb', meaning: 'to reach a place', ar: 'يصل', example: 'The train arrives at noon.' },
        { word: 'leave', pos: 'verb', meaning: 'to go away from a place', ar: 'يغادر', example: 'We leave home at seven.' },
        { word: 'invite', pos: 'verb', meaning: 'to ask someone to come', ar: 'يدعو', example: 'She invited me to her party.' },
        { word: 'celebrate', pos: 'verb', meaning: 'to do something special for an event', ar: 'يحتفل', example: 'We celebrate the New Year.' },
        { word: 'neighbourhood', pos: 'noun', meaning: 'the area near your home', ar: 'حي', example: 'My neighbourhood is quiet.' },
        { word: 'appointment', pos: 'noun', meaning: 'a planned meeting', ar: 'موعد', example: 'I have a dentist appointment.' },
        { word: 'medicine', pos: 'noun', meaning: 'something you take when sick', ar: 'دواء', example: 'Take this medicine twice a day.' },
        { word: 'healthy', pos: 'adjective', meaning: 'good for your body', ar: 'صحي', example: 'Fruit is a healthy snack.' }
      ]
    },
    {
      id: 'b1', name: 'B1 Intermediate', icon: '🚀', color: 'amber', badge: 'level-badge-amber',
      desc: 'Study and work — the core words every IELTS candidate needs.',
      words: [
        { word: 'achieve', pos: 'verb', meaning: 'to succeed in doing something', ar: 'يحقق', example: 'She achieved her target score.' },
        { word: 'advantage', pos: 'noun', meaning: 'a good side of something', ar: 'ميزة', example: 'One advantage of the plan is its low cost.' },
        { word: 'benefit', pos: 'noun', meaning: 'a helpful effect', ar: 'فائدة', example: 'Exercise has many benefits.' },
        { word: 'challenge', pos: 'noun', meaning: 'something difficult that tests you', ar: 'تحدٍّ', example: 'Speaking is my biggest challenge.' },
        { word: 'decision', pos: 'noun', meaning: 'a choice you make', ar: 'قرار', example: 'It was a difficult decision.' },
        { word: 'develop', pos: 'verb', meaning: 'to grow or improve', ar: 'يطوّر', example: 'The city developed quickly.' },
        { word: 'environment', pos: 'noun', meaning: 'the world around us', ar: 'بيئة', example: 'We must protect the environment.' },
        { word: 'improve', pos: 'verb', meaning: 'to make or become better', ar: 'يحسّن', example: 'I want to improve my writing.' },
        { word: 'opportunity', pos: 'noun', meaning: 'a chance to do something', ar: 'فرصة', example: 'This job is a great opportunity.' },
        { word: 'reduce', pos: 'verb', meaning: 'to make something smaller', ar: 'يقلّل', example: 'We should reduce plastic use.' },
        { word: 'research', pos: 'noun', meaning: 'careful study to learn facts', ar: 'بحث', example: 'She does research at university.' },
        { word: 'solution', pos: 'noun', meaning: 'a way to fix a problem', ar: 'حل', example: 'We found a simple solution.' },
        { word: 'support', pos: 'verb', meaning: 'to help someone', ar: 'يدعم', example: 'My family supports my studies.' },
        { word: 'talent', pos: 'noun', meaning: 'a natural ability', ar: 'موهبة', example: 'He has a talent for languages.' },
        { word: 'although', pos: 'conjunction', meaning: 'despite the fact that', ar: 'رغم أن', example: 'Although it rained, we went out.' },
        { word: 'because', pos: 'conjunction', meaning: 'for the reason that', ar: 'لأن', example: 'I study hard because I want a high band.' }
      ]
    },
    {
      id: 'b2', name: 'B2 Upper-Intermediate', icon: '⚡', color: 'orange', badge: 'level-badge-orange',
      desc: 'Academic vocabulary — describe trends, causes and effects precisely.',
      words: [
        { word: 'significant', pos: 'adjective', meaning: 'important or large enough to notice', ar: 'مهم/كبير', example: 'There was a significant increase in sales.' },
        { word: 'consequence', pos: 'noun', meaning: 'a result of an action', ar: 'نتيجة/عاقبة', example: 'Think about the consequences before you decide.' },
        { word: 'considerable', pos: 'adjective', meaning: 'fairly large in amount', ar: 'كبير/ملحوظ', example: 'It took considerable time and effort.' },
        { word: 'contribute', pos: 'verb', meaning: 'to give something to help', ar: 'يساهم', example: 'Everyone contributed ideas to the project.' },
        { word: 'decline', pos: 'verb', meaning: 'to become less', ar: 'ينخفض', example: 'Sales declined by ten percent last year.' },
        { word: 'demonstrate', pos: 'verb', meaning: 'to show something clearly', ar: 'يوضّح/يُظهر', example: 'The data demonstrates this trend.' },
        { word: 'efficient', pos: 'adjective', meaning: 'working well without waste', ar: 'كفؤ/فعال', example: 'The new system is far more efficient.' },
        { word: 'essential', pos: 'adjective', meaning: 'completely necessary', ar: 'أساسي', example: 'Sleep is essential for good health.' },
        { word: 'estimate', pos: 'verb', meaning: 'to guess an amount', ar: 'يقدّر', example: 'Experts estimate the cost at two million.' },
        { word: 'evaluate', pos: 'verb', meaning: 'to judge the value of something', ar: 'يقيّم', example: 'We evaluate students at the end of each term.' },
        { word: 'factor', pos: 'noun', meaning: 'something that influences a result', ar: 'عامل', example: 'Cost is an important factor in the decision.' },
        { word: 'impact', pos: 'noun', meaning: 'a strong effect', ar: 'تأثير', example: 'Technology has a huge impact on our lives.' },
        { word: 'maintain', pos: 'verb', meaning: 'to keep something at the same level', ar: 'يحافظ على', example: 'Try to maintain your focus during the test.' },
        { word: 'obtain', pos: 'verb', meaning: 'to get something', ar: 'يحصل على', example: 'You must obtain a visa before you travel.' },
        { word: 'promote', pos: 'verb', meaning: 'to support or encourage', ar: 'يروّج/يشجّع', example: 'The school promotes healthy habits.' },
        { word: 'whereas', pos: 'conjunction', meaning: 'while, on the other hand', ar: 'بينما', example: 'He is tall, whereas his brother is short.' }
      ]
    },
    {
      id: 'c1', name: 'C1 Advanced', icon: '🏆', color: 'violet', badge: 'level-badge-violet',
      desc: 'Sophisticated, precise language for band 8 essays and discussions.',
      words: [
        { word: 'ambiguous', pos: 'adjective', meaning: 'having more than one possible meaning', ar: 'غامض', example: 'His answer was deliberately ambiguous.' },
        { word: 'coherent', pos: 'adjective', meaning: 'clear and logical', ar: 'متماسك', example: 'Write a coherent argument with clear paragraphs.' },
        { word: 'comprehensive', pos: 'adjective', meaning: 'including everything', ar: 'شامل', example: 'The report gives a comprehensive overview.' },
        { word: 'deteriorate', pos: 'verb', meaning: 'to become worse', ar: 'يتدهور', example: 'His health deteriorated after the accident.' },
        { word: 'feasible', pos: 'adjective', meaning: 'possible and practical to do', ar: 'ممكن/عملي', example: 'Is the plan actually feasible?' },
        { word: 'fluctuate', pos: 'verb', meaning: 'to change often between levels', ar: 'يتقلّب', example: 'Oil prices fluctuate from month to month.' },
        { word: 'implement', pos: 'verb', meaning: 'to put a plan into action', ar: 'ينفّذ', example: 'The school implemented a new attendance policy.' },
        { word: 'inevitable', pos: 'adjective', meaning: 'impossible to avoid', ar: 'حتمي', example: 'Some change is inevitable in every industry.' },
        { word: 'mitigate', pos: 'verb', meaning: 'to make something less harmful', ar: 'يخفّف', example: 'New laws aim to mitigate the damage.' },
        { word: 'phenomenon', pos: 'noun', meaning: 'a fact or event that can be observed', ar: 'ظاهرة', example: 'Migration is a global phenomenon.' },
        { word: 'prevail', pos: 'verb', meaning: 'to be common, or to win', ar: 'يسود', example: 'Calm prevailed after the storm passed.' },
        { word: 'redundant', pos: 'adjective', meaning: 'no longer needed', ar: 'زائد عن الحاجة', example: 'Some old rules are now redundant.' },
        { word: 'scrutinise', pos: 'verb', meaning: 'to examine something very carefully', ar: 'يدقّق', example: 'Experts scrutinised every piece of data.' },
        { word: 'sustain', pos: 'verb', meaning: 'to keep something going over time', ar: 'يستمر/يحافظ', example: 'The company sustained growth for years.' },
        { word: 'undermine', pos: 'verb', meaning: 'to weaken gradually', ar: 'يضعف', example: 'The rumours undermined his confidence.' },
        { word: 'unprecedented', pos: 'adjective', meaning: 'never seen or done before', ar: 'غير مسبوق', example: 'The event was unprecedented in scale.' }
      ]
    },
    {
      id: 'c2', name: 'C2 Proficiency', icon: '👑', color: 'rose', badge: 'level-badge-rose',
      desc: 'Rare, nuanced vocabulary for near-native mastery.',
      words: [
        { word: 'amalgamate', pos: 'verb', meaning: 'to combine into one thing', ar: 'يدمج', example: 'The two companies amalgamated last year.' },
        { word: 'augment', pos: 'verb', meaning: 'to make larger or stronger', ar: 'يعزّز', example: 'The course augments your existing skills.' },
        { word: 'circumvent', pos: 'verb', meaning: 'to find a way around a rule', ar: 'يتحايل على', example: 'They circumvented the restriction cleverly.' },
        { word: 'corroborate', pos: 'verb', meaning: 'to support with evidence', ar: 'يؤكّد', example: 'The witness corroborated the main story.' },
        { word: 'elude', pos: 'verb', meaning: 'to escape or avoid', ar: 'يفلت من', example: 'The answer continued to elude me.' },
        { word: 'exacerbate', pos: 'verb', meaning: 'to make something worse', ar: 'يفاقم', example: 'The delay exacerbated the problem.' },
        { word: 'exorbitant', pos: 'adjective', meaning: 'much too high in price', ar: 'باهظ', example: 'The rent in that area is exorbitant.' },
        { word: 'fastidious', pos: 'adjective', meaning: 'very careful about small details', ar: 'دقيق/مفرط في الدقة', example: 'He is fastidious about grammar.' },
        { word: 'juxtapose', pos: 'verb', meaning: 'to put things side by side to compare', ar: 'يضع جنباً إلى جنب', example: 'The essay juxtaposes two opposing views.' },
        { word: 'meticulous', pos: 'adjective', meaning: 'extremely careful and thorough', ar: 'متناهي الدقة', example: 'She kept meticulous records of every visit.' },
        { word: 'obfuscate', pos: 'verb', meaning: 'to make something unclear', ar: 'يُبهم/يغيّب', example: 'Technical jargon can obfuscate the message.' },
        { word: 'pernicious', pos: 'adjective', meaning: 'having a gradually harmful effect', ar: 'ضار', example: 'Gossip has a pernicious influence in the office.' },
        { word: 'quintessential', pos: 'adjective', meaning: 'the most perfect example of something', ar: 'نموذجي', example: 'It is the quintessential British dish.' },
        { word: 'ubiquitous', pos: 'adjective', meaning: 'found everywhere', ar: 'منتشر في كل مكان', example: 'Smartphones are now ubiquitous.' },
        { word: 'veracity', pos: 'noun', meaning: 'the quality of being true', ar: 'صدق/دقة', example: 'We doubt the veracity of that claim.' },
        { word: 'zenith', pos: 'noun', meaning: 'the highest point', ar: 'قمة/ذروة', example: 'His career reached its zenith in the 1990s.' }
      ]
    }
  ];

  /* dynamic pack that holds the user's own created words */
  const CUSTOM_PACK = {
    id: 'custom',
    name: 'My Custom Words',
    icon: '✍️',
    color: 'fuchsia',
    badge: 'level-badge-rose',
    desc: 'Words you create yourself — add your own vocabulary and study it with flashcards.',
    words: []
  };

  /* ---------------- per-user progress ---------------- */
  let cache = null;
  let view = 'grid';      // 'grid' | 'level' | 'session'
  let currentLevel = null;
  let session = null;     // { queue: [], index, flipped, masteredThisRun }

  function progress() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return null;
    if (cache === null) {
      cache = window.IELTS_AUTH.getScoped('catlango', null) || { levels: {} };
      if (!cache.levels) cache.levels = {};
    }
    return cache;
  }

  function saveProgress() {
    if (cache !== null) window.IELTS_AUTH.setScoped('catlango', cache);
  }

  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) {
    window.IELTS_AUTH.onUserChange(() => { cache = null; view = 'grid'; currentLevel = null; session = null; });
  }

  function levelState(id) {
    const p = progress();
    if (!p) return null;
    if (!p.levels[id]) p.levels[id] = { mastered: {}, reviews: {} };
    return p.levels[id];
  }

  function isMastered(levelId, word) {
    const st = levelState(levelId);
    return !!(st && st.mastered[word]);
  }

  function masteredCount(levelId) {
    const st = levelState(levelId);
    return st ? Object.keys(st.mastered).length : 0;
  }

  function getPack(id) {
    if (id === 'custom') {
      // the custom pack is built from the user's own words (source 'Custom')
      return Object.assign({}, CUSTOM_PACK, { words: customWords() });
    }
    return PACKS.find((p) => p.id === id) || null;
  }

  /* ---------------- custom words ---------------- */
  /* Custom words live in the shared “My Words” storage (source 'Custom'),
     so they persist to localStorage and sync to Supabase (saved_words)
     through the existing vocabulary pipeline, and they appear instantly
     in the vocabulary list with flashcard support. */
  function customWords() {
    const auth = window.IELTS_AUTH;
    if (!auth) return [];
    const scoped = auth.getScoped('words', null) || { words: [] };
    return (scoped.words || []).filter((w) => w.source === 'Custom');
  }

  function createCustomWord(event) {
    if (event) event.preventDefault();
    if (!window.IELTS_VOCAB) return;
    const word = $('#catlango-cw-word');
    if (!word || !word.value.trim()) {
      window.toast && window.toast('Enter a word first.');
      return;
    }
    const added = window.IELTS_VOCAB.addWord({
      word: word.value.trim(),
      meaning: $('#catlango-cw-meaning') ? $('#catlango-cw-meaning').value.trim() : '',
      ar: $('#catlango-cw-ar') ? $('#catlango-cw-ar').value.trim() : '',
      example: $('#catlango-cw-example') ? $('#catlango-cw-example').value.trim() : '',
      pos: $('#catlango-cw-pos') ? $('#catlango-cw-pos').value : '',
      source: 'Custom'
    });
    if (added) {
      window.toast && window.toast('Custom word saved — check My Words 📒');
      ['catlango-cw-word', 'catlango-cw-meaning', 'catlango-cw-ar', 'catlango-cw-example'].forEach((id) => {
        const el = $('#' + id);
        if (el) el.value = '';
      });
      const pos = $('#catlango-cw-pos');
      if (pos) pos.value = '';
    } else {
      window.toast && window.toast('That word is already in your vocabulary');
    }
    render();
  }

  function removeCustomWord(id) {
    if (window.IELTS_VOCAB) window.IELTS_VOCAB.removeWord(id);
    render();
  }

  /* ---------------- actions ---------------- */
  function openLevel(id) {
    const pack = getPack(id);
    if (!pack) return;
    currentLevel = pack;
    view = 'level';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function backToGrid() {
    view = 'grid';
    currentLevel = null;
    session = null;
    render();
  }

  function backToLevel() {
    view = 'level';
    session = null;
    render();
  }

  /* start a flashcard run over the words not yet mastered
     (or the whole pack when everything is already mastered) */
  function startSession() {
    if (!currentLevel) return;
    if (!currentLevel.words.length) {
      if (currentLevel.id === 'custom') {
        window.toast && window.toast('Add a custom word first — use the form below ✍️');
        return;
      }
      return;
    }
    const st = levelState(currentLevel.id);
    if (!st) return;
    let words = currentLevel.words.filter((w) => !st.mastered[w.word]);
    if (!words.length) words = currentLevel.words.slice();
    words.sort(() => Math.random() - 0.5);
    session = { queue: words, index: 0, flipped: false, masteredThisRun: 0 };
    view = 'session';
    render();
  }

  function flipCard() {
    if (!session) return;
    session.flipped = !session.flipped;
    const card = $('#catlango-card');
    if (card) card.classList.toggle('flipped', session.flipped);
  }

  /* "Got it" — mark mastered (first time awards XP) and move on */
  function markKnown() {
    if (!session || !currentLevel) return;
    const word = session.queue[session.index];
    if (!word) return;
    const st = levelState(currentLevel.id);
    const firstTime = !st.mastered[word.word];
    if (firstTime) {
      st.mastered[word.word] = true;
      st.reviews[word.word] = (st.reviews[word.word] || 0) + 1;
      session.masteredThisRun++;
      saveProgress();
      const auth = window.IELTS_AUTH;
      if (auth && auth.completeClaim('catlango-word-' + currentLevel.id + '-' + word.word)) {
        auth.addXp(WORD_XP);
        auth.addActivity('catlango', 'Mastered “' + word.word + '” in Catlango ' + currentLevel.name, WORD_XP);
      }
      checkLevelComplete();
    }
    nextCard();
  }

  /* "Still learning" — send the card to the back of the queue */
  function markAgain() {
    if (!session) return;
    const word = session.queue[session.index];
    if (!word) return;
    const st = levelState(currentLevel.id);
    if (st) st.reviews[word.word] = (st.reviews[word.word] || 0) + 1;
    saveProgress();
    session.queue.push(session.queue.splice(session.index, 1)[0]);
    session.flipped = false;
    render();
  }

  function nextCard() {
    if (!session) return;
    session.index++;
    session.flipped = false;
    render();
  }

  /* level completion bonus (once per level) */
  function checkLevelComplete() {
    if (!currentLevel) return;
    const st = levelState(currentLevel.id);
    if (!st) return;
    if (Object.keys(st.mastered).length < currentLevel.words.length) return;
    const auth = window.IELTS_AUTH;
    if (auth && auth.completeClaim('catlango-level-' + currentLevel.id)) {
      auth.addXp(LEVEL_XP);
      auth.addActivity('catlango', 'Completed the ' + currentLevel.name + ' word pack!', LEVEL_XP);
      window.toast && window.toast('🎉 ' + currentLevel.name + ' pack complete — +' + LEVEL_XP + ' XP!');
    }
  }

  /* send a Catlango word straight into the personal vocabulary builder */
  function addToMyWords(packId, index) {
    const pack = getPack(packId);
    const word = pack && pack.words[index];
    if (!word || !window.IELTS_VOCAB) return;
    const added = window.IELTS_VOCAB.addWord({
      word: word.word,
      meaning: word.meaning,
      ar: word.ar,
      example: word.example,
      source: 'Catlango ' + (pack ? pack.name : '')
    });
    window.toast && window.toast(added ? 'Saved to My Words 📒' : 'Already in My Words');
    if (added) render();
  }

  /* ---------------- rendering ---------------- */
  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    const body = $('#catlango-content');
    if (!body) return;

    // the custom pack is dynamic — refresh its word list so new words appear instantly
    if (currentLevel && currentLevel.id === 'custom' && view !== 'session') {
      currentLevel.words = customWords();
    }

    if (view === 'session' && session) { body.innerHTML = renderSession(); return; }
    if (view === 'level' && currentLevel) { body.innerHTML = renderLevel(); return; }
    body.innerHTML = renderGrid();
  }

  function renderGrid() {
    const customList = customWords();
    const customDone = masteredCount('custom');
    const totalWords = PACKS.reduce((n, p) => n + p.words.length, 0) + customList.length;
    const mastered = PACKS.reduce((n, p) => n + masteredCount(p.id), 0) + customDone;
    const customCard = (() => {
      const pct = customList.length ? Math.round((customDone / customList.length) * 100) : 0;
      const complete = customList.length > 0 && customDone === customList.length;
      return `
        <div class="bg-white rounded-2xl border ${complete ? 'border-emerald-200 ring-2 ring-emerald-100' : customList.length ? 'border-brand-200' : 'border-dashed border-slate-300'} shadow-sm p-6 flex flex-col">
          <div class="flex items-start justify-between mb-3">
            <div class="text-4xl">✍️</div>
            ${complete ? '<span class="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">COMPLETE ✓</span>' : '<span class="text-[10px] font-bold bg-brand-100 text-brand-700 px-2.5 py-1 rounded-full">CUSTOM</span>'}
          </div>
          <h3 class="text-lg font-extrabold text-slate-900">My Custom Words</h3>
          <p class="text-xs text-slate-500 mt-1 leading-relaxed flex-1">Create your own words — definition, Arabic translation, part of speech and an example. They sync to My Words and Supabase.</p>
          <div class="mt-4">
            <div class="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
              <span>${customList.length} / ${customList.length} words</span>
              <span>${pct}%</span>
            </div>
            <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-fuchsia-500 to-brand-500 rounded-full transition-all" style="width: ${pct}%"></div>
            </div>
          </div>
          <button class="btn-primary w-full mt-5 !py-2.5 text-sm" onclick="IELTS_CATLANGO.openLevel('custom')">
            ${customList.length ? (complete ? '↺ Review flashcards' : '▶ Study with flashcards') : '✍️ Create a word'}
          </button>
        </div>`;
    })();

    const cards = PACKS.map((pack) => {
      const st = levelState(pack.id);
      const done = st ? Object.keys(st.mastered).length : 0;
      const pct = Math.round((done / pack.words.length) * 100);
      const complete = done === pack.words.length;
      return `
        <div class="bg-white rounded-2xl border ${complete ? 'border-emerald-200 ring-2 ring-emerald-100' : 'border-slate-200'} shadow-sm p-6 flex flex-col">
          <div class="flex items-start justify-between mb-3">
            <div class="text-4xl">${pack.icon}</div>
            ${complete ? '<span class="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">COMPLETE ✓</span>' : `<span class="text-[10px] font-bold ${pack.badge} px-2.5 py-1 rounded-full">${pack.name}</span>`}
          </div>
          <h3 class="text-lg font-extrabold text-slate-900">${pack.name}</h3>
          <p class="text-xs text-slate-500 mt-1 leading-relaxed flex-1">${esc(pack.desc)}</p>
          <div class="mt-4">
            <div class="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
              <span>${done} / ${pack.words.length} words</span>
              <span>${pct}%</span>
            </div>
            <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full transition-all" style="width: ${pct}%"></div>
            </div>
          </div>
          <button class="btn-primary w-full mt-5 !py-2.5 text-sm" onclick="IELTS_CATLANGO.openLevel('${pack.id}')">
            ${complete ? '↺ Review pack' : done ? '▶ Continue learning' : '▶ Start learning'}
          </button>
        </div>`;
    }).join('');

    return `
      <div class="bg-gradient-to-r from-brand-600 to-indigo-500 rounded-2xl shadow-md p-6 mb-6 text-white flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl shrink-0">🐱</div>
          <div>
            <p class="text-lg font-extrabold">Keep building your word power</p>
            <p class="text-sm text-brand-100 mt-0.5">Master every word in a pack to earn +${LEVEL_XP} XP per pack.</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-3xl font-extrabold">${mastered}<span class="text-base font-semibold text-brand-100">/${totalWords}</span></p>
          <p class="text-[11px] text-brand-100">words mastered</p>
        </div>
      </div>

      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-slate-900">Word packs by level</h3>
        <p class="text-xs text-slate-400">+${WORD_XP} XP per new word · +${LEVEL_XP} XP per pack</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">${customCard}${cards}</div>`;
  }

  function renderLevel() {
    const pack = currentLevel;
    if (!pack) return '';
    const st = levelState(pack.id);
    const done = st ? Object.keys(st.mastered).length : 0;
    const pct = Math.round((done / pack.words.length) * 100);
    const complete = done === pack.words.length;
    const isCustom = pack.id === 'custom';

    const rows = pack.words.map((w, wi) => {
      const mastered = isMastered(pack.id, w.word);
      const reviews = (st && st.reviews[w.word]) || 0;
      return `
        <div class="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <p class="font-extrabold text-slate-900">${esc(w.word)}</p>
              ${w.pos ? '<span class="text-[10px] text-slate-400 uppercase tracking-wide">' + esc(w.pos) + '</span>' : ''}
              <span class="text-[10px] font-bold ${mastered ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'} px-2 py-0.5 rounded-full">${mastered ? '✓ Mastered' : 'Learning'}</span>
              <span class="text-[10px] text-slate-400">Custom</span>
            </div>
            <p class="text-sm text-slate-600 mt-1">${esc(w.meaning)}</p>
            <p class="text-sm text-emerald-700 font-semibold mt-0.5" dir="rtl">${esc(w.ar)}</p>
            <p class="text-xs text-slate-400 italic mt-1">“${esc(w.example)}”</p>
            <p class="text-[10px] text-slate-400 mt-1.5">Reviewed ${reviews}×${isCustom ? ' · synced to My Words' : ''}</p>
          </div>
          ${isCustom
            ? `<button class="text-[11px] font-semibold text-rose-500 hover:text-rose-700 shrink-0" onclick="IELTS_CATLANGO.removeCustomWord('${w.id}')">Delete</button>`
            : `<button class="btn-secondary !py-1.5 !px-3 text-[11px] shrink-0" onclick="IELTS_CATLANGO.addToMyWords('${pack.id}', ${wi})" title="Add to My Words">📒 Save</button>`}
        </div>`;
    }).join('');

    const creator = isCustom ? `
      <div class="bg-white rounded-2xl border-2 border-dashed border-brand-200 shadow-sm p-6 mb-6">
        <p class="font-bold text-slate-900 mb-1">✍️ Create a custom word</p>
        <p class="text-xs text-slate-500 mb-4">Add your own word — it's saved to your device and synced to Supabase, then appears instantly in My Words with flashcards.</p>
        <form onsubmit="IELTS_CATLANGO.createCustomWord(event)" class="space-y-3">
          <div class="grid sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1" for="catlango-cw-word">Word *</label>
              <input id="catlango-cw-word" type="text" required placeholder="e.g. resilience" class="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1" for="catlango-cw-pos">Part of speech</label>
              <select id="catlango-cw-pos" class="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-400">
                <option value="">Select…</option>
                ${['noun', 'verb', 'adjective', 'adverb', 'conjunction', 'phrase'].map((p) => '<option value="' + p + '">' + p + '</option>').join('')}
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1" for="catlango-cw-meaning">Definition (English)</label>
            <input id="catlango-cw-meaning" type="text" placeholder="e.g. the ability to recover quickly from difficulties" class="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1" for="catlango-cw-ar">Arabic translation</label>
            <input id="catlango-cw-ar" type="text" dir="rtl" placeholder="الترجمة بالعربية" class="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1" for="catlango-cw-example">Example sentence</label>
            <input id="catlango-cw-example" type="text" placeholder="e.g. Her resilience helped her pass the exam." class="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
          </div>
          <button type="submit" class="btn-primary w-full !py-2.5">💾 Save custom word</button>
        </form>
      </div>` : '';

    const emptyCustom = isCustom && !pack.words.length ? `
      <div class="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
        <p class="text-3xl mb-2">✍️</p>
        <p class="font-bold text-slate-800">No custom words yet</p>
        <p class="text-sm text-slate-500 mt-1">Use the form above to create your first word — it will appear here and in My Words instantly.</p>
      </div>` : '';

    return `
      <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div class="flex items-center gap-3">
          <button class="text-sm text-slate-500 hover:text-slate-800 border border-slate-300 px-4 py-2 rounded-lg transition" onclick="IELTS_CATLANGO.backToGrid()">← All packs</button>
          <div>
            <h2 class="text-2xl font-extrabold text-slate-900">${pack.icon} ${pack.name}</h2>
            <p class="text-sm text-slate-500">${done} / ${pack.words.length} words mastered</p>
          </div>
        </div>
        <button class="btn-primary text-sm" onclick="IELTS_CATLANGO.startSession()">${complete ? '🎴 Review flashcards' : '🎴 Study with flashcards'}</button>
      </div>

      ${creator}

      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
        <div class="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>Pack progress</span><span>${pct}%</span>
        </div>
        <div class="h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-emerald-500 to-brand-500 rounded-full transition-all" style="width: ${pct}%"></div>
        </div>
        ${complete ? '<p class="text-xs text-emerald-600 font-semibold mt-2">🎉 Pack complete! Review keeps it in your long-term memory.</p>' : isCustom ? '<p class="text-xs text-slate-400 mt-2">Master every custom word to complete this pack.</p>' : '<p class="text-xs text-slate-400 mt-2">Master every word to complete this pack and earn +' + LEVEL_XP + ' XP.</p>'}
      </div>

      ${emptyCustom || '<div class="space-y-3">' + rows + '</div>'}`;
  }

  function renderSession() {
    const pack = currentLevel;
    if (!pack) return '';
    const s = session;
    if (!s) return '';

    if (s.index >= s.queue.length) {
      const st = levelState(pack.id);
      const done = st ? Object.keys(st.mastered).length : 0;
      const complete = done === pack.words.length;
      return `
        <div class="max-w-xl mx-auto text-center">
          <div class="bg-white rounded-2xl border border-emerald-200 ring-2 ring-emerald-100 shadow-sm p-10">
            <p class="text-4xl mb-3">${complete ? '🎉' : '💪'}</p>
            <p class="text-xl font-extrabold text-slate-900">${complete ? 'Pack complete!' : 'Session complete!'}</p>
            <p class="text-sm text-slate-500 mt-1">${complete ? 'You mastered every word in the ' + pack.name + ' pack. +' + LEVEL_XP + ' XP earned!' : 'You went through ' + s.queue.length + ' card' + (s.queue.length === 1 ? '' : 's') + ' this run. Repetition is how words stick.'}</p>
            <div class="flex justify-center gap-3 mt-6 flex-wrap">
              <button class="btn-primary" onclick="IELTS_CATLANGO.backToLevel()">Back to ${pack.name}</button>
              <button class="btn-secondary" onclick="IELTS_CATLANGO.startSession()">↺ Study again</button>
            </div>
          </div>
        </div>`;
    }

    const w = s.queue[s.index];
    const remaining = s.queue.length - s.index;
    return `
      <div class="max-w-xl mx-auto">
        <div class="flex items-center justify-between mb-4">
          <button class="text-sm text-slate-500 hover:text-slate-800 border border-slate-300 px-4 py-2 rounded-lg transition" onclick="IELTS_CATLANGO.backToLevel()">← Back</button>
          <span class="text-xs font-bold text-slate-500">${s.index + 1} / ${s.queue.length} · ${remaining} left</span>
        </div>

        <div id="catlango-card" class="cat-flip ${s.flipped ? 'flipped' : ''}" onclick="IELTS_CATLANGO.flipCard()">
          <div class="cat-flip-inner">
            <div class="cat-face cat-front">
              <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">${pack.icon} ${pack.name} · tap to flip</p>
              <p class="text-4xl font-extrabold text-brand-700 break-words">${esc(w.word)}</p>
              <p class="text-xs text-slate-400 mt-2 uppercase tracking-wide">${esc(w.pos)}</p>
            </div>
            <div class="cat-face cat-back">
              <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">${pack.icon} ${pack.name}</p>
              <p class="text-2xl font-extrabold text-slate-900">${esc(w.word)} <span class="text-xs font-semibold text-slate-400 uppercase">· ${esc(w.pos)}</span></p>
              <p class="text-2xl text-emerald-700 font-semibold mt-2" dir="rtl">${esc(w.ar)}</p>
              <p class="text-sm text-slate-600 mt-3 leading-relaxed">${esc(w.meaning)}</p>
              <p class="text-xs text-slate-500 italic mt-3">“${esc(w.example)}”</p>
              <p class="text-[10px] text-slate-400 mt-4">Tap the card to flip back</p>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-3 mt-6">
          <button class="btn-secondary flex-1 max-w-[10rem]" onclick="IELTS_CATLANGO.markAgain()">🔄 Still learning</button>
          <button class="btn-primary flex-1 max-w-[10rem]" onclick="IELTS_CATLANGO.markKnown()">✅ Got it</button>
        </div>
        <p class="text-[11px] text-slate-400 text-center mt-3">“Still learning” sends the card to the back of the queue so it comes around again.</p>
      </div>`;
  }

  window.IELTS_CATLANGO = {
    render, openLevel, backToGrid, backToLevel, startSession, flipCard, markKnown, markAgain, addToMyWords,
    createCustomWord, removeCustomWord, customWords
  };
})();
