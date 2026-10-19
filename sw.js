const CACHE = 'whusnet-fieldops-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k!==CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // API calls → network-only (biarkan gagal offline, queue di IndexedDB)
  if(url.pathname.startsWith('/api/')) return;
  // Static assets → cache-first
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(fetchRes => {
      if(fetchRes.ok) caches.open(CACHE).then(c => c.put(e.request, fetchRes.clone()));
      return fetchRes;
    }).catch(() => caches.match('./index.html'))) // fallback offline
  );
});

// Background Sync (kirim outbox saat online)
self.addEventListener('sync', e => {
  if(e.tag==='sync-outbox') e.waitUntil(syncOutbox());
});

async function syncOutbox() {
  // Buka IndexedDB di SW (butuh idb di SW, atau gunakan broadcast channel ke main thread)
  // Implementasi penuh lumayan panjang – placeholder
  console.log('[SW] Background sync triggered');
}
