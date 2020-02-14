import { USER } from "../types/userTypes";

export const setAuthenticated = () => ({
  type: USER.SET_AUTHENTICATED
});

export const setUnauthenticated = () => ({
  type: USER.SET_UNAUTHENTICATED
});

export const signupStart = signupData => ({
  type: USER.SIGNUP_START,
  payload: signupData
});

export const signupSuccess = newUserData => ({
  type: USER.SIGNUP_SUCCESS,
  payload: newUserData
});

export const loginWithEmailAndPasswordStart = loginData => ({
  type: USER.LOGIN_WITH_EMAIL_AND_PASSWORD_START,
  payload: loginData
});

export const loginSuccess = userData => ({
  type: USER.LOGIN_SUCCESS,
  payload: userData
});

export const logoutStart = () => ({
  type: USER.LOGOUT_START
});

export const setLoadingUser = () => ({
  type: USER.LOADING_USER,
  payload: true
});

export const resetLoadingUser = () => ({
  type: USER.LOADING_USER,
  payload: false
});

export const checkUserStart = () => ({
  type: USER.CHECK_USER_START
});

export const checkUserSuccess = userData => ({
  type: USER.CHECK_USER_SUCCESS,
  payload: userData
});
