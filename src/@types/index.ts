export enum ButtonTypes {
  Primary = "primary",
  Secondary = "secondary",
  Error = "error",
}

export type MoviesType = {
  id: number;
  name: string;
  release_date?: string;
  year?: string;
  tagline?: string;
  genre: string;
  poster: string;
  backdrop?: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
  popularity?: number;
  tmdb_id?: number;
  imdb_id?: string;
  is_series?: boolean;
  adult?: boolean;
  season_count?: number;
  episode_count?: number;
  series_ended?: boolean;
  language?: string;
  original_title?: string;
  certification?: string;
  rating: string;
  vote_count?: number;
};

export type MoviesListType = MoviesType[];