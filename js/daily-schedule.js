/* ============================================================
   IELTS PA — daily-schedule.js
   The daily training timetable built on the video curriculum:
   every day tells you exactly what to practise and which
   video / lesson / resource to open, with Teacher Rami on call.
   ============================================================ */
(function () {
  'use strict';
  if (window.DAILY_SCHEDULE) return;

  var K = 'ielts-daily-schedule';
  var WEEKDAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var WEEKDAYS_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function isAr() {
    try { return window.I18N && window.I18N.getLang && window.I18N.getLang() === 'ar'; } catch (e) { return false; }
  }
  function trv(o) {
    if (typeof o === 'string') return o;
    return isAr() ? (o.ar || o.en) : (o.en || o.ar);
  }

  /* ---------- the 7-day table (indexed by weekday 0=Sunday) ---------- */
  var DAYS = [
    {
      icon: '🌱', focus: { en: 'Fresh start — foundation', ar: 'بداية جديدة — الأساسات' },
      items: [
        { icon: '🎧', t: { en: 'Listening — Beginner: 20 min clear story', ar: 'الاستماع — مبتدئ: 20 دقيقة قصة واضحة' }, name: 'Spotlight English Podcast', url: 'https://spotlightenglish.com/' },
        { icon: '📖', t: { en: 'Reading — Beginner: read 1 story aloud', ar: 'القراءة — مبتدئ: اقرأ قصة واحدة بصوت عالٍ' }, name: 'Storynory', url: 'https://www.storynory.com/' },
        { icon: '✍️', t: { en: 'Writing — draft a Task 2 essay (intro/body/conclusion)', ar: 'الكتابة — مسودة مقال Task 2 (مقدمة/جسم/خاتمة)' }, name: 'Essay draft', tool: 'writing-coach' },
        { icon: '🗣️', t: { en: 'Speaking — Part 1: answer 10 timed prompts', ar: 'المحادثة — الجزء الأول: أجب عن 10 أسئلة بوقت' }, name: 'IELTS Advantage', url: 'https://www.ieltsadvantage.com/' },
        { icon: '🧠', t: { en: 'Vocabulary — Oxford A1: first 10 words', ar: 'المفردات — أكسفورد A1: أول 10 كلمات' }, name: 'Oxford 5000 Trainer', tool: 'vvocab' },
        { icon: '📚', t: { en: 'Grammar — masterclass: present tenses', ar: 'القواعد — درس مركّز: الأزمنة الحاضرة' }, name: 'YouTube masterclass', url: 'https://www.youtube.com/results?search_query=IELTS+grammar+masterclass+present+tenses' }
      ]
    },
    {
      icon: '🚀', focus: { en: 'Level up', ar: 'ارتفاع المستوى' },
      items: [
        { icon: '🎧', t: { en: 'Listening — Intermediate: 25 min natural flow', ar: 'الاستماع — متوسط: 25 دقيقة تدفق طبيعي' }, name: 'The Level Up English Podcast', url: 'https://www.levelupenglish.school/podcast' },
        { icon: '📖', t: { en: 'Reading — Intermediate: 2 graded passages + questions', ar: 'القراءة — متوسط: نصّان مصنّفان + أسئلة' }, name: 'ESL Fast', url: 'https://www.eslfast.com/' },
        { icon: '✍️', t: { en: 'Writing — run yesterday’s draft through Grammarly', ar: 'الكتابة — صحّح مسودة أمس عبر Grammarly' }, name: 'Grammarly', url: 'https://www.grammarly.com/' },
        { icon: '🗣️', t: { en: 'Speaking — Part 2: record a 2-minute long turn', ar: 'المحادثة — الجزء الثاني: سجّل كلاماً طويلاً دقيقتين' }, name: 'Speaking Simulator', tool: 'speaking-sim' },
        { icon: '🧠', t: { en: 'Vocabulary — Oxford A2: 10 words', ar: 'المفردات — أكسفورد A2: 10 كلمات' }, name: 'Oxford 5000 Trainer', tool: 'vvocab' },
        { icon: '📚', t: { en: 'Grammar — masterclass: past & perfect tenses', ar: 'القواعد — درس مركّز: الماضي والأزمنة التامة' }, name: 'YouTube masterclass', url: 'https://www.youtube.com/results?search_query=IELTS+grammar+masterclass+past+perfect' },
        { icon: '🔄', t: { en: 'Practice — revise today’s new words', ar: 'التدريب — راجع كلمات اليوم الجديدة' }, name: 'Vocab Trainer', tool: 'vocab-trainer' }
      ]
    },
    {
      icon: '🛠️', focus: { en: 'Output day', ar: 'يوم الإنتاج' },
      items: [
        { icon: '🎧', t: { en: 'Listening — Advanced: 15 min BBC news, no subtitles', ar: 'الاستماع — متقدم: 15 دقيقة أخبار BBC بلا ترجمة' }, name: 'BBC Sounds', url: 'https://www.bbc.co.uk/sounds' },
        { icon: '📖', t: { en: 'Reading — one BBC News story, timed skim + scan', ar: 'القراءة — قصة من BBC News بتوقيت + تمشيط' }, name: 'BBC News', url: 'https://www.bbc.com/news' },
        { icon: '✍️', t: { en: 'Writing — rewrite the essay with band-9 vocabulary', ar: 'الكتابة — أعد صياغة المقال بمفردات الدرجة 9' }, name: 'Writing Coach', tool: 'writing-coach' },
        { icon: '🗣️', t: { en: 'Speaking — re-answer Part 1 and compare recordings', ar: 'المحادثة — أعد الإجابة وقارن التسجيلات' }, name: 'Speaking Simulator', tool: 'speaking-sim' },
        { icon: '🧠', t: { en: 'Vocabulary — Oxford A2: 10 words', ar: 'المفردات — أكسفورد A2: 10 كلمات' }, name: 'Oxford 5000 Trainer', tool: 'vvocab' },
        { icon: '📚', t: { en: 'Grammar — masterclass: conditionals', ar: 'القواعد — درس مركّز: الجُمل الشرطية' }, name: 'YouTube masterclass', url: 'https://www.youtube.com/results?search_query=IELTS+grammar+masterclass+conditionals' }
      ]
    },
    {
      icon: '📈', focus: { en: 'Push the band up', ar: 'ارفع درجتك' },
      items: [
        { icon: '🎧', t: { en: 'Listening — BBC documentary clip (Part 3/4 training)', ar: 'الاستماع — مقتطف وثائقي BBC (تدريب الجزء 3/4)' }, name: 'BBC Sounds', url: 'https://www.bbc.co.uk/sounds' },
        { icon: '📖', t: { en: 'Reading — 2 BBC articles, one academic', ar: 'القراءة — مقالان، أحدهما أكاديمي' }, name: 'BBC News', url: 'https://www.bbc.com/news' },
        { icon: '✍️', t: { en: 'Writing — Task 1 report + instant AI feedback', ar: 'الكتابة — تقرير Task 1 + تغذية راجعة فورية' }, name: 'Writing Coach', tool: 'writing-coach' },
        { icon: '🗣️', t: { en: 'Speaking — Part 3: answer 3 discussion questions', ar: 'المحادثة — الجزء الثالث: أجب عن 3 أسئلة نقاش' }, name: 'IELTS Advantage', url: 'https://www.ieltsadvantage.com/' },
        { icon: '🧠', t: { en: 'Vocabulary — Oxford B1: 10 words', ar: 'المفردات — أكسفورد B1: 10 كلمات' }, name: 'Oxford 5000 Trainer', tool: 'vvocab' },
        { icon: '📚', t: { en: 'Grammar — masterclass: complex sentences & linking', ar: 'القواعد — درس مركّز: الجمل المعقدة والربط' }, name: 'YouTube masterclass', url: 'https://www.youtube.com/results?search_query=IELTS+grammar+complex+sentences+linking' }
      ]
    },
    {
      icon: '👂', focus: { en: 'Native ear', ar: 'الأذن الأصيلة' },
      items: [
        { icon: '🎧', t: { en: 'Listening — 30 min true-story podcast', ar: 'الاستماع — 30 دقيقة قصة حقيقية' }, name: 'This American Life', url: 'https://www.thisamericanlife.org/' },
        { icon: '📖', t: { en: 'Reading — advanced graded + BBC feature', ar: 'القراءة — نص متقدم + موضوع BBC' }, name: 'ESL Fast + BBC', url: 'https://www.eslfast.com/' },
        { icon: '✍️', t: { en: 'Writing — rewrite Task 1 with examiner models', ar: 'الكتابة — أعد كتابة Task 1 حسب نماذج المصححين' }, name: 'Grammarly', url: 'https://www.grammarly.com/' },
        { icon: '🗣️', t: { en: 'Speaking — full Part 1–3 mock with recorder', ar: 'المحادثة — امتحان كامل 1–3 مع تسجيل' }, name: 'Speaking Simulator', tool: 'speaking-sim' },
        { icon: '🧠', t: { en: 'Vocabulary — Oxford B1: 10 words', ar: 'المفردات — أكسفورد B1: 10 كلمات' }, name: 'Oxford 5000 Trainer', tool: 'vvocab' },
        { icon: '📚', t: { en: 'Grammar — masterclass: idioms & collocations', ar: 'القواعد — درس مركّز: التعابير والمتلازمات اللفظية' }, name: 'YouTube masterclass', url: 'https://www.youtube.com/results?search_query=IELTS+grammar+idioms+collocations' }
      ]
    },
    {
      icon: '🏆', focus: { en: 'Mock day — full test', ar: 'يوم الاختبار — امتحان كامل' },
      items: [
        { icon: '🎓', t: { en: 'Full mock: Listening + Reading on IOT', ar: 'امتحان كامل: استماع + قراءة على IOT' }, name: 'IELTS Online Tests', url: 'https://ieltsonlinetests.com/' },
        { icon: '⏱️', t: { en: 'Writing Task 2 — 40 minutes, timed', ar: 'الكتابة Task 2 — 40 دقيقة بوقت' }, name: 'Writing Coach', tool: 'writing-coach' },
        { icon: '🗣️', t: { en: 'Speaking full session + self-score', ar: 'محادثة كاملة + تصحيح ذاتي' }, name: 'Speaking Simulator', tool: 'speaking-sim' },
        { icon: '🧠', t: { en: 'Review only your "again" words', ar: 'راجع كلمات "أعدها لاحقاً" فقط' }, name: 'Oxford 5000 Trainer', tool: 'vvocab' },
        { icon: '📊', t: { en: 'Score your mock with the band calculator', ar: 'صحّح امتحانك بحاسبة الدرجات' }, name: 'Band calculator', tool: 'band-calc' }
      ]
    },
    {
      icon: '🎓', focus: { en: 'Rami’s review day', ar: 'يوم مراجعة رامي' },
      items: [
        { icon: '🎧', t: { en: 'Re-listen the hardest audio of the week', ar: 'أعد الاستماع لأصعب تسجيل في الأسبوع' }, name: 'Pick from the week', url: 'https://www.bbc.co.uk/sounds' },
        { icon: '📖', t: { en: 'Re-read 1 article and recall its summary', ar: 'أعد قراءة مقال واحد ولخّصه من الذاكرة' }, name: 'BBC News', url: 'https://www.bbc.com/news' },
        { icon: '✍️', t: { en: 'Send your best essay to Teacher Rami for feedback', ar: 'أرسل أفضل مقال لك إلى الأستاذ رامي ليراجعه' }, name: 'Ask Teacher Rami', tool: 'teacher-chat' },
        { icon: '🧠', t: { en: 'Review the weekly "again" wordlist', ar: 'راجع قائمة "راجعها لاحقاً" الأسبوعية' }, name: 'Oxford 5000 Trainer', tool: 'vvocab' },
        { icon: '🧭', t: { en: 'Plan next week with Rami', ar: 'خطّط للأسبوع القادم مع رامي' }, name: 'Ask Teacher Rami', tool: 'teacher-chat' }
      ]
    }
  ];

  function store() {
    try { var s = JSON.parse(localStorage.getItem(K) || '{}'); return s || {}; } catch (e) { return {}; }
  }
  function save(s) { try { localStorage.setItem(K, JSON.stringify(s)); } catch (e) { /* ignore */ } }
  function isDone(i) { var s = store(); return !!(s.done && s.done[i]); }

  function itemHtml(it, i) {
    var t = trv(it.t);
    var inner = '<div class="flex items-start gap-3">' +
      '<span class="text-xl shrink-0 leading-none mt-0.5">' + it.icon + '</span>' +
      '<div class="min-w-0">' +
        '<p class="text-sm text-[#f5f0e6]/85 leading-relaxed">' + esc(t) + '</p>';
    if (it.url) {
      inner += '<a href="' + esc(it.url) + '" target="_blank" rel="noopener" class="inline-flex items-center gap-1 mt-1 text-xs font-bold text-[#d4af37] hover:text-[#f5f0e6] transition">' + esc(it.name) + ' ↗</a>';
    } else if (it.tool) {
      inner += '<button onclick="window.showSection && showSection(\'' + it.tool + '\')" class="inline-flex items-center gap-1 mt-1 text-xs font-bold text-[#d4af37] hover:text-[#f5f0e6] transition">🛠️ ' + esc(it.name) + '</button>';
    }
    inner += '</div></div>';
    return '<div class="rounded-xl bg-[rgba(20,18,15,0.45)] border border-[rgba(212,175,55,0.15)] px-4 py-3">' + inner + '</div>';
  }

  function dayCardHtml(i, today) {
    var d = DAYS[i];
    var done = isDone(i);
    var active = (i === today) && !state.forcedDay;
    if (state.forcedDay === i) active = true;
    if (i === today && state.forcedDay !== null && state.forcedDay !== i && state.forcedDay !== today) active = false;
    return '<button onclick="window.DAILY_SCHEDULE.openDay(' + i + ')" class="text-left px-4 py-3 rounded-xl border transition ' +
      (active
        ? 'border-[#d4af37] bg-[rgba(212,175,55,0.12)]'
        : done ? 'border-emerald-400/40 bg-[rgba(245,240,230,0.04)]' : 'border-[rgba(212,175,55,0.2)] bg-[rgba(15,23,42,0.85)] hover:border-[rgba(212,175,55,0.5)]') + '">' +
      '<div class="flex items-center justify-between mb-1">' +
        '<span class="text-lg">' + d.icon + '</span>' +
        (done ? '<span class="text-emerald-400 text-xs font-bold">✓ ' + esc(trv({ en: 'done', ar: 'ما خلصت' })) + '</span>' : '<span class="text-[#f5f0e6]/40 text-xs">' + esc(trv({ en: 'open', ar: 'افتح' })) + '</span>') +
      '</div>' +
      '<p class="text-[11px] font-extrabold uppercase tracking-wider text-[#f5f0e6]/70">' + esc(isAr() ? WEEKDAYS_AR[i] : WEEKDAYS_EN[i]) + '</p>' +
      '<p class="text-xs text-[#d4af37] mt-0.5">' + esc(trv(d.focus)) + '</p>' +
      '</button>';
  }

  function todayLabel() {
    var t = new Date().getDay(); // 0=Sun
    return isAr() ? WEEKDAYS_AR[t] : WEEKDAYS_EN[t];
  }

  function askRamiToday(i) {
    var d = DAYS[i];
    var prompt = 'Salam Teacher Rami — today is my "' + trv(d.focus) + '" training day. Walk me through the plan step by step and tell me exactly how to get the most out of it.';
    if (!window.IELTS_RAMI_CHAT) return;
    try { window.IELTS_RAMI_CHAT.togglePanel(); } catch (e) { /* ignore */ }
    setTimeout(function () { try { window.IELTS_RAMI_CHAT.quick(prompt); } catch (e) { /* ignore */ } }, 150);
  }

  var state = { forcedDay: null };

  function render(containerId) {
    var root = document.getElementById(containerId);
    if (!root) return;
    var today = new Date().getDay();
    var active = (state.forcedDay === null) ? today : ((state.forcedDay >= 0 && state.forcedDay <= 6) ? state.forcedDay : today);
    var s = store();
    var doneCount = DAYS.filter(function (_, i) { return isDone(i); }).length;
    var pct = Math.round((doneCount / DAYS.length) * 100);

    root.innerHTML =
      '<div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6">' +
        '<div class="flex items-center justify-between gap-4 flex-wrap mb-1">' +
          '<div class="flex items-center gap-3">' +
            '<span class="text-2xl">📅</span>' +
            '<div><h2 class="text-xl font-extrabold text-[#f5f0e6]">' + esc(trv({ en: 'Daily Training Timetable', ar: 'الجدول اليومي للتدريب' })) + '</h2>' +
            '<p class="text-xs text-[#f5f0e6]/55">' + esc(trv({ en: 'Exactly what to practise each day — and which video or lesson to open.', ar: 'ماذا تتدرب كل يوم بالضبط — وأي فيديو أو درس تفتحه.' })) + '</p></div>' +
          '</div>' +
          '<div class="flex items-center gap-3 shrink-0">' +
            '<div class="relative w-14 h-14"><svg class="w-14 h-14 -rotate-90" viewBox="0 0 56 56"><circle cx="28" cy="28" r="24" fill="none" stroke="rgba(212,175,55,0.15)" stroke-width="5"/><circle cx="28" cy="28" r="24" fill="none" stroke="#d4af37" stroke-width="5" stroke-linecap="round" stroke-dasharray="' + (2 * Math.PI * 24) + '" stroke-dashoffset="' + (2 * Math.PI * 24 * (1 - pct / 100)) + '"/></svg><div class="absolute inset-0 flex items-center justify-center"><span class="text-xs font-extrabold text-[#f5f0e6]">' + pct + '%</span></div></div>' +
            '<button onclick="window.DAILY_SCHEDULE.resetWeek()" class="text-[10px] font-bold text-[#f5f0e6]/40 hover:text-[#d4af37] transition underline">' + esc(trv({ en: 'reset week', ar: 'تصفير الأسبوع' })) + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mt-4 mb-5">' +
          DAYS.map(function (_, i) { return dayCardHtml(i, today); }).join('') +
        '</div>' +
        '<div class="bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.25)] rounded-2xl p-5">' +
          '<div class="flex items-start justify-between gap-3 flex-wrap mb-4">' +
            '<div class="flex items-center gap-3">' +
              '<span class="text-3xl">' + DAYS[active].icon + '</span>' +
              '<div><p class="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37]/80">' + esc(trv({ en: 'Today', ar: 'اليوم' })) + ' · ' + esc(todayLabel()) + '</p>' +
              '<h3 class="text-lg font-extrabold text-[#f5f0e6]">' + esc(trv(DAYS[active].focus)) + '</h3></div>' +
            '</div>' +
            '<div class="flex gap-2 shrink-0">' +
              '<button onclick="window.DAILY_SCHEDULE.toggleDone(' + active + ')" class="px-3 py-2 rounded-xl text-xs font-bold transition ' + (isDone(active) ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' : 'bg-emerald-500 text-[#14120f] hover:bg-emerald-600') + '">' + esc(isDone(active) ? trv({ en: '✓ Completed', ar: '✓ خلصت' }) : trv({ en: 'Mark done', ar: 'علّمها مكتملة' })) + '</button>' +
              '<button onclick="window.DAILY_SCHEDULE.askToday(' + active + ')" class="px-3 py-2 rounded-xl text-xs font-bold bg-[#d4af37] hover:bg-[#b8962e] text-[#14120f] transition">🎓 ' + esc(trv({ en: 'Rami teaches this day', ar: 'رامي يشرح هذا اليوم' })) + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="space-y-2.5">' + DAYS[active].items.map(function (it) { return itemHtml(it, active); }).join('') + '</div>' +
        '</div>' +
      '</div>';
  }

  window.DAILY_SCHEDULE = {
    render: render,
    openDay: function (i) { state.forcedDay = i; render('daily-content'); },
    toggleDone: function (i) {
      var s = store();
      s.done = s.done || {};
      s.done[i] = !s.done[i];
      save(s);
      render('daily-content');
    },
    resetWeek: function () {
      if (!window.confirm('Reset the weekly progress?')) return;
      save({});
      state.forcedDay = null;
      render('daily-content');
    },
    askToday: askRamiToday
  };
})();