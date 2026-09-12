/* ============================================================
   IELTS PA — Bespoke Heritage Iconography · v2 "Ember & Orbit"
   ------------------------------------------------------------
   A handmade, minimalist line-icon system for Teacher Rami's
   surfaces. Single-stroke line art on 24x24, rendered in the
   platform gold, with Palestinian heritage motifs woven through
   (eight-pointed Rub el Hizb star, olive branch, Dome silhouette,
   geometric lozenge & weaves, stair-path roadmap).

   v2 upgrades — "new, non-traditional" presentation:
     • every mark floats in a faint orbital halo: a curved orbit
       arc + a tiny Rub el Hizb diamond — modern/technical while
       keeping the heritage soul.
     • opt-in premium finishes via <span data-imi-* />:
         data-imi-grad="1"  → molten-gold gradient stroke (url())
         data-imi-anim="1"  → stroke draw-in micro-animation
         data-imi-glow="1"  → soft ambient gold glow (drop-shadow)
     • ~15 new geometric icon names added for the wider surface map.

   Exposed as:
        window.RAMI_ICONS.icon(name, cls, opts)
        window.RAMI_ICONS.badge(label, iconName, cls)
        window.RAMI_ICONS.divider()
        window.RAMI_ICONS.skill(name, tone, size, opts)
        window.RAMI_ICONS.names()
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
    marker: '<path d="M12 3.2l1.4 3.9 3.9 1.4-3.9 1.4-1.4 3.9-1.4-3.9-3.9-1.4 3.9-1.4z"/>',

    /* ---- v2 additions: geometric "molecular C2" marks ---- */
    /* Levels — ascending learning stack */
    levels: '<path d="M5 19h14M7 19v-3h10v3M9 16v-3h6v3M11 13V8"/><path d="M11 8l.8 2.1 2.1.8-2.1.8L11 13.7l-.8-2-2.1-.8 2.1-.8z"/>',
    /* Target — diagnostics ring */
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2"/>',
    /* Chart — data bars */
    chart: '<path d="M4 20h16M7 20v-6M12 20V9M17 20v-10"/>',
    /* Compass — navigation */
    compass: '<circle cx="12" cy="12" r="8.5"/><path d="M15.7 8.3l-2.3 5.1-5.1 2.3 2.3-5.1z"/>',
    /* Audio — headphones */
    audio: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3.5" y="13" width="4" height="6" rx="1.5"/><rect x="16.5" y="13" width="4" height="6" rx="1.5"/>',
    /* Mic — recording */
    mic: '<rect x="9.5" y="3" width="5" height="11" rx="2.5"/><path d="M5.5 12v.5a6.5 6.5 0 0 0 13 0V12"/><path d="M12 18.5V21M8.5 21h7"/>',
    /* Swap — translator arrows */
    swap: '<path d="M8 9.5h10.5M16 6.5l3 3-3 3"/><path d="M16 14.5H5.5M8 11.5l-3 3 3 3"/>',
    /* Users — community */
    users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="16.5" cy="9.5" r="2.5"/><path d="M15.5 15.4a4.6 4.6 0 0 1 5 3.6"/>',
    /* Streak — study tracker flame */
    streak: '<path d="M12 21c-3.8 0-6.5-2.5-6.5-6C5.5 10 8.5 8 9.5 5.5c.9 2.2 2.6 3.5 4 4.1C12.9 7.8 12.2 5.8 12.4 3c2.2 1 4 3 4.7 5.5.7-.3 1.3-.8 1.9-1.4.7 1.6 1 3.2 1 4.7 0 4.2-3.2 6.2-6 6.2z"/>',
    /* Shield — security grade */
    shield: '<path d="M12 3l7 2.5V11c0 4.6-2.9 7.9-7.5 10-4.6-2.1-7.5-5.4-7.5-10V5.5z"/><path d="M8.8 12.2l2.2 2.2 4.3-4.6"/>',
    /* Bell — notice */
    bell: '<path d="M18 15.5v-5a6 6 0 0 0-12 0v5l-1.5 2h15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    /* Globe — international/cultural */
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.9 2.5 2.9 14.5 0 17M12 3.5C9.1 6 9.1 18 12 20.5"/>',
    /* Crown — mastery */
    crown: '<path d="M4 17.5h16"/><path d="M4.5 8.5l3.6 3.2 3.9-6 3.9 6 3.6-3.2v9h-15z"/>',
    /* Search */
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M15.8 15.8L20 20"/>',
    /* Layers — synthesis */
    layers: '<path d="M12 3.5l9 4.5-9 4.5-9-4.5z"/><path d="M3 12l9 4.5L21 12"/><path d="M3 16.5L12 21l9-4.5"/>',
    /* Lock — secure */
    lock: '<rect x="6" y="10.5" width="12" height="9" rx="1.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>'
  };

  /* Faint orbital halo: a curved orbit arc + tiny Rub el Hizb diamond.
     Shared by every mark — the "new, non-traditional" technical frame. */
  const HALO = '<g data-imi-halo opacity="0.5" stroke-width="1.1">' +
    '<path d="M19.3 12.8a7.7 7.7 0 1 1-2.2-5.6"/>' +
    '<path d="M18.4 3.9l.62 1.74 1.74.62-1.74.62-.62 1.74-.62-1.74-1.74-.62 1.74-.62z"/>' +
    '</g>';

  let gSeq = 0;
  const gradDef = (id) => '<defs><linearGradient id="' + id + '" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">' +
    '<stop offset="0" stop-color="#f9e9b4"/><stop offset=".55" stop-color="#e0c35c"/><stop offset="1" stop-color="#9a7818"/></linearGradient></defs>';

  const RAW = function (name, cls, opts) {
    opts = opts || {};
    const body = I[name] || I.spark;
    let defs = '';
    let bodyAttr = '';
    if (opts.grad) {
      const gid = 'imiG' + (++gSeq);
      defs = gradDef(gid);
      bodyAttr = ' stroke="url(#' + gid + ')"';
    }
    const extra = (opts.anim ? ' imi-anim' : '') + (opts.glow ? ' imi-glow' : '');
    return '<svg class="' + (cls || 'w-5 h-5') + ' imi-icon' + extra + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      defs + HALO + '<g data-imi-body' + bodyAttr + '>' + body + '</g></svg>';
  };

  const skill = function (name, tone, size, opts) {
    tone = tone || '';
    size = size || 'w-11 h-11';
    return '<span class="imi-skill ' + tone + ' ' + size + '" aria-hidden="true">' + RAW(name, 'w-6 h-6', opts) + '</span>';
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