import React from 'react'
import styles from './Button.module.css'

const Button = (props) => {
    
    let classes = [styles.Button]
    if (props.btnType) {
        classes.push(styles[props.btnType])
    }
    
    return (
        <button className={classes.join(' ')}>
            { props.children }
        </button>
    )
}

export default Button
