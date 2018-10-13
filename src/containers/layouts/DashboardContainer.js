import { connect } from 'react-redux'

import {shiftNotification, addNotification} from '../../actions'

import App from '../../layouts/dashboard/Dashboard'

const mapStateToProps = (state, ownProps) => ({
    notifications: state.notifications
});

const mapDispatchToProps ={
    addNotification,
    shiftNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(App)

// export default withStyles(dashboardStyle)(App);
