import { FC } from "react";
import { MoviesType } from "../../@types";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";
import { getRatingColor } from "../../utils/functions";

type CardProps = {
  card: MoviesType;
  className?: string;
  isTrendingPage?: boolean;
  ratingIcon?: React.ReactElement
};

const Card: FC<CardProps> = ({ card, isTrendingPage,ratingIcon}) => {
  const ratingColor =
    isTrendingPage && card.rating >= 7
      ? "#7B61FF"
      : getRatingColor(card.rating);

  const navigate = useNavigate();

  const onTitleClick = () => {
    navigate(`/titles/${card.id}`);
  };

  return (
    <div className={styles.card}>
      <div>
        {card.rating ? (
          <p className={styles.rating} style={{ backgroundColor: ratingColor }}>
            {ratingIcon} {card.rating}
          </p>
        ): ""}
        {card.poster ? (
          <img src={card.poster} alt={card.name} className={styles.image} />
        ) : (
          <div className={styles.noPoster}>NO POSTER</div>
        )}
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
