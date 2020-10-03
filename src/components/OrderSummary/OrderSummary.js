import React from 'react'
import styles from './OrderSummary.module.css'
import Button from '../UI/Button/Button'
import { connect } from 'react-redux'
import { withRouter } from "react-router";

const OrderSummary = (props) => {
    
    const goToCheckout = () => {
        props.history.push('/checkout')
    }

    return (
        <div className={styles.Summary}>
            <div>
                <h3>Order Summary</h3>
                <section style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <span>Total: </span><span style={{ fontWeight: 'bold'}}>{ props.totalPrice } &euro;</span>
                </section>
            </div>
            <Button disabled={props.cartItems.length == 0} clicked={goToCheckout}>Checkout</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cart,
        totalPrice: state.cart.totalPrice
    }
}


export default withRouter(connect(mapStateToProps)(OrderSummary))
