import React, {Component, Fragment} from 'react'
import styles from './styles.css'
import {HashRouter as Router, Link} from 'react-router-dom'
import api from '../../../services/api'

export default class InstagramAccounts extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.loadUsernames()
    }

    loadUsernames = async () => {
        const response = await api.get('get_usernames')
        this.setState({
            data: response.data.data
        })
        console.log(response.data)
    }

    render() {
        let rows = this.state.data.map(username => {
            return <Usernames key={username.id} data={username}/>
        })
        return (<Fragment>
            <div className={styles.sidebar}>
                <table>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td>username</td>
                            <td>created</td>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            </div>
        </Fragment>)
    }
}

const Usernames = (props) => {
    return(
        <tr>
            <td>
                {props.data.id}
            </td>
            <td>
                {props.data.username}
            </td>
            <td>
                {props.data.created}
            </td>
        </tr>
    )
}
