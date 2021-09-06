import {
    FETCH_CARRIER_SUCCESS,
    FETCH_CARRIER_ERROR,
    ADD_CARRIER_SUCCESS,
    ADD_CARRIER_ERROR,
    UPDATE_CARRIER_SUCCESS,
    FILTER_CARRIER,
    REMOVE_CARRIER_SUCCESS,
    REMOVE_CARRIER_FAILED
   } from '../action/types';
   
   const initialState = {
 
   };

function carrierReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_CARRIER_SUCCESS:
        case UPDATE_CARRIER_SUCCESS:
        case FILTER_CARRIER:
        case REMOVE_CARRIER_SUCCESS:
            return {
                carrier: payload
            };
        case FETCH_CARRIER_SUCCESS:
            return {
                ...state,
                carrier: payload
            };
        case ADD_CARRIER_ERROR:
        case FETCH_CARRIER_ERROR:
        case REMOVE_CARRIER_FAILED:
            return{
                carrier: payload
            }
        default:
            return state;
    }
}
  
export default carrierReducer;