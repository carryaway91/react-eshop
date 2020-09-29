import * as actionTypes from '../actions/actionTypes'

const initialState = {
    productsForSlider: null,
    activeMobileIndex: 3,  // active classsa v slidery
    setActiveIndex: 3,
}

const filterReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case actionTypes.SET_SLIDER_DATA : 
            return {
                ...state,
                productsForSlider: action.payload.data
            }

        case actionTypes.MOVE_ARR_UP : 
            const updated = [ ...state.productsForSlider ]
            updated.unshift(updated.pop())
            return {
                ...state,
                productsForSlider: updated
            }

        case actionTypes.MOVE_ARR_DOWN : 
            const up = [ ...state.productsForSlider]
            up.push(up.shift())
            return {
                ...state,
                productsForSlider: up
            }
    }
    return state
}

export default filterReducer