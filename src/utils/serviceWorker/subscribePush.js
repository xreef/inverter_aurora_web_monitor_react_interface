export const checkPushNotificationSupport = () => {
    if ('PushManager' in window){
        console.log('Push is supported');
        return {
            variant: "info",
            message:"Push supported",
            exitStatus: true
        }
    }else{
        console.log('Push is not supported');
        return {
            variant: "warning",
            message:"Push is not supported",
            exitStatus: false
        };
    }
};

export const checkUserSubscribedToPushNotification = (registration) => {
    registration.pushManager.getSubscription()
        .then((subscription) => {
            let isSubscribed = !(subscription === null);

            if (isSubscribed) {
                console.log('User is push notification subscribed.');
                return {
                    variant: "info",
                    message:"User is push notification subscribed.",
                    exitStatus: true
                };
            } else {
                console.log('User is push notification NOT subscribed.');
                return {
                    variant: "warning",
                    message:"User is push notification NOT subscribed.",
                    exitStatus: false
                };
            }
        });
};

export const subscribePush = () => {
    navigator.serviceWorker.ready.then((registration) => {
        // ALREADY CHECKED
        // if (!registration.pushManager) {
        //     alert('Your browser doesn\'t support push notification.');
        //     return false;
        // }

        //To subscribe `push notification` from push manager
        registration.pushManager.subscribe({
            userVisibleOnly: true //Always show notification when received
        })
            .then( (subscription) => {
                console.info('Push notification subscribed.');
                console.log(subscription);

                return {
                    exitStatus: true,
                    variant: 'success',
                    message: 'Subscribed successfully.'
                };
                //saveSubscriptionID(subscription);
                // this.setState({serviceWorker:{
                //         ...this.state.serviceWorker,
                //         isPushSubscribed: true
                //     }});

            })
            .catch((error) => {
                console.error('Push notification subscription error: ', error);

                if (error.code===0){
                    return {
                        exitStatus: false,
                        variant: 'warning',
                        message: 'You not allow notification'
                    };

                }else {
                    return {
                        exitStatus: false,
                        variant: 'error',
                        message: 'Push notification subscription error: ' + error
                    };
                }
            });
    })
};

// Unsubscribe the user from push notifications
export const unsubscribePush = () => {
    navigator.serviceWorker.ready
        .then((registration) => {
            //Get `push subscription`
            registration.pushManager.getSubscription()
                .then((subscription) => {
                    //If no `push subscription`, then return
                    if(!subscription) {
                        return {
                                variant: "error",
                                message: 'Unable to unregister push notification.'
                            };
                    }

                    //Unsubscribe `push notification`
                    subscription.unsubscribe()
                        .then(() => {
                            console.info('Push notification unsubscribed.');
                            console.log(subscription);

                            return {
                                exitStatus: false,
                                variant: "success",
                                message: "Unsubscribed successfully."
                            };
                        })
                        .catch(function (error) {
                            console.error(error);

                            return {
                                exitStatus: false,
                                variant: "error",
                                message: error
                            };
                        });
                })
                .catch(function (error) {
                    console.error('Failed to unsubscribe push notification.');
                    return {
                        exitStatus: false,
                        variant: "error",
                        message: error
                    };
                });
        })
};
