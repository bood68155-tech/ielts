/* ============================================================
   IELTS Master — built-in translator (offline English ↔ Arabic)
   Word / phrase lookups from the TRANSLATION_DICT glossary plus
   word-by-word sentence translation. Every looked-up word can be
   saved straight into the personal vocabulary builder.
   ============================================================ */
(function () {
  'use strict';

  const { TRANSLATION_DICT } = window.IELTS_DATA;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let mode = 'en-ar'; // 'en-ar' | 'ar-en'
  let lookups = [];   // last word-lookup results

  /* ---------- dictionaries ---------- */
  const enMap = {};   // en (normalized) -> { en, ar }
  const arMap = {};   // ar (normalized) -> { en, ar }
  TRANSLATION_DICT.forEach((e) => {
    enMap[String(e.en).toLowerCase().trim()] = e;
    const arKey = normAr(e.ar);
    if (arKey && !arMap[arKey]) arMap[arKey] = e;
  });

  function normAr(s) {
    return String(s || '')
      .replace(/[\u064B-\u0652\u0670\u0640]/g, '')   // strip tashkeel + tatweel
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function lookupEn(word) {
    return enMap[String(word || '').toLowerCase().trim()] || null;
  }

  function lookupAr(word) {
    return arMap[normAr(word)] || null;
  }

  /* ---------- tokenization ---------- */
  function splitWords(text) {
    return String(text || '').split(/(\s+)/);
  }

  function coreWord(tok) {
    const m = String(tok).match(/[A-Za-z\u0600-\u06FF'’-]+/);
    return m ? m[0] : '';
  }

  /* ---------- main render ---------- */
  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;

    const from = mode === 'en-ar' ? 'English' : 'Arabic';
    const to = mode === 'en-ar' ? 'Arabic' : 'English';
    const dirTo = mode === 'en-ar' ? 'rtl' : 'ltr';

    $('#translator-content').innerHTML = `
      <div class="grid lg:grid-cols-2 gap-5 mb-6">
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <p class="font-bold text-slate-900">🔍 Word lookup</p>
            <div class="flex gap-2">
              <button class="tab-pill ${mode === 'en-ar' ? 'active' : ''}" onclick="IELTS_TRANSLATOR.setMode('en-ar')">EN → AR</button>
              <button class="tab-pill ${mode === 'ar-en' ? 'active' : ''}" onclick="IELTS_TRANSLATOR.setMode('ar-en')">AR → EN</button>
            </div>
          </div>
          <div class="flex gap-2">
            <input id="tr-lookup" type="text" placeholder="Type a word… e.g. sustainable" class="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" onkeydown="if (event.key === 'Enter') IELTS_TRANSLATOR.lookup()" />
            <button class="btn-primary" onclick="IELTS_TRANSLATOR.lookup()">Look up</button>
          </div>
          <div id="tr-lookup-result" class="mt-4"></div>
          <div class="mt-5 pt-4 border-t border-slate-100">
            <p class="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Try a word</p>
            <div class="flex flex-wrap gap-1.5" id="tr-chips"></div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <p class="font-bold text-slate-900 mb-1">📝 Sentence translator <span class="text-xs font-normal text-slate-400">(word-by-word)</span></p>
          <p class="text-xs text-slate-500 mb-4">Type a ${from} sentence — each word is translated using the built-in glossary; words we don't know are highlighted.</p>
          <textarea id="tr-input" rows="4" placeholder="Type your ${from} text here…" class="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-y" oninput="IELTS_TRANSLATOR.translate()"></textarea>
          <div class="flex items-center justify-between mt-3">
            <span class="text-xs text-slate-400">${from} → ${to} · offline glossary (${TRANSLATION_DICT.length} entries)</span>
            <button class="btn-secondary !py-1.5 !px-3 text-xs" onclick="IELTS_TRANSLATOR.clearInput()">Clear</button>
          </div>
          <div id="tr-output" class="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[6rem] text-sm leading-relaxed"></div>
        </div>
      </div>`;

    renderChips();
    if (lookups.length) renderLookupResult();
    translate();
  }

  /* ---------- popular word chips ---------- */
  const CHIP_WORDS = ['sustainable', 'significant', 'benefit', 'environment', 'improve', 'opportunity', 'achievement', 'challenge', 'confidence', 'vocabulary', 'habit', 'goal', 'fluency', 'support'];

  function renderChips() {
    $('#tr-chips').innerHTML = CHIP_WORDS.map((w) => `
      <button class="text-[11px] font-semibold border border-slate-200 rounded-full px-3 py-1.5 hover:border-brand-300 hover:text-brand-600 transition" onclick="IELTS_TRANSLATOR.chip('${w}')">${w}</button>`).join('');
  }

  function chip(word) {
    const input = $('#tr-lookup');
    if (input) { input.value = word; }
    lookup();
  }

  /* ---------- word lookup ---------- */
  function lookup() {
    const raw = $('#tr-lookup') ? $('#tr-lookup').value.trim() : '';
    if (!raw) { window.toast && window.toast('Type a word to look up.'); return; }
    const entry = mode === 'en-ar' ? lookupEn(raw) : lookupAr(raw);
    lookups = [{ word: raw, entry }];
    renderLookupResult();
  }

  function renderLookupResult() {
    const box = $('#tr-lookup-result');
    if (!box) return;
    const { word, entry } = lookups[0];
    if (!entry) {
      box.innerHTML = `
        <div class="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
          “<b>${esc(word)}</b>” is not in the built-in glossary yet. You can still save it to My Words with your own meaning.
        </div>
        <button class="btn-secondary !py-2 !px-3 text-xs mt-3" onclick="IELTS_TRANSLATOR.saveUnknown('${esc(word).replace(/'/g, "\\'")}')">＋ Save “${esc(word)}” to My Words</button>`;
      return;
    }
    const already = window.IELTS_VOCAB && window.IELTS_VOCAB.hasWord(entry.en);
    box.innerHTML = `
      <div class="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3">
        <div class="flex items-center justify-between gap-2">
          <p class="font-extrabold text-slate-900">${esc(entry.en)}</p>
          <button class="btn-primary !py-1.5 !px-3 text-[11px]" onclick="IELTS_TRANSLATOR.saveEntry()">${already ? '✓ Saved' : '＋ Add to My Words'}</button>
        </div>
        <p class="text-sm text-emerald-700 font-semibold mt-1" dir="rtl">${esc(entry.ar)}</p>
      </div>`;
  }

  function saveEntry() {
    const { entry } = lookups[0];
    if (!entry || !window.IELTS_VOCAB) return;
    const added = window.IELTS_VOCAB.addWord({ word: entry.en, meaning: '', ar: entry.ar, example: '', source: 'Translator' });
    window.toast && window.toast(added ? 'Word saved to My Words 📒' : 'Already in your word list');
    renderLookupResult();
  }

  function saveUnknown(word) {
    if (!window.IELTS_VOCAB) return;
    window.IELTS_VOCAB.addWord({ word, meaning: '', ar: '', example: '', source: 'Translator' });
    window.toast && window.toast('Word saved — add a meaning in My Words 📒');
    window.showSection('words');
  }

  /* ---------- sentence translation ---------- */
  function translate() {
    const out = $('#tr-output');
    const input = $('#tr-input');
    if (!out) return;
    const text = input ? input.value : '';
    if (!text.trim()) { out.innerHTML = '<p class="text-slate-400 text-sm">Your translation will appear here.</p>'; return; }

    const tokens = splitWords(text);
    const found = [];
    const unknown = [];
    let html = '';
    let pendingWord = '';

    tokens.forEach((tok) => {
      if (!/\w/.test(tok)) { html += esc(tok); return; }
      const word = coreWord(tok);
      const entry = mode === 'en-ar' ? lookupEn(word) : lookupAr(word);
      if (entry) {
        if (mode === 'en-ar') {
          html += '<span class="tr-word" title="' + esc(entry.en) + '">' + esc(entry.ar) + '</span>';
        } else {
          html += '<span class="tr-word" title="' + esc(entry.ar) + '">' + esc(entry.en) + '</span>';
        }
        if (found.length < 30 && !found.some((f) => f.en === entry.en)) found.push(entry);
      } else {
        html += '<span class="tr-unknown" title="Not in the built-in glossary">' + esc(tok) + '</span>';
        const cw = word.toLowerCase();
        if (!unknown.includes(cw) && !enMap[cw]) unknown.push(cw);
      }
    });

    const unknownChips = unknown.length
      ? `<div class="mt-3 pt-3 border-t border-slate-100">
          <p class="text-xs text-slate-500 mb-1.5">Not found: <button class="text-[11px] font-semibold text-brand-600 hover:underline ml-1" onclick="IELTS_TRANSLATOR.saveAllUnknown()">save all to My Words →</button></p>
          <div class="flex flex-wrap gap-1.5">${unknown.map((w) => '<span class="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">' + esc(w) + '</span>').join('')}</div>
        </div>` : '';

    const foundList = found.length
      ? `<div class="mt-3 pt-3 border-t border-slate-100">
          <p class="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Words translated (${found.length})</p>
          <div class="grid sm:grid-cols-2 gap-1.5">
            ${found.map((e) => `<div class="flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5">
              <span class="text-sm font-semibold text-slate-700">${esc(e.en)} <span class="text-emerald-600 font-normal" dir="rtl">${esc(e.ar)}</span></span>
              <button class="text-[11px] font-semibold text-brand-600 hover:text-brand-800" onclick="IELTS_TRANSLATOR.saveWord('${esc(e.en).replace(/'/g, "\\'")}', '${esc(e.ar).replace(/'/g, "\\'")}')">＋ Save</button>
            </div>`).join('')}
          </div>
        </div>` : '';

    out.innerHTML = `<div class="leading-relaxed" dir="${mode === 'en-ar' ? 'rtl' : 'ltr'}">${html}</div>${foundList}${unknownChips}`;
  }

  function saveWord(en, ar) {
    if (!window.IELTS_VOCAB) return;
    const added = window.IELTS_VOCAB.addWord({ word: en, meaning: '', ar, example: '', source: 'Translator' });
    window.toast && window.toast(added ? 'Word saved to My Words 📒' : 'Already in your word list');
    translate();
  }

  function saveAllUnknown() {
    const input = $('#tr-input') ? $('#tr-input').value : '';
    const words = {};
    splitWords(input).forEach((tok) => {
      if (!/\w/.test(tok)) return;
      const w = coreWord(tok).toLowerCase();
      if (w && !enMap[w]) words[w] = true;
    });
    if (!window.IELTS_VOCAB) return;
    let n = 0;
    Object.keys(words).forEach((w) => { if (window.IELTS_VOCAB.addWord({ word: w, meaning: '', ar: '', example: '', source: 'Translator' })) n++; });
    window.toast && window.toast(n + ' word' + (n === 1 ? '' : 's') + ' saved to My Words 📒');
    translate();
  }

  function clearInput() {
    const input = $('#tr-input');
    if (input) input.value = '';
    translate();
  }

  function setMode(m) {
    mode = m;
    render();
  }

  window.IELTS_TRANSLATOR = { render, setMode, lookup, chip, translate, clearInput, saveEntry, saveUnknown, saveWord, saveAllUnknown };
})();
