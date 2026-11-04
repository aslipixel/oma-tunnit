'use strict';
const CACHE='omat-tunnit-offline-v1';
const FILES=['./','./index.html','./app.js','./offline.js','./manifest.webmanifest','./icon.svg','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(FILES.map(url=>new Request(url,{cache:'reload'})));await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{await self.clients.claim()})()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith((async()=>{const cache=await caches.open(CACHE);if(event.request.mode==='navigate'){const page=await cache.match('./index.html');if(page)return page}const saved=await cache.match(event.request,{ignoreSearch:true});return saved||fetch(event.request)})())});
// update 2
