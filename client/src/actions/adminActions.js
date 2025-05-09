import axios from "axios";
import { GET_ALL_USERS, TOGGLE_USER_STATUS } from "./types";

// Get all users
export const getAllUsers = () => (dispatch) => {
  axios
    .get("/api/admin/users")
    .then((res) =>
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_ALL_USERS,
        payload: [],
      });
    });
};

// Toggle user status
export const toggleUserStatus = (userId) => (dispatch) => {
  // First dispatch to update UI immediately
  dispatch({
    type: TOGGLE_USER_STATUS,
    payload: { _id: userId },
  });

  // Then make the API call
  axios.put(`/api/admin/users/${userId}/status`).catch((err) => {
    // If the API call fails, refresh the users list to revert the change
    dispatch(getAllUsers());
  });
};
