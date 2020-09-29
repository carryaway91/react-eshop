import React, { Fragment } from 'react'
import styles from './Input.module.css'

const Input = (props) => {
    
    let input = null

    let classes = [styles.Input]

    if(props.error) {
        classes.push(styles.Danger)
    }

    switch (props.elementType) {
        case 'input' :
            input = (
                <Fragment>
                    <label className={styles.Label}>{ props.label }</label>
                    <input className={classes.join(' ')} { ...props.elementAttrs} value={props.value} onChange={props.changed }/>
                </Fragment>
                )
                break
            default:
            input = <input className={classes.join(' ')} { ...props.elementAttrs} value={props.value} onChange={props.changed }/>


        }
    
    return (
        <div>
            { input }
        </div>
    )
}

export default Input