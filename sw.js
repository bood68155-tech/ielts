/* ============================================================
   IELTS PA — Service Worker "Rami Star" 
   Offline-first cache for core assets + network-first navigation.
   The /api/gemini proxy is NEVER cached (POST passes through).
   ============================================================ */
'use strict';

const CACHE = 'rami-star-v2';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './js/data.js',
  './js/study-plan.js',
  './js/supabase-config.js',
  './js/supabaseClient.js',
  './js/auth.js',
  './js/learning-path.js',
  './js/levels.js',
  './js/exam.js',
  './js/training.js',
  './js/readings.js',
  './js/translator.js',
  './js/study.js',
  './js/vocabulary.js',
  './js/catlango.js',
  './js/chat.js',
  './js/feed.js',
  './js/profile.js',
  './js/vocab-trainer.js',
  './js/quiz-hub.js',
  './js/writing-speaking-studio.js',
  './js/placement-test.js',
  './js/band-system.js',
  './js/diagnostics.js',
  './js/awl-engine.js',
  './js/reading-master.js',
  './js/listening-master.js',
  './js/writing-coach.js',
  './js/speaking-sim.js',
  './js/curriculum.js',
  './js/band-score.js',
  './js/ai-key.js',
  './js/rami-icons.js',
  './js/ai-engine.js',
  './js/teacher-chat.js',
  './js/masterclass.js',
  './js/academy-data-a1.js',
  './js/academy-data-a2.js',
  './js/academy-data-b1.js',
  './js/academy-data-b2.js',
  './js/academy-data-c1.js',
  './js/academy-data-c2.js',
  './js/academy-data.js',
  './js/ramiacademy.js',
  './js/app.js',
  './rami-avatar.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()).catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.indexOf('/api/') === 0) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    (async () => {
      /* Cache keys ignore query strings (?v=…) so version bumps stay fresh
         and offline fallback keeps working across deployments. */
      const cacheUrl = url.origin + url.pathname;
      const hit = await caches.match(cacheUrl);
      try {
        const res = await fetch(req);
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(cacheUrl, copy)).catch(() => {});
        }
        return res;
      } catch (e) {
        if (hit) return hit;
        throw e;
      }
    })()
  );
});