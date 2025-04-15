import axios from "axios";

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from "./types";


//GET current profile 
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/api/profile')
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: { }
        }) )
}
// Create Profile
export  const createProfile = (profileData, navigate) => (dispatch) => {
    axios.post('api/profile', profileData)
        .then(() => navigate('/dashboard'))
            .catch((err) => dispatch({
                type: GET_ERRORS,
                payload: err.response?.data || {general: 'Something went wrong'}
            }))
}

// Delete account and profile
export const deleteAccount = () => dispatch => {
    if (window.confirm("Are you sure? This can't be undone")) {
        axios.delete('/api/profile')
        .then(res => 
            dispatch({
                type: SET_CURRENT_USER,
                payload: { }
            })
        )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
    }
}
// Profile loading

export const setProfileLoading = () => {
    return{
        type: PROFILE_LOADING
    }
}

// Clear Profile

export const clearCurrentProfile = () => {
    return{
        type: CLEAR_CURRENT_PROFILE
    }
}