import React, { Component, Fragment } from "react";
import styles from "./styles.css";
import { HashRouter as Router, Link } from "react-router-dom";
import api from "../../../services/api";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddIgAccount extends React.Component {
    constructor(props) {
	super(props)
    }

    render() {
	return (
	    <div>
		<Button onClick={this.props.triggerOpen}>Add Instagram Account</Button>
		<Dialog
		    open={this.props.dialogStatus}
		    onClose={this.props.triggerClose}
		    aria-labelledby="form-dialog-title">
		    <DialogTitle id="form-dialog-title">Add Instagram Account</DialogTitle>
		    <DialogContent>
			<TextField id="username" name="ig_username" onChange={event => this.props.handleChangeValue(event)}autoFocus type="text" margin="dense" label="Username" />
			<TextField id="password" name="ig_password" onChange={event => this.props.handleChangeValue(event)} type="password" margin="dense" fullWidth label="Password" />
		    </DialogContent>
		    <DialogActions>
			<Button onClick={this.props.triggerCreateIgAccount} color="primary">
			    Add
			</Button>
			<Button onClick={this.props.triggerClose} color="primary">
			    Cancel
			</Button>
		    </DialogActions>
		</Dialog>
	    </div>
	);
    }
}


export default class InstagramAccounts extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    data: [],
	    new_username: [],
	    new_password: [],
	    open: false
	};
	this.loadUsernames = this.loadUsernames.bind(this)
	this.createIgAccount = this.createIgAccount.bind(this)
	this.updateNewUsername = this.updateNewUsername.bind(this)
	this.updateNewPassword = this.updateNewPassword.bind(this)
	this.handleClickOpen = this.handleClickOpen.bind(this)
	this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
	this.loadUsernames()
    }

    componentWillUnmount() {
	this.loadUsernames()
    }

    handleClickOpen = () => {
	this.setState({ open: true });
    };

    handleClose = () => {
	this.setState({ open: false });
    };

    loadUsernames = async () => {
	const response = await api.get("/get_usernames");
	this.setState({
	    data: response.data.data
	});
    };

    handleChangeValue = (event) => {
	if (event.target.name === 'ig_username') {
	    this.updateNewUsername(event.target.value) 
	} else if (event.target.name === 'ig_password') {
	    this.updateNewPassword(event.target.value) 
	}
    }

    updateNewUsername = new_username => {
	this.setState({
	    new_username
	})
	console.log(this.state)
    }

    updateNewPassword = new_password => {
	this.setState({
	    new_password
	})
	console.log(this.state)
    }


    createIgAccount = async () => {
	this.handleClose()
	const response = await api.post('/create_ig_account', {
	    username: this.state.new_username,
	    password: this.state.new_password
	})
	this.loadUsernames()
    }

    render() {
	let rows = this.state.data.map(username => {
	    return <Usernames key={username.id} data={username} />;
	});
	return (
	    <Fragment>
		<div className={styles.sidebar}>
		    <Paper>
			<Table>
			    <TableHead>
				<TableRow>
				    <TableCell>id</TableCell>
				    <TableCell>username</TableCell>
				    <TableCell>created</TableCell>
				</TableRow>
			    </TableHead>
			    <TableBody>{rows}</TableBody>
			</Table>
		    </Paper>
		    <br/>
		    <AddIgAccount 
			triggerCreateIgAccount={this.createIgAccount}
			handleChangeValue={this.handleChangeValue} 
			triggerOpen={this.handleClickOpen}
			triggerClose={this.handleClose} 
			dialogStatus={this.state.open} />
		</div>
	    </Fragment>
	);
    }
}

const Usernames = props => {
    return (
	<TableRow>
	    <TableCell>{props.data.id}</TableCell>
	    <TableCell>{props.data.username}</TableCell>
	    <TableCell>{props.data.created}</TableCell>
	</TableRow>
    );
};
