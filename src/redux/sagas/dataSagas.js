import { takeLatest, put, call, all } from "redux-saga/effects";

import { DATA } from "../types/dataTypes";
import {
  setLoadingData,
  resetLoadingData,
  setScreamsSuccess,
  likeScreamSuccess,
  unlikeScreamSuccess
} from "../actions/dataActions";
import { setErrors, clearErrors, setLoadingUi } from "../actions/uiActions";
import { getScreamsFromScreams } from "../helpers/dataHelpers";

export function* onSetScreamsStart() {
  yield takeLatest(DATA.SET_SCREAMS_START, setScreams);
}

export function* setScreams() {
  try {
    yield put(setLoadingData());
    const screams = yield call(getScreamsFromScreams);
    yield put(setScreamsSuccess(screams));
    yield put(clearErrors());
  } catch (error) {
    const jsObjError = JSON.parse(error.message);
    yield put(setErrors(jsObjError));
    yield put(resetLoadingData());
    console.log(jsObjError);
  }
}

// root saga creator for data with all the tiggering generation functions of the saga
export function* dataSagas() {
  yield all([call(onSetScreamsStart)]);
}
