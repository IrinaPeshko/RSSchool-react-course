import { useContext } from 'react';
import styles from './searchResult.module.css';
import SearchCard from '../search-card/SearchCard';
import { SpellsRequestContext } from '../search-page/Contexts';

function SearchResult() {
  const { spellsRequest } = useContext(SpellsRequestContext);

  return (
    <>
      <div className={styles.spells__container}>
        {spellsRequest.length === 0 && (
          <h2>We couldn&apos;t find anything matching your request.</h2>
        )}
        {spellsRequest.map((el) => (
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
