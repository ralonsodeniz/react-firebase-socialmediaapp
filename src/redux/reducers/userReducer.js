import { USER } from "../types/userTypes";
import { DATA } from "../types/dataTypes";

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
        authenthicated: true,
        loading: false,
        ...action.payload
      };
    case USER.SET_UNAUTHENTICATED:
      return INITIAL_STATE;
    case USER.LOADING_USER:
      return {
        ...state,
        loading: action.payload
      };
    case DATA.LIKE_SCREAM_SUCCESS:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      };
    case DATA.UNLIKE_SCREAM_SUCCESS:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.screamId !== action.payload.screamId
        )
      };
    default:
      return state;
  }
};

export default userReducer;
