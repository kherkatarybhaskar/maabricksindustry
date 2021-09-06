import api from '../utils/api';
import {
    ADD_COOK_SUCCESS,
    ADD_COOK_ERROR,
    UPDATE_COOK_SUCCESS,
    UPDATE_COOK_ERROR,
    FETCH_COOK_SUCCESS,
    FETCH_COOK_ERROR,
    FILTER_COOK,
    REMOVE_COOK_SUCCESS,
    REMOVE_COOK_FAILED
} from './types';

// Load Cook
export const loadCook = () => async dispatch => {
    try {
      const res = await api.get('/cook');
  
      dispatch({
        type: FETCH_COOK_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FETCH_COOK_ERROR
      });
    }
};

// Add Cook
export const addCook = formData => async dispatch => {
    console.log('Add Cook Called');
    try {
      await api.post('/cook', formData);          
      const res = await api.get('/cook');
      let cook = []
      for( let key in res.data ){
        cook.push({
            ...res.data[key],
            id: key
        })
      }
      dispatch({
        type: ADD_COOK_SUCCESS,
        payload: cook
      });
  
    } catch (err) {
        console.log(err.response.data.errors);
      dispatch({
        type: ADD_COOK_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Update Cook
export const updateCook = formData => async dispatch => {
    try {
        let id =  formData.id;
        await api.post(`/cook/update/${id}`, formData);          
        const res = await api.get('/cook');
        let cook = []
        for( let key in res.data ){
            cook.push({
                ...res.data[key],
                id: key
            })
        }
    //   console.log(cook);
        dispatch({
            type: UPDATE_COOK_SUCCESS,
            payload: cook
        });
  
    } catch (err) {
        console.log(err.response.data.errors);
      dispatch({
        type: UPDATE_COOK_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Filter Cook
export const filterCook = formData => async dispatch => {
  try {
        console.log('Filter Carrier Called');
        const response = await api.get('/cook/filter', {
           params: {
            cookname: formData.cookname,
            quantitycooked: formData.quantitycooked,
            uploaddate: formData.uploaddate
           } });
        dispatch({
          type: FILTER_COOK,
          payload: response.data
        });
    } catch (err) {
        console.log('Error filtering');
    }
};

// Delete Cook
export const deleteCook = id => async dispatch => {
    try {
          await api.delete(`/cook/${id}`);
          const response = await api.get('/cook');
          dispatch({
            type: REMOVE_COOK_SUCCESS,
            payload: response.data
          });
      } catch (err) {
          dispatch({
            type: REMOVE_COOK_FAILED,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
      }
  };