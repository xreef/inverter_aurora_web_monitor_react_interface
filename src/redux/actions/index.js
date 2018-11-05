/**
 * Created by renzo on 17/05/2017.
 */

import { setVersion } from './version';
import { addNotification, shiftNotification } from './notifications';
import { setPushNotificationSupported, setServiceWorkerSubscription, setUserSubscribedToPushNotification } from './subscriptionsServiceWorker';
import {
  inverterDailyPowerFetch, inverterDailyPowerFetchCancel, inverterDailyPowerFetchFulfilled, inverterDailyPowerFetchRejected
} from './inverterDailyPower';
import {
  inverterDailyCurrentFetch, inverterDailyCurrentFetchCancel, inverterDailyCurrentFetchFulfilled, inverterDailyCurrentFetchRejected
} from './inverterDailyCurrent';
import {
  inverterDailyVoltageFetch, inverterDailyVoltageFetchCancel, inverterDailyVoltageFetchFulfilled, inverterDailyVoltageFetchRejected
} from './inverterDailyVoltage';
import {
  productionTotalsFetch, productionTotalsFetchCancel, productionTotalsFetchFulfilled, productionTotalsFetchRejected
} from './productionTotals';
import {
  monthlyPowerStatsFetch, monthlyPowerStatsFetchCancel, monthlyPowerStatsFetchFulfilled, monthlyPowerStatsFetchRejected
} from './monthlyPowerStats';
import {
  inverterInfoFetch, inverterInfoFetchCancel, inverterInfoFetchFulfilled, inverterInfoFetchRejected
} from './inverterInfo';
import {
  inverterAlarmsFetch, inverterAlarmsFetchCancel, inverterAlarmsFetchFulfilled, inverterAlarmsFetchRejected
} from './inverterAlarms';
import {
  configurationFetch, configurationFetchCancel, configurationFetchFulfilled, configurationFetchRejected,
  configurationFieldUpdated, configurationFieldInvalid, configurationAdd, configurationAddSuccess, configurationAddFailed

} from './configuration';

export {
  setVersion,
  addNotification, shiftNotification,
  setPushNotificationSupported, setServiceWorkerSubscription, setUserSubscribedToPushNotification,
  inverterDailyPowerFetch, inverterDailyPowerFetchCancel, inverterDailyPowerFetchFulfilled, inverterDailyPowerFetchRejected,
  inverterDailyCurrentFetch, inverterDailyCurrentFetchCancel, inverterDailyCurrentFetchFulfilled, inverterDailyCurrentFetchRejected,
  inverterDailyVoltageFetch, inverterDailyVoltageFetchCancel, inverterDailyVoltageFetchFulfilled, inverterDailyVoltageFetchRejected,
  productionTotalsFetch, productionTotalsFetchCancel, productionTotalsFetchFulfilled, productionTotalsFetchRejected,
  monthlyPowerStatsFetch, monthlyPowerStatsFetchCancel, monthlyPowerStatsFetchFulfilled, monthlyPowerStatsFetchRejected,
  inverterInfoFetch, inverterInfoFetchCancel, inverterInfoFetchFulfilled, inverterInfoFetchRejected,
  inverterAlarmsFetch, inverterAlarmsFetchCancel, inverterAlarmsFetchFulfilled, inverterAlarmsFetchRejected,
  configurationFetch, configurationFetchCancel, configurationFetchFulfilled, configurationFetchRejected,
  configurationFieldUpdated, configurationFieldInvalid, configurationAdd, configurationAddSuccess, configurationAddFailed
};
