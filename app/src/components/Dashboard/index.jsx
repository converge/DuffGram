import React, { Component, Fragment } from "react";
import styles from "./styles.css";
import { HashRouter as Router, Link } from "react-router-dom";
import { PythonShell } from "python-shell";
import api from "../../../services/api";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.loadUsernameStatistics();
    var myVar = setInterval(this.loadUsernameStatistics, 5000);
  }

  loadUsernameStatistics = async () => {
    const response = await api.get("get_username_statistics");
    this.setState({
      data: response.data.data
    });
  };

  componentWillUnmount() {
    // @todo
  }

  updateDashboard() {
    let options = {
      mode: "text",
      pythonPath: "/usr/local/bin/python3",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "/Users/converge/Documents/workspace/duffgram-engine"
    };

    PythonShell.run("update_statistics.py", options, function(err, results) {
      if (err) throw err;

      // results is an array consisting of messages collected during execution
      console.log("results: %j", results);
    });
  }

  render() {
    let rows = this.state.data.map(statistics => {
      return <DashboardTable key={statistics.id} data={statistics} />;
    });

    return (
      <Fragment>
        <div className={styles.dashboard}>
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
                   <TableBody>
                        {rows}
                   </TableBody>
               </Table>
          </Paper>
          <br/><br/>
          <Button
            onClick={this.updateDashboard.bind(this)}
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
