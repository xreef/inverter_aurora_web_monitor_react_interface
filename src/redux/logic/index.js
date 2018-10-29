import inverterDailyPowerFetchLogic from './inverterDailyPower'
import inverterDailyCurrentFetchLogic from './inverterDailyCurrent'
import inverterDailyVoltageFetchLogic from './inverterDailyVoltage'
import productionTotalsFetchLogic from './productionTotals'
import monthlyPowerStatsFetchLogic from './monthlyPowerStats'
import inverterInfo from './inverterInfo'

export default [
    ...inverterDailyPowerFetchLogic,
    ...inverterDailyCurrentFetchLogic,
    ...inverterDailyVoltageFetchLogic,
    ...productionTotalsFetchLogic,
    ...monthlyPowerStatsFetchLogic,
    ...inverterInfo
];