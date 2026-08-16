/* ============================================================
   IELTS Master — zero-to-hero training modules
   Vocabulary, Listening and Speaking skill paths with stages.
   Progress + XP stored per user in localStorage.
   ============================================================ */
(function () {
  'use strict';

  const { TRAINING_MODULES } = window.IELTS_DATA;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let active = null;          // { moduleId, stageIdx }
  let answers = {};           // current stage answers
  let speakingRatings = {};   // current speaking stage ratings
  let audioUnavailable = false;

  /* ---------- text-to-speech (same approach as the main app) ---------- */
  function speak(text, onDone) {
    if (audioUnavailable || !('speechSynthesis' in window)) {
      audioUnavailable = true;
      window.toast && window.toast('Text-to-speech is not available here — read the text aloud instead.');
      if (onDone) onDone();
      return;
    }
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const voice = voices.find((v) => /en[-_]GB/i.test(v.lang)) || voices.find((v) => /^en/i.test(v.lang)) || null;
    if (voice) utter.voice = voice;
    utter.rate = 0.95;
    utter.onend = () => onDone && onDone();
    utter.onerror = () => onDone && onDone();
    speechSynthesis.speak(utter);
  }

  function speakLines(lines, i, onDone) {
    if (i >= lines.length) { if (onDone) onDone(); return; }
    speak(lines[i], () => speakLines(lines, i + 1, onDone));
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }

  /* ---------- per-user training state ---------- */
  function trainState() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return null;
    if (!user.training) user.training = {};
    return user.training;
  }

  function moduleState(mId) {
    const ts = trainState();
    if (!ts) return null;
    if (!ts[mId]) ts[mId] = { completed: [], scores: {} };
    return ts[mId];
  }

  function getModule(mId) {
    return TRAINING_MODULES.find((m) => m.id === mId);
  }

  function isStageDone(m, i) {
    const ms = moduleState(m.id);
    return ms && ms.completed.includes(m.stages[i].id);
  }

  function countDone(mId) {
    const ms = moduleState(mId);
    return ms ? ms.completed.length : 0;
  }

  function firstOpenStage(m) {
    for (let i = 0; i < m.stages.length; i++) {
      if (!isStageDone(m, i)) return i;
    }
    return 0;
  }

  /* ---------- completion & XP ---------- */
  function markStageDone(m, stageIdx) {
    const ms = moduleState(m.id);
    const stage = m.stages[stageIdx];
    if (!ms.completed.includes(stage.id)) {
      ms.completed.push(stage.id);
      window.IELTS_AUTH.save();
      window.IELTS_AUTH.addActivity('training', 'Completed ' + stage.title + ' · ' + m.name, m.xpPerStage);
      const allDone = countDone(m.id) >= m.stages.length;
      if (allDone) {
        window.IELTS_AUTH.addActivity('training', 'Finished the ' + m.name + ' module — zero to hero! 🦸', 0);
      }
      return true;
    }
    return false;
  }

  function awardAndAdvance(m, stageIdx) {
    const fresh = markStageDone(m, stageIdx);
    if (fresh) {
      window.IELTS_AUTH.addXp(m.xpPerStage);
      window.toast && window.toast('+' + m.xpPerStage + ' XP — stage complete! 🎉');
    }
    const next = stageIdx + 1;
    if (next < m.stages.length) {
      openStage(m.id, next);
      window.toast && window.toast('Next stage unlocked — keep going! 🔓');
    } else {
      openModule(m.id, 0);
      window.toast && window.toast('🦸 ' + m.name + ' module complete — you went zero to hero!');
    }
  }

  /* ---------- answer checking (same rules as the exam) ---------- */
  function checkAnswer(q, ua) {
    if (!ua) return false;
    if (q.type === 'fill') {
      const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, ' ');
      return q.answer.some((a) => norm(a) === norm(ua));
    }
    return String(ua).toLowerCase() === String(q.answer).toLowerCase();
  }

  /* ---------- overview: all modules ---------- */
  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    stopSpeech();
    if (active) { renderModule(); return; }
    $('#training-content').innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <p class="text-sm text-slate-500">Zero-to-hero skill training</p>
        <p class="text-lg font-extrabold text-slate-900">🎓 Pick a path and level up, step by step</p>
        <p class="text-sm text-slate-600 mt-1">Each module has 5 progressive stages. Complete a stage to earn XP and unlock the next one — finish all 5 to become a hero. 🦸</p>
      </div>
      <div class="grid md:grid-cols-3 gap-5">
        ${TRAINING_MODULES.map(moduleCard).join('')}
      </div>`;
  }

  function moduleCard(m) {
    const done = countDone(m.id);
    const pct = Math.round((done / m.stages.length) * 100);
    const allDone = done >= m.stages.length;
    const label = allDone ? 'Completed 🦸' : done > 0 ? 'Continue training' : 'Start training';
    return `
      <div class="bg-white rounded-2xl border ${allDone ? 'border-emerald-200 ring-2 ring-emerald-100' : 'border-slate-200'} shadow-sm p-6 flex flex-col">
        <div class="text-4xl mb-3">${m.icon}</div>
        <h3 class="text-lg font-extrabold text-slate-900">${m.name}</h3>
        <p class="text-sm text-slate-500 mt-1 leading-relaxed flex-1">${esc(m.desc)}</p>
        <div class="mt-4">
          <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span class="font-semibold">${done}/${m.stages.length} stages</span>
            <span>${pct}%</span>
          </div>
          <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full ${allDone ? 'bg-emerald-500' : 'bg-brand-500'} rounded-full transition-all" style="width: ${pct}%"></div>
          </div>
        </div>
        <button class="${allDone ? 'btn-secondary' : 'btn-primary'} mt-5 text-sm" onclick="IELTS_TRAINING.openModule('${m.id}')">${label} →</button>
      </div>`;
  }

  /* ---------- module detail ---------- */
  function openModule(mId, stageIdx) {
    const m = getModule(mId);
    if (!m) return;
    const idx = (stageIdx !== undefined && stageIdx !== null) ? stageIdx : firstOpenStage(m);
    active = { moduleId: mId, stageIdx: idx };
    answers = {};
    speakingRatings = {};
    renderModule();
  }

  function openStage(mId, idx) {
    active = { moduleId: mId, stageIdx: idx };
    answers = {};
    speakingRatings = {};
    renderModule();
  }

  function backToModules() {
    active = null;
    answers = {};
    speakingRatings = {};
    render();
  }

  function renderModule() {
    const m = getModule(active.moduleId);
    if (!m) return;
    const stage = m.stages[active.stageIdx];

    const steps = m.stages.map((s, i) => {
      const done = isStageDone(m, i);
      const cur = i === active.stageIdx;
      const locked = i > 0 && !isStageDone(m, i - 1);
      return `
        <button onclick="IELTS_TRAINING.goToStage(${i})" class="flex-1 text-center px-2 py-2 rounded-xl border transition ${cur ? 'border-brand-400 bg-brand-50' : done ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white opacity-70'}">
          <span class="block text-base leading-none">${done ? '✅' : locked ? '🔒' : '🎯'}</span>
          <span class="block text-[10px] font-bold mt-1 ${cur ? 'text-brand-700' : done ? 'text-emerald-600' : 'text-slate-400'}">Step ${i + 1}</span>
        </button>`;
    }).join('');

    $('#training-content').innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <button class="text-sm text-slate-500 hover:text-slate-800 border border-slate-300 px-4 py-2 rounded-lg transition" onclick="IELTS_TRAINING.backToModules()">← All modules</button>
        <span class="text-xs font-bold level-badge-sky px-3 py-1.5 rounded-full">${m.icon} ${m.name} · ${m.xpPerStage} XP per stage</span>
      </div>
      <div class="flex gap-2 mb-6">${steps}</div>
      <div id="train-stage"></div>`;

    if (m.id === 'vocabulary') renderVocabStage(m, stage);
    else if (m.id === 'listening') renderListeningStage(m, stage);
    else renderSpeakingStage(m, stage);
  }

  function goToStage(i) {
    const m = getModule(active.moduleId);
    if (i > 0 && !isStageDone(m, i - 1)) {
      window.toast && window.toast('🔒 Complete the previous stage first');
      return;
    }
    openStage(m.id, i);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- vocabulary stage ---------- */
  function renderVocabStage(m, stage) {
    const cards = stage.words.map((w, wi) => `
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <button type="button" onclick="IELTS_TRAINING.toggleCard(this)" class="w-full text-left">
          <p class="font-extrabold text-brand-700">${esc(w.word)}</p>
          <p class="text-xs text-slate-400 mt-0.5">tap to reveal</p>
        </button>
        <div class="hidden mt-3 pt-3 border-t border-slate-100">
          <p class="text-sm text-slate-700">${esc(w.meaning)}</p>
          <p class="text-xs text-slate-500 italic mt-1">“${esc(w.example)}”</p>
        </div>
      </div>`).join('');

    const quiz = stage.quiz.map((q, qi) => `
      <div class="q-card">
        <div class="flex items-start gap-3">
          <span class="q-number shrink-0">${qi + 1}</span>
          <div class="flex-1">
            <p class="text-sm font-medium text-slate-800">${esc(q.q || q.question)}</p>
            <div class="grid gap-2 mt-3" data-options>
              ${q.options.map((opt, oi) => {
                const letter = String.fromCharCode(65 + oi);
                return '<button type="button" class="opt" data-letter="' + letter + '" onclick="IELTS_TRAINING.selectAnswer(' + qi + ', ' + "'" + letter + "'" + ', this)"><span class="inline-block w-5 text-slate-400 font-semibold">' + letter + '</span> ' + esc(opt) + '</button>';
              }).join('')}
            </div>
            <div class="explanation-slot mt-2"></div>
          </div>
        </div>
      </div>`).join('');

    $('#train-stage').innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 class="text-xl font-extrabold text-slate-900">${m.icon} ${esc(stage.title)}</h3>
            <p class="text-sm text-slate-500 mt-0.5">${esc(stage.focus)}</p>
          </div>
          <span class="text-xs font-bold bg-brand-100 text-brand-700 px-3 py-1.5 rounded-full">Learn ${stage.words.length} words · ${stage.quiz.length} quiz questions</span>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">${cards}</div>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h4 class="font-bold text-slate-900 mb-1">📝 Quick quiz</h4>
        <p class="text-sm text-slate-500 mb-5">Check you remember the words — score ${Math.round(stage.quiz.length / 2)}/5 or more to pass.</p>
        <div class="space-y-4">${quiz}</div>
        <div class="flex gap-3 mt-6">
          <button class="btn-primary" onclick="IELTS_TRAINING.checkStage()">Check answers</button>
          <button class="btn-secondary" onclick="IELTS_TRAINING.retryStage()">Clear answers</button>
        </div>
        <div id="train-result" class="mt-5"></div>
      </div>`;
  }

  /* ---------- listening stage ---------- */
  function renderListeningStage(m, stage) {
    const questions = stage.questions.map((q, qi) => {
      let control = '';
      if (q.type === 'mcq') {
        control = `
          <div class="grid gap-2 mt-3" data-options>
            ${q.options.map((opt, oi) => {
              const letter = String.fromCharCode(65 + oi);
              return '<button type="button" class="opt" data-letter="' + letter + '" onclick="IELTS_TRAINING.selectAnswer(' + qi + ', ' + "'" + letter + "'" + ', this)"><span class="inline-block w-5 text-slate-400 font-semibold">' + letter + '</span> ' + esc(opt) + '</button>';
            }).join('')}
          </div>`;
      } else {
        control = '<input type="text" class="fill-input mt-3" placeholder="Type your answer…" oninput="IELTS_TRAINING.saveFill(' + qi + ', this.value)" />';
      }
      return `
        <div class="q-card">
          <div class="flex items-start gap-3">
            <span class="q-number shrink-0">${qi + 1}</span>
            <div class="flex-1">
              <p class="text-sm font-medium text-slate-800">${esc(q.q || q.question)}</p>
              ${control}
              <div class="explanation-slot mt-2"></div>
            </div>
          </div>
        </div>`;
    }).join('');

    $('#train-stage').innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 class="text-xl font-extrabold text-slate-900">${m.icon} ${esc(stage.title)}</h3>
            <p class="text-sm text-slate-500 mt-0.5">${esc(stage.focus)}</p>
          </div>
          <div class="flex gap-2">
            <button class="btn-primary !py-2 text-xs" onclick="IELTS_TRAINING.playScript()">🔊 Play audio</button>
            <button class="btn-secondary !py-2 text-xs" onclick="IELTS_TRAINING.showTranscript()">Show transcript</button>
          </div>
        </div>
        <div id="train-transcript" class="hidden mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600 leading-relaxed whitespace-pre-line"></div>
        <p class="text-xs text-slate-400 mt-4">🎧 Audio is read aloud by your browser (text-to-speech). Listen once, then answer — replay as often as you need.</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h4 class="font-bold text-slate-900 mb-1">🎯 Comprehension check</h4>
        <p class="text-sm text-slate-500 mb-5">Score ${Math.ceil(stage.questions.length / 2)}/4 or more to pass.</p>
        <div class="space-y-4">${questions}</div>
        <div class="flex gap-3 mt-6">
          <button class="btn-primary" onclick="IELTS_TRAINING.checkStage()">Check answers</button>
          <button class="btn-secondary" onclick="IELTS_TRAINING.retryStage()">Clear answers</button>
        </div>
        <div id="train-result" class="mt-5"></div>
      </div>`;

    $('#train-transcript').textContent = stage.script.join('\n\n');
  }

  /* ---------- speaking stage ---------- */
  function renderSpeakingStage(m, stage) {
    const prompts = stage.prompts.map((p, pi) => `
      <div class="q-card">
        <p class="font-semibold text-slate-800 mb-1">🎤 ${pi + 1}. ${esc(p.prompt)}</p>
        <p class="text-xs text-slate-500 mb-3">💡 ${esc(p.tip)}</p>
        <div class="flex flex-wrap items-center gap-3 mb-3">
          <button class="btn-secondary !py-1.5 !px-3 text-xs" onclick="IELTS_TRAINING.playPrompt(${pi})">🔊 Hear model answer</button>
          <span class="text-xs text-slate-400">Say your answer aloud, then rate your confidence:</span>
        </div>
        <div id="train-model-${pi}" class="hidden mb-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-900 leading-relaxed"></div>
        <div class="flex items-center gap-1" id="train-stars-${pi}">
          ${[1, 2, 3, 4, 5].map((s) => '<button type="button" class="star-btn text-xl leading-none transition ' + ((speakingRatings[pi] || 0) >= s ? 'text-amber-400' : 'text-slate-200 hover:text-amber-300') + '" onclick="IELTS_TRAINING.ratePrompt(' + pi + ', ' + s + ')">★</button>').join('')}
          <span class="text-xs text-slate-400 ml-2" id="train-rate-label-${pi}">${speakingRatings[pi] ? speakingRatings[pi] + '/5' : 'Not rated'}</span>
        </div>
      </div>`).join('');

    const allRated = stage.prompts.every((p, i) => speakingRatings[i]);
    $('#train-stage').innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 class="text-xl font-extrabold text-slate-900">${m.icon} ${esc(stage.title)}</h3>
            <p class="text-sm text-slate-500 mt-0.5">${esc(stage.focus)}</p>
          </div>
          <span class="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full">${stage.prompts.length} prompts to practise</span>
        </div>
        <div class="cue-card mt-5">
          <p class="text-sm font-semibold text-amber-800 mb-1">Topic: ${esc(stage.topic)}</p>
          <p class="text-sm text-slate-600">${esc(stage.tip)}</p>
        </div>
        <p class="text-xs text-slate-400 mt-3">🗣️ Answer each prompt aloud for about 30 seconds. Compare with the model answer, then rate how confidently you spoke.</p>
      </div>
      <div class="space-y-4">${prompts}</div>
      <div class="mt-6 flex gap-3">
        <button id="train-complete-btn" class="btn-primary" onclick="IELTS_TRAINING.completeSpeaking()" ${allRated ? '' : 'disabled'}>${allRated ? 'Complete stage →' : '⭐ Rate all prompts to continue'}</button>
        <button class="btn-secondary" onclick="IELTS_TRAINING.retryStage()">Reset ratings</button>
      </div>
      <div id="train-result" class="mt-5"></div>`;
  }

  /* ---------- handlers ---------- */
  function toggleCard(btn) {
    const panel = btn.parentElement.querySelector('div.hidden');
    if (panel) panel.classList.toggle('hidden');
  }

  function selectAnswer(qi, letter, btn) {
    answers[qi] = letter;
    btn.closest('[data-options]').querySelectorAll('.opt').forEach((o) => o.classList.remove('selected'));
    btn.classList.add('selected');
  }

  function saveFill(qi, value) {
    answers[qi] = value;
  }

  function retryStage() {
    answers = {};
    speakingRatings = {};
    renderModule();
  }

  function checkStage() {
    const m = getModule(active.moduleId);
    const stage = m.stages[active.stageIdx];
    const items = stage.quiz || stage.questions;
    let correct = 0;
    const rows = items.map((q, i) => {
      const ua = answers[i];
      const ok = checkAnswer(q, ua);
      if (ok) correct++;
      const shown = q.options ? q.answer + ' — ' + q.options[q.answer.charCodeAt(0) - 65] : (Array.isArray(q.answer) ? q.answer.join(' / ') : q.answer);
      return '<p class="text-sm"><span class="font-semibold text-slate-700">Q' + (i + 1) + ' ' + (ua ? (ok ? '✅' : '❌') : '—') + '</span> <span class="' + (ok ? 'answer-correct' : 'answer-wrong') + '">' + (ok ? 'Correct' : 'Incorrect') + '</span> <span class="text-slate-500">· Answer: <span class="font-semibold text-slate-700">' + esc(shown) + '</span></span>' + (ok ? '' : '<span class="text-slate-400"> · ' + esc(q.explanation) + '</span>') + '</p>';
    }).join('');
    const total = items.length;
    const pct = Math.round((correct / total) * 100);
    const pass = pct >= 60;
    $('#train-result').innerHTML = `
      <div class="result-banner ${pass ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}">
        <p class="text-lg font-extrabold text-slate-900">You scored ${correct} / ${total} (${pct}%)</p>
        <p class="text-sm text-slate-600 mt-1">${pass ? 'Nice work — you passed this stage!' : 'Almost there — review the answers and try again.'}</p>
        <div class="mt-3 space-y-1.5">${rows}</div>
        ${pass ? '<button class="btn-primary mt-4" onclick="IELTS_TRAINING.continueStage()">Next stage →</button>' : '<button class="btn-secondary mt-4" onclick="IELTS_TRAINING.retryStage()">Try again</button>'}
      </div>`;
    const anchor = $('#train-result');
    if (anchor) window.scrollTo({ top: anchor.offsetTop - 100, behavior: 'smooth' });
  }

  function continueStage() {
    const m = getModule(active.moduleId);
    awardAndAdvance(m, active.stageIdx);
  }

  /* ---------- listening & speaking audio ---------- */
  function playScript() {
    const m = getModule(active.moduleId);
    const stage = m.stages[active.stageIdx];
    window.toast && window.toast('🔊 Playing audio…');
    speakLines(stage.script, 0);
  }

  function showTranscript() {
    const el = $('#train-transcript');
    if (el) el.classList.toggle('hidden');
  }

  function playPrompt(pi) {
    const m = getModule(active.moduleId);
    const stage = m.stages[active.stageIdx];
    const model = $('#train-model-' + pi);
    if (model) {
      model.textContent = stage.prompts[pi].sample;
      model.classList.remove('hidden');
    }
    speak(stage.prompts[pi].sample);
  }

  function ratePrompt(pi, stars) {
    speakingRatings[pi] = stars;
    const row = $('#train-stars-' + pi);
    if (row) {
      row.querySelectorAll('.star-btn').forEach((b, i) => {
        b.classList.toggle('text-amber-400', i < stars);
        b.classList.toggle('text-slate-200', i >= stars);
      });
    }
    const label = $('#train-rate-label-' + pi);
    if (label) label.textContent = stars + '/5';
    const m = getModule(active.moduleId);
    const stage = m.stages[active.stageIdx];
    const allRated = stage.prompts.every((p, i) => speakingRatings[i]);
    const btnEl = $('#train-complete-btn');
    if (btnEl) {
      btnEl.disabled = !allRated;
      btnEl.textContent = allRated ? 'Complete stage →' : '⭐ Rate all prompts to continue';
    }
  }

  function completeSpeaking() {
    const m = getModule(active.moduleId);
    const stage = m.stages[active.stageIdx];
    const allRated = stage.prompts.every((p, i) => speakingRatings[i]);
    if (!allRated) {
      window.toast && window.toast('Rate all prompts to complete the stage');
      return;
    }
    $('#train-result').innerHTML = `
      <div class="result-banner bg-emerald-50 border border-emerald-200">
        <p class="text-lg font-extrabold text-slate-900">Great speaking practice! 🗣️</p>
        <p class="text-sm text-slate-600 mt-1">You answered all ${stage.prompts.length} prompts aloud. Repeat this stage daily for maximum fluency.</p>
        <button class="btn-primary mt-4" onclick="IELTS_TRAINING.continueStage()">Next stage →</button>
      </div>`;
    const anchor = $('#train-result');
    if (anchor) window.scrollTo({ top: anchor.offsetTop - 100, behavior: 'smooth' });
  }

  window.IELTS_TRAINING = {
    render, openModule, openStage, backToModules, goToStage,
    toggleCard, selectAnswer, saveFill, checkStage, continueStage, retryStage,
    playScript, showTranscript, playPrompt, ratePrompt, completeSpeaking
  };
})();
