/* Service Worker — La Biblia en un Año (PWA: sin conexión + notificaciones) */
const CACHE = 'biblia365-v5';
const FILES = ['./', 'index.html', 'plan.js', 'comentarios.js', 'confesiones.js', 'estudio.js', 'manifest.json', 'Logo Ad Fontes.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Red primero (para recibir actualizaciones del sitio); caché como respaldo sin conexión.
   Solo cacheamos nuestro propio dominio — nunca BibleGateway, TBS ni Firebase. */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copia = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copia));
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});

/* Notificaciones push (recordatorios de lectura) */
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) {}
  const n = d.notification || d; /* FCM envía {notification:{...}}; también aceptamos formato plano */
  e.waitUntil(self.registration.showNotification(n.title || '📖 La Biblia en un Año', {
    body: n.body || 'Tu lectura de hoy te espera. «Lámpara es a mis pies tu palabra» (Sal 119:105)',
    icon: n.icon || 'Logo Ad Fontes.png',
    badge: 'Logo Ad Fontes.png'
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('https://adfontesproject.github.io/'));
});
