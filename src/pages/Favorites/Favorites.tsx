import { IoMdHome, IoMdSettings } from "react-icons/io";
import Header from "../../components/Header";
import TabsList from "../../components/TabsList/TabsList";
import { AiFillFire } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { TabsTypes, Theme } from "../../@types";
import styles from "./Favorites.module.scss";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/Theme";
import classNames from "classnames";
import { MovieSelectors } from "../../redux/reducers/movieSlice";
import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { ImFilesEmpty } from "react-icons/im";

const Favorites = () => {
  const [activeTab, setActiveTab] = useState(TabsTypes.Favorites);
  const { themeValue } = useThemeContext();
  const navigate = useNavigate();

  const savedPosts = useSelector(MovieSelectors.getSavePosts);

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
      className={classNames(styles.lightThemeContainer, {
        [styles.lightContainer]: themeValue === Theme.Light,
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <div>
        <Header />
      </div>
      <div className={styles.tabsCard}>
        <TabsList
          tabsList={tabsList}
          activeTab={activeTab}
          onTabClick={onTabClick}
        />
        <div className={styles.cards}>
          {savedPosts.length > 0 ? (
            savedPosts.map((post) => (
              <Card key={post.id} card={post} saved={true} />
            ))
          ) : (
            <div className={styles.emptyFavorites}>
              <ImFilesEmpty size={90} />
              <span className={styles.empty}>Empty favorites</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
