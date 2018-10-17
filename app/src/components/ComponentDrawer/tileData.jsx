// This file is shared across the demos.

import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PetsIcon from '@material-ui/icons/Pets';
import ChatBunddleOutline from '@material-ui/icons/ChatBubbleOutline';
import ListIcon from '@material-ui/icons/List';
import BusinessIcon from '@material-ui/icons/Business';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import {HashRouter as Router, Link} from 'react-router-dom';


export const mailFolderListItems = (<Fragment>
        <Router>
            <div>
                <Link to="/dashboard">
    <ListItem button>
      <ListItemIcon>
        <DeveloperBoardIcon />
      </ListItemIcon>

      <ListItemText primary="Dashboard" />
    </ListItem>
    </Link>
    <Link to="/instagram_accounts">
    <ListItem button>
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText primary="Instagram Accounts" />
    </ListItem>
    </Link>
  </div>
  </Router>
</Fragment>
);

export const otherMailFolderListItems = (<Fragment>
        <Router>
  <div>
      <Link to="/duff_account">
    <ListItem button>
      <ListItemIcon>
        <PetsIcon />
      </ListItemIcon>
      <ListItemText primary="DuffGram Account" />
    </ListItem></Link>

<Link to="/about">
    <ListItem button>
      <ListItemIcon>
        <ChatBunddleOutline />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItem>
    </Link>
</div></Router></Fragment>
);
