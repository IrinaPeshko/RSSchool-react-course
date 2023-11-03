import styles from './CardDetail.module.css';
import { Link, useLoaderData } from 'react-router-dom';
import { OneSpellRequest } from '../../types/requests-types';

const CardDetail = () => {
  const loaderData = useLoaderData() as OneSpellRequest;
  const loaderAttributes = loaderData.data.attributes;
  if (loaderData && loaderAttributes) {
    return (
      <>
        <div className={styles.detailsContainer}>
          <Link to="/">
            <div className={styles.closeModal}></div>
          </Link>
          <h2>{loaderAttributes.name}</h2>
          {loaderAttributes.image ? (
            <img
              className={styles.detailsImg}
              src={loaderAttributes.image}
              alt="spells-image"
            />
          ) : (
            <img
              src="https://static.wikia.nocookie.net/harrypotter/images/4/48/Flipendo_Maxima_HM_Spell_Icon.png"
              alt="spells-image"
            />
          )}
          <p className={styles.paragraph}>Effect: {loaderAttributes.effect}</p>
          <p className={styles.paragraph}>
            category: {loaderAttributes.category}
          </p>
          {loaderAttributes.light ? (
            <p className={styles.paragraph}>light: {loaderAttributes.light}</p>
          ) : (
            <p className={styles.paragraph}>
              light: emerald, white or sky blue
            </p>
          )}
        </div>
      </>
    );
  }
};

export default CardDetail;
