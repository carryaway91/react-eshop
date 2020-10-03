import * as actionTypes from './actionTypes'
import axios from 'axios'


export const addUserInfo = userInfo => {
    return {
        type: actionTypes.ADD_USER_CONTACT_INFO,
        userInfo: userInfo
    }
}

export const placeOrder = ( products, contactInfo, ownProps ) => dispatch => {
    axios.post('https://react-eshop-e4c9b.firebaseio.com/orders.json', {
        customerInfo: contactInfo,
        productOrder: products
    }).then(res => {
        dispatch({
            type: actionTypes.CLEAR_CART
        })
        alert('Thank you for your order!')
        ownProps.history.push('/')
    }).catch(err => {
        console.log(err)
    })
}
    