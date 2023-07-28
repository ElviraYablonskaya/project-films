import classNames from "classnames";
import { FC } from "react";

import styles from "./Title.module.scss";

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
  const titleStyle = {
    color: firstColor,
  };

  const emaStyle = {
    color: secondColor || firstColor,
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
