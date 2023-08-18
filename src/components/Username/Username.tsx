import { FC } from "react";

import styles from "./Username.module.scss";
import classNames from "classnames";
import { useThemeContext } from "../../context/Theme";
import { Theme } from "../../@types";

type UsernameProps = {
  username: string;
};

const Username: FC<UsernameProps> = ({ username }) => {
  const { themeValue } = useThemeContext();
  if (!username) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.initials}>{username[0]}</div>
      <div
        className={classNames(styles.username, {
          [styles.lightUsername]: themeValue === Theme.Light,
        })}
      >
        {username}
      </div>
    </div>
  );
};

export default Username;
