import { create } from "apisauce";
import { SignInResponseData, SignUpResponseData } from "../../redux/@types";

const API_KEY = "3311991d8cmsh5861f68ec085610p1f8720jsn72424a18c60c";

const API = create({
  baseURL: "https://moviesdatabase.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
});

const getMovies = (page: number, startYear: number, endYear: number) => {
  return API.get("/titles", { info: "base_info", page, startYear, endYear });
};

const signUpUser = (data: SignUpResponseData) => {
  return API.post("/auth/register", data);
};

const signInUser = (data: SignInResponseData) => {
  return API.post("/auth/login", data);
};

const getSingleMovieData = (id: string) => {
  return API.get(`/titles/${id}`, { info: "base_info" });
};

const getSearchMovies = (title: string, exact: boolean) => {
  const queryParams = exact ? { exact: true } : {};
  return API.get(`/titles/search/title/${title}`, {
    params: queryParams,
    info: "base_info",
  });
};

const getRelatedListMovie = () => {
  return API.get(`/titles/random`, {
    list: "top_rated_series_250",
    info: "base_info",
    limit: 10,
  });
};

const getTrendsMovie = () => {
  return API.get(`/titles`, {
    list: "top_rated_series_250",
    info: "base_info",
  });
};

export default {
  getMovies,
  signUpUser,
  signInUser,
  getSingleMovieData,
  getRelatedListMovie,
  getSearchMovies,
  getTrendsMovie,
};
