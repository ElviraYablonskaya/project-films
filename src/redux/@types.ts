import { MoviesListType } from "../@types";

export type PayloadWithDataAndCallback<Data> = {
  data: Data;
  callback: () => void;
};

export type SignUpResponseData = {
  email: string;
  password: string;
  token_name: string;
  password_confirmation: string;
  boostrapData: {
    user: {
      access_token: string;
    };
  };
};

export type SignInResponseData = {
  email: string;
  password: string;
  token_name: string;
  user: {
    access_token: string;
  };
};

export type SignUpUserPayload = PayloadWithDataAndCallback<SignUpResponseData>;

export type SignInUserPayload = PayloadWithDataAndCallback<SignInResponseData>;

export type SingleMovieGenres = {
  id: number;
  type: string;
  name: string;
  display_name: string;
};

export type SingleMovieImage = {
  id: number;
  url: string;
  type: string;
  source: string;
};

export type SingleMovieCredits = {
  id: number;
  name: string;
  poster: string;
  model_type: string;
  pivot: {
    creditable_id: number;
    person_id: number;
    creditable_type: string;
    id: number;
    job: string;
    department: string;
    order: number;
    character: null;
  };
};

export type SingleMovieData = {
  id: number;
  name: string;
  type: string;
  release_date: string;
  year: number;
  description: string;
  genre: null;
  tagline: string;
  poster: string;
  backdrop: string;
  runtime: number;
  trailer: null;
  budget: number;
  revenue: number;
  views: number;
  popularity: number;
  imdb_id: string;
  tmdb_id: number;
  season_count: number;
  fully_synced: boolean;
  allow_update: boolean;
  created_at: string;
  updated_at: string;
  language: string;
  country: null;
  original_title: string;
  affiliate_link: null;
  certification: string;
  episode_count: number;
  series_ended: boolean;
  is_series: boolean;
  show_videos: boolean;
  adult: boolean;
  rating: number;
  model_type: string;
  vote_count: number;
  images: SingleMovieImage[];
  genres: SingleMovieGenres[];
  seasons: [];
  credits: SingleMovieCredits[];
};

export type SingleMovieResponseData = {
  title: SingleMovieData;
  status: string;
};

export type RelatedMovieListResponse = {
  titles: MoviesListType;
  status: string;
};
