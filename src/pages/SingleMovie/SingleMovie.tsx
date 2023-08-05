import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  MovieSelectors,
  getRelatedMovieList,
  getSingleMovie,
} from "../../redux/reducers/movieSlice";
import { useEffect, useMemo, useState } from "react";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import Header from "../../components/Header";
import styles from "./SingleMovie.module.scss";
import TabsList from "../../components/TabsList/TabsList";
import { TabsTypes } from "../../@types";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import { AiFillFire } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import {
  formatBudget,
  formatDate,
  getRatingColor,
} from "../../utils/functions";
import { FaImdb } from "react-icons/fa";
import { SingleMovieCredits } from "../../redux/@types";
import Loader from "../../components/Loader";
import SelectedImageModal from "./SelectedImageModal/SelectedImageModal";
import {
  setSelectedImage,
  setSelectedImageModalOpened,
} from "../../redux/reducers/imageSlice";
import ButtonsGroup from "../../components/ButtonsGroup/ButtonsGroup";
import Card from "../../components/Card";

const SingleMovie = () => {
  const [activeTab, setActiveTab] = useState<TabsTypes | null>(null);
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
    if (tab === TabsTypes.Home) {
      navigate(`/`);
    } else {
      setActiveTab(tab);
    }
  };

  // const onTabClick = (tab: TabsTypes) => () => {
  //   switch (tab) {
  //     case TabsTypes.Home:
  //       navigate(`/`);
  //       break;
  //     case TabsTypes.Trends:
  //       navigate(`/trends`);
  //       break;
  //     case TabsTypes.Favorites:
  //       navigate(`/favorites`);
  //       break;
  //     case TabsTypes.Settings:
  //       navigate(`/settings`);
  //       break;
  //     default:
  //       setActiveTab(tab);
  //       break;
  //   }
  // };

  const singleMovie = useSelector(MovieSelectors.getSingleMovie);
  const isLoaderSingleMovie = useSelector(MovieSelectors.getLoaderSingleMovie);
  const relatedMovieList = useSelector(MovieSelectors.getRelatedMovieList);
  const isLoaderRelatedMovies = useSelector(
    MovieSelectors.getLoaderRelatedMovies
  );

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken && id) {
      dispatch(getSingleMovie(id));
      dispatch(getRelatedMovieList(id));
    } else {
      console.error("Token not found");
    }
  }, [dispatch, id]);

  const getNames = (department: string) => {
    const data = singleMovie?.credits.filter(
      (item: SingleMovieCredits) => item.pivot.department === department
    );
    return data?.map((item) => item.name) || [];
  };

  const directors = getNames("directing");
  const writers = getNames("writing");
  const actors = getNames("cast");

  const onPosterClick = () => {
    dispatch(setSelectedImageModalOpened(true));
    dispatch(setSelectedImage(singleMovie?.poster || ""));
  };

  const handleSave = () => {
    console.log("Сохранено");
  };

  const handleShare = () => {
    console.log("Поделиться");
  };

  const buttonsGroup = [
    {
      title: "save",
      onClick: handleSave,
      disabled: false,
    },
    {
      title: "share",
      onClick: handleShare,
      disabled: false,
    },
  ];

  return (
    <div>
      <Header />
      <div className={styles.tabsCard}>
        <TabsList
          tabsList={tabsList}
          activeTab={activeTab!}
          onTabClick={onTabClick}
        />
        <div className={styles.contentContainer}>
          {isLoaderSingleMovie ? (
            <Loader />
          ) : (
            <div className={styles.singleMovieCard}>
              <SelectedImageModal />
              <div>
                {singleMovie?.poster && (
                  <div className={styles.poster}>
                    <img
                      src={singleMovie?.poster}
                      alt={singleMovie?.name}
                      onClick={onPosterClick}
                    />
                  </div>
                )}
                <ButtonsGroup buttonsGroup={buttonsGroup} />
              </div>
              <div>
                <div className={styles.genres}>
                  {singleMovie?.genres.map((item) => {
                    return <div key={item.id}>{item.display_name}</div>;
                  })}
                </div>
                <div className={styles.name}>
                  <div>{singleMovie?.name}</div>
                </div>
                <div className={styles.ratingRuntime}>
                  {singleMovie?.rating && (
                    <div
                      style={{
                        backgroundColor: getRatingColor(singleMovie?.rating),
                      }}
                      className={styles.rating}
                    >
                      {singleMovie?.rating}
                    </div>
                  )}
                  {singleMovie?.rating && (
                    <div className={styles.ratingImdb}>
                      <FaImdb size={23} />
                      <span>
                        {singleMovie?.rating ? singleMovie.rating : 0}
                      </span>
                    </div>
                  )}
                  {singleMovie?.runtime && (
                    <div className={styles.runtime}>
                      {singleMovie?.runtime} min
                    </div>
                  )}
                </div>
                <p>{singleMovie?.description}</p>
                <div className={styles.movieTotal}>
                  {singleMovie?.year && (
                    <div>
                      <span className={styles.year}>Year</span>
                      {singleMovie?.year}
                    </div>
                  )}
                  {singleMovie?.release_date && (
                    <div>
                      <span className={styles.released}>Released</span>
                      {formatDate(singleMovie?.release_date)}
                    </div>
                  )}
                  {singleMovie?.budget && (
                    <div>
                      <span className={styles.budget}>BoxOffice</span>
                      {formatBudget(singleMovie?.budget)}
                    </div>
                  )}
                  {actors && actors.length > 0 && (
                    <div className={styles.actorsName}>
                      <span className={styles.actors}>Actors</span>
                      <span>{actors.join(", ")}</span>
                    </div>
                  )}
                  {directors && directors.length > 0 && (
                    <div className={styles.directorName}>
                      <span className={styles.director}>Director</span>
                      {directors.map((director, index) => (
                        <div key={index}>
                          <span>{director}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {writers && writers.length > 0 && (
                    <div className={styles.writersNames}>
                      <span className={styles.writers}>Writers</span>
                      <div>
                        <span>{writers.join(", ")}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className={styles.relatedContainer}>
            <h2 className={styles.recommendations}>Recommendations</h2>
            {isLoaderRelatedMovies ? (
              <Loader />
            ) : (
              <div className={styles.relatedCardContainer}>
                {relatedMovieList.map((movie) => {
                  return (
                    <Card
                      card={movie}
                      key={movie.id}
                      className={styles.relatedCard}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
