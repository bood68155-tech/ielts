/* ============================================================
   IELTS Master — graded reading library (CEFR A1–C2)
   Level-filtered passages with tap-to-translate words and a
   comprehension quiz per passage. Completing a passage awards XP
   (once) and glossary words can be added to the personal
   vocabulary builder.
   ============================================================ */
(function () {
  'use strict';

  const { GRADED_READING, TRANSLATION_DICT, LEVELS } = window.IELTS_DATA;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const READING_XP = 15;
  let answers = {};        // per-passage answers { [qi]: letter|string }
  let selectedLevel = null;

  /* ---------- dictionary lookup ---------- */
  const dictEntries = TRANSLATION_DICT.map((e) => ({ en: String(e.en).toLowerCase(), ar: e.ar }));
  const dictByFirst = {};
  dictEntries.forEach((e) => {
    const first = e.en.split(' ')[0];
    if (!dictByFirst[first]) dictByFirst[first] = [];
    dictByFirst[first].push(e);
  });
  const dictByWord = {};
  dictEntries.forEach((e) => { dictByWord[e.en] = e; });

  function lookupWord(w) {
    return dictByWord[String(w || '').toLowerCase().trim()] || null;
  }

  function glossaryFor(passage) {
    const map = {};
    (passage.words || []).forEach((w) => { map[String(w.word).toLowerCase()] = w; });
    return map;
  }

  /* ---------- tokenize a paragraph into HTML with clickable dict words ---------- */
  function tokenize(text) {
    const tokens = String(text).split(/(\s+)/);
    const glossary = glossaryFor(currentPassage());
    let out = '';
    let i = 0;
    while (i < tokens.length) {
      const tok = tokens[i];
      if (!/\w/.test(tok)) { out += esc(tok); i++; continue; }
      // try to match the longest dict phrase starting at this word
      const words = [];
      let j = i;
      while (j < tokens.length && words.length < 3 && /\w/.test(tokens[j])) {
        words.push(tokens[j]);
        j++;
      }
      let matched = null;
      let matchedLen = 0;
      for (let len = words.length; len >= 1; len--) {
        const phrase = words.slice(0, len).join(' ').toLowerCase();
        if (dictByWord[phrase]) { matched = phrase; matchedLen = len; break; }
      }
      if (matched) {
        const entry = dictByWord[matched];
        const gloss = glossary[matched] || null;
        out += '<span class="dict-word" data-en="' + esc(matched) + '" role="button" tabindex="0">' + esc(words.slice(0, matchedLen).join(' ')) + '</span>';
        i += matchedLen;
      } else {
        out += esc(words[0]);
        i += 1;
      }
    }
    return out;
  }

  let passageCache = null;
  function currentPassage() { return passageCache; }
  function setPassage(p) { passageCache = p; answers = {}; }

  /* ---------- per-user helpers ---------- */
  function userLevelId() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return 'a1';
    return window.IELTS_AUTH.getLevel(user.xp).id;
  }

  function levelShort(id) {
    const l = LEVELS.find((x) => x.id === id);
    return l ? l.shortName : id.toUpperCase();
  }

  function levelIcon(id) {
    const l = LEVELS.find((x) => x.id === id);
    return l ? l.icon : '📘';
  }

  function recommendedFor(userLevel, passageLevel) {
    return userLevel === passageLevel;
  }

  /* ---------- main render ---------- */
  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    if (!selectedLevel) selectedLevel = userLevelId();

    const chips = LEVELS.map((l) => `
      <button class="tab-pill ${l.id === selectedLevel ? 'active' : ''}" onclick="IELTS_READINGS.pickLevel('${l.id}')">${l.icon} ${l.shortName}</button>`).join('');

    const passages = GRADED_READING.filter((p) => p.level === selectedLevel);
    const cards = passages.map(passageCard).join('');

    $('#readings-content').innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="text-sm text-slate-500">Your current CEFR level: <span class="font-bold text-brand-700">${levelIcon(userLevelId())} ${levelShort(userLevelId())}</span></p>
            <p class="text-sm text-slate-600 mt-1">Reading is graded by level — pick the shelf that matches you, then tap any highlighted word to see its meaning and translation.</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mt-4">${chips}</div>
      </div>
      <div class="space-y-6">${cards}</div>`;
  }

  function passageCard(p) {
    setPassage(p); // glossary lookups during tokenizing need the current passage
    const isRec = recommendedFor(userLevelId(), p.level);
    const body = p.text.map((para) => '<p>' + tokenize(para) + '</p>').join('');
    const gloss = (p.words || []).map((w) => `
      <div class="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
        <div class="min-w-0">
          <p class="text-sm font-bold text-slate-800">${esc(w.word)}</p>
          <p class="text-[11px] text-slate-500 leading-snug">${esc(w.meaning)} <span class="text-emerald-600" dir="rtl">· ${esc(w.ar)}</span></p>
        </div>
        <button class="btn-secondary !py-1.5 !px-3 text-[11px] shrink-0" onclick="IELTS_READINGS.addGlossaryWord('${p.id}', '${esc(w.word).replace(/'/g, "\\'")}')">＋ Save</button>
      </div>`).join('');

    const qHtml = p.questions.map((q, qi) => {
      let control = '';
      if (q.type === 'mcq') {
        control = `
          <div class="grid gap-2 mt-3" data-options>
            ${q.options.map((opt, oi) => {
              const letter = String.fromCharCode(65 + oi);
              return `<button type="button" class="opt ${answers[qi] === letter ? 'selected' : ''}" data-letter="${letter}" onclick="IELTS_READINGS.selectAnswer(${qi}, '${letter}', this)">
                <span class="inline-block w-5 text-slate-400 font-semibold">${letter}</span> ${esc(opt)}
              </button>`;
            }).join('')}
          </div>`;
      } else {
        control = `<input type="text" class="fill-input mt-3" placeholder="Type your answer…" value="${esc(answers[qi] || '')}" oninput="IELTS_READINGS.saveFill(${qi}, this.value)" />`;
      }
      return `
        <div class="q-card">
          <div class="flex items-start gap-3">
            <span class="q-number shrink-0">${qi + 1}</span>
            <div class="flex-1">
              <p class="text-sm font-medium text-slate-800">${esc(q.question)}</p>
              ${control}
              <div class="explanation-slot mt-2"></div>
            </div>
          </div>
        </div>`;
    }).join('');

    return `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="bg-gradient-to-r from-brand-600 to-indigo-500 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 class="font-extrabold">${esc(p.title)}</h3>
            <p class="text-xs text-brand-100 mt-0.5">${levelIcon(p.level)} ${levelShort(p.level)} level · ~${p.minutes} min read ${isRec ? '· <span class="font-bold">recommended for you</span>' : ''}</p>
          </div>
          <button class="bg-white/15 border border-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-white/25 transition" onclick="IELTS_READINGS.addAllGlossary('${p.id}')">＋ Save all ${(p.words || []).length} words</button>
        </div>
        <div class="grid lg:grid-cols-2">
          <div class="p-6 lg:border-r border-slate-100">
            <div class="passage-text text-sm text-slate-700 leading-relaxed">${body}</div>
            <div class="mt-5 pt-4 border-t border-slate-100">
              <p class="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Key words</p>
              <div class="space-y-2">${gloss}</div>
            </div>
          </div>
          <div class="p-6 bg-slate-50/50">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-bold uppercase tracking-wide text-slate-400">Comprehension check</span>
              <button class="btn-primary !py-2 !px-4 text-xs" onclick="IELTS_READINGS.checkPassage('${p.id}')">Check answers</button>
            </div>
            <div class="space-y-4">${qHtml}</div>
            <div id="reading-gr-result-${p.id}" class="mt-6"></div>
          </div>
        </div>
      </div>`;
  }

  /* ---------- actions ---------- */
  function pickLevel(levelId) {
    selectedLevel = levelId;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function selectAnswer(qi, letter, btn) {
    answers[qi] = letter;
    const wrap = btn.closest('[data-options]');
    if (wrap) wrap.querySelectorAll('.opt').forEach((o) => o.classList.remove('selected'));
    btn.classList.add('selected');
  }

  function saveFill(qi, value) { answers[qi] = value; }

  function checkAnswer(q, ua) {
    if (!ua) return false;
    if (q.type === 'fill') {
      const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, ' ');
      return q.answer.some((a) => norm(a) === norm(ua));
    }
    return String(ua).toLowerCase() === String(q.answer).toLowerCase();
  }

  function checkPassage(passageId) {
    const p = GRADED_READING.find((x) => x.id === passageId);
    if (!p) return;
    let correct = 0;
    const rows = p.questions.map((q, i) => {
      const ua = answers[i];
      const ok = checkAnswer(q, ua);
      if (ok) correct++;
      const shown = q.type === 'mcq' ? q.answer + ' — ' + q.options[q.answer.charCodeAt(0) - 65] : q.answer;
      return `<p class="text-sm"><span class="font-semibold text-slate-700">Q${i + 1} ${ua ? (ok ? '✅' : '❌') : '—'}</span> <span class="${ok ? 'answer-correct' : 'answer-wrong'}">${ok ? 'Correct' : 'Incorrect'}</span> <span class="text-slate-500">· Answer: <span class="font-semibold text-slate-700">${esc(shown)}</span></span>${ok ? '' : ' <span class="text-slate-400">· ' + esc(q.explanation) + '</span>'}</p>`;
    }).join('');
    const total = p.questions.length;
    const pct = Math.round((correct / total) * 100);

    $('#reading-gr-result-' + p.id).innerHTML = `
      <div class="result-banner ${pct >= 60 ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}">
        <p class="text-lg font-extrabold text-slate-900">You scored ${correct} / ${total} (${pct}%)</p>
        <p class="text-sm text-slate-600 mt-1">${pct >= 80 ? 'Excellent — you are reading comfortably at this level.' : pct >= 60 ? 'Good job — reread the parts you missed.' : 'Try the level below or reread this passage carefully.'}</p>
        <div class="mt-3 space-y-1.5">${rows}</div>
      </div>`;

    if (window.IELTS_AUTH && window.IELTS_AUTH.completeClaim('reading-gr-' + p.id)) {
      window.IELTS_AUTH.addXp(READING_XP);
      window.IELTS_AUTH.addActivity('reading', 'Completed graded reading “' + p.title + '” (' + levelShort(p.level) + ')', READING_XP);
      window.toast && window.toast('+' + READING_XP + ' XP for the graded reading!');
    }
    window.scrollTo({ top: $('#reading-gr-result-' + p.id).offsetTop - 100, behavior: 'smooth' });
  }

  /* ---------- add glossary words to the vocabulary builder ---------- */
  function addGlossaryWord(passageId, word) {
    const p = GRADED_READING.find((x) => x.id === passageId);
    if (!p || !window.IELTS_VOCAB) return;
    const w = (p.words || []).find((x) => x.word === word);
    if (!w) return;
    const added = window.IELTS_VOCAB.addWord({ word: w.word, meaning: w.meaning, ar: w.ar, example: w.example, source: 'Graded reading · ' + p.title });
    window.toast && window.toast(added ? 'Word saved to My Words 📒' : 'Already in your word list');
    render();
  }

  function addAllGlossary(passageId) {
    const p = GRADED_READING.find((x) => x.id === passageId);
    if (!p || !window.IELTS_VOCAB) return;
    let added = 0;
    (p.words || []).forEach((w) => {
      if (window.IELTS_VOCAB.addWord({ word: w.word, meaning: w.meaning, ar: w.ar, example: w.example, source: 'Graded reading · ' + p.title })) added++;
    });
    window.toast && window.toast(added + ' word' + (added === 1 ? '' : 's') + ' saved to My Words 📒');
    render();
  }

  /* ---------- word tooltip ---------- */
  function openWordTooltip(span) {
    const word = span.dataset.en;
    const entry = lookupWord(word);
    const gloss = glossaryFor(currentPassage())[word] || null;
    if (!entry && !gloss) {
      window.toast && window.toast('“' + word + '” is not in the built-in dictionary — add it manually in My Words.');
      return;
    }
    const en = gloss ? gloss.meaning : (entry ? entry.en : word);
    const ar = (gloss && gloss.ar) || (entry ? entry.ar : '');
    const example = gloss ? gloss.example : '';
    const already = window.IELTS_VOCAB && window.IELTS_VOCAB.hasWord(word);

    const tip = document.getElementById('dict-tooltip');
    tip.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <p class="font-extrabold text-slate-900">${esc(word)}</p>
        <button onclick="IELTS_READINGS.closeTooltip()" class="text-slate-400 hover:text-slate-700 text-sm leading-none">✕</button>
      </div>
      <p class="text-xs text-slate-600 mt-1 leading-snug">${esc(en)}</p>
      ${ar ? '<p class="text-sm text-emerald-700 font-semibold mt-1" dir="rtl">' + esc(ar) + '</p>' : ''}
      ${example ? '<p class="text-[11px] text-slate-500 italic mt-1">“' + esc(example) + '”</p>' : ''}
      <button class="btn-primary !py-1.5 !px-3 text-[11px] mt-2 w-full" onclick="IELTS_READINGS.saveTooltipWord()">${already ? '✓ Saved' : '＋ Add to My Words'}</button>`;
    tip.dataset.word = word;
    tip.classList.remove('hidden');

    const rect = span.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - tipRect.width / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tipRect.width - 8));
    let top = rect.bottom + 8;
    if (top + tipRect.height > window.innerHeight - 8) top = rect.top - tipRect.height - 8;
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  }

  function saveTooltipWord() {
    const tip = document.getElementById('dict-tooltip');
    const word = tip.dataset.word;
    const entry = lookupWord(word);
    const gloss = glossaryFor(currentPassage())[word] || null;
    if (!window.IELTS_VOCAB) return;
    const added = window.IELTS_VOCAB.addWord({
      word,
      meaning: (gloss && gloss.meaning) || (entry ? 'See dictionary' : ''),
      ar: (gloss && gloss.ar) || (entry ? entry.ar : ''),
      example: gloss ? gloss.example : '',
      source: 'Graded reading'
    });
    window.toast && window.toast(added ? 'Word saved to My Words 📒' : 'Already in your word list');
    closeTooltip();
    render();
  }

  function closeTooltip() {
    const tip = document.getElementById('dict-tooltip');
    if (tip) tip.classList.add('hidden');
  }

  /* ---------- event wiring (runs once) ---------- */
  function wireEvents() {
    document.addEventListener('click', (e) => {
      const span = e.target.closest('.dict-word');
      if (span) { openWordTooltip(span); return; }
      const tip = document.getElementById('dict-tooltip');
      if (tip && !tip.contains(e.target) && !e.target.closest('.dict-word')) closeTooltip();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeTooltip();
    });
    // tooltip root (appended to body once)
    if (!document.getElementById('dict-tooltip')) {
      const tip = document.createElement('div');
      tip.id = 'dict-tooltip';
      tip.className = 'dict-tooltip hidden';
      document.body.appendChild(tip);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wireEvents);
  else wireEvents();

  window.IELTS_READINGS = { render, pickLevel, selectAnswer, saveFill, checkPassage, addGlossaryWord, addAllGlossary, openWordTooltip, saveTooltipWord, closeTooltip };
})();
