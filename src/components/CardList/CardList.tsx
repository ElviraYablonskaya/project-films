import { FC, useEffect } from "react";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { MovieSelectors, getAllMovies } from "../../redux/reducers/movieSlice";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import styles from "./CardList.module.scss"

const CardList: FC = () => {
  const dispatch = useDispatch()
  const movies = useSelector(MovieSelectors.getAllMovies)
  console.log(movies)

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    if(accessToken) {
    dispatch(getAllMovies(accessToken))
    } else {
      console.error("Token not found")
    }
  },[dispatch])

  return (
    <div className={styles.cardContainer}>
      {movies.map((movie) => {
        return <Card card={movie} key={movie.id} />;
      })}
    </div>
  );
};

export default CardList;
