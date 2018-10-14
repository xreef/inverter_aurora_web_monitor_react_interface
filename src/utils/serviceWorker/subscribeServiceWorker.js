export const subscribeServiceWorker = (callBack) => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js').then((registration) => {
                callBack(
                        {
                            variant: 'info',
                            message: 'ServiceWorker registration successful with scope: ' + registration.scope,
                            title: 'ServiceWorker registered',
                            exitStatus: true,
                            registration: registration
                        }
                    );
            }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
                callBack(
                    {
                        variant: 'error',
                        message: 'ServiceWorker registration failed: ' + err,
                        title: 'ServiceWorker registration failed',
                        exitStatus: false,
                        registration: null
                    }
                );
            }).catch(function(err) {
                console.log(err);
                callBack(
                    {
                        variant: 'error',
                        message: 'ServiceWorker registration failed: ' + err,
                        title: 'ServiceWorker registration failed',
                        exitStatus: false,
                        registration: null
                    }
                );
            });
    })
    }
};