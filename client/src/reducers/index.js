import { combineReducers } from 'redux';

import auth from './auth';
import sales from './sales'
import material from './material'
import carrier from './carrier'
import cook from './cook'

export default combineReducers({
    auth,
    sales,
    material,
    carrier,
    cook
});