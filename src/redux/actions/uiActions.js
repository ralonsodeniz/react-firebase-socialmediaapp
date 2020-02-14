import { UI } from "../types/uiTypes";

export const clearErrors = () => ({
  type: UI.CLEAR_ERRORS
});

export const setErrors = errors => ({
  type: UI.SET_ERRORS,
  payload: errors
});

export const setLoadingUi = () => ({
  type: UI.LOADING_UI,
  payload: true
});
