import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utillity'

const initialState = {
    cart: [],
    totalPrice: 0
}

const addToCart = (state, action) => {
    const cartItem = {
        id: Math.floor(Math.random() * 100000),
        amount: 1,
        product: action.payload.product,
        color: action.payload.color,
        memory: action.payload.memory,
        price: action.payload.price,
        priceAmount: action.payload.price
    }
    if( !JSON.parse(localStorage.getItem('cartItems')) ) {
        localStorage.setItem('cartItems', JSON.stringify([cartItem]))
    } else {
        let cartArray = JSON.parse(localStorage.getItem('cartItems'))
        cartArray.unshift(cartItem)
        localStorage.setItem('cartItems', JSON.stringify(cartArray))
    }
    return state
}

const loadCartItems = (state, action) => {
    const items = JSON.parse(localStorage.getItem('cartItems'))
        let totalPrice = 0
        items.map(item => {
            totalPrice = totalPrice + item.priceAmount
        })
        return updateObject(state, { cart: items, totalPrice: totalPrice })
}

const removeCartItem = (state,action) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
        const filtered = cartItems.filter(item => item.id !== action.id)
        localStorage.setItem('cartItems', JSON.stringify(filtered))
        
        let total = 0
        filtered.map(item => {
            total = total + item.price
        })
        return updateObject(state, { cart: filtered, totalPrice: total})
}

const updateCartAmount = (state, action) => {
    const copy = JSON.parse(localStorage.getItem('cartItems'))
    const item = copy.find(item => item.id == action.payload.id)
    const updatedItem = {
        ...item,
        amount: +action.payload.amount,
        priceAmount: item.price * Number(action.payload.amount)
    }
    const updatedCopy = copy.map(item => item.id === updatedItem.id ? item = updatedItem : item)
    localStorage.setItem('cartItems', JSON.stringify(updatedCopy))
    let tp = 0
    updatedCopy.map(item => {
        tp = tp + item.priceAmount
    })

    return updateObject(state, { totalPrice: tp})
}

const cartReducer = ( state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART: return addToCart(state, action)
        case actionTypes.LOAD_CART_ITEMS: return loadCartItems(state,action) 
        case actionTypes.REMOVE_CART_ITEM: return removeCartItem(state, action)
        case actionTypes.UPDATE_AMOUNT: return updateCartAmount(state, action)
        default: return state
    }
}

export default cartReducer