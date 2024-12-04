const CACHE_NAME = "capiTask-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/js/util/util.js",
  "/js/app.js",
  "/js/db.js",
  "/js/edit-task.js",
  "/js/new-task.js",
  "/manifest.json",
  "https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/lumen/bootstrap.min.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
