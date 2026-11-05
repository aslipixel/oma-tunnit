'use strict';
(()=>{
const el=document.createElement('p');el.className='note';el.setAttribute('role','status');document.querySelector('.tools').after(el);
let state='loading';
const messages={loading:'Valmistellaan offline-käyttöä…',ready:'Valmis käytettäväksi ilman internetiä',error:'Offline-käyttö ei ole valmis. Avaa sivu uudelleen verkkoyhteydellä.'};
function show(){el.textContent=messages[state]}
show();
async function ready(){try{const cache=await caches.open('omat-tunnit-offline-v2');const needed=['./index.html','./app.js','./offline.js'];const found=await Promise.all(needed.map(x=>cache.match(x)));if(navigator.serviceWorker.controller&&found.every(Boolean))state='ready';show()}catch{state='error';show()}}
if(!('serviceWorker' in navigator)){state='error';show();return}
navigator.serviceWorker.addEventListener('controllerchange',ready);
navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(reg=>{navigator.serviceWorker.ready.then(ready);if(reg.installing)reg.installing.addEventListener('statechange',()=>{if(reg.installing?.state==='redundant'){state='error';show()}})}).catch(()=>{state='error';show()});
setTimeout(()=>{if(state==='loading'){state='error';show()}},30000);
})();
