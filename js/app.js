/* ============================================================
   IELTS Master — application logic
   ============================================================ */
(function () {
  'use strict';

  const { LISTENING_TEST, READING_TEST, WRITING_TASKS, SPEAKING_TEST, XP_REWARDS } = window.IELTS_DATA;

  /* ---------------- State ---------------- */
  const state = {
    currentSection: 'dashboard',
    listening: { section: 0, answers: {} },
    reading: { answers: {}, timer: { running: false, seconds: 0, interval: null } },
    writing: { task: 0, timer: { running: false, seconds: 0, interval: null } },
    speaking: { part: 1, prepTimer: { running: false, seconds: 0, interval: null }, speakTimer: { running: false, seconds: 0, interval: null } },
    audio: { playing: false, utter: null, paragraphIndex: 0 }
  };

  const STORAGE_KEY = 'ielts-master-progress';

  /* ---------------- Helpers ---------------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        listening: state.listening.answers,
        reading: state.reading.answers,
        writing: state.writing.task
      }));
    } catch (e) { /* ignore */ }
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.listening) state.listening.answers = data.listening;
      if (data.reading) state.reading.answers = data.reading;
      if (typeof data.writing === 'number') state.writing.task = data.writing;
    } catch (e) { /* ignore */ }
  }

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function toast(msg) {
    let el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 2600);
  }

  /* ---------------- Navigation ---------------- */
  window.showSection = function (name) {
    // Auth gate: dashboard is the only section available before sign-in
    if (name !== 'dashboard' && window.IELTS_AUTH && !window.IELTS_AUTH.getCurrentUser()) {
      window.IELTS_AUTH.showScreen();
      return;
    }

    state.currentSection = name;
    $$('.section-view').forEach((s) => s.classList.add('hidden'));
    $('#section-' + name).classList.remove('hidden');

    $$('.nav-btn, .nav-btn-mobile').forEach((b) => {
      b.classList.toggle('active', b.dataset.section === name);
    });
    $('#mobile-nav').classList.add('hidden');

    if (name === 'dashboard') renderDashboard();
    if (name === 'levels') window.IELTS_LEVELS.render();
    if (name === 'exam') window.IELTS_EXAM.render();
    if (name === 'training') window.IELTS_TRAINING.render();
    if (name === 'profile') window.IELTS_PROFILE.render();
    if (name === 'feed') window.IELTS_FEED.render();
    if (name === 'listening') renderListening();
    if (name === 'reading') renderReading();
    if (name === 'writing') renderWriting();
    if (name === 'speaking') renderSpeaking();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.toggleMobileMenu = function () {
    $('#mobile-nav').classList.toggle('hidden');
  };

  /* ---------------- Dashboard ---------------- */
  function renderDashboard() {
    const user = window.IELTS_AUTH ? window.IELTS_AUTH.getCurrentUser() : null;
    const level = user ? window.IELTS_AUTH.getLevel(user.xp) : null;
    const nextLevel = user ? window.IELTS_AUTH.getNextLevel(user.xp) : null;

    // Auth banner: sign-in prompt or user progress summary
    $('#dashboard-auth-banner').innerHTML = user
      ? `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center text-lg font-extrabold">${esc(user.username.charAt(0).toUpperCase())}</div>
            <div>
              <p class="font-bold text-slate-900">Welcome back, ${esc(user.username)}</p>
              <p class="text-xs text-slate-500">${level.icon} ${level.name} level · ${user.xp} XP ${nextLevel ? '· ' + (nextLevel.minXp - user.xp) + ' XP to ' + nextLevel.name : ''}</p>
              <div class="mt-2 h-1.5 w-40 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-brand-500 rounded-full" style="width: ${user.xp >= 700 ? 100 : Math.max(3, Math.round((user.xp / 700) * 100))}%"></div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <button class="btn-secondary text-sm" onclick="showSection('training')">🎓 Training</button>
            <button class="btn-secondary text-sm" onclick="showSection('levels')">📈 My levels</button>
            <button class="btn-primary text-sm" onclick="showSection('exam')">📅 Weekly exam</button>
            <button class="btn-secondary text-sm" onclick="showSection('profile')">👤 Profile</button>
          </div>
        </div>`
      : `
        <div class="bg-gradient-to-r from-brand-600 to-indigo-500 rounded-2xl shadow-md p-6 mb-6 text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-lg font-extrabold">Sign in to start your learning journey 🚀</p>
            <p class="text-sm text-brand-100 mt-0.5">Create a free account to earn XP, level up, and track your weekly exam scores.</p>
          </div>
          <button onclick="IELTS_AUTH.showScreen()" class="bg-white text-brand-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-50 transition">Sign in / Register</button>
        </div>`;

    const stats = [
      { icon: '🎧', label: 'Listening', value: countListeningScore() + '/40', sub: '40 questions' },
      { icon: '📖', label: 'Reading', value: countReadingScore() + '/40', sub: '40 questions' },
      { icon: '✍️', label: 'Writing', value: '2 tasks', sub: '60 min timer' },
      { icon: '🗣️', label: 'Speaking', value: '3 parts', sub: 'Full test' }
    ];
    $('#dashboard-stats').innerHTML = stats.map((s) => `
      <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div class="text-2xl mb-1">${s.icon}</div>
        <div class="text-xl font-extrabold text-slate-900">${s.value}</div>
        <div class="text-xs text-slate-500 font-medium">${s.label} · ${s.sub}</div>
      </div>`).join('');
  }

  function countListeningScore() {
    let score = 0;
    LISTENING_TEST.forEach((section) => {
      section.questions.forEach((q) => {
        if (state.listening.answers[q.id] && checkAnswer(q, state.listening.answers[q.id])) score++;
      });
    });
    return score;
  }

  function countReadingScore() {
    let score = 0;
    READING_TEST.forEach((passage) => {
      passage.questions.forEach((q) => {
        if (state.reading.answers[q.id] && checkAnswer(q, state.reading.answers[q.id])) score++;
      });
    });
    return score;
  }

  function checkAnswer(q, userAnswer) {
    if (!userAnswer) return false;
    if (q.type === 'fill') {
      const ua = String(userAnswer).trim().toLowerCase().replace(/\s+/g, ' ');
      return q.answer.some((a) => String(a).trim().toLowerCase().replace(/\s+/g, ' ') === ua);
    }
    return String(userAnswer).toLowerCase() === String(q.answer).toLowerCase();
  }

  /* ---------------- Listening ---------------- */
  let audioUnavailable = false;

  /* --- level gating helpers --- */
  function unlocked(skill, index) {
    return window.IELTS_AUTH && window.IELTS_AUTH.isUnlocked(skill, index);
  }

  function lockedPanel(skill, index) {
    const names = { listening: 'Listening', reading: 'Reading', writing: 'Writing', speaking: 'Speaking' };
    return `
      <div class="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
        <p class="text-4xl mb-3">🔒</p>
        <p class="font-bold text-slate-800">This ${names[skill]} content is locked</p>
        <p class="text-sm text-slate-500 mt-1 max-w-md mx-auto">Reach the next level by completing activities and weekly exams to unlock ${names[skill]} section ${index + 1}.</p>
        <button class="btn-primary mt-5" onclick="showSection('levels')">📈 View learning path</button>
      </div>`;
  }

  function renderListening() {
    renderListeningSectionTabs();
    renderListeningQuestions();
  }

  function renderListeningSectionTabs() {
    $('#listening-sections').innerHTML = LISTENING_TEST.map((sec, i) => {
      const isLocked = !unlocked('listening', i);
      return `
      <button class="tab-pill ${i === state.listening.section ? 'active' : ''} ${isLocked ? 'opacity-50' : ''}" onclick="selectListeningSection(${i})">
        ${sec.title.split('·')[0].trim()}${isLocked ? ' 🔒' : ''}
      </button>`;
    }).join('');
  }

  window.selectListeningSection = function (i) {
    if (!unlocked('listening', i)) {
      toast('🔒 Earn more XP to unlock this section');
      return;
    }
    state.listening.section = i;
    stopAudio();
    renderListeningSectionTabs();
    renderListeningQuestions();
    $('#now-playing').textContent = LISTENING_TEST[i].title;
    $('#audio-status').textContent = 'Ready to play';
    setProgress(0);
    toast('Section selected — press play to hear the audio');
  };

  function renderListeningQuestions() {
    const section = LISTENING_TEST[state.listening.section];
    $('#now-playing').textContent = section.title;

    if (!unlocked('listening', state.listening.section)) {
      $('#listening-content').innerHTML = lockedPanel('listening', state.listening.section);
      return;
    }

    const qHtml = section.questions.map((q) => {
      const saved = state.listening.answers[q.id];
      return questionHtml(q, q.id, saved, q.id.split('-')[1]);
    }).join('');

    $('#listening-content').innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-slate-900 text-lg">Questions 1–${section.questions.length} <span class="text-sm font-normal text-slate-500">(${section.subtitle})</span></h3>
        <button class="btn-primary" onclick="submitListening()">Check answers</button>
      </div>
      <div id="listening-questions" class="space-y-4">${qHtml}</div>
      <div id="listening-result" class="mt-6"></div>`;
  }

  window.submitListening = function () {
    const section = LISTENING_TEST[state.listening.section];
    let correct = 0;
    const total = section.questions.length;
    const resultHtml = [];

    section.questions.forEach((q, qi) => {
      const userAnswer = state.listening.answers[q.id];
      const isCorrect = checkAnswer(q, userAnswer);
      if (isCorrect) correct++;
      const status = userAnswer ? (isCorrect ? '✅' : '❌') : '—';
      resultHtml.push(`<p class="text-sm"><span class="font-semibold text-slate-700">Q${qi + 1} ${status}</span> ${isCorrect ? '<span class="answer-correct">Correct</span>' : '<span class="answer-wrong">Incorrect</span>'} <span class="text-slate-500">— ${esc(q.explanation)}</span></p>`);
    });

    const pct = Math.round((correct / total) * 100);
    const msg = pct >= 80 ? 'Excellent! Band 8+ territory.' : pct >= 60 ? 'Good effort — review the explanations.' : pct >= 40 ? 'Keep practising — focus on the audio details.' : 'Don\'t worry — replay the audio and try again.';

    $('#listening-result').innerHTML = `
      <div class="result-banner ${pct >= 60 ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}">
        <p class="text-lg font-extrabold text-slate-900">You scored ${correct} out of ${total} (${pct}%)</p>
        <p class="text-sm text-slate-600 mt-1">${msg}</p>
        <div class="mt-3 space-y-1.5">${resultHtml.join('')}</div>
        <button class="btn-secondary mt-4" onclick="resetListening()">Try again</button>
      </div>`;

    // Award XP once per section for checking answers
    if (window.IELTS_AUTH && window.IELTS_AUTH.completeClaim('listening-' + section.id)) {
      window.IELTS_AUTH.addXp(XP_REWARDS.listening);
      window.IELTS_AUTH.addActivity('listening', 'Completed ' + section.title.split('·')[0].trim(), XP_REWARDS.listening);
      toast('+' + XP_REWARDS.listening + ' XP for completing ' + section.title.split('·')[0].trim() + '!');
    }

    saveProgress();
  };

  /* --- Audio playback (Web Speech API) --- */
  function setProgress(pct) {
    $('#progress-bar').style.width = pct + '%';
  }

  function getVoices() {
    return window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  }

  function pickVoice() {
    const voices = getVoices();
    return voices.find((v) => /en[-_]GB/i.test(v.lang)) || voices.find((v) => /^en/i.test(v.lang)) || null;
  }

  window.togglePlayback = function () {
    if (audioUnavailable || !('speechSynthesis' in window)) {
      audioUnavailable = true;
      toast('Text-to-speech is not available in this browser — use the transcript instead.');
      return;
    }
    if (state.audio.playing) { stopAudio(); return; }
    playSection(state.listening.section);
  };

  function playSection(sectionIndex) {
    const section = LISTENING_TEST[sectionIndex];
    if (state.audio.utter) speechSynthesis.cancel();

    state.audio.playing = true;
    updatePlayButton(true);
    $('#audio-status').textContent = 'Playing…';

    let i = 0;
    const paragraphs = section.script;
    const total = paragraphs.length;

    function speakNext() {
      if (i >= total) {
        stopAudio();
        $('#audio-status').textContent = 'Finished';
        setProgress(100);
        toast('Audio finished — answer the questions below');
        return;
      }
      const utter = new SpeechSynthesisUtterance(paragraphs[i]);
      const voice = pickVoice();
      if (voice) utter.voice = voice;
      utter.rate = 1.0;
      utter.onend = () => { i++; setProgress((i / total) * 100); speakNext(); };
      utter.onerror = () => { i++; speakNext(); };
      state.audio.utter = utter;
      speechSynthesis.speak(utter);
    }
    speakNext();
  }

  function stopAudio() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    state.audio.playing = false;
    state.audio.utter = null;
    updatePlayButton(false);
    $('#audio-status').textContent = 'Paused';
  }

  function updatePlayButton(playing) {
    $('#play-icon').classList.toggle('hidden', playing);
    $('#pause-icon').classList.toggle('hidden', !playing);
  }

  window.showTranscript = function () {
    const section = LISTENING_TEST[state.listening.section];
    $('#transcript-title').textContent = section.title;
    $('#transcript-body').textContent = section.script.join('\n\n');
    const modal = $('#transcript-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  window.closeTranscript = function () {
    const modal = $('#transcript-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  window.resetListening = function () {
    state.listening.answers = {};
    stopAudio();
    setProgress(0);
    saveProgress();
    renderListeningQuestions();
    $('#audio-status').textContent = 'Ready to play';
    toast('Listening test reset');
  };

  /* ---------------- Reading ---------------- */
  function renderReading() {
    $('#reading-content').innerHTML = READING_TEST.map((passage, pi) => {
      if (!unlocked('reading', pi)) {
        return `
          <div class="mb-8">
            <div class="bg-slate-900 text-white px-6 py-4 rounded-t-2xl">
              <h3 class="font-bold">${esc(passage.title)} <span class="text-xs font-normal text-slate-400">🔒 locked</span></h3>
            </div>
            <div class="rounded-b-2xl overflow-hidden">${lockedPanel('reading', pi)}</div>
          </div>`;
      }

      const qHtml = passage.questions.map((q) => {
        const saved = state.reading.answers[q.id];
        return questionHtml(q, q.id, saved, q.id.split('-')[1]);
      }).join('');

      return `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div class="bg-slate-900 text-white px-6 py-4">
            <h3 class="font-bold">${esc(passage.title)}</h3>
            <p class="text-xs text-slate-300 mt-0.5">${esc(passage.intro)}</p>
          </div>
          <div class="grid lg:grid-cols-2">
            <div class="p-6 lg:border-r border-slate-100">
              <div class="passage-text text-sm text-slate-700">
                ${passage.paragraphs.map((p) => '<p>' + esc(p) + '</p>').join('')}
              </div>
            </div>
            <div class="p-6 bg-slate-50/50">
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold uppercase tracking-wide text-slate-400">Questions</span>
                <button class="btn-primary !py-2 !px-4 text-xs" onclick="submitReading(${pi})">Check passage</button>
              </div>
              <div class="space-y-4">${qHtml}</div>
              <div id="reading-result-${passage.id}" class="mt-6"></div>
            </div>
          </div>
        </div>`;
    }).join('');

    $('#reading-timer').textContent = formatTime(state.reading.timer.seconds);
  }

  window.submitReading = function (passageIndex) {
    const passage = READING_TEST[passageIndex];
    let correct = 0;
    const total = passage.questions.length;

    passage.questions.forEach((q) => {
      if (checkAnswer(q, state.reading.answers[q.id])) correct++;
    });

    const pct = Math.round((correct / total) * 100);
    const msg = pct >= 80 ? 'Excellent! Band 8+ territory.' : pct >= 60 ? 'Good effort — review the explanations.' : 'Keep practising — scan the passage for key words.';

    $('#reading-result-' + passage.id).innerHTML = `
      <div class="result-banner ${pct >= 60 ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}">
        <p class="text-lg font-extrabold text-slate-900">You scored ${correct} out of ${total} (${pct}%)</p>
        <p class="text-sm text-slate-600 mt-1">${msg}</p>
      </div>`;

    // Reveal explanations
    passage.questions.forEach((q) => {
      const el = document.querySelector(`[data-qkey="${q.id}"] .explanation-slot`);
      if (el) el.innerHTML = `<p class="text-xs text-slate-500 mt-1.5">💡 ${esc(q.explanation)}</p>`;
    });

    // Award XP once per passage
    if (window.IELTS_AUTH && window.IELTS_AUTH.completeClaim('reading-' + passage.id)) {
      window.IELTS_AUTH.addXp(XP_REWARDS.reading);
      window.IELTS_AUTH.addActivity('reading', 'Completed ' + passage.title.split('·')[0].trim(), XP_REWARDS.reading);
      toast('+' + XP_REWARDS.reading + ' XP for completing ' + passage.title.split('·')[0].trim() + '!');
    }

    saveProgress();
  };

  window.resetReading = function () {
    state.reading.answers = {};
    stopReadingTimer();
    state.reading.timer.seconds = 0;
    $('#reading-timer').textContent = '00:00';
    $('#reading-timer-btn').textContent = 'Start timer';
    saveProgress();
    renderReading();
    toast('Reading test reset');
  };

  window.toggleReadingTimer = function () {
    const t = state.reading.timer;
    if (t.running) { stopReadingTimer(); return; }
    t.running = true;
    $('#reading-timer-btn').textContent = 'Pause';
    t.interval = setInterval(() => {
      t.seconds++;
      $('#reading-timer').textContent = formatTime(t.seconds);
      if (t.seconds >= 3600) $('#reading-timer').classList.add('timer-late');
    }, 1000);
  };

  function stopReadingTimer() {
    const t = state.reading.timer;
    t.running = false;
    clearInterval(t.interval);
    $('#reading-timer-btn').textContent = 'Start timer';
  }

  /* ---------------- Writing ---------------- */
  function renderWriting() {
    renderWritingTabs();
    renderWritingTask();
  }

  function renderWritingTabs() {
    $('#writing-tabs').innerHTML = WRITING_TASKS.map((task, i) => {
      const isLocked = !unlocked('writing', i);
      return `
      <button class="tab-pill ${i === state.writing.task ? 'active' : ''} ${isLocked ? 'opacity-50' : ''}" onclick="selectWritingTask(${i})">${task.name}${isLocked ? ' 🔒' : ''}</button>`;
    }).join('');
  }

  window.selectWritingTask = function (i) {
    if (!unlocked('writing', i)) {
      toast('🔒 Earn more XP to unlock ' + WRITING_TASKS[i].name);
      return;
    }
    state.writing.task = i;
    saveProgress();
    renderWritingTabs();
    renderWritingTask();
  };

  function renderWritingTask() {
    const task = WRITING_TASKS[state.writing.task];
    const draft = localStorage.getItem('ielts-draft-' + task.id) || '';

    if (!unlocked('writing', state.writing.task)) {
      $('#writing-content').innerHTML = lockedPanel('writing', state.writing.task);
      return;
    }

    let chartHtml = '';
    if (task.chart) {
      const max = Math.max(...task.chart.rows.flatMap((r) => r.values));
      chartHtml = `
        <div class="bg-white border border-slate-200 rounded-xl p-5 mt-4">
          <p class="text-sm font-semibold text-slate-700 mb-1">${esc(task.chart.type)} — ${esc(task.chart.title)}</p>
          <div class="flex items-end gap-3 mt-4 h-44">
            ${task.chart.rows.map((row) => `
              <div class="flex-1 flex flex-col items-center gap-1">
                <div class="flex flex-col justify-end gap-0.5 w-full h-32">
                  ${row.values.map((v, vi) => `
                    <div class="w-full rounded-sm ${vi === 0 ? 'bg-brand-500' : vi === 1 ? 'bg-sky-500' : 'bg-amber-500'}"
                         style="height: ${(v / max) * 100}%" title="${task.chart.series[vi]}: ${v}k"></div>`).join('')}
                </div>
                <span class="text-[10px] text-slate-500">${row.label}</span>
              </div>`).join('')}
          </div>
          <div class="flex flex-wrap gap-4 mt-4 text-xs text-slate-500">
            ${task.chart.series.map((s, vi) => `<span class="inline-flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm ${vi === 0 ? 'bg-brand-500' : vi === 1 ? 'bg-sky-500' : 'bg-amber-500'}"></span>${esc(s)}</span>`).join('')}
          </div>
          <p class="text-xs text-slate-400 mt-3 italic">Values shown in thousands of students.</p>
        </div>`;
    }

    $('#writing-content').innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 class="font-bold text-slate-900 text-lg">${esc(task.name)} — ${esc(task.label)}</h3>
            <p class="text-xs text-slate-500 mt-1">Recommended time: ${task.minutes} minutes · Target: at least ${task.wordLimit} words</p>
          </div>
          <span id="writing-wordcount" class="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">0 words</span>
        </div>

        <div class="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <p class="text-sm font-semibold text-slate-700 mb-2">📝 Writing prompt</p>
          <p class="text-slate-700 leading-relaxed">${esc(task.prompt)}</p>
          ${chartHtml}
        </div>

        <textarea id="writing-textarea" class="writing-area mt-5" placeholder="Write your answer here…">${esc(draft)}</textarea>

        <div class="flex flex-wrap gap-3 mt-4">
          <button class="btn-primary" onclick="checkWriting()">Check word count</button>
          <button class="btn-secondary" onclick="toggleSampleAnswer()">Show model answer</button>
          <button class="btn-secondary" onclick="clearWritingDraft()">Clear draft</button>
        </div>

        <div id="writing-feedback" class="mt-4"></div>
        <div id="sample-answer" class="hidden mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <p class="font-bold text-emerald-800 text-sm mb-2">✅ Model answer</p>
          <p class="text-sm text-emerald-900 leading-relaxed whitespace-pre-line">${esc(task.sampleAnswer)}</p>
        </div>
      </div>`;

    const ta = $('#writing-textarea');
    ta.addEventListener('input', () => {
      const count = countWords(ta.value);
      $('#writing-wordcount').textContent = count + ' words';
      localStorage.setItem('ielts-draft-' + task.id, ta.value);
    });
    $('#writing-wordcount').textContent = countWords(draft) + ' words';
  }

  function countWords(text) {
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length;
  }

  window.checkWriting = function () {
    const task = WRITING_TASKS[state.writing.task];
    const text = $('#writing-textarea').value;
    const count = countWords(text);
    const feedback = [];

    if (count === 0) feedback.push('You haven\'t written anything yet.');
    if (count < task.wordLimit * 0.8) feedback.push(`Your answer is under the recommended length — aim for at least ${task.wordLimit} words.`);
    if (count >= task.wordLimit * 0.8 && count <= task.wordLimit * 1.2) feedback.push('Your length looks appropriate for this task.');
    if (count > task.wordLimit * 1.2) feedback.push('Your answer may be too long — stay focused and avoid repetition.');

    const grade = count >= task.wordLimit ? '✔ Good length' : '✘ Below target';
    $('#writing-feedback').innerHTML = `
      <div class="result-banner ${count >= task.wordLimit ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}">
        <p class="font-extrabold text-slate-900">Word count: <span class="${count >= task.wordLimit ? 'text-emerald-600' : 'text-amber-600'}">${count}</span> / ${task.wordLimit}+ · ${grade}</p>
        <ul class="text-sm text-slate-600 mt-2 space-y-1">
          ${feedback.map((f) => '<li>• ' + esc(f) + '</li>').join('')}
        </ul>
        <p class="text-xs text-slate-400 mt-3">Tip: for Task 1 describe trends and comparisons; for Task 2 give a clear position with developed arguments.</p>
      </div>`;

    // Award XP once per task for checking the word count
    if (window.IELTS_AUTH && window.IELTS_AUTH.completeClaim('writing-' + task.id)) {
      window.IELTS_AUTH.addXp(XP_REWARDS.writing);
      window.IELTS_AUTH.addActivity('writing', 'Checked word count for ' + task.name, XP_REWARDS.writing);
      toast('+' + XP_REWARDS.writing + ' XP for ' + task.name + '!');
    }
  };

  window.toggleSampleAnswer = function () {
    $('#sample-answer').classList.toggle('hidden');
  };

  window.clearWritingDraft = function () {
    const task = WRITING_TASKS[state.writing.task];
    localStorage.removeItem('ielts-draft-' + task.id);
    $('#writing-textarea').value = '';
    $('#writing-wordcount').textContent = '0 words';
    $('#writing-feedback').innerHTML = '';
    toast('Draft cleared');
  };

  window.toggleWritingTimer = function () {
    const t = state.writing.timer;
    if (t.running) { stopWritingTimer(); return; }
    t.running = true;
    $('#writing-timer-btn').textContent = 'Pause';
    t.interval = setInterval(() => {
      t.seconds++;
      $('#writing-timer').textContent = formatTime(t.seconds);
      if (t.seconds >= 3600) $('#writing-timer').classList.add('timer-late');
    }, 1000);
  };

  function stopWritingTimer() {
    const t = state.writing.timer;
    t.running = false;
    clearInterval(t.interval);
    $('#writing-timer-btn').textContent = 'Start timer';
  }

  /* ---------------- Speaking ---------------- */
  function renderSpeaking() {
    renderSpeakingTabs();
    renderSpeakingPart();
  }

  function renderSpeakingTabs() {
    $('#speaking-tabs').innerHTML = [1, 2, 3].map((p) => {
      const isLocked = !unlocked('speaking', p - 1);
      return `
      <button class="tab-pill ${state.speaking.part === p ? 'active' : ''} ${isLocked ? 'opacity-50' : ''}" onclick="selectSpeakingPart(${p})">Part ${p}${isLocked ? ' 🔒' : ''}</button>`;
    }).join('');
  }

  window.selectSpeakingPart = function (p) {
    if (!unlocked('speaking', p - 1)) {
      toast('🔒 Earn more XP to unlock Part ' + p);
      return;
    }
    stopSpeakingTimers();
    state.speaking.part = p;
    renderSpeakingTabs();
    renderSpeakingPart();
  };

  function stopSpeakingTimers() {
    const s = state.speaking;
    [s.prepTimer, s.speakTimer].forEach((t) => {
      t.running = false;
      clearInterval(t.interval);
      t.seconds = 0;
    });
  }

  function renderSpeakingPart() {
    const part = state.speaking.part;
    const el = $('#speaking-content');

    if (!unlocked('speaking', part - 1)) {
      el.innerHTML = lockedPanel('speaking', part - 1);
      return;
    }

    // Award XP once per part for practising
    if (window.IELTS_AUTH && window.IELTS_AUTH.completeClaim('speaking-' + part)) {
      window.IELTS_AUTH.addXp(XP_REWARDS.speaking);
      window.IELTS_AUTH.addActivity('speaking', 'Practised Speaking Part ' + part, XP_REWARDS.speaking);
      toast('+' + XP_REWARDS.speaking + ' XP for practising Speaking Part ' + part + '!');
    }

    if (part === 1) {
      el.innerHTML = `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 class="font-bold text-slate-900 text-lg mb-1">Part 1 · Interview</h3>
          <p class="text-sm text-slate-500 mb-6">The examiner asks you questions about familiar topics. Read each question, pause the audio, and answer aloud for about 30–40 seconds. Then compare with the model answer.</p>
          <div class="space-y-5">
            ${SPEAKING_TEST.part1.map((q) => `
              <div class="q-card">
                <p class="font-semibold text-slate-800 mb-3">🎤 ${esc(q.question)}</p>
                <button class="btn-secondary !py-2 !px-3 text-xs" onclick="toggleSpeakingAnswer(this)">Show model answer</button>
                <div class="hidden mt-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-900 leading-relaxed">${esc(q.sampleAnswer)}</div>
              </div>`).join('')}
          </div>
        </div>`;
    } else if (part === 2) {
      const p2 = SPEAKING_TEST.part2;
      el.innerHTML = `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 class="font-bold text-slate-900 text-lg">Part 2 · Individual long turn</h3>
              <p class="text-sm text-slate-500 mt-1">${esc(p2.intro)}</p>
            </div>
            <div class="flex items-center gap-2">
              <div id="prep-timer" class="font-mono text-sm font-bold text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">01:00</div>
              <button class="btn-primary !py-2 text-xs" onclick="startPrepTimer()">Start 1-min prep</button>
            </div>
          </div>

          <div class="cue-card">
            <p class="text-sm font-semibold text-amber-800 mb-3">Cue card — ${esc(p2.cueCard.topic)}</p>
            <ul class="cue-bullet text-sm text-slate-700 space-y-1.5">
              ${p2.cueCard.bullets.map((b) => '<li>' + esc(b) + '</li>').join('')}
            </ul>
          </div>

          <div class="mt-6 flex items-center gap-3">
            <div id="speak-timer" class="font-mono text-sm font-bold text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">02:00</div>
            <button class="btn-primary !py-2 text-xs" onclick="startSpeakTimer()">Start 2-min talk</button>
            <button class="btn-secondary !py-2 text-xs" onclick="toggleSpeakingAnswer(this)">Show model answer</button>
          </div>
          <div id="speaking-p2-answer" class="hidden mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <p class="font-bold text-emerald-800 text-sm mb-2">✅ Model answer</p>
            <p class="text-sm text-emerald-900 leading-relaxed whitespace-pre-line">${esc(p2.sampleAnswer)}</p>
          </div>
          <p class="text-xs text-slate-400 mt-4">Tip: structure your talk — introduction, main points, personal example, conclusion. Keep talking until the timer ends.</p>
        </div>`;
    } else {
      el.innerHTML = `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 class="font-bold text-slate-900 text-lg mb-1">Part 3 · Discussion</h3>
          <p class="text-sm text-slate-500 mb-6">The examiner asks more abstract questions connected to your Part 2 topic. Answer each in about one minute, giving reasons and examples.</p>
          <div class="space-y-5">
            ${SPEAKING_TEST.part3.map((q) => `
              <div class="q-card">
                <p class="font-semibold text-slate-800 mb-3">🎤 ${esc(q.question)}</p>
                <button class="btn-secondary !py-2 !px-3 text-xs" onclick="toggleSpeakingAnswer(this)">Show model answer</button>
                <div class="hidden mt-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-900 leading-relaxed">${esc(q.sampleAnswer)}</div>
              </div>`).join('')}
          </div>
        </div>`;
    }
  }

  window.toggleSpeakingAnswer = function (btn) {
    const panel = btn.nextElementSibling;
    if (!panel) {
      // Part 2 special case — the model answer lives elsewhere
      $('#speaking-p2-answer').classList.toggle('hidden');
      return;
    }
    panel.classList.toggle('hidden');
  };

  window.startPrepTimer = function () {
    const t = state.speaking.prepTimer;
    clearInterval(t.interval);
    t.seconds = 60;
    $('#prep-timer').textContent = '01:00';
    $('#prep-timer').classList.remove('timer-late');
    t.running = true;
    t.interval = setInterval(() => {
      t.seconds--;
      $('#prep-timer').textContent = formatTime(Math.max(0, t.seconds));
      if (t.seconds <= 10) $('#prep-timer').classList.add('timer-late');
      if (t.seconds <= 0) {
        clearInterval(t.interval);
        t.running = false;
        toast('Prep time finished — start speaking!');
      }
    }, 1000);
  };

  window.startSpeakTimer = function () {
    const t = state.speaking.speakTimer;
    clearInterval(t.interval);
    t.seconds = 120;
    $('#speak-timer').textContent = '02:00';
    $('#speak-timer').classList.remove('timer-late');
    t.running = true;
    t.interval = setInterval(() => {
      t.seconds--;
      $('#speak-timer').textContent = formatTime(Math.max(0, t.seconds));
      if (t.seconds <= 30) $('#speak-timer').classList.add('timer-late');
      if (t.seconds <= 0) {
        clearInterval(t.interval);
        t.running = false;
        toast('Time\'s up — well done! Compare with the model answer.');
      }
    }, 1000);
  };

  /* ---------------- Shared question renderer ---------------- */
  function questionHtml(q, key, saved, num) {

    let control = '';
    if (q.type === 'mcq') {
      control = `
        <div class="grid gap-2 mt-3" data-options>
          ${q.options.map((opt, oi) => {
            const letter = String.fromCharCode(65 + oi);
            const isSelected = saved === letter;
            return `<button type="button" class="opt ${isSelected ? 'selected' : ''}" data-letter="${letter}" onclick="selectOption('${key}', '${letter}', this)">
              <span class="inline-block w-5 text-slate-400 font-semibold">${letter}</span> ${esc(opt)}
            </button>`;
          }).join('')}
        </div>`;
    } else if (q.type === 'tfng') {
      control = `
        <div class="flex flex-wrap gap-2 mt-3" data-options>
          ${q.options.map((opt) => {
            const isSelected = saved === opt;
            return `<button type="button" class="opt !w-auto !px-4 ${isSelected ? 'selected' : ''}" data-opt="${esc(opt)}" onclick="selectTfng('${key}', '${esc(opt)}', this)">${esc(opt)}</button>`;
          }).join('')}
        </div>`;
    } else if (q.type === 'fill') {
      control = `
        <input type="text" class="fill-input mt-3" data-key="${key}" placeholder="Type your answer…" value="${esc(saved || '')}" oninput="saveFill('${key}', this.value)" />`;
    }

    return `
      <div class="q-card" data-qkey="${key}">
        <div class="flex items-start gap-3">
          <span class="q-number shrink-0">${num}</span>
          <div class="flex-1">
            <p class="text-sm font-medium text-slate-800">${esc(q.question)}</p>
            ${control}
            <div class="explanation-slot"></div>
          </div>
        </div>
      </div>`;
  }

  /* --- Question answer handlers --- */
  window.selectOption = function (key, letter, btn) {
    state[getSectionFromKey(key)].answers[key] = letter;
    btn.closest('[data-options]').querySelectorAll('.opt').forEach((o) => o.classList.remove('selected'));
    btn.classList.add('selected');
    saveProgress();
  };

  window.selectTfng = function (key, opt, btn) {
    state[getSectionFromKey(key)].answers[key] = opt;
    btn.closest('[data-options]').querySelectorAll('.opt').forEach((o) => o.classList.remove('selected'));
    btn.classList.add('selected');
    saveProgress();
  };

  window.saveFill = function (key, value) {
    state[getSectionFromKey(key)].answers[key] = value;
    saveProgress();
  };

  function getSectionFromKey(key) {
    return key.startsWith('L') ? 'listening' : 'reading';
  }

  /* ---------------- Shared exports ---------------- */
  window.toast = toast;
  window.renderDashboard = renderDashboard;
  window.countListeningScore = countListeningScore;
  window.countReadingScore = countReadingScore;

  /* ---------------- Init ---------------- */
  loadProgress();
  renderDashboard();

  // Restore auth session (shows sign-in screen if no session)
  if (window.IELTS_AUTH) window.IELTS_AUTH.init();

  // Expose state for debugging
  window.__IELTS_STATE = state;
})();
