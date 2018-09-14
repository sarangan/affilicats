const VERSION=1536940900294,OFFLINE_CACHE=`offline_${1536940900294}`,TIMEOUT=5e3,HOME_URL="https://tomayac.github.io/affilicats/index.html",OFFLINE_IMG_URL="./img/offline.svg",TIMEOUT_IMG_URL="./img/timeout.svg",MANIFEST_URL="./manifest.webmanifest",STATIC_FILES=["./index.html","./forward.html","./js/main.js","./js/forward.js","./img/cat.png","./img/map.svg",MANIFEST_URL,OFFLINE_IMG_URL,TIMEOUT_IMG_URL];self.addEventListener("install",a=>{self.skipWaiting(),a.waitUntil((async()=>{const a=await caches.open(OFFLINE_CACHE);return await a.addAll(STATIC_FILES),await a.put("https://commons.wikimedia.org/timeout",new Response(JSON.stringify({query:{pages:{1:{imageinfo:[{thumburl:TIMEOUT_IMG_URL,thumbwidth:15,thumbheight:15,descriptionshorturl:"#",extmetadata:{ImageDescription:{value:"Results took too long to load\u2026"}}}]}}}}),{headers:{"content-type":"application/json"}})),await a.put("https://www.random.org/timeout",new Response("Offers timed out while loading\n",{headers:{"content-type":"text/plain"}})),await a.put("https://baconipsum.com/timeout",new Response(JSON.stringify(["Review took too long to load\u2026"]),{headers:{"content-type":"application/json"}})),await a.put("https://commons.wikimedia.org/offline",new Response(JSON.stringify({query:{pages:{1:{imageinfo:[{thumburl:OFFLINE_IMG_URL,thumbwidth:15,thumbheight:15,descriptionshorturl:"#",extmetadata:{ImageDescription:{value:"Can't search while offline\u2026"}}}]}}}}),{headers:{"content-type":"application/json"}})),await a.put("https://www.random.org/offline",new Response("Offers can't be loaded while offline\n",{headers:{"content-type":"text/plain"}})),void(await a.put("https://baconipsum.com/offline",new Response(JSON.stringify(["Review can't be loaded while offline\u2026"]),{headers:{"content-type":"application/json"}})))})())}),self.addEventListener("activate",a=>{a.waitUntil((async()=>{const a=await caches.keys();return Promise.all(a.map(a=>{if(a!==OFFLINE_CACHE)return caches.delete(a)})).then(()=>self.clients.claim())})())}),self.addEventListener("fetch",a=>{if(!a.request.url.startsWith("http")||"GET"!==a.request.method)return;const b=async(a,b={},d={})=>{const e=await caches.open(OFFLINE_CACHE),f=await e.match(a,b);return f||c(a,"",new URL(a.url))},c=async(a,b,c)=>{const d=new Promise(d=>setTimeout(async()=>{const e=await caches.open(OFFLINE_CACHE);if("image"===b)return d(e.match(TIMEOUT_IMG_URL));if("manifest"===b)return d(e.match(MANIFEST_URL));if(!b){if("https://commons.wikimedia.org"===c.origin||"https://www.random.org"===c.origin||"https://baconipsum.com"===c.origin)return d(e.match(`${c.origin}/timeout`,{ignoreSearch:!0}));if("https://placekitten.com"===c.origin)return d(e.match(TIMEOUT_IMG_URL))}return d(e.match(a))},TIMEOUT)),e=(async()=>{try{const b=await fetch(a);if(c.origin===location.origin&&!b.ok)throw new TypeError(`Could not load ${a.url}`);return b}catch(a){const d=await caches.open(OFFLINE_CACHE);if("image"===b)return d.match(OFFLINE_IMG_URL);if("manifest"===b)return d.match(MANIFEST_URL);if(!b){if("https://commons.wikimedia.org"===c.origin||"https://www.random.org"===c.origin||"https://baconipsum.com"===c.origin)return d.match(`${c.origin}/offline`);if("https://placekitten.com"===c.origin)return d.match(OFFLINE_IMG_URL)}}})();return Promise.race([d,e])};a.respondWith((async()=>{const d=a.request,e=new URL(d.url);if("navigate"===d.mode){if(e.pathname.endsWith("/")){e.pathname+="index.html";const a=e.href;return b(new Request(a),{ignoreSearch:!0})}return b(d,{ignoreSearch:!0})}const f=d.destination;if(f){if("script"===f)return"https://unpkg.com"===e.origin?b(d,{},{mode:"no-cors"}):b(d);if("image"===f)return STATIC_FILES.includes(d.url)?b(d):c(d,f,e)}return"https://unpkg.com"===e.origin?b(d,{},{mode:"no-cors"}):c(d,f,e)})())}),self.addEventListener("push",a=>{a.waitUntil(self.registration.showNotification("\uD83D\uDC08 AffiliCats Price Drop Alert \uD83D\uDEA8",{body:"Prices for cats are going down! \uD83D\uDCC9",icon:"./img/cat.png"}))}),self.addEventListener("notificationclick",async a=>{a.waitUntil((async()=>{a.notification.close();const b=await clients.matchAll({type:"window"});for(const a of b)if(a.url===HOME_URL&&"focus"in a)return a.focus();if(clients.openWindow)return clients.openWindow(HOME_URL)})())});