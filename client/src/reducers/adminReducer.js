import { GET_ALL_USERS, TOGGLE_USER_STATUS } from "../actions/types";

const initialState = {
  users: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case TOGGLE_USER_STATUS:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id
            ? { ...user, isActive: !user.isActive }
            : user
        ),
      };
    default:
      return state;
  }
}
