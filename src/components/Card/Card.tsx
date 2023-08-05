import { FC } from "react";
import { MoviesType } from "../../@types";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";
import { getRatingColor } from "../../utils/functions";

type CardProps = {
  card: MoviesType;
  className?: string;
};

const Card: FC<CardProps> = ({ card }) => {
  const navigate = useNavigate();

  const onTitleClick = () => {
    navigate(`/titles/${card.id}`);
  };

  return (
    <div className={styles.card}>
      <div>
        {card.rating && (
          <p
            className={styles.rating}
            style={{ backgroundColor: getRatingColor(card.rating) }}
          >
            {card.rating}
          </p>
        )}
        <img src={card.poster} alt={card.name} className={styles.image} />
      </div>
      <div>
        <div className={styles.name} onClick={onTitleClick}>
          {card.name}
        </div>
      </div>
      <div>
        <div className={styles.genre}>{card.genre}</div>
      </div>
    </div>
  );
};

export default Card;
