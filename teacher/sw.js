// 라임라잇 선생님 앱 — 오프라인용 서비스 워커 (앱 껍데기만 캐시, 데이터는 항상 네트워크)
const C = 'll-teacher-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return; // Apps Script·폰트는 네트워크
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
