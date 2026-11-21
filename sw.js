/* Onsite, the construction app, used to live at getonsiteapp.com and now lives at
   construction.getonsiteapp.com. Phones that installed it here still hold its old service worker,
   which checks this address for updates. This replaces it: it clears what the old one saved,
   removes itself, and sends any open Onsite page to the new address. Kian Studio itself has no
   service worker. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.map(k => caches.delete(k)));
  await self.registration.unregister();
  const pages = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
  for (const page of pages) {
    const here = new URL(page.url);
    if (page.navigate) page.navigate("https://construction.getonsiteapp.com" + here.pathname + here.search + here.hash);
  }
})()));
