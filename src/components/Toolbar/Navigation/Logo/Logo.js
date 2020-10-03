import React from 'react'
import styles from './Logo.module.css'
import { Link } from 'react-router-dom'

const Logo = () => {
    return <Link to="/react-eshop" ><div className={styles.Logo}>c<span>all</span>.</div></Link>
}

export default Logo
