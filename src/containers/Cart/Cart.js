import React, { Component } from 'react';
import { connect } from 'react-redux'
import CartItem from '../../components/CartItem/CartItem'
import * as actionTypes from '../../store/actions/actionTypes'
import styles from './Cart.module.css'

class Cart extends Component {
    
    componentDidMount = () => {
        this.props.loadCartItems()
    }

    handleRemoveCartItem = (id) => {
        this.props.removeCartItem(id)
     }

    render() {
        const renderCartItems = this.props.cartItems.map(item => {
            return <CartItem product={item} removeCartItem={this.handleRemoveCartItem} />
        })
        return (
            <div>
                { renderCartItems.length > 0 ? renderCartItems : <p>No items in cart</p> }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.products.cartItems,
        totalPrice: state.products.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCartItems: () => dispatch({ type: actionTypes.LOAD_CART_ITEMS}),
        removeCartItem: (id) => dispatch({ type: actionTypes.REMOVE_CART_ITEM, id: id})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
