// // service-worker.js
// const cacheName = 'cacheweb';
var CACHE_NAME = 'mywebcache';
var urlsToCache = [
  "/dist/index.html",
  "/dist/service-worker.js",
  "/dist/manifest.webmanifest",
  "/dist/logo.ico",
  "/dist/registerSW.js",
  "/dist/workbox-fa446783.js",
  "/dist/sw.js",

  "/dist/assets/CounterView-02abda18.js",
  "/dist/assets/CounterView-249271e3.css",

  "/dist/assets/Default-00baa9b4.js",
  "/dist/assets/Default-81fe385f.css",

  "/dist/assets/Home-4151810d.js",
  "/dist/assets/Home-e4e14672.css",

  "/dist/assets/index-c2224ecc.js",
  "/dist/assets/index-ef5b6b6d.css",
  "/dist/assets/index-7f909984.js",
  "/dist/assets/index-82b8739c.js",
  "/dist/assets/index-8b12752d.css",
  "/dist/assets/RoomList-ba8b8e3b.js",
  "/dist/assets/RoomList-472ccd1d.css",
  "/dist/assets/VTextField-1703bbb5.js",
  "/dist/assets/VTextField-c9ec5395.css",
  "/dist/assets/webfontloader-523643f5.js",
  "/dist/assets/VRow-20ccf7c6.js",
  "/dist/assets/VRow-25b4deb0.css",
  "/dist/assets/VIcon-e5a2fc59.js",
  "/dist/assets/VIcon-3341b1ae.css",
  "/dist/assets/VDivider-4f59723d.js",
  "/dist/assets/VDivider-357e019d.css",
  "/dist/assets/VCard-d20d347b.css",
  "/dist/assets/VCard-71cb86db.js",
  "/dist/assets/VBtn-89f2b8d4.js",
  "/dist/assets/VBtn-614b570d.css",
  "/dist/assets/TeamView-3fb64ce8.js",
  "/dist/assets/TeamView-756102c1.css",
  "/dist/assets/TestView-7c1f1122.js",
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