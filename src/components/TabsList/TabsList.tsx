import { FC } from "react";
import { TabsListType, TabsTypes } from "../../@types";
import styles from "./TabsList.module.scss";
import Tab from "../Tab";
import { Outlet } from "react-router-dom";

type TabsListProps = {
  tabsList: TabsListType;
  activeTab: TabsTypes;
  onTabClick: (tab: TabsTypes) => () => void;
};

const TabsList: FC<TabsListProps> = ({ tabsList, activeTab, onTabClick }) => {
  return (
    <div className={styles.tabsContainer}>
      {tabsList.map(({ key, title, disabled, icon }) => (
        <Tab
          key={key}
          title={title}
          onClick={onTabClick(key)} //() => (tab) => setTab(tab)
          active={activeTab === key}
          disabled={disabled}
          icon={icon}
        />
      ))}
      <div className={styles.infoContainer}>
        <Outlet />
      </div>
      <div className={styles.footer}>
        <div>©All Rights Reserved</div>
      </div>
    </div>
  );
};

export default TabsList;
