import axios from 'axios';
import { GET_ALL_USERS, TOGGLE_USER_STATUS } from './types';

// Get all users
export const getAllUsers = () => dispatch => {
    axios.get('/api/admin/users')
        .then(res => 
            dispatch({
                type: GET_ALL_USERS,
                payload: res.data
            })
        )
        .catch(err => {
            console.error('Error fetching users:', err);
            dispatch({
                type: GET_ALL_USERS,
                payload: []
            });
        });
};

// Toggle user status
export const toggleUserStatus = (userId) => dispatch => {
    axios.put(`/api/admin/users/${userId}/status`)
        .then(res => 
            dispatch({
                type: TOGGLE_USER_STATUS,
                payload: res.data.user
            })
        )
        .catch(err => {
            console.error('Error toggling user status:', err);
            dispatch({
                type: TOGGLE_USER_STATUS,
                payload: null
            });
        });
};
