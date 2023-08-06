import { IoMdHome, IoMdSettings } from "react-icons/io";
import Header from "../../components/Header";
import TabsList from "../../components/TabsList/TabsList";
import { AiFillFire } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { TabsTypes } from "../../@types";
import styles from "./Trends.module.scss";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieSelectors, getAllMovies } from "../../redux/reducers/movieSlice";
import Card from "../../components/Card";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const Trends = () => {
  const [activeTab, setActiveTab] = useState(TabsTypes.Trends);

  const dispatch = useDispatch();
  const movies = useSelector(MovieSelectors.getAllMovies);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      dispatch(getAllMovies(accessToken));
    } else {
      console.error("Token not found");
    }
  }, []);

  const trendingMovie = movies.filter((movie) => movie.rating >= 7);
  const isLoaderAllMovies = useSelector(MovieSelectors.getLoaderAllMovies);

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

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className={styles.tabsCard}>
        <TabsList
          tabsList={tabsList}
          activeTab={activeTab}
          onTabClick={onTabClick}
        />
        {isLoaderAllMovies ? (
          <Loader />
        ) : (
          <div className={styles.cardContainer}>
            {trendingMovie.map((movie) => {
              return (
                <Card
                  card={movie}
                  key={movie.id}
                  isTrendingPage={true}
                  ratingIcon={<AiFillFire />}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trends;
