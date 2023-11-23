import styles from './searchResult.module.css';
import Card from '../card/Card';
import { useAppSelector } from '../../hooks/redux';
import { SpellsRequestData } from '../../types/requests-types';

function SearchResult(props: { spells: SpellsRequestData[] }) {
  const spellsRequest = props.spells;
  const isLoading = useAppSelector((state) => state.isLoading.isMainLoading);
  return (
    <>
      <div className={styles.spells__container}>
        {isLoading && <div className={styles.spinner}></div>}
        {!isLoading && (!spellsRequest || spellsRequest.length < 1) && (
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
        <Card
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
