import React from 'react'
import styles from './MemoryVariant.module.css'
import classes from './MemoryVariant.module.css'

const MemoryVariant = ({isActive, memory, selectPrice}) => {

    let classes = [styles.MemoryVariant]

    if(isActive) {
        classes.push(styles.ActiveMemory)
    }
    return (
        <span className={classes.join(' ')} onClick={selectPrice}>
            { memory }Gb
        </span>
    )
}

export default MemoryVariant
