import React, {Component}  from 'react'
import styles from './styles.css'
import { Link } from 'react-router-dom'

export default class Logo extends React.Component {
    render() {
        // return <img src={this.props.src} className={styles.logo}/>
        return (
            <div>
                <h1>logo-here</h1>
                <Link to="content">conteudo</Link>
            </div>
        );
    }
}
