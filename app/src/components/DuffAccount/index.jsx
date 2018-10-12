import React, {Component, Fragment} from 'react'
import styles from './styles.css'
import {HashRouter as Router, Link, Route} from 'react-router-dom'

export default class DuffAccount extends Component {
    render() {
        return (<Fragment>
            <Router>
                <div className={styles.duff_account}>
                    <h1>Duff Account</h1>
                    <p>Prove Of Concept version 0.1</p>
                    <p>Code version 0.1</p>
                    <p>Author: João Vanzuita - joaovanzuita@me.com</p>
                    <br/>
                    <p>id: joaovanzuita@me.com</p>
                    <p>Plan cicle: 30 days</p>
                    <Link to="/">Home</Link>
                </div>
            </Router>
        </Fragment>);
    }
}
