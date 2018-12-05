import {
  key, SERVER_STATE_FETCH, SERVER_STATE_FETCH_CANCEL, SERVER_STATE_FETCH_FULFILLED,
  SERVER_STATE_FETCH_REJECTED
} from '../actions/serverState';

export const selectors = {
  data: state => state,
  fetchStatus: state => state.fetchStatus
};

const initialState = {
  data: null,
  fetchStatus: '',
  isFetching: false,
  lastUpdate: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SERVER_STATE_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        data: null,
        lastUpdate: null
      };
    case SERVER_STATE_FETCH_FULFILLED:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: action.lastUpdate
      };
    case SERVER_STATE_FETCH_REJECTED:
      return {
        ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.payload}`
      };
    case SERVER_STATE_FETCH_CANCEL:
      return {
        ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
      };
    default:
      return state;
  }
}
