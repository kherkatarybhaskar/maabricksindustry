import api from '../utils/api';
import {
    ADD_SALES_SUCCESS,
    ADD_SALES_ERROR,
    UPDATE_SALES_SUCCESS,
    UPDATE_SALES_ERROR,
    REMOVE_SALES_SUCCESS,
    REMOVE_SALES_FAILED,
    FETCH_SALES_SUCCESS,
    FETCH_SALES_ERROR,
    FILTER_SALES
} from './types';

// Load Sales
export const loadSales = () => async dispatch => {
    try {
      const res = await api.get('/sales');
  
      dispatch({
        type: FETCH_SALES_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FETCH_SALES_ERROR
      });
    }
};
// export const loadSales = () => async dispatch => {
//     try {
//       const res = await api.get('/sales');
  
//       dispatch({
//         type: FETCH_SALES_SUCCESS,
//         payload: res.data
//       });
//     } catch (err) {
//       dispatch({
//         type: FETCH_SALES_ERROR
//       });
//     }
// };

// Add Sale
export const addSales = formData => async dispatch => {
    try {
      await api.post('/sales', formData);          
      const res = await api.get('/sales');
      let sales = []
      for( let key in res.data ){
        sales.push({
            ...res.data[key],
            id: key
        })
      }
    //   console.log(sales);
      dispatch({
        type: ADD_SALES_SUCCESS,
        payload: sales
      });
  
    } catch (err) {
        console.log(err.response.data.errors);
      dispatch({
        type: ADD_SALES_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Update Sale
export const updateSales = formData => async dispatch => {
    try {
        let id =  formData.id;
        await api.post(`/sales/update/${id}`, formData);          
        const res = await api.get('/sales');
        let sales = []
        for( let key in res.data ){
            sales.push({
                ...res.data[key],
                id: key
            })
        }
    //   console.log(sales);
        dispatch({
            type: UPDATE_SALES_SUCCESS,
            payload: sales
        });
  
    } catch (err) {
        console.log(err.response.data.errors);
      dispatch({
        type: UPDATE_SALES_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Filter Sale
export const filterSales = formData => async dispatch => {
  try {
        console.log(formData);
        const response = await api.get('/sales/filter', {
           params: {
             typeofbrick: formData.typeofbrick,
             drivername: formData.drivername,
             vehicletype: formData.vehicletype,
             vehicleno: formData.vehicleno,
             uploaddate: formData.uploaddate,
           } });
        dispatch({
          type: FILTER_SALES,
          payload: response.data
        });
    } catch (err) {
        console.log('Error filtering');
    }
};

// Delete Sale
export const deleteSales = id => async dispatch => {
  try {
        await api.delete(`/sales/${id}`);
        const response = await api.get('/sales');
        dispatch({
          type: REMOVE_SALES_SUCCESS,
          payload: response.data
        });
    } catch (err) {
        dispatch({
          type: REMOVE_SALES_FAILED,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};