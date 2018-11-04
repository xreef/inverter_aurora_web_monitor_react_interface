import { combineReducers } from 'redux';

import version from './version';
import notifications from './notifications';
import subscriptionsServiceWorker from './subscriptionsServiceWorker';
import inverterDailyVoltage from './inverterDailyVoltage';
import inverterDailyCurrent from './inverterDailyCurrent';
import inverterDailyPower from './inverterDailyPower';
import productionTotals from './productionTotals';
import monthlyPowerStats from './monthlyPowerStats';
import inverterInfo from './inverterInfo';
import inverterAlarms from './inverterAlarms';
import configuration from './configuration';

const reducersAurora = combineReducers({
  version,
  notifications,
  subscriptionsServiceWorker,
  inverterDailyVoltage,
  inverterDailyCurrent,
  inverterDailyPower,
  productionTotals,
  monthlyPowerStats,
  inverterInfo,
  inverterAlarms,
  configuration
});

export default reducersAurora;
