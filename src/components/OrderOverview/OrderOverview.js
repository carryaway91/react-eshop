import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import CartItem from '../CartItem/CartItem'

const OrderOverview = (props) => {
    useEffect(() => {
        props.loadCartItems()
    }, [])

    let cartItems = props.cartItems.map(item => (
        <CartItem product={item} />
    ))
    return (
        <div>
            <h2>Order summary</h2>
            { cartItems }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCartItems: () => dispatch(actionCreators.loadCartItems())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderOverview)

