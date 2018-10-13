import { combineReducers } from 'redux';

import version from './version';
import notifications from './notifications';

const reducersAurora = combineReducers({
    version,
    notifications
});

export default reducersAurora