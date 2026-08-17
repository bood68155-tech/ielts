/* ============================================================
   IELTS Master — interactive profile system
   Editable profile, stats, badges and activity log.
   Data is stored per active user under a user-scoped key and
   mirrored to the Supabase `profiles` table (UPSERT) when
   configured, so it follows the user across devices.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const AVATARS = ['🦊', '🐼', '🦉', '🐯', '🐸', '🐙', '🦄', '🐨', '🦁', '🐧', '🐳', '🦋'];
  const BAND_OPTIONS = ['', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'];

  /* ---------- merged user-scoped profile (user_<id>_profile) ---------- */
  function profileData() {
    const user = window.IELTS_AUTH.getCurrentUser();
    const scoped = window.IELTS_AUTH.getScoped('profile', null) || {};
    return {
      username: user ? user.username : '',
      displayName: scoped.displayName || (user && user.displayName) || (user ? user.username : ''),
      bio: scoped.bio || (user && user.bio) || '',
      targetBand: scoped.targetBand || (user && user.targetBand) || '',
      avatar: scoped.avatar || (user && user.avatar) || null,
      activity: (scoped.activity && scoped.activity.length) ? scoped.activity : ((user && user.activity) || [])
    };
  }

  /* ---------- badge definitions (computed from user data) ---------- */
  function computeBadges(user) {
    if (!user) return [];
    const level = window.IELTS_AUTH.getLevel(user.xp);
    const exams = window.IELTS_AUTH.getExamHistory();
    const claims = user.claims || [];
    const training = window.IELTS_AUTH.getScoped('training', null) || {};
    const stagesDone = Object.keys(training).reduce((n, k) => n + ((training[k].completed || []).length), 0);
    const moduleDone = (m) => (training[m] && (training[m].completed || []).length) >= 5;
    const allModules = ['vocabulary', 'listening', 'speaking'].every(moduleDone);
    const levelIdx = ['beginner', 'intermediate', 'advanced'].indexOf(level.id);

    return [
      { id: 'first-steps', icon: '🌱', name: 'First steps', desc: 'Complete your first activity.', earned: claims.length >= 1 },
      { id: 'xp-100', icon: '⚡', name: 'Getting started', desc: 'Reach 100 XP.', earned: user.xp >= 100 },
      { id: 'xp-500', icon: '🔥', name: 'On fire', desc: 'Reach 500 XP.', earned: user.xp >= 500 },
      { id: 'xp-1000', icon: '💎', name: 'XP elite', desc: 'Reach 1000 XP.', earned: user.xp >= 1000 },
      { id: 'level-intermediate', icon: '🚀', name: 'Intermediate', desc: 'Reach the Intermediate level.', earned: levelIdx >= 1 },
      { id: 'level-advanced', icon: '🏆', name: 'Advanced', desc: 'Reach the Advanced level.', earned: levelIdx >= 2 },
      { id: 'exam-first', icon: '📝', name: 'First exam', desc: 'Take your first weekly exam.', earned: exams.length >= 1 },
      { id: 'exam-pass', icon: '✅', name: 'Exam passer', desc: 'Score 60% or more on a weekly exam.', earned: exams.some((e) => e.score / e.total >= 0.6) },
      { id: 'exam-top', icon: '🎯', name: 'Top scorer', desc: 'Score 80% or more on a weekly exam.', earned: exams.some((e) => e.score / e.total >= 0.8) },
      { id: 'training-first', icon: '🎓', name: 'Trainee', desc: 'Complete your first training stage.', earned: stagesDone >= 1 },
      { id: 'vocab-master', icon: '📚', name: 'Vocabulary master', desc: 'Finish all Vocabulary stages.', earned: moduleDone('vocabulary') },
      { id: 'hero', icon: '🦸', name: 'Hero graduate', desc: 'Complete all three training modules.', earned: allModules }
    ];
  }

  function avatarOf(user) {
    return user.avatar || String(user.displayName || user.username || 'U').charAt(0).toUpperCase();
  }

  function skillProgress(user) {
    const claims = user.claims || [];
    return [
      { label: 'Listening', icon: '🎧', total: 4, done: [1, 2, 3, 4].filter((i) => claims.includes('listening-' + i)).length },
      { label: 'Reading', icon: '📖', total: 3, done: [1, 2, 3].filter((i) => claims.includes('reading-' + i)).length },
      { label: 'Writing', icon: '✍️', total: 2, done: [1, 2].filter((i) => claims.includes('writing-' + i)).length },
      { label: 'Speaking', icon: '🗣️', total: 3, done: [1, 2, 3].filter((i) => claims.includes('speaking-' + i)).length }
    ];
  }

  function trainingProgress(user) {
    const t = window.IELTS_AUTH.getScoped('training', null) || {};
    return [
      { key: 'vocabulary', label: 'Vocabulary', icon: '📚', done: (t.vocabulary && (t.vocabulary.completed || []).length) || 0, total: 5 },
      { key: 'listening', label: 'Listening', icon: '🎧', done: (t.listening && (t.listening.completed || []).length) || 0, total: 5 },
      { key: 'speaking', label: 'Speaking', icon: '🗣️', done: (t.speaking && (t.speaking.completed || []).length) || 0, total: 5 }
    ];
  }

  function statsOf(user) {
    const exams = window.IELTS_AUTH.getExamHistory();
    const best = exams.length ? Math.max(...exams.map((e) => e.score)) : 0;
    const t = trainingProgress(user);
    const stages = t.reduce((n, x) => n + x.done, 0);
    const badges = computeBadges(user).filter((b) => b.earned).length;
    return [
      { icon: '⚡', label: 'Total XP', value: user.xp },
      { icon: '🏅', label: 'Level', value: window.IELTS_AUTH.getLevel(user.xp).name },
      { icon: '📝', label: 'Exams taken', value: exams.length },
      { icon: '🎯', label: 'Best exam score', value: exams.length ? best + '/' + exams[0].total : '—' },
      { icon: '🎓', label: 'Training stages', value: stages + '/15' },
      { icon: '🏆', label: 'Badges', value: badges }
    ];
  }

  function timeAgo(ts) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return 'just now';
    const m = Math.floor(s / 60);
    if (m < 60) return m + 'm ago';
    const h = Math.floor(m / 60);
    if (h < 24) return h + 'h ago';
    const d = Math.floor(h / 24);
    if (d < 7) return d + 'd ago';
    return new Date(ts).toLocaleDateString();
  }

  /* ---------- main render ---------- */
  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;

    $('#profile-content').innerHTML = `
      <div id="profile-view"></div>
      <div id="profile-edit" class="hidden"></div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6" id="profile-stats"></div>
      <div class="grid lg:grid-cols-2 gap-5 mt-6" id="profile-progress"></div>
      <div class="mt-6" id="profile-badges"></div>
      <div class="mt-6" id="profile-activity"></div>`;

    renderView(user);
    renderEdit(user);
    $('#profile-stats').innerHTML = statsOf(user).map((s) => `
      <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm text-center">
        <div class="text-xl mb-1">${s.icon}</div>
        <div class="text-lg font-extrabold text-slate-900">${s.value}</div>
        <div class="text-[11px] text-slate-500 font-medium">${s.label}</div>
      </div>`).join('');
    renderProgress(user);
    renderBadges(user);
    renderActivity(user);

    syncFromDb(user);
  }

  /* pull fresher profile data (e.g. edits made on another device) in the background */
  function syncFromDb(user) {
    const d = window.IELTS_DB;
    if (!d || !d.isConfigured() || !user) return;
    d.syncProfileForActive(user.userId).then((changed) => {
      if (changed) render();
    });
  }

  /* ---------- profile card ---------- */
  function renderView(user) {
    const p = profileData();
    const level = window.IELTS_AUTH.getLevel(user.xp);
    const joined = new Date(user.createdAt || Date.now()).toLocaleDateString();
    $('#profile-view').innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col sm:flex-row items-center gap-6">
        <div class="w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-indigo-400 text-white flex items-center justify-center text-4xl font-extrabold shadow-lg shrink-0">${esc(avatarOf(p))}</div>
        <div class="flex-1 text-center sm:text-left">
          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h3 class="text-2xl font-extrabold text-slate-900">${esc(p.displayName)}</h3>
            <span class="text-xs font-bold level-badge-${level.color} px-2.5 py-1 rounded-full">${level.icon} ${level.name}</span>
          </div>
          <p class="text-sm text-slate-500 mt-0.5">@${esc(p.username)} ${p.targetBand ? '· 🎯 Target band ' + esc(p.targetBand) : ''}</p>
          <p class="text-sm text-slate-600 mt-2 max-w-xl mx-auto sm:mx-0">${p.bio ? esc(p.bio) : 'No bio yet — tell other learners a little about yourself.'}</p>
          <p class="text-xs text-slate-400 mt-2">Member since ${joined} · ${user.xp} XP</p>
        </div>
        <button class="btn-secondary text-sm shrink-0" onclick="IELTS_PROFILE.startEdit()">✏️ Edit profile</button>
      </div>`;
  }

  /* ---------- skill & training progress panels ---------- */
  function renderProgress(user) {
    const skills = skillProgress(user).map((s) => {
      const pct = Math.round((s.done / s.total) * 100);
      return `
        <div>
          <div class="flex items-center justify-between text-sm mb-1">
            <span class="font-semibold text-slate-700">${s.icon} ${s.label}</span>
            <span class="text-xs text-slate-500">${s.done}/${s.total}</span>
          </div>
          <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-brand-500 rounded-full transition-all" style="width: ${pct}%"></div>
          </div>
        </div>`;
    }).join('');

    const training = trainingProgress(user).map((t) => {
      const pct = Math.round((t.done / t.total) * 100);
      return `
        <div>
          <div class="flex items-center justify-between text-sm mb-1">
            <span class="font-semibold text-slate-700">${t.icon} ${t.label}</span>
            <span class="text-xs text-slate-500">${t.done}/${t.total} stages</span>
          </div>
          <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-emerald-500 rounded-full transition-all" style="width: ${pct}%"></div>
          </div>
        </div>`;
    }).join('');

    $('#profile-progress').innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p class="font-bold text-slate-900 mb-4">🧩 Skill practice</p>
        <div class="space-y-4">${skills}</div>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p class="font-bold text-slate-900 mb-4">🎓 Zero-to-hero training</p>
        <div class="space-y-4">${training}</div>
      </div>`;
  }

  /* ---------- edit form ---------- */
  function renderEdit(user) {
    const p = profileData();
    $('#profile-edit').innerHTML = `
      <div class="bg-white rounded-2xl border border-brand-200 ring-2 ring-brand-100 shadow-sm p-6">
        <h4 class="font-bold text-slate-900 mb-4">✏️ Edit your profile</h4>
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1" for="pf-name">Display name</label>
            <input id="pf-name" type="text" maxlength="40" value="${esc(p.displayName)}" class="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1" for="pf-band">Target band</label>
            <select id="pf-band" class="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white">
              ${BAND_OPTIONS.map((b) => '<option value="' + b + '" ' + (p.targetBand === b ? 'selected' : '') + '>' + (b ? 'Band ' + b : 'Not set') + '</option>').join('')}
            </select>
          </div>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-semibold text-slate-700 mb-1" for="pf-bio">Bio</label>
          <textarea id="pf-bio" rows="3" maxlength="200" placeholder="Tell other learners about your goals…" class="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-y">${esc(p.bio)}</textarea>
        </div>
        <div class="mt-4">
          <p class="text-sm font-semibold text-slate-700 mb-2">Avatar</p>
          <div class="flex flex-wrap gap-2">
            ${AVATARS.map((a) => '<button type="button" onclick="IELTS_PROFILE.pickAvatar(this)" data-avatar="' + a + '" class="w-10 h-10 rounded-full border-2 text-xl flex items-center justify-center transition ' + (p.avatar === a ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-brand-300') + '">' + a + '</button>').join('')}
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button class="btn-primary" onclick="IELTS_PROFILE.saveProfile()">Save changes</button>
          <button class="btn-secondary" onclick="IELTS_PROFILE.cancelEdit()">Cancel</button>
        </div>
      </div>`;
  }

  function startEdit() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    $('#profile-view').classList.add('hidden');
    $('#profile-edit').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    renderView(user);
    $('#profile-view').classList.remove('hidden');
    $('#profile-edit').classList.add('hidden');
  }

  function pickAvatar(btn) {
    document.querySelectorAll('#profile-edit [data-avatar]').forEach((b) => {
      b.classList.remove('border-brand-500', 'bg-brand-50');
      b.classList.add('border-slate-200');
    });
    btn.classList.add('border-brand-500', 'bg-brand-50');
    btn.classList.remove('border-slate-200');
  }

  function saveProfile() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    const p = profileData();
    const name = $('#pf-name').value.trim() || user.username;
    const bio = $('#pf-bio').value.trim();
    const targetBand = $('#pf-band').value;
    const picked = document.querySelector('#profile-edit [data-avatar].border-brand-500');
    const avatar = picked ? picked.dataset.avatar : p.avatar;
    const bandChanged = targetBand !== p.targetBand;

    window.IELTS_AUTH.updateProfile({ displayName: name, bio, targetBand, avatar });
    if (bandChanged && targetBand) {
      window.IELTS_AUTH.addActivity('profile', 'Set a target band of ' + targetBand, 0);
    }
    window.IELTS_AUTH.addActivity('profile', 'Updated profile', 0);
    window.toast && window.toast('Profile saved ✅');
    render();
  }

  /* ---------- badges ---------- */
  function renderBadges(user) {
    const badges = computeBadges(user);
    const earned = badges.filter((b) => b.earned);
    $('#profile-badges').innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div class="flex items-center justify-between mb-4">
          <p class="font-bold text-slate-900">🏆 Badges <span class="text-xs font-normal text-slate-400">(${earned.length}/${badges.length} earned)</span></p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          ${badges.map((b) => `
            <div class="rounded-xl border p-3 text-center transition ${b.earned ? 'border-brand-200 bg-brand-50' : 'border-slate-200 bg-slate-50 opacity-60 grayscale'}">
              <div class="text-2xl mb-1">${b.icon}</div>
              <p class="text-sm font-bold ${b.earned ? 'text-brand-700' : 'text-slate-400'}">${b.name}</p>
              <p class="text-[11px] text-slate-500 mt-0.5 leading-snug">${b.desc}</p>
            </div>`).join('')}
        </div>
      </div>`;
  }

  /* ---------- activity log ---------- */
  const ACTIVITY_ICONS = {
    listening: '🎧', reading: '📖', writing: '✍️', speaking: '🗣️',
    exam: '📝', training: '🎓', profile: '👤', feed: '💬'
  };

  function renderActivity(user) {
    const activity = profileData().activity || [];
    $('#profile-activity').innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <p class="font-bold text-slate-900 mb-4">🕒 Recent activity</p>
        ${activity.length ? `
          <div class="space-y-3">
            ${activity.slice(0, 12).map((a) => `
              <div class="flex items-start gap-3">
                <span class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">${ACTIVITY_ICONS[a.type] || '✨'}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-slate-700">${esc(a.text)}</p>
                  <p class="text-[11px] text-slate-400">${timeAgo(a.date)}${a.xp ? ' · +' + a.xp + ' XP' : ''}</p>
                </div>
              </div>`).join('')}
          </div>`
        : `
          <div class="text-center py-6">
            <p class="text-3xl mb-2">🌱</p>
            <p class="font-bold text-slate-800">No activity yet</p>
            <p class="text-sm text-slate-500 mt-1">Complete exercises, exams and training stages to build your story.</p>
          </div>`}
      </div>`;
  }

  window.IELTS_PROFILE = { render, startEdit, cancelEdit, saveProfile, pickAvatar, avatarOf };
})();
