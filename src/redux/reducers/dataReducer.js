import { DATA } from "../types/dataTypes";

const INITIAL_STATE = {
  screams: [],
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
        screams: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default dataReducer;
