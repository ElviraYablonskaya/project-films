import { FC, ReactElement } from "react";
import styles from "./FormPageContainer.module.scss";
import Title from "../Title";
import Button from "../Button";
import { ButtonTypes } from "../../@types";

type FormPageContainerProps = {
  title: string;
  children: ReactElement | ReactElement[];
  btnTitle: string;
  onSubmit: () => void;
  additionalInfo?: ReactElement;
};

const FormPageContainer: FC<FormPageContainerProps> = ({
  title,
  children,
  btnTitle,
  onSubmit,
  additionalInfo,
}) => {
  return (
    <div className={styles.formContainer}>
      <Title title={title} firstColor={"#fff"} className={styles.title} />
      <div className={styles.fieldsContainer}>{children}</div>
      <Button
        type={ButtonTypes.Primary}
        title={btnTitle}
        onClick={onSubmit}
        className={styles.button}
      />
      <div>{additionalInfo}</div>
    </div>
  );
};

export default FormPageContainer;
