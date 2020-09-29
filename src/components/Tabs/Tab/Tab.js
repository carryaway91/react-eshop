import React from 'react'
import styles from './Tab.module.css'

const Tab = ({tabName, onActivate, index, active}) => {

    let classes = [styles.Tab]

    if(active) {
        classes.push(styles.Active)
    }

    return (
        <div className={classes.join(' ')} onClick={()=>onActivate(index)}>
            {tabName}
        </div>
    )
}

export default Tab
