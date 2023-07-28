import { useState } from "react";
import Input from "../Input";
import Title from "../Title/Title";
import styles from "./Header.module.scss";
import Username from "../Username/Username";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  
  return (
    <div className={styles.header}>
      <div>
        <Title
          title={"PIXEMA"}
          firstColor={"#7b61ff"}
          secondColor={"#ffffff"}
        />
      </div>
      <Input
        placeholder="Search"
        onChange={setInputValue}
        value={inputValue}
        className={styles.input}
      />
      <div className={styles.username}>
        <Username username={"Elvira"} />
      </div>
    </div>
  );
};

export default Header;
