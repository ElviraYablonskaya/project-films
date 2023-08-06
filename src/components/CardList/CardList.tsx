import { FC, useEffect } from "react";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { MovieSelectors, getAllMovies } from "../../redux/reducers/movieSlice";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import styles from "./CardList.module.scss";
import Loader from "../Loader";

interface CardListProps {
  isTrendingPage: boolean;
}

const CardList: FC<CardListProps> = ({ isTrendingPage }) => {
  const dispatch = useDispatch();
  const movies = useSelector(MovieSelectors.getAllMovies);

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      dispatch(getAllMovies(accessToken));
    } else {
      console.error("Token not found");
    }
  }, []);

  const isLoaderAllMovies = useSelector(MovieSelectors.getLoaderAllMovies);

  return isLoaderAllMovies ? (
    <Loader />
  ) : (
    <div className={styles.cardContainer}>
      {movies.map((movie) => {
        return (
          <Card card={movie} key={movie.id} isTrendingPage={isTrendingPage} />
        );
      })}
    </div>
  );
};

export default CardList;
