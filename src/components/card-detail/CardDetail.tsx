import styles from './CardDetail.module.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { OneSpellRequest } from '../../types/requests-types';
import { getSpell } from '../../api/api';

const CardDetail = () => {
  const { cardId } = useParams();
  const [currentSpell, setCurrentSpell] = useState<OneSpellRequest | void>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchSpell = async () => {
      try {
        if (cardId) {
          const spell = await getSpell(cardId);
          setIsLoading(false);
          setCurrentSpell(spell);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSpell();
  }, [cardId]);

  return (
    <div className={styles.detailsContainer} data-testid="detailsBlock">
      <Link to="/">
        <div className={styles.closeModal} data-testid="closeDetails"></div>
      </Link>
      {isLoading && (
        <div
          data-testid="DetailedLoadingBlock"
          className={styles.spinner}
        ></div>
      )}
      {!isLoading && currentSpell ? (
        <>
          <h2>{currentSpell.data.attributes.name}</h2>
          {currentSpell.data.attributes.image ? (
            <img
              className={styles.detailsImg}
              src={currentSpell.data.attributes.image}
              alt="spells-image"
            />
          ) : (
            <img
              src="https://static.wikia.nocookie.net/harrypotter/images/4/48/Flipendo_Maxima_HM_Spell_Icon.png"
              alt="spells-image"
              className={styles.detailsImg}
            />
          )}
          <p className={styles.paragraph}>
            Effect: {currentSpell.data.attributes.effect}
          </p>
          <p className={styles.paragraph}>
            category: {currentSpell.data.attributes.category}
          </p>
          {currentSpell.data.attributes.light ? (
            <p className={styles.paragraph}>
              light: {currentSpell.data.attributes.light}
            </p>
          ) : (
            <p className={styles.paragraph}>
              light: emerald, white or sky blue
            </p>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CardDetail;
