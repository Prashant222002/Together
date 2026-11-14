const V="tg-v3",CORE=["./","index.html","style.css","app.js","manifest.json","firebase-config.js","icon-192.png","icon-512.png"];
// Files that change on every deploy: always try the network first, fall back to cache when offline.
const FRESH=["app.js","style.css","firebase-config.js","manifest.json","index.html","sw.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const put=(r,x)=>{if(!x||!(x.ok||x.type==="opaque"))return;const c=x.clone();caches.open(V).then(h=>h.put(r,c))};
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(u.hostname.endsWith("googleapis.com")&&u.hostname!=="fonts.googleapis.com")return;
 const nav=r.mode==="navigate",fresh=u.origin===location.origin&&FRESH.some(f=>u.pathname.endsWith(f));
 if(nav||fresh){const key=nav?"index.html":r;e.respondWith(fetch(r,{cache:"no-cache"}).then(x=>{put(key,x);return x}).catch(()=>caches.match(key,{ignoreSearch:true})));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{put(r,x);return x})))});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>l.length?l[0].focus():clients.openWindow("./")))});
