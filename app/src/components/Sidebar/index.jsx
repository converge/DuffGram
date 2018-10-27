import React, {Component} from 'react'
import styles from './styles.css'
import {HashRouter as Router, Link} from 'react-router-dom'
import api from '../../../services/api'

export default class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.loadUsernames()
    }

    loadUsernames = async () => {
        const response = await api.get('get_usernames')
        this.setState({data: response.data.data})
    }

    render() {
        let rows = this.state.data.map(username => {
            return <Usernames key={username.id} data={username}/>
        })
        return (<Router>
            <div className={styles.sidebar}>

                <select>
                    {rows}
                </select>

                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className={styles.li}>
                        Login
                    </li>
                    <li>
                        <Link to="/instagram_accounts">Instagram Accounts</Link>
                    </li>
                    <li>
                        <Link to="/duff_account">DuffGram Account</Link>
                    </li>
                </ul>
            </div>
        </Router>);
    }
}

const Usernames = (props) => {
    return (<option key={props.data.id} value={props.data.id}>
        {props.data.username}
    </option>)
}
