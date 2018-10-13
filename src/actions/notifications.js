export const addNotification = (notification) => ({
    type: 'ADD_NOTIFICATION',
    notification: notification
});

export const shiftNotification = () => ({
    type: 'SHIFT_NOTIFICATION'
});

export const getCurrentNotification = () => ({
    type: 'GET_CURRENT_NOTIFICATION'
});


