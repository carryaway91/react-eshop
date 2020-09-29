import React, { Component } from 'react';

import styles from './Checkout.module.css'
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import OrderOverview from '../../components/OrderOverview/OrderOverview';
class Checkout extends Component {

    render() {
        return (
            <div>
                <ContactInfo />
                <OrderOverview/>
            </div>
        )
    }

}

export default Checkout;
