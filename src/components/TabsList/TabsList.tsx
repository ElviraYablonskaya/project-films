import { FC } from "react";
import { TabsListType, TabsTypes } from "../../@types";
import styles from "./TabsList.module.scss";
import Tab from "../Tab";

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
    </div>
  );
};

export default TabsList;
