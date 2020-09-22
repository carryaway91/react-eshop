import React from 'react'
import TheNavigation from './Navigation/Navigation'
import UserItems from './UserItems/UserItems'
import styles from './Toolbar.module.css'

const Toolbar = () => {
    return (
        <div className={styles.Toolbar}>
            <TheNavigation />
            <UserItems />
        </div>
    )
}

export default Toolbar
