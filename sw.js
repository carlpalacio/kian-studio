/* OnCon, the construction app, used to live at getonsiteapp.com (the old domain) and now lives at
   oncon.onsiteph.com. Phones that installed it there still hold its old service worker, which
   checks https://getonsiteapp.com/sw.js for updates. This replaces it: it clears what the old one
   saved, removes itself, and sends any open OnCon page to the new address. Browsers don't follow a
   forward for a service worker, so the server must keep answering getonsiteapp.com/sw.js with this
   file itself, even though every other getonsiteapp.com address forwards to onsiteph.com.
   The Onsite studio page itself has no service worker. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.map(k => caches.delete(k)));
  await self.registration.unregister();
  const pages = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
  for (const page of pages) {
    const here = new URL(page.url);
    if (page.navigate) page.navigate("https://oncon.onsiteph.com" + here.pathname + here.search + here.hash);
  }
})()));
