import { IoMdHome, IoMdSettings } from "react-icons/io";
import Header from "../../components/Header";
import TabsList from "../../components/TabsList/TabsList";
import { AiFillFire } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { TabsTypes, Theme } from "../../@types";
import styles from "./Trends.module.scss";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/Theme";
import classNames from "classnames";

const Trends = () => {
  const [activeTab, setActiveTab] = useState(TabsTypes.Trends);
  const { themeValue } = useThemeContext();

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
      </div>
    </div>
  );
};

export default Trends;
