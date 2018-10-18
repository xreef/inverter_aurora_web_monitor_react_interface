import { connect } from 'react-redux'

import {
    shiftNotification, addNotification,
    setUserSubscribedToPushNotification, setServiceWorkerSubscription, setPushNotificationSupported
} from '../../redux/actions'

import App from '../../layouts/dashboard/Dashboard'

const mapStateToProps = (state, ownProps) => ({
    notifications: state.notifications
});

const mapDispatchToProps ={
    addNotification,
    shiftNotification,
    setUserSubscribedToPushNotification,
    setServiceWorkerSubscription,
    setPushNotificationSupported
};

export default connect(mapStateToProps, mapDispatchToProps)(App)

// export default withStyles(dashboardStyle)(App);
