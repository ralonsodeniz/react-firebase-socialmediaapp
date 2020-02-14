import { takeLatest, put, call, all } from "redux-saga/effects";

// root saga creator for data with all the tiggering generation functions of the saga
export function* dataSagas() {
  yield all([
    // call to ever triggering generation
  ]);
}
