import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  MovieSelectors,
  getRelatedMovieList,
  getSingleMovie,
  setSaveStatus,
} from "../../redux/reducers/movieSlice";
import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import styles from "./SingleMovie.module.scss";
import TabsList from "../../components/TabsList/TabsList";
import { TabsTypes, Theme } from "../../@types";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import {
  AiFillFire,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import {
  formatDate,
  formatRuntime,
  getRatingColor,
} from "../../utils/functions";
import { FaImdb } from "react-icons/fa";
import Loader from "../../components/Loader";
import SelectedImageModal from "./SelectedImageModal/SelectedImageModal";
import {
  setSelectedImage,
  setSelectedImageModalOpened,
} from "../../redux/reducers/imageSlice";
import ButtonsGroup from "../../components/ButtonsGroup/ButtonsGroup";
import { useThemeContext } from "../../context/Theme";
import classNames from "classnames";
import Card from "../../components/Card";

const SingleMovie = () => {
  const [activeTab, setActiveTab] = useState<TabsTypes | null>(null);
  const { themeValue } = useThemeContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const moviesPerPage = 5;

  const handleNextClick = () => {
    if (currentIndex + moviesPerPage < relatedMovieList.length) {
      setCurrentIndex((prevIndex) => prevIndex + moviesPerPage);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - moviesPerPage);
    }
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tabsList = useMemo(
    () => [
      {
        key: TabsTypes.Home,
        title: "Home",
        icon: <IoMdHome className={styles.icon} />,
        disabled: false,
      },
      {
        key: TabsTypes.Trends,
        title: "Trends",
        icon: <AiFillFire className={styles.icon} />,
        disabled: false,
      },
      {
        key: TabsTypes.Favorites,
        title: "Favorites",
        icon: <BsFillBookmarkFill className={styles.icon} />,
        disabled: false,
      },
      {
        key: TabsTypes.Settings,
        title: "Settings",
        icon: <IoMdSettings className={styles.icon} />,
        disabled: false,
      },
    ],
    []
  );

  const onTabClick = (tab: TabsTypes) => () => {
    switch (tab) {
      case TabsTypes.Home:
        navigate(`/`);
        break;
      case TabsTypes.Trends:
        navigate(`/trends`);
        break;
      case TabsTypes.Favorites:
        navigate(`/favorites`);
        break;
      case TabsTypes.Settings:
        navigate(`/settings`);
        break;
      default:
        setActiveTab(tab);
        break;
    }
  };
  const singleMovie = useSelector(MovieSelectors.getSingleMovie);
  const isLoaderSingleMovie = useSelector(MovieSelectors.getLoaderSingleMovie);
  const relatedMovieList = useSelector(MovieSelectors.getRelatedMovieList);

  const isLoaderRelatedMovies = useSelector(
    MovieSelectors.getLoaderRelatedMovies
  );

  const savedPosts = useSelector(MovieSelectors.getSavePosts);

  const isMovieSaved = savedPosts.some(
    (post) => post.id === String(singleMovie?.id)
  );

  useEffect(() => {
    if (id) {
      dispatch(getSingleMovie(id));
      dispatch(getRelatedMovieList("top_rated_series_250"));
    }
  }, [dispatch, id]);

  const onPosterClick = () => {
    dispatch(setSelectedImageModalOpened(true));
    dispatch(setSelectedImage(singleMovie?.primaryImage.url || ""));
  };

  const handleSave = () => {
    if (singleMovie) {
      dispatch(setSaveStatus({ card: singleMovie }));
    }
  };

  const handleShare = () => {
    console.log("Поделиться");
  };

  const buttonsGroup = [
    {
      title: "save",
      onClick: handleSave,
      disabled: false,
      active: isMovieSaved,
    },
    {
      title: "share",
      onClick: handleShare,
      disabled: false,
    },
  ];

  return (
    <div
      className={classNames(styles.lightThemeContainer, {
        [styles.lightContainer]: themeValue === Theme.Light,
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <Header />
      <div className={styles.tabsCard}>
        <TabsList
          tabsList={tabsList}
          activeTab={activeTab!}
          onTabClick={onTabClick}
        />
        <div>
          {isLoaderSingleMovie ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : (
            <div className={styles.singleMovieCard}>
              <SelectedImageModal />
              <div>
                {singleMovie?.primaryImage ? (
                  <div className={styles.poster}>
                    <img
                      src={singleMovie?.primaryImage.url}
                      alt={singleMovie?.originalTitleText.text}
                      onClick={onPosterClick}
                    />
                  </div>
                ) : (
                  <div
                    className={classNames(styles.noPoster, {
                      [styles.lightNoPoster]: themeValue === Theme.Light,
                    })}
                  >
                    NO POSTER
                  </div>
                )}
                <ButtonsGroup buttonsGroup={buttonsGroup} />
              </div>
              <div>
                {singleMovie?.genres && (
                  <div className={styles.genres}>
                    {singleMovie?.genres.genres.map(
                      (item: { text: string; id: string }) => (
                        <div key={item.id}>{item.text}</div>
                      )
                    )}
                  </div>
                )}
                <div
                  className={classNames(styles.name, {
                    [styles.lightName]: themeValue === Theme.Light,
                  })}
                >
                  <div>{singleMovie?.originalTitleText.text}</div>
                </div>
                <div className={styles.ratingRuntime}>
                  {singleMovie?.ratingsSummary?.aggregateRating && (
                    <div
                      style={{
                        backgroundColor: getRatingColor(
                          singleMovie?.ratingsSummary.aggregateRating
                        ),
                      }}
                      className={styles.rating}
                    >
                      {singleMovie?.ratingsSummary.aggregateRating}
                    </div>
                  )}
                  {singleMovie?.ratingsSummary?.aggregateRating && (
                    <div className={styles.ratingImdb}>
                      <FaImdb size={23} />
                      {singleMovie?.ratingsSummary?.aggregateRating}
                    </div>
                  )}
                  {singleMovie?.runtime && (
                    <div className={styles.runtime}>
                      {formatRuntime(singleMovie?.runtime.seconds || 0)}
                    </div>
                  )}
                </div>
                <div
                  className={classNames(styles.description, {
                    [styles.lightDescription]: themeValue === Theme.Light,
                  })}
                >
                  {singleMovie?.plot && (
                    <p>{singleMovie?.plot.plotText.plainText}</p>
                  )}
                </div>
                <div className={styles.movieTotal}>
                  {singleMovie?.releaseYear && (
                    <div>
                      <span className={styles.year}>Year</span>
                      <span
                        className={classNames(styles.releaseYear, {
                          [styles.lightReleaseYear]: themeValue === Theme.Light,
                        })}
                      >
                        {singleMovie?.releaseYear.year}
                      </span>
                    </div>
                  )}
                  {singleMovie?.releaseDate && (
                    <div>
                      <span className={styles.released}>Released</span>
                      <span
                        className={classNames(styles.releaseDate, {
                          [styles.lightReleaseDate]: themeValue === Theme.Light,
                        })}
                      >
                        {formatDate(singleMovie?.releaseDate)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {!isLoaderRelatedMovies && relatedMovieList.length > 0 && (
            <div className={styles.relatedContainer}>
              <h2
                className={classNames(styles.recommendations, {
                  [styles.lightRecommendations]: themeValue === Theme.Light,
                })}
              >
                Recommendations
              </h2>
              <div className={styles.arrowButtons}>
                <button
                  type="button"
                  onClick={handlePrevClick}
                  disabled={currentIndex === 0}
                  className={classNames(styles.arrowLeft, {
                    [styles.lightArrowLeft]: themeValue === Theme.Light,
                  })}
                >
                  <AiOutlineArrowLeft size={22} />
                </button>
                <button
                  type="button"
                  className={classNames(styles.arrowRight, {
                    [styles.lightArrowRight]: themeValue === Theme.Light,
                  })}
                  onClick={handleNextClick}
                  disabled={
                    currentIndex + moviesPerPage >= relatedMovieList.length
                  }
                >
                  <AiOutlineArrowRight size={22} />
                </button>
              </div>
              <div className={styles.relatedCardContainer}>
                {relatedMovieList
                  .slice(currentIndex, currentIndex + moviesPerPage)
                  .map((movie) => {
                    return (
                      <Card
                        card={movie}
                        key={movie.id}
                        className={styles.relatedCard}
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
