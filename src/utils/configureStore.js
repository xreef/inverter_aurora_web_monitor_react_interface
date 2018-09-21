/**
 * Created by renzo on 19/05/2017.
 */
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducer from '../reducers'

import {saveState, loadState} from './localStorage'
import throttle from "lodash.throttle";

const logger = (store) =>  (next) => {
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
        }
    };

const configureStore = (id, initialConfig, autoSaveToLocalStorage) => {
    const middlewares = [];

    middlewares.push(promise);
    if (process.env.NODE_ENV !== 'production') middlewares.push(logger);

    let store=null;



    if (autoSaveToLocalStorage) {
        let loadedState = {...initialConfig, ...loadState('currState' + id)};

        store = createStore(reducer, loadedState, applyMiddleware(...middlewares));
        store.subscribe(throttle(() => {
            saveState('currState' + id, {});
        }), 1000);
    }else{
        let loadedState = {...initialConfig};
        if (initialConfig ){

            store = createStore(reducer, loadedState, applyMiddleware(...middlewares));
        }else{
            store = createStore(reducer, applyMiddleware(...middlewares));
        }

    }
    return store;
};

export default configureStore;