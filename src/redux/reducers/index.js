import { combineReducers } from 'redux';

import version from './version';
import notifications from './notifications';
import subscriptionsServiceWorker from './subscriptionsServiceWorker';
import inverterDailyVoltage from './inverterDailyVoltage';
import inverterDailyCurrent from './inverterDailyCurrent';
import inverterDailyBattery from './inverterDailyBattery';
import inverterDailyPower from './inverterDailyPower';
import productionTotals from './productionTotals';
import monthlyPowerStats from './monthlyPowerStats';
import inverterInfo from './inverterInfo';
import inverterAlarms from './inverterAlarms';
import configuration from './configuration';
import home from './home';
import daily from './daily';
import historical from './historical';
import inverterInfoState from './inverterInfoState';
import serverState from './serverState';
import realtimeUpdate from './realtimeUpdate';
import realtimeData from './realtimeData';

const reducersAurora = combineReducers({
  version,
  notifications,
  subscriptionsServiceWorker,
  inverterDailyVoltage,
  inverterDailyCurrent,
  inverterDailyBattery,
  inverterDailyPower,
  productionTotals,
  monthlyPowerStats,
  inverterInfo,
  inverterAlarms,
  configuration,
  home,
  daily,
  historical,
  inverterInfoState,
  serverState,
  realtimeUpdate,
  realtimeData
});

export default reducersAurora;
