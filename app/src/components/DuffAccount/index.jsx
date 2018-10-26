import React, {Component, Fragment} from "react";
import styles from "./styles.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types'

export default class DuffAccount extends Component {
    render() {
        return (
            <Fragment>
            <div className={styles.duff_account}>
		<h1>Duff Account</h1>
                <Card >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom={true}>
			    Version 0.0.1
                            <br/>
			    <br/>id: joaovanzuita@me.com
			    <br/>Plan cicle: 30 days
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </Fragment>);
    }
}
