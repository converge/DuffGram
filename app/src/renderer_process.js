import React from 'react'
import {render} from 'react-dom'
import App from './App.jsx'
import './global.css'
import { HashRouter } from 'react-router-dom'

render(
    <HashRouter>
    <App/>
    </HashRouter>,
    document.getElementById('app')
)
