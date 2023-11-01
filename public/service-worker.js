// // service-worker.js
// const cacheName = 'cacheweb';
var CACHE_NAME = 'mywebcache';
var urlsToCache = [
  "/dist/index.html",
  "/dist/service-worker.js",
  "/dist/assets/Home-4151810d.js",
  "/dist/logo.ico",
  "/dist/assets/Home-e4e14672.css",
  "/dist/assets/Default-00baa9b4.js",
  "/dist/assets/Default-81fe385f.css",
  "/dist/assets/index-7f909984.js",
  "/dist/assets/index-82b8739c.js",
  "/dist/assets/index-8b12752d.css",
  "/dist/assets/swipe-up-9ebc8446.svg",
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});
self.addEventListener('activate', function (event) {
    var cacheWhitelist = ['mywebcache', 'other-cache-v1'];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                console.log("Cache hit - return response");
                console.log(response);
                if (response) {
                    return response;
                }
                console.log(event.request);
                return fetch(event.request);
            }
            )
    );
});