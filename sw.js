// Life OS Service Worker — v25
// ⚠️ CACHE_NAME — меняй ЭТУ строку при каждом обновлении index.html
const CACHE_NAME = "lifeos-v27";

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./icon-192.png",
        "./icon-512.png"
      ]).catch(()=>{})
    )
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  const p = url.pathname;

  // Network-first: всё что относится к самому приложению
  // /lifeos-app/ — это был пропущенный путь (причина почему не обновлялось)
  const isAppShell =
    p === "/lifeos-app/" ||
    p === "/lifeos-app/index.html" ||
    p.endsWith("/sw.js") ||
    p.endsWith("/manifest.json") ||
    p === "/" ||
    p === "";

  if (isAppShell) {
    e.respondWith(
      fetch(e.request, { cache: "no-store" })
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(ca => ca.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache-first для CDN (React, Babel)
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(ca => ca.put(e.request, clone));
        }
        return res;
      });
    })
  );
});

self.addEventListener("message", e => {
  if (e.data?.type === "SKIP_WAITING") self.skipWaiting();
});
