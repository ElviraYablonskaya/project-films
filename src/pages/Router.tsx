import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import SingleMovie from "./SingleMovie/SingleMovie";
import Trends from "./Trends/Trends";

export enum RoutesList {
  Home = "/",
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  SingleMovie = "/titles/:id",
  Trends = "/trends",
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<Home />} />
        <Route path={RoutesList.SignIn} element={<SignIn />} />
        <Route path={RoutesList.SignUp} element={<SignUp />} />
        <Route path={RoutesList.SingleMovie} element={<SingleMovie />} />
        <Route path={RoutesList.Trends} element={<Trends />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
