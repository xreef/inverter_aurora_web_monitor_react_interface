import { combineReducers } from 'redux';

import version from './version';
import notifications from './notifications';
import subscriptionsServiceWorker from './subscriptionsServiceWorker';

const reducersAurora = combineReducers({
    version,
    notifications,
    subscriptionsServiceWorker
});

export default reducersAurora