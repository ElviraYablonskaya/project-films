import { ApiResponse } from "apisauce";
import { all, takeLatest, call, put } from "redux-saga/effects";
import API from "../../utils/api";
import { getAllMovies, setAllMovies } from "../reducers/movieSlice";
import { MoviesListType } from "../../@types";
import { PayloadAction } from "@reduxjs/toolkit";

function* getMoviesWorker(action:PayloadAction<string>) {
  const accessToken = action.payload
  const response: ApiResponse<MoviesListType> = yield call(API.getMovies, accessToken);
  if (response.ok) {
    const movies = response.data.pagination.data;
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
