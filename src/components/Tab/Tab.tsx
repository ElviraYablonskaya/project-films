import classNames from "classnames";
import { FC, ReactElement } from "react";
import styles from "./Tab.module.scss";

type TabsProps = {
  title: string | ReactElement;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  icon?: ReactElement
};

const Tab: FC<TabsProps> = ({ title, onClick, icon, disabled, active }) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={classNames(styles.tab, {
        [styles.active]: active,
        [styles.disabled]: disabled,
      })}
    >
      {icon}
      <span>{title}</span>
    </div>
  );
};

export default Tab;
