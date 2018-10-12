import React, {Component, Fragment} from 'react'
import styles from './styles.css'
import {HashRouter as Router, Link} from 'react-router-dom'
import {PythonShell} from 'python-shell';

export default class Dashboard extends Component {

    update_dashboard() {

        let options = {
            mode: 'text',
            pythonPath: '/usr/local/bin/python3',
            pythonOptions: ['-u'], // get print results in real-time
            scriptPath: '/Users/converge/Documents/workspace/duffgram-engine'
        };

        PythonShell.run('update_statistics.py', options, function(err, results) {
            if (err)
                throw err;

            // results is an array consisting of messages collected during execution
            console.log('results: %j', results);
        });
    }

    render() {
        return (<Fragment>
            <div className={styles.dashboard}>
                <h1>DASHBOARD</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>New Followers</td>
                            <td>Followers</td>
                            <td>Following</td>
                            <td>Total Posts</td>
                            <td>Last Update</td>
                        </tr>
                        <tr>
                            <td>+20</td>
                            <td>1000</td>
                            <td>100</td>
                            <td>10</td>
                            <td>2018-10-12</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={this.update_dashboard.bind(this)}>Update</button>
            </div>
        </Fragment>);
    }
}
