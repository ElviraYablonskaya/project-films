import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MoviesListType } from "../../@types";
import { RootState } from "../store";
import { SingleMovieData } from "../@types";

type InitialState = {
  moviesList: MoviesListType;
  singleMovie: SingleMovieData | null;
  isLoaderSingleMovie: boolean;
  isLoaderAllMowies: boolean;
};

const initialState: InitialState = {
  moviesList: [],
  singleMovie: null,
  isLoaderSingleMovie: false,
  isLoaderAllMowies: false,
};

const movieSlice = createSlice({
  name: "movieReducer",
  initialState,
  reducers: {
    getAllMovies: (_, __: PayloadAction<string>) => {},
    setAllMovies: (state, action: PayloadAction<MoviesListType>) => {
      state.moviesList = action.payload;
    },
    setLoaderAllMovies: (state, action) => {
      state.isLoaderAllMowies = action.payload;
    },
    getSingleMovie: (_, __: PayloadAction<string>) => {},
    setSingleMovie: (state, action: PayloadAction<SingleMovieData | null>) => {
      state.singleMovie = action.payload;
    },
    setLoaderSingleMovie: (state, action: PayloadAction<boolean>) => {
      state.isLoaderSingleMovie = action.payload;
    },
  },
});

export const {
  getAllMovies,
  setAllMovies,
  getSingleMovie,
  setSingleMovie,
  setLoaderSingleMovie,
  setLoaderAllMovies,
} = movieSlice.actions;

export const MovieSelectors = {
  getAllMovies: (state: RootState) => state.movieReducer.moviesList,
  getSingleMovie: (state: RootState) => state.movieReducer.singleMovie,
  getLoaderSingleMovie: (state: RootState) =>
    state.movieReducer.isLoaderSingleMovie,
  getLoaderAllMovies: (state: RootState) =>
    state.movieReducer.isLoaderAllMowies,
};

export default movieSlice.reducer;
