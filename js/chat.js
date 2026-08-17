/* ============================================================
   IELTS Master — real-time chat & community support
   Three rooms:
     • community — open chat for every learner
     • support   — official IELTS Master support (canned replies)
     • dm:<a>:<b> — learner-to-learner direct messages
   With Supabase configured, messages live in the chat_messages
   table and arrive in real time via postgres_changes. Without it,
   the app falls back to a shared local cache with polling, so the
   chat still works fully offline.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const ROOMS = {
    community: { label: 'Community room', icon: '🌍', desc: 'Chat with every learner — ask questions, share tips, celebrate wins.' },
    support: { label: 'Official support', icon: '🎧', desc: 'Ask the IELTS Master team anything about the app, levels or exams.' },
    dms: { label: 'Direct messages', icon: '💌', desc: 'Message another learner one-to-one.' }
  };

  const SUPPORT_BOT = 'IELTS Master';
  let activeTab = 'community';
  let dmUser = null;
  let messages = {};   // room -> [msg]
  let subscription = null;
  let pollTimer = null;
  let dirtyRooms = {}; // rooms with messages not yet pushed to the db

  /* ---------- helpers ---------- */
  function me() {
    const user = window.IELTS_AUTH.getCurrentUser();
    return user || null;
  }

  function myAvatar() {
    const user = me();
    return user ? (user.avatar || String(user.displayName || user.username).charAt(0).toUpperCase()) : '?';
  }

  function isOfficial(m) {
    return m.sender === SUPPORT_BOT || m.kind === 'system' || m.kind === 'answer';
  }

  function roomKeyOf(room) {
    if (room === 'community' || room === 'support') return room;
    if (room.indexOf('dm:') === 0) return room;
    return 'community';
  }

  function dmRoom(userA, userB) {
    return 'dm:' + [userA, userB].sort().join(':');
  }

  function fmtTime(ts) {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function fmtDay(ts) {
    return new Date(ts).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }

  /* ---------- storage: shared local cache per room ---------- */
  function loadRoom(room) {
    const cached = (window.IELTS_DB && window.IELTS_DB.getCache('chat:' + roomKeyOf(room))) || [];
    return cached.map((m) => { m.kind = m.kind || 'message'; return m; });
  }

  function saveRoom(room) {
    if (window.IELTS_DB && messages[room]) {
      window.IELTS_DB.setCache('chat:' + roomKeyOf(room), messages[room]);
    }
  }

  function ensureRoom(room) {
    if (!messages[room]) {
      messages[room] = loadRoom(room);
      if (!messages[room].length && room === 'support') {
        messages[room] = [
          { id: 'sup-hello', room, sender: SUPPORT_BOT, senderAvatar: '🎧', kind: 'system',
            text: 'Welcome to IELTS Master support! 👋 Ask us anything about the app — how levels work, how to unlock content, or how to sync your progress with Supabase. We usually reply within a few minutes.',
            date: Date.now() - 60000 }
        ];
        saveRoom(room);
      }
    }
    return messages[room];
  }

  /* ---------- realtime ---------- */
  function subscribe(room) {
    if (subscription) { try { subscription(); } catch (e) { /* ignore */ } subscription = null; }
    const d = window.IELTS_DB;
    if (!d || !d.isConfigured()) return;
    const unsub = d.subscribeChat(roomKeyOf(room), (msg) => {
      const target = msg.room || room;
      if (!messages[target]) messages[target] = ensureRoom(target);
      if (!messages[target].some((m) => m.id === msg.id)) {
        messages[target].push(msg);
        messages[target].sort((a, b) => (a.date || 0) - (b.date || 0));
        saveRoom(target);
      }
      if (target === currentRoom() && window.__IELTS_STATE && window.__IELTS_STATE.currentSection === 'chat') {
        renderMessages();
      }
    });
    if (unsub) subscription = unsub;
  }

  function currentRoom() {
    if (activeTab === 'dms') return dmUser ? dmRoom(me().username, dmUser.username) : null;
    return activeTab;
  }

  function startPolling() {
    stopPolling();
    pollTimer = setInterval(() => {
      const room = currentRoom();
      if (!room) return;
      const d = window.IELTS_DB;
      if (d && d.isConfigured() && subscription) return; // realtime is live
      refreshFromDb(room);
    }, 4000);
  }

  function stopPolling() {
    clearInterval(pollTimer);
    pollTimer = null;
  }

  /* pull a room's messages from Supabase and merge (fallback + first load) */
  function refreshFromDb(room) {
    const d = window.IELTS_DB;
    if (!d || !d.isConfigured()) return;
    d.pullChatMessages(roomKeyOf(room)).then((remote) => {
      if (!remote) return;
      const local = ensureRoom(room);
      let changed = false;
      remote.forEach((m) => {
        if (!local.some((x) => x.id === m.id)) { local.push(m); changed = true; }
      });
      if (changed) {
        local.sort((a, b) => (a.date || 0) - (b.date || 0));
        saveRoom(room);
        if (room === currentRoom() && window.__IELTS_STATE && window.__IELTS_STATE.currentSection === 'chat') renderMessages();
      }
    });
  }

  /* ---------- sending ---------- */
  function send() {
    const input = $('#chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) { window.toast && window.toast('Write a message first.'); return; }
    const user = me();
    if (!user) return;
    const room = currentRoom();
    if (!room) return;

    const msg = {
      id: 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      room,
      sender: user.username,
      senderAvatar: myAvatar(),
      kind: 'message',
      text: text.slice(0, 500),
      date: Date.now()
    };
    const list = ensureRoom(room);
    list.push(msg);
    saveRoom(room);
    input.value = '';
    renderMessages();
    scrollToBottom();

    // push to Supabase (best-effort)
    const d = window.IELTS_DB;
    if (d && d.isConfigured()) {
      d.insertChatMessage(msg).catch(() => {});
    } else {
      dirtyRooms[room] = true;
    }
    window.IELTS_AUTH.addActivity('chat', 'Sent a message in ' + roomLabel(room), 0);

    // official support: canned reply after a short pause
    if (room === 'support') scheduleSupportReply(user.username);
  }

  function scheduleSupportReply(username) {
    const dayKey = new Date().toDateString();
    const replied = window.IELTS_AUTH.getScoped('support-reply-' + dayKey, false);
    if (replied) return;
    setTimeout(() => {
      if (window.IELTS_AUTH.getScoped('support-reply-' + dayKey, false)) return;
      const user = me();
      if (!user || user.username !== username) return;
      const room = 'support';
      const list = ensureRoom(room);
      list.push({
        id: 'sr' + Date.now().toString(36),
        room,
        sender: SUPPORT_BOT,
        senderAvatar: '🎧',
        kind: 'answer',
        text: pickSupportReply(),
        date: Date.now()
      });
      saveRoom(room);
      window.IELTS_AUTH.setScoped('support-reply-' + dayKey, true);
      const d = window.IELTS_DB;
      if (d && d.isConfigured()) {
        d.insertChatMessage(list[list.length - 1]).catch(() => {});
      }
      if (activeTab === 'support' && window.__IELTS_STATE && window.__IELTS_STATE.currentSection === 'chat') {
        renderMessages();
        scrollToBottom();
        window.toast && window.toast('🎧 IELTS Master support replied');
      }
    }, 2200);
  }

  const SUPPORT_REPLIES = [
    'Thanks for reaching out! 💙 Quick answer: your XP, words, study hours and exam history all sync to Supabase when the publishable key is configured — otherwise they stay safely in your browser (localStorage).',
    'Good question! Levels go from A1 to C2 and unlock as you earn XP. Complete graded readings, weekly exams and training stages to level up faster. 📈',
    'Tip: tap any highlighted word inside Level Reading to see its translation and save it straight to My Words. Then review it as a flashcard. 📒',
    'If a section looks locked 🔒, you just need more XP for the next CEFR level — check the 📈 Levels page to see exactly how far you are.',
    'To get the real-time chat working across devices, make sure you ran supabase/schema.sql in your Supabase SQL editor and that the anon key in js/supabase-config.js is set. Then messages sync live! 🚀'
  ];
  let replyIdx = 0;
  function pickSupportReply() {
    const r = SUPPORT_REPLIES[replyIdx % SUPPORT_REPLIES.length];
    replyIdx++;
    return r;
  }

  function roomLabel(room) {
    if (room === 'community') return 'the community room';
    if (room === 'support') return 'official support';
    const parts = room.split(':');
    return 'DM with ' + parts[1] + ' and ' + parts[2];
  }

  /* ---------- user list for DMs ---------- */
  function allUsers() {
    const out = [];
    try {
      const local = JSON.parse(localStorage.getItem('ielts-users') || '[]');
      local.forEach((u) => out.push({ username: u.username, avatar: u.avatar || null, xp: u.xp || 0 }));
    } catch (e) { /* ignore */ }
    const d = window.IELTS_DB;
    if (d && d.isConfigured()) {
      d.pullAllUsers().then((remote) => {
        if (!remote) return;
        remote.forEach((u) => {
          if (!out.some((x) => x.username === u.username)) out.push({ username: u.username, avatar: u.avatar || null, xp: u.xp || 0 });
        });
        if (activeTab === 'dms' && window.__IELTS_STATE && window.__IELTS_STATE.currentSection === 'chat') render();
      });
    }
    return out;
  }

  /* ---------- render ---------- */
  function render() {
    const user = me();
    if (!user) return;

    const tabs = ['community', 'support', 'dms'].map((t) => `
      <button class="tab-pill ${activeTab === t ? 'active' : ''}" onclick="IELTS_CHAT.switchTab('${t}')">${ROOMS[t].icon} ${ROOMS[t].label}</button>`).join('');

    $('#chat-content').innerHTML = `
      <div class="flex flex-wrap gap-2 mb-5">${tabs}</div>
      <div id="chat-panel"></div>`;

    if (activeTab === 'dms') renderDmPicker();
    else { renderThread(); renderMessages(); }

    startPolling();
    // live updates for the room that is open right now
    const room = currentRoom();
    if (room) {
      refreshFromDb(room);
      subscribe(room);
    }
  }

  function renderDmPicker() {
    const user = me();
    const panel = $('#chat-panel');
    if (!panel) return;
    const others = allUsers().filter((u) => u.username !== user.username);
    const sorted = others.slice().sort((a, b) => a.username.localeCompare(b.username));

    panel.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p class="font-bold text-slate-900 mb-1">Choose a learner to message</p>
        <p class="text-sm text-slate-500 mb-4">${ROOMS.dms.desc} Direct messages are private between you and the other learner.</p>
        ${sorted.length ? `
          <div class="grid sm:grid-cols-2 gap-2.5">
            ${sorted.map((u) => `
              <button class="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 hover:border-brand-300 hover:bg-brand-50/40 transition text-left" onclick="IELTS_CHAT.openDm('${esc(u.username).replace(/'/g, "\\'")}')">
                <div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-indigo-400 text-white flex items-center justify-center font-extrabold text-sm shrink-0">${esc(u.avatar || String(u.username).charAt(0).toUpperCase())}</div>
                <div class="min-w-0">
                  <p class="text-sm font-bold text-slate-800 truncate">${esc(u.username)}</p>
                  <p class="text-[11px] text-slate-400">${(u.xp || 0)} XP</p>
                </div>
                <span class="ml-auto text-brand-600 text-sm font-bold">💬</span>
              </button>`).join('')}
          </div>` : `
          <div class="text-center py-8 text-sm text-slate-500">
            <p class="text-3xl mb-2">💌</p>
            <p>No other learners found yet.<br/>Share your username so friends can message you — or head to the Community room to meet people.</p>
          </div>`}
      </div>`;
  }

  function renderThread() {
    const panel = $('#chat-panel');
    if (!panel) return;
    const room = activeTab;
    ensureRoom(room);
    panel.innerHTML = `
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col" style="height: min(65vh, 640px)">
        <div class="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-brand-600 to-indigo-500 text-white">
          <p class="font-extrabold">${ROOMS[room].icon} ${ROOMS[room].label}</p>
          <p class="text-xs text-brand-100 mt-0.5">${ROOMS[room].desc} ${room === 'support' ? '· replies come from the IELTS Master team 🎧' : ''}</p>
        </div>
        <div id="chat-messages" class="flex-1 overflow-y-auto px-4 py-4 space-y-1 bg-slate-50/60"></div>
        <div class="flex items-center gap-2 px-4 py-3 border-t border-slate-100 bg-white">
          <input id="chat-input" type="text" maxlength="500" placeholder="Type a message…" class="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" onkeydown="if (event.key === 'Enter') IELTS_CHAT.send()" />
          <button class="btn-primary" onclick="IELTS_CHAT.send()">Send ➤</button>
        </div>
      </div>`;
  }

  function messageHtml(m) {
    const user = me();
    const mine = user && m.sender === user.username;
    if (isOfficial(m)) {
      return `
        <div class="flex justify-center my-2">
          <div class="max-w-[85%] bg-white border border-brand-100 rounded-2xl px-4 py-2.5 shadow-sm">
            <p class="text-[10px] font-bold text-brand-600 mb-0.5">🎧 ${esc(m.sender)}</p>
            <p class="text-sm text-slate-700 leading-relaxed">${esc(m.text)}</p>
            <p class="text-[10px] text-slate-400 mt-1 text-right">${fmtTime(m.date)}</p>
          </div>
        </div>`;
    }
    return `
      <div class="flex ${mine ? 'justify-end' : 'justify-start'} my-1.5">
        <div class="flex items-end gap-2 max-w-[80%] ${mine ? 'flex-row-reverse' : ''}">
          <div class="w-7 h-7 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 text-white flex items-center justify-center font-extrabold text-xs shrink-0">${esc(m.senderAvatar || String(m.sender).charAt(0).toUpperCase())}</div>
          <div class="${mine ? 'bg-brand-600 text-white rounded-2xl rounded-br-md' : 'bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-md'} px-3.5 py-2 shadow-sm">
            ${mine ? '' : '<p class="text-[10px] font-bold text-slate-500 mb-0.5">' + esc(m.sender) + '</p>'}
            <p class="text-sm leading-relaxed">${esc(m.text)}</p>
            <p class="text-[10px] mt-1 ${mine ? 'text-brand-200' : 'text-slate-400'} text-right">${fmtTime(m.date)}</p>
          </div>
        </div>
      </div>`;
  }

  function renderMessages() {
    const box = $('#chat-messages');
    if (!box) return;
    const room = currentRoom();
    if (!room) return;
    const list = ensureRoom(room);
    if (!list.length) {
      box.innerHTML = '<p class="text-center text-sm text-slate-400 py-10">No messages yet — start the conversation! 💬</p>';
      return;
    }
    // day separators
    let lastDay = '';
    let html = '';
    list.forEach((m) => {
      const day = fmtDay(m.date);
      if (day !== lastDay) {
        html += '<div class="flex justify-center my-3"><span class="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded-full">' + day + '</span></div>';
        lastDay = day;
      }
      html += messageHtml(m);
    });
    box.innerHTML = html;
    scrollToBottom();
  }

  function scrollToBottom() {
    const box = $('#chat-messages');
    if (box) box.scrollTop = box.scrollHeight;
  }

  /* ---------- tab & dm switching ---------- */
  function switchTab(tab) {
    activeTab = tab;
    dmUser = null;
    if (subscription) { try { subscription(); } catch (e) { /* ignore */ } subscription = null; }
    render();
    const room = currentRoom();
    if (room) {
      refreshFromDb(room);
      subscribe(room);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openDm(username) {
    const user = me();
    const others = allUsers();
    const target = others.find((u) => u.username === username);
    if (!target) return;
    dmUser = target;
    activeTab = 'dms';
    if (subscription) { try { subscription(); } catch (e) { /* ignore */ } subscription = null; }
    renderThread();
    const room = currentRoom();
    if (room) {
      ensureRoom(room);
      renderMessages();
      refreshFromDb(room);
      subscribe(room);
    }
  }

  /* switching users leaves the chat cleanly */
  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) {
    window.IELTS_AUTH.onUserChange(() => {
      stopPolling();
      if (subscription) { try { subscription(); } catch (e) { /* ignore */ } subscription = null; }
      messages = {};
    });
  }

  window.IELTS_CHAT = { render, switchTab, openDm, send };
})();
