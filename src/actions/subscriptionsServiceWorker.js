export const setServiceWorkerSubscription = (isServiceWorkerSubscribed, registration) => ({
    type: 'SET_SUBSCRIPTION_SERVICE_WORKER',
    isServiceWorkerSubscribed: isServiceWorkerSubscribed,
    registration: registration
});

export const setPushNotificationSupported = (isPushNotificationSupported) => ({
    type: 'SET_PUSH_NOTIFICATION_IS_SUPPORTED',
    isPushNotificationSupported: isPushNotificationSupported
});

export const setUserSubscribedToPushNotification = (isUserSubscribedToPushNotification) => ({
    type: 'SET_USER_SUBSCRIBED_TO_PUSH_NOTIFICATION',
    isUserSubscribedToPushNotification: isUserSubscribedToPushNotification
});





