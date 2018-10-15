import React, {Component, Fragment} from 'react'
import styles from './styles.css'
import {HashRouter as Router, Link} from 'react-router-dom'
import {PythonShell} from 'python-shell'
import api from '../../../services/api'


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.loadUsernameStatistics()
        var myVar = setInterval(this.loadUsernameStatistics, 5000);
    }

    loadUsernameStatistics = async () => {
        const response = await api.get('get_username_statistics')
        this.setState({
            data: response.data.data
        })
    }

    componentWillUnmount() {
        // @todo
    }

    updateDashboard() {

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
        let rows = this.state.data.map(statistics => {
            return <DashboardTable key={statistics.id} data={statistics}/>
        })
        return (<Fragment>
            <div className={styles.dashboard}>
                <h1>DASHBOARD</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td>Followers</td>
                            <td>Followings</td>
                            <td>Total Posts</td>
                            <td>Created</td>
                        </tr>
                        {rows}
                    </tbody>
                </table>
                <button onClick={this.updateDashboard.bind(this)}>Update</button>
            </div>
        </Fragment>)
    }
}

const DashboardTable = (props) => {
    return (<tr>
        <td>
            {props.data.ig_account_id}
        </td>
        <td>
            {props.data.followers}
        </td>
        <td>
            {props.data.followings}
        </td>
        <td>
            {props.data.total_posts}
        </td>
        <td>
            {props.data.created}
        </td>
    </tr>)
}
