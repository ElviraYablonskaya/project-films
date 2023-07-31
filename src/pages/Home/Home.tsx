import { useMemo, useState } from "react";
import CardList from "../../components/CardList/CardList";
import Header from "../../components/Header";
import { TabsTypes } from "../../@types";
import TabsList from "../../components/TabsList/TabsList";
import styles from "./Home.module.scss";
import { IoMdHome } from "react-icons/io";
import { AiFillFire } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";

const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsTypes.Home);

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
    setActiveTab(tab);
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
        <CardList />
      </div>
    </div>
  );
};

export default Home;
