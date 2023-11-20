import styles from './searchResult.module.css';
import SearchCard from '../search-card/SearchCard';
import { useAppSelector } from '../../hooks/redux';
import { SpellsRequestData } from '../../types/requests-types';

function SearchResult() {
  const spellsRequest = useAppSelector((state) => state.cardsSlice.cards);
  const isLoading = useAppSelector((state) => state.isLoading.isMainLoading);
  return (
    <>
      <div className={styles.spells__container}>
        {isLoading && <div className={styles.spinner}></div>}
        {!isLoading && (!spellsRequest || spellsRequest.length === 0) && (
          <h2>We couldn&apos;t find anything matching your request.</h2>
        )}
        {!isLoading &&
          spellsRequest &&
          spellsRequest.map((el) => createCard(el))}
      </div>
    </>
  );
}

function createCard(el: SpellsRequestData) {
  return (
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
  );
}

export default SearchResult;
