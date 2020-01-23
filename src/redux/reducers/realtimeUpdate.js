import {
  WEB_SOCKET_OPEN,
  WEB_SOCKET_CLOSE,
  WEB_SOCKET_ERROR,
  WEB_SOCKET_MESSAGE,
  WEB_SOCKET_SEND_MESSAGE, WEB_SOCKET_CONNECT, WEB_SOCKET_DISCONNECT
} from '../actions/realtimeUpdate';

export const selectors = {

};

const initialState = {
  messageToSend: '',
  isConnected: false,
  lastUpdate: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case WEB_SOCKET_CONNECT:
      return {
        ...state,
        isConnected: true
      };
    case WEB_SOCKET_DISCONNECT:
      return {
        ...state,
        isConnected: false
      };
    case WEB_SOCKET_ERROR:
      return {
        ...state,
        error: action.error
      };
    case WEB_SOCKET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case WEB_SOCKET_SEND_MESSAGE:
      return {
        ...state,
        messageToSend: action.message
      };
    default:
      return state;
  }
}
