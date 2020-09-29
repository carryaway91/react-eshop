import React from 'react'
import ProductFilters from '../ProductFilters/ProductFilters'
import styles from './CartItem.module.css'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/cartAction'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CartItem = (props) => {

    const [value, setValue] = useState(1)

    useEffect(() =>{
        setValue(props.product.amount)
    }, [])

    const changeProductAmount = (e) => {
        setValue(e.target.value)
        let amount = e.target.value
        props.changeAmount(props.product.id, amount)
    }
    
    return (
        <div className={styles.ItemContainer}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
                <Link to={`/products/${props.product.product.id}`} style={{ textDecoration: 'none'}}>
                    <img className={styles.ProductImage} src={ props.product.product.images.displayed } />
                </Link>
                <div style={{ marginLeft: '1rem'}}>
                <Link to={`/products/${props.product.product.id}`} style={{ textDecoration: 'none', color: 'black'}}>
                    <p className={styles.ProductName}>{ props.product.product.brand + ' ' + props.product.product.model }</p>
                </Link>    
                    <p>{ props.product.color }</p>
                    <p><strong>{ props.product.price } &euro;</strong></p>
                </div>
            </div>
            <div>
                { props.amountable ? <input id="amount" type="number" style={{ width: '40px'}} min="1" value={value} onChange={changeProductAmount} /> 
                    : 
                     <span>Amount: { value }</span>               
                }
                { props.removable && <button onClick={() => props.removeCartItem(props.product.id)}>X</button>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeAmount: (product, amount) => dispatch(actionCreators.updateAmount(product, amount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
