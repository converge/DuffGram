import api from '../../../services/api'
import React from 'react';

import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from "@material-ui/core/styles";

class SelectIgAccount extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
	    data: [],
	    active_ig_account: 'Select IG Account' 
        }
	this.handleClose = this.handleClose.bind(this)
	this.loadUsernames = this.loadUsernames.bind(this)
	this.loadFirstUsername = this.loadFirstUsername.bind(this)
    }

    state = {
        anchorEl: null
    };

    componentDidMount() {
        this.loadUsernames()
	// this.loadFirstUsername()
    }

    componentWillUnmount() {
        this.loadUsernames()
	// this.loadFirstUsername()
    }

    loadUsernames = async () => {
        const response = await api.get("/get_usernames")
        this.setState({ data: response.data.data })
    }

    loadFirstUsername = async () => {
	const response = await api.get("/get_first_username")
	console.log(response)
	let ig_user = response.data.data.map(user => {
	console.log(ig_user)
	    return `@${user.username}`
	})
	this.setState({ active_ig_account: ig_user })
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = (event, selected_ig_account) => {
	this.setState({
	    active_ig_account: `@${selected_ig_account}`
	})
        this.setState({anchorEl: null});
    };

    render() {
        const {anchorEl} = this.state;
        let menuItemIg = this.state.data.map(ig_accounts => {
	    return <IgAccountItems key={ig_accounts.id} data={ig_accounts} onClick={event => this.handleClose(event, ig_accounts.username)} />
        })
        return (<div>
            <Button aria-owns={anchorEl
                    ? 'simple-menu'
                    : null} aria-haspopup="true" onClick={this.handleClick}>
			{this.state.active_ig_account}
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                {menuItemIg}
            </Menu>
        </div>);
    }
}

const IgAccountItems = props => {
    return (
        <MenuItem key={props.data.id} onClick={props.onClick}>{props.data.username}</MenuItem>
    )
}

SelectIgAccount.propTypes = {
    classes: PropTypes.object.isRequired
}

export default SelectIgAccount;
