import api from '../utils/api';
import {
    ADD_CARRIER_SUCCESS,
    ADD_CARRIER_ERROR,
    UPDATE_CARRIER_SUCCESS,
    UPDATE_CARRIER_ERROR,
    FETCH_CARRIER_SUCCESS,
    FETCH_CARRIER_ERROR,
    FILTER_CARRIER,
    REMOVE_CARRIER_SUCCESS,
    REMOVE_CARRIER_FAILED,
} from './types';

// Load Carrier
export const loadCarrier = () => async dispatch => {
    try {
      const res = await api.get('/carrier');
  
      dispatch({
        type: FETCH_CARRIER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FETCH_CARRIER_ERROR
      });
    }
};

// Add Carrier
export const addCarrier = formData => async dispatch => {
    console.log('Add Carrier Called');
    try {
      await api.post('/carrier', formData);          
      const res = await api.get('/carrier');
      let carrier = []
      for( let key in res.data ){
        carrier.push({
            ...res.data[key],
            id: key
        })
      }
      dispatch({
        type: ADD_CARRIER_SUCCESS,
        payload: carrier
      });
  
    } catch (err) {
        console.log(err.response.data.errors);
      dispatch({
        type: ADD_CARRIER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Update Carrier
export const updateCarrier = formData => async dispatch => {
    try {
        let id =  formData.id;
        await api.post(`/carrier/update/${id}`, formData);          
        const res = await api.get('/carrier');
        let carrier = []
        for( let key in res.data ){
            carrier.push({
                ...res.data[key],
                id: key
            })
        }
    //   console.log(carrier);
        dispatch({
            type: UPDATE_CARRIER_SUCCESS,
            payload: carrier
        });
  
    } catch (err) {
        console.log(err.response.data.errors);
      dispatch({
        type: UPDATE_CARRIER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Filter Carrier
export const filterCarrier = formData => async dispatch => {
  try {
        console.log('Filter Carrier Called');
        const response = await api.get('/carrier/filter', {
           params: {
            carriername: formData.carriername,
            uploaddate: formData.uploaddate
           } });
        dispatch({
          type: FILTER_CARRIER,
          payload: response.data
        });
    } catch (err) {
        console.log('Error filtering');
    }
};

// Delete Carrier
export const deleteCarrier = id => async dispatch => {
    try {
          await api.delete(`/carrier/${id}`);
          const response = await api.get('/carrier');
          dispatch({
            type: REMOVE_CARRIER_SUCCESS,
            payload: response.data
          });
      } catch (err) {
          dispatch({
            type: REMOVE_CARRIER_FAILED,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
      }
  };