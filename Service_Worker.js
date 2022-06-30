
//asignar un nombre y versi�n al cache
const CACHE_NAME = 'WebDeveloper',
  urlsToCache = [
    './',
    './index.html',
    './css/bootstrap.min.css',
    './css/home.css',
    './regist_serviceWorker.js'
  
  ];

//durante la fase de instalaci�n, generalmente se almacena en cach� los activos est�ticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Fall� registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexi�n
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
 self.addEventListener('fetch', e => {
   //Responder ya sea con el objeto en cach� o continuar y buscar la url real
   e.respondWith(
     caches.match(e.request)
       .then(res => {
         if (res) {
           //recuperar del cache
           return res
         }
         //recuperar de la petici�n a la url
         return fetch(e.request)
       })
   )
 })
      return fetch(e.request)
       })
   )
 })
