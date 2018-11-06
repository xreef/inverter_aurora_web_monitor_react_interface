/**
 * Created by renzo on 19/05/2017.
 */
import { createStore, applyMiddleware } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import axios from 'axios';

import throttle from 'lodash.throttle';
import reducer from '../redux/reducers';
import logic from '../redux/logic/index';

import { saveState, loadState } from './localStorage';

const logger = store => (next) => {
  if (!console.group) {
    return next;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const deps = { // injected dependencies for redux.logic
  httpClient: axios
};

const configureStore = (id, initialConfig, autoSaveToLocalStorage) => {
  const logicMiddleware = createLogicMiddleware(logic, deps);

  const middlewares = [];

  middlewares.push(logicMiddleware);
  if (process.env.NODE_ENV !== 'production') middlewares.push(logger);

  let store = null;


  if (autoSaveToLocalStorage) {
    const loadedState = { ...initialConfig, ...loadState(`currState${id}`) };

    store = createStore(reducer, loadedState, applyMiddleware(...middlewares));

    logicMiddleware.addDeps({ storeDispatch: store.dispatch });

    store.subscribe(throttle(() => {
      saveState(`currState${id}`, {});
    }), 1000);
  } else {
    const loadedState = { ...initialConfig };
    if (initialConfig) {
      store = createStore(reducer, loadedState, applyMiddleware(...middlewares));
    } else {
      store = createStore(reducer, applyMiddleware(...middlewares));
    }
  }
  return store;
};

export default configureStore;
