// service-worker.js

const CACHE_NAME = 'trailwalker-cache-v1';
const urlsToCache = [
    './',                  // Utiliser './' pour la racine du projet
    './index.html',         // Ajouter './' devant chaque fichier pour GitHub Pages
    './style.min.css',
    './script.min.js',
    './01 km.mp4',
    './03 km.mp4',
    './10 km.mp4',
    './15 km.mp4',
    './20 km.mp4',
    './25 km.mp4',
    './30 km.mp4',
    './35 km.mp4',
    './40 km.mp4',
    './45 km.mp4',
    './50 km.mp4',
    './55 km.mp4',
    './60 km.mp4',
    './65 km.mp4',
    './70 km.mp4',
    './75 km.mp4',
    './80 km.mp4',
    './85 km.mp4',
    './90 km.mp4',
    './95 km.mp4',
    './100 km.mp4',
    // Ajoutez ici toutes les vidéos et ressources que vous souhaitez mettre en cache
];



self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Fichiers mis en cache');
                return Promise.all(urlsToCache.map(url => {
                    return cache.add(url).catch(err => {
                        console.error('Échec de la mise en cache pour', url, ':', err);
                    });
                }));
            })
    );
});

// Intercepter les requêtes réseau et servir les fichiers depuis le cache si disponibles
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si la réponse est dans le cache, on la renvoie
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Mettre à jour le Service Worker (supprimer l'ancien cache)
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});