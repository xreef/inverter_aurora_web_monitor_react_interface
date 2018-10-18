import { combineReducers } from 'redux';

import version from './version';
import notifications from './notifications';
import subscriptionsServiceWorker from './subscriptionsServiceWorker';
import inverterDaily from './inverterDaily';

const reducersAurora = combineReducers({
    version,
    notifications,
    subscriptionsServiceWorker,
    inverterDaily
});

export default reducersAurora