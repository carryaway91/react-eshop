import React from 'react'
import ProductFilters from '../ProductFilters/ProductFilters'
import styles from './CartItem.module.css'

const CartItem = (props) => {
    return (
        <div className={styles.ItemContainer}>
            <img className={styles.ProductImage} src={ props.product.images.displayed } />
            <div>
                <p>{ props.product.brand + ' ' + props.product.model }</p>
                <p><strong>{ props.product.pricing } &euro;</strong></p>
            </div>
            <button onClick={() => props.removeCartItem(props.product.id)}>X</button>
        </div>
    )
}

export default CartItem
