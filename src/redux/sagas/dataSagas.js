import { takeLatest, put, call, all } from "redux-saga/effects";

import { DATA } from "../types/dataTypes";
import {
  setLoadingData,
  resetLoadingData,
  setScreamsSuccess,
  likeScreamSuccess,
  unlikeScreamSuccess,
  deleteScreamSuccess,
  postScreamSucess,
  getScreamSuccess,
  postCommentSuccess,
  getUserSuccess
} from "../actions/dataActions";
import { setErrors, clearErrors, setLoadingUi } from "../actions/uiActions";
import {
  getScreamsFromScreams,
  getLikeScreamFromScream,
  getUnikeScreamFromScream,
  deleteScreamFromScream,
  postScreamToscream,
  getScreamFromScream,
  postCommentToScream,
  getUserFromUser
} from "../helpers/dataHelpers";

// get screams
export function* onSetScreamsStart() {
  yield takeLatest(DATA.SET_SCREAMS_START, setScreams);
}

export function* setScreams() {
  try {
    yield put(setLoadingData());
    const screams = yield call(getScreamsFromScreams);
    yield put(setScreamsSuccess(screams));
    yield put(clearErrors());
    yield put(resetLoadingData());
  } catch (error) {
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    yield put(resetLoadingData());
    console.log(jsObjError);
  }
}

// like a scream
export function* onLikeScreamStart() {
  yield takeLatest(DATA.LIKE_SCREAM_START, likeScream);
}

export function* likeScream({ payload }) {
  try {
    const scream = yield call(getLikeScreamFromScream, payload);
    yield put(likeScreamSuccess(scream));
    yield put(clearErrors());
  } catch (error) {
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    console.log(jsObjError);
  }
}

// unlike a scream
export function* onUnlikeScreamStart() {
  yield takeLatest(DATA.UNLIKE_SCREAM_START, unlikeScream);
}

export function* unlikeScream({ payload }) {
  try {
    const scream = yield call(getUnikeScreamFromScream, payload);
    yield put(unlikeScreamSuccess(scream));
    yield put(clearErrors());
  } catch (error) {
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    console.log(jsObjError);
  }
}

// delete a scream
export function* onDeleteScreamStart() {
  yield takeLatest(DATA.DELETE_SCREAM_START, deleteScream);
}

export function* deleteScream({ payload }) {
  try {
    yield call(deleteScreamFromScream, payload);
    yield put(deleteScreamSuccess(payload));
    yield put(clearErrors());
  } catch (error) {
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    console.log(jsObjError);
  }
}

// post a scream
export function* onPostScreamStart() {
  yield takeLatest(DATA.POST_SCREAM_START, postScream);
}

export function* postScream({ payload }) {
  try {
    yield put(setLoadingUi());
    const scream = yield call(postScreamToscream, payload);
    yield put(postScreamSucess(scream));
    yield put(clearErrors());
    yield put(resetLoadingData());
  } catch (error) {
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    yield put(resetLoadingData());
    console.log(jsObjError);
  }
}

// get a single scream
export function* onGetScreamStart() {
  yield takeLatest(DATA.GET_SCREAM_START, getScream);
}

export function* getScream({ payload }) {
  try {
    yield put(setLoadingUi());
    const scream = yield call(getScreamFromScream, payload);
    yield put(getScreamSuccess(scream));
    yield put(clearErrors());
  } catch (error) {
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    console.log(jsObjError);
  }
}

// post comment in a scream
export function* onPostCommentStart() {
  yield takeLatest(DATA.POST_COMMENT_START, postComment);
}

export function* postComment({ payload }) {
  const { comment, screamId } = payload;
  try {
    const newComment = yield call(postCommentToScream, comment, screamId);
    yield put(postCommentSuccess(newComment));
    yield put(clearErrors());
  } catch (error) {
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    console.log(jsObjError);
  }
}

// get an user
export function* onGetUserStart() {
  yield takeLatest(DATA.GET_USER_START, getUser);
}

export function* getUser({ payload }) {
  try {
    yield put(setLoadingData());
    const userData = yield call(getUserFromUser, payload);
    const { user, screams } = userData;
    yield put(setScreamsSuccess(screams));
    yield put(getUserSuccess(user));
    yield put(clearErrors());
    yield put(resetLoadingData());
  } catch (error) {
    // yield put(setScreamsSuccess([]));
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    yield put(resetLoadingData());
    console.log(jsObjError);
  }
}

// root saga creator for data with all the tiggering generation functions of the saga
export function* dataSagas() {
  yield all([
    call(onSetScreamsStart),
    call(onLikeScreamStart),
    call(onUnlikeScreamStart),
    call(onDeleteScreamStart),
    call(onPostScreamStart),
    call(onGetScreamStart),
    call(onPostCommentStart),
    call(onGetUserStart)
  ]);
}
