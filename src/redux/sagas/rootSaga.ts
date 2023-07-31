import { all } from "redux-saga/effects";
import moviesSagaWatcher from "./movieSaga";
import authSagaWatcher from "./authSaga";

export default function* rootSaga() {
  yield all([moviesSagaWatcher(), authSagaWatcher()]);
}
