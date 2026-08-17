/* ============================================================
   IELTS Master — Supabase configuration
   ------------------------------------------------------------
   1. Create a free project at https://supabase.com
   2. Open Project Settings → API and copy the "anon public" key.
   3. Paste it below (replacing the placeholder).

   Alternatively you can inject the key at deploy time by
   defining `window.SUPABASE_ANON_KEY` BEFORE this file loads
   (e.g. from an environment variable in your hosting setup).

   While the key is missing (or still a placeholder) the app
   keeps working fully offline using localStorage — see
   js/supabaseClient.js for the fallback logic.
   ============================================================ */
(function () {
  'use strict';
  const cfg = window.SUPABASE_CONFIG || {};
  window.SUPABASE_CONFIG = {
    url: cfg.url || 'https://gmmbjgjrlgibglaojflh.supabase.co',
    anonKey: window.SUPABASE_ANON_KEY || cfg.anonKey || ''
  };
})();
