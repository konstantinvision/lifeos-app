// Life OS Service Worker — v23
// ⚠️ ВАЖНО: CACHE_NAME должен совпадать с комментарием выше
// Каждый раз при обновлении index.html меняй ОБА числа
const CACHE_NAME = "lifeos-v23";
const ALWAYS_FRESH = ["index.html", "sw.js", "./", "/"];

self.addEventListener("install", e => {
  self.skipWaiting(); // активируется немедленно
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"]).catch(()=>{})
    )
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim()) // берёт контроль над всеми вкладками
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  const fresh = ALWAYS_FRESH.some(f=>url.pathname.endsWith(f)||url.pathname==="/"||url.pathname==="");
  if(fresh){
    e.respondWith(
      fetch(e.request,{cache:"no-store"})
        .then(res=>{const c=res.clone();caches.open(CACHE_NAME).then(ca=>ca.put(e.request,c));return res;})
        .catch(()=>caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(cached=>{
        if(cached) return cached;
        return fetch(e.request).then(res=>{
          if(res.ok){const c=res.clone();caches.open(CACHE_NAME).then(ca=>ca.put(e.request,c));}
          return res;
        });
      })
    );
  }
});

self.addEventListener("message",e=>{
  if(e.data?.type==="SKIP_WAITING") self.skipWaiting();
});
