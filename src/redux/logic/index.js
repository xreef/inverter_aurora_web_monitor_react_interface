import inverterDailyPowerFetchLogic from './inverterDailyPower'
import inverterDailyCurrentFetchLogic from './inverterDailyCurrent'
import inverterDailyVoltageFetchLogic from './inverterDailyVoltage'

export default [
    ...inverterDailyPowerFetchLogic,
    ...inverterDailyCurrentFetchLogic,
    ...inverterDailyVoltageFetchLogic
];