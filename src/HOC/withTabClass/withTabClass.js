import React, { Component } from 'react'
import styles from './withTabClass.module.css'

const withTabClass = WrappedComponent => {
    return class extends Component {
        render() {
            return (
                <div className={styles.Overlay}>
                    <WrappedComponent />
                </div>
            )
        }
    }
}

export default withTabClass
