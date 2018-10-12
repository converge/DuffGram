import React, {Component} from 'react'
import {render} from 'react-dom'
import Logo from './components/Logo/'
import Link from './components/Link/'
import Sidebar from './components/Sidebar/'
import DuffAccount from './components/DuffAccount/'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import ElectronImg from './assets/electron.png'
import ReactImg from './assets/react.png'
import WebpackImg from './assets/webpack.png'

const logos = [ElectronImg, ReactImg, WebpackImg]

export default class App extends Component {
    render() {
        const logosRender = logos.map((logo, index) => {
            return <Logo key={index} src={logo}/>
        })

        return (<div>
            <div className="hello">
                <h1>Hello React!</h1>
            </div>
        </div>)
    }
}
