import { useState } from 'react';
import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const [image, setImage] = useState(false);

  const handleImageLoad = () => {
    setImage(true);
  };

  return (
    <div className={styles.errorContainer}>
      <h2>Evanesco!</h2>
      <img
        src="./hermione-granger.png"
        alt="hermione-granger"
        className={`${styles.error__img} ${image && styles.appear}`}
        onLoad={handleImageLoad}
      />
      <h3>Sorry, this page has disappeared...</h3>
      <Link to="/">
        <button className={styles.resetBtn}>Go to main page</button>
      </Link>
    </div>
  );
};
export default NotFound;
