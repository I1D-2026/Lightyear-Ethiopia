const CACHE="lyl-ethiopia-v3";
const PRECACHE=["./", "index.html", "manifest.json", "assets/hero.jpg", "assets/ethiopia_map.jpg", "assets/water.jpg", "assets/student_urji.jpg", "assets/student_write.jpg", "assets/konga1.jpg", "assets/konga2.jpg", "assets/konga3.jpg", "assets/kids_backpacks.jpg", "assets/logo_i1d.png", "assets/logo_lyl.png", "assets/icon-192.png", "assets/icon-512.png", "assets/icon-512-maskable.png", "assets/apple-touch-180.png"];
self.addEventListener("install",function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){
    return Promise.all(PRECACHE.map(function(u){return c.add(u).catch(function(){});}));
  }));
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.map(function(k){return k===CACHE?null:caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(caches.open(CACHE).then(function(c){
    return c.match(e.request).then(function(hit){
      var net=fetch(e.request).then(function(res){
        if(res && (res.ok || res.type==="opaque")) c.put(e.request,res.clone());
        return res;
      }).catch(function(){return hit;});
      return hit||net;
    });
  }));
});
