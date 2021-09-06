import {
    FETCH_COOK_SUCCESS,
    FETCH_COOK_ERROR,
    ADD_COOK_SUCCESS,
    ADD_COOK_ERROR,
    UPDATE_COOK_SUCCESS,
    FILTER_COOK,
    REMOVE_COOK_SUCCESS,
    REMOVE_COOK_FAILED
   } from '../action/types';
   
   const initialState = {
 
   };

function cookReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_COOK_SUCCESS:
        case UPDATE_COOK_SUCCESS:
        case FILTER_COOK:
        case REMOVE_COOK_SUCCESS:
            return {
                cook: payload
            };
        case FETCH_COOK_SUCCESS:
            return {
                ...state,
                cook: payload
            };
        case ADD_COOK_ERROR:
        case FETCH_COOK_ERROR:
        case REMOVE_COOK_FAILED:
            return{
                cook: payload
            }
        default:
            return state;
    }
}
  
export default cookReducer;