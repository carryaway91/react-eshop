import React, { Component } from 'react';
import { connect } from 'react-redux'
import CartItem from '../../components/CartItem/CartItem'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import * as actionTypes from '../../store/actions/actionTypes'
import * as actionCreators from '../../store/actions/index'
import styles from './Cart.module.css'

class Cart extends Component {
    
    componentDidMount = () => {
        this.props.loadCartItems()
    }

    handleRemoveCartItem = (id) => {
        this.props.removeCartItem(id)
     }

     renderCartItems = () => {
        if( this.props.cartItems.length !== 0 ) {
            return this.props.cartItems.map(item => (
                 <CartItem product={item} removable={true} amountable={true} removeCartItem={this.props.removeCartItem} />
            ))
        } else {
            return <p>No items in cart!</p>
        }
     }

    render() {
        return (
            <div className={styles.Cart}>
                <div className={styles.CartItems}>
                    { this.renderCartItems() }
                </div>
                <OrderSummary />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cart,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCartItems: () => dispatch(actionCreators.loadCartItems()),
        removeCartItem: (id) => dispatch(actionCreators.removeCartItem(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
