const CACHE = 'counter-v5';
const FILES = ['./', './index.html', './manifest.json', './splash.jpg',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './favicon.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); });
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
