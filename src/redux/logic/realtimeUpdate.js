import { FormattedMessage, FormattedHTMLMessage, useIntl } from 'react-intl';

import { createLogic } from 'redux-logic';
import React from 'react';

import { timer } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

import {
  switchMap, retryWhen, filter, tap, map, takeUntil
} from 'rxjs/operators';
import moment from 'moment';
import {
  WEB_SOCKET_CLOSE, WEB_SOCKET_OPEN, WEB_SOCKET_DISCONNECT, webSocketError, webSocketMessage, WEB_SOCKET_SEND_MESSAGE, WEB_SOCKET_ERROR, WEB_SOCKET_CONNECT
} from '../actions/realtimeUpdate';
import {
  productionTotalsFetchFulfilled
} from '../actions/productionTotals';

import {
  serverStateBatteryFetchFulfilled,
  serverStateWIFIStrenghtFetchFulfilled
} from '../actions/serverState';

import {
  setPowerRealTime
} from '../actions/realtimeData';


import { MICROCONTROLLER_WS_ADRESS } from '../config';
import { addNotification, inverterAlarmsFetchFulfilled } from '../actions';

// const wsListenLogic = createLogic({
//   type: WEB_SOCKET_OPEN,
//   cancelType: WEB_SOCKET_CLOSE,
//   latest: true, // take latest only
//   warnTimeout: 0, // long running logic
//
//   process({
//     httpClient, getState, action$, cancelled$
//   }, dispatch, done) {
//     debugger
//     const wsSubject$ = webSocket(MICROCONTROLLER_WS_ADRESS);
//
//     wsSubject$.subscribe(
//       msg => {
//         webSocketMessage(msg);
//       },
//       err => {
//         webSocketError(err);
//       }, // Called if at any point WebSocket API signals some kind of error.
//       () => {
//         return WEB_SOCKET_CLOSE
//       } // Called when connection is closed (for whatever reason).
//     );
//
//
//     // send current inputMsg on sendMsg action
//     wsSubject$
//       .pipe(
//         filter(action => action.type === WEB_SOCKET_SEND_MESSAGE),
//         tap(x => wsSubject$.next(getState().messageToSend)),
//         takeUntil(cancelled$)
//       )
//       .subscribe();
//
//     // wsSubject$.subscribe();
//     // dispatch msgReceived with payload from server
//     // on any incoming messages
//     // returning obs subscribes to it
//     return wsSubject$.pipe(map(x => webSocketMessage(x)));
//   }
// });

const wsListenLogic = createLogic({
  type: WEB_SOCKET_OPEN,
  cancelType: WEB_SOCKET_CLOSE,
  latest: true, // take latest only
  warnTimeout: 0, // long running logic

  processOptions: {
    failType: WEB_SOCKET_ERROR,
  },

  process({
    httpClient, getState, action$, cancelled$
  }, dispatch, done) {
    const wsSubject$ = webSocket({
      url: MICROCONTROLLER_WS_ADRESS,
      openObserver: {
        next: () => {
          dispatch({ type: WEB_SOCKET_CONNECT });
          dispatch(addNotification({ message: <FormattedMessage id="websocket.open" />, variant: 'info' }));
        }
      },
      closeObserver: {
        next: () => {
          dispatch({ type: WEB_SOCKET_DISCONNECT });
          dispatch(addNotification({ message: <FormattedMessage id="websocket.close" />, variant: 'error' }));
        },
      },
    });

    // send message on WS_MSG_SEND action
    action$
      .pipe(
        filter(action => action.type === WEB_SOCKET_SEND_MESSAGE),
        tap(action => wsSubject$.next(getState().messageToSend)),
        takeUntil(cancelled$)
      );


    // dispatch msgReceived with payload from server
    // on any incoming messages
    // returning obs subscribes to it
    return wsSubject$.pipe(
      map((msg) => {
        dispatch(webSocketMessage(msg));
        if (msg.type === 'cumulated') {
          const resp = { ...msg.value };
          resp.lastUpdate = new Date(moment(resp.lastUpdate, 'DD/MM/YYYY HH:mm:ss').valueOf());
          resp.energyLifetime = parseInt(resp.energyLifetime);
          resp.energyYearly = parseInt(resp.energyYearly);
          resp.energyMonthly = parseInt(resp.energyMonthly);
          resp.energyWeekly = parseInt(resp.energyWeekly);
          resp.energyDaily = parseInt(resp.energyDaily);
          dispatch(productionTotalsFetchFulfilled(resp));
        } else if (msg.type === 'error') {
          // debugger;
          const resp = { ...msg.value };
          resp.fixedTime = (resp.fixedTime) ? 'OK' : 'KO';
          resp.sdStarted = (resp.sdStarted) ? 'OK' : 'KO';
          resp.wifiConnected = (resp.wifiConnected) ? 'OK' : 'KO';
          resp.isFileSaveOK = (resp.isFileSaveOK) ? 'OK' : 'KO';

          resp.hStr = moment(msg.date, 'DD/MM/YYYY HH:mm:ss').format('lll');

          dispatch(addNotification({ message: <FormattedHTMLMessage id="websocket.centraline.message.error" values={{ ...resp }} />, variant: 'error', autoHide: false }));
        } else if (msg.type === 'error_inverter') {
          // debugger;
          const resp = { ...msg.value };
          resp.hStr = moment(msg.date, 'DD/MM/YYYY HH:mm:ss').format('lll');
          resp.lastUpdate = new Date(moment(msg.date, 'DD/MM/YYYY HH:mm:ss'));

          const updated = {
            alarmStateParam: resp.asp,
            alarmState: resp.alarm,
            channel1StateParam: resp.c1sp,
            channel1State: resp.ch1state,
            channel2StateParam: resp.c2sp,
            channel2State: resp.ch2state,
            inverterStateParam: resp.isp,
            inverterState: resp.state
          };
          dispatch(addNotification({ message: <FormattedHTMLMessage id="websocket.inverter.message.error" values={{ ...resp }} />, variant: ((resp.inverterProblem) ? 'error' : 'warning'), autoHide: false }));
          dispatch(inverterAlarmsFetchFulfilled({ data: updated, lastUpdate: resp.lastUpdate }));
        } else if (msg.type === 'power_rt') {
          let resp = {};
          resp.value = parseFloat(msg.value);
          resp.lastUpdate = new Date(moment(msg.date, 'DD/MM/YYYY HH:mm:ss'));

          dispatch(setPowerRealTime(resp));
        } else if (msg.type === 'bat_rt') {
          const resp = {};
          resp.voltage = parseFloat(msg.value);
          resp.lastUpdate = new Date(moment(msg.date, 'DD/MM/YYYY HH:mm:ss'));

          dispatch(serverStateBatteryFetchFulfilled(resp));
        } else if (msg.type === 'wifi_rt') {
          const resp = {};
          resp.signalStrengh = parseInt(msg.value);
          resp.lastUpdate = new Date(moment(msg.date, 'DD/MM/YYYY HH:mm:ss'));

          dispatch(serverStateWIFIStrenghtFetchFulfilled(resp));
        }
      }),
      retryWhen(errors => errors.pipe(
        tap((err) => {
          dispatch(webSocketError(err));
          console.error(err);
          // dispatch(addNotification({ message: <FormattedHTMLMessage id="websocket.error" />, variant: 'error', autoHide: false }));
        }),
        switchMap(err => timer(1000)),
      )),
    ).subscribe();
  }
});
export default [
  wsListenLogic
];
