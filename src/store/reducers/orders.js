import { addProducts } from '../actions'
import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utillity'
import { browserHistory } from 'react-router'
const initialState = { 
    userInfo: null,
}


const orderReducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.ADD_USER_CONTACT_INFO: 
            return {
                ...state,
                userInfo: action.userInfo
            }
        default:  return state
    }
}

export default orderReducer