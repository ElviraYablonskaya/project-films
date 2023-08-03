import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  MovieSelectors,
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

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken && id) {
      dispatch(getSingleMovie(id));
    } else [console.error("Token not found")];
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

  return (
    <div>
      <Header />
      <div className={styles.tabsCard}>
        <TabsList
          tabsList={tabsList}
          activeTab={activeTab!}
          onTabClick={onTabClick}
        />
        <div className={styles.singleMovieCard}>
          {singleMovie?.poster && (
            <div className={styles.poster}>
              <img src={singleMovie?.poster} alt={singleMovie?.name} />
            </div>
          )}
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
                    backgroundColor: getRatingColor(singleMovie?.rating ?? 0),
                  }}
                  className={styles.rating}
                >
                  {singleMovie?.rating}
                </div>
              )}
              {singleMovie?.rating && (
                <div className={styles.ratingImdb}>
                  <FaImdb size={23} />
                  <span>{singleMovie?.rating ? singleMovie.rating : 0}</span>
                </div>
              )}
              {singleMovie?.runtime && (
                <div className={styles.runtime}>{singleMovie?.runtime} min</div>
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
      </div>
    </div>
  );
};

export default SingleMovie;
