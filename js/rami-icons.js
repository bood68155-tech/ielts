/* ============================================================
   IELTS PA — Bespoke Heritage Iconography · v3 "Kinetic Dawn"
   ------------------------------------------------------------
   A handmade, minimalist line-icon system for Teacher Rami's
   surfaces. Continuous single-stroke line art on 24x24, rendered
   in the platform gold, woven with Palestinian heritage motifs
   (eight-pointed Rub el Hizb star, olive branch, Dome silhouette,
   geometric lozenge & stair-path roadmap).

   v3 — bolder, rounder, more alive:
     • flowing open-book curves, capsule earpieces, motion wakes
       and "rise" energy — every mark leans forward, not static.
     • every icon carries one small Rub el Hizb diamond node as a
       signature accent, keeping the family instantly recognisable.
     • quieter "orbit cradle" halo + warmer molten-gold gradient.
   ============================================================ */
(function () {
  'use strict';
  if (window.RAMI_ICONS) return;

  /* Each entry: raw inner SVG content (stroke line art on 24x24). */
  const I = {
    /* Open book (flowing curved pages + spine) */
    read: '<path d="M12 4.3v14.6"/><path d="M12 4.3C9.4 6 6.6 6.9 4 6.9c-.6 0-1.1-.1-1.6-.3v12.1H4c3.1 0 6-1 8-2.9"/><path d="M12 4.3c2.6 1.7 5.4 2.6 8 2.6.6 0 1.1-.1 1.6-.3v12.1H20c-3.1 0-6-1-8-2.9"/>',
    /* Listening — headphone band, capsule earpads + echo arcs */
    listen: '<path d="M4.2 10.4a7.8 7.8 0 0 0 15.6 0"/><rect x="3.4" y="11.2" width="3.8" height="6.8" rx="1.9"/><rect x="16.8" y="11.2" width="3.8" height="6.8" rx="1.9"/><path d="M4.8 9.2a3.1 3.1 0 0 0 0 4.2M2.6 6.9a6.2 6.2 0 0 0 0 8.8"/>',
    /* Writing — pen nib kept in a seal, with a gem node */
    write: '<path d="M12 3l7.5 14.5-3.2 2.4-4.3-6.1-4.3 6.1-3.2-2.4z"/><path d="M9.7 13.4L6.8 9"/><path d="M14.9 5.1l.55 1.5 1.5.55-1.5.55-.55 1.5-.55-1.5-1.5-.55 1.5-.55z"/>',
    /* Speaking — heritage arch (mihrab) over a broadcast dial */
    speak: '<path d="M5 20.5C5 13.8 7.4 9.5 12 9.5s7 4.3 7 11"/><path d="M8 16.6v1.8M12 14.6v3.8M16 16.6v1.8"/><path d="M12 6.4l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8z"/>',
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
    /* Send — paper-plane arrow with a motion wake */
    send: '<path d="M3.5 12h14.5M11.5 5.5l6.5 6.5-6.5 6.5"/><path d="M19.5 9.4l1.3 2.6-1.3 2.6"/>',
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
    /* Bookmark — study/session marker with a diamond node */
    bookmark: '<path d="M6 3.5h12v17l-6-3.9-6 3.9z"/><path d="M12 14.4l.55 1.45 1.45.55-1.45.55-.55 1.45-.55-1.45-1.45-.55 1.45-.55z"/>',
    /* Star marker */
    marker: '<path d="M12 3.2l1.4 3.9 3.9 1.4-3.9 1.4-1.4 3.9-1.4-3.9-3.9-1.4 3.9-1.4z"/>',

    /* ---- v2 additions: geometric "molecular C2" marks ---- */
    /* Levels — ascending learning stack */
    levels: '<path d="M5 19h14M7 19v-3h10v3M9 16v-3h6v3M11 13V7.8"/><path d="M11 7.8l.55 1.5 1.5.55-1.5.55-.55 1.5-.55-1.5-1.5-.55 1.5-.55z"/>',
    /* Target — diagnostics ring */
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2"/>',
    /* Chart — data bars */
    chart: '<path d="M4 20h16M7 20v-6M12 20V9M17 20v-10"/>',
    /* Audio — capsule headphones */
    audio: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3.4" y="12.6" width="3.8" height="6.4" rx="1.9"/><rect x="16.8" y="12.6" width="3.8" height="6.4" rx="1.9"/>',
    /* Swap — translator arrows */
    swap: '<path d="M8 9.5h10.5M16 6.5l3 3-3 3"/><path d="M16 14.5H5.5M8 11.5l-3 3 3 3"/>',
    /* Users — community */
    users: '<circle cx="9" cy="8.5" r="3.4"/><path d="M3.6 19a5.4 5.4 0 0 1 10.8 0"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M15.6 15.2a4.4 4.4 0 0 1 4.8 3.8"/>',
    /* Streak — study tracker flame */
    streak: '<path d="M12 21c-3.8 0-6.5-2.5-6.5-6C5.5 10 8.5 8 9.5 5.5c.9 2.2 2.6 3.5 4 4.1C12.9 7.8 12.2 5.8 12.4 3c2.2 1 4 3 4.7 5.5.7-.3 1.3-.8 1.9-1.4.7 1.6 1 3.2 1 4.7 0 4.2-3.2 6.2-6 6.2z"/>',
    /* Shield — security grade */
    shield: '<path d="M12 3l7 2.5V11c0 4.6-2.9 7.9-7.5 10-4.6-2.1-7.5-5.4-7.5-10V5.5z"/><path d="M8.8 12.2l2.2 2.2 4.3-4.6"/>',
    /* Globe — international/cultural */
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.9 2.5 2.9 14.5 0 17M12 3.5C9.1 6 9.1 18 12 20.5"/>',
    /* Search */
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M15.8 15.8L20 20"/>',
    /* Layers — synthesis */
    layers: '<path d="M12 3.5l9 4.5-9 4.5-9-4.5z"/><path d="M3 12l9 4.5L21 12"/><path d="M3 16.5L12 21l9-4.5"/>',

    /* ---- v3 additions: study-surface glyphs ---- */
    /* Calendar — the daily timetable */
    calendar: '<rect x="4" y="5" width="16" height="15.5" rx="2.5"/><path d="M4 9.4h16M8.5 3v4M15.5 3v4"/>',
    /* Play — video lesson */
    play: '<path d="M8 5l11 7-11 7z"/>',
    /* Check — completion */
    check: '<path d="M5 13l4.6 4.6L19 6.6"/>',
    /* Trophy — achievement */
    trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4.6A1.6 1.6 0 0 0 3 6.6v.9A4.5 4.5 0 0 0 7.5 12M17 5h2.4A1.6 1.6 0 0 1 21 6.6v.9a4.5 4.5 0 0 1-4.5 4.5M12 14v3M8.5 20h7M9.5 17h5"/>',
    /* Mic — recording */
    mic: '<rect x="8.5" y="3.5" width="7" height="11" rx="3.5"/><path d="M5 11.5a7 7 0 0 0 14 0M12 18.5V21"/>',
    /* News — BBC article */
    news: '<rect x="4.5" y="4" width="15" height="16" rx="2"/><path d="M8 8.5h8M8 12h5M8 15.5h3"/>',
    /* Video — lesson clip */
    video: '<rect x="3" y="5.5" width="13" height="13" rx="2.5"/><path d="M16 10l5-3v10l-5-3z"/>'
  };

  /* Quiet "orbit cradle": a leaning orbit arc + a tiny Rub el Hizb
     diamond seat. Shared by every mark — the v3 technical frame. */
  const HALO = '<g data-imi-halo opacity="0.45" stroke-width="1.1">' +
    '<path d="M18.6 12.2a6.6 6.6 0 1 1-1.6-4.7"/>' +
    '<path d="M20.4 6.4l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z"/>' +
    '</g>';

  let gSeq = 0;
  const gradDef = (id) => '<defs><linearGradient id="' + id + '" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">' +
    '<stop offset="0" stop-color="#fbeec9"/><stop offset=".55" stop-color="#e6c86a"/><stop offset="1" stop-color="#8f6d15"/></linearGradient></defs>';

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