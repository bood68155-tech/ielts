/* ============================================================
   IELTS PA — video-curriculum.js  (Teacher Rami's Roadmap)
   Rebuilds the Curriculum section exactly like the viral IELTS
   video roadmap: 7 lanes, each with level-categorized free
   resources, Teacher Rami as guide, and the IOT practice flow.
   ============================================================ */
(function () {
  'use strict';

  if (window.IELTS_VIDEO_CURRICULUM) return;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function t(key) {
    try { return (window.I18N && window.I18N.t) ? window.I18N.t(key) : key; } catch (e) { return key; }
  }
  function isAr() {
    try { return window.I18N && window.I18N.getLang && window.I18N.getLang() === 'ar'; } catch (e) { return false; }
  }
  function ava(cls, txtCls) {
    const m = (window.IELTS_AI && window.IELTS_AI.MENTOR_AVATAR) || '';
    if (m) return '<div class="' + cls + ' shrink-0 rounded-full overflow-hidden bg-[#14120f] border border-[rgba(212,175,55,0.5)]">' + m + '</div>';
    return '<div class="' + cls + ' shrink-0 rounded-full bg-[#14120f] border border-[rgba(212,175,55,0.5)] text-[#d4af37] flex items-center justify-center ' + (txtCls || 'text-xl') + ' font-extrabold">ر</div>';
  }

  /* Encode a string for an inline onclick attribute */
  function enc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function dec(s) {
    return String(s).replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  }

  /* --- the exact roadmap from the video ----------------------- */
  /* tier: '' = "all levels" (skills the video did not split)     */
  /* kind 'ext' = external resource, 'tool' = built-in section under the tutorial's spirit */
  var LANES = [
    {
      key: 'listening', icon: '🎧', i18n: 'vc_l_listening', desc: 'vc_l_listening_desc',
      method: {
        en: 'Start slow: 15–20 min every day with Spotlight English — clear, story-based audio first.\nMove up: add The Level Up English Podcast for natural conversation flow.\nGo native: BBC Sounds news + This American Life stories with no subtitles — re-listen until 90% is clear.',
        ar: 'ابدأ ببطء: 15–20 دقيقة يومياً مع Spotlight English — صوت واضح بأسلوب القصص أولاً.\nارتقِ خطوة: أضف The Level Up English Podcast للتدفق الطبيعي للحوار.\nانتقل للأصيل: أخبار BBC Sounds وقصص This American Life بدون ترجمة — أعد الاستماع حتى يتضح 90% من الكلام.'
      },
      prompt: 'As Teacher Rami, give me a 2-week Listening routine using Spotlight English, the Level Up English Podcast, BBC Sounds and This American Life. How should I progress from slow podcasts to native radio?',
      groups: [
        { tier: 'vc_t1', items: [
          { kind: 'ext', name: 'Spotlight English Podcast', url: 'https://spotlightenglish.com/', blurb: 'vc_li_11' }
        ] },
        { tier: 'vc_t2', items: [
          { kind: 'ext', name: 'The Level Up English Podcast', url: 'https://www.levelupenglish.school/podcast', blurb: 'vc_li_21' }
        ] },
        { tier: 'vc_t3', items: [
          { kind: 'ext', name: 'BBC Sounds', url: 'https://www.bbc.co.uk/sounds', blurb: 'vc_li_31' },
          { kind: 'ext', name: 'This American Life', url: 'https://www.thisamericanlife.org/', blurb: 'vc_li_32' }
        ] }
      ]
    },
    {
      key: 'reading', icon: '📖', i18n: 'vc_l_reading', desc: 'vc_l_reading_desc',
      method: {
        en: 'Beginner: one Storynory story a day — read aloud with the audio.\nIntermediate: two graded passages on ESL Fast, then answer the questions.\nAdvanced: one BBC News article daily, timed — skim, scan, then re-read for detail.',
        ar: 'مبتدئ: قصة واحدة من Storynory يومياً — اقرأ بصوت مرتفع مع الصوت.\nمتوسط: نصّان مصنّفان على ESL Fast ثم أجب عن الأسئلة.\nمتقدم: مقال يومي من BBC News بوقت محدد — تفحّص، امسح، ثم أعد القراءة للتفاصيل.'
      },
      prompt: 'As Teacher Rami, build me a weekly Reading plan with Storynory, ESL Fast and BBC News. How do I move from graded stories to full BBC journalism under exam timing?',
      groups: [
        { tier: 'vc_t1', items: [
          { kind: 'ext', name: 'Storynory', url: 'https://www.storynory.com/', blurb: 'vc_ri_11' }
        ] },
        { tier: 'vc_t2', items: [
          { kind: 'ext', name: 'ESL Fast', url: 'https://www.eslfast.com/', blurb: 'vc_ri_21' }
        ] },
        { tier: 'vc_t3', items: [
          { kind: 'ext', name: 'BBC News', url: 'https://www.bbc.com/news', blurb: 'vc_ri_31' }
        ] }
      ]
    },
    {
      key: 'writing', icon: '✍️', i18n: 'vc_l_writing', desc: 'vc_l_writing_desc',
      method: {
        en: 'Draft one Task-2 essay.\nRun the draft through Grammarly + our AI Writing Coach for instant corrections.\nRewrite the fixed version out loud — then practise IELTS Advantage Parts 1–3 with a recording.\nSend the clean draft to Teacher Rami for a final band check.',
        ar: 'اكتب مسودة مقال Task 2.\nصححها فوراً عبر Grammarly ومدرب الكتابة بالذكاء الاصطناعي.\nأعد صياغتها بصوت مرتفع — ثم درّب نفسك على أجزاء المحادثة 1–3 وفق IELTS Advantage مع تسجيل.\nأرسل المسودة النهائية إلى الأستاذ رامي لفحص الدرجة الأخير.'
      },
      prompt: 'As Teacher Rami, explain your exact Writing workflow: structured essay crafting, then instant AI feedback on every draft with Grammarly. Give me a Task 2 routine.',
      groups: [
        { tier: '', items: [
          { kind: 'ext', name: 'Grammarly — AI feedback', url: 'https://www.grammarly.com/', blurb: 'vc_wi_11' },
          { kind: 'tool', section: 'writing-coach', name: 'IELTS PA: AI Writing Coach', blurb: 'vc_wi_12' }
        ] }
      ]
    },
    {
      key: 'speaking', icon: '🗣️', i18n: 'vc_l_speaking', desc: 'vc_l_speaking_desc',
      method: {
        en: 'Open the IELTS Advantage guides and pick today’s Part 1–3 prompts.\nRecord yourself answering each one inside the time limit.\nListen back, note fillers, and re-answer until your recording is smooth.',
        ar: 'افتح أدلة IELTS Advantage واختر أسئلة اليوم للأجزاء 1–3.\nسجّل إجاباتك داخل الوقت المحدد لكل جزء.\nاستمع للنسخ، لاحظ التوقفات، وأعد الإجابة حتى تنعم التسجيلات.'
      },
      prompt: 'As Teacher Rami, give me daily self-practice speaking drills based on IELTS Advantage: timed Part 1, 2 and 3 prompts, recording myself and self-scoring.',
      groups: [
        { tier: '', items: [
          { kind: 'ext', name: 'IELTS Advantage — self practice', url: 'https://www.ieltsadvantage.com/', blurb: 'vc_si_11' },
          { kind: 'tool', section: 'speaking-sim', name: 'IELTS PA: Speaking Simulator', blurb: 'vc_si_12' }
        ] }
      ]
    },
    {
      key: 'vocabulary', icon: '🧠', i18n: 'vc_l_vocabulary', desc: 'vc_l_vocabulary_desc',
      method: {
        en: 'Learn 10 Oxford words a day from the CEFR 3000–5000 lists.\nRevise them with our built-in Vocab Trainer for daily reps.\nUse each new word once in a spoken or written sentence.',
        ar: 'احفظ 10 كلمات يومياً من قوائم أكسفورد 3000–5000 وفق CEFR.\nراجعها في مدرب المفردات المدمج بجولات يومية.\nاستخدم كل كلمة جديدة في جملة كتابية أو منطوقة واحدة.'
      },
      prompt: 'As Teacher Rami, how do I master the Oxford 3000 and 5000 (CEFR) wordlists for a Band 7+ vocabulary score? Give me a weekly word-bank routine.',
      groups: [
        { tier: '', items: [
          { kind: 'ext', name: 'Oxford 3000 / 5000 (CEFR)', url: 'https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000', blurb: 'vc_vi_11' },
          { kind: 'tool', section: 'vocab-trainer', name: 'IELTS PA: Vocab Trainer', blurb: 'vc_vi_12' }
        ] }
      ]
    },
    {
      key: 'grammar', icon: '📚', i18n: 'vc_l_grammar', desc: 'vc_l_grammar_desc',
      method: {
        en: 'Watch one structured grammar masterclass every week from the curated YouTube lessons.\nTake notes, then write 3 example sentences of your own.\nReview past notes the next morning to lock the rules in.',
        ar: 'شاهد درساً مركزاً منظمّاً في القواعد أسبوعياً من قائمة YouTube.\nدوّن الملاحظات، ثم اكتب 3 جمل بأسلوبك.\nراجع ملاحظاتك صباح اليوم التالي لتثبيت القواعد.'
      },
      prompt: 'As Teacher Rami, recommend a structured list of IELTS grammar masterclasses from YouTube and tell me how to take notes so they actually raise my band. ',
      groups: [
        { tier: '', items: [
          { kind: 'ext', name: 'YouTube — IELTS grammar masterclasses', url: 'https://www.youtube.com/results?search_query=IELTS+grammar+masterclass+ielts+advantage', blurb: 'vc_gi_11' },
          { kind: 'tool', section: 'masterclass', name: 'IELTS PA: Master Classroom', blurb: 'vc_gi_12' }
        ] }
      ]
    },
    {
      key: 'practice', icon: '🏆', i18n: 'vc_l_practice', desc: 'vc_l_practice_desc',
      method: {
        en: 'Sit one free full mock on IELTS Online Tests (IOT).\nScore your results with the band calculator.\nLet Teacher Rami turn your mistakes into a personalised 4-week smart study plan.',
        ar: 'قدّم اختباراً تجريبياً كاملاً مجانياً على IELTS Online Tests.\nصحّح نتيجتك بحاسبة الدرجات.\nدع الأستاذ رامي يحوّل أخطاءك إلى خطة مذاكرة ذكية شخصية لأربعة أسابيع.'
      },
      prompt: 'As Teacher Rami, explain the IELTS Online Tests (IOT) practice workflow: taking free mocks, scoring them, and turning the results into a personal roadmap.',
      groups: [
        { tier: '', items: [
          { kind: 'ext', name: 'IELTS Online Tests (IOT) — free mocks', url: 'https://ieltsonlinetests.com/', blurb: 'vc_pi_11' },
          { kind: 'roadmap', name: 'Generate my roadmap', blurb: 'vc_gen_note' }
        ] }
      ]
    }
  ];

  function tierLabel(key) { return key ? t(key) : t('vc_all'); }

  function openTool(section) {
    try { window.showSection(section); } catch (e) { /* ignore */ }
  }
  function openRoadmap() {
    try {
      if (window.showSection) window.showSection('study-plan');
      window.toast && window.toast(isAr() ? 'خارطتك الأسبوعية جاهزة — انطلق! 🚀' : 'Your roadmap is ready — go get it! 🚀');
    } catch (e) { /* ignore */ }
  }
  function askRami(raw) {
    const prompt = dec(raw);
    if (!window.IELTS_RAMI_CHAT) return;
    try { window.IELTS_RAMI_CHAT.togglePanel(); } catch (e) { /* ignore */ }
    setTimeout(function () {
      try { window.IELTS_RAMI_CHAT.quick(prompt); } catch (e) { /* ignore */ }
    }, 150);
  }

  function itemHtml(it, laneKey) {
    if (it.kind === 'tool' && it.section) {
      return '<button class="w-full text-left bg-[rgba(20,18,15,0.55)] border border-[rgba(212,175,55,0.3)] hover:border-[#d4af37] rounded-xl px-3 py-2.5 transition group">' +
        '<div onclick="window.IELTS_VIDEO_CURRICULUM.openTool(\'' + it.section + '\')" class="cursor-pointer">' +
        '<div class="flex items-center justify-between gap-2">' +
        '<span class="text-sm font-bold text-[#f5f0e6] group-hover:text-[#d4af37]">🛠️ ' + esc(it.name) + '</span>' +
        '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(212,175,55,0.15)] text-[#d4af37] shrink-0">' + esc(t('vc_tool')) + '</span>' +
        '</div>' +
        '<p class="text-xs text-[#f5f0e6]/55 mt-1 leading-relaxed">' + esc(t(it.blurb)) + '</p>' +
        '</div></button>';
    }
    if (it.kind === 'roadmap') {
      return '<button class="w-full text-left bg-[rgba(212,175,55,0.12)] border border-[#d4af37] rounded-xl px-3 py-2.5 transition group">' +
        '<div onclick="window.IELTS_VIDEO_CURRICULUM.openRoadmap()" class="cursor-pointer">' +
        '<div class="flex items-center justify-between gap-2">' +
        '<span class="text-sm font-bold text-[#d4af37]">🚀 ' + esc(t('vc_gen')) + '</span>' +
        '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(212,175,55,0.18)] text-[#d4af37] shrink-0">📅</span>' +
        '</div>' +
        '<p class="text-xs text-[#f5f0e6]/60 mt-1 leading-relaxed">' + esc(t(it.blurb)) + '</p>' +
        '</div></button>';
    }
    return '<a href="' + esc(it.url) + '" target="_blank" rel="noopener" class="block bg-[rgba(20,18,15,0.55)] border border-[rgba(212,175,55,0.3)] hover:border-[#d4af37] rounded-xl px-3 py-2.5 transition group">' +
      '<div class="flex items-center justify-between gap-2">' +
      '<span class="text-sm font-bold text-[#f5f0e6] group-hover:text-[#d4af37]">' + esc(it.name) + '</span>' +
      '<span class="text-[#d4af37]/70 group-hover:text-[#d4af37] shrink-0">↗</span>' +
      '</div>' +
      '<p class="text-xs text-[#f5f0e6]/55 mt-1 leading-relaxed">' + esc(t(it.blurb)) + '</p>' +
      '</a>';
  }

  function groupHtml(g, laneKey) {
    return '<div class="mb-3">' +
      '<p class="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37]/80 mb-1.5">' + esc(tierLabel(g.tier)) + '</p>' +
      '<div class="space-y-2">' + g.items.map(function (it) { return itemHtml(it, laneKey); }).join('') + '</div>' +
      '</div>';
  }

  function laneHtml(L) {
    return '<div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.2)] rounded-2xl p-5 hover:border-[rgba(212,175,55,0.45)] transition">' +
      '<div class="flex items-start justify-between gap-3 mb-2">' +
      '<div class="flex items-center gap-3">' +
        '<div class="w-12 h-12 rounded-xl bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-2xl shrink-0">' + L.icon + '</div>' +
        '<div>' +
          '<h3 class="text-lg font-extrabold text-[#f5f0e6] leading-tight">' + esc(t(L.i18n)) + '</h3>' +
        '</div>' +
      '</div>' +
      '<button class="shrink-0 text-[11px] font-bold px-3 py-2 rounded-lg bg-[#d4af37] hover:bg-[#b8962e] text-[#14120f] transition" onclick="window.IELTS_VIDEO_CURRICULUM.ask(\'' + enc(L.prompt) + '\')">' + esc(t('vc_ask')) + '</button>' +
      '</div>' +
      '<p class="text-sm text-[#f5f0e6]/60 leading-relaxed mb-4">' + esc(t(L.desc)) + '</p>' +
      L.groups.map(function (g) { return groupHtml(g, L.key); }).join('') +
      '</div>';
  }

  function render() {
    const root = document.getElementById('curriculum-content');
    if (!root) return;
    root.innerHTML =
      '<div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">' +
        '<div class="flex items-center gap-4 flex-wrap">' +
          ava('w-16 h-16', 'text-2xl') +
          '<div class="flex-1 min-w-[220px]">' +
            '<p class="text-[10px] font-extrabold text-[#d4af37] uppercase tracking-[0.2em]">' + esc(t('vc_eyebrow')) + '</p>' +
            '<h2 class="text-xl md:text-2xl font-extrabold text-[#f5f0e6] mt-0.5">🇵🇸 ' + esc(t('vc_title')) + '</h2>' +
            '<p class="text-sm text-[#f5f0e6]/60 mt-1.5 leading-relaxed">' + esc(t('vc_sub')) + '</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' +
        LANES.map(laneHtml).join('') +
      '</div>' +
      '<p class="text-center text-xs text-[#f5f0e6]/40 mt-6">' + esc(t('vc_foot')) + '</p>';
  }

window.IELTS_VIDEO_CURRICULUM = {
      render: render,
      ask: askRami,
      openTool: openTool,
      openRoadmap: openRoadmap,
      methodText: methodText
    };

    /* =========================================================================
       VIDEO PLATFORM — the rebuilt site pages (exact copy of the video plan)
       Renderers for the 5 rebuilt sections of the platform.
       ========================================================================= */
    function pageLabel(keys) {
      if (keys.indexOf('listening') !== -1) return t('nav_listening');
      if (keys.indexOf('reading') !== -1) return t('nav_reading');
      if (keys.indexOf('writing') !== -1 || keys.indexOf('speaking') !== -1) return t('nav_writing');
      if (keys.indexOf('vocabulary') !== -1 || keys.indexOf('grammar') !== -1) return t('nav_vocab');
      if (keys.indexOf('practice') !== -1) return t('nav_practice');
      return t('vc_title');
    }

    function methodText(L) {
      const m = L.method;
      if (!m) return '';
      if (typeof m === 'string') return m;
      return isAr() ? (m.ar || m.en) : (m.en || m.ar);
    }

    function methodStepsHtml(L) {
      const lines = methodText(L).split('\n').map(function (s) { return s.replace(/^\s*[\d.]+\s*/, '').trim(); }).filter(Boolean);
      if (!lines.length) return '';
      return '<div class="bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.25)] rounded-2xl p-5 mt-5">' +
        '<p class="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] mb-3">🎯 ' + esc(t('vp_method')) + '</p>' +
        '<div class="space-y-2.5">' + lines.map(function (ln, i) {
          return '<div class="flex items-start gap-3">' +
            '<span class="w-7 h-7 shrink-0 rounded-full bg-[#d4af37]/90 text-[#14120f] text-xs font-extrabold flex items-center justify-center">' + (i + 1) + '</span>' +
            '<p class="text-sm text-[#f5f0e6]/80 leading-relaxed pt-0.5">' + esc(ln) + '</p>' +
            '</div>';
        }).join('') + '</div></div>';
    }

    function lanePageHtml(L, opts) {
      const pages = (opts && opts.pages) || false;
      return '<div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.2)] rounded-2xl p-6 mb-6">' +
        '<div class="flex items-start justify-between gap-4 flex-wrap mb-3">' +
          '<div class="flex items-center gap-3">' +
            '<div class="w-12 h-12 rounded-xl bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-2xl shrink-0">' + L.icon + '</div>' +
            '<div><h2 class="text-xl font-extrabold text-[#f5f0e6] leading-tight">' + esc(t(L.i18n)) + '</h2></div>' +
          '</div>' +
          '<button class="shrink-0 text-[11px] font-bold px-3 py-2 rounded-lg bg-[#d4af37] hover:bg-[#b8962e] text-[#14120f] transition" onclick="window.IELTS_VIDEO_CURRICULUM.ask(\'' + enc(L.prompt) + '\')">' + esc(t('vc_ask')) + '</button>' +
        '</div>' +
        '<p class="text-sm text-[#f5f0e6]/60 leading-relaxed mb-4">' + esc(t(L.desc)) + '</p>' +
        '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' +
          L.groups.map(function (g) {
            return '<div class="bg-[rgba(20,18,15,0.45)] border border-[rgba(212,175,55,0.15)] rounded-2xl p-4">' +
              '<p class="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37]/80 mb-2">' + esc(tierLabel(g.tier)) + '</p>' +
              '<div class="space-y-2">' + g.items.map(function (it) { return itemHtml(it, L.key); }).join('') + '</div>' +
              '</div>';
          }).join('') +
        '</div>' +
        methodStepsHtml(L) +
        (L.key === 'practice' ? actionRowHtml() : '') +
        '</div>';
    }

    function actionRowHtml() {
      return '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">' +
        '<button onclick="window.IELTS_VIDEO_CURRICULUM.openRoadmap()" class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#d4af37] hover:bg-[#b8962e] transition text-[#14120f] text-sm font-bold">📋 ' + esc(t('vp_plan')) + '</button>' +
        '<a href="https://ieltsonlinetests.com/" target="_blank" rel="noopener" class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[rgba(212,175,55,0.5)] hover:border-[#d4af37] hover:text-[#d4af37] transition text-[#f5f0e6] text-sm font-bold">🎓 ' + esc(t('vp_iot')) + ' ↗</a>' +
        '</div>';
    }

    /* Render a whole rebuilt page inside a container */
    function renderPlatform(containerId, keys) {
      const root = document.getElementById(containerId);
      if (!root) return;
      const lanes = keys.map(function (k) {
        for (var i = 0; i < LANES.length; i++) if (LANES[i].key === k) return LANES[i];
        return null;
      }).filter(Boolean);
      root.innerHTML =
        '<div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">' +
          '<div class="flex items-center gap-4 flex-wrap">' +
            ava('w-14 h-14', 'text-2xl') +
            '<div class="flex-1 min-w-[220px]">' +
              '<p class="text-[10px] font-extrabold text-[#d4af37] uppercase tracking-[0.2em]">' + esc(t('vc_eyebrow')) + '</p>' +
              '<h2 class="text-xl md:text-2xl font-extrabold text-[#f5f0e6] mt-0.5">' + esc(pageLabel(keys)) + '</h2>' +
              '<p class="text-sm text-[#f5f0e6]/60 mt-1 leading-relaxed">' + esc(t('vc_sub')) + '</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
        lanes.map(function (L) { return lanePageHtml(L, {}); }).join('') +
        (keys.indexOf('vocabulary') !== -1 && window.OXFORD_5000 ? '<div id="oxford-trainer-root"></div>' : '');
      if (keys.indexOf('vocabulary') !== -1 && window.IELTS_OXFORD_TRAINER) {
        try { window.IELTS_OXFORD_TRAINER.render('oxford-trainer-root'); } catch (e) { /* ignore */ }
      }
    }

    window.IELTS_VIDEO_PLATFORM = {
      render: renderPlatform
    };
})();