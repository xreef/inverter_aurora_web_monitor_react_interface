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

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import MenuIcon from '@material-ui/icons/Menu';


import Routes from './Routes';

import reactLogo from './resources/images/react-icon.png';

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
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class ResponsiveContainer extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
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
                <List>  <div>
                    <ListItem button>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="All mail" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trash" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ReportIcon />
                        </ListItemIcon>
                        <ListItemText primary="Spam" />
                    </ListItem>
                </div>
                </List>
            </div>
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
                        </Toolbar>
                    </AppBar>
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
