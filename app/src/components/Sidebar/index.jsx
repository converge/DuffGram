import React, {Component} from 'react'
import styles from './styles.css'
import {HashRouter as Router, Link} from 'react-router-dom'

export default class Sidebar extends Component {

    loadDashboard(event) {
        console.log('ok');
    }

    render() {
        return (<Router>
            <div className={styles.sidebar}>
                @cycling_apparel
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className={styles.li} onClick={this.loadDashboard.bind(this)}>
                        Login
                    </li>
                    <li>
                        <Link to="/duff_account">DuffGram Account</Link>
                    </li>
                </ul>
            </div>
        </Router>);
    }
}
