/* ============================================================
   IELTS Master — Automated Diagnostic Band Analytics & Report Engine
   Tracks per-skill accuracy across every assessment module, computes
   an estimated IELTS band, and renders an interactive diagnostic
   performance report (radar, strengths/weaknesses, Band 9 action plan).
   Data is stored per active user under a user-scoped key and mirrored
   to the `diagnostics` table in Supabase/Neon when configured.
   ============================================================ */
(function () {
  'use strict';

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const SKILLS = [
    { key: 'reading', label: 'Reading', icon: '📖', section: 'reading-master', alt: 'quiz-hub', tip: 'Skim for gist, scan for detail, track paragraph purpose.' },
    { key: 'listening', label: 'Listening', icon: '🎧', section: 'listening-master', alt: 'quiz-hub', tip: 'Predict answers from wording, watch for synonyms and paraphrases.' },
    { key: 'vocabulary', label: 'Vocabulary', icon: '📚', section: 'awl', alt: 'vocab-trainer', tip: 'Drill AWL words in context with collocations and spaced repetition.' },
    { key: 'writing', label: 'Writing', icon: '✍️', section: 'writing-coach', alt: 'wss', tip: 'Always hit the word count and tick every Task Achievement checklist box.' },
    { key: 'speaking', label: 'Speaking', icon: '🗣️', section: 'speaking-sim', alt: 'wss', tip: 'Extend answers with reasons, examples and linking phrases.' }
  ];
  const SKILL_INDEX = {};
  SKILLS.forEach((s, i) => { SKILL_INDEX[s.key] = i; });

  const THEME = { panel: 'rgba(15,23,42,0.85)', gold: '#d4af37', text: '#f5f0e6', muted: 'rgba(245,240,230,0.6)' };

  // ------------------------------------------------------------------
  // Storage (scoped key auto-mirrors to Supabase/Neon via setScoped)
  // ------------------------------------------------------------------
  function cache() {
    try { return window.IELTS_AUTH.getScoped('diagnostics', { history: [] }) || { history: [] }; }
    catch (e) { return { history: [] }; }
  }
  function save(c) { try { window.IELTS_AUTH.setScoped('diagnostics', c); } catch (e) { /* offline */ } }

  // ------------------------------------------------------------------
  // Band estimation (accuracy % -> IELTS band on the 0.5 scale)
  // ------------------------------------------------------------------
  function bandFromPct(pct) {
    if (pct >= 92) return 9.0;
    if (pct >= 85) return 8.5;
    if (pct >= 78) return 8.0;
    if (pct >= 70) return 7.5;
    if (pct >= 62) return 7.0;
    if (pct >= 55) return 6.5;
    if (pct >= 48) return 6.0;
    if (pct >= 42) return 5.5;
    if (pct >= 35) return 5.0;
    if (pct >= 28) return 4.5;
    return 4.0;
  }

  // ------------------------------------------------------------------
  // Core writer — called by every assessment module on completion
  // ------------------------------------------------------------------
  function record(skill, label, correct, total, opts) {
    opts = opts || {};
    if (!window.IELTS_AUTH || !window.IELTS_AUTH.getCurrentUser()) return null;
    if (!total || typeof correct !== 'number') return null;
    const pct = Math.max(0, Math.min(100, Math.round((correct / total) * 100)));
    const entry = {
      t: Date.now(),
      skill: String(skill).toLowerCase(),
      label: String(label || skill).slice(0, 70),
      correct: Math.max(0, correct),
      total: total,
      pct: pct,
      band: opts.band || bandFromPct(pct),
      qtypes: opts.qtypes || null
    };
    const c = cache();
    const hist = c.history || [];
    const last = hist[hist.length - 1];
    // de-dupe: identical result within 25s (protects against re-renders)
    if (last && last.skill === entry.skill && last.label === entry.label &&
        last.pct === pct && Math.abs(last.t - entry.t) < 25000) return last;
    hist.push(entry);
    if (hist.length > 160) c.history = hist.slice(hist.length - 160);
    save(c);
    return entry;
  }

  // ------------------------------------------------------------------
  // Aggregation
  // ------------------------------------------------------------------
  function skillStat(hist, key) {
    const rows = hist.filter((h) => h.skill === key);
    if (!rows.length) return null;
    const latest = rows[rows.length - 1];
    const totalCorrect = rows.reduce((n, r) => n + r.correct, 0);
    const totalQs = rows.reduce((n, r) => n + r.total, 0);
    const avg = totalQs ? Math.round((totalCorrect / totalQs) * 100) : 0;
    const best = Math.max.apply(null, rows.map((r) => r.pct));
    return { key, avg, latest: latest.pct, best, attempts: rows.length, band: bandFromPct(avg) };
  }

  function qtypeWeaknesses(hist) {
    const map = {};
    (hist || []).forEach((h) => {
      if (!h.qtypes) return;
      Object.keys(h.qtypes).forEach((k) => {
        const g = h.qtypes[k];
        map[k] = map[k] || { correct: 0, total: 0 };
        map[k].correct += g.correct;
        map[k].total += g.total;
      });
    });
    return Object.keys(map)
      .map((k) => ({ key: k, correct: map[k].correct, total: map[k].total, pct: Math.round((map[k].correct / map[k].total) * 100) }))
      .filter((g) => g.pct < 60)
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 3);
  }

  function snapshot() {
    const hist = cache().history || [];
    const stats = SKILLS.map((s) => skillStat(hist, s.key)).filter(Boolean);
    const overallPct = stats.length ? Math.round(stats.reduce((n, s) => n + s.avg, 0) / stats.length) : 0;
    const overallBand = stats.length ? bandFromPct(overallPct) : 0;
    const strengths = stats.filter((s) => s.avg >= 60).sort((a, b) => b.avg - a.avg).slice(0, 2);
    const weaknesses = stats.filter((s) => s.avg < 60).sort((a, b) => a.avg - b.avg).slice(0, 3);
    const assessCount = hist.length;
    const targetBand = (() => {
      try { return window.IELTS_AUTH.getScoped('profile', {}).targetBand || ''; } catch (e) { return ''; }
    })();
    return { hist, stats, overallPct, overallBand, strengths, weaknesses, qtypes: qtypeWeaknesses(hist), assessCount, targetBand };
  }

  // ------------------------------------------------------------------
  // Radar chart (hand-rolled SVG — no charting library in the app)
  // ------------------------------------------------------------------
  function radarSVG(stats, size) {
    size = size || 280;
    const cx = size / 2, cy = size / 2;
    const R = size / 2 - 34;
    const n = SKILLS.length;
    const vals = SKILLS.map((s) => {
      const st = stats.find((x) => x.key === s.key);
      return st ? st.avg : 0;
    });
    const pt = (i, v) => {
      const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
      const r = R * (Math.max(0, Math.min(100, v)) / 100);
      return [Math.round(cx + r * Math.cos(a)), Math.round(cy + r * Math.sin(a))];
    };
    const ring = (v) => SKILLS.map((s, i) => pt(i, v).join(',')).join(' ');
    let svg = '<svg viewBox="0 0 ' + size + ' ' + size + '" class="w-full max-w-[320px] mx-auto" role="img" aria-label="Skill accuracy radar">';
    svg += '<polygon points="' + ring(100) + '" fill="none" stroke="rgba(212,175,55,0.18)" stroke-width="1"/>';
    [20, 40, 60, 80].forEach((v) => {
      svg += '<polygon points="' + ring(v) + '" fill="none" stroke="rgba(212,175,55,0.18)" stroke-width="1"/>';
      if (v === 20) {
        SKILLS.forEach((s, i) => {
          const p = pt(i, v);
          svg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p[0] + '" y2="' + p[1] + '" stroke="rgba(212,175,55,0.12)" stroke-width="1"/>';
        });
      }
    });
    const dataPts = SKILLS.map((s, i) => pt(i, vals[i]));
    const dataPoly = dataPts.map((p) => p.join(',')).join(' ');
    svg += '<polygon points="' + dataPoly + '" fill="rgba(212,175,55,0.25)" stroke="#d4af37" stroke-width="2" stroke-linejoin="round"/>';
    dataPts.forEach((p, i) => {
      svg += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.5" fill="#f5f0e6" stroke="#d4af37" stroke-width="1.5"/>';
    });
    SKILLS.forEach((s, i) => {
      const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
      const cos = Math.cos(a);
      const lx = cx + (R + 22) * cos;
      const ly = cy + (R + 22) * Math.sin(a);
      const anchor = i === 0 ? 'middle' : (cos < -0.2 ? 'end' : 'start');
      const dx = i === 0 ? 0 : (cos < -0.2 ? -4 : 4);
      const dyLy = ly + (i === 0 ? -4 : i >= 3 ? 4 : 0);
      svg += '<text x="' + lx + '" y="' + dyLy + '" text-anchor="' + anchor + '" dx="' + dx + '" class="text-[10px] font-bold" fill="rgba(245,240,230,0.85)" style="font-size:11px">' + s.label + '</text>';
      const vp = pt(i, vals[i]);
      const vr = R * (Math.max(0, Math.min(100, vals[i])) / 100);
      if (vals[i] > 0) {
        const tx = cx + (vr - 12) * cos;
        const ty = cy + (vr - 12) * Math.sin(a);
        svg += '<text x="' + tx + '" y="' + ty + '" text-anchor="middle" fill="#d4af37" style="font-size:10px;font-weight:bold">' + vals[i] + '%</text>';
      }
    });
    svg += '</svg>';
    return svg;
  }

  // ------------------------------------------------------------------
  // Band trend sparkline (estimated band per assessment over time)
  // ------------------------------------------------------------------
  function trendSparkline() {
    const bands = (cache().history || []).map((h) => h.band);
    if (bands.length < 2) return null;
    const w = 260, h = 64, pad = 10, minB = 4, maxB = 9;
    const X = (i) => bands.length === 1 ? w / 2 : pad + (i * (w - pad * 2)) / (bands.length - 1);
    const Y = (b) => h - pad - ((Math.max(minB, Math.min(maxB, b)) - minB) / (maxB - minB)) * (h - pad * 2);
    const pts = bands.map((b, i) => [Math.round(X(i)), Math.round(Y(b))]);
    const line = pts.map((p) => p.join(',')).join(' ');
    const area = line + ' ' + (w - pad) + ',' + h + ' ' + pad + ',' + h;
    return { line, area, first: bands[0], last: bands[bands.length - 1], max: Math.max.apply(null, bands) };
  }

  // ------------------------------------------------------------------
  // Skill progress bars
  // ------------------------------------------------------------------
  function skillBars(stats) {
    if (!stats.length) return '';
    return stats.map((s) => {
      const m = SKILLS[SKILL_INDEX[s.key]];
      return '<div class="mb-3">' +
        '<div class="flex items-center justify-between text-xs mb-1">' +
        '<span class="font-semibold text-[#f5f0e6]">' + m.icon + ' ' + escapeSkill(m.label) + '</span>' +
        '<span class="text-[#f5f0e6]/70">' + s.avg + '% · Band ' + s.band.toFixed(1) + ' · ' + s.attempts + ' attempt' + (s.attempts === 1 ? '' : 's') + '</span>' +
        '</div>' +
        '<div class="h-2.5 bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.2)] rounded-full overflow-hidden">' +
        '<div class="h-full rounded-full transition-all" style="width:' + s.avg + '%;background:linear-gradient(90deg,' + (s.avg >= 70 ? '#22c55e' : s.avg >= 60 ? '#d4af37' : '#f87171') + ',rgba(212,175,55,0.55))"></div>' +
        '</div></div>';
    }).join('');
  }
  function escapeSkill(l) { return esc(l); }

  // ------------------------------------------------------------------
  // Action plan with direct study links
  // ------------------------------------------------------------------
  function actionPlan(stats, weaknesses, overallBand) {
    if (!stats.length) {
      return {
        summary: 'Complete your first assessment in any skill to unlock an estimated band and a personalised Band 9 plan.',
        steps: SKILLS.map((s) => ({
          icon: s.icon, title: 'Take a ' + s.label + ' assessment',
          tip: s.tip, btn: 'Start ' + s.label, section: s.section, alt: s.alt
        }))
      };
    }
    const steps = [];
    const used = {};
    weaknesses.forEach((w) => {
      const m = SKILLS[SKILL_INDEX[w.key]];
      if (used[w.key]) return;
      used[w.key] = true;
      steps.push({
        icon: m.icon,
        title: 'Priority 1 — Strengthen ' + m.label + ' (Band ' + w.band.toFixed(1) + ')',
        tip: m.tip,
        btn: 'Practise ' + m.label,
        section: m.section,
        alt: m.alt
      });
    });
    (stats.filter((s) => s.avg >= 60) || []).sort((a, b) => a.avg - b.avg).forEach((s) => {
      const m = SKILLS[SKILL_INDEX[s.key]];
      if (used[s.key]) return;
      used[s.key] = true;
      steps.push({
        icon: m.icon,
        title: 'Consolidate ' + m.label + ' (already ' + s.avg + '%)',
        tip: 'Push accuracy toward 85-92% to reach Band 8.5-9.0.',
        btn: 'Push ' + m.label,
        section: m.section,
        alt: m.alt
      });
    });
    if (overallBand < 9) {
      steps.push({
        icon: '📘',
        title: 'Follow the Band 4-9 Curriculum',
        tip: 'The academic curriculum maps every lesson to a target band with practice sets.',
        btn: 'Open Curriculum',
        section: 'curriculum'
      });
    }
    return { summary: steps.length + ' focused actions based on your current accuracy.', steps };
  }

  function planButton(s) {
    const go = s.section === 'curriculum' ? "showSection('curriculum')" : "showSection('" + s.section + "')";
    return '<button onclick="' + go + '" class="px-3 py-1.5 text-xs font-bold bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.4)] text-[#d4af37] hover:bg-[rgba(212,175,55,0.3)] transition rounded-lg">' + esc(s.btn) + ' →</button>';
  }

  // ------------------------------------------------------------------
  // History table
  // ------------------------------------------------------------------
  function recentRows(hist) {
    if (!hist.length) return '<p class="text-sm text-[#f5f0e6]/50">No assessments recorded yet.</p>';
    const rows = hist.slice(-8).reverse().map((h) => {
      const m = SKILLS[SKILL_INDEX[h.skill]] || { icon: '✨', label: h.skill };
      const good = h.pct >= 60;
      return '<tr class="border-t border-[rgba(212,175,55,0.1)]">' +
        '<td class="py-2 pr-3 text-xs text-[#f5f0e6]/70 whitespace-nowrap">' + new Date(h.t).toLocaleDateString() + '</td>' +
        '<td class="py-2 pr-3 text-xs text-[#f5f0e6]">' + m.icon + ' ' + esc(m.label) + '</td>' +
        '<td class="py-2 pr-3 text-xs text-[#f5f0e6]/70 max-w-[220px] truncate">' + esc(h.label) + '</td>' +
        '<td class="py-2 pr-3 text-xs text-[#f5f0e6]/70">' + h.correct + '/' + h.total + '</td>' +
        '<td class="py-2 text-xs font-bold ' + (good ? 'text-[#34d399]' : 'text-[#f87171]') + '">' + h.pct + '%</td>' +
        '<td class="py-2 text-xs font-bold text-[#d4af37]">' + h.band.toFixed(1) + '</td>' +
        '</tr>';
    }).join('');
    return '<div class="overflow-x-auto"><table class="w-full text-left">' +
      '<thead><tr class="text-[10px] uppercase tracking-wider text-[#f5f0e6]/40">' +
      '<th class="py-2 pr-3">Date</th><th class="py-2 pr-3">Skill</th><th class="py-2 pr-3">Assessment</th>' +
      '<th class="py-2 pr-3">Score</th><th class="py-2 pr-3">Acc.</th><th class="py-2">Band</th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table></div>';
  }

  // ------------------------------------------------------------------
  // Full report (Diagnostics page)
  // ------------------------------------------------------------------
  function reportHTML() {
    const s = snapshot();
    const chips = [
      '<div class="text-center px-4 py-3 rounded-xl bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.2)]">' +
        '<p class="text-[10px] uppercase tracking-widest text-[#f5f0e6]/40">Estimated Band</p>' +
        '<p class="text-3xl font-extrabold text-[#d4af37] mt-1">' + (s.overallBand ? s.overallBand.toFixed(1) : '—') + '</p></div>',
      '<div class="text-center px-4 py-3 rounded-xl bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.2)]">' +
        '<p class="text-[10px] uppercase tracking-widest text-[#f5f0e6]/40">Overall accuracy</p>' +
        '<p class="text-3xl font-extrabold text-[#f5f0e6] mt-1">' + (s.stats.length ? s.overallPct + '%' : '—') + '</p></div>',
      '<div class="text-center px-4 py-3 rounded-xl bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.2)]">' +
        '<p class="text-[10px] uppercase tracking-widest text-[#f5f0e6]/40">Assessments</p>' +
        '<p class="text-3xl font-extrabold text-[#f5f0e6] mt-1">' + s.assessCount + '</p></div>',
      '<div class="text-center px-4 py-3 rounded-xl bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.2)]">' +
        '<p class="text-[10px] uppercase tracking-widest text-[#f5f0e6]/40">Target</p>' +
        '<p class="text-3xl font-extrabold text-[#f5f0e6] mt-1">' + (s.targetBand || '—') + '</p></div>'
    ].join('');

    const empty = !s.stats.length;
    const strengthsHTML = s.strengths.length
      ? s.strengths.map((st) => { const m = SKILLS[SKILL_INDEX[st.key]]; return '<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(52,211,153,0.12)] border border-[rgba(52,211,153,0.35)] text-xs font-bold text-[#34d399]">' + m.icon + ' ' + m.label + ' · ' + st.avg + '%</span>'; }).join('')
      : '<p class="text-xs text-[#f5f0e6]/50">Complete assessments to reveal strengths.</p>';
    const weakHTML = s.weaknesses.length
      ? s.weaknesses.map((w) => {
          const m = SKILLS[SKILL_INDEX[w.key]];
          return '<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(248,113,113,0.12)] border border-[rgba(248,113,113,0.35)] text-xs font-bold text-[#f87171]">' + m.icon + ' ' + m.label + ' · ' + w.avg + '% · Band ' + w.band.toFixed(1) + '</span>';
        }).join('')
      : '<p class="text-xs text-[#f5f0e6]/50">' + (empty ? 'No data yet.' : 'No critical weaknesses detected below 60%.') + '</p>';
    const qtypeHTML = s.qtypes.length
      ? s.qtypes.map((g) => '<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.3)] text-[11px] font-semibold text-[#fbbf24]">⚠ ' + esc(String(g.key).toUpperCase().replace(/_/g, ' ')) + ' · ' + g.pct + '%</span>').join('')
      : '';

    const plan = actionPlan(s.stats, s.weaknesses, s.overallBand);
    const trend = trendSparkline();
    const trendHTML = trend
      ? '<svg viewBox="0 0 260 64" class="w-full max-w-[320px] mx-auto" role="img" aria-label="Band trend">' +
        '<polygon points="' + trend.area + '" fill="rgba(212,175,55,0.15)"/>' +
        '<polyline points="' + trend.line + '" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>' +
        '<p class="text-center text-[11px] text-[#f5f0e6]/50 mt-2">Band ' + trend.first.toFixed(1) + ' → ' + trend.last.toFixed(1) + ' · best ' + trend.max.toFixed(1) + '</p>'
      : '<p class="text-sm text-[#f5f0e6]/50">Complete at least two assessments to see your band trend.</p>';

    return `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="text-2xl font-extrabold text-[#f5f0e6]">📊 IELTS Diagnostic Performance Report</h2>
            <p class="text-sm text-[#f5f0e6]/60 mt-1">Automated accuracy analysis across every reading, listening, vocabulary, writing &amp; speaking assessment.</p>
          </div>
          <div class="flex gap-2">
            <button onclick="IELTS_DIAG.reRender()" class="px-3 py-2 text-xs font-bold bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.4)] text-[#d4af37] hover:bg-[rgba(212,175,55,0.3)] transition rounded-lg">🔄 Refresh</button>
            ${s.assessCount ? '<button onclick="IELTS_DIAG.clear()" class="px-3 py-2 text-xs font-bold bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.3)] text-[#f87171] hover:bg-[rgba(248,113,113,0.2)] transition rounded-lg">🗑 Reset data</button>' : ''}
          </div>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">${chips}</div>
        ${s.targetBand && s.overallBand ? '<p class="text-xs text-[#f5f0e6]/60 mt-3">Gap to your Band ' + esc(s.targetBand) + ' target: <strong class="text-[#d4af37]">' + Math.max(0, parseFloat(s.targetBand) - s.overallBand).toFixed(1) + ' bands</strong> — stay consistent and the plan below closes it.</p>' : ''}
      </div>

      ${empty ? `
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-8 text-center mb-6">
          <p class="text-4xl mb-3">🩺</p>
          <h3 class="text-xl font-extrabold text-[#f5f0e6]">Your diagnostic report is waiting</h3>
          <p class="text-sm text-[#f5f0e6]/60 mt-2 max-w-xl mx-auto">Take any timed test or self-assessment below. Accuracy is measured question-by-question, then an estimated band, strengths and weaknesses are generated automatically.</p>
          <div class="flex flex-wrap justify-center gap-2 mt-5">
            ${SKILLS.map((s) => '<button onclick="showSection(\'' + s.section + '\')" class="px-4 py-2.5 text-sm font-bold bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.4)] text-[#d4af37] hover:bg-[rgba(212,175,55,0.3)] transition rounded-xl">' + s.icon + ' ' + s.label + '</button>').join('')}
          </div>
        </div>` : ''}

      <div class="grid lg:grid-cols-2 gap-5 mb-6">
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6">
          <h3 class="font-bold text-[#f5f0e6] mb-1">🧭 Skill Accuracy Radar</h3>
          <p class="text-xs text-[#f5f0e6]/50 mb-4">Weighted average accuracy per skill (latest 160 assessments).</p>
          ${radarSVG(s.stats, 280)}
          <div class="mt-4 space-y-3">${skillBars(s.stats)}</div>
        </div>
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6">
          <h3 class="font-bold text-[#f5f0e6] mb-4">💪 Strengths &amp; 🎯 Targeted Weaknesses</h3>
          <div class="mb-4">
            <p class="text-xs font-bold text-[#34d399] uppercase tracking-wider mb-2">Strengths</p>
            <div class="flex flex-wrap gap-2">${strengthsHTML}</div>
          </div>
          <div class="mb-4">
            <p class="text-xs font-bold text-[#f87171] uppercase tracking-wider mb-2">Weaknesses (&lt;60%)</p>
            <div class="flex flex-wrap gap-2">${weakHTML}</div>
          </div>
          <div>
            <p class="text-xs font-bold text-[#fbbf24] uppercase tracking-wider mb-2">Question-type weaknesses that drag you down</p>
            <div class="flex flex-wrap gap-2">${qtypeHTML || '<p class="text-xs text-[#f5f0e6]/50">No question-type patterns yet — complete a Reading/Listening test.</p>'}</div>
          </div>
        </div>
      </div>

      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 class="font-bold text-[#f5f0e6]">👑 Actionable Band 9 Mastery Plan</h3>
            <p class="text-xs text-[#f5f0e6]/50 mt-1">${plan.summary}</p>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-3">
          ${plan.steps.slice(0, 6).map((st) => `
            <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-4">
              <div class="flex items-start gap-3">
                <span class="text-2xl shrink-0">${st.icon}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-[#f5f0e6]">${esc(st.title)}</p>
                  <p class="text-xs text-[#f5f0e6]/55 mt-1">${esc(st.tip)}</p>
                  <div class="mt-2">${planButton(st)}</div>
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-5">
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6">
          <h3 class="font-bold text-[#f5f0e6] mb-4">📈 Band Progress Over Time</h3>
          ${trendHTML}
        </div>
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6">
          <h3 class="font-bold text-[#f5f0e6] mb-4">🕒 Recent Assessments</h3>
          ${recentRows(s.hist)}
        </div>
      </div>`;
  }

  // ------------------------------------------------------------------
  // Compact widget (Profile + Mastery Hub + dashboard)
  // ------------------------------------------------------------------
  function widgetHTML() {
    const s = snapshot();
    const empty = !s.stats.length;
    let radar = s.stats.length ? radarSVG(s.stats, 220) : '';
    const bars = s.stats.length ? skillBars(s.stats) : '';
    const weakTags = s.weaknesses.length
      ? s.weaknesses.map((w) => { const m = SKILLS[SKILL_INDEX[w.key]]; return '<span class="px-2 py-1 rounded bg-[rgba(248,113,113,0.12)] border border-[rgba(248,113,113,0.35)] text-[10px] font-bold text-[#f87171]">' + m.icon + ' ' + m.label + ' ' + w.avg + '%</span>'; }).join('')
      : (empty ? '' : '<span class="px-2 py-1 rounded bg-[rgba(52,211,153,0.12)] border border-[rgba(52,211,153,0.35)] text-[10px] font-bold text-[#34d399]">✅ No critical weaknesses</span>');

    return `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-5 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 class="text-lg font-bold text-[#f5f0e6]">📊 Diagnostic Analytics</h3>
            <p class="text-xs text-[#f5f0e6]/50 mt-1">Estimated band: <strong class="text-[#d4af37]">${s.overallBand ? s.overallBand.toFixed(1) : '—'}</strong> · accuracy <strong class="text-[#f5f0e6]/80">${s.stats.length ? s.overallPct + '%' : '—'}</strong> · ${s.assessCount} assessments</p>
          </div>
          <button onclick="showSection('diagnostics')" class="px-4 py-2 text-xs font-bold bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.4)] text-[#d4af37] hover:bg-[rgba(212,175,55,0.3)] transition rounded-lg">Open full report →</button>
        </div>
        ${empty ? `
          <div class="text-center py-6">
            <p class="text-3xl mb-2">🩺</p>
            <p class="font-bold text-[#f5f0e6]">No diagnostic data yet</p>
            <p class="text-xs text-[#f5f0e6]/55 mt-1 max-w-md mx-auto">Complete any timed test or self-assessment — your accuracy, estimated band and personalised weaknesses appear here automatically.</p>
            <button onclick="showSection('quiz-hub')" class="mt-4 px-4 py-2.5 text-sm font-bold bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.4)] text-[#d4af37] hover:bg-[rgba(212,175,55,0.3)] transition rounded-xl">🧠 Start at the Quiz Hub</button>
          </div>` : `
          <div class="flex flex-col md:flex-row items-center gap-5">
            <div class="w-full md:w-2/5 shrink-0">${radar}</div>
            <div class="flex-1 w-full">
              ${bars}
              <div class="flex flex-wrap items-center gap-2 mt-2">
                <span class="text-[10px] uppercase tracking-wider text-[#f5f0e6]/40">Targeted weaknesses:</span>
                ${weakTags}
              </div>
            </div>
          </div>`}
      </div>`;
  }

  // ------------------------------------------------------------------
  // Full page render + exposed API
  // ------------------------------------------------------------------
  function render() {
    const u = window.IELTS_AUTH && window.IELTS_AUTH.getCurrentUser();
    if (!u) { window.IELTS_AUTH.showScreen(); return; }
    const el = document.getElementById('diagnostics-content');
    if (el) el.innerHTML = reportHTML();
  }
  function reRender() { render(); }

  function clear() {
    if (!window.confirm('Reset all diagnostic analytics for your account? This cannot be undone.')) return;
    save({ history: [] });
    window.toast && window.toast('Diagnostic data reset');
    render();
  }

  window.IELTS_DIAG = {
    record, bandFromPct, snapshot, radarSVG, trendSparkline,
    reportHTML, widgetHTML, render, reRender, clear, SKILLS
  };
})();