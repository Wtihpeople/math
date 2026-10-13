// 라임라잇 선생님 앱 — 오프라인용 서비스 워커 (앱 껍데기만 캐시, 데이터는 항상 네트워크)
// 페이지는 네트워크 우선(새 버전이 바로 반영), 안 되면 캐시. 폰트·아이콘은 캐시 우선.
const C = 'll-teacher-v5';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './logo.png', './logo-dark.png',
  './fonts/Pretendard-Regular.woff2', './fonts/Pretendard-Medium.woff2', './fonts/Pretendard-SemiBold.woff2', './fonts/Pretendard-Bold.woff2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return; // Apps Script는 네트워크
  if (e.request.mode === 'navigate' || /index\.html$|\/$/.test(u.pathname)) {
    e.respondWith(fetch(e.request).then(r => { if (r.ok) { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); } return r; }).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { if (res.ok) { const cp = res.clone(); caches.open(C).then(c => c.put(e.request, cp)); } return res; })));
});
