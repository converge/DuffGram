import React, {Component} from 'react'
import styles from './styles.css'
import {HashRouter as Router, Link, Route} from 'react-router-dom'

export default class Content extends Component {
    render() {
        return (<Router>
            <div className={styles.content}>
                <h1>hello world</h1>
                <Link to="/">Home</Link>
            </div>
        </Router>);
    }
}
