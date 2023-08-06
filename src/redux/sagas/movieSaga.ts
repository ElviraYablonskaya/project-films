import { ApiResponse } from "apisauce";
import { all, takeLatest, call, put } from "redux-saga/effects";
import API from "../../utils/api";
import {
  getAllMovies,
  getRelatedMovieList,
  getSingleMovie,
  setAllMovies,
  setLoaderAllMovies,
  setLoaderRelatedMovies,
  setLoaderSingleMovie,
  setRelatedMovieList,
  setSingleMovie,
} from "../reducers/movieSlice";
import { MoviesListType } from "../../@types";
import { PayloadAction } from "@reduxjs/toolkit";
import { RelatedMovieListResponse, SingleMovieResponseData } from "../@types";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";

function* getMoviesWorker(action: PayloadAction<string>) {
  yield put(setLoaderAllMovies(true));
  const accessToken = action.payload;
  const response: ApiResponse<MoviesListType> = yield call(
    API.getMovies,
    accessToken
  );
  if (response.ok && response.data) {
    yield put(setAllMovies(response.data.pagination.data));
    yield put(setLoaderAllMovies(false));
  } else {
    console.log("List Movie error", response.problem);
  }
}

function* getSingleMovieWorker(action: PayloadAction<string>) {
  yield put(setLoaderSingleMovie(true));
  const id = parseInt(action.payload);
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const response: ApiResponse<SingleMovieResponseData> = yield call(
    API.getSingleMovieData,
    accessToken,
    id
  );
  if (response.ok && response.data) {
    yield put(setSingleMovie(response.data.title));
    yield put(setLoaderSingleMovie(false));
  } else {
    console.log("Single Movie error", response.problem);
  }
}

function* getRelatedListMovieWorker(action: PayloadAction<string>) {
  yield put(setLoaderRelatedMovies(true));
  const id = action.payload;
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const response: ApiResponse<RelatedMovieListResponse> = yield call(
    API.getRelatedListMovie,
    accessToken,
    id
  );
  if (response.ok && response.data) {
    yield put(setRelatedMovieList(response.data.titles));
    yield put(setLoaderRelatedMovies(false));
  } else {
    console.log("Related Movie error", response.problem);
  }
}

export default function* moviesSagaWatcher() {
  yield all([
    takeLatest(getAllMovies, getMoviesWorker),
    takeLatest(getSingleMovie, getSingleMovieWorker),
    takeLatest(getRelatedMovieList, getRelatedListMovieWorker),
  ]);
}
