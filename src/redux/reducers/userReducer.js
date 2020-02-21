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
    case USER.MARK_NOTIFICATIONS_READ_SUCCESS:
      const newNotifications =
        action.payload.length > 1
          ? state.notifications.map(notification => ({
              ...notification,
              read: true
            }))
          : state.notifications.reduce((accumulator, notification) => {
              notification.notificationId === action.payload[0]
                ? accumulator.push({ ...notification, read: true })
                : accumulator.push(notification);
              return accumulator;
            }, []);

      return {
        ...state,
        notifications: newNotifications
      };
    default:
      return state;
  }
};

export default userReducer;
