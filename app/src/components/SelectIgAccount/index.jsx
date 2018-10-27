import api from "../../../services/api";
import React from "react";

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

class SelectIgAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.handleClose = this.handleClose.bind(this);
    this.loadUsernames = this.loadUsernames.bind(this);
    this.loadFirstUsername = this.loadFirstUsername.bind(this);
  }

  state = {
    anchorEl: null
  };

  componentDidMount() {
    this.loadUsernames();
  }

  componentWillUnmount() {}

  loadUsernames = async () => {
    const response = await api.get("/get_usernames");
    this.setState({ data: response.data.data });
  };

  // @todo: not ready yet
  loadFirstUsername = async () => {
    const response = await api.get("/get_first_username");
    console.log("working");
    let ig_user = response.data.data.map(user => {
      console.log(ig_user);
      return `@${user.username}`;
    });
    this.setState({ active_ig_account: ig_user });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event, ig_account_id, selected_ig_account) => {
    this.setState({ anchorEl: null });
    const action = {
      type: "SET_ACTIVE_IG_ACCOUNT",
      ig_account_id,
      selected_ig_account
    };
    // redux call
    this.props.dispatch(action);
  };

  render() {
    const { anchorEl } = this.state;
    let menuItemIg = this.state.data.map(ig_accounts => {
      return (
        <IgAccountItems
          key={ig_accounts.id}
          data={ig_accounts}
          onClick={event =>
            this.handleClose(event, ig_accounts.id, ig_accounts.username)
          }
        />
      );
    });
    return (
      <div>
        <Button
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {this.props.active_ig_account}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {menuItemIg}
        </Menu>
      </div>
    );
  }
}

const IgAccountItems = props => {
  return (
    <MenuItem key={props.data.id} onClick={props.onClick}>
      {props.data.username}
    </MenuItem>
  );
};

function mapToStateProps(state) {
  return {
    ig_account_id: state.ig_account_id,
    active_ig_account: state.active_ig_account
  };
}

// export default SelectIgAccount;
export default connect(mapToStateProps)(SelectIgAccount);
