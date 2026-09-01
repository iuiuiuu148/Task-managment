self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => { self.clients.claim(); });
self.addEventListener("fetch", (e) => {
  // Network-first, no offline cache needed since the app requires a live connection anyway.
  e.respondWith(fetch(e.request).catch(() => new Response("Offline", { status: 503 })));
});
