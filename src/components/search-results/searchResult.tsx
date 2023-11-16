import styles from './searchResult.module.css';
import SearchCard from '../search-card/SearchCard';
import { useAppSelector } from '../../hooks/redux';

function SearchResult() {
  const data = useAppSelector((state) => state.cardsSlice.cards);
  const isLoading = useAppSelector((state) => state.isLoading.isMainLoading);
  const spellsRequest = data?.spells;

  return (
    <>
      <div className={styles.spells__container}>
        {isLoading && <div className={styles.spinner}></div>}
        {!isLoading && (!spellsRequest || spellsRequest.length === 0) && (
          <h2>We couldn&apos;t find anything matching your request.</h2>
        )}
        {!isLoading &&
          spellsRequest &&
          spellsRequest.map((el) => (
            <div key={el.id} className={styles.searchCard}>
              <div className={styles.person__info}>
                <SearchCard
                  name={el.attributes.name}
                  effect={el.attributes.effect}
                  image={el.attributes.image}
                  category={el.attributes.category}
                  light={el.attributes.light}
                  id={el.id}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default SearchResult;
