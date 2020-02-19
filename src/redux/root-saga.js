import { all, call } from "redux-saga/effects";
// import sagas
import { dataSagas } from "./sagas/dataSagas";
import { userSagas } from "./sagas/userSagas";

export default function* rootSaga() {
  yield all([
    // call to sagas
    call(dataSagas),
    call(userSagas)
  ]);
}
