import { all, call } from "redux-saga/effects";
// import sagas
import { dataSagas } from "./sagas/dataSagas";
import { userSagas } from "./sagas/userSagas";
import { uiSagas } from "./sagas/uiSagas";

export default function* rootSaga() {
  yield all([
    // call to sagas
    call(dataSagas),
    call(userSagas),
    call(uiSagas)
  ]);
}
