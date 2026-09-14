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
    openRoadmap: openRoadmap
  };
})();