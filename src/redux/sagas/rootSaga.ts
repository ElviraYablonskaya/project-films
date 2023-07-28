import { all } from "redux-saga/effects";
import moviesSagaWatcher from "./movieSaga";

export default function* rootSaga() {
  yield all([moviesSagaWatcher()]);
}
