import inverterDailyPowerFetchLogic from './inverterDailyPower';
import inverterDailyCurrentFetchLogic from './inverterDailyCurrent';
import inverterBatteryFetchLogic from './inverterDailyBattery';
import inverterDailyVoltageFetchLogic from './inverterDailyVoltage';
import productionTotalsFetchLogic from './productionTotals';
import monthlyPowerStatsFetchLogic from './monthlyPowerStats';
import inverterInfo from './inverterInfo';
import inverterAlarms from './inverterAlarms';
import configurationGET from './configurationGET';
import configurationPost from './configurationPost';
import serverState from './serverState';
import realtimeUpdate from './realtimeUpdate';

export default [
  ...inverterDailyPowerFetchLogic,
  ...inverterDailyCurrentFetchLogic,
  ...inverterBatteryFetchLogic,
  ...inverterDailyVoltageFetchLogic,
  ...productionTotalsFetchLogic,
  ...monthlyPowerStatsFetchLogic,
  ...inverterInfo,
  ...inverterAlarms,
  ...configurationGET,
  ...configurationPost,
  ...serverState,
  ...realtimeUpdate
];
