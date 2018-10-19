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
            data: []
        }
    }

    state = {
        anchorEl: null
    };

    componentDidMount() {
        this.loadUsernames()
    }

    loadUsernames = async () => {
        const response = await api.get("get_usernames")
        this.setState({data: response.data.data})
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {anchorEl} = this.state;
        let menuItemIg = this.state.data.map(ig_accounts => {
            return <IgAccountItems key={ig_accounts.id} data={ig_accounts} onClick={this.handleClose}/>
        })
        return (<div>
            <Button aria-owns={anchorEl
                    ? 'simple-menu'
                    : null} aria-haspopup="true" onClick={this.handleClick}>
                @cycling_apparel
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
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
