import { FC } from "react";
import { ButtonsGroupList } from "../../@types";
import classNames from "classnames";
import styles from "./ButtonsGroup.module.scss";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BiShareAlt } from "react-icons/bi";

type ButtonsGroupProps = {
  buttonsGroup: ButtonsGroupList;
  disabled?: boolean;
};

const ButtonsGroup: FC<ButtonsGroupProps> = ({ buttonsGroup, disabled }) => {
  return (
    <div
      className={classNames(styles.groupButtonsWrapper, {
        [styles.disabledGroupButtonsWrapper]: disabled,
      })}
    >
      {buttonsGroup.map((item, index) => {
        return (
          <div
            key={index + Math.random()}
            className={styles.button}
            onClick={item.onClick}
          >
            {item.title === "save" && !item.disabled && <BsFillBookmarkFill />}
            {item.title === "share" && !item.disabled && <BiShareAlt />}
          </div>
        );
      })}
    </div>
  );
};

export default ButtonsGroup;
