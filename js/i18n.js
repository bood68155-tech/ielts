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
      notify_banner_body: 'Time for IELTS practice with Teacher Rami — 20 minutes can raise your band!'
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
      notify_banner_body: 'حان وقت ممارسة IELTS مع رامي — 20 دقيقة قد ترفع نطاقك!'
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