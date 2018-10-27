import React, { Component, Fragment } from "react";
import styles from "./styles.css";
import { HashRouter as Router, Link } from "react-router-dom";
import { PythonShell } from "python-shell";
import api from "../../../services/api";
import { loadProfileScraper } from "/Users/converge/Documents/workspace/DuffGram/app/services/instagram-engine.js";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
    this.loadUsernameStatistics = this.loadUsernameStatistics.bind(this);
    this.updateDashboard = this.updateDashboard.bind(this);
  }

  componentDidMount() {
    this.loadUsernameStatistics();
    // var myVar = setInterval(this.loadUsernameStatistics, 5000);
  }

  loadUsernameStatistics = async () => {
    const response = await api.get("/get_username_statistics", {
      params: {
        ig_account_id: this.props.ig_account_id
      }
    });
    this.setState({
      data: response.data.data
    });
  };

  componentWillUnmount() {
    // this.loadUsernameStatistics();
  }

  updateDashboard = async () => {
    // get username and password to login into Instagram
    const response = await api.get("/get_username_by_username", {
      params: {
        username: this.props.active_ig_account
      }
    });
    const username = response.data.data.username;
    const password = response.data.data.password;
    let scraped_data = await loadProfileScraper(username, password);
    // insert new statistics to db
    await api.post("/add_username_statistics", {
      ig_account_id: this.props.ig_account_id,
      followers: scraped_data.followers,
      followings: scraped_data.followers,
      total_posts: scraped_data.total_posts
    });
    this.loadUsernameStatistics();
  };

  render() {
    let rows = this.state.data.map(statistics => {
      return <DashboardTable key={statistics.id} data={statistics} />;
    });
    let showUp;
    if (this.state.loading) {
      showUp = "<h1>owowo</h1>";
    }
    return (
      <Fragment>
        <div className={styles.dashboard}>
          <h1>{this.state.loading}</h1>
          <h1>{showUp}</h1>
          <h1>DASHBOARD</h1>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Followers</TableCell>
                  <TableCell>Followings</TableCell>
                  <TableCell>Total Posts</TableCell>
                  <TableCell>Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
            </Table>
          </Paper>
          <br />
          <br />
          <Button
            onClick={this.updateDashboard}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </div>
      </Fragment>
    );
  }
}

const DashboardTable = props => {
  return (
    <TableRow>
      <TableCell>{props.data.ig_account_id}</TableCell>
      <TableCell>{props.data.followers}</TableCell>
      <TableCell>{props.data.followings}</TableCell>
      <TableCell>{props.data.total_posts}</TableCell>
      <TableCell>{props.data.created}</TableCell>
    </TableRow>
  );
};

function mapToStateProps(state) {
  return {
    ig_account_id: state.ig_account_id,
    active_ig_account: state.active_ig_account
  };
}

export default connect(mapToStateProps)(Dashboard);
