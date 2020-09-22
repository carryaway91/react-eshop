import * as actionTypes from '../actions/actionTypes'

let initialState = {
   
  products: null,
  displayedMobile: null,
  visibleMobileID: null,
    // zobrazeny mobil na homepage
  activeIndex: 2,
  // do product show view
  productToShow: null,
  filteredProducts: [],
  productsForSlider: [],
  cartItems: [],
  cartItemsCount: 0,
  totalPrice: 0,

}

const reducer = (state = initialState, action) => {

    switch (action.type) {
      case actionTypes.FETCH_PRODUCTS : 
      const currentProduct = action.payload.data.find(product => product.id === 4)
        return {
          ...state,
          products: action.payload.data,
          displayedMobile: currentProduct,
          filteredProducts: action.payload.data,
          productsForSlider: action.payload.data,
          visibleMobileID: currentProduct.id
        }

      case actionTypes.FETCH_PRODUCT : 
      console.log(action)
        return {
          ...state,
          productToShow:action.payload.data
        }
      case actionTypes.SHOW_PREVIEW_MOBILE : 
        const mobile = state.products.find(el => el.id === action.id)
        return { 
          ...state,
          displayedMobile: mobile,
          activeIndex: action.index
      }
     
      case actionTypes.SHOW_MOBILE : 

        const mb = state.products.find(el => el.id === action.id)
        return {
          ...state,
          productToShow: mb
        }
      
      case actionTypes.SET_FILTERED_PRODUCTS : 
        const products = [...state.products]

        return {
          ...state,
          filteredProducts: products
        }

      // brands 
      
      case actionTypes.ADD_FILTERED_BRAND :
        const mobiles = state.products.filter(product => product.brand === action.brand)
        return {
          ...state,
          filteredProducts: mobiles
        }

    case actionTypes.REMOVE_FILTERED_BRAND : 
      let filteredProducts = state.filteredProducts.filter(mobile => mobile.brand !== action.brand)

        return {
          ...state,
          filteredProducts: filteredProducts
        }
    
    case actionTypes.SHOW_ALL_BRANDS : 
      return {
        ...state,
        filteredProducts: [...state.products]
      }
    
    case actionTypes.SHOW_CHEAPEST : 
      let copiedFiltered = [ ...state.filteredProducts ]
      let sorted = copiedFiltered.sort((a, b) => a.pricing - b.pricing )

      return {
        ...state,
        filteredProducts: sorted
      }

    case actionTypes.SHOW_THE_MOST_EXPENSIVE : 
    let copy = [ ...state.filteredProducts ]
    let sortedByExpensive = copy.sort((a, b) => b.pricing - a.pricing )

    return {
      ...state,
      filteredProducts: sortedByExpensive
    }

    case actionTypes.SHOW_TOP_RATED : 
      let c = [ ...state.filteredProducts ]
      let sortByTopRated = c.sort((a,b) => b.stars - a.stars )
      return {
        ...state,
        filteredProducts: sortByTopRated
      }

    case actionTypes.ADD_TO_CART : 
      let updateCartItems = [ state.productToShow, ...state.cartItems]
      localStorage.setItem('cartItems', JSON.stringify(updateCartItems))
      break

    case actionTypes.LOAD_CART_ITEMS : 
    const items = JSON.parse(localStorage.getItem('cartItems'))
    
    let total = 0
    
    for(let item of items) {
      total = total + item.pricing
    }

    return {
      ...state,
      cartItems: [ ...items],
      totalPrice: total
    
    }

    case actionTypes.REMOVE_CART_ITEM : 
      let cartItems = JSON.parse(localStorage.getItem('cartItems'))
      const filtered = cartItems.filter(item => item.id !== action.id)
      localStorage.setItem('cartItems', JSON.stringify(filtered))

      return {
        ...state,
        cartItems: [ ...filtered ]
      }

}

return state
}


export default reducer