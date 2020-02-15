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

export const setUiInitialLoading = () => ({
  type: UI.UI_INITIAL_LOADING,
  payload: true
});

export const resetUiInitialLoading = () => ({
  type: UI.UI_INITIAL_LOADING,
  payload: false
});
