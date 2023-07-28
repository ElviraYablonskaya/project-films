import { FC } from "react";
import { MoviesType } from "../../@types";
import styles from "./Card.module.scss";

type CardProps = {
  card: MoviesType;
  classname?: string;
};

const Card: FC<CardProps> = ({ card }) => {
  return (
    <div className={styles.card}>
      <div>
        <p className={styles.rating}>{card.rating}</p>
        <img src={card.poster} alt={card.name} className={styles.image} />
      </div>
      <div>
        <div className={styles.name}>{card.name}</div>
      </div>
      <div>
        <div className={styles.genre}>{card.genre}</div>
      </div>
    </div>
  );
};

export default Card;
