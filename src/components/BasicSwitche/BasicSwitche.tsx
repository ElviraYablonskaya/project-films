import classNames from "classnames";
import { useThemeContext } from "../../context/Theme";
import { Theme } from "../../@types";
import { BsSun } from "react-icons/bs";
import { BiMoon } from "react-icons/bi";
import styles from "./BasicSwitcher.module.scss";

const ThemeSwitcher = () => {
  const { themeValue, onChangeTheme } = useThemeContext();

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.button, {
          [styles.activeButton]: themeValue === Theme.Dark,
        })}
        onClick={onChangeTheme(Theme.Dark)}
      >
        <BiMoon size={22} />
      </div>
      <div
        className={classNames(styles.button, {
          [styles.activeButton]: themeValue === Theme.Light,
        })}
        onClick={onChangeTheme(Theme.Light)}
      >
        <BsSun size={22} color="f3a608" />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
