const V="tg-v2",CORE=["./","index.html","style.css","app.js","manifest.json","firebase-config.js","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const put=(r,x)=>{const c=x.clone();caches.open(V).then(h=>h.put(r,c))};
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(u.hostname.endsWith("googleapis.com")&&u.hostname!=="fonts.googleapis.com")return;
 if(r.mode==="navigate"||u.pathname.endsWith("firebase-config.js")){e.respondWith(fetch(r).then(x=>{put(r.mode==="navigate"?"index.html":r,x);return x}).catch(()=>caches.match(r.mode==="navigate"?"index.html":r,{ignoreSearch:true})));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok||x.type==="opaque")put(r,x);return x})))});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.openWindow("./"))});
