import { takeLatest, put, call, all } from "redux-saga/effects";

// root saga creator for ui with all the tiggering generation functions of the saga
export function* uiSagas() {
  yield all([
    // call to ever triggering generation
  ]);
}
