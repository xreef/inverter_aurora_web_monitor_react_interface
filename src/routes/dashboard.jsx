// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";

import CalendarViewDay from  "@material-ui/icons/CalendarViewDay";
import Today from  "@material-ui/icons/Today";
import Info from  "@material-ui/icons/Info";
import Warning from  "@material-ui/icons/Warning";

import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
// import DashboardPage from "views/Dashboard/Dashboard.jsx";
// import UserProfile from "views/UserProfile/UserProfile.jsx";
// import TableList from "views/TableList/TableList.jsx";
// import Typography from "views/Typography/Typography.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import NotificationsPage from "views/Notifications/Notifications.jsx";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";

import { Home, Daily, Historical, InverterInfoState, Intro, About } from '../views';
import {FormattedMessage} from "react-intl";
import React from "react";

const dashboardRoutes = [
  {
    path: "/home",
    sidebarName: <FormattedMessage id={ 'menu.sidebar.home' } />,
    navbarName: <FormattedMessage id={ 'menu.navbar.home' } />,
    icon: Dashboard,
    component: Home
  },
  {
    path: "/daily",
    sidebarName: <FormattedMessage id={ 'menu.sidebar.daily' } />,
    navbarName: <FormattedMessage id={ 'menu.navbar.daily' }/>,
    icon: CalendarViewDay, //"content_paste",
    component: Daily
  },
  {
    path: "/montly",
    sidebarName: <FormattedMessage id={ 'menu.sidebar.monthly' } />,
    navbarName: <FormattedMessage id={ 'menu.navbar.monthly' }/>,
    icon: Today ,
    component: Historical
  },
  {
    path: "/info_state",
      sidebarName: <FormattedMessage id={ 'menu.sidebar.information_state' } />,
      navbarName: <FormattedMessage id={ 'menu.navbar.information_state' }/>,
    icon: Warning,
    component: InverterInfoState
  },
  {
    path: "/intro",
      sidebarName: <FormattedMessage id={ 'menu.sidebar.introduction' } />,
      navbarName: <FormattedMessage id={ 'menu.navbar.introduction' }/>,
    icon: Info,
    component: Intro
  },
  {
      path: "/about",
      sidebarName: "About",
      navbarName: "About",
      icon: Person,
      component: About
  },
    //  {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   sidebarName: "Upgrade To PRO",
  //   navbarName: "Upgrade To PRO",
  //   icon: Unarchive,
  //   component: UpgradeToPro
  // },
  { redirect: true, path: "/", to: "/home", navbarName: "Redirect" }
];

export default dashboardRoutes;
