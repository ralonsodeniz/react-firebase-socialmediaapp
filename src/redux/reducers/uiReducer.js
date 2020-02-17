import { UI } from "../types/uiTypes";

const INITIAL_STATE = {
  errors: {},
  loading: false,
  initialLoading: true
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UI.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case UI.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: {}
      };
    case UI.LOADING_UI:
      return {
        ...state,
        loading: action.payload
      };
    case UI.UI_INITIAL_LOADING:
      return {
        ...state,
        initialLoading: action.payload
      };
    default:
      return state;
  }
};

export default uiReducer;
