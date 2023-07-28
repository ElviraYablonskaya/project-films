import { FC, useEffect } from "react";
import { MoviesListType } from "../../@types";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { MovieSelectors, getAllMovies } from "../../redux/reducers/movieSlice";

type MoviesListProps = {
  moviesList: MoviesListType;
};

// const moviesList = [
//   {
//     id: 1,
//     rating: "7.8",
//     name: "Iron Man",
//     genre:"Adnenture - Action - Fantasy",
//     poster: "https://images.unsplash.com/photo-1636840438199-9125cd03c3b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
//   }
// ]

const CardList: FC<MoviesListProps> = () => {
  const dispatch = useDispatch()
  const movies = useSelector(MovieSelectors.getAllMovies)

  useEffect(() => {
    dispatch(getAllMovies())
  },[dispatch])

  return (
    <div>
      {movies.map((movie) => {
        return <Card card={movie} key={movie.id} />;
      })}
    </div>
  );
};

export default CardList;
