import {
    // REGISTER_SUCCESS,
    //REGISTER_FAIL,
    USER_LOADED,
    // AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    // ACCOUNT_DELETED
  } from '../action/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };
  
  function authReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case LOGIN_FAIL:
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null
        };
      default:
        return state;
    }
  }
  
  export default authReducer;