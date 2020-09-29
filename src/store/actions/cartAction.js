import * as actionTypes from './actionTypes'


export const addToCart = (product, color, memory, price) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: {
            product: product,
            color: color,
            memory: memory,
            price: price
        }
    }
}

export const loadCartItems = () => {
    return {
        type: actionTypes.LOAD_CART_ITEMS
    }
}

export const removeCartItem = id => {
    return {
        type: actionTypes.REMOVE_CART_ITEM,
        id: id
    }
}

export const updateAmount = (productID, amount) => {
    return {
        type: actionTypes.UPDATE_AMOUNT,
        payload: {
            id: productID,
            amount: amount
        }
    }
}