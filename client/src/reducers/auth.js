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
    user: {
      "name": 'User',
      "phone": '0000000000',
      "usertype": "user"
    }
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
          user: {
            "name": 'User',
            "phone": '0000000000',
            "usertype": "user"
          }
        };
      default:
        return state;
    }
  }
  
  export default authReducer;