import {
   ADD_SALES_SUCCESS,
   UPDATE_SALES_SUCCESS,
   UPDATE_SALES_ERROR,
   FETCH_SALES_SUCCESS,
   ADD_SALES_ERROR,
   FILTER_SALES,
   REMOVE_SALES_SUCCESS,
   REMOVE_SALES_FAILED,
} from '../action/types';
  
const initialState = {

};

function salesReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_SALES_SUCCESS:
        case UPDATE_SALES_SUCCESS:
        case FILTER_SALES:
        case REMOVE_SALES_SUCCESS:
            return {
                sales: payload
            };
        case FETCH_SALES_SUCCESS:
            return {
                ...state,
                sales: payload
            };
        case ADD_SALES_ERROR:
        case UPDATE_SALES_ERROR:
        case REMOVE_SALES_FAILED:
            return{
                sales: payload
            }
        default:
            return state;
    }
}
  
export default salesReducer;