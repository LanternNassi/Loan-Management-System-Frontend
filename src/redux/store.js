// src/store.js
import { configureStore , combineReducers } from '@reduxjs/toolkit';

import AppReducer from './state';

let reducer =  combineReducers({AppReducer})

const store = configureStore({
    reducer
});

export default store;
