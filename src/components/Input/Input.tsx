import classNames from "classnames";
import { ChangeEvent, FC, KeyboardEvent } from "react";

import styles from "./Input.module.scss";

type InputProps = {
  title?: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  errorText?: string;
  isTextarea?: boolean;
  className?: string;
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => void;
};

const Input: FC<InputProps> = ({
  title,
  errorText,
  placeholder,
  onChange,
  disabled,
  value,
  isTextarea,
  className,
  onKeyDown,
}) => {
  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(event.target.value);
    console.log(value);
  };

  const inputProps = {
    onChange: onInputChange,
    value,
    placeholder,
    className: classNames(styles.input, className, {
      [styles.disabled]: disabled,
      [styles.errorInput]: errorText,
    }),
    onKeyDown,
  };

  return (
    <div className={styles.container}>
      {title && <div className={styles.title}>{title}</div>}
      {isTextarea ? <textarea {...inputProps} /> : <input {...inputProps} />}
      {errorText && <div className={styles.errorText}>{errorText}</div>}
    </div>
  );
};

export default Input;