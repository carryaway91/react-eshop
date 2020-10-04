import React from 'react'
import Logo from './Logo/Logo'
import styles from './Navigation.module.css'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className={styles.TheNavigation}>
            <Logo />
            <ul>
                <li><NavLink activeClassName={styles.ActiveLink} to="/products" exact>Products</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation
