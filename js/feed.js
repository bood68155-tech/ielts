/* ============================================================
   IELTS Master — social feed
   Share progress, post updates, like and interact.
   With Supabase configured the feed is a SHARED community feed
   backed by the `posts` table (every user sees the same posts).
   Without it, posts fall back to a local browser cache.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let feed = null; // lazy: loaded once per session

  /* feed cache: shared across users, kept locally and mirrored to `posts` */
  function loadFeed() {
    try {
      let list = (window.IELTS_DB && window.IELTS_DB.getCache('feed')) || [];
      // migrate a legacy per-user feed into the shared cache on first load
      if (!list.length && window.IELTS_AUTH) {
        const legacy = window.IELTS_AUTH.getScoped('feed', null);
        if (Array.isArray(legacy)) list = legacy;
      }
      return list.map((p) => { p.comments = p.comments || []; p.likes = p.likes || []; return p; });
    }
    catch (e) { return []; }
  }

  function saveFeed() {
    if (window.IELTS_DB) window.IELTS_DB.setCache('feed', feed || []);
  }

  function ensureFeed() {
    if (feed === null) {
      feed = loadFeed();
      // only seed locally when there is no database to pull from
      if (!feed.length && !(window.IELTS_DB && window.IELTS_DB.isConfigured())) seed();
    }
    return feed;
  }

  /* switching users keeps the same shared community feed */
  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) {
    window.IELTS_AUTH.onUserChange(() => { feed = null; });
  }

  /* starter posts so the community never looks empty (local-only mode) */
  function seed() {
    const now = Date.now();
    feed = [
      { id: 'seed-1', author: 'IELTS Master', avatar: 'I', level: 'Advanced', system: true,
        text: 'Welcome to the IELTS Master community! 🎉 Share your scores, ask questions and keep each other motivated on the road to your target band.',
        attachment: null, likes: [], comments: [], date: now - 2 * 86400000 },
      { id: 'seed-2', author: 'IELTS Master', avatar: 'I', level: 'Advanced', system: true,
        text: 'Tip of the week: 15 focused minutes of vocabulary every day beats a 3-hour cram on Sunday. Consistency wins. 📚',
        attachment: null, likes: [], comments: [], date: now - 86400000 }
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
  function createPost(text, attachment, image) {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    ensureFeed();
    text = (text || '').trim();
    image = cleanImageUrl(image);
    if (!text && !attachment && !image) {
      window.toast && window.toast('Write something, attach a milestone or add an image first.');
      return;
    }
    const post = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      author: user.username,
      avatar: user.avatar || String(user.displayName || user.username).charAt(0).toUpperCase(),
      level: window.IELTS_AUTH.getLevel(user.xp).name,
      text,
      attachment: attachment || null,
      image: image || null,
      likes: [],
      comments: [],
      date: Date.now(),
      _unsynced: true // not yet pushed to the shared database
    };
    feed.unshift(post);
    saveFeed();
    // real INSERT into the posts table (best-effort)
    const d = window.IELTS_DB;
    if (d && d.isConfigured()) {
      d.upsertPost(post).then(() => {
        const i = feed.findIndex((p) => p.id === post.id);
        if (i >= 0) { delete feed[i]._unsynced; saveFeed(); }
      });
    }
    window.IELTS_AUTH.addActivity('feed', (text || 'Shared a post').slice(0, 60) + ((text || '').length > 60 ? '…' : ''), 0);
    render();
    window.toast && window.toast('Posted to the feed ✅');
  }

  /* only accept http(s) image links so we never inject junk into the feed */
  function cleanImageUrl(url) {
    const u = String(url || '').trim();
    if (!u) return '';
    try {
      const parsed = new URL(u);
      return (parsed.protocol === 'https:' || parsed.protocol === 'http:') ? u : '';
    } catch (e) { return ''; }
  }

  /* ---------- composer image field ---------- */
  function toggleImageField() {
    const row = $('#feed-image-row');
    if (!row) return;
    row.classList.toggle('hidden');
    if (row.classList.contains('hidden')) {
      const input = $('#feed-image');
      if (input) input.value = '';
      const prev = $('#feed-image-preview');
      if (prev) { prev.classList.add('hidden'); prev.innerHTML = ''; }
    } else {
      const input = $('#feed-image');
      if (input) input.focus();
    }
  }

  function previewImage() {
    const input = $('#feed-image');
    const prev = $('#feed-image-preview');
    if (!input || !prev) return;
    const url = cleanImageUrl(input.value);
    if (url) {
      prev.innerHTML = `<img src="${esc(url)}" alt="Image preview" class="max-h-48 w-auto rounded-xl border border-slate-200" onerror="this.parentElement.classList.add('hidden')" />`;
      prev.classList.remove('hidden');
    } else {
      prev.classList.add('hidden');
      prev.innerHTML = '';
    }
  }

  function clearImageField() {
    const input = $('#feed-image');
    if (input) input.value = '';
    const prev = $('#feed-image-preview');
    if (prev) { prev.classList.add('hidden'); prev.innerHTML = ''; }
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

  function commentHtml(c) {
    return `
      <div class="flex items-start gap-2.5">
        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-indigo-400 text-white flex items-center justify-center font-extrabold text-xs shrink-0">${esc(c.avatar)}</div>
        <div class="flex-1 min-w-0 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
          <div class="flex items-center gap-2">
            <p class="text-xs font-bold text-slate-800">${esc(c.author)}</p>
            <span class="text-[10px] text-slate-400">· ${timeAgo(c.date)}</span>
          </div>
          <p class="text-sm text-slate-600 mt-0.5 leading-relaxed">${esc(c.text)}</p>
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
            ${p.image ? '<a href="' + esc(p.image) + '" target="_blank" rel="noopener noreferrer" class="block mt-3"><img src="' + esc(p.image) + '" alt="Post image" loading="lazy" class="max-h-80 w-auto max-w-full rounded-xl border border-slate-200 object-cover" onerror="this.remove()" /></a>' : ''}
            ${attachmentHtml(p.attachment)}
            <div class="flex items-center gap-4 mt-3">
              <button onclick="IELTS_FEED.toggleLike('${p.id}')" class="inline-flex items-center gap-1.5 text-sm font-semibold transition ${liked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}">
                <span class="text-base leading-none">${liked ? '❤️' : '🤍'}</span> ${p.likes.length || ''}
              </button>
              <button onclick="IELTS_FEED.toggleComments('${p.id}')" class="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-brand-600 transition">
                <span class="text-base leading-none">💬</span> ${(p.comments || []).length || ''}
              </button>
              ${mine ? '<button onclick="IELTS_FEED.deletePost(\'' + p.id + '\')" class="text-xs text-slate-400 hover:text-rose-600 font-semibold">Delete</button>' : ''}
            </div>
            <div id="comments-${p.id}" class="hidden mt-4 pt-4 border-t border-slate-100 space-y-3">
              ${(p.comments || []).length ? (p.comments || []).map(commentHtml).join('') : '<p class="text-xs text-slate-400">No comments yet — start the discussion!</p>'}
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-indigo-400 text-white flex items-center justify-center font-extrabold text-xs shrink-0">${esc(user ? (user.avatar || String(user.displayName || user.username).charAt(0).toUpperCase()) : '?')}</div>
                <input id="feed-comment-${p.id}" type="text" maxlength="200" placeholder="Write a comment…" class="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" onkeydown="if (event.key === 'Enter') IELTS_FEED.addComment('${p.id}')" />
                <button class="btn-primary !py-2 !px-3 text-xs" onclick="IELTS_FEED.addComment('${p.id}')">Comment</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  function render() {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    ensureFeed();

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
                <button class="text-xs font-semibold border border-slate-200 rounded-full px-3 py-1.5 hover:border-brand-300 hover:text-brand-600 transition" onclick="IELTS_FEED.toggleImageField()">🖼️ Image</button>
              </div>
              <button class="btn-primary !py-2 text-xs" onclick="IELTS_FEED.post()">Post</button>
            </div>
            <div id="feed-image-row" class="hidden mt-3">
              <div class="flex items-center gap-2">
                <input id="feed-image" type="text" placeholder="Paste an image URL (https://…)" class="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" oninput="IELTS_FEED.previewImage()" />
                <button class="text-xs font-semibold text-slate-400 hover:text-rose-600 transition shrink-0" onclick="IELTS_FEED.clearImageField()">Clear</button>
              </div>
              <div id="feed-image-preview" class="hidden mt-2"></div>
            </div>
            <p class="text-[11px] text-slate-400 mt-2">💡 Milestone chips build a progress card on your post automatically. Add a 🖼️ image to make it pop.</p>
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

    refreshFromDb();
  }

  /* pull the shared feed from Supabase in the background and re-render */
  function refreshFromDb() {
    const d = window.IELTS_DB;
    if (!d || !d.isConfigured()) return;
    d.syncFeed().then((changed) => {
      if (changed && window.__IELTS_STATE && window.__IELTS_STATE.currentSection === 'feed') render();
    });
  }

  function post() {
    const text = $('#feed-text') ? $('#feed-text').value : '';
    const image = $('#feed-image') ? $('#feed-image').value : '';
    createPost(text, null, image);
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
    if (!user) return;
    ensureFeed();
    const post = feed.find((p) => p.id === id);
    if (!post) return;
    const i = post.likes.indexOf(user.username);
    if (i >= 0) post.likes.splice(i, 1);
    else post.likes.push(user.username);
    saveFeed();
    // real UPDATE on the posts table (best-effort)
    const d = window.IELTS_DB;
    if (d && d.isConfigured()) d.updatePost(id, { likes: post.likes });
    render();
  }

  function deletePost(id) {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    ensureFeed();
    const post = feed.find((p) => p.id === id);
    if (!post || post.author !== user.username) return;
    feed = feed.filter((p) => p.id !== id);
    saveFeed();
    // real DELETE on the posts table (best-effort)
    const d = window.IELTS_DB;
    if (d && d.isConfigured()) d.deletePost(id);
    render();
    window.toast && window.toast('Post deleted');
  }

  function toggleComments(id) {
    const el = $('#comments-' + id);
    if (el) el.classList.toggle('hidden');
  }

  function addComment(id) {
    const user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return;
    ensureFeed();
    const post = feed.find((p) => p.id === id);
    const input = $('#feed-comment-' + id);
    if (!post || !input) return;
    const text = input.value.trim();
    if (!text) {
      window.toast && window.toast('Write a comment first.');
      return;
    }
    if (!post.comments) post.comments = [];
    post.comments.push({
      author: user.username,
      avatar: user.avatar || String(user.displayName || user.username).charAt(0).toUpperCase(),
      text: text.slice(0, 200),
      date: Date.now()
    });
    saveFeed();
    // real UPDATE on the posts table (best-effort)
    const d = window.IELTS_DB;
    if (d && d.isConfigured()) d.updatePost(id, { comments: post.comments });
    window.IELTS_AUTH.addActivity('feed', 'Commented on ' + post.author + "'s post", 0);
    render();
    window.toast && window.toast('Comment added 💬');
  }

  window.IELTS_FEED = { render, post, attachShare, shareProgress, toggleLike, deletePost, toggleComments, addComment, toggleImageField, previewImage, clearImageField };
})();
