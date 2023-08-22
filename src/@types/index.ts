import { ReactElement } from "react";

export enum ButtonTypes {
  Primary = "primary",
  Secondary = "secondary",
  Error = "error",
}

export type MoviesType = {
  tconst?: string;
  genres: {
    genres: {
      text: string;
    };
  };
  ratingsSummary: {
    aggregateRating: number;
  };
  saved?: boolean;
  page?: number;
  id: string;
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
  releaseDate: number;
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

export type MoviesListType = MoviesType[];

export enum TabsTypes {
  Home = "home",
  Trends = "trends",
  Favorites = "favorites",
  Settings = "settings",
}

export type Tab = {
  key: TabsTypes;
  title: string;
  disabled: boolean;
  icon?: ReactElement;
};
export type TabsListType = Tab[];

export type Children = ReactElement | ReactElement[];

type GroupButton = {
  title: ReactElement | string;
  link?: string;
  onClick?: () => void;
  disabled: boolean;
  active?: boolean;
};

export type ButtonsGroupList = GroupButton[];

export enum Theme {
  Light = "light",
  Dark = "dark",
}
