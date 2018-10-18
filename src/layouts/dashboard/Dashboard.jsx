/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "../../component/header/Header.jsx";
import Footer from "../../component/footer/Footer.jsx";
import Sidebar from "../../component/sidebar/Sidebar.jsx";

import dashboardRoutes from "../../routes/dashboard.jsx";

import dashboardStyle from "./style/dashboardStyle.jsx";

import image from "../../resources/images/sidebar-solar.jpg";
import logo from "../../resources/images/bill.jpg";
import Snackbar from "../../component/snackbars/Snackbar";

import {subscribeServiceWorker} from "../../utils/serviceWorker/subscribeServiceWorker"
import {checkPushNotificationSupport, checkUserSubscribedToPushNotification, subscribePush, unsubscribePush} from "../../utils/serviceWorker/subscribePush"
import {addToHomeScreen} from "../../utils/serviceWorker/homeScreen"
import {addNotification} from "../../redux/actions";
import Divider from "@material-ui/core/Divider/Divider";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import StoreIcon from "@material-ui/icons/Store";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
// import {
//     setPushNotificationSupported,
//     setServiceWorkerSubscription,
//     setUserSubscribedToPushNotification
// } from "../../redux.actions";

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        mobileOpen: false,
        serviceWorker: {
          deferredPrompt: null
        }
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }

  handleCloseNotification = () => {
    this.props.shiftNotification()
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    const {addNotification,
        setUserSubscribedToPushNotification,
        setServiceWorkerSubscription,
        setPushNotificationSupported} = this.props;
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);

    let  registration = null;
    const subscribeServiceWorkerCB = (response) => {
        addNotification(response);
        setServiceWorkerSubscription(response.exitStatus, response.registration);

        let registration = response.registration;
        if (response.exitStatus) {
            //        chrome://flags/#enable-desktop-pwas
            window.addEventListener('beforeinstallprompt', (e) => {
                // Prevent Chrome 67 and earlier from automatically showing the prompt
                e.preventDefault();
                // Stash the event so it can be triggered later.
                this.setState({
                    serviceWorker: {
                        ...this.state.serviceWorker,
                        deferredPrompt: e
                    }
                })
            });

            const checkPushNotificationSupportCB = (response) => {
                addNotification(response);
                setPushNotificationSupported(response.exitStatus);

                if (response.exitStatus) {
                    const checkUserSubscribedToPushNotificationCB = (response) => {
                        addNotification(response);
                        setUserSubscribedToPushNotification(response.exitStatus);
                    };
                    checkUserSubscribedToPushNotification(registration, checkUserSubscribedToPushNotificationCB);
                }
            };
            checkPushNotificationSupport(checkPushNotificationSupportCB);
        }
    };
    subscribeServiceWorker(subscribeServiceWorkerCB);
  }

  addToHomeScreen = () => {
      const {addNotification} = this.props;
      const addToHomeScreenCB = (response) => {
          addNotification(response);
          if (response.exitStatus===true){
            this.setState({serviceWorke:{
                    ...this.state.serviceWorker,
                    deferredPrompt: null
                }})
          }
      };
      addToHomeScreen(this.state.serviceWorker.deferredPrompt, addToHomeScreenCB);
  };

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  setMainPanelRef = (mainPanel) => {
    this.mainPanel = mainPanel;
  };


  render() {
    const { classes, ...rest } = this.props;
    const {notifications} = this.props;

      return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"REEF"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          notifications={notifications}
          addToHomeScreen = {this.state.serviceWorker.deferredPrompt!==null?this.addToHomeScreen:null}
          {...rest}
        />

        <div className={classes.mainPanel} ref={this.setMainPanelRef}>
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            notifications={notifications}
            {...rest}
          />

          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}

            {notifications.current!==null?
                <Snackbar
                    message={notifications.current.message}
                    open={notifications.current!==null}
                    color={notifications.current.variant}
                    onClose={this.handleCloseNotification}
                    ClickAwayListenerProps={{mouseEvent: null}}
                />
                :
                null}

        </div>
      </div>
    );
  }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired,

    addNotification: PropTypes.func.isRequired,
    shiftNotification: PropTypes.func.isRequired,

    setUserSubscribedToPushNotification: PropTypes.func.isRequired,
    setServiceWorkerSubscription: PropTypes.func.isRequired,
    setPushNotificationSupported: PropTypes.func.isRequired
};

export default withStyles(dashboardStyle)(App);
