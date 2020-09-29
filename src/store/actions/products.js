import * as actionTypes from './actionTypes'
import axios from 'axios'

export const fetchProducts = () => dispatch => {
    axios.get('https://react-eshop-e4c9b.firebaseio.com/products.json').then(data => {
        dispatch({
            type: actionTypes.FETCH_PRODUCTS,
            payload: data
        })
        dispatch({
            type: actionTypes.SET_SLIDER_DATA,
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

export const findMobile = id => {
    return {
        type: actionTypes.SHOW_MOBILE,
        id: id
    }
}

export const changePreviewImg = img => {
    return {
        type: actionTypes.CHANGE_PREVIEW_IMG,
        img: img
    }
}

export const changeMemory = memory => {
    return {
        type: actionTypes.CHANGE_MEMORY_VARIANT,
        memory: memory
    }
}

export const changeColor = color => {
    return {
        type: actionTypes.CHANGE_COLOR_VARIANT,
        color: color
    }
}


/** Product list */

export const setFilteredProducts = () => {
    return {
        type: actionTypes.SET_FILTERED_PRODUCTS
    }
}

export const addFilteredBrand = brand => {
    return {
        type: actionTypes.ADD_FILTERED_BRAND,
        brand: brand
    }
}

export const removeFilteredBrand = brand => {
    return {
        type: actionTypes.REMOVE_FILTERED_BRAND,
        brand: brand
    }
}

export const showAllBrands = () => {
    return {
        type: actionTypes.SHOW_ALL_BRANDS
    }
}

export const showCheapest = () => {
    return {
        type: actionTypes.SHOW_CHEAPEST
    }
}

export const showMostExpensive = () => {
    return {
        type: actionTypes.SHOW_THE_MOST_EXPENSIVE
    }
}

export const showTopRated = () => {
    return {
        type: actionTypes.SHOW_TOP_RATED
    }
}