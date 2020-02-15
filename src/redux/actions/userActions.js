import { USER } from "../types/userTypes";

export const setAuthenticated = userData => ({
  type: USER.SET_AUTHENTICATED,
  payload: userData
});

export const setUnauthenticated = () => ({
  type: USER.SET_UNAUTHENTICATED
});

export const signupStart = signupData => ({
  type: USER.SIGNUP_START,
  payload: signupData
});

export const loginWithEmailAndPasswordStart = loginData => ({
  type: USER.LOGIN_WITH_EMAIL_AND_PASSWORD_START,
  payload: loginData
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

export const uploadUserImageStart = formData => ({
  type: USER.UPLOAD_USER_IMAGE_START,
  payload: formData
});
