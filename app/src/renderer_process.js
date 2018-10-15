import babelPolyfill from 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import App from './App.jsx'
import DuffAccount from './components/DuffAccount/'
import Sidebar from './components/Sidebar/'
import Dashboard from './components/Dashboard'
import InstagramAccounts from './components/InstagramAccounts'
import './global.css'
import {HashRouter, Switch, Route} from 'react-router-dom'

render(<div>
    <Sidebar/>
    <HashRouter>
        <Switch>
            <Route exact path='/' component={DuffAccount}></Route>
            <Route exact path='/duff_account' component={DuffAccount}></Route>
            <Route exact path='/dashboard' component={Dashboard}></Route>
            <Route exact path='/instagram_accounts' component={InstagramAccounts}></Route>
        </Switch>
    </HashRouter>
</div>, document.getElementById('app'))
