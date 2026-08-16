/* ============================================================
   IELTS Master — social feed
   Share progress, post updates, like and interact (localStorage).
   ============================================================ */
(function () {
  'use strict';

  const FEED_KEY = 'ielts-feed';
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let feed = loadFeed();
  if (!feed.length) seed();

  function loadFeed() {
    try { return JSON.parse(localStorage.getItem(FEED_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveFeed() {
    localStorage.setItem(FEED_KEY, JSON.stringify(feed));
  }

  /* starter posts so the community never looks empty */
  function seed() {
    const now = Date.now();
    feed = [
      { id: 'seed-1', author: 'IELTS Master', avatar: 'I', level: 'Advanced', system: true,
        text: 'Welcome to the IELTS Master community! 🎉 Share your scores, ask questions and keep each other motivated on the road to your target band.',
        attachment: null, likes: [], date: now - 2 * 86400000 },
      { id: 'seed-2', author: 'IELTS Master', avatar: 'I', level: 'Advanced', system: true,
        text: 'Tip of the week: 15 focused minutes of vocabulary every day beats a 3-hour cram on Sunday. Consistency wins. 📚',
        attachment: null, likes: [], date: now - 86400000 }
    ];
    saveFeed();
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

  /* ---------- post creation ---------- */
  function createPost(text, attachment) {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    text = (text || '').trim();
    if (!text && !attachment) {
      window.toast && window.toast('Write something or attach a milestone first.');
      return;
    }
    feed.unshift({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      author: user.username,
      avatar: user.avatar || String(user.displayName || user.username).charAt(0).toUpperCase(),
      level: window.IELTS_AUTH.getLevel(user.xp).name,
      text,
      attachment: attachment || null,
      likes: [],
      date: Date.now()
    });
    saveFeed();
    window.IELTS_AUTH.addActivity('feed', text.slice(0, 60) + (text.length > 60 ? '…' : ''), 0);
    render();
    window.toast && window.toast('Posted to the feed ✅');
  }

  /* quick-share: attach a milestone card to the post */
  function shareProgress(kind, data) {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    let text = '';
    let attachment = null;
    if (kind === 'exam') {
      text = 'Just finished the Week ' + data.week + ' Assessment Exam — scored ' + data.score + '/' + data.total + '! 🎉';
      attachment = { kind: 'exam', icon: '📝', title: 'Weekly Assessment Exam', detail: 'Week ' + data.week + ' · ' + data.score + '/' + data.total + ' correct' };
    } else if (kind === 'level') {
      text = 'Leveled up to ' + data.level + '! 🚀';
      attachment = { kind: 'level', icon: '🏆', title: 'Level up', detail: 'Reached the ' + data.level + ' level' };
    } else if (kind === 'xp') {
      text = 'Hit ' + data.xp + ' XP — every point counts! ⚡';
      attachment = { kind: 'xp', icon: '⚡', title: 'XP milestone', detail: data.xp + ' total XP' };
    } else if (kind === 'training') {
      text = 'Completed ' + data.stage + ' of the ' + data.module + ' training module. 🎓';
      attachment = { kind: 'training', icon: '🎓', title: data.module + ' training', detail: data.stage + ' completed' };
    } else if (kind === 'module') {
      text = 'Finished the whole ' + data.module + ' module — zero to hero! 🦸';
      attachment = { kind: 'module', icon: '🏅', title: 'Module complete', detail: data.module + ' — all stages done' };
    }
    createPost(text, attachment);
    window.showSection('feed');
  }

  /* ---------- rendering ---------- */
  function attachmentHtml(att) {
    if (!att) return '';
    const tones = {
      exam: 'border-brand-200 bg-brand-50',
      level: 'border-violet-200 bg-violet-50',
      xp: 'border-amber-200 bg-amber-50',
      training: 'border-emerald-200 bg-emerald-50',
      module: 'border-sky-200 bg-sky-50'
    };
    return `
      <div class="rounded-xl border ${tones[att.kind] || 'border-slate-200 bg-slate-50'} px-4 py-3 mt-3 flex items-center gap-3">
        <span class="text-2xl">${att.icon || '🏅'}</span>
        <div>
          <p class="text-sm font-bold text-slate-800">${esc(att.title)}</p>
          <p class="text-xs text-slate-500">${esc(att.detail)}</p>
        </div>
      </div>`;
  }

  function postHtml(p) {
    const user = window.IELTS_AUTH.getCurrentUser();
    const mine = user && p.author === user.username;
    const liked = user && p.likes.includes(user.username);
    return `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-indigo-400 text-white flex items-center justify-center font-extrabold text-lg shrink-0">${esc(p.avatar)}</div>
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <p class="font-bold text-slate-900">${esc(p.author)}</p>
              <span class="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">${esc(p.level)}</span>
              ${p.system ? '<span class="text-[10px] font-bold bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">OFFICIAL</span>' : ''}
              <span class="text-[11px] text-slate-400">· ${timeAgo(p.date)}</span>
            </div>
            ${p.text ? '<p class="text-sm text-slate-700 mt-2 leading-relaxed">' + esc(p.text) + '</p>' : ''}
            ${attachmentHtml(p.attachment)}
            <div class="flex items-center gap-4 mt-3">
              <button onclick="IELTS_FEED.toggleLike('${p.id}')" class="inline-flex items-center gap-1.5 text-sm font-semibold transition ${liked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}">
                <span class="text-base leading-none">${liked ? '❤️' : '🤍'}</span> ${p.likes.length || ''}
              </button>
              ${mine ? '<button onclick="IELTS_FEED.deletePost(\'\ + p.id + \'\)" class="text-xs text-slate-400 hover:text-rose-600 font-semibold">Delete</button>' : ''}
            </div>
          </div>
        </div>
      </div>`;
  }

  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;

    const composer = user ? `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-indigo-400 text-white flex items-center justify-center font-extrabold text-lg shrink-0">${esc(user.avatar || String(user.displayName || user.username).charAt(0).toUpperCase())}</div>
          <div class="flex-1">
            <textarea id="feed-text" rows="3" maxlength="280" placeholder="Share your progress, ask a question, or motivate the community…" class="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-y"></textarea>
            <div class="flex flex-wrap items-center justify-between gap-3 mt-3">
              <div class="flex flex-wrap gap-2">
                <button class="text-xs font-semibold border border-slate-200 rounded-full px-3 py-1.5 hover:border-brand-300 hover:text-brand-600 transition" onclick="IELTS_FEED.attachShare('exam')">📝 Exam score</button>
                <button class="text-xs font-semibold border border-slate-200 rounded-full px-3 py-1.5 hover:border-brand-300 hover:text-brand-600 transition" onclick="IELTS_FEED.attachShare('level')">🏆 Level up</button>
                <button class="text-xs font-semibold border border-slate-200 rounded-full px-3 py-1.5 hover:border-brand-300 hover:text-brand-600 transition" onclick="IELTS_FEED.attachShare('xp')">⚡ XP</button>
                <button class="text-xs font-semibold border border-slate-200 rounded-full px-3 py-1.5 hover:border-brand-300 hover:text-brand-600 transition" onclick="IELTS_FEED.attachShare('training')">🎓 Training</button>
              </div>
              <button class="btn-primary !py-2 text-xs" onclick="IELTS_FEED.post()">Post</button>
            </div>
            <p class="text-[11px] text-slate-400 mt-2">💡 Milestone chips build a progress card on your post automatically.</p>
          </div>
        </div>
      </div>` : '';

    const list = feed.length ? feed.map(postHtml).join('') : `
      <div class="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
        <p class="text-3xl mb-2">💬</p>
        <p class="font-bold text-slate-800">No posts yet</p>
        <p class="text-sm text-slate-500 mt-1">Be the first to share your progress!</p>
      </div>`;

    $('#feed-content').innerHTML = `
      ${composer}
      <div class="flex items-center justify-between mb-4">
        <p class="font-bold text-slate-900">Community feed</p>
        <p class="text-xs text-slate-400">${feed.length} posts</p>
      </div>
      <div class="space-y-4">${list}</div>`;
  }

  function post() {
    const text = $('#feed-text') ? $('#feed-text').value : '';
    createPost(text, null);
  }

  /* milestone chips: prefill the composer with a progress card */
  function attachShare(kind) {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    if (kind === 'exam') {
      const history = window.IELTS_AUTH.getExamHistory();
      if (!history.length) {
        window.toast && window.toast('Take your weekly exam first — then share the score!');
        window.showSection('exam');
        return;
      }
      const last = history[history.length - 1];
      shareProgress('exam', { week: last.week, score: last.score, total: last.total });
    } else if (kind === 'level') {
      shareProgress('level', { level: window.IELTS_AUTH.getLevel(user.xp).name });
    } else if (kind === 'xp') {
      shareProgress('xp', { xp: user.xp });
    } else if (kind === 'training') {
      shareProgress('training', { module: 'Vocabulary', stage: 'Step 1' });
    }
  }

  /* ---------- interactions ---------- */
  function toggleLike(id) {
    const user = window.IELTS_AUTH.getCurrentUser();
    const post = feed.find((p) => p.id === id);
    if (!user || !post) return;
    const i = post.likes.indexOf(user.username);
    if (i >= 0) post.likes.splice(i, 1);
    else post.likes.push(user.username);
    saveFeed();
    render();
  }

  function deletePost(id) {
    const user = window.IELTS_AUTH.getCurrentUser();
    const post = feed.find((p) => p.id === id);
    if (!user || !post || post.author !== user.username) return;
    feed = feed.filter((p) => p.id !== id);
    saveFeed();
    render();
    window.toast && window.toast('Post deleted');
  }

  window.IELTS_FEED = { render, post, attachShare, shareProgress, toggleLike, deletePost };
})();
