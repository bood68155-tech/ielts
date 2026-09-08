/* ============================================================
   IELTS PA — Official Band Score Calculator & Converter
   Maps raw marks (0-40) for Listening and Reading to the
   official IELTS 1.0-9.0 half-band scale. Includes a live
   converter UI rendered into the #band-calc-content section.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* Threshold tables: { min, band } in descending order by raw.
     Official IELTS Academic Listening & Reading conversion. */
  const SCALES = {
    listening: [
      { min: 39, band: '9.0' }, { min: 37, band: '8.5' }, { min: 35, band: '8.0' },
      { min: 32, band: '7.5' }, { min: 30, band: '7.0' }, { min: 26, band: '6.5' },
      { min: 23, band: '6.0' }, { min: 18, band: '5.5' }, { min: 16, band: '5.0' },
      { min: 13, band: '4.5' }, { min: 10, band: '4.0' }, { min: 8, band: '3.5' },
      { min: 6, band: '3.0' }, { min: 4, band: '2.5' }, { min: 2, band: '2.0' },
      { min: 1, band: '1.5' }, { min: 0, band: '1.0' }
    ],
    academicReading: [
      { min: 39, band: '9.0' }, { min: 37, band: '8.5' }, { min: 35, band: '8.0' },
      { min: 33, band: '7.5' }, { min: 30, band: '7.0' }, { min: 27, band: '6.5' },
      { min: 23, band: '6.0' }, { min: 19, band: '5.5' }, { min: 15, band: '5.0' },
      { min: 13, band: '4.5' }, { min: 10, band: '4.0' }, { min: 8, band: '3.5' },
      { min: 6, band: '3.0' }, { min: 4, band: '2.5' }, { min: 2, band: '2.0' },
      { min: 1, band: '1.5' }, { min: 0, band: '1.0' }
    ],
    generalReading: [
      { min: 40, band: '9.0' }, { min: 39, band: '8.5' }, { min: 37, band: '8.0' },
      { min: 35, band: '7.5' }, { min: 32, band: '7.0' }, { min: 30, band: '6.5' },
      { min: 27, band: '6.0' }, { min: 23, band: '5.5' }, { min: 19, band: '5.0' },
      { min: 15, band: '4.5' }, { min: 12, band: '4.0' }, { min: 8, band: '3.5' },
      { min: 5, band: '3.0' }, { min: 3, band: '2.5' }, { min: 2, band: '2.0' },
      { min: 1, band: '1.5' }, { min: 0, band: '1.0' }
    ]
  };

  const SCALE_LABELS = {
    listening: 'Listening (Academic & GT)',
    academicReading: 'Reading · Academic',
    generalReading: 'Reading · General Training'
  };

  function bandFor(scale, raw) {
    const table = SCALES[scale] || SCALES.listening;
    if (raw == null || isNaN(raw)) return '—';
    const r = Math.max(0, Math.min(40, Number(raw)));
    for (let i = 0; i < table.length; i++) if (r >= table[i].min) return table[i].band;
    return '1.0';
  }

  function listening(raw) { return bandFor('listening', raw); }
  function academicReading(raw) { return bandFor('academicReading', raw); }
  function generalReading(raw) { return bandFor('generalReading', raw); }

  function preview(scale, value) {
    const band = bandFor(scale, value);
    const el = $('#bandout-' + scale);
    if (el) el.textContent = band;
    const valEl = $('#bandval-' + scale);
    if (valEl) valEl.textContent = String(value) + ' / 40';
    const bar = $('#bandbar-' + scale);
    if (bar) bar.style.width = Math.min(100, Math.max(0, Number(value || 0) * 2.5)) + '%';
  }

  function converterCard(scale) {
    return `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-bold text-[#f5f0e6]">${esc(SCALE_LABELS[scale])}</h3>
          <span class="text-[10px] font-bold text-[#d4af37] border border-[rgba(212,175,55,0.3)] px-2 py-0.5 rounded">Out of 40</span>
        </div>
        <div class="flex items-baseline justify-between mb-2">
          <label class="text-xs text-[#f5f0e6]/60">Raw score (0–40)</label>
          <span id="bandval-${scale}" class="font-mono text-xs font-bold text-[#f5f0e6]/80">40 / 40</span>
        </div>
        <input type="range" min="0" max="40" value="40"
          oninput="IELTS_BAND_SCORE.preview('${scale}', this.value)"
          class="w-full accent-[#d4af37] mb-4" id="bandrange-${scale}" />
        <div class="h-2 bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.15)] rounded-full overflow-hidden mb-4">
          <div id="bandbar-${scale}" class="h-full bg-gradient-to-r from-[#d4af37] to-[#f5f0e6] rounded-full transition-all" style="width:100%"></div>
        </div>
        <div class="text-center">
          <p class="text-xs text-[#f5f0e6]/50 uppercase tracking-widest">Your band score</p>
          <p id="bandout-${scale}" class="text-5xl font-extrabold text-[#d4af37] mt-1">${bandFor(scale, 40)}</p>
        </div>
      </div>`;
  }

  function tableRows(scale) {
    const table = SCALES[scale];
    const ranges = [];
    for (let i = 0; i < table.length; i++) {
      const hi = i === 0 ? 40 : table[i - 1].min - 1;
      const lo = table[i].min;
      ranges.push({ lo, hi, band: table[i].band });
    }
    const sorted = ranges.slice().sort((a, b) => b.band - a.band || a.lo - b.lo);
    return sorted.map((r) => `
      <div class="flex items-center justify-between px-3 py-1.5 rounded-lg ${parseInt(r.band) >= 7 ? 'bg-[rgba(212,175,55,0.08)]' : ''}">
        <span class="text-xs text-[#f5f0e6]/70">${r.lo === r.hi ? r.lo : r.lo + '–' + r.hi} / 40</span>
        <span class="text-xs font-bold text-[#d4af37]">Band ${r.band}</span>
      </div>`).join('');
  }

  function render() {
    const el = $('#band-calc-content');
    if (!el) return;
    el.innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <h2 class="text-2xl font-extrabold text-[#f5f0e6]">🧮 Official Band Score Calculator</h2>
        <p class="text-sm text-[#f5f0e6]/60 mt-1">Convert your raw Listening / Reading marks (out of 40) into a real IELTS band score using the official half-band conversion.</p>
      </div>
      <div class="grid md:grid-cols-2 gap-4 mb-6">
        ${converterCard('listening')}
        ${converterCard('academicReading')}
        ${converterCard('generalReading')}
      </div>
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6">
        <h3 class="text-lg font-bold text-[#f5f0e6] mb-4">📋 Full Conversion Tables</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <div>
            <p class="text-xs font-bold text-[#d4af37] uppercase tracking-widest mb-3">Listening</p>
            <div class="space-y-1">${tableRows('listening')}</div>
          </div>
          <div>
            <p class="text-xs font-bold text-[#d4af37] uppercase tracking-widest mb-3">Reading · Academic</p>
            <div class="space-y-1">${tableRows('academicReading')}</div>
          </div>
          <div>
            <p class="text-xs font-bold text-[#d4af37] uppercase tracking-widest mb-3">Reading · General Training</p>
            <div class="space-y-1">${tableRows('generalReading')}</div>
          </div>
        </div>
        <p class="text-xs text-[#f5f0e6]/40 mt-5">IELTS band scores are reported in half-bands (0.5 - 9.0). The overall score is the average of the four skills, rounded to the nearest half-band.</p>
      </div>`;
  }

  window.IELTS_BAND_SCORE = { render, preview, listening, academicReading, generalReading, bandFor };
})();