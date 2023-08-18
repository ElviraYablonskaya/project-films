import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MoviesListType, MoviesType } from "../../@types";
import { RootState } from "../store";
import { RatingDataType, SingleMovieData } from "../@types";

type InitialState = {
  moviesList: MoviesListType;
  singleMovie: SingleMovieData | null;
  isLoaderSingleMovie: boolean;
  isLoaderAllMowies: boolean;
  relatedMovieList: MoviesListType;
  isLoaderRelatedMovies: boolean;
  ratingList: RatingDataType;
  savedPosts: MoviesListType;
  searchedPosts: MoviesListType;
  isSearchingLoader: boolean;
};

const initialState: InitialState = {
  moviesList: [],
  singleMovie: null,
  isLoaderSingleMovie: false,
  isLoaderAllMowies: false,
  relatedMovieList: [],
  isLoaderRelatedMovies: false,
  ratingList: [],
  savedPosts: [],
  searchedPosts: [],
  isSearchingLoader: false,
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
    getRelatedMovieList: (_, __: PayloadAction<string>) => {},
    setRelatedMovieList: (state, action: PayloadAction<MoviesListType>) => {
      state.relatedMovieList = action.payload;
    },
    setLoaderRelatedMovies: (state, action) => {
      state.isLoaderRelatedMovies = action.payload;
    },
    getRatingList: (_, __: PayloadAction<string>) => {},
    setRatingList: (state, action: PayloadAction<RatingDataType>) => {
      state.ratingList = action.payload;
    },
    setSaveStatus: (state, action: PayloadAction<{ card: MoviesType }>) => {
      const { card } = action.payload;
      const savedIndex = state.savedPosts.findIndex(
        (item) => item.id === card.id
      );
      if (savedIndex === -1) {
        state.savedPosts = [...state.savedPosts, card];
      } else {
        state.savedPosts = state.savedPosts.filter(
          (item) => item.id !== card.id
        );
      }
    },

    getSearchedPosts: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.searchedPosts = state.moviesList.filter((movie) =>
        movie.originalTitleText.text.toLowerCase().includes(searchTerm)
      );
    },

    setSearchedPosts: (state, action: PayloadAction<MoviesListType>) => {
      state.searchedPosts = action.payload;
    },
    setLoaderSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearchingLoader = action.payload;
    },
    clearSearchedPosts: (state) => {
      state.searchedPosts = [];
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
  getRelatedMovieList,
  setRelatedMovieList,
  setLoaderRelatedMovies,
  getRatingList,
  setRatingList,
  setSaveStatus,
  setSearchedPosts,
  clearSearchedPosts,
  getSearchedPosts,
  setLoaderSearching
} = movieSlice.actions;

export const MovieSelectors = {
  getAllMovies: (state: RootState) => state.movieReducer.moviesList,
  getSingleMovie: (state: RootState) => state.movieReducer.singleMovie,
  getLoaderSingleMovie: (state: RootState) =>
    state.movieReducer.isLoaderSingleMovie,
  getLoaderAllMovies: (state: RootState) =>
    state.movieReducer.isLoaderAllMowies,
  getRelatedMovieList: (state: RootState) =>
    state.movieReducer.relatedMovieList,
  getLoaderRelatedMovies: (state: RootState) =>
    state.movieReducer.isLoaderRelatedMovies,
  getRatingList: (state: RootState) => state.movieReducer.ratingList,
  getSavePosts: (state: RootState) => state.movieReducer.savedPosts,
  getSearchedPosts: (state: RootState) => state.movieReducer.searchedPosts,
  getSearchingLoader: (state: RootState) => state.movieReducer.isSearchingLoader,
};

export default movieSlice.reducer;
