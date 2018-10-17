import React, { Component, Fragment } from "react";
import styles from "./styles.css";
import { HashRouter as Router, Link, Route } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class DuffAccount extends Component {
  render() {
    return (
      <Fragment>
        <div className={styles.duff_account}>
            <Typography
              color="textSecondary"
              gutterBottom
            >
            <h1>Duff Account</h1>
            </Typography>
            <Card >
              <CardContent>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                <p>Code version 0.0.1</p>
                <br />
                <p>id: joaovanzuita@me.com</p>
                <p>Plan cicle: 30 days</p>
                </Typography>
              </CardContent>
            </Card>


        </div>
      </Fragment>
    );
  }
}
