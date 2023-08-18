import { FC } from "react";
import { ButtonsGroupList } from "../../@types";
import classNames from "classnames";
import styles from "./ButtonsGroup.module.scss";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
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
            {item.title === "save" && !item.disabled && (
              <span
                className={classNames({
                  [styles.purpleBookmark]: item.active, // Применяем стиль, если кнопка активна
                })}
              >
                {item.active ? (
                  <BsFillBookmarkFill color="#7B61FF" />
                ) : (
                  <BsBookmark />
                )}
              </span>
            )}
            {item.title === "share" && !item.disabled && <BiShareAlt />}
          </div>
        );
      })}
    </div>
  );
};

export default ButtonsGroup;
