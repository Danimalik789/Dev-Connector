import axios from "axios";
import setAuthToken from "../utils/setAuthHeader";
import {jwtDecode} from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register User
export const registerUser = (userData, navigate) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => navigate("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }) 
    );
};

//Login - GET User Token

export const loginUser = (userData) => (dispatch) => {
  axios.post('/api/users/login', userData)
    .then(res => {
      //Save to local storage 
      const  { token } = res.data;
      // Set token to local storage
      localStorage.setItem('jwtToken', token)
       // set token to auth header
       setAuthToken(token)
       //Decode token to get user data 
       const decoded = jwtDecode(token)
       //set current user 
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
};

// Set logged in user

export const setCurrentUser = (decoded) =>{
  return {
    type: SET_CURRENT_USER,
    payload: decoded

  }
}

// Log out user 
export const logoutUser  = ( ) => dispatch =>  {
  // Remove token from local storage 
  localStorage.removeItem('jwtToken')
  //Remove auth header for future requests
  setAuthToken(false);
  // Set current user to { } which will set isAuthenticated to false
  dispatch(setCurrentUser({ }))

}