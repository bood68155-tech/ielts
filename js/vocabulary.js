/* ============================================================
   IELTS Master — personal vocabulary builder
   Save words from the graded readers, the translator or manually,
   review them as flashcards and mark them as learned. Stored per
   user under user_<id>_words and mirrored to the saved_words
   Supabase table when configured.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const ADD_XP = 2;
  const LEARN10_XP = 20;

  let cache = null;      // user-scoped word list
  let filter = 'all';    // all | learning | learned
  let search = '';
  let reviewing = null;  // flashcard queue

  /* ---------- state ---------- */
  function wordState() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return null;
    if (cache === null) {
      cache = window.IELTS_AUTH.getScoped('words', null) || { words: [] };
      if (!Array.isArray(cache.words)) cache.words = [];
    }
    return cache;
  }

  function saveWords() {
    if (cache !== null) window.IELTS_AUTH.setScoped('words', cache);
  }

  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) {
    window.IELTS_AUTH.onUserChange(() => { cache = null; reviewing = null; });
  }

  /* ---------- add / has (used by readings.js + translator.js) ---------- */
  function hasWord(word) {
    const s = wordState();
    if (!s) return false;
    return s.words.some((w) => w.word.toLowerCase() === String(word).toLowerCase().trim());
  }

  function addWord(data) {
    const s = wordState();
    if (!s) return false;
    const word = String(data.word || '').trim();
    if (!word) return false;
    if (hasWord(word)) return false;
    const entry = {
      id: 'w' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      word,
      meaning: String(data.meaning || '').trim(),
      ar: String(data.ar || '').trim(),
      example: String(data.example || '').trim(),
      pos: String(data.pos || '').trim(),
      source: String(data.source || 'Manual').trim(),
      addedAt: Date.now(),
      learned: false,
      reviewCount: 0
    };
    s.words.unshift(entry);
    saveWords();
    // small XP reward the first time a word is added
    const auth = window.IELTS_AUTH;
    if (auth.completeClaim('word-added-' + entry.id)) {
      auth.addXp(ADD_XP);
      auth.addActivity('words', 'Added “' + word + '” to your vocabulary', ADD_XP);
    }
    return true;
  }

  function removeWord(id) {
    const s = wordState();
    if (!s) return;
    const w = s.words.find((x) => x.id === id);
    s.words = s.words.filter((x) => x.id !== id);
    saveWords();
    if (w) window.toast && window.toast('Removed “' + w.word + '”');
    render();
  }

  function toggleLearned(id) {
    const s = wordState();
    if (!s) return;
    const w = s.words.find((x) => x.id === id);
    if (!w) return;
    w.learned = !w.learned;
    if (w.learned) w.reviewCount++;
    saveWords();
    checkLearnMilestone();
    render();
  }

  function checkLearnMilestone() {
    const s = wordState();
    const auth = window.IELTS_AUTH;
    if (!s || !auth) return;
    const learned = s.words.filter((w) => w.learned).length;
    if (learned >= 10 && auth.completeClaim('words-learn-10')) {
      auth.addXp(LEARN10_XP);
      auth.addActivity('words', 'Learned 10 words — your vocabulary is growing!', LEARN10_XP);
      window.toast && window.toast('10 words mastered — +' + LEARN10_XP + ' XP! 🎉');
    }
    if (learned >= 50 && auth.completeClaim('words-learn-50')) {
      auth.addXp(50);
      auth.addActivity('words', 'Learned 50 words — impressive!', 50);
      window.toast && window.toast('50 words mastered — +50 XP! 🏆');
    }
  }

  /* ---------- flashcard review ---------- */
  function startReview() {
    const s = wordState();
    if (!s) return;
    const queue = s.words.filter((w) => !w.learned).slice();
    if (!queue.length) {
      window.toast && window.toast('Nothing to review — all words are mastered! 🎉');
      return;
    }
    queue.sort(() => Math.random() - 0.5);
    reviewing = { queue, index: 0 };
    renderReview();
  }

  function renderReview() {
    const s = wordState();
    if (!s || !reviewing) return;
    const r = reviewing;
    const body = $('#words-content');
    if (!body) return;

    if (r.index >= r.queue.length) {
      const reviewed = r.queue.length;
      reviewing = null;
      body.innerHTML = `
        <div class="bg-white rounded-2xl border border-emerald-200 ring-2 ring-emerald-100 shadow-sm p-10 text-center max-w-xl mx-auto">
          <p class="text-4xl mb-3">🎉</p>
          <p class="text-xl font-extrabold text-slate-900">Review complete!</p>
          <p class="text-sm text-slate-500 mt-1">You went through ${reviewed} word${reviewed === 1 ? '' : 's'}. Repetition is how words stick.</p>
          <div class="flex justify-center gap-3 mt-6">
            <button class="btn-primary" onclick="IELTS_VOCAB.render()">Back to My Words</button>
            <button class="btn-secondary" onclick="IELTS_VOCAB.startReview()">Review again</button>
          </div>
        </div>`;
      return;
    }

    const w = r.queue[r.index];
    body.innerHTML = `
      <div class="max-w-xl mx-auto">
        <div class="flex items-center justify-between mb-4">
          <button class="text-sm text-slate-500 hover:text-slate-800 border border-slate-300 px-4 py-2 rounded-lg transition" onclick="IELTS_VOCAB.render()">← Back</button>
          <span class="text-xs font-bold text-slate-500">${r.index + 1} / ${r.queue.length}</span>
        </div>
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center" onclick="IELTS_VOCAB.flipCard()">
          <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">${esc(w.source)} · tap to flip</p>
          <div id="flash-front">
            <p class="text-4xl font-extrabold text-brand-700">${esc(w.word)}</p>
          </div>
          <div id="flash-back" class="hidden">
            <p class="text-3xl font-extrabold text-slate-900">${esc(w.word)}</p>
            ${w.meaning ? '<p class="text-sm text-slate-600 mt-3">' + esc(w.meaning) + '</p>' : ''}
            ${w.ar ? '<p class="text-xl text-emerald-700 font-semibold mt-2" dir="rtl">' + esc(w.ar) + '</p>' : ''}
            ${w.example ? '<p class="text-xs text-slate-500 italic mt-3">“' + esc(w.example) + '”</p>' : ''}
          </div>
        </div>
        <div class="flex justify-center gap-3 mt-6">
          <button class="btn-secondary" onclick="IELTS_VOCAB.reviewAgain()">🔄 Still learning</button>
          <button class="btn-primary" onclick="IELTS_VOCAB.reviewGotIt()">✅ Got it</button>
        </div>
      </div>`;
  }

  function flipCard() {
    const front = $('#flash-front');
    const back = $('#flash-back');
    if (front) front.classList.toggle('hidden');
    if (back) back.classList.toggle('hidden');
  }

  function reviewGotIt() {
    const s = wordState();
    if (!s || !reviewing) return;
    const w = reviewing.queue[reviewing.index];
    const stored = s.words.find((x) => x.id === w.id);
    if (stored) { stored.learned = true; stored.reviewCount++; }
    saveWords();
    checkLearnMilestone();
    reviewing.index++;
    renderReview();
  }

  function reviewAgain() {
    const s = wordState();
    if (!s || !reviewing) return;
    const w = reviewing.queue[reviewing.index];
    const stored = s.words.find((x) => x.id === w.id);
    if (stored) stored.reviewCount++;
    saveWords();
    // move to the back of the queue so it comes around again
    reviewing.queue.push(reviewing.queue.splice(reviewing.index, 1)[0]);
    renderReview();
  }

  /* ---------- render ---------- */
  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    if (reviewing) { renderReview(); return; }
    const s = wordState();
    if (!s) return;

    let list = s.words.slice();
    if (search) list = list.filter((w) => w.word.toLowerCase().includes(search.toLowerCase()) || (w.meaning || '').toLowerCase().includes(search.toLowerCase()));
    if (filter === 'learning') list = list.filter((w) => !w.learned);
    if (filter === 'learned') list = list.filter((w) => w.learned);

    const learnedCount = s.words.filter((w) => w.learned).length;
    const rows = list.length ? list.map(wordRow).join('') : `
      <div class="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
        <p class="text-3xl mb-2">📒</p>
        <p class="font-bold text-slate-800">No words here yet</p>
        <p class="text-sm text-slate-500 mt-1">Save words from Level Reading, the Translator, or add your own below.</p>
      </div>`;

    $('#words-content').innerHTML = `
      <div class="grid lg:grid-cols-3 gap-5 mb-6">
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p class="text-lg font-extrabold text-slate-900">Your vocabulary</p>
              <p class="text-xs text-slate-500 mt-0.5">${s.words.length} words · ${learnedCount} mastered</p>
            </div>
            <button class="btn-primary" onclick="IELTS_VOCAB.startReview()">🎴 Review flashcards</button>
          </div>
          <div class="flex flex-wrap items-center gap-2 mt-5">
            <input id="vocab-search" type="text" placeholder="Search your words…" value="${esc(search)}" class="flex-1 min-w-[10rem] px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" oninput="IELTS_VOCAB.setSearch(this.value)" />
            ${['all', 'learning', 'learned'].map((f) => `<button class="tab-pill ${filter === f ? 'active' : ''}" onclick="IELTS_VOCAB.setFilter('${f}')">${f === 'all' ? 'All' : f === 'learning' ? 'Learning' : 'Mastered'}</button>`).join('')}
          </div>
          <div class="mt-4 space-y-2.5">${rows}</div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 self-start">
          <p class="font-bold text-slate-900 mb-1">➕ Add a word</p>
          <p class="text-xs text-slate-500 mb-4">Words you save earn +${ADD_XP} XP each and sync to your account.</p>
          <form onsubmit="IELTS_VOCAB.addManual(event)" class="space-y-3">
            <input id="vocab-word" type="text" required placeholder="Word (e.g. resilient)" class="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
            <input id="vocab-meaning" type="text" placeholder="Meaning (English)" class="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
            <input id="vocab-ar" type="text" placeholder="Translation (Arabic)" dir="rtl" class="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
            <input id="vocab-example" type="text" placeholder="Example sentence" class="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
            <button type="submit" class="btn-primary w-full !py-2.5">Save word</button>
          </form>
          <p class="text-[11px] text-slate-400 mt-3">Tip: the more often you review a word, the faster it moves into your long-term memory.</p>
        </div>
      </div>`;
  }

  function wordRow(w) {
    return `
      <div class="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            <p class="font-extrabold text-slate-900">${esc(w.word)}</p>
            ${w.pos ? '<span class="text-[10px] text-slate-400 uppercase tracking-wide">' + esc(w.pos) + '</span>' : ''}
            <span class="text-[10px] font-bold ${w.learned ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'} px-2 py-0.5 rounded-full">${w.learned ? '✓ Mastered' : 'Learning'}</span>
            <span class="text-[10px] text-slate-400">${esc(w.source)}</span>
          </div>
          ${w.meaning ? '<p class="text-sm text-slate-600 mt-1">' + esc(w.meaning) + '</p>' : ''}
          ${w.ar ? '<p class="text-sm text-emerald-700 font-semibold mt-0.5" dir="rtl">' + esc(w.ar) + '</p>' : ''}
          ${w.example ? '<p class="text-xs text-slate-500 italic mt-1">“' + esc(w.example) + '”</p>' : ''}
          <p class="text-[10px] text-slate-400 mt-1">Reviewed ${w.reviewCount || 0}× · added ${new Date(w.addedAt).toLocaleDateString()}</p>
        </div>
        <div class="flex flex-col gap-1.5 shrink-0">
          <button class="btn-secondary !py-1.5 !px-3 text-[11px]" onclick="IELTS_VOCAB.toggleLearned('${w.id}')">${w.learned ? '↺ Unlearn' : '✓ Master'}</button>
          <button class="text-[11px] font-semibold text-rose-500 hover:text-rose-700" onclick="IELTS_VOCAB.removeWord('${w.id}')">Delete</button>
        </div>
      </div>`;
  }

  function addManual(event) {
    if (event) event.preventDefault();
    const word = $('#vocab-word').value.trim();
    if (!word) return;
    const added = addWord({
      word,
      meaning: $('#vocab-meaning').value.trim(),
      ar: $('#vocab-ar').value.trim(),
      example: $('#vocab-example').value.trim(),
      source: 'Manual'
    });
    if (added) {
      window.toast && window.toast('Word saved to My Words 📒');
      $('#vocab-word').value = ''; $('#vocab-meaning').value = ''; $('#vocab-ar').value = ''; $('#vocab-example').value = '';
    } else {
      window.toast && window.toast('That word is already in your list');
    }
    render();
  }

  function setSearch(v) { search = v; render(); }
  function setFilter(f) { filter = f; render(); }

  window.IELTS_VOCAB = { render, addWord, hasWord, removeWord, toggleLearned, startReview, flipCard, reviewGotIt, reviewAgain, addManual, setSearch, setFilter };
})();
