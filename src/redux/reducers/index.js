import { combineReducers } from 'redux';

import version from './version';
import notifications from './notifications';
import subscriptionsServiceWorker from './subscriptionsServiceWorker';
import inverterDailyVoltage from './inverterDailyVoltage';
import inverterDailyCurrent from './inverterDailyCurrent';
import inverterDailyPower from './inverterDailyPower';
import productionTotals from './productionTotals';

const reducersAurora = combineReducers({
    version,
    notifications,
    subscriptionsServiceWorker,
    inverterDailyVoltage,
    inverterDailyCurrent,
    inverterDailyPower,
    productionTotals
});

export default reducersAurora