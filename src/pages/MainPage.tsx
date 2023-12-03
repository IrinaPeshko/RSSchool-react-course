import styles from '../styles/main.module.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { useEffect, useState } from 'react';

const MainPage = () => {
  const data = useAppSelector((store) => store.data);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      setHighlightedIndex(0);
      const timeoutId = setTimeout(() => {
        setHighlightedIndex(null);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [data]);

  return (
    <>
      <h1>Choose the form:</h1>
      <nav>
        <Link to="/hookForm" className={styles.link}>
          Hook form
        </Link>
        <Link to="/uncontrolledForm" className={styles.link}>
          Uncontrolled form
        </Link>
      </nav>
      {data.length ? (
        data.map((el, i) => (
          <div
            key={i}
            className={`${styles.card} ${
              highlightedIndex === i ? styles.highlighted : ''
            }`}
          >
            <div className={styles.content}>
              <p className={styles.cardField}>
                <b>Name:</b> {el.name}
              </p>
              <p className={styles.cardField}>
                <b>Age:</b> {el.age}
              </p>
              <p className={styles.cardField}>
                <b>Gender: </b>
                {el.gender}
              </p>
              <p className={styles.cardField}>
                <b>Country:</b> {el.country}
              </p>
              <p className={styles.cardField}>
                <b>Email:</b> {el.email}
              </p>
              <p className={styles.cardField}>
                <b>Password:</b> {el.password}
              </p>
              <p className={styles.cardField}>
                <b>Password confirmation:</b> {el.confirmPassword}
              </p>
              <p className={styles.cardField}>
                <b>accept:</b> {String(el.accept)}
              </p>
            </div>
            <div className={styles.imgBlock}>
              <img src={el.picture} alt="photo" />
            </div>
          </div>
        ))
      ) : (
        <div className={styles.emptyBlock}>
          <div>
            <h2>No data yet.</h2>
            <h3>Select the form and fill it out with your information.</h3>
          </div>
        </div>
      )}
    </>
  );
};
export default MainPage;