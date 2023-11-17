import styles from './CardDetail.module.css';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOneSpellQuery } from '../../api/redux.api';
import { useAppDispatch } from '../../hooks/redux';
import { setIsDetailsLoading } from '../../store/reducers/isLoading';

const CardDetail = () => {
  const { cardId } = useParams();
  let id = '';
  if (cardId) {
    id = cardId;
  }
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetOneSpellQuery({
    id,
  });

  useEffect(() => {
    dispatch(setIsDetailsLoading(isLoading));
  }, [isLoading]);

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

      {!isLoading && (
        <>
          <h2>{data?.response.name}</h2>
          {data?.response.image ? (
            <img
              className={styles.detailsImg}
              src={data?.response.image}
              alt="spells-image"
            />
          ) : (
            <img
              src="https://static.wikia.nocookie.net/harrypotter/images/4/48/Flipendo_Maxima_HM_Spell_Icon.png"
              alt="spells-image"
              className={styles.detailsImg}
            />
          )}
          <p className={styles.paragraph}>Effect: {data?.response.effect}</p>
          <p className={styles.paragraph}>
            category: {data?.response.category}
          </p>
          {data?.response.light ? (
            <p className={styles.paragraph}>light: {data?.response.light}</p>
          ) : (
            <p className={styles.paragraph}>
              light: emerald, white or sky blue
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CardDetail;
