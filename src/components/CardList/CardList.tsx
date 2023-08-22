import { useEffect, useState } from "react";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { MovieSelectors, getAllMovies } from "../../redux/reducers/movieSlice";
import styles from "./CardList.module.scss";
import Loader from "../Loader";
import Button from "../Button";
import { ButtonTypes } from "../../@types";

const CardList = () => {
  const dispatch = useDispatch();

  const movies = useSelector(MovieSelectors.getAllMovies);
  const isLoaderAllMovies = useSelector(MovieSelectors.getLoaderAllMovies);

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getAllMovies(currentPage));
  }, []);

  const handleLoadMore = () => {
    dispatch(getAllMovies({ page: currentPage + 1 } as any));
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return isLoaderAllMovies ? (
    <Loader />
  ) : (
    <div className={styles.cardContainer}>
      {movies.map((movie) => (
        <Card card={movie} key={movie.id} saved={false} />
      ))}
      <Button
        type={ButtonTypes.Secondary}
        title={"Show more"}
        onClick={handleLoadMore}
        className={styles.buttonShow}
      />
    </div>
  );
};

export default CardList;
