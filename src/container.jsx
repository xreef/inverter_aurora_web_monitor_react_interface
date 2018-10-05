import React from 'react';
import {
    BrowserRouter,
    Link,
} from 'react-router-dom';

// https://github.com/supasate/connected-react-router
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import StoreIcon from '@material-ui/icons/Store';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';

import ChatBubble from '@material-ui/icons/ChatBubble';
import MenuIcon from '@material-ui/icons/Menu';

import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';

import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Slide from '@material-ui/core/Slide';


import Routes from './routes';

import reactLogo from './resources/images/react-icon.png';
import {CustomizedSnackbar} from "./component/snackbars/CustomizedSnackbar";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        // height: 440,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 1,
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100%)`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawer:{
        height: '100%'
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
        height: '100%'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    grow: {
        flexGrow: 1,
    },

});

class ResponsiveContainer extends React.Component {

    constructor(){
        super();
        this.state = {
            mobileOpen: false,
            anchorEl: null,
            mobileMoreAnchorEl: null,
            serviceWorker: {
                pushNotificationSupported: null,
                registration: null,
                deferredPrompt: null,
                isPushSubscribed: false
            },
            notifications: {
                current: null,
                queue: []
            }
        };

        this.listNotification = [];
    }

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    addToHomeScreen = () => {
        let {deferredPrompt} = this.state.serviceWorker;
        deferredPrompt.prompt();  // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then(function(choiceResult){
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted to install app');
                } else {
                    console.log('User not accepted to install app');
                }
                deferredPrompt = null;
            });
    };
    subscribePush = () => {
        navigator.serviceWorker.ready.then((registration) => {
            // ALREADY CHECKED
            // if (!registration.pushManager) {
            //     alert('Your browser doesn\'t support push notification.');
            //     return false;
            // }

            //To subscribe `push notification` from push manager
            registration.pushManager.subscribe({
                userVisibleOnly: true //Always show notification when received
            })
                .then( (subscription) => {
                    this.addNotification({
                        variant: 'success',
                        message: 'Subscribed successfully.'
                    });
                    console.info('Push notification subscribed.');
                    console.log(subscription);
                    //saveSubscriptionID(subscription);
                    this.setState({serviceWorker:{
                            ...this.state.serviceWorker,
                            isPushSubscribed: true
                        }});

                })
                .catch((error) => {
                    if (error.code===0){
                        this.addNotification({
                            variant: 'warning',
                            message: 'You not allow notification'
                        });

                    }else {
                        this.addNotification({
                            variant: 'error',
                            message: 'Push notification subscription error: ' + error
                        });
                    }
                    console.error('Push notification subscription error: ', error);
                });
        })
    };

    // Unsubscribe the user from push notifications
    unsubscribePush = () => {
        navigator.serviceWorker.ready
            .then((registration) => {
                //Get `push subscription`
                registration.pushManager.getSubscription()
                    .then((subscription) => {
                        //If no `push subscription`, then return
                        if(!subscription) {
                            this.addNotification(
                                {
                                    variant: "error",
                                    message: 'Unable to unregister push notification.'
                                }
                            );
                            return;
                        }

                        //Unsubscribe `push notification`
                        subscription.unsubscribe()
                            .then(() => {
                                this.addNotification({
                                    variant: "success",
                                    message: "Unsubscribed successfully."
                                });

                                console.info('Push notification unsubscribed.');
                                console.log(subscription);

                                this.setState({serviceWorker:{
                                        ...this.state.serviceWorker,
                                        isPushSubscribed: false
                                    }});

                            })
                            .catch(function (error) {
                                console.error(error);
                            });
                    })
                    .catch(function (error) {
                        console.error('Failed to unsubscribe push notification.');
                    });
            })
    };

    toggleSubscriptionToPush = () => {
        if (this.state.serviceWorker.isPushSubscribed){
            this.unsubscribePush();
        }else{
            this.subscribePush();
        }
    };

    componentDidMount = () => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('service-worker.js').then((registration) => {
                    this.setState({serviceWorker:{
                            registration: registration
                        }});
                    // Registration was successful
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    if ('PushManager' in window){
                        console.log('Push is supported');
                        this.addNotification({variant: "info", message:"Push supported"})
                        this.setState({serviceWorker:{
                                ...this.state.serviceWorker,
                                pushNotificationSupported: true
                            }});
                        // Set the initial subscription value
                        registration.pushManager.getSubscription()
                            .then((subscription) => {
                                let isSubscribed = !(subscription === null);

                                if (isSubscribed) {
                                    console.log('User is push notification subscribed.');
                                    this.addNotification({variant: "info", message:"User is push notification subscribed."})
                                    this.setState({serviceWorker:{
                                            ...this.state.serviceWorker,
                                            isPushSubscribed: true
                                        }});

                                } else {
                                    console.log('User is push notification NOT subscribed.');
                                    this.addNotification({variant: "warning", message:"User is push notification NOT subscribed."})

                                    this.setState({serviceWorker:{
                                            ...this.state.serviceWorker,
                                            isPushSubscribed: false
                                        }});
                                }

                            });
                    }else{
                        console.log('Push is not supported');
                        this.addNotification({variant: "warning", message:"Push is not supported"})

                        this.setState({serviceWorker:{
                                ...this.state.serviceWorker,
                                pushNotificationSupported: false
                            }});
                    }
                }, function(err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                }).catch(function(err) {
                    console.log(err)
                });
            });
        } else {
            console.log('service worker is not supported');
        }

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
    };

    handleCloseNotification = () => {
        let elem = null;
        if (this.state.notifications.queue.length>0){
            elem = this.state.notifications.queue.shift();
        }
        this.setState(
            // ...this.state,
            {
                notifications: {
                    ...this.state.notifications,
                    current: elem
                }
            }
        )
    };
    addNotification = (elem) => {
        if (this.state.notifications.current){
            this.setState({
                notifications: {
                    ...this.state.notifications,
                    queue: [...this.state.notifications.queue, elem]
                }
            })
        }else{
            this.setState(
                // ...this.state,
                {
                    notifications: {
                        ...this.state.notifications,
                        current: elem
                    }
                }
            )
        }

    };

    render() {
        const { classes, theme } = this.props;
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const drawer = (
            <div style={{height: '100%'}}>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <div>
                        <Link to="/">
                            <ListItem button>

                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>

                                    <ListItemText primary="Inbox" />

                            </ListItem>
                        </Link>
                        <Link to="/about">

                        <ListItem button>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                        </Link>
                        <Link to="/grid_showcase">

                        <ListItem button>
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                                <ListItemText primary="Send mail" />
                        </ListItem>
                        </Link>
                        <Link to="/chart_examples">

                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                                <ListItemText primary="Drafts" />
                        </ListItem>
                        </Link>

                    </div>


                </List>
                <Divider />
                <List>
                    {(this.state.serviceWorker.deferredPrompt!==null)?
                        <div>
                            <ListItem button onClick={this.addToHomeScreen}>
                                <ListItemIcon>
                                    <StoreIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Install"/>
                            </ListItem>
                        </div>
                        :null
                    }

                    {(this.state.serviceWorker.pushNotificationSupported===true)?
                        <div>
                            <ListItem button onClick={this.toggleSubscriptionToPush}>
                                <ListItemIcon>
                                    {(this.state.serviceWorker.isPushSubscribed)?<NotificationsOffIcon/>:<NotificationsActiveIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={ (this.state.serviceWorker.isPushSubscribed)?"Unsubscribe to notification":"Subscribe to notification"} />
                            </ListItem>
                        </div>
                        :null
                    }
                </List>
            </div>
        );
        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >

                <MenuItem>
                    <IconButton color="inherit">
                        <Badge className={classes.margin} badgeContent={this.state.notifications.queue.length} color="secondary">
                            <ChatBubble />
                        </Badge>
                    </IconButton>
                    <p>Inline Notifications</p>
                </MenuItem>
                <MenuItem>
                    <IconButton color="inherit">
                        <Badge className={classes.margin} badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );



        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.navIconHide}
                            >
                            <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap>
                                Responsive drawer
                            </Typography>
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                                <IconButton color="inherit">
                                    <Badge className={classes.margin} badgeContent={this.state.notifications.queue.length} color="secondary">
                                        <ChatBubble />
                                    </Badge>
                                </IconButton>
                                <IconButton color="inherit">
                                    <Badge className={classes.margin} badgeContent={17} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    aria-owns={isMenuOpen ? 'material-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                    <MoreIcon />
                                </IconButton>
                            </div>

                        </Toolbar>
                    </AppBar>
                    {renderMenu}
                    {renderMobileMenu}
                    <Hidden mdUp>
                        <Drawer
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}

                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            variant="permanent"
                            open
                            className={classes.drawer}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Routes />
                        <Snackbar anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'right',
                                  }}
                                  open={this.state.notifications.current!==null}
                                  autoHideDuration={6000}

                                  ClickAwayListenerProps={{mouseEvent: null}}
                                  onClose={this.handleCloseNotification}
                        >
                            {this.state.notifications.current!==null?

                            <CustomizedSnackbar  onClose={this.handleCloseNotification}
                                                 variant={this.state.notifications.current.variant}
                                                 message={this.state.notifications.current.message}/>
                                :
                                null}

                        </Snackbar>
                    </main>
                </div>

            </BrowserRouter>
        );
    }
}

ResponsiveContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

// /**
//  * this container is defined as class so we can modify state
//  * @return {Component} react base component
//  */
// const Container = () => (
//     <BrowserRouter>
//         <main className="container">
//             <div>
//                 <h1>hello world! <img className="container__image" alt="react logo" width={50} src={reactLogo} /></h1>
//
//                 <p>If you see this everything is working!</p>
//             </div>
//             <ul className="left">
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/about">About</Link></li>
//                 <li><Link to="/grid_showcase">Grid showcase</Link></li>
//                 <li><Link to="/chart_examples">Chart example</Link></li>
//             </ul>
//             <div style={{ minHeight: "300px", height:"100%"}}>
//                 <Routes />
//             </div>
//             <div>
//                 <p>bottom!</p>
//             </div>
//         </main>
//     </BrowserRouter>
// );

export default withStyles(styles, { withTheme: true })(ResponsiveContainer);
