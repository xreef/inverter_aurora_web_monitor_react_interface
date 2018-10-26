import inverterDailyPowerFetchLogic from './inverterDailyPower'
import inverterDailyCurrentFetchLogic from './inverterDailyCurrent'
import inverterDailyVoltageFetchLogic from './inverterDailyVoltage'
import productionTotalsFetchLogic from './productionTotals'

export default [
    ...inverterDailyPowerFetchLogic,
    ...inverterDailyCurrentFetchLogic,
    ...inverterDailyVoltageFetchLogic,
    ...productionTotalsFetchLogic
];