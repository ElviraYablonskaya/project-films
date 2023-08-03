import { create } from "apisauce";
import { SignInResponseData, SignUpResponseData } from "../../redux/@types";

const API = create({
  baseURL: "https://unelmamovie.com/api/v1",
});

const getMovies = (token: string) => {
  return API.get(
    "/titles",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const signUpUser = (data: SignUpResponseData) => {
  return API.post("/auth/register", data);
};

const signInUser = (data: SignInResponseData) => {
  return API.post("/auth/login", data);
};

const getSingleMovieData = (token: string, id: string) => {
  return API.get(
    `/titles/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default {
  getMovies,
  signUpUser,
  signInUser,
  getSingleMovieData,
};
