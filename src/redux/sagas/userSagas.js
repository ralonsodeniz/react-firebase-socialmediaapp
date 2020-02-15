import { takeLatest, put, call, all } from "redux-saga/effects";

import { USER } from "../types/userTypes";

import {
  setUnauthenticated,
  setAuthenticated,
  setLoadingUser,
  resetLoadingUser
} from "../actions/userActions";

import {
  clearErrors,
  setErrors,
  setLoadingUi,
  resetUiInitialLoading,
  setUiInitialLoading
} from "../actions/uiActions";

import {
  postUserDataToLogin,
  postNewUserDataToSignup,
  getDataFromUser,
  userLogout,
  checkStoredToken,
  postFormDataToImage
} from "../helpers/userHelpers";

// user signup
export function* onSignupStart() {
  yield takeLatest(USER.SIGNUP_START, signup);
}

export function* signup({ payload }) {
  try {
    yield put(setLoadingUi());
    yield call(postNewUserDataToSignup, payload);
    yield put(setLoadingUser());
    const newUserData = yield call(getDataFromUser);
    yield put(setAuthenticated(newUserData));
    yield put(clearErrors());
  } catch (error) {
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    yield put(resetLoadingUser());
    console.log(jsObjError);
  }
}

// user login
export function* onloginWithEmailAndPasswordStart() {
  yield takeLatest(
    USER.LOGIN_WITH_EMAIL_AND_PASSWORD_START,
    loginWithEmailAndPassword
  );
}

export function* loginWithEmailAndPassword({ payload }) {
  try {
    yield put(setLoadingUi());
    yield call(postUserDataToLogin, payload);
    yield put(setLoadingUser());
    const userData = yield call(getDataFromUser);
    yield put(setAuthenticated(userData));
    yield put(clearErrors());
  } catch (error) {
    // we transofrme the json string we receive in the error message into the js obj with the errors to set them in the reducer
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    yield put(resetLoadingUser());
    console.log(jsObjError);
  }
}

// user signout
export function* onSignoutStart() {
  yield takeLatest(USER.LOGOUT_START, logout);
}

export function* logout() {
  try {
    yield call(userLogout);
    yield put(setUnauthenticated());
  } catch (error) {
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    console.log(jsObjError);
  }
  localStorage.removeItem("FBIdToken");
}

// check user token on app load
export function* onCheckUserStart() {
  yield takeLatest(USER.CHECK_USER_START, checkUser);
}

export function* checkUser() {
  try {
    yield put(setUiInitialLoading());
    const isTokenValid = yield call(checkStoredToken);
    if (isTokenValid) {
      const userData = yield call(getDataFromUser);
      yield put(setAuthenticated(userData));
      yield put(clearErrors());
    } else {
      yield call(userLogout);
      yield put(setUnauthenticated());
    }
    yield put(resetUiInitialLoading());
  } catch (error) {
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    yield put(resetLoadingUser());
    yield put(resetUiInitialLoading());
    console.log(jsObjError);
  }
}

// upload user image
export function* onUploadUserImageStart() {
  yield takeLatest(USER.UPLOAD_USER_IMAGE_START, uploadUserImage);
}

export function* uploadUserImage({ payload }) {
  try {
    yield call(postFormDataToImage, payload);
    yield put(setLoadingUser());
    const userData = yield call(getDataFromUser);
    yield put(setAuthenticated(userData));
    yield put(clearErrors());
  } catch (error) {
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    yield put(resetLoadingUser());
    console.log(jsObjError);
  }
}

// root saga creator for user with all the tiggering generation functions of the saga
export function* userSagas() {
  yield all([
    call(onloginWithEmailAndPasswordStart),
    call(onSignupStart),
    call(onSignoutStart),
    call(onCheckUserStart),
    call(onUploadUserImageStart)
  ]);
}
