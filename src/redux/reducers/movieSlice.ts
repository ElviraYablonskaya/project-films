import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MoviesListType } from "../../@types";
import { RootState } from "../store";

type InitialState = {
  moviesList: MoviesListType;
};

const initialState: InitialState = {
  moviesList: [],
};

const movieSlice = createSlice({
  name: "movieReducer",
  initialState,
  reducers: {
    getAllMovies(_, __: PayloadAction<undefined>) {},
    setAllMovies(state, action: PayloadAction<MoviesListType>) {
      state.moviesList = action.payload;
    },
  },
});

export const { getAllMovies, setAllMovies } = movieSlice.actions;

export const MovieSelectors = {
  getAllMovies: (state: RootState) => state.movieReducer.moviesList,
};

export default movieSlice.reducer;
