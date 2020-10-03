import React, { Component } from 'react';

import styles from './Checkout.module.css'
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import OrderOverview from '../../components/OrderOverview/OrderOverview';
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import { withRouter } from 'react-router-dom'
import Button from '../../components/UI/Button/Button';

class Checkout extends Component {

    state = {
        ownProps: this.props,
        btnDisable: true
    }

    componentDidMount = () => {
        this.props.loadCartItems()
    }

    handleEnableBtn = () => {
        this.setState({ btnDisable: false})
    }

    handleDisableBtn = () => {
        this.setState({ btnDisable: true})
    }
    render() {
        return (
            <div>
                <ContactInfo />
                <div style={{ display: 'flex'}}>
                    <OrderOverview/>
                    <div style={{ flex: '1', textAlign:'right'}}>
                        <p style={{ marginTop: '1rem'}}><strong>Amount to pay: </strong> { this.props.totalPrice } &euro;</p>
                        <Button disabled={this.props.userInfo == null || this.props.cartItems.length == 0 } clicked={() => this.props.placeOrder(this.props.cartItems, this.props.userInfo, this.state.ownProps)}> Place an order!</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.order.userInfo,
        cartItems: state.cart.cart,
        totalPrice: state.cart.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        placeOrder: (items, userInfo, ownProps) => dispatch(actionCreators.placeOrder(items, userInfo, ownProps)),
        loadCartItems: () => dispatch(actionCreators.loadCartItems())
 

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
