export const MICROCONTROLLER_ADRESS = `${(settings.localIP)?settings.localIP:location.hostname}:${settings.localRestPort}`;
export const MICROCONTROLLER_WS_ADRESS = `ws://${(settings.localIP)?settings.localIP:location.hostname}:${settings.localWSPort}`;

export const PRODUCTION_ENDPOINT = 'production';
export const BATTERY_ENDPOINT = 'battery';
export const PRODUCTION_TOTALS_ENDPOINT = 'productionTotal';
export const MONTLY_POWER_STATS_ENDPOINT = 'monthly';
export const INVERTER_INFO_ENDPOINT = 'inverterInfo';
export const INVERTER_ALARMS_ENDPOINT = 'inverterState';
export const CONFIGURATION_ENDPOINT = 'config';
export const SERVER_STATE_ENDPOINT = 'serverState';
