import React from 'react'
import Aux from '../auxiliary'
import Toolbar from '../../components/Toolbar/Toolbar'
import styles from './Layout.module.css'

const Layout = (props) => {
    return (
        <div className={styles.Layout}>
            <Toolbar />
            <main className={styles.MainSection}>
                { props.children }
            </main>
        </div>
    )
}

export default Layout
