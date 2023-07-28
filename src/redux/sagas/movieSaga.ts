import { ApiResponse } from "apisauce";
import { all, takeLatest, call, put } from "redux-saga/effects";
import API from "../../utils/api";
import { getAllMovies, setAllMovies } from "../reducers/movieSlice";
import { MoviesListType } from "../../@types";

function* getMoviesWorker() {
  const response: ApiResponse<MoviesListType> = yield call(API.getMovies);
  if (response.ok) {
    const movies = response.data;
    if (movies) {
      // Проверяем, что movies не является undefined
      yield put(setAllMovies(movies));
    } else {
      console.error("Get Movies List error: movies is undefined");
    }
  } else {
    console.error("Get Movies List error", response.problem);
  }
}

export default function* moviesSagaWatcher() {
  yield all([takeLatest(getAllMovies, getMoviesWorker)]);
}
