import { USER } from "../types/userTypes";

const INITIAL_STATE = {
  authenthicated: false,
  credentials: {},
  likes: [],
  notifications: [],
  loading: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER.SET_AUTHENTICATED:
      return {
        ...state,
        authenthicated: true
      };
    case USER.SET_UNAUTHENTICATED:
      return INITIAL_STATE;
    case USER.LOADING_USER:
      return {
        ...state,
        loading: action.payload
      };
    case USER.LOGIN_SUCCESS:
      return {
        ...state,
        authenthicated: true,
        loading: false,
        ...action.payload
      };
    case USER.SIGNUP_SUCCESS:
      return {
        ...state,
        authenthicated: true,
        ...action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
