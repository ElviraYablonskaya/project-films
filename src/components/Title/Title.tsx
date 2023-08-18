import classNames from "classnames";
import { FC } from "react";

import styles from "./Title.module.scss";
import { useThemeContext } from "../../context/Theme";
import { Theme } from "../../@types";

type TitleProps = {
  title: string;
  className?: string;
  firstColor: string;
  secondColor?: string;
};

const Title: FC<TitleProps> = ({
  title,
  className,
  firstColor,
  secondColor,
}) => {
  const { themeValue } = useThemeContext();
  const titleStyle = {
    color: firstColor,
  };

  const emaStyle = {
    color: themeValue === Theme.Light ? "#000000" : secondColor || firstColor,
  };

  return (
    <div className={styles.titleStyle}>
      <div className={classNames(styles.title, className)} style={titleStyle}>
        {title.slice(0, 3)}
      </div>
      <div className={classNames(styles.title, className)} style={emaStyle}>
        {title.slice(3)}
      </div>
    </div>
  );
};

export default Title;
