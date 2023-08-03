import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import SingleMovie from "./SingleMovie/SingleMovie";

export enum RoutesList {
  Home = "/",
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  SingleMovie = "/titles/:id",
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<Home />} />
        <Route path={RoutesList.SignIn} element={<SignIn />} />
        <Route path={RoutesList.SignUp} element={<SignUp />} />
        <Route path={RoutesList.SingleMovie} element={<SingleMovie />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
