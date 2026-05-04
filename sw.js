// Life OS Service Worker — v18
const CACHE_NAME = "lifeos-v17";
const ALWAYS_FRESH = ["index.html", "sw.js", "./", "/"];

// ── INSTALL: cache all app shell assets ──────────────────────────────────────
self.addEventListener("install", e => {
  // Take control immediately — don't wait for old SW to die
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./icon-192.png",
        "./icon-512.png",
      ]).catch(() => {}) // fail silently if icons missing
    )
  );
});

// ── ACTIVATE: delete old caches ───────────────────────────────────────────────
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim()) // take control of all open tabs
  );
});

// ── FETCH: network-first for ALWAYS_FRESH, cache-first for rest ───────────────
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  const isAlwaysFresh = ALWAYS_FRESH.some(f =>
    url.pathname.endsWith(f) || url.pathname === "/" || url.pathname === ""
  );

  if (isAlwaysFresh) {
    // Network first — always get latest index.html
    e.respondWith(
      fetch(e.request, { cache: "no-store" })
        .then(res => {
          // Update cache with fresh response
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request)) // fallback to cache if offline
    );
  } else {
    // Cache first for CDN assets (React, Babel)
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          }
          return res;
        });
      })
    );
  }
});

// ── MESSAGE: handle SKIP_WAITING from page ────────────────────────────────────
self.addEventListener("message", e => {
  if (e.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
