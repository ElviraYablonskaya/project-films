import { useState } from "react";
import Input from "../Input";
import Title from "../Title/Title";
import styles from "./Header.module.scss";
import Username from "../Username/Username";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSearchedPosts } from "../../redux/reducers/movieSlice";
import Button from "../Button";
import { ButtonTypes } from "../../@types";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch(getSearchedPosts(inputValue));
    navigate(`/search?query=${encodeURIComponent(inputValue)}`);
  };

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
      <Button
        type={ButtonTypes.Primary}
        title={<BiSearch size={19} />}
        onClick={handleSearch}
        className={styles.searchButton}
      />
      <div className={styles.username}>
        <Username username={"Elvira"} />
      </div>
    </div>
  );
};

export default Header;
