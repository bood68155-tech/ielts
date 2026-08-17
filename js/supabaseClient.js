/* ============================================================
   IELTS Master — Supabase client + data-sync layer
   ------------------------------------------------------------
   Initializes the Supabase JS client from js/supabase-config.js
   and exposes `window.IELTS_DB`, a local-first CRUD layer:

   • Writes always hit localStorage first (instant + offline-safe)
     and are then pushed to Supabase in the background.
   • Reads come from the local cache and are refreshed from
     Supabase in the background ("seamless synchronization").
   • If the anon key is missing, the SDK fails to load, or the
     network is down, every operation transparently degrades to
     localStorage only — the app keeps working exactly as before.

   Tables (create them with supabase/schema.sql):
     users             – accounts (username, password hash, XP, claims)
     profiles          – display name, bio, target band, avatar, activity
     training_progress – zero-to-hero module progress (one row per user)
     exam_results      – weekly exam attempts (one row per attempt)
     posts             – shared community feed (one row per post)
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- config & client ---------------- */
  const cfg = window.SUPABASE_CONFIG || {};
  const SUPABASE_URL = cfg.url || 'https://gmmbjgjrlgibglaojflh.supabase.co';
  const PLACEHOLDER = /YOUR_|PASTE|TODO|xxx/i;

  let anonKey = cfg.anonKey || '';
  if (!anonKey || PLACEHOLDER.test(anonKey)) anonKey = '';

  const sdkLoaded = !!(window.supabase && window.supabase.createClient);
  let client = null;
  if (sdkLoaded && SUPABASE_URL && anonKey) {
    try {
      // We use Supabase purely as a PostgREST data layer (the demo
      // authentication lives in the `users` table), so we don't persist
      // an auth session on the client.
      client = window.supabase.createClient(SUPABASE_URL, anonKey, {
        auth: { persistSession: false, autoRefreshToken: false }
      });
    } catch (e) {
      client = null;
      console.warn('[IELTS_DB] Supabase init failed — running on localStorage only.', e);
    }
  }

  let online = (typeof navigator === 'undefined') ? true : navigator.onLine !== false;

  function isConfigured() { return !!client; }
  function canSync() { return isConfigured() && online; }

  /* ---------------- local cache (localStorage mirror) ---------------- */
  const CACHE_PREFIX = 'ielts-db-cache:';

  function getCache(key) {
    try {
      const raw = localStorage.getItem(CACHE_PREFIX + key);
      return raw === null ? null : JSON.parse(raw);
    } catch (e) { return null; }
  }

  function setCache(key, value) {
    try { localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }

  function removeCache(key) {
    try { localStorage.removeItem(CACHE_PREFIX + key); } catch (e) { /* ignore */ }
  }

  /* per-user sync metadata (timestamps kept outside the payloads) */
  const META_KEY = 'ielts-sync-meta';

  function getMeta(userId) {
    try {
      const all = JSON.parse(localStorage.getItem(META_KEY) || '{}');
      return all[userId] || {};
    } catch (e) { return {}; }
  }

  function setMeta(userId, patch) {
    try {
      const all = JSON.parse(localStorage.getItem(META_KEY) || '{}');
      all[userId] = Object.assign(all[userId] || {}, patch);
      localStorage.setItem(META_KEY, JSON.stringify(all));
    } catch (e) { /* ignore */ }
  }

  /* scoped keys mirror the user_<id>_<suffix> keys used by IELTS_AUTH */
  function scopedKeyOf(userId, suffix) { return 'user_' + (userId || 'guest') + '_' + suffix; }

  function readScoped(userId, suffix) {
    try {
      const raw = localStorage.getItem(scopedKeyOf(userId, suffix));
      return raw === null ? null : JSON.parse(raw);
    } catch (e) { return null; }
  }

  function writeScoped(userId, suffix, value) {
    try { localStorage.setItem(scopedKeyOf(userId, suffix), JSON.stringify(value)); } catch (e) { /* ignore */ }
  }

  /* ---------------- low-level CRUD (never throws → null on failure) ---------------- */
  async function select(table, opts) {
    if (!canSync()) return null;
    try {
      let q = client.from(table).select('*');
      opts = opts || {};
      if (opts.match) q = q.match(opts.match);
      if (opts.order) q = q.order(opts.order, { ascending: opts.ascending !== false });
      if (opts.limit) q = q.limit(opts.limit);
      const { data, error } = await q;
      if (error) { console.warn('[IELTS_DB] select ' + table + ' failed:', error.message); return null; }
      return data || [];
    } catch (e) { console.warn('[IELTS_DB] select ' + table + ' error:', e); return null; }
  }

  async function insert(table, row) {
    if (!canSync()) return null;
    try {
      const { data, error } = await client.from(table).insert(row).select();
      if (error) { console.warn('[IELTS_DB] insert ' + table + ' failed:', error.message); return null; }
      return (data && data[0]) || row;
    } catch (e) { console.warn('[IELTS_DB] insert ' + table + ' error:', e); return null; }
  }

  async function upsert(table, row, onConflict) {
    if (!canSync()) return null;
    try {
      const { data, error } = await client.from(table).upsert(row, { onConflict }).select();
      if (error) { console.warn('[IELTS_DB] upsert ' + table + ' failed:', error.message); return null; }
      return (data && data[0]) || row;
    } catch (e) { console.warn('[IELTS_DB] upsert ' + table + ' error:', e); return null; }
  }

  async function update(table, match, patch) {
    if (!canSync()) return null;
    try {
      const { data, error } = await client.from(table).update(patch).match(match).select();
      if (error) { console.warn('[IELTS_DB] update ' + table + ' failed:', error.message); return null; }
      return data || null;
    } catch (e) { console.warn('[IELTS_DB] update ' + table + ' error:', e); return null; }
  }

  async function remove(table, match) {
    if (!canSync()) return null;
    try {
      const { error } = await client.from(table).delete().match(match);
      if (error) { console.warn('[IELTS_DB] delete ' + table + ' failed:', error.message); return null; }
      return true;
    } catch (e) { console.warn('[IELTS_DB] delete ' + table + ' error:', e); return null; }
  }

  /* ---------------- users ---------------- */
  function userToRow(u) {
    return {
      id: u.userId,
      username: u.username,
      email: u.email || '',
      password_hash: u.passwordHash || '',
      xp: u.xp || 0,
      claims: u.claims || [],
      created_at: u.createdAt || Date.now(),
      updated_at: u.updatedAt || Date.now()
    };
  }

  function rowToUser(r) {
    return {
      userId: r.id,
      username: r.username,
      email: r.email || '',
      passwordHash: r.password_hash || '',
      xp: r.xp || 0,
      claims: r.claims || [],
      createdAt: r.created_at || Date.now(),
      updatedAt: r.updated_at || 0
    };
  }

  async function pullUserByUsername(username) {
    const rows = await select('users', { match: { username: String(username).trim() }, limit: 1 });
    return rows && rows.length ? rowToUser(rows[0]) : null;
  }

  async function pullUserById(id) {
    const rows = await select('users', { match: { id }, limit: 1 });
    return rows && rows.length ? rowToUser(rows[0]) : null;
  }

  async function upsertUser(user) { return upsert('users', userToRow(user), 'id'); }

  /* ---------------- profiles ---------------- */
  function profileToRow(userId, p) {
    return {
      user_id: userId,
      display_name: p.displayName || '',
      bio: p.bio || '',
      target_band: p.targetBand || '',
      avatar: p.avatar || null,
      activity: p.activity || [],
      updated_at: p.updatedAt || Date.now()
    };
  }

  async function pullProfile(userId) {
    const rows = await select('profiles', { match: { user_id: userId }, limit: 1 });
    return rows && rows.length ? {
      displayName: rows[0].display_name || '',
      bio: rows[0].bio || '',
      targetBand: rows[0].target_band || '',
      avatar: rows[0].avatar || null,
      activity: rows[0].activity || [],
      updatedAt: rows[0].updated_at || 0
    } : null;
  }

  async function upsertProfile(userId, profile) { return upsert('profiles', profileToRow(userId, profile), 'user_id'); }

  /* ---------------- training progress ---------------- */
  async function pullTraining(userId) {
    const rows = await select('training_progress', { match: { user_id: userId }, limit: 1 });
    return rows && rows.length ? rows[0] : null; // { user_id, data, updated_at }
  }

  async function upsertTraining(userId, data) {
    return upsert('training_progress', { user_id: userId, data: data || {}, updated_at: Date.now() }, 'user_id');
  }

  /* ---------------- exam results ---------------- */
  async function pullExamHistory(userId) {
    return select('exam_results', { match: { user_id: userId }, order: 'created_at', ascending: true });
  }

  async function insertExamResult(entry) {
    return insert('exam_results', {
      id: entry.id,
      user_id: entry.userId,
      week: entry.week,
      score: entry.score,
      total: entry.total,
      seconds_used: entry.secondsUsed,
      created_at: entry.date || Date.now()
    });
  }

  /* ---------------- community feed (posts) ---------------- */
  function postToRow(p) {
    return {
      id: p.id,
      author: p.author,
      avatar: p.avatar || null,
      level: p.level || '',
      text: p.text || '',
      attachment: p.attachment || null,
      likes: p.likes || [],
      comments: p.comments || [],
      system: !!p.system,
      created_at: p.date || Date.now()
    };
  }

  function rowToPost(r) {
    return {
      id: r.id,
      author: r.author,
      avatar: r.avatar,
      level: r.level || '',
      text: r.text || '',
      attachment: r.attachment || null,
      likes: r.likes || [],
      comments: r.comments || [],
      system: !!r.system,
      date: r.created_at || Date.now()
    };
  }

  async function pullPosts() {
    const rows = await select('posts', { order: 'created_at', ascending: false, limit: 200 });
    return rows ? rows.map(rowToPost) : null;
  }

  async function upsertPost(post) { return upsert('posts', postToRow(post), 'id'); }

  async function updatePost(id, patch) {
    const row = {};
    if ('likes' in patch) row.likes = patch.likes;
    if ('comments' in patch) row.comments = patch.comments;
    if ('text' in patch) row.text = patch.text;
    if (!Object.keys(row).length) return null;
    return update('posts', { id }, row);
  }

  async function deletePost(id) { return remove('posts', { id }); }

  /* official seed posts so a fresh community never looks empty */
  function seedPosts() {
    const now = Date.now();
    return [
      { id: 'seed-1', author: 'IELTS Master', avatar: 'I', level: 'Advanced', system: true,
        text: 'Welcome to the IELTS Master community! 🎉 Share your scores, ask questions and keep each other motivated on the road to your target band.',
        attachment: null, likes: [], comments: [], date: now - 2 * 86400000 },
      { id: 'seed-2', author: 'IELTS Master', avatar: 'I', level: 'Advanced', system: true,
        text: 'Tip of the week: 15 focused minutes of vocabulary every day beats a 3-hour cram on Sunday. Consistency wins. 📚',
        attachment: null, likes: [], comments: [], date: now - 86400000 }
    ];
  }

  /* ---------------- rate-limited background sync helpers ---------------- */
  const syncedFlags = {};
  function needSync(key, ttlMs) { return !syncedFlags[key] || Date.now() > syncedFlags[key]; }
  function markSynced(key, ttlMs) { syncedFlags[key] = Date.now() + (ttlMs || 20000); }

  /* merge remote exam rows into the local scoped 'exam' cache */
  async function syncExamHistory(userId) {
    if (!canSync() || !userId) return false;
    if (!needSync('exam:' + userId)) return false;
    markSynced('exam:' + userId);
    const remote = await pullExamHistory(userId);
    if (!remote) return false;
    const rows = remote.map((r) => ({
      id: r.id, week: r.week, score: r.score, total: r.total,
      secondsUsed: r.seconds_used, date: r.created_at
    }));
    const state = readScoped(userId, 'exam') || { history: [], inProgress: null };
    if (!Array.isArray(state.history)) state.history = [];
    let changed = false;
    rows.forEach((r) => {
      const dup = state.history.some((h) =>
        (h.id && h.id === r.id) ||
        (!h.id && h.week === r.week && h.score === r.score && h.date === r.date));
      if (!dup) { state.history.push(r); changed = true; }
    });
    if (changed) {
      state.history.sort((a, b) => (a.date || 0) - (b.date || 0));
      writeScoped(userId, 'exam', state);
    }
    return changed;
  }

  /* pull the active user's record + scoped data from Supabase into local caches */
  async function syncUserData(userId) {
    if (!canSync() || !userId) return false;
    let changed = false;

    // account record (XP / claims) — last-writer-wins by updated_at
    const remoteUser = await pullUserById(userId);
    const cur = window.IELTS_AUTH && window.IELTS_AUTH.getCurrentUser ? window.IELTS_AUTH.getCurrentUser() : null;
    if (remoteUser) {
      if (cur && cur.userId === userId) {
        const remoteT = remoteUser.updatedAt || 0;
        const localT = cur.updatedAt || 0;
        if (remoteT > localT) {
          cur.xp = remoteUser.xp;
          cur.claims = remoteUser.claims || cur.claims || [];
          cur.updatedAt = remoteT;
          if (window.IELTS_AUTH && window.IELTS_AUTH.save) { try { window.IELTS_AUTH.save(); } catch (e) { /* ignore */ } }
          changed = true;
        }
      }
    } else if (cur && cur.userId === userId) {
      // local account not on the server yet (e.g. registered while offline) — push it
      if (window.IELTS_AUTH && window.IELTS_AUTH.save) { try { window.IELTS_AUTH.save(); } catch (e) { /* ignore */ } }
    }

    // profile
    const remoteProfile = await pullProfile(userId);
    if (remoteProfile) {
      const localProfile = readScoped(userId, 'profile') || {};
      if (!localProfile.updatedAt || (remoteProfile.updatedAt || 0) > (localProfile.updatedAt || 0)) {
        writeScoped(userId, 'profile', {
          displayName: remoteProfile.displayName, bio: remoteProfile.bio,
          targetBand: remoteProfile.targetBand, avatar: remoteProfile.avatar,
          activity: remoteProfile.activity || [], updatedAt: remoteProfile.updatedAt
        });
        changed = true;
      }
    }

    // training progress
    const remoteTraining = await pullTraining(userId);
    if (remoteTraining && remoteTraining.data && Object.keys(remoteTraining.data).length) {
      const localTraining = readScoped(userId, 'training') || {};
      const localT = getMeta(userId).trainingUpdatedAt || 0;
      const remoteT = remoteTraining.updated_at || 0;
      if (!Object.keys(localTraining).length || remoteT > localT) {
        writeScoped(userId, 'training', remoteTraining.data);
        setMeta(userId, { trainingUpdatedAt: remoteT });
        changed = true;
      }
    }

    if (await syncExamHistory(userId)) changed = true;
    return changed;
  }

  /* community feed: remote is the source of truth; local unsynced posts are pushed first */
  async function syncFeed() {
    if (!canSync()) return false;
    if (!needSync('feed')) return false;
    markSynced('feed');
    const remote = await pullPosts();
    if (!remote) return false;

    const local = getCache('feed') || [];
    const unsynced = local.filter((p) => p._unsynced);
    unsynced.forEach((p) => { upsertPost(p); });

    let merged;
    if (!remote.length) {
      const seeds = seedPosts();
      seeds.forEach((s) => { upsertPost(s); });
      merged = seeds;
    } else {
      merged = remote.slice();
    }
    unsynced.forEach((p) => { if (!merged.some((m) => m.id === p.id)) merged.push(p); });
    merged.sort((a, b) => (b.date || 0) - (a.date || 0));
    setCache('feed', merged);
    return true;
  }

  /* pull the active user's profile into the local cache (used by profile.js) */
  async function syncProfileForActive(userId) {
    if (!canSync() || !userId) return false;
    if (!needSync('profile:' + userId, 30000)) return false;
    markSynced('profile:' + userId, 30000);
    const remote = await pullProfile(userId);
    if (!remote) return false;
    const local = readScoped(userId, 'profile') || {};
    if (!local.updatedAt || (remote.updatedAt || 0) > (local.updatedAt || 0)) {
      writeScoped(userId, 'profile', {
        displayName: remote.displayName, bio: remote.bio, targetBand: remote.targetBand,
        avatar: remote.avatar, activity: remote.activity || [], updatedAt: remote.updatedAt
      });
      return true;
    }
    return false;
  }

  /* re-run syncs for the active user + feed (used on 'online' events) */
  async function syncAllForActive() {
    const user = window.IELTS_AUTH && window.IELTS_AUTH.getCurrentUser ? window.IELTS_AUTH.getCurrentUser() : null;
    const changedUser = user ? await syncUserData(user.userId) : false;
    const changedFeed = await syncFeed();
    if ((changedUser || changedFeed) && window.IELTS_DB && window.IELTS_DB.onSynced) {
      try { window.IELTS_DB.onSynced(); } catch (e) { /* ignore */ }
    }
    return changedUser || changedFeed;
  }

  /* ---------------- public API ---------------- */
  window.IELTS_DB = {
    isConfigured, canSync,
    getCache, setCache, removeCache,
    getMeta, setMeta,
    select, insert, upsert, update, remove,
    pullUserByUsername, pullUserById, upsertUser,
    pullProfile, upsertProfile,
    pullTraining, upsertTraining,
    pullExamHistory, insertExamResult,
    pullPosts, upsertPost, updatePost, deletePost,
    syncUserData, syncExamHistory, syncFeed, syncProfileForActive, syncAllForActive,
    onSynced: null
  };

  /* re-sync everything when the connection comes back */
  if (typeof window !== 'undefined') {
    window.addEventListener('online', function () {
      online = true;
      window.IELTS_DB && window.IELTS_DB.syncAllForActive();
    });
    window.addEventListener('offline', function () { online = false; });
  }
})();
