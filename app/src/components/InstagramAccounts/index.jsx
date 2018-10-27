
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
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


class AddIgAccount extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let action_button;
    if (!this.props.tmpUsername.length) {
      action_button = (
        <Button onClick={this.props.triggerCreateIgAccount} color="primary">
          Add
        </Button>
      );
    } else {
      action_button = (
        <Button
          onClick={() =>
            this.props.triggerUpdateIgPassword(this.props.currentId)
          }
          color="primary"
        >
          Upgdate Password
        </Button>
      );
    }
    return (
      <div>
        <Button onClick={this.props.triggerOpen}>Add Instagram Account</Button>
        <Dialog
          open={this.props.dialogStatus}
          onClose={this.props.triggerClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Add Instagram Account
          </DialogTitle>
          <DialogContent>
            <TextField
              id="username"
              name="ig_username"
              onChange={event => this.props.handleChangeValue(event)}
              autoFocus
              type="text"
              margin="dense"
              label="Username"
              disabled={!this.props.tmpUsername.length ? false : true}
              value={
                this.props.tmpUsername
                  ? this.props.tmpUsername
                  : this.props.currentUsername
              }
            />
            <TextField
              id="password"
              name="ig_password"
              onChange={event => this.props.handleChangeValue(event)}
              type="password"
              margin="dense"
              fullWidth
              label="Password"
            />
          </DialogContent>
          <DialogActions>
            {action_button}
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
      current_id: "",
      username: "",
      password: [],
      tmp_username: "",
      open: false
    };
    this.loadUsernames = this.loadUsernames.bind(this);
    this.createIgAccount = this.createIgAccount.bind(this);
    this.deleteIgAccount = this.deleteIgAccount.bind(this);
    this.updateIgPassword = this.updateIgPassword.bind(this);
    this.updateNewUsername = this.updateNewUsername.bind(this);
    this.updateNewPassword = this.updateNewPassword.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeIgPassword = this.handleChangeIgPassword.bind(this);
  }

  componentDidMount() {
    this.loadUsernames();
  }

  componentWillUnmount() {
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      tmp_username: ""
    });
  };

  handleChangeIgPassword = account_id => {
    this.setState({
      open: true
    });
    this.loadUsername(account_id);
  };

  loadUsername = async account_id => {
    const response = await api.post("/get_username", {
      account_id: account_id
    });
    this.setState({
      current_id: response.data.data.id,
      tmp_username: response.data.data.username
    });
  };

  loadUsernames = async () => {
    const response = await api.get("/get_usernames");
    this.setState({
      data: response.data.data
    });
  };

  handleChangeValue = event => {
    if (event.target.name === "ig_username") {
      this.updateNewUsername(event.target.value);
    } else if (event.target.name === "ig_password") {
      this.updateNewPassword(event.target.value);
    }
  };

  updateNewUsername = new_username => {
    this.setState({
      username: new_username
    });
  };

  updateNewPassword = new_password => {
    this.setState({
      password: new_password
    });
  };

  createIgAccount = async () => {
    this.handleClose();
    let dateFormat = require("dateformat");
    let created = dateFormat(new Date(), "yyyy-mm-dd");
    const response = await api.post("/create_ig_account", {
      username: this.state.username,
      password: this.state.password,
      created: created
    });
    this.loadUsernames();
  };

  deleteIgAccount = async account_id => {
    const response = await api.post("/delete_ig_account", {
      account_id: account_id
    });
    this.loadUsernames();
  };

  updateIgPassword = async account_id => {
    const response = await api.post("/update_ig_account", {
      account_id: account_id,
      password: this.state.password
    });
    this.handleClose();
  };

  render() {
    let rows = this.state.data.map(username => {
      return (
        <Usernames
          key={username.id}
          data={username}
          onDelete={this.deleteIgAccount}
          onUpdate={this.handleChangeIgPassword}
        />
      );
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
          <br />
          <AddIgAccount
            triggerCreateIgAccount={this.createIgAccount}
            triggerUpdateIgPassword={this.updateIgPassword}
            handleChangeValue={this.handleChangeValue}
            triggerOpen={this.handleClickOpen}
            triggerClose={this.handleClose}
            dialogStatus={this.state.open}
            currentId={this.state.current_id}
            currentUsername={this.state.username}
            tmpUsername={this.state.tmp_username}
          />
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
      <TableCell>
        <Button color="primary" onClick={() => props.onUpdate(props.data.id)}>
          Change Password
        </Button>
        <Button color="secondary" onClick={() => props.onDelete(props.data.id)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};
