// Life OS Service Worker — v24
// ⚠️ CACHE_NAME — меняй ЭТУ строку при каждом обновлении index.html
const CACHE_NAME = "lifeos-v26";
const ALWAYS_FRESH = ["index.html", "sw.js", "./", "/", "manifest.json"];

self.addEventListener("install", e => {
  // Активируемся НЕМЕДЛЕННО — не ждём закрытия старых вкладок
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./icon-192.png",
        "./icon-512.png"
      ]).catch(()=>{}) // не падаем если иконок нет
    )
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    // Удаляем все старые кеши с другим именем
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim()) // берём контроль над всеми вкладками немедленно
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);

  // Для index.html и sw.js — ВСЕГДА тянуть с сети (network-first, no cache)
  const alwaysFresh = ALWAYS_FRESH.some(f =>
    url.pathname.endsWith(f) || url.pathname === "/" || url.pathname === ""
  );

  if (alwaysFresh) {
    e.respondWith(
      fetch(e.request, { cache: "no-store" })
        .then(res => {
          // Обновляем кеш свежей версией
          const clone = res.clone();
          caches.open(CACHE_NAME).then(ca => ca.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request)) // fallback к кешу если офлайн
    );
    return;
  }

  // Для CDN (React, Babel и т.д.) — cache-first
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

// Обработчик сообщения SKIP_WAITING от страницы
self.addEventListener("message", e => {
  if (e.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
