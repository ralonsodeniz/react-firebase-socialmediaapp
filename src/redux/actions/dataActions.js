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

export const likeScreamStart = screamId => ({
  type: DATA.LIKE_SCREAM_START,
  payload: screamId
});

export const likeScreamSuccess = scream => ({
  type: DATA.LIKE_SCREAM_SUCCESS,
  payload: scream
});

export const unlikeScreamStart = screamId => ({
  type: DATA.UNLIKE_SCREAM_START,
  payload: screamId
});

export const unlikeScreamSuccess = scream => ({
  type: DATA.UNLIKE_SCREAM_SUCCESS,
  payload: scream
});

export const deleteScreamStart = screamId => ({
  type: DATA.DELETE_SCREAM_START,
  payload: screamId
});

export const deleteScreamSuccess = screamId => ({
  type: DATA.DELETE_SCREAM_SUCCESS,
  payload: screamId
});
