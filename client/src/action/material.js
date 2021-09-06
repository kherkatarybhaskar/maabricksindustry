import api from '../utils/api';
import {
    ADD_MATERIAL_SUCCESS,
    ADD_MATERIAL_ERROR,
    UPDATE_MATERIAL_SUCCESS,
    UPDATE_MATERIAL_ERROR,
    FETCH_MATERIAL_SUCCESS,
    FETCH_MATERIAL_ERROR,
    FILTER_MATERIAL,
    REMOVE_MATERIAL_SUCCESS,
    REMOVE_MATERIAL_FAILED
} from './types';

// Load Material
export const loadMaterial = () => async dispatch => {
    try {
      const res = await api.get('/material');
  
      dispatch({
        type: FETCH_MATERIAL_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FETCH_MATERIAL_ERROR
      });
    }
};

// Add Material
export const addMaterial = formData => async dispatch => {
    console.log('Add Material Called');
    try {
      await api.post('/material', formData);          
      const res = await api.get('/material');
      let material = []
      for( let key in res.data ){
        material.push({
            ...res.data[key],
            id: key
        })
      }
      dispatch({
        type: ADD_MATERIAL_SUCCESS,
        payload: material
      });
  
    } catch (err) {
        console.log(err.response.data.errors);
      dispatch({
        type: ADD_MATERIAL_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Update Sale
export const updateMaterial = formData => async dispatch => {
    try {
        let id =  formData.id;
        await api.post(`/material/update/${id}`, formData);          
        const res = await api.get('/material');
        let material = []
        for( let key in res.data ){
            material.push({
                ...res.data[key],
                id: key
            })
        }
    //   console.log(material);
        dispatch({
            type: UPDATE_MATERIAL_SUCCESS,
            payload: material
        });
  
    } catch (err) {
        console.log(err.response.data.errors);
      dispatch({
        type: UPDATE_MATERIAL_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Filter Sale
export const filterMaterial = formData => async dispatch => {
  try {
        // console.log(formData);
        const response = await api.get('/material/filter', {
           params: {
            vehicleplateno: formData.vehicleplateno,
            drivername: formData.drivername,
            vehicletype: formData.vehicletype,
            materialname: formData.materialname,
            quantity: formData.quantity,
            sender: formData.sender,
            uploaddate: formData.uploaddate
           } });
        dispatch({
          type: FILTER_MATERIAL,
          payload: response.data
        });
    } catch (err) {
        console.log('Error filtering');
    }
};

// Delete Material
export const deleteMaterial = id => async dispatch => {
    try {
          await api.delete(`/material/${id}`);
          const response = await api.get('/material');
          dispatch({
            type: REMOVE_MATERIAL_SUCCESS,
            payload: response.data
          });
      } catch (err) {
          dispatch({
            type: REMOVE_MATERIAL_FAILED,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
      }
  };