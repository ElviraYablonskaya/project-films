import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  getSearchedPosts,
} from "../../redux/reducers/movieSlice";
import Header from "../../components/Header";
import styles from "./Search.module.scss";
import { TabsTypes, Theme } from "../../@types";
import { useLocation, useNavigate } from "react-router-dom";
import TabsList from "../../components/TabsList";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import { BsFillBookmarkFill } from "react-icons/bs";
import { AiFillFire } from "react-icons/ai";
import Card from "../../components/Card";
import { useThemeContext } from "../../context/Theme";
import classNames from "classnames";
import Loader from "../../components/Loader/Loader";
import { ImFilesEmpty } from "react-icons/im";

const Search = () => {
  const searchedMovies = useSelector(MovieSelectors.getSearchedPosts);
  const { themeValue } = useThemeContext();
  const [activeTab, setActiveTab] = useState<TabsTypes | null>();

  const isSearchingLoader = useSelector(MovieSelectors.getSearchingLoader);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    if (query) {
      dispatch(getSearchedPosts(query));
    }
  }, [dispatch, location.search]);

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
    <div
      className={classNames(styles.searchPage, {
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
        {isSearchingLoader ? (
          <Loader />
        ) : searchedMovies.length === 0 ? (
          <div className={styles.emptySearch}>
            <ImFilesEmpty size={90} />
            <span className={styles.empty}>Empty search</span>
          </div>
        ) : (
          <div className={styles.cards}>
            {searchedMovies.map((movie) => {
              return <Card key={movie.id} card={movie} saved={false} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
