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


export default class InstagramAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.loadUsernames();
  }

  loadUsernames = async () => {
    const response = await api.get("get_usernames");
    this.setState({
      data: response.data.data
    });
    console.log(response.data);
  };

  render() {
    let rows = this.state.data.map(username => {
      return <Usernames key={username.id} data={username} />;
    });
    return (
      <Fragment>
        <div className={styles.sidebar}>
          <Button variant="contained" color="primary">
            Hello World
          </Button>
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
