import { DATA } from "../types/dataTypes";

const INITIAL_STATE = {
  screams: [],
  scream: {},
  loading: false
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
        screams: action.payload,
        loading: false
      };
    case DATA.UNLIKE_SCREAM_SUCCESS:
    case DATA.LIKE_SCREAM_SUCCESS:
      // we replace the older version of the liked scream with the new one received in the payload
      const newScreams = state.screams.reduce((accumulator, scream) => {
        if (scream.screamId === action.payload.screamId) {
          accumulator.push(action.payload);
        } else {
          accumulator.push(scream);
        }
        return accumulator;
      }, []);
      return {
        ...state,
        screams: newScreams,
        loading: false
      };
    default:
      return state;
  }
};

export default dataReducer;
