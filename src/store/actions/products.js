import * as actionTypes from './actionTypes'
import axios from 'axios'

export const fetchProducts = () => dispatch => {
    axios.get('https://react-eshop-e4c9b.firebaseio.com/products.json').then(data => {
        dispatch({
            type: actionTypes.FETCH_PRODUCTS,
            payload: data
        })
    }).catch(err => {
        console.log(err)
    })
}

export const fetchProduct = (id) => dispatch => {
    axios.get('https://cors-anywhere.herokuapp.com/https://react-eshop-e4c9b.firebaseio.com/products/' + id +'.json')
         .then(data => {
             dispatch({
                 type: actionTypes.FETCH_PRODUCT,
                 payload: data
             })
         }).catch(err => 
            console.log(err))
}