import { create } from "apisauce";

const API = create({
  baseURL: "https://unelmamovie.com/api/v1",
});

const getMovies = () => {
  return API.get("/titles");
};

export default {
  getMovies,
};