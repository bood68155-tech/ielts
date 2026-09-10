/* ============================================================
   IELTS PA — Bespoke Heritage Iconography
   ------------------------------------------------------------
   A handmade, minimalist line-icon system for Teacher Rami's
   surfaces. Deliberately NOT generic "AI" iconography: each icon
   is single-stroke line art rendered in the platform gold, with
   subtle Palestinian heritage motifs interwoven (eight-pointed
   Rub el Hizb star, olive branch, Dome silhouette, geometric
   lozenge & weaves, stair-path roadmap). Exposed as:
       window.RAMI_ICONS.icon(name, cls)
       window.RAMI_ICONS.badge(label, iconName, cls)
       window.RAMI_ICONS.divider()
       window.RAMI_ICONS.skill(name, tone, size)
   ============================================================ */
(function () {
  'use strict';
  if (window.RAMI_ICONS) return;

  /* Each entry: raw inner SVG content (stroke line art on 24x24). */
  const I = {
    /* Open book (spine + two pages) */
    read: '<path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H11v17H5.5A2.5 2.5 0 0 1 3 17.5z"/><path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H13v17h5.5a2.5 2.5 0 0 0 2.5-2.5z"/><path d="M12 3v17"/>',
    /* Listening — headband with sound-line accents */
    listen: '<path d="M4 13a3 3 0 0 1 3-3h1v8H7a3 3 0 0 1-3-3z"/><path d="M20 13a3 3 0 0 0-3-3h-1v8h1a3 3 0 0 0 3-3z"/><path d="M4 12.6v.9a7 7 0 0 0 14 0v-.9"/><path d="M9.5 15.5a1.2 1.2 0 0 1 1.2-1.2 1.2 1.2 0 0 1 1.2 1.2"/>',
    /* Writing — pen nib kept in a seal */
    write: '<path d="M12 3l7.5 14.5-3.2 2.4-4.3-6.1-4.3 6.1-3.2-2.4z"/><path d="M9.6 13.5L6.5 9"/>',
    /* Speaking — minaret with radiating voice arcs */
    speak: '<path d="M8 19h8M12 19V5.5"/><path d="M15.5 8a4 4 0 0 1 0 8"/><path d="M18.2 10.6a1.2 1.2 0 0 1 0 2.8"/>',
    /* Vocabulary — traditional geometric lozenge */
    vocab: '<path d="M12 3l8 9-8 9-8-9z"/><path d="M12 9.2l2.8 2.8-2.8 2.8-2.8-2.8z"/>',
    /* Grammar — weaving threads with a sparkle */
    grammar: '<path d="M4 7.5h16M4 12h16M4 16.5h16"/><path d="M12 5l1.1 2.5L15.5 8.6 13.1 9.7 12 12.2l-1.1-2.5L8.5 8.6l2.4-1.1z"/>',
    /* Idiom — olive branch */
    idiom: '<path d="M4.5 20C9 17.5 12.5 13 14 7"/><path d="M7 13.5a3 3 0 0 1-3 3 3 3 0 0 1 3-3.5z"/><path d="M6 9.5a2.7 2.7 0 0 1-2.7 2.7A2.7 2.7 0 0 1 6 9.4z"/><path d="M5.5 5.5a2.2 2.2 0 0 1-2.2 2.2 2.2 2.2 0 0 1 2.2-2.3z"/><circle cx="10" cy="16.5" r="1"/>',
    /* Exam — Rub el Hizb eight-pointed star */
    exam: '<path d="M12 2.8l2.4 6.8 6.8 2.4-6.8 2.4-2.4 6.8-2.4-6.8-6.8-2.4 6.8-2.4z"/><path d="M12 7.4l1.2 3.4 3.4 1.2-3.4 1.2-1.2 3.4-1.2-3.4-3.4-1.2 3.4-1.2z"/>',
    /* Chat — geometric dialog with squared corner + star */
    chat: '<path d="M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 3.5v-3.5H7.5A2.5 2.5 0 0 1 5 12.5z"/><path d="M12 6.6l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8z"/>',
    /* Roadmap — stair path rising to an eight-point star */
    roadmap: '<path d="M3 20h18M6.5 20v-4.5M11 20v-9M15.5 20v-4.5"/><path d="M15.5 15.5l1.3 1.2 2.7-2.4"/><path d="M15.5 6.5l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8z"/>',
    /* Evaluate — grading shield with a Rub el Hizb tick */
    evaluate: '<path d="M12 3l7.5 2.8V11c0 4.6-2.9 7.9-7.5 10-4.6-2.1-7.5-5.4-7.5-10V5.8z"/><path d="M8.8 12.4l2.2 2.2 4.3-4.8"/><path d="M12 6.5l.7 1.8 1.8.7-1.8.7L12 11.5l-.7-1.8-1.8-.7 1.8-.7z"/>',
    /* Library — archive frame */
    library: '<path d="M4 4h16v16H4z"/><path d="M4 8.5h16"/><path d="M8 12h8M8 16h5"/>',
    /* Settings — heritage octagonal field with a spindle */
    settings: '<path d="M12 2.8l7 3.6v7.2l-7 3.6-7-3.6V6.4z"/><circle cx="12" cy="12" r="2.3"/><path d="M12 6v1.4M12 16.6V18M17.6 8.8l-1.2.7M7.1 14.5l-1.2.7M17.6 15.2l-1.2-.7M7.1 9.5L5.9 8.8"/>',
    /* Send — paper-plane arrow with olive tip */
    send: '<path d="M3.5 12h15M12 5l6.5 7-6.5 7"/><path d="M19.5 9.6l1 1.9-1 1.9"/>',
    /* Chevron up (floating widget) */
    chevron: '<path d="M6 15l6-6 6 6"/>',
    /* Arrow right */
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    /* Close */
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    /* Olive branch motif */
    olive: '<path d="M4.5 20C9 17.5 12.5 13 14 7"/><path d="M7 13.5a3 3 0 0 1-3 3 3 3 0 0 1 3-3.5z"/><path d="M6 9.5a2.7 2.7 0 0 1-2.7 2.7A2.7 2.7 0 0 1 6 9.4z"/><path d="M5.5 5.5a2.2 2.2 0 0 1-2.2 2.2 2.2 2.2 0 0 1 2.2-2.3z"/>',
    /* Spark — four-point diamond */
    spark: '<path d="M12 5l1.3 3.7L17 10l-3.7 1.3L12 15l-1.3-3.7L7 10l3.7-1.3z"/>',
    /* Dome — Dome of the Rock silhouette */
    dome: '<path d="M5 20h14M6 20V13a6 6 0 0 1 12 0v7"/><path d="M12 7l1.9 1.8H10.1z"/>',
    /* Clock — exam timing */
    clock: '<circle cx="12" cy="12.5" r="8.5"/><path d="M12 8v4.5l3 1.8"/><path d="M12 2.5l.8 1l-.8 1-.8-1z"/>',
    /* Bookmark — study/session marker */
    bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
    /* Star marker */
    marker: '<path d="M12 3.2l1.4 3.9 3.9 1.4-3.9 1.4-1.4 3.9-1.4-3.9-3.9-1.4 3.9-1.4z"/>'
  };

  const RAW = function (name, cls) {
    var body = I[name];
    if (!body) body = I.spark;
    return '<svg class="' + (cls || 'w-5 h-5') + ' imi-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  };

  const skill = function (name, tone, size) {
    tone = tone || '';
    size = size || 'w-11 h-11';
    return '<span class="imi-skill ' + tone + ' ' + size + '" aria-hidden="true">' + RAW(name, 'w-6 h-6') + '</span>';
  };

  const badge = function (label, iconName, cls) {
    return '<span class="imi-badge ' + (cls || '') + '">' + (iconName ? RAW(iconName, 'w-3 h-3') : '') + '<span>' + label + '</span></span>';
  };

  const divider = function () {
    return '<div class="imi-divider" aria-hidden="true">' + RAW('olive', 'w-4 h-4') + '</div>';
  };

  const menu = function () { return Object.keys(I); };

  window.RAMI_ICONS = { icon: RAW, badge: badge, divider: divider, skill: skill, names: menu };
})();