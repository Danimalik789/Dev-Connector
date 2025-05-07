import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer'
import postReducer from './postReducer';
import adminReducer from './adminReducer';

export default combineReducers({
    auth : authReducer,
    errors: errorReducer,
    profile: profileReducer,
    post: postReducer,
    admin: adminReducer
})

