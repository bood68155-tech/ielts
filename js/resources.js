/* ============================================================
   IELTS PA — Resources Hub
   ------------------------------------------------------------
   Hand-picked, verified free IELTS practice websites, the best
   preparation books, official downloadable materials from ielts.org,
   and a ready 8-week study plan. All external links open in a new
   tab and were verified at the time these cards were written.
   ============================================================ */
(function () {
  'use strict';
  if (window.__IELTS_RESOURCES__) return;
  window.__IELTS_RESOURCES__ = true;

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const T = (k) => (window.I18N && window.I18N.t) ? window.I18N.t(k) : k;

  const lnk = (u) => ' href="' + esc(u) + '" target="_blank" rel="noopener noreferrer"';

  const FREE_BADGE = '<span class="inline-block text-[9px] font-bold px-1.5 py-px rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">' + T('res_badge_free') + '</span>';
  const TIER_BADGE = '<span class="inline-block text-[9px] font-bold px-1.5 py-px rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">' + T('res_badge_tier') + '</span>';
  const BOOK_BADGE = '<span class="inline-block text-[9px] font-bold px-1.5 py-px rounded bg-sky-500/15 text-sky-400 border border-sky-500/30">' + T('res_badge_book') + '</span>';
  const PDF_BADGE = '<span class="inline-block text-[9px] font-bold px-1.5 py-px rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">PDF</span>';

  const SITES = [
    { n: 'IELTS.org — Official Sample Tests', u: 'https://ielts.org/take-a-test/preparation-resources/sample-test-questions', b: FREE_BADGE, d: 'res_s1' },
    { n: 'IELTS Liz', u: 'https://ieltsliz.com/', b: FREE_BADGE, d: 'res_s2' },
    { n: 'IELTS Simon (archive)', u: 'https://www.ielts-simon.com/', b: FREE_BADGE, d: 'res_s3' },
    { n: 'ComputerIELTS', u: 'https://computerielts.com/', b: FREE_BADGE, d: 'res_s4' },
    { n: 'IELTS Online Tests (IOT)', u: 'https://ieltsonlinetests.com/', b: TIER_BADGE, d: 'res_s5' },
    { n: 'Exam English', u: 'https://www.examenglish.com/', b: FREE_BADGE, d: 'res_s6' },
    { n: 'British Council — IELTS Ready', u: 'https://takeielts.britishcouncil.org/prepare/ielts-ready', b: TIER_BADGE, d: 'res_s7' },
    { n: 'British Council — Road to IELTS', u: 'https://www.roadtoielts.com/', b: TIER_BADGE, d: 'res_s8' },
    { n: 'Test-English', u: 'https://test-english.com/exams/', b: FREE_BADGE, d: 'res_s9' },
    { n: 'BBC Learning English', u: 'https://www.bbc.co.uk/learningenglish/english/exams', b: FREE_BADGE, d: 'res_s10' }
  ];

  const BOOKS = [
    { n: 'The Official Cambridge Guide to IELTS', au: 'Pauline Cullen & team', cat: 'res_cat_all', b: BOOK_BADGE, d: 'res_b1' },
    { n: 'Cambridge IELTS 18–21', au: 'Cambridge University Press', cat: 'res_cat_tests', b: BOOK_BADGE, d: 'res_b2' },
    { n: 'Cambridge Vocabulary for IELTS', au: 'Pauline Cullen', cat: 'res_cat_vocab', b: BOOK_BADGE, d: 'res_b3' },
    { n: 'Cambridge Grammar for IELTS', au: 'Diana Hopkins & Pauline Cullen', cat: 'res_cat_grammar', b: BOOK_BADGE, d: 'res_b4' },
    { n: 'IELTS Advantage: Writing Skills', au: 'Richard Brown & Lewis Richards', cat: 'res_cat_write', b: BOOK_BADGE, d: 'res_b5' },
    { n: 'Target Band 7', au: 'Simone Braverman', cat: 'res_cat_strat', b: BOOK_BADGE, d: 'res_b6' },
    { n: 'Collins English for IELTS series', au: 'Collins', cat: 'res_cat_skill', b: BOOK_BADGE, d: 'res_b7' },
    { n: "Barron's IELTS Premium", au: 'Lin Lougheed', cat: 'res_cat_tests', b: BOOK_BADGE, d: 'res_b8' }
  ];

  const PDFS = [
    { n: 'Writing Band Descriptors', u: 'https://ielts.org/cdn/Guides/ielts-writing-band-descriptors.pdf', d: 'res_p1' },
    { n: 'Speaking Band Descriptors', u: 'https://ielts.org/cdn/ielts-guides/ielts-speaking-band-descriptors.pdf', d: 'res_p2' },
    { n: 'Official sample tasks hub', u: 'https://ielts.org/take-a-test/preparation-resources/sample-test-questions', d: 'res_p3' }
  ];

  const PLAN = ['res_plan1', 'res_plan2', 'res_plan3', 'res_plan4', 'res_plan5', 'res_plan6', 'res_plan7', 'res_plan8'];

  const CATS = {
    all: 'res_cat_all', tests: 'res_cat_tests', vocab: 'res_cat_vocab', grammar: 'res_cat_grammar',
    write: 'res_cat_write', strat: 'res_cat_strat', skill: 'res_cat_skill'
  };

  function siteCard(s) {
    return '<a' + lnk(s.u) + ' class="block group">' +
      '<div class="h-full flex items-start gap-3 bg-[rgba(15,23,42,0.85)] border border-[rgba(212,175,55,0.18)] hover:border-[rgba(212,175,55,0.5)] hover:bg-[rgba(15,23,42,0.95)] rounded-xl p-4 transition shadow-sm">' +
        '<span class="text-[#d4af37] mt-0.5">🌐</span>' +
        '<div class="min-w-0">' +
          '<p class="font-bold text-sm text-[#f5f0e6] group-hover:text-[#d4af37] transition leading-snug">' + esc(s.n) + '</p>' +
          '<p class="text-[11px] text-[#f5f0e6]/50 mt-1 leading-relaxed">' + T(s.d) + '</p>' +
          '<p class="text-[11px] font-bold text-[#f5f0e6]/30 mt-1.5 truncate">' + esc(s.u) + '</p>' +
        '</div>' +
        '<div class="ml-auto shrink-0">' + s.b + '</div>' +
      '</div>' +
      '</a>';
  }

  function bookCard(b) {
    return '<div class="bg-[rgba(15,23,42,0.85)] border border-[rgba(212,175,55,0.18)] hover:border-[rgba(212,175,55,0.45)] rounded-xl p-4 transition shadow-sm">' +
      '<div class="flex items-start justify-between gap-2">' +
        '<span class="text-[#d4af37]">📘</span>' + b.b +
      '</div>' +
      '<p class="font-bold text-sm text-[#f5f0e6] mt-2 leading-snug">' + esc(b.n) + '</p>' +
      '<p class="text-[11px] text-[#d4af37]/80 mt-0.5">' + esc(b.au) + '</p>' +
      '<p class="text-[11px] text-[#f5f0e6]/50 mt-1.5 leading-relaxed">' + T(b.d) + '</p>' +
      '<p class="text-[10px] font-bold text-[#f5f0e6]/35 mt-2">' + T(CATS[b.cat] || 'res_cat_all') + '</p>' +
    '</div>';
  }

  function pdfRow(p) {
    return '<a' + lnk(p.u) + ' class="group flex items-center gap-2 bg-[rgba(15,23,42,0.85)] border border-[rgba(212,175,55,0.18)] hover:border-[rgba(212,175,55,0.5)] rounded-lg px-4 py-2.5 transition">' +
      PDF_BADGE +
      '<span class="text-xs font-bold text-[#f5f0e6] group-hover:text-[#d4af37] transition">' + esc(p.n) + '</span>' +
      '<svg class="w-3.5 h-3.5 ml-auto text-[#f5f0e6]/40 group-hover:text-[#d4af37]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8"/></svg>' +
    '</a>';
  }

  function render() {
    const root = $('#resources-content');
    if (!root) return;
    root.innerHTML =
      '<div class="mb-6">' +
        '<p class="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#d4af37]">' + T('res_eyebrow') + '</p>' +
        '<h1 class="text-2xl sm:text-3xl font-extrabold text-[#f5f0e6] mt-1">' + T('resources') + '</h1>' +
        '<p class="text-sm text-[#f5f0e6]/55 mt-2 max-w-2xl leading-relaxed">' + T('res_tagline') + '</p>' +
      '</div>' +

      '<div class="grid sm:grid-cols-2 gap-3 mb-8">' +
        '<div class="bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.3)] rounded-xl p-4 flex items-center gap-3">' +
          '<span class="text-2xl">✅</span>' +
          '<div><p class="text-xs font-bold text-emerald-400">' + T('res_badge_free') + '</p>' +
          '<p class="text-[11px] text-[#f5f0e6]/55 mt-0.5">' + T('res_stat_free') + '</p></div>' +
        '</div>' +
        '<div class="bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.3)] rounded-xl p-4 flex items-center gap-3">' +
          '<span class="text-2xl">📚</span>' +
          '<div><p class="text-xs font-bold text-[#d4af37]">' + T('res_badge_book') + '</p>' +
          '<p class="text-[11px] text-[#f5f0e6]/55 mt-0.5">' + T('res_stat_book') + '</p></div>' +
        '</div>' +
      '</div>' +

      '<h2 class="text-lg font-extrabold text-[#f5f0e6] mb-1 flex items-center gap-2">🌐 <span>' + T('res_sites') + '</span></h2>' +
      '<p class="text-xs text-[#f5f0e6]/45 mb-3">' + T('res_sites_note') + '</p>' +
      '<div class="grid sm:grid-cols-2 gap-3 mb-8">' + SITES.map(siteCard).join('') + '</div>' +

      '<h2 class="text-lg font-extrabold text-[#f5f0e6] mb-1 flex items-center gap-2">📚 <span>' + T('res_books') + '</span></h2>' +
      '<p class="text-xs text-[#f5f0e6]/45 mb-3">' + T('res_books_note') + '</p>' +
      '<div class="grid sm:grid-cols-2 gap-3 mb-8">' + BOOKS.map(bookCard).join('') + '</div>' +

      '<h2 class="text-lg font-extrabold text-[#f5f0e6] mb-1 flex items-center gap-2">📄 <span>' + T('res_official') + '</span></h2>' +
      '<p class="text-xs text-[#f5f0e6]/45 mb-3">' + T('res_official_note') + '</p>' +
      '<div class="space-y-2 mb-8">' + PDFS.map(pdfRow).join('') + '</div>' +

      '<div class="bg-[rgba(15,23,42,0.85)] border border-[rgba(212,175,55,0.25)] rounded-2xl p-5 shadow-xl">' +
        '<h2 class="text-base font-extrabold text-[#f5f0e6] flex items-center gap-2">🗓️ <span>' + T('res_plan_title') + '</span></h2>' +
        '<p class="text-xs text-[#f5f0e6]/50 mt-1 mb-4">' + T('res_plan_note') + '</p>' +
        '<ol class="space-y-2.5">' + PLAN.map((k, i) =>
          '<li class="flex items-start gap-3 text-sm">' +
            '<span class="shrink-0 w-6 h-6 rounded-full bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.4)] text-[#d4af37] text-[11px] font-extrabold flex items-center justify-center">' + (i + 1) + '</span>' +
            '<span class="text-[#f5f0e6]/80 leading-relaxed">' + T(k) + '</span>' +
          '</li>').join('') +
        '</ol>' +
      '</div>' +

      '<p class="text-center text-[10px] text-[#f5f0e6]/35 mt-6">' + T('res_footer') + '</p>';
  }

  window.IELTS_RESOURCES = { render };
  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) window.IELTS_AUTH.onUserChange(render);
})();