/* ============================================================
   Rami Academy — Master Data Aggregator
   ------------------------------------------------------------
   Wraps the six level files (A1..C2) into a single navigation
   structure exposed as window.IELTS_DATA.RAMI_ACADEMY.
   Each level = { id, cefr, name, label, tagline, blurb, accent,
                      lessonsTotal, xpTotal, units:[...] }.
   Load AFTER academy-data-a1.js .. academy-data-c2.js.
   ============================================================ */
(function () {
  'use strict';

  /* NOTE: the six level files declare top-level `const` globals, so they are
     referenced by identifier (not window.*) — guaranteed loaded before this file. */
  var UNITS_BY_ID = {
    a1: typeof ACADEMY_UNITS_A1 !== 'undefined' ? ACADEMY_UNITS_A1 : [],
    a2: typeof ACADEMY_UNITS_A2 !== 'undefined' ? ACADEMY_UNITS_A2 : [],
    b1: typeof ACADEMY_UNITS_B1 !== 'undefined' ? ACADEMY_UNITS_B1 : [],
    b2: typeof ACADEMY_UNITS_B2 !== 'undefined' ? ACADEMY_UNITS_B2 : [],
    c1: typeof ACADEMY_UNITS_C1 !== 'undefined' ? ACADEMY_UNITS_C1 : [],
    c2: typeof ACADEMY_UNITS_C2 !== 'undefined' ? ACADEMY_UNITS_C2 : []
  };

  var META = [
    { id: 'a1', cefr: 'A1', label: 'Beginner', tagline: 'Ground floor', blurb: 'First words, greetings, numbers and simple sentences. Your absolute starting point.', accent: '#d4af37' },
    { id: 'a2', cefr: 'A2', label: 'Elementary', tagline: 'Daily life', blurb: 'Routines, describing the world, the past, travel and real everyday communication.', accent: '#e0b84f' },
    { id: 'b1', cefr: 'B1', label: 'Intermediate', tagline: 'IELTS foundations', blurb: 'Grammar depth, work and study, opinions, narratives — where the IELTS skills begin.', accent: '#7fc46b' },
    { id: 'b2', cefr: 'B2', label: 'Upper-Intermediate', tagline: 'Academic jump', blurb: 'Complex grammar, media and society, academic writing, professional English and nuance.', accent: '#5aa7e8' },
    { id: 'c1', cefr: 'C1', label: 'Advanced', tagline: 'Band 8 engineering', blurb: 'Precision grammar, critical analysis, advanced writing and oral fluency.', accent: '#b48be0' },
    { id: 'c2', cefr: 'C2', label: 'Proficiency', tagline: 'Band 9 refinement', blurb: 'Master grammar, discourse, research and synthesis, total fluency and exam-day control.', accent: '#e88aa8' }
  ];

  var LEVELS = META.map(function (m) {
    var units = UNITS_BY_ID[m.id];
    var lessonsTotal = 0;
    var xpTotal = 0;
    units = units.map(function (u) {
      var uxp = 0;
      (u.lessons || []).forEach(function (l) { uxp += l.xp || 0; });
      lessonsTotal += (u.lessons || []).length;
      xpTotal += uxp;
      return u;
    });
    return {
      id: m.id,
      cefr: m.cefr,
      name: m.cefr + ' \u00b7 ' + m.label,
      label: m.label,
      tagline: m.tagline,
      blurb: m.blurb,
      accent: m.accent,
      units: units,
      lessonsTotal: lessonsTotal,
      xpTotal: xpTotal
    };
  });

  window.IELTS_DATA = window.IELTS_DATA || {};
  window.IELTS_DATA.RAMI_ACADEMY = LEVELS;

  window.IELTS_ACADEMY_DATA = {
    levels: function () { return LEVELS; },
    level: function (id) { return LEVELS.find ? LEVELS.find(function (L) { return L.id === id; }) : null; }
  };
})();