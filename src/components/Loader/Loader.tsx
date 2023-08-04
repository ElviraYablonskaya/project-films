import Lottie from "lottie-react";
import animation from "../../assets/animation.json";
import styles from "./Loader.module.scss"

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Lottie
        style={{ width: 90, height: 90}}
        animationData={animation}
        loop={true}
      />
    </div>
  );
};

export default Loader;
