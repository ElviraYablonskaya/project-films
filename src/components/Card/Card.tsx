import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.scss";
import { MoviesType, Theme } from "../../@types";
import { useThemeContext } from "../../context/Theme";
import classNames from "classnames";
import { BsFillBookmarkFill } from "react-icons/bs";
import { getRatingColor } from "../../utils/functions";

type CardProps = {
  card: MoviesType;
  className?: string;
  saved?: boolean;
  trends?: boolean;
  icon?: ReactElement;
};

const Card: FC<CardProps> = ({ card, saved, trends, icon }) => {

  const navigate = useNavigate();

  const { themeValue } = useThemeContext();

  const onTitleClick = () => {
    navigate(`/titles/${card.id}`);
  };

  return (
    <div className={styles.card}>
      <div>
        {card.ratingsSummary.aggregateRating ? (
          <div
            style={{
              backgroundColor: trends
                ? "#7B61FF"
                : getRatingColor(card.ratingsSummary.aggregateRating),
            }}
            className={styles.rating}
          >
            {icon}
            {card.ratingsSummary.aggregateRating}
          </div>
        ) : (
          ""
        )}
        {card.primaryImage ? (
          <img
            src={card.primaryImage.url}
            alt={card.originalTitleText.text}
            className={styles.image}
          />
        ) : (
          <div
            className={classNames(styles.noPoster, {
              [styles.lightNoPoster]: themeValue === Theme.Light,
            })}
          >
            NO POSTER
          </div>
        )}
      </div>
      <div>
        {card.originalTitleText && (
          <div
            className={classNames(styles.name, {
              [styles.lightName]: themeValue === Theme.Light,
            })}
            onClick={onTitleClick}
          >
            {card.originalTitleText.text}
          </div>
        )}
        {card.genres && (
          <div className={styles.genres}>
            {card.genres.genres
              .slice(0, 2)
              .map((item: { text: string; id: string }) => (
                <div key={item.id}>{item.text}</div>
              ))}
          </div>
        )}
      </div>
      {saved && (
        <div className={styles.savedIndicator}>
          <BsFillBookmarkFill color="#7B61FF" />
        </div>
      )}
    </div>
  );
};

export default Card;
