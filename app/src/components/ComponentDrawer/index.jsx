import About from "../About";
import AlertDialogSlide from "../AlertDialogSlide";
import classNames from "classnames";
import Dashboard from "../Dashboard";
import DuffAccount from "../DuffAccount";
import InstagramAccounts from "../InstagramAccounts";
import PropTypes from "prop-types";
import React from "react";
import {HashRouter, Switch, Route} from "react-router-dom";
import SelectIgAccount from '../SelectIgAccount'

import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {mailFolderListItems, otherMailFolderListItems} from "./tileData";
import {withStyles} from "@material-ui/core/styles";


const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100%",
        display: 'flex',
        flexWrap: 'wrap',
    },
    appFrame: {
        height: "100%",
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        width: "100%"
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`
    },
    "appBar-left": {
        marginLeft: drawerWidth
    },
    "appBar-right": {
        marginRight: drawerWidth
    },
    drawerPaper: {
        position: "relative",
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    // move profile icon to right
    /*toolbar: {
        justifyContent: 'space-between',
    },*/
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3
    },
    menu: {
        justifyContent: 'space-between'
    }
});

class PermanentDrawer extends React.Component {
    state = {
        auth: true,
        anchor: "left",
        age: 10,
        labelWidth: 20
    };

    handleChange = event => {
        this.setState({auth: event.target.checked});
    };

    handleMenu = event => {
        // this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };
    render() {
        const {classes} = this.props;
        const {anchor} = this.state;

        const drawer = (<Drawer variant="permanent" classes={{
                paper: classes.drawerPaper
            }} anchor={anchor}>

            <div className={classes.toolbar}/>
                <SelectIgAccount/>
            <Divider/>
            <List>{mailFolderListItems}</List>
            <Divider/>
            <List>{otherMailFolderListItems}</List>
        </Drawer>);

        let before = null;
        let after = null;

        if (anchor === "left") {
            before = drawer;
        } else {
            after = drawer;
        }
        const {auth, anchorEl} = this.state;
        const open = Boolean(anchorEl);
        return (<div className={classes.root}>
            <div className={classes.appFrame}>
                <AppBar position="absolute" className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            DuffGram v0.0.1
                        </Typography>
                        {
                            auth && (<div>
                                <IconButton aria-owns={open
                                        ? "menu-appbar"
                                        : null} aria-haspopup="true" onClick={this.handleMenu} color="inherit" className={classes.iconButton}>
                                    <AccountCircle/>
                                </IconButton>
                                <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }} transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }} open={open} onClose={this.handleClose}>
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                </Menu>
                            </div>)
                        }
                    </Toolbar>
                </AppBar>
                {before}
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <HashRouter>
                        <Switch>
                            <Route exact={true} path="/" component={DuffAccount}/>
                            <Route exact={true} path="/duff_account" component={DuffAccount}/>
                            <Route exact={true} path="/dashboard" component={Dashboard}/>
                            <Route exact={true} path="/instagram_accounts" component={InstagramAccounts}/>
                            <Route exact={true} path="/about" component={About}/>
                        </Switch>
                    </HashRouter>
                </main>
                {after}
            </div>
        </div>);
    }
}

PermanentDrawer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PermanentDrawer);
