/* ============================================================
   IELTS PA — i18n.js  (Arabic / English UI toggle + RTL)
   Loads BEFORE app.js so I18N.t() is available for any module.
   ============================================================ */
(function () {
  'use strict';

  var STORE = 'ielts-lang';
  var DIR_ATTR = 'dir';

  var dict = {
    en: {
      dashboard: 'Home',
      'study-plan': 'Study Plan',
      placement: 'Placement',
      training: 'Training',
      'vocab-trainer': 'Vocab',
      'quiz-hub': 'Quiz Hub',
      'reading-hub': 'Reading',
      band: 'Mastery',
      wss: 'Studio',
      'band-calc': 'Band Score',
      diagnostics: 'Diagnostics',
      masterclass: 'Master Classroom',
      profile: 'Profile',
      curriculum: 'Curriculum',
      ramiacademy: 'Rami Academy',
      app: 'App',
      signin: 'Sign in',
      signout: 'Sign out',
      langbutton_en: 'ع',
      langbutton_ar: 'EN',
      quickpractice: 'Quick Practice',
      todaymission: "Today's Study Mission",
      practice: 'Practice now',
      viewpath: 'View learning path',
      position_modal_title: 'Position',
      reminder_card_title: 'Study Reminder',
      reminder_desc: 'Pick a time and I will nudge you daily with a phone notification.',
      reminder_enable: 'Enable reminders',
      reminder_test: 'Test notification',
      reminder_off: 'Reminders off',
      reminder_min: 'min',
      cert_card_title: 'Band Certificate',
      cert_btn: 'Create certificate',
      sync_title: 'Offline Sync',
      sync_ok: 'All synced',
      sync_pending: 'pending items, will sync when online',
      sync_retry: 'Retry sync',
      sync_off: 'You are offline',
      streak_title: 'Study Streak',
      streak_day: 'day streak',
      streak_today: 'Today',
      streak_days: 'active days',
      streak_empty: 'Start a Study session to build your streak.',
      install_title: 'Install the official app',
      install_desc_android: 'Add IELTS PA to your home screen — fast, offline, full-screen.',
      install_desc_ios: 'Tap Share  then “Add to Home Screen”.',
      install_btn: 'Install',
      install_dismiss: 'Dismiss',
      update_title: 'A new version is available',
      update_btn: 'Get v',
      cert_name: 'Certificate of Completion',
      cert_aria: 'I hereby certify that',
      cert_has: 'has successfully reached level',
      cert_band: 'IELTS Band',
      cert_on: 'on',
      cert_gen: 'Download certificate',
      cert_close: 'Close',
      cert_star: 'IELTS PA — Teacher Rami Mastery System',
      cert_level: 'Level',
      cert_score: 'Score',
      notify_banner_title: 'Study reminder',
      notify_banner_body: 'Time for IELTS practice with Teacher Rami — 20 minutes can raise your band!',
      resources: 'Resources',
      res_eyebrow: 'Free & verified · updated regularly',
      res_tagline: 'Hand-picked practice websites, the best books, and official free downloads — everything you need to move from Band 6 to Band 7+ without paying a cent.',
      res_badge_free: 'Free',
      res_badge_tier: 'Free tier',
      res_badge_book: 'Book',
      res_stat_free: 'Most tools below are genuinely free — no sign-up, no paywall.',
      res_stat_book: 'Cambridge official books are the gold standard for authentic practice.',
      res_sites: 'Free practice websites',
      res_sites_note: 'Full mock tests, lessons and drills. Links verified.',
      res_s1: 'Official Listening/Reading/Writing/Speaking samples with answer keys & examiner comments.',
      res_s2: '300+ free lessons and model answers by an ex-IELTS examiner.',
      res_s3: 'Classic Band 9 model essays & vocabulary lists (2011–2015 archive; the new site is paid).',
      res_s4: '100+ free timed mock tests with a realistic computer-exam interface. No login needed.',
      res_s5: 'Big library of free scored mock tests; optional paid packs with examiner feedback.',
      res_s6: 'Simple, free IELTS Listening & Reading drills by question type.',
      res_s7: '6 free practice tests; the full premium tier unlocks free when you book with the British Council.',
      res_s8: 'Free “Test Drive” (~10 hrs); the full version comes free with British Council registration.',
      res_s9: 'Free B1–C2 grammar & vocabulary drills to sharpen accuracy.',
      res_s10: 'The Listening Room & Reading Room plus pronunciation workshops.',
      res_books: 'The books that actually work',
      res_books_note: 'Buy the official Cambridge ones first, then strategy books.',
      res_b1: 'All-in-one strategy + 8 full practice tests with examiner commentary. If you buy ONE book, this is it.',
      res_b2: 'Authentic retired exam papers — 4 full tests per book with audio, keys & examiner comments.',
      res_b3: '25 topic-based units that build the exact vocabulary IELTS rewards.',
      res_b4: 'Test-targeted grammar with IELTS-style practice. Best done at B2+.',
      res_b5: 'Task 1 & Task 2 structure, band-descriptor breakdown and model essays.',
      res_b6: 'Speed & time-management strategies to dodge exam traps and maximise your score.',
      res_b7: 'Separate skill books (Speaking, Writing, Reading, Listening) — buy only your weakest skill.',
      res_b8: "Plenty of extra full-length practice when you've exhausted the Cambridge books.",
      res_cat_all: 'Strategy + tests',
      res_cat_tests: 'Practice tests',
      res_cat_vocab: 'Vocabulary',
      res_cat_grammar: 'Grammar',
      res_cat_write: 'Writing',
      res_cat_strat: 'Strategy',
      res_cat_skill: 'Skill-specific',
      res_official: 'Official free downloads',
      res_official_note: 'PDFs from ielts.org — if a link ever moves, visit the official preparation page above.',
      res_p1: 'What examiners look for at every band (Task 1 + Task 2).',
      res_p2: 'Fluency, vocabulary, grammar & pronunciation at every band.',
      res_p3: 'Listening, Reading, Writing & Speaking sample tasks hub.',
      res_plan_title: 'Your 8-week study plan (B2 → C1)',
      res_plan_note: 'About 10–15 hours a week, mixing free tools with official books.',
      res_plan1: 'Diagnostic: take a full free mock (ComputerIELTS or IELTS Online Tests), score it, then read the band-descriptor PDFs to see what Band 7 looks like.',
      res_plan2: 'Foundation: work through Cambridge Grammar for IELTS & Vocabulary for IELTS daily, plus IELTS Liz lessons on your weakest question types.',
      res_plan3: 'Reading intensive: 2 full Reading tests from Cambridge IELTS 18/19 under timed conditions; review every wrong answer; drill types on Exam English.',
      res_plan4: 'Listening intensive: 2 full Listening tests with audio; dictation from the BBC Listening Room.',
      res_plan5: 'Writing focus: study IELTS Advantage Writing Skills, write 2 Task 2 + 1 Task 1 essays, score yourself against the descriptors.',
      res_plan6: 'Speaking focus: answer Parts 1–3 daily out loud, record yourself, compare with the Speaking descriptors.',
      res_plan7: 'Mock week: 2 full timed mocks; fix whatever still drops below 7.',
      res_plan8: 'Final polish: one last mock 2–3 days before the exam, light vocab revision, rest the day before.',
      res_footer: 'IELTS PA · Public resources recommended for study — IELTS is a trademark of the British Council, IDP and Cambridge.'
    },
    ar: {
      dashboard: 'الرئيسية',
      'study-plan': 'خطة الدراسة',
      placement: 'تحديد المستوى',
      training: 'التدريب',
      'vocab-trainer': 'المفردات',
      'quiz-hub': 'بنك الأسئلة',
      'reading-hub': 'القراءة',
      band: 'الإتقان',
      wss: 'الاستوديو',
      'band-calc': 'حاسبة النقاط',
      diagnostics: 'التشخيص',
      masterclass: 'حصة رامي',
      profile: 'الملف الشخصي',
      curriculum: 'المنهاج',
      ramiacademy: 'أكاديمية رامي',
      app: 'التطبيق',
      signin: 'تسجيل الدخول',
      signout: 'تسجيل الخروج',
      langbutton_en: 'ع',
      langbutton_ar: 'EN',
      quickpractice: 'ممارسة سريعة',
      todaymission: 'مهمة اليوم الدراسية',
      practice: 'طبّق الآن',
      viewpath: 'عرض مسار التعلم',
      position_modal_title: 'الوظيفة',
      reminder_card_title: 'تذكير الدراسة',
      reminder_desc: 'اختر وقتاً وسأذكرك يومياً بإشعار من الهاتف.',
      reminder_enable: 'تفعيل التذكيرات',
      reminder_test: 'إشعار تجريبي',
      reminder_off: 'التذكيرات مطفأة',
      reminder_min: 'دقيقة',
      cert_card_title: 'شهادة المستوى',
      cert_btn: 'أنشئ الشهادة',
      sync_title: 'المزامنة دون اتصال',
      sync_ok: 'كل شيء متزامن',
      sync_pending: 'عنصر بانتظار الاتصال للمزامنة',
      sync_retry: 'إعادة المزامنة',
      sync_off: 'أنت غير متصل بالإنترنت',
      streak_title: 'سلسلة المواظبة',
      streak_day: 'يوم متتالي',
      streak_today: 'اليوم',
      streak_days: 'أيام نشطة',
      streak_empty: 'ابدأ جلسة في Study لبناء سلاسلك.',
      install_title: 'ثبّت التطبيق الرسمي',
      install_desc_android: 'أضف IELTS PA لشاشتك الرئيسية — سريع ويعمل دون اتصال ويملأ الشاشة.',
      install_desc_ios: 'اضغط مشاركة ثم "إضافة إلى الشاشة الرئيسية".',
      install_btn: 'تثبيت',
      install_dismiss: 'إغلاق',
      update_title: 'نسخة جديدة متوفرة',
      update_btn: 'نزّل v',
      cert_name: 'شهادة إتمام',
      cert_aria: 'تشهد هذه الشهادة بأن',
      cert_has: 'أنجز بنجاح المستوى',
      cert_band: 'نطاق IELTS',
      cert_on: 'بتاريخ',
      cert_gen: 'تحميل الشهادة',
      cert_close: 'إغلاق',
      cert_star: 'IELTS PA — نظام الإتقان مع المعلم رامي',
      cert_level: 'المستوى',
      cert_score: 'النتيجة',
      notify_banner_title: 'تذكير الدراسة',
      notify_banner_body: 'حان وقت ممارسة IELTS مع رامي — 20 دقيقة قد ترفع نطاقك!',
      resources: 'الموارد',
      res_eyebrow: 'مجاني ومدقّق · يُحدَّث باستمرار',
      res_tagline: 'مواقع تدريب منتقاة، أفضل الكتب، وملفات رسمية مجانية — كل ما تحتاجه للانتقال من Band 6 إلى 7+ دون دفع أي شيء.',
      res_badge_free: 'مجاني',
      res_badge_tier: 'مجاني جزئياً',
      res_badge_book: 'كتاب',
      res_stat_free: 'معظم الأدوات أدناه مجانية حقاً — دون تسجيل أو دفع.',
      res_stat_book: 'كتب كامبريدج الرسمية هي المعيار الذهبي للتدريب الأصيل.',
      res_sites: 'مواقع تدريب مجانية',
      res_sites_note: 'اختبارات كاملة ودروس وتمارين. الروابط مفعّلة.',
      res_s1: 'عينات رسمية للاستماع والقراءة والكتابة والمحادثة مع مفاتيح الإجابات وملاحظات الممتحن.',
      res_s2: 'أكثر من 300 درس وردّ نموذجي من ممتحن IELTS سابق.',
      res_s3: 'مقالات نموذجية بمستوى Band 9 وقوائم مفردات (أرشيف 2011–2015؛ الموقع الجديد مدفوع).',
      res_s4: 'أكثر من 100 اختبار تجريبي مجاني بواجهة امتحان واقعية على الحاسوب. دون تسجيل.',
      res_s5: 'مكتبة ضخمة من الاختبارات المجانية المصحّحة؛ حزم مدفوعة اختيارية مع تقييم الممتحن.',
      res_s6: 'تمارين استماع وقراءة مجانية مبسطة حسب نوع الأسئلة.',
      res_s7: '6 اختبارات تجريبية مجانية؛ النسخة الممتدة (40 اختباراً) مجانية عند التسجيل لدى المجلس الثقافي البريطاني.',
      res_s8: 'نسخة تجريبية مجانية (~10 ساعات)؛ النسخة الكاملة مجانية عند التسجيل لدى British Council.',
      res_s9: 'تمارين قواعد ومفردات مجانية للمستويات B1–C2 لتحسين الدقة.',
      res_s10: 'غرفة الاستماع وغرفة القراءة مع ورش نطق.',
      res_books: 'الكتب التي تعطي نتيجة فعلاً',
      res_books_note: 'اشترِ كتب كامبريدج الرسمية أولاً ثم كتب الاستراتيجية.',
      res_b1: 'دليل شامل + 8 اختبارات كاملة مع تعليقات الممتحن. إن اشتريت كتاباً واحداً فليكن هذا.',
      res_b2: 'امتحانات رسمية سابقة حقيقية — 4 اختبارات كاملة لكل كتاب مع الصوت والمفاتيح.',
      res_b3: '25 وحدة موضوعية تبني بالضبط المفردات التي تكافئها IELTS.',
      res_b4: 'قواعد موجّهة للاختبار مع تمارين بأسلوب IELTS. الأفضل في مستوى B2 فما فوق.',
      res_b5: 'بنية المهمتين 1 و2 مع شرح مؤشرات الدرجات ونماذج مقالات.',
      res_b6: 'استراتيجيات السرعة وإدارة الوقت لتجنّب فخاخ الاختبار والوصول لأعلى درجة.',
      res_b7: 'كتب منفصلة لكل مهارة (المحادثة، الكتابة، القراءة، الاستماع) — اشترِ مهارتك الأضعف فقط.',
      res_b8: 'ممارسة إضافية وفيرة عند إنهاء كتب كامبريدج.',
      res_cat_all: 'استراتيجية + اختبارات',
      res_cat_tests: 'اختبارات تدريب',
      res_cat_vocab: 'مفردات',
      res_cat_grammar: 'قواعد',
      res_cat_write: 'كتابة',
      res_cat_strat: 'استراتيجية',
      res_cat_skill: 'حسب المهارة',
      res_official: 'ملفات رسمية مجانية',
      res_official_note: 'ملفات PDF من ielts.org — إن تغيّر أي رابط زر صفحة التحضير الرسمية أعلاه.',
      res_p1: 'ما يبحث عنه الممتحنون في كل درجة (المهمتان 1 و2).',
      res_p2: 'الطلاقة والمفردات والقواعد والنطق في كل درجة.',
      res_p3: 'مركز عينات الاستماع والقراءة والكتابة والمحادثة.',
      res_plan_title: 'خطة 8 أسابيع (من B2 إلى C1)',
      res_plan_note: 'حوالي 10–15 ساعة أسبوعياً، بمزج الأدوات المجانية مع الكتب الرسمية.',
      res_plan1: 'التشخيص: أدِّ اختباراً تجريبياً مجانياً كاملاً، صحِّحه، ثم اقرأ مؤشرات الدرجات لتعرف شكل Band 7.',
      res_plan2: 'الأساس: ادرس كتابَي القواعد والمفردات يومياً، مع دروس IELTS Liz لأضعف أنواع الأسئلة عندك.',
      res_plan3: 'القراءة المكثفة: اختبارا قراءة كاملان من كامبريدج 18/19 بوقت محدود؛ راجع كل خطأ ودرّب على الأنواع في Exam English.',
      res_plan4: 'الاستماع المكثف: اختبارا استماع كاملان مع الصوت؛ إملاء من BBC Listening Room.',
      res_plan5: 'الكتابة: ادرس IELTS Advantage Writing Skills، اكتب مهمتين 2 ومهمة 1 أسبوعياً، وقوّم نفسك وفق المؤشرات.',
      res_plan6: 'المحادثة: أجب عن الأجزاء 1–3 يومياً بصوت عالٍ، سجّل نفسك، وقارن مع مؤشرات المحادثة.',
      res_plan7: 'أسبوع الاختبارات: اختباران تجريبيان كاملان بوقت محدّد؛ أصلح ما ينزل دون 7.',
      res_plan8: 'اللمسات الأخيرة: اختبار أخير قبل الامتحان بيومين إلى ثلاثة، مراجعة مفردات خفيفة، وراحة قبل يوم الاختبار.',
      res_footer: 'IELTS PA · موارد عامة موصى بها للدراسة — IELTS علامة تابعة للمجلس الثقافي البريطاني وIDP وكامبريدج.'
    }
  };

  function isArabic() { return (localStorage.getItem(STORE) || 'en') === 'ar'; }
  function getLang() { return isArabic() ? 'ar' : 'en'; }
  function setLang(l) {
    localStorage.setItem(STORE, l === 'ar' ? 'ar' : 'en');
    applyLang();
    dispatchCustom('ielts:langchanged', { lang: getLang() });
  }

  function t(key) {
    var d = dict[getLang()] || {};
    return d[key] || dict.en[key] || key;
  }

  function applyLang() {
    var root = document.documentElement;
    root.lang = getLang();
    root.setAttribute(DIR_ATTR, getLang() === 'ar' ? 'rtl' : 'ltr');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = t('langbutton_' + getLang());
  }

  function dispatchCustom(name, detail) {
    try { document.dispatchEvent(new CustomEvent(name, { detail: detail })); } catch (e) { /* older engines */ }
  }

  function initToggle() {
    var btn = document.getElementById('lang-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      setLang(getLang() === 'ar' ? 'en' : 'ar');
      window.toast && window.toast(getLang() === 'ar' ? 'الواجهة الآن بالعربية' : 'Interface is now in English');
    });
  }

  function init() {
    applyLang();
    initToggle();
  }

  window.I18N = {
    t: t,
    getLang: getLang,
    isArabic: isArabic,
    setLang: setLang,
    dict: dict
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();