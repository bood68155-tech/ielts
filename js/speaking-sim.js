/* ============================================================
   IELTS Master — Speaking Simulator
   Parts 1-3 with recorder, countdown timers, fluency
   checklists and Band 9 sample answers.
   ============================================================ */
(function () {
  'use strict';
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const state = { view: 'home', part: 1, qi: 0, timer: null, tsec: 0, rec: null, chk: [false, false, false], timeup: false, done: false };

  const PART1 = {
    label: 'Part 1 · Introduction & Interview (4-5 min)',
    intro: 'The examiner asks about familiar topics: home, studies, hobbies.',
    qs: [
      { q: 'Where are you from, and what do you like most about your hometown?', tip: '2-3 sentences + a reason. Don\'t memorise.', t: 25 },
      { q: 'Do you prefer to work or study in the morning or in the evening? Why?', tip: 'Give a clear preference, then explain briefly.', t: 25 },
      { q: 'What kinds of music do you enjoy?', tip: 'Name a genre plus when/where you listen.', t: 25 },
      { q: 'How often do you exercise, and what forms of exercise?', tip: 'Frequency + a concrete example.', t: 25 }
    ],
    sample: [
      { q: 'Do you prefer mornings or evenings to work?', a: 'I\'d say I\'m at my sharpest in the late morning, so I try to schedule demanding tasks then. Writing in the evening, on the other hand, tends to be a struggle because my concentration begins to dip after dinner. So mornings, definitely.' }
    ],
    check: ['Answered fluently without long pauses', 'Extended the answer beyond one sentence', 'Used natural connectors (well, actually, you know)']
  };

  const PART2 = {
    label: 'Part 2 · Cue Card (1 min prep, 2 min speak)',
    intro: 'Describe a place you have visited.',
    card: {
      prompt: 'Describe a memorable place you have visited.',
      points: ['Where it is', 'When you went there', 'What you saw and did', 'And explain why you found it memorable']
    },
    timer: { prep: 60, speak: 120 },
    tip: 'Structure: opening (where/when), two details, then the "why" with a personal example.',
    sample: { q: 'Describe a memorable place', a: 'One place that has genuinely stayed with me is the Wadi Rum desert in southern Jordan. I went there two summers ago with a small group of friends. We arrived at sunset, and the landscape — these vast red sandstone mountains rising out of flat, golden sand — was absolutely surreal. We spent the evening around a campfire under one of the clearest skies I have ever seen, and the hosts served a traditional dish slow-cooked in an underground pit. I found it memorable because it put things into perspective; in a place that immense and silent, your everyday worries shrink to almost nothing.' },
    check: ['Spoke for the full 2 minutes', 'Covered all four card prompts', 'Included a specific personal example']
  };

  const PART3 = {
    label: 'Part 3 · Two-Way Discussion (4-5 min)',
    intro: 'Abstract questions linked to the Part 2 topic. Broaden from the personal to the general.',
    qs: [
      { q: 'Why do you think tourism has become so important for many economies?', tip: 'Give 2 reasons + one example country.', t: 50 },
      { q: 'What are the negative effects of mass tourism on local communities?', tip: 'Balance: environmental and social angle.', t: 50 },
      { q: 'Should governments limit the number of tourists to protect natural areas?', tip: 'Take a clear stance + justify with a counterpoint.', t: 50 },
      { q: 'How might technology change the way we travel in the future?', tip: 'Extrapolate one trend, name a tool, give an opinion.', t: 50 }
    ],
    sample: [
      { q: 'Why has tourism become so important for many economies?', a: 'I think the main reason is that it is a low-barrier source of employment and foreign currency. A country like Jordan, for instance, has few natural resources but rich heritage sites, so tourism provides livelihoods directly for guides, hotels and restaurants, and indirectly for artisans and farmers. The multiplier effect is considerable, which is why governments invest so heavily in promoting arrivals.' }
    ],
    check: ['Answered at abstract/general level, not just personal', 'Gave reasons and examples', 'Used speculative language (could, might, tends to)']
  };

  function parts() { return [PART1, PART2, PART3]; }

  function cache() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) return null;
    let c = window.IELTS_AUTH.getScoped('speak', null);
    if (!c) { c = { done: [] }; window.IELTS_AUTH.setScoped('speak', c); }
    return window.IELTS_AUTH.getScoped('speak', null);
  }
  function save(c) { window.IELTS_AUTH.setScoped('speak', c); }

  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) window.IELTS_AUTH.onUserChange(() => { state.view = 'home'; });

  function start(part) { state.part = part; state.view = 'take'; state.qi = 0; state.chk = [false, false, false]; state.timeup = false; state.done = false; render(); }

  function tick() {
    if (state.tsec > 0) { state.tsec--; const el = $('#spk-timer'); if (el) { el.textContent = fmt(state.tsec); el.className = state.tsec <= 10 ? 'text-red-400 font-bold' : 'text-[#d4af37] font-bold'; } }
    else { stopT(); }
  }
  function fmt(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }

  function startT(sec) {
    stopT();
    state.tsec = sec;
    state.timeup = false;
    window.toast && window.toast('⏱ ' + fmt(sec) + ' — go!');
    state.timer = setInterval(tick, 1000);
  }
  function stopT() { if (state.timer) { clearInterval(state.timer); state.timer = null; } if (state.tsec === 0 && !state.done) { state.timeup = true; } }

  function next() {
    const P = parts()[state.part - 1];
    if (state.part === 2) { if (!state.timeup) startT(P.timer.speak); else stopT(); }
    if (state.qi < (P.qs ? P.qs.length - 1 : 0)) { state.qi++; state.timeup = false; startT(state.part === 1 ? P.qs[state.qi].t : 120); render(); }
    else finish();
  }

  function finish() {
    const c = cache();
    const P = parts()[state.part - 1];
    const score = state.chk.filter(Boolean).length / state.chk.length;
    const ok = !c.done.includes(state.part) && state.chk.filter(Boolean).length >= 2;
    if (ok) {
      c.done.push(state.part);
      save(c);
      window.IELTS_AUTH.completeClaim('speak-' + state.part) && window.IELTS_AUTH.addXp(15);
      window.IELTS_AUTH.addActivity('speaking', 'Speaking Part ' + state.part + ' complete', 15);
      window.toast && window.toast('+15 XP!');
    }
    if (window.IELTS_BAND && window.IELTS_BAND.recordMastery) window.IELTS_BAND.recordMastery('speaking', Math.round((state.chk.filter(Boolean).length / state.chk.length) * 100));
    if (window.IELTS_DIAG && window.IELTS_DIAG.record) {
      window.IELTS_DIAG.record('speaking', 'Speaking Part ' + state.part + ' self-assessment', state.chk.filter(Boolean).length, state.chk.length);
    }
    state.done = true;
    render();
  }

  function toggleCheck(i, v) { state.chk[i] = v; render(); }

  function startRec() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { window.toast && window.toast('Recording not supported in this browser.'); return; }
    const btn = $('#spk-rec');
    if (state.rec) {
      try { state.rec.stop(); } catch (e) {}
      state.rec = null;
      if (btn) btn.textContent = '🎙 Record';
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      state.rec = new MediaRecorder(stream);
      state.rec.start();
      if (btn) btn.textContent = '⏹ Stop';
      window.toast && window.toast('🔴 Recording…');
    }).catch(() => { window.toast && window.toast('Microphone blocked or unavailable.'); });
  }
  function stopRec() { if (state.rec) { try { state.rec.stop(); } catch (e) {} state.rec = null; window.toast && window.toast('✓ Recording saved for this session.'); } }

  function pickSample(P) {
    const s = P.sample && P.sample[0];
    if (!s) return '';
    return '<div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-4 mt-5"><p class="text-xs font-bold text-[#d4af37] mb-1">BAND 9 SAMPLE</p><p class="text-sm text-[#f5f0e6]/75 leading-relaxed">' + esc(s.q ? s.q + ' — ' : '') + esc(s.a) + '</p></div>';
  }

  function render() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) { window.IELTS_AUTH.showScreen(); return; }
    const c = cache();
    if (state.view === 'take') return renderTake();
    $('#speaking-sim-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <h2 class="text-2xl font-extrabold text-[#f5f0e6]">🎙️ Speaking Simulator</h2>
        <p class="text-sm text-[#f5f0e6]/60 mt-1">Parts 1-3 with timers, recorder and fluency checklists.</p>
        <p class="text-xs text-[#d4af37] mt-2">Completed: ${c.done.map((p) => 'Part ' + p).join(' · ') || 'none yet'}</p>
      </div>
      <div class="grid md:grid-cols-3 gap-4 md:mb-4">
        ${parts().map((P, i) => `
          <button class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.2)] hover:border-[rgba(212,175,55,0.5)] rounded-xl p-6 text-left transition-all" onclick="IELTS_SPEAKING_SIM.start(${i + 1})">
            <p class="text-3xl mb-2">${i + 1 === 1 ? '🗣️' : i + 1 === 2 ? '🎴' : '💬'}</p>
            <p class="font-bold text-[#f5f0e6]">${esc(P.label.split('·')[0].trim())}</p>
            <p class="text-xs text-[#f5f0e6]/60 mt-1">${i + 1 === 2 ? '1 min prep + 2 min speak' : P.qs.length + ' questions'}</p>
            <p class="text-xs text-[#f5f0e6]/40 mt-2">${c.done.includes(i + 1) ? '✅ Done' : '<span class="text-[#d4af37]">Not attempted</span>'}</p>
          </button>`).join('')}
      </div>`;
  }

  function renderTake() {
    const P = parts()[state.part - 1];
    const is2 = state.part === 2;
    $('#speaking-sim-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs font-bold text-[#d4af37]">${esc(P.label)}</p>
            <h3 class="text-xl font-extrabold text-[#f5f0e6] mt-1">${is2 ? esc(P.card.prompt) : 'Question ' + (state.qi + 1) + (P.qs ? ' of ' + P.qs.length : '')}</h3>
          </div>
          <div class="flex items-center gap-4">
            <span id="spk-timer" class="text-[#d4af37] font-bold text-lg">${state.timeup ? '0:00' : fmt(state.tsec)}</span>
            <button id="spk-rec" class="btn-secondary text-sm" onclick="IELTS_SPEAKING_SIM.togrec()">🎙 Record</button>
          </div>
        </div>
        <p class="text-sm text-[#f5f0e6]/75 mt-3">
          ${is2
            ? `<span class="text-[#f5f0e6]/50">Card:</span> <br>${P.card.points.map((x, i) => '<span class="text-[#d4af37]">' + (i + 1) + '.</span> ' + esc(x) + '<br>').join('')}`
            : esc(P.qs[state.qi].q)}
        </p>
        <p class="text-xs text-[#f5f0e6]/50 mt-3">💡 ${esc(is2 ? P.tip : P.qs[state.qi].tip)}</p>
        ${state.timeup && !state.done ? '<p class="text-xs text-red-400 mt-2">⏰ Time\'s up! Move on or retry.</p>' : ''}
        ${!state.timeup && !is2 ? `<button class="btn-primary text-sm mt-4" onclick="IELTS_SPEAKING_SIM.timer(${P.qs[state.qi].t})">⏱ Restart timer</button>` : ''}
      </div>
      ${is2 ? `<div class="flex flex-wrap gap-3 mb-4">
        <button class="btn-secondary text-sm" onclick="IELTS_SPEAKING_SIM.prep()">📝 1-min Prep</button>
        <button class="btn-primary text-sm" onclick="IELTS_SPEAKING_SIM.speak()">🎤 2-min Speak</button>
      </div>` : ''}
      ${pickSample(P)}
      ${state.done ? `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mt-6">
        <p class="text-lg font-extrabold text-[#f5f0e6] mb-3">Fluency Self-Check</p>
        ${P.check.map((x, i) => `
          <label class="flex items-center gap-3 mb-2 cursor-pointer">
            <input type="checkbox" ${state.chk[i] ? 'checked' : ''} onchange="IELTS_SPEAKING_SIM.check(${i}, this.checked)" class="accent-[#d4af37]" />
            <span class="text-sm text-[#f5f0e6]/80">${esc(x)}</span>
          </label>`).join('')}
        <div class="flex gap-3 mt-5">
          <button class="btn-primary text-sm" onclick="IELTS_SPEAKING_SIM.next()">${state.qi < (P.qs ? P.qs.length - 1 : 0) ? 'Next question →' : 'Finish & Award XP'}</button>
          <button class="btn-secondary text-sm" onclick="IELTS_SPEAKING_SIM.back()">← Back</button>
        </div>
      </div>` : ''}
      ${!state.done ? `<div class="flex justify-between mt-4">
        <button class="btn-secondary text-sm" onclick="IELTS_SPEAKING_SIM.back()">← Back</button>
        <button class="btn-primary text-sm" onclick="IELTS_SPEAKING_SIM.next()">${state.part !== 2 && state.qi === (P.qs.length - 1) ? 'Finish ↑' : 'Next question →'}</button>
      </div>` : ''}`;
  }

  function prep() { startT(PART2.timer.prep); window.toast && window.toast('Note-taking time: 60 seconds.'); }
  function speak() { startT(PART2.timer.speak); }

  function back() { stopRec(); stopT(); state.view = 'home'; state.done = false; render(); }

  window.IELTS_SPEAKING_SIM = { render, start, next, check: toggleCheck, torec: startRec, timer: startT, prep, speak, back };
})();