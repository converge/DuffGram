import babelPolyfill from 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import PermanentDrawer from './components/ComponentDrawer'
import './global.css'
import {HashRouter, Switch, Route} from 'react-router-dom'

render(
    <PermanentDrawer/>
, document.getElementById('app'))
