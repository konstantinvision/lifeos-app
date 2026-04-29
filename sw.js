// Life OS Service Worker — v9.3
const CACHE_NAME = "lifeos-v9-3";
const ALWAYS_FRESH = ["index.html", "sw.js", "./", "/"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(["./index.html", "./manifest.json"])
        .catch(() => {})
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  const isLocal = url.origin === self.location.origin;
  if (!isLocal || e.request.method !== "GET") return;

  const alwaysFresh = ALWAYS_FRESH.some(f => url.pathname.endsWith(f)) || url.pathname.endsWith("/");

  if (alwaysFresh) {
    e.respondWith(
      fetch(e.request, { cache: "no-store" })
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res && res.status === 200) {
            caches.open(CACHE_NAME).then(c => c.put(e.request, res.clone()));
          }
          return res;
        });
      })
    );
  }
});

self.addEventListener("message", e => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});
