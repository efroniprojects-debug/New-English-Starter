const CACHE_NAME = "abc-explorer-v2";
const urlsToCache = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", event => {
  console.log("🚀 ABC Explorer PWA Installing");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
