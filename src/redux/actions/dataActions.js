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

export const postScreamStart = screamData => ({
  type: DATA.POST_SCREAM_START,
  payload: screamData
});

export const postScreamSucess = scream => ({
  type: DATA.POST_SCREAM_SUCCESS,
  payload: scream
});

export const getScreamStart = screamId => ({
  type: DATA.GET_SCREAM_START,
  payload: screamId
});

export const getScreamSuccess = screamData => ({
  type: DATA.GET_SCREAM_SUCCESS,
  payload: screamData
});
