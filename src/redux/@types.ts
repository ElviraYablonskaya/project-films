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
  genres: {
    genres: {
      text: string;
    };
  };
  runtime: {
    seconds: number;
  };
  plot: {
    plotText: {
      plainText: string;
    };
  };
  ratingsSummary?: {
    aggregateRating: number;
  };
  originalTitleText: {
    text: string;
    __typename: string;
  };
  primaryImage: {
    id: number;
    width: number;
    height: number;
    url: string;
    __typename: string;
  };
  caption: {
    plainText: string;
    __typename: string;
  };
  releaseDate: {
    day: number;
    month: number;
    year: number;
  };
  releaseYear: {
    year: number;
    endYear: number;
    __typename: string;
  };
  titleType: {
    text: string;
    id: string;
    isSeries: boolean;
    isEpisode: boolean;
    __typename: string;
  };
};

export type SingleMovieResponseData = {
  title: SingleMovieData;
  status: string;
};

export type RelatedMovieListResponse = {
  titles: MoviesListType;
  status: string;
};