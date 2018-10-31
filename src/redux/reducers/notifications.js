import { ADD_NOTIFICATION, SHIFT_NOTIFICATION, GET_CURRENT_NOTIFICATION } from '../actions/notifications';

const notifications = (state = {
  current: null,
  queue: []
},

action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      const notifica = { ...{ autoHide: 2200 }, ...action.notification };
      if (state.current) {
        return {
          ...state,
          queue: [...state.queue, notifica]
        };
      }
      return {
        ...state,
        current: notifica
      };

    case SHIFT_NOTIFICATION:
      let elem = null;
      if (state.queue.length > 0) {
        elem = state.queue.shift();
      }
      return {
        queue: [...state.queue],
        current: elem
      };
    default:
      return state;
  }
};

export default notifications;
