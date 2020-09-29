import * as actionTypes from '../actions/actionTypes'

let initialState = {
   
  products: null,
  displayedMobile: null,

  // do product show view
  productToShow: null,
  previewImg: null,
  memoryVariant: null,
  colorVariant: null,

  filteredProducts: [],
  cartItems: [],
  cartItemsCount: 0,
  price: 0,
  show: true
  

}

const reducer = (state = initialState, action) => {

    switch (action.type) {

      // fetchni vsetky produkty zo servera
      case actionTypes.FETCH_PRODUCTS : 
        const currentProduct = action.payload.data.find(product => product.id === 4)
          return {
            ...state,
            products: action.payload.data,
            displayedMobile: currentProduct,
            productToShow: currentProduct,
            filteredProducts: action.payload.data,
          }
        
      // fetchni produkt zo servera
      case actionTypes.FETCH_PRODUCT : 
      const showMobile = action.payload.data
      return {
          ...state,
          productToShow: showMobile,
          previewImg: showMobile.images.preview_imgs[0],
          colorVariant: Object.keys(showMobile.details.colors)[0],
          memoryVariant: Object.keys(showMobile.internal_memories)[0],
          price: showMobile.pricing
        }
      
      // fetchni mobil ak je uz nacitany z reduxu
      case actionTypes.SHOW_MOBILE : 
      const mb = state.products.find(el => el.id === action.id)
      return {
        ...state,
        productToShow: mb,
        previewImg: mb.images.preview_imgs[0],
        colorVariant: Object.keys(mb.details.colors)[0],
        memoryVariant: Object.keys(mb.internal_memories)[0],
        price: mb.pricing
      }
      // hlavny img na homepage
      case actionTypes.SHOW_PREVIEW_MOBILE : 
          let mobile = state.products.find(el => el.id === action.payload.id)

          return { 
            ...state,
            displayedMobile: mobile,
            show: false,
            productToShow: mobile
        }
      
      // zmeni preview image v show view
      case actionTypes.CHANGE_PREVIEW_IMG : 
        return {
          ...state,
          previewImg: action.img
        }
        
      case actionTypes.CHANGE_MEMORY_VARIANT : 
        return {
          ...state,
          memoryVariant: action.memory,
          price: state.productToShow.internal_memories[action.memory]
        }
      
      case actionTypes.CHANGE_COLOR_VARIANT : 
        return {
          ...state,
          colorVariant: action.color
        }


      /** Animacie telefonu na homepage */
      case actionTypes.ANIMATION_HIDE_PREVIEW :
        return {
          ...state,
          show: false
        }
        
      case actionTypes.ANIMATION_SHOW_PREVIEW : 
      return {
        ...state,
        show: true
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
}

return state
}


export default reducer