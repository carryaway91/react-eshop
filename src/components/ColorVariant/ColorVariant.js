import React from 'react'
import styles from './ColorVariant.module.css'

const ColorVariant = ({isActive, variant, selectVariant}) => {
    let classes = [styles.ColorVariants]

    if(isActive) {
        classes.push(styles.ActiveVariant)
    }
    const clicked = () => {
        selectVariant()

    }
    return (
        <div style={{ backgroundColor: variant.color}} 
            className={classes.join(' ')}
            onClick={clicked}>
      
        </div>
    )
}

export default ColorVariant
