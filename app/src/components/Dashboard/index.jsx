import React, {Component, Fragment} from 'react'
import styles from './styles.css'
import {HashRouter as Router, Link} from 'react-router-dom'
import {PythonShell} from 'python-shell'
//const sqlite = require('sqlite3').verbose();
//const db = new sqlite.Database('/Users/converge/Documents/workspace/duffgram-engine/db/duffgram.db')
import api from '../../../services/api'


export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.loadProducts()
    }

    loadProducts = async () => {
        const response = await api.get('/products')
        this.setState({
            data: response.data.docs
        })
        console.log(response)
    }

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
        let rows = this.state.data.map(person => {
            return <PersonRow key={person._id} data={person}/>
        })
        return (<Fragment>
            <div className={styles.dashboard}>
                <h1>DASHBOARD lenght: {this.state.data.length}</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td>title</td>
                            <td>url</td>
                            <td>created at</td>
                        </tr>
                        {rows}
                    </tbody>
                </table>
                <button>test</button>
            </div>
        </Fragment>)
    }
}

const PersonRow = (props) => {
    return (<tr>
        <td>
            {props.data._id}
        </td>
        <td>
            {props.data.title}
        </td>
        <td>
            {props.data.url}
        </td>
        <td>
            {props.data.createdAt}
        </td>
    </tr>)
}
