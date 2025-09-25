const CACHE_NAME = "abc-explorer-professional-v1.0";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo.jpg",
  "/icon-192-round.jpg",
  "/icon-512-round.jpg"
];

self.addEventListener("install", event => {
  console.log("🚀 Installing ABC Explorer Professional with custom logo");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("💎 Caching professional assets including custom logo");
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  console.log("✅ ABC Explorer Professional activated with logo support");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

console.log("🎨 ABC Explorer Professional Service Worker with Logo Support Ready!");
