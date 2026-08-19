/* ============================================================
   IELTS Master — 4-Week Study Plan (study-plan-centric refactor)
   The main dashboard entry point. Every daily task maps to an
   existing module: Listening, Reading, Writing, Speaking, Training,
   Catlango, Readings, Translator, or Weekly Exam.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.from(document.querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };

  var STORAGE_KEY = 'ielts-study-plan-progress';

  /* ===================== 4-WEEK PLAN DATA ===================== */
  var WEEKS = [
    {
      id: 'w1', name: 'Week 1', subtitle: 'Foundation Building',
      days: [
        { id: 'd1',  day: 1,  title: 'Listening Fundamentals',  skill: 'listening',  icon: '🎧', desc: 'Learn the format and strategies for Listening Section 1.', section: 'listening',  action: 'listening' },
        { id: 'd2',  day: 2,  title: 'Reading Basics',           skill: 'reading',   icon: '📖', desc: 'Practice scanning and skimming with a graded reading passage.', section: 'readings',   action: 'readings' },
        { id: 'd3',  day: 3,  title: 'Vocabulary: Everyday',     skill: 'vocab',     icon: '📚', desc: 'Learn everyday IELTS vocabulary with Catlango word packs.', section: 'catlango',   action: 'catlango' },
        { id: 'd4',  day: 4,  title: 'Writing Task 1 Basics',    skill: 'writing',   icon: '✍️', desc: 'Learn how to describe charts and graphs in Task 1.', section: 'writing',     action: 'writing' },
        { id: 'd5',  day: 5,  title: 'Speaking Part 1',          skill: 'speaking',  icon: '🗣️', desc: 'Practice introducing yourself and answering personal questions.', section: 'speaking',   action: 'speaking' },
        { id: 'd6',  day: 6,  title: 'Listening Practice',       skill: 'listening',  icon: '🎧', desc: 'Listen to conversations and fill in the gaps.', section: 'listening',   action: 'listening' },
        { id: 'd7',  day: 7,  title: 'Weekly Review + Exam',     skill: 'exam',      icon: '📅', desc: 'Review the week and take the Weekly Exam.', section: 'exam',        action: 'exam' }
      ]
    },
    {
      id: 'w2', name: 'Week 2', subtitle: 'Skill Development',
      days: [
        { id: 'd8',  day: 8,  title: 'Listening Section 2',      skill: 'listening',  icon: '🎧', desc: 'Master monologue comprehension and note-taking.', section: 'listening',  action: 'listening' },
        { id: 'd9',  day: 9,  title: 'Reading Passages',          skill: 'reading',   icon: '📖', desc: 'Work through an academic reading passage with questions.', section: 'readings',   action: 'readings' },
        { id: 'd10', day: 10, title: 'Vocabulary: Education',     skill: 'vocab',     icon: '📚', desc: 'Study academic and education-related vocabulary.', section: 'catlango',   action: 'catlango' },
        { id: 'd11', day: 11, title: 'Writing Task 2',            skill: 'writing',   icon: '✍️', desc: 'Plan and write an opinion essay for Task 2.', section: 'writing',     action: 'writing' },
        { id: 'd12', day: 12, title: 'Speaking Part 2',           skill: 'speaking',  icon: '🗣️', desc: 'Practice the long turn with a cue card.', section: 'speaking',   action: 'speaking' },
        { id: 'd13', day: 13, title: 'Training: Vocabulary',      skill: 'training',  icon: '🎓', desc: 'Deep-dive vocabulary training with flashcards and quizzes.', section: 'training',   action: 'training' },
        { id: 'd14', day: 14, title: 'Weekly Review + Exam',      skill: 'exam',      icon: '📅', desc: 'Consolidate learning and test yourself.', section: 'exam',        action: 'exam' }
      ]
    },
    {
      id: 'w3', name: 'Week 3', subtitle: 'Advanced Practice',
      days: [
        { id: 'd15', day: 15, title: 'Listening Section 3',      skill: 'listening',  icon: '🎧', desc: 'Follow academic discussions and identify key details.', section: 'listening',  action: 'listening' },
        { id: 'd16', day: 16, title: 'Reading Comprehension',     skill: 'reading',   icon: '📖', desc: 'Tackle True/False/Not Given questions on a complex passage.', section: 'readings',   action: 'readings' },
        { id: 'd17', day: 17, title: 'Vocabulary: Work & Career', skill: 'vocab',     icon: '📚', desc: 'Master professional and workplace vocabulary.', section: 'catlango',   action: 'catlango' },
        { id: 'd18', day: 18, title: 'Writing Task 1 Advanced',   skill: 'writing',   icon: '✍️', desc: 'Describe processes and compare data in Task 1.', section: 'writing',     action: 'writing' },
        { id: 'd19', day: 19, title: 'Speaking Part 3',           skill: 'speaking',  icon: '🗣️', desc: 'Discuss abstract ideas and express opinions fluently.', section: 'speaking',   action: 'speaking' },
        { id: 'd20', day: 20, title: 'Reading Hub Practice',      skill: 'reading',   icon: '📚', desc: 'Use the Reading & Comprehension Hub for external practice.', section: 'reading-hub', action: 'reading-hub' },
        { id: 'd21', day: 21, title: 'Weekly Review + Exam',      skill: 'exam',      icon: '📅', desc: 'Full review and weekly exam.', section: 'exam',        action: 'exam' }
      ]
    },
    {
      id: 'w4', name: 'Week 4', subtitle: 'Test Simulation',
      days: [
        { id: 'd22', day: 22, title: 'Full Listening Test',       skill: 'listening',  icon: '🎧', desc: 'Complete all 4 sections under timed conditions.', section: 'listening',  action: 'listening' },
        { id: 'd23', day: 23, title: 'Full Reading Test',         skill: 'reading',   icon: '📖', desc: 'Complete all 3 passages within 60 minutes.', section: 'reading',    action: 'reading' },
        { id: 'd24', day: 24, title: 'Vocabulary Review',         skill: 'vocab',     icon: '📚', desc: 'Review all Catlango word packs and spelling.', section: 'catlango',   action: 'catlango' },
        { id: 'd25', day: 25, title: 'Full Writing Test',         skill: 'writing',   icon: '✍️', desc: 'Write Task 1 and Task 2 within 60 minutes.', section: 'writing',     action: 'writing' },
        { id: 'd26', day: 26, title: 'Full Speaking Test',        skill: 'speaking',  icon: '🗣️', desc: 'Complete all 3 speaking parts with timing.', section: 'speaking',   action: 'speaking' },
        { id: 'd27', day: 27, title: 'Learning Path Review',     skill: 'levels',    icon: '🗺️', desc: 'Check your CEFR level progress and learning path.', section: 'learning-path', action: 'learning-path' },
        { id: 'd28', day: 28, title: 'Final Exam + Celebration',  skill: 'exam',      icon: '🎉', desc: 'Take the final weekly exam — you did it!', section: 'exam',        action: 'exam' }
      ]
    }
  ];

  /* ===================== PROGRESS STATE ===================== */
  function loadProgress() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }

  function saveProgress(progress) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (e) { /* ignore */ }
  }

  function markComplete(dayId) {
    var progress = loadProgress();
    progress[dayId] = { completed: true, timestamp: Date.now() };
    saveProgress(progress);
  }

  function isComplete(dayId) {
    var progress = loadProgress();
    return !!(progress[dayId] && progress[dayId].completed);
  }

  function getCompletedCount() {
    var progress = loadProgress();
    var count = 0;
    WEEKS.forEach(function (w) { w.days.forEach(function (d) { if (progress[d.id] && progress[d.id].completed) count++; }); });
    return count;
  }

  function getWeekProgress(week) {
    var done = 0;
    week.days.forEach(function (d) { if (isComplete(d.id)) done++; });
    return Math.round((done / week.days.length) * 100);
  }

  /* ===================== TASK LAUNCHER ===================== */
  function launchTask(action) {
    switch (action) {
      case 'listening':
        window.showSection('listening');
        break;
      case 'reading':
        window.showSection('reading');
        break;
      case 'readings':
        window.showSection('readings');
        break;
      case 'writing':
        window.showSection('writing');
        break;
      case 'speaking':
        window.showSection('speaking');
        break;
      case 'catlango':
        window.showSection('catlango');
        break;
      case 'training':
        window.showSection('training');
        break;
      case 'reading-hub':
        window.showSection('reading-hub');
        break;
      case 'learning-path':
        window.showSection('learning-path');
        break;
      case 'translator':
        window.showSection('translator');
        break;
      case 'exam':
        window.showSection('exam');
        break;
      default:
        window.showSection(action);
    }
  }

  /* ===================== RENDER: STUDY PLAN DASHBOARD ===================== */
  function renderStudyPlan() {
    var user = window.IELTS_AUTH ? window.IELTS_AUTH.getCurrentUser() : null;
    var totalDays = 28;
    var completedDays = getCompletedCount();
    var overallPct = Math.round((completedDays / totalDays) * 100);
    var currentWeekIdx = 0;
    for (var wi = WEEKS.length - 1; wi >= 0; wi--) {
      for (var di = 0; di < WEEKS[wi].days.length; di++) {
        if (!isComplete(WEEKS[wi].days[di].id)) { currentWeekIdx = wi; break; }
      }
    }

    var skillColors = {
      listening: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', accent: '#3b82f6' },
      reading:   { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', accent: '#22c55e' },
      writing:   { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', accent: '#a855f7' },
      speaking:  { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', accent: '#f97316' },
      vocab:     { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: '#f59e0b' },
      training:  { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', accent: '#6366f1' },
      exam:      { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', accent: '#f43f5e' },
      levels:    { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', accent: '#14b8a6' }
    };

    /* ---- Overall progress card ---- */
    var overallCard = '<div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">' +
      '<div class="flex flex-wrap items-center justify-between gap-4">' +
      '<div>' +
      '<p class="text-sm text-slate-500 font-medium">4-Week IELTS Study Plan</p>' +
      '<p class="text-2xl font-extrabold text-slate-900 mt-1">' + completedDays + ' / ' + totalDays + ' days completed</p>' +
      '<p class="text-sm text-slate-500 mt-1">You are on <strong class="text-brand-600">' + WEEKS[currentWeekIdx].name + ': ' + WEEKS[currentWeekIdx].subtitle + '</strong></p>' +
      '</div>' +
      '<div class="text-center">' +
      '<div class="relative w-24 h-24">' +
      '<svg class="w-24 h-24 -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" stroke-width="8"/><circle cx="50" cy="50" r="42" fill="none" stroke="#009736" stroke-width="8" stroke-linecap="round" stroke-dasharray="' + (2 * Math.PI * 42) + '" stroke-dashoffset="' + (2 * Math.PI * 42 * (1 - overallPct / 100)) + '" class="transition-all duration-700"/></svg>' +
      '<div class="absolute inset-0 flex items-center justify-center"><span class="text-xl font-extrabold text-brand-600">' + overallPct + '%</span></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">' +
      '<div class="h-full bg-gradient-to-r from-palestine-green to-palestine-green/70 rounded-full transition-all duration-500" style="width:' + overallPct + '%"></div>' +
      '</div>' +
      '<p class="text-xs text-slate-400 mt-2">Complete all 28 daily tasks to finish your IELTS preparation journey.</p>' +
      '</div>';

    /* ---- Weekly cards ---- */
    var weekCards = '';
    for (var wi2 = 0; wi2 < WEEKS.length; wi2++) {
      var w = WEEKS[wi2];
      var wp = getWeekProgress(w);
      var isActive = wi2 === currentWeekIdx;
      var isDone = wp === 100;

      var dayRows = '';
      for (var di2 = 0; di2 < w.days.length; di2++) {
        var d = w.days[di2];
        var done = isComplete(d.id);
        var sc = skillColors[d.skill] || skillColors.training;

        dayRows += '<div class="flex items-center gap-3 p-3 rounded-xl ' + (done ? 'bg-green-50 border border-green-200' : 'bg-white border border-slate-200 hover:border-brand-300 hover:shadow-sm') + ' transition-all cursor-pointer group" onclick="window.STUDY_PLAN.openTask(\'' + d.id + '\', \'' + d.action + '\')">' +
          '<div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ' + (done ? 'bg-emerald-100' : sc.bg) + '">' + (done ? '✅' : d.icon) + '</div>' +
          '<div class="flex-1 min-w-0">' +
          '<p class="text-sm font-semibold ' + (done ? 'text-emerald-700 line-through' : 'text-slate-800') + '">Day ' + d.day + ': ' + esc(d.title) + '</p>' +
          '<p class="text-xs ' + (done ? 'text-emerald-500' : 'text-slate-500') + ' truncate">' + esc(d.desc) + '</p>' +
          '</div>' +
          '<div class="shrink-0">' +
          (done
            ? '<span class="px-2 py-1 bg-green-100 text-palestine-green text-xs font-bold rounded-full">Done</span>'
            : '<span class="px-2 py-1 ' + sc.bg + ' ' + sc.text + ' text-xs font-bold rounded-full">' + d.skill.charAt(0).toUpperCase() + d.skill.slice(1) + '</span>') +
          '</div>' +
          '</div>';
      }

      weekCards += '<div class="bg-white rounded-2xl border ' + (isActive ? 'border-brand-300 shadow-md ring-2 ring-brand-100' : isDone ? 'border-emerald-200' : 'border-slate-200') + ' overflow-hidden">' +
        '<div class="p-5 ' + (isActive ? 'bg-gradient-to-r from-brand-50 to-indigo-50' : isDone ? 'bg-emerald-50' : 'bg-slate-50') + '">' +
        '<div class="flex items-center justify-between">' +
        '<div>' +
        '<h3 class="text-lg font-extrabold text-slate-900">' + w.name + ': ' + esc(w.subtitle) + '</h3>' +
        '<p class="text-xs text-slate-500 mt-0.5">' + w.days.length + ' days · ' + (isDone ? 'Completed ✅' : isActive ? 'In progress' : 'Upcoming') + '</p>' +
        '</div>' +
        '<div class="text-right">' +
        '<p class="text-2xl font-extrabold ' + (isDone ? 'text-emerald-600' : 'text-brand-600') + '">' + wp + '%</p>' +
        '</div>' +
        '</div>' +
        '<div class="mt-3 h-2 bg-white/80 rounded-full overflow-hidden">' +
        '<div class="h-full ' + (isDone ? 'bg-emerald-500' : 'bg-brand-500') + ' rounded-full transition-all" style="width:' + wp + '%"></div>' +
        '</div>' +
        '</div>' +
        '<div class="p-4 space-y-3">' + dayRows + '</div>' +
        '</div>';
    }

    var el = $('#study-plan-content');
    if (!el) return;
    el.innerHTML = overallCard + '<div class="space-y-6">' + weekCards + '</div>';
  }

  /* ===================== TASK DETAIL MODAL ===================== */
  function openTask(dayId, action) {
    var day = null;
    for (var wi = 0; wi < WEEKS.length; wi++) {
      for (var di = 0; di < WEEKS[wi].days.length; di++) {
        if (WEEKS[wi].days[di].id === dayId) { day = WEEKS[wi].days[di]; break; }
      }
      if (day) break;
    }
    if (!day) return;

    var done = isComplete(dayId);
    var skillColors = {
      listening: { bg: 'bg-blue-50', text: 'text-blue-700', btn: 'bg-blue-600 hover:bg-blue-700' },
      reading:   { bg: 'bg-green-50', text: 'text-green-700', btn: 'bg-green-600 hover:bg-green-700' },
      writing:   { bg: 'bg-purple-50', text: 'text-purple-700', btn: 'bg-purple-600 hover:bg-purple-700' },
      speaking:  { bg: 'bg-orange-50', text: 'text-orange-700', btn: 'bg-orange-600 hover:bg-orange-700' },
      vocab:     { bg: 'bg-amber-50', text: 'text-amber-700', btn: 'bg-amber-600 hover:bg-amber-700' },
      training:  { bg: 'bg-indigo-50', text: 'text-indigo-700', btn: 'bg-indigo-600 hover:bg-indigo-700' },
      exam:      { bg: 'bg-rose-50', text: 'text-rose-700', btn: 'bg-rose-600 hover:bg-rose-700' },
      levels:    { bg: 'bg-teal-50', text: 'text-teal-700', btn: 'bg-teal-600 hover:bg-teal-700' }
    };
    var sc = skillColors[day.skill] || skillColors.training;

    var modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
    modal.id = 'task-modal';
    modal.innerHTML = '<div class="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">' +
      '<div class="' + sc.bg + ' p-6">' +
      '<div class="flex items-center justify-between">' +
      '<div class="flex items-center gap-3">' +
      '<span class="text-3xl">' + day.icon + '</span>' +
      '<div><p class="text-xs font-bold ' + sc.text + ' uppercase tracking-wider">Day ' + day.day + '</p><h3 class="text-xl font-extrabold text-slate-900">' + esc(day.title) + '</h3></div>' +
      '</div>' +
      '<button onclick="document.getElementById(\'task-modal\').remove()" class="text-2xl text-slate-400 hover:text-slate-600">&times;</button>' +
      '</div>' +
      '</div>' +
      '<div class="p-6">' +
      '<p class="text-slate-600 leading-relaxed mb-6">' + esc(day.desc) + '</p>' +
      (done ? '<div class="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-center"><p class="text-emerald-700 font-semibold">✅ This task is completed!</p></div>' : '') +
      '<div class="flex gap-3">' +
      '<button onclick="window.STUDY_PLAN.launchFromModal(\'' + action + '\')" class="flex-1 py-3 ' + sc.btn + ' text-white rounded-xl font-bold transition">Open ' + esc(day.title.split(' ')[0]) + ' Tool</button>' +
      (!done
        ? '<button onclick="window.STUDY_PLAN.completeFromModal(\'' + dayId + '\')" class="flex-1 py-3 bg-palestine-green hover:bg-palestine-green/90 text-white rounded-xl font-bold transition">Mark Complete ✓</button>'
        : '<button onclick="window.STUDY_PLAN.uncompleteFromModal(\'' + dayId + '\')" class="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold transition">Undo ✓</button>') +
      '</div>' +
      '</div>' +
      '</div>';
    document.body.appendChild(modal);
  }

  function launchFromModal(action) {
    var modal = document.getElementById('task-modal');
    if (modal) modal.remove();
    launchTask(action);
  }

  function completeFromModal(dayId) {
    markComplete(dayId);
    var modal = document.getElementById('task-modal');
    if (modal) modal.remove();
    renderStudyPlan();
    if (window.toast) window.toast('Day completed! 🎉 +10 XP');
    /* award XP */
    var auth = window.IELTS_AUTH;
    if (auth && auth.getCurrentUser()) {
      var u = auth.getCurrentUser();
      u.xp = (u.xp || 0) + 10;
      if (auth.saveUser) auth.saveUser(u);
    }
  }

  function uncompleteFromModal(dayId) {
    var progress = loadProgress();
    delete progress[dayId];
    saveProgress(progress);
    var modal = document.getElementById('task-modal');
    if (modal) modal.remove();
    renderStudyPlan();
  }

  /* ===================== PUBLIC API ===================== */
  window.STUDY_PLAN = {
    render: renderStudyPlan,
    openTask: openTask,
    launchTask: launchTask,
    launchFromModal: launchFromModal,
    completeFromModal: completeFromModal,
    uncompleteFromModal: uncompleteFromModal,
    getCompletedCount: getCompletedCount,
    isComplete: isComplete,
    WEEKS: WEEKS
  };
})();
