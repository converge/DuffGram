import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import api from '../../../services/api'

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    }
})

class SelectIgAccount extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            labelWidth: 20,
            age: ''
        }
    }

    // state = {
    //     auth: true,
    //     anchor: "left"
    // }

    componentDidMount() {
        this.loadUsernames()
    }

    loadUsernames = async () => {
        const response = await api.get("get_usernames")
        this.setState({data: response.data.data})
    }

    handleChange = (event, name) => {
        const {target} = event;
        this.setState(preState => ({age: 'eeee'}))
        this.setState({
            [event.target.name]: event.target.value
        })
        console.table(event.target)
    };

    render() {
        const {classes} = this.props;
        let menuItemIg = this.state.data.map(ig_accounts => {
            return <IgAccountsTable key={ig_accounts.id} data={ig_accounts}/>
        })
        return (<FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={ref => {
                    this.InputLabelRef = ref;
                }} htmlFor="outlined-age-simple">
                Instagram Account
            </InputLabel>
            <Select value="" onChange={event => this.handleChange(event, "circle")} input={<OutlinedInput
                labelWidth = {
                    this.state.labelWidth
                }
                name = "instagram_account"
                id = "outlined-igaccount-simple"
                />}>
                <MenuItem key={5} value={5}>ook</MenuItem>
                <MenuItem key={6} value={6}>weee</MenuItem>
                {menuItemIg}
            </Select>
        </FormControl>)
    }
}

const IgAccountsTable = props => {
    return (
        <MenuItem key={props.data.id} value={props.data.username}>{props.data.username}</MenuItem>
    )
}

SelectIgAccount.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SelectIgAccount)
