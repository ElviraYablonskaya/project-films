import { ApiResponse } from "apisauce";
import { all, takeLatest, call, put } from "redux-saga/effects";
import API from "../../utils/api";
import {
  getAllMovies,
  getRelatedMovieList,
  getSearchedPosts,
  getSingleMovie,
  setAllMovies,
  setLoaderAllMovies,
  setLoaderRelatedMovies,
  setLoaderSearching,
  setLoaderSingleMovie,
  setRelatedMovieList,
  setSearchedPosts,
  setSingleMovie,
} from "../reducers/movieSlice";
import { MoviesListType, MoviesType } from "../../@types";
import { PayloadAction } from "@reduxjs/toolkit";
import { RelatedMovieListResponse } from "../@types";

function* getMoviesWorker(action: PayloadAction<any>) {
  const { page, startYear = 1970, endYear = 2013 } = action.payload;
  yield put(setLoaderAllMovies(true));
  const response: ApiResponse<MoviesListType> = yield call(
    API.getMovies,
    page,
    startYear,
    endYear
  );
  if (response.ok && response.data) {
    yield put(setAllMovies(response.data.results));
    yield put(setLoaderAllMovies(false));
  } else {
    console.log("List Movie error", response.problem);
  }
}

function* getSingleMovieWorker(action: PayloadAction<string>) {
  yield put(setLoaderSingleMovie(true));
  const id = action.payload;
  const response: ApiResponse<MoviesType> = yield call(
    API.getSingleMovieData,
    id
  );
  if (response.ok && response.data) {
    yield put(setSingleMovie(response.data.results));
    yield put(setLoaderSingleMovie(false));
  } else {
    console.log("Single Movie error", response.problem);
  }
}

function* getSearchedPostsWorker(action: PayloadAction<string>) {
  yield put(setLoaderSearching(true));
  const title = action.payload;
  const response: ApiResponse<MoviesListType> = yield call(
    API.getSearchMovies,
    title
  );
  if (response.ok && response.data) {
    yield put(setSearchedPosts(response.data.results));
    yield put(setLoaderSearching(false));
  } else {
    console.log("Search Movie error", response.problem);
  }
}

function* getRelatedListMovieWorker() {
  yield put(setLoaderRelatedMovies(true));
  const response: ApiResponse<RelatedMovieListResponse> = yield call(
    API.getRelatedListMovie
  );
  if (response.ok && response.data) {
    yield put(setRelatedMovieList(response.data.results));
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
    takeLatest(getSearchedPosts, getSearchedPostsWorker),
  ]);
}
