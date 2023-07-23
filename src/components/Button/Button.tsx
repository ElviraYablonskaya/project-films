import { FC, ReactElement } from "react";
import { ButtonTypes } from "../../@types";

import styles from "./Button.module.scss";
import classNames from "classnames";

type ButtonProps = {
  type: ButtonTypes;
  title: string | ReactElement;
  onClick: () => void;
  disabled: boolean;
  className?: string;
};

const Button: FC<ButtonProps> = ({
  type,
  title,
  onClick,
  disabled,
  className,
}) => {
  const buttonStyle = styles[type];
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={classNames(buttonStyle, className, {
        [styles.disabled]: disabled,
      })}
    >
      {title}
    </div>
  );
};

export default Button;
