import { DATA } from "../types/dataTypes";

export const setScreamsStart = () => ({
  type: DATA.SET_SCREAMS_START
});

export const setScreamsSuccess = screams => ({
  type: DATA.SET_SCREAMS_SUCCESS,
  payload: screams
});

export const setLoadingData = () => ({
  type: DATA.LOADING_DATA,
  payload: true
});

export const resetLoadingData = () => ({
  type: DATA.LOADING_DATA,
  payload: false
});

export const likeScreamStart = () => ({
  type: DATA.LIKE_SCREAM_START
});

export const likeScreamSuccess = () => ({
  type: DATA.LIKE_SCREAM_SUCCESS
});

export const unlikeScreamStart = () => ({
  type: DATA.UNLIKE_SCREAM_START
});

export const unlikeScreamSuccess = () => ({
  type: DATA.UNLIKE_SCREAM_SUCCESS
});
