import {
    FETCH_MATERIAL_SUCCESS,
    FETCH_MATERIAL_ERROR,
    ADD_MATERIAL_SUCCESS,
    ADD_MATERIAL_ERROR,
    UPDATE_MATERIAL_SUCCESS,
    FILTER_MATERIAL,
    REMOVE_MATERIAL_SUCCESS,
    REMOVE_MATERIAL_FAILED
   } from '../action/types';
   
   const initialState = {
 
   };

function materialReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_MATERIAL_SUCCESS:
        case UPDATE_MATERIAL_SUCCESS:
        case FILTER_MATERIAL:
        case REMOVE_MATERIAL_SUCCESS:
            return {
                material: payload
            };
        case FETCH_MATERIAL_SUCCESS:
            return {
                ...state,
                material: payload
            };
        case ADD_MATERIAL_ERROR:
        case FETCH_MATERIAL_ERROR:
        case REMOVE_MATERIAL_FAILED:
            return{
                material: payload
            }
        default:
            return state;
    }
}
  
export default materialReducer;