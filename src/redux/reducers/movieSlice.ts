import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MoviesListType } from "../../@types";
import { RootState } from "../store";
import { SingleMovieData } from "../@types";

type InitialState = {
  moviesList: MoviesListType;
  singleMovie: SingleMovieData | null;
};

const initialState: InitialState = {
  moviesList: [],
  singleMovie: null,
};

const movieSlice = createSlice({
  name: "movieReducer",
  initialState,
  reducers: {
    getAllMovies: (_, __: PayloadAction<string>) => {},
    setAllMovies: (state, action: PayloadAction<MoviesListType>) => {
      state.moviesList = action.payload;
    },
    getSingleMovie: (_, __: PayloadAction<string>) => {},
    setSingleMovie: (state, action: PayloadAction<SingleMovieData | null>) => {
      state.singleMovie = action.payload;
    },
  },
});

export const { getAllMovies, setAllMovies, getSingleMovie, setSingleMovie } =
  movieSlice.actions;

export const MovieSelectors = {
  getAllMovies: (state: RootState) => state.movieReducer.moviesList,
  getSingleMovie:(state:RootState) => state.movieReducer.singleMovie
};

export default movieSlice.reducer;
