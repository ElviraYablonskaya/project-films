import { useMemo, useState } from "react";
import CardList from "../../components/CardList/CardList";
import Header from "../../components/Header";
import { TabsTypes, Theme } from "../../@types";
import TabsList from "../../components/TabsList/TabsList";
import styles from "./Home.module.scss";
import { IoMdHome } from "react-icons/io";
import { AiFillFire } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/Theme";
import classNames from "classnames";

const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsTypes.Home);
  const navigate = useNavigate();

  const { themeValue } = useThemeContext();

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
        <CardList />
      </div>
    </div>
  );
};

export default Home;
