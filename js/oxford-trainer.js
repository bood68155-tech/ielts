/* ============================================================
   IELTS PA — oxford-trainer.js
   The Oxford 5000 CEFR Trainer. Teaches all 5000 words level-
   by-level (A1–C1), tracks progress, and calls Teacher Rami
   to explain every single word on demand.
   ============================================================ */
(function () {
  'use strict';

  if (window.IELTS_OXFORD_TRAINER) return;

  var K = 'ielts-ox5000';
  var LEVELS = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];

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

  var byLevel = {};
  (function () {
    var L = window.OXFORD_5000 || [];
    for (var i = 0; i < L.length; i++) {
      var w = L[i];
      var lv = w[2] || 'a1';
      (byLevel[lv] = byLevel[lv] || []).push(w);
    }
  })();

  var state = { level: 'a1', idx: 0, order: null, view: 'practice', filter: '' };

  function store() {
    try {
      var s = JSON.parse(localStorage.getItem(K) || '{}');
      if (s && s.known) return s;
    } catch (e) { /* ignore */ }
    var fresh = { known: {}, again: {} };
    save(fresh);
    return fresh;
  }
  function save(s) {
    try { localStorage.setItem(K, JSON.stringify(s)); } catch (e) { /* ignore */ }
  }
  function idOf(w) { return (w[2] || 'a1') + ':' + w[0]; }
  function setLevel(lv) {
    state.level = lv; state.idx = 0; state.view = 'practice'; state.filter = '';
    var ws = byLevel[lv] || [];
    var ord = ws.map(function (_, i) { return i; });
    for (var i = ord.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = ord[i]; ord[i] = ord[j]; ord[j] = tmp;
    }
    state.order = ord;
  }
  function currentWord() {
    var ws = byLevel[state.level] || [];
    var ord = state.order;
    if (!ord || !ord.length) return null;
    if (state.idx >= ord.length) state.idx = 0;
    return ws[ord[state.idx]];
  }

  function mark(kind) {
    var w = currentWord(); if (!w) return;
    var s = store();
    var id = idOf(w);
    s.known[id] = (kind === 'known');
    s.again[id] = (kind === 'again');
    save(s);
    state.idx++;
    var root = document.getElementById(renderTarget || 'oxford-trainer-root');
    if (root) render(renderTarget || 'oxford-trainer-root');
  }
  var renderTarget = null;

  function askRami(w) {
    if (!w) return;
    var prompt = 'Salam Teacher Rami — teach me the word "' + w[0] + '" (' + w[1] + ', Oxford ' + (w[2] || '').toUpperCase() + '). Give me: 1) a simple English meaning, 2) two natural IELTS example sentences, 3) one strong collocation that boosts my band score.';
    if (!window.IELTS_RAMI_CHAT) return;
    try { window.IELTS_RAMI_CHAT.togglePanel(); } catch (e) { /* ignore */ }
    setTimeout(function () {
      try { window.IELTS_RAMI_CHAT.quick(prompt); } catch (e) { /* ignore */ }
    }, 150);
  }

  function levelTabsHtml() {
    var s = store();
    return LEVELS.filter(function (lv) { return byLevel[lv] && byLevel[lv].length; }).map(function (lv) {
      var ws = byLevel[lv];
      var known = ws.filter(function (w) { return s.known[idOf(w)]; }).length;
      return '<button class="px-3 py-2 rounded-xl text-xs font-extrabold transition ' +
        (state.level === lv
          ? 'bg-[#d4af37] text-[#14120f]'
          : 'bg-[rgba(212,175,55,0.12)] text-[#f5f0e6]/80 border border-[rgba(212,175,55,0.3)] hover:border-[#d4af37]') +
        '" onclick="window.IELTS_OXFORD_TRAINER.setLevel(\'' + lv + '\')">' +
        lv.toUpperCase() +
        ' <span class="opacity-70 font-bold">· ' + ws.length + '</span>' +
        (known ? ' <span class="text-emerald-400">✓ ' + known + '</span>' : '') +
        '</button>';
    }).join('');
  }

  function statsHtml() {
    var s = store();
    var ws = byLevel[state.level] || [];
    var known = ws.filter(function (w) { return s.known[idOf(w)]; }).length;
    var again = ws.filter(function (w) { return s.again[idOf(w)]; }).length;
    var pct = ws.length ? Math.round((known / ws.length) * 100) : 0;
    return '<div class="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#f5f0e6]/60 mb-4">' +
      '<span class="text-emerald-400 font-bold">✓ ' + t('ox_known') + ': ' + known + ' / ' + ws.length + '</span>' +
      '<span class="text-amber-400 font-bold">🔁 ' + t('ox_again') + ': ' + again + '</span>' +
      '<span class="text-[#d4af37] font-bold">🎯 ' + pct + '%</span>' +
      '<div class="flex-1 min-w-[140px] h-1.5 bg-[rgba(212,175,55,0.15)] rounded-full overflow-hidden"><div class="h-full bg-[#d4af37] rounded-full" style="width:' + pct + '%"></div></div>' +
      '</div>';
  }

  function searchBoxHtml() {
    return '<input id="ox-search" type="text" value="' + esc(state.filter) + '" placeholder="' + esc(t('ox_search')) + '" class="w-full bg-[rgba(20,18,15,0.6)] border border-[rgba(212,175,55,0.3)] rounded-xl px-4 py-2.5 text-sm text-[#f5f0e6] placeholder-[#f5f0e6]/40 focus:outline-none focus:border-[rgba(212,175,55,0.6)] mb-4" oninput="window.IELTS_OXFORD_TRAINER.filter(this.value)">';
  }

  function practiceHtml() {
    var w = currentWord();
    if (!w) return '<p class="text-[#f5f0e6]/60 text-sm py-8 text-center">' + esc(t('ox_empty')) + '</p>';
    var s = store();
    var id = idOf(w);
    var isKnown = !!s.known[id];
    var isAgain = !!s.again[id];
    return '<div class="bg-[rgba(20,18,15,0.5)] border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 text-center">' +
      '<p class="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37]/80 mb-4">' + esc((state.level || '').toUpperCase()) + ' · ' + esc(t('ox_words')) + '</p>' +
      '<div class="w-20 h-20 mx-auto rounded-full bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.35)] flex items-center justify-center text-4xl mb-4">🧠</div>' +
      '<h3 class="text-3xl md:text-4xl font-extrabold text-[#f5f0e6] tracking-tight">' + esc(w[0]) + '</h3>' +
      '<p class="text-sm text-[#f5f0e6]/55 mt-2 italic">' + esc(w[1]) + '</p>' +
      (isKnown ? '<p class="text-[11px] font-bold text-emerald-400 mt-2">✓ ' + esc(t('ox_mastered')) + '</p>' : isAgain ? '<p class="text-[11px] font-bold text-amber-400 mt-2">🔁 ' + esc(t('ox_review')) + '</p>' : '') +
      '<div class="flex flex-wrap items-center justify-center gap-2.5 mt-6">' +
        '<button onclick="window.IELTS_OXFORD_TRAINER.mark(\'again\')" class="px-4 py-2.5 rounded-xl border border-amber-400/50 text-amber-300 hover:bg-amber-400/10 transition text-sm font-bold">🔁 ' + esc(t('ox_again')) + '</button>' +
        '<button onclick="window.IELTS_OXFORD_TRAINER.mark(\'known\')" class="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition text-[#14120f] text-sm font-bold">✓ ' + esc(t('ox_known')) + '</button>' +
        '<button onclick="window.IELTS_OXFORD_TRAINER.askWord()" class="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#b8962e] transition text-[#14120f] text-sm font-bold">🎓 ' + esc(t('ox_ask')) + '</button>' +
      '</div>' +
      '<p class="text-[11px] text-[#f5f0e6]/45 mt-4">' + esc(t('ox_next_hint')) + '</p>' +
      '</div>';
  }

  function listHtml() {
    var ws = byLevel[state.level] || [];
    var s = store();
    var f = state.filter.toLowerCase();
    var list = f ? ws.filter(function (w) { return w[0].toLowerCase().indexOf(f) !== -1; }) : ws;
    if (f && !list.length) return '<p class="text-[#f5f0e6]/50 text-sm py-6 text-center">' + esc(t('ox_none')) + '</p>';
    var show = list.slice(0, 120);
    return '<div class="flex flex-wrap gap-2">' + show.map(function (w) {
      var id = idOf(w);
      var known = !!s.known[id];
      return '<button class="px-3 py-1.5 rounded-lg text-xs border transition ' +
        (known ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300' : 'bg-[rgba(212,175,55,0.08)] border-[rgba(212,175,55,0.25)] text-[#f5f0e6]/80 hover:border-[#d4af37]') +
        '" onclick="window.IELTS_OXFORD_TRAINER.jump(\'' + (w[2] || 'a1') + '\',\'' + esc(w[0]) + '\')" title="' + esc(w[1]) + '">' +
        (known ? '✓ ' : '') + esc(w[0]) + ' <span class="opacity-50">· ' + esc(w[1]) + '</span>' +
        '</button>';
    }).join('') + (list.length > show.length ? '<p class="w-full text-center text-xs text-[#f5f0e6]/40 pt-3">… ' + (list.length - show.length) + ' ' + esc(t('ox_more')) + '</p>' : '') + '</div>';
  }

  function render(containerId) {
    var root = document.getElementById(containerId);
    if (!root) return;
    renderTarget = containerId;
    if (!state.order) setLevel(state.level);
    var total = (window.OXFOLD_5000 || window.OXFORD_5000 || []).length;
    root.innerHTML =
      '<div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mt-6">' +
        '<div class="flex items-center gap-3 mb-1">' +
          '<span class="text-2xl">🧠</span>' +
          '<div><h3 class="text-xl font-extrabold text-[#f5f0e6]">' + esc(t('ox_title')) + '</h3>' +
          '<p class="text-xs text-[#f5f0e6]/55">' + esc(t('ox_sub')) + '</p></div>' +
        '</div>' +
        '<div class="flex flex-wrap gap-2 mt-4 mb-4">' + levelTabsHtml() + '</div>' +
        '<div class="flex items-center justify-between flex-wrap gap-2 mb-2">' +
          statsHtml() +
          '<div class="flex gap-2">' +
            '<button onclick="window.IELTS_OXFORD_TRAINER.toggleView(\'practice\')" class="px-3 py-1.5 rounded-lg text-[11px] font-bold ' + (state.view === 'practice' ? 'bg-[#d4af37] text-[#14120f]' : 'bg-[rgba(212,175,55,0.12)] text-[#f5f0e6]/70 border border-[rgba(212,175,55,0.3)]') + '">🎴 ' + esc(t('ox_practice')) + '</button>' +
            '<button onclick="window.IELTS_OXFORD_TRAINER.toggleView(\'list\')" class="px-3 py-1.5 rounded-lg text-[11px] font-bold ' + (state.view === 'list' ? 'bg-[#d4af37] text-[#14120f]' : 'bg-[rgba(212,175,55,0.12)] text-[#f5f0e6]/70 border border-[rgba(212,175,55,0.3)]') + '">📋 ' + esc(t('ox_list')) + '</button>' +
          '</div>' +
        '</div>' +
        (state.view === 'list' ? searchBoxHtml() + listHtml() : practiceHtml()) +
      '</div>';
  }

  window.IELTS_OXFORD_TRAINER = {
    render: render,
    setLevel: function (lv) { setLevel(lv); render(renderTarget); },
    toggleView: function (v) { state.view = v; render(renderTarget); },
    mark: mark,
    askWord: function () { askRami(currentWord()); },
    jump: function (lv, word) {
      // jump to a specific word in a level for quick practice
      setLevel(lv);
      var ws = byLevel[lv] || [];
      for (var i = 0; i < ws.length; i++) if (ws[i][0] === word) { state.idx = (state.order || []).indexOf(i); if (state.idx < 0) state.idx = i; break; }
      state.view = 'practice';
      render(renderTarget);
    },
    filter: function (v) { state.filter = v || ''; render(renderTarget); }
  };
})();