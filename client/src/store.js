import { configureStore } from '@reduxjs/toolkit'
// import { applyMiddleware, compose } from "redux";
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';

// const initialState = { }


// const middleware = [thunk]



const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
  });

export default store;
