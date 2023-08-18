import { IoMdHome, IoMdSettings } from "react-icons/io";
import Header from "../../components/Header";
import TabsList from "../../components/TabsList/TabsList";
import { AiFillFire } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { ButtonTypes, TabsTypes, Theme } from "../../@types";
import styles from "./Settings.module.scss";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import BasicSwitche from "../../components/BasicSwitche/BasicSwitche";
import classNames from "classnames";
import { useThemeContext } from "../../context/Theme";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(TabsTypes.Settings);
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
        <div>
          <h2
            className={classNames(styles.profile, {
              [styles.lightProfile]: themeValue === Theme.Light,
            })}
          >
            Profile
          </h2>
          <div className={styles.profileContainer}>
            <div className={styles.inputs}>
              <Input
                title={"Name"}
                placeholder={"Name"}
                onChange={() => {}}
                value={""}
                className={styles.inputName}
              />
              <Input
                title={"Email"}
                placeholder={"Email"}
                onChange={() => {}}
                value={""}
                className={styles.inputEmail}
              />
            </div>
          </div>
          <h2
            className={classNames(styles.password, {
              [styles.lightPassword]: themeValue === Theme.Light,
            })}
          >
            Password
          </h2>
          <div className={styles.passwordContainer}>
            <div className={styles.inputs}>
              <Input
                title={"Password"}
                placeholder={"Password"}
                onChange={() => {}}
                value={""}
                className={`${styles.password} ${styles.largeInput}`}
              />
              <div className={styles.rightPasswords}>
                <Input
                  title={"New Password"}
                  placeholder={"New Password"}
                  onChange={() => {}}
                  value={""}
                  className={`${styles.newPassword} ${styles.largeInput}`}
                />
                <Input
                  title={"Confirm Password"}
                  placeholder={"Confirm Password"}
                  onChange={() => {}}
                  value={""}
                  className={`${styles.confirmPassword} ${styles.largeInput}`}
                />
              </div>
            </div>
          </div>

          <h2
            className={classNames(styles.colorMode, {
              [styles.lightColorMode]: themeValue === Theme.Light,
            })}
          >
            Color mode
          </h2>
          <div className={styles.colorModeContainer}>
            <div className={styles.darkTheme}>
              <div>
                <div className={styles.dark}>Dark</div>
                <span className={styles.useDark}>Use dark thema</span>
              </div>
              <BasicSwitche />
            </div>
          </div>
          <div className={styles.buttons}>
            <Button
              type={ButtonTypes.Secondary}
              title={"Cancel"}
              onClick={() => {}}
            />
            <Button
              type={ButtonTypes.Primary}
              title={"Save"}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
