import { DATA } from "../types/dataTypes";

const INITIAL_STATE = {
  screams: [],
  scream: {},
  loading: false,
  user: {}
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA.LOADING_DATA:
      return {
        ...state,
        loading: action.payload
      };
    case DATA.SET_SCREAMS_SUCCESS:
      return {
        ...state,
        screams: action.payload
      };
    case DATA.UNLIKE_SCREAM_SUCCESS:
    case DATA.LIKE_SCREAM_SUCCESS:
      // we replace the older version of the liked scream with the new one received in the payload
      return {
        ...state,
        screams: state.screams.reduce((accumulator, scream) => {
          if (scream.screamId === action.payload.screamId) {
            accumulator.push(action.payload);
          } else {
            accumulator.push(scream);
          }
          return accumulator;
        }, []),
        scream: {
          ...state.scream,
          likeCount:
            state.scream.screamId === action.payload.screamId
              ? action.payload.likeCount
              : state.scream.likeCount
        }
      };
    case DATA.DELETE_SCREAM_SUCCESS:
      return {
        ...state,
        screams: state.screams.filter(
          scream => scream.screamId !== action.payload
        )
      };
    case DATA.POST_SCREAM_SUCCESS:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case DATA.GET_SCREAM_SUCCESS:
      return {
        ...state,
        scream: action.payload
      };
    case DATA.POST_COMMENT_SUCCESS:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
          commentCount:
            state.scream.screamId === action.payload.screamId
              ? state.scream.commentCount + 1
              : state.scream.commentCount
        },
        screams: state.screams.reduce((accumulator, scream) => {
          if (scream.screamId === action.payload.screamId) {
            accumulator.push({
              ...scream,
              commentCount: scream.commentCount + 1
            });
          } else {
            accumulator.push(scream);
          }
          return accumulator;
        }, [])
      };
    case DATA.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default dataReducer;
