export const subscribeServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js').then((registration) => {
                return {
                    variant: 'info',
                    message: 'ServiceWorker registration successful with scope: ' + registration.scope,
                    exitStatus: true,
                    registration: registration
                }
            }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
                return {
                    variant: 'error',
                    message: 'ServiceWorker registration failed: ' + err,
                    exitStatus: false
                }

            }).catch(function(err) {
                console.log(err)
                return {
                    variant: 'error',
                    message: 'ServiceWorker registration failed: ' + err,
                    exitStatus: false
                }
            });
    })
    }
};