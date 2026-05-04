// Life OS Service Worker — v19
const CACHE_NAME = "lifeos-v18";
const ALWAYS_FRESH = ["index.html", "sw.js", "./", "/"];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"]).catch(()=>{})
    )
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))
    ).then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  const isAlwaysFresh = ALWAYS_FRESH.some(f=>
    url.pathname.endsWith(f)||url.pathname==="/"||url.pathname===""
  );
  if(isAlwaysFresh){
    e.respondWith(
      fetch(e.request,{cache:"no-store"})
        .then(res=>{const clone=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,clone));return res;})
        .catch(()=>caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(cached=>{
        if(cached) return cached;
        return fetch(e.request).then(res=>{
          if(res.ok){const clone=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,clone));}
          return res;
        });
      })
    );
  }
});

self.addEventListener("message", e => {
  if(e.data?.type==="SKIP_WAITING") self.skipWaiting();
});
