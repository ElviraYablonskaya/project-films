import { ApiResponse } from "apisauce";
import { all, takeLatest, call, put } from "redux-saga/effects";
import API from "../../utils/api";
import {
  getAllMovies,
  getSingleMovie,
  setAllMovies,
  setSingleMovie,
} from "../reducers/movieSlice";
import { MoviesListType } from "../../@types";
import { PayloadAction } from "@reduxjs/toolkit";
import { SingleMovieResponseData } from "../@types";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";

function* getMoviesWorker(action: PayloadAction<string>) {
  const accessToken = action.payload;
  const response: ApiResponse<MoviesListType> = yield call(
    API.getMovies,
    accessToken
  );
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

function* getSingleMovieWorker(action: PayloadAction<string>) {
  const id = parseInt(action.payload);
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const response: ApiResponse<SingleMovieResponseData> = yield call(
    API.getSingleMovieData,
    accessToken,
    id
  );
  if (response.ok && response.data) {
    yield put(setSingleMovie(response.data.title));
  } else {
    console.log("Single Movie error", response.problem);
  }
}

export default function* moviesSagaWatcher() {
  yield all([
    takeLatest(getAllMovies, getMoviesWorker),
    takeLatest(getSingleMovie, getSingleMovieWorker),
  ]);
}
