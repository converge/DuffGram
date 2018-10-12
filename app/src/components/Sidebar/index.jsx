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
                <Link to="/content">Content link</Link>
                <ul>
                    <li className={styles.li} onClick={this.loadDashboard.bind(this)}>
                        Dashboard
                    </li>
                    <li>Login</li>
                    <li>NANOGram Account</li>
                </ul>
            </div>
        </Router>);
    }
}
