import * as actionTypes from './actionTypes'

export const onClickUp = (id) => dispatch => {
   // zmeni sa pole v slidery
   dispatch({
        type: actionTypes.MOVE_ARR_UP,
    })
    //zmeni sa preview mobile image
    dispatch({
        type: actionTypes.ANIMATION_HIDE_PREVIEW
    })
    setTimeout(() => {
        dispatch({
            type: actionTypes.SHOW_PREVIEW_MOBILE,
            payload: {
                id: id,
            }
        })
    }, 500)

    setTimeout(() => {
        dispatch({
            type: 'ANIMATION_SHOW_PREVIEW'
        })
    }, 500)
}

export const onClickDown = id => dispatch => {
    dispatch({
        type: actionTypes.MOVE_ARR_DOWN
    })

    dispatch({
        type: actionTypes.ANIMATION_HIDE_PREVIEW
    })

    setTimeout(() => {
        dispatch({
            type: actionTypes.SHOW_PREVIEW_MOBILE,
            payload: {
                id: id,
            }
        })
    }, 500)

    setTimeout(() => {
        dispatch({
            type: 'ANIMATION_SHOW_PREVIEW'
        })
    }, 500)
}