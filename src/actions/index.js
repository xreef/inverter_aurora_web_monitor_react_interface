/**
 * Created by renzo on 17/05/2017.
 */

import {setVersion} from './version';
import {addNotification, shiftNotification} from './notifications';
import {setPushNotificationSupported, setServiceWorkerSubscription, setUserSubscribedToPushNotification} from './subscriptionsServiceWorker';

export {
    setVersion,
    addNotification, shiftNotification,
    setPushNotificationSupported, setServiceWorkerSubscription, setUserSubscribedToPushNotification
}