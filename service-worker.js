/* ============================================================
   MICROLEARN PWA – service-worker.js
   Strategia: Cache-First dla assetów, Network-First dla danych
   ============================================================ */

const CACHE_NAME = 'microlearn-v1.2';
const RUNTIME_CACHE = 'microlearn-runtime-v1';

// Pliki do pre-cache (dostępne offline od razu)
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap'
];

// ===================== INSTALL =====================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing MicroLearn Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('[SW] Pre-cache complete');
        return self.skipWaiting(); // Aktywuj od razu
      })
      .catch(err => console.error('[SW] Pre-cache failed:', err))
  );
});

// ===================== ACTIVATE =====================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

// ===================== FETCH =====================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET and chrome-extension
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // Google Fonts – Cache-First
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(request, CACHE_NAME));
    return;
  }

  // App Shell – Cache-First (HTML, CSS, JS)
  if (url.origin === self.location.origin) {
    const pathname = url.pathname;
    if (pathname.endsWith('.html') || pathname.endsWith('.css') ||
        pathname.endsWith('.js') || pathname.endsWith('.json') ||
        pathname === '/' || pathname.endsWith('/')) {
      event.respondWith(cacheFirst(request, CACHE_NAME));
      return;
    }
    // Inne assety lokalne (obrazy, ikony) – Cache-First z fallbackiem
    event.respondWith(cacheFirst(request, RUNTIME_CACHE));
    return;
  }

  // Zewnętrzne zasoby – Network-First
  event.respondWith(networkFirst(request, RUNTIME_CACHE));
});

// ===================== STRATEGIE =====================

// Cache-First: sprawdź cache, jeśli brak — pobierz i zapisz
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    return offlineFallback(request);
  }
}

// Network-First: pobierz z sieci, jeśli błąd — sprawdź cache
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return offlineFallback(request);
  }
}

// Offline fallback
async function offlineFallback(request) {
  const url = new URL(request.url);
  // Dla żądań HTML — zwróć główny index.html
  if (request.headers.get('accept')?.includes('text/html')) {
    const cached = await caches.match('./index.html');
    if (cached) return cached;
  }
  // Fallback response
  return new Response(
    JSON.stringify({ error: 'offline', message: 'Brak połączenia z internetem' }),
    { status: 503, headers: { 'Content-Type': 'application/json' } }
  );
}

// ===================== PUSH NOTIFICATIONS =====================
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || '⚡ MicroLearn';
  const options = {
    body: data.body || 'Czas na dzisiejszą lekcję! 📚',
    icon: './icons/icon-192.png',
    badge: './icons/icon-72.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || './' },
    actions: [
      { action: 'open', title: 'Otwórz lekcję' },
      { action: 'dismiss', title: 'Później' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  const url = event.notification.data?.url || './';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(url);
      })
  );
});

// ===================== BACKGROUND SYNC =====================
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-progress') {
    console.log('[SW] Background sync: syncing progress...');
    // Tu można dodać sync z serwerem
  }
});

// ===================== MESSAGE =====================
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: CACHE_NAME });
  }
});
