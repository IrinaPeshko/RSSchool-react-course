import styles from './searchResult.module.css';
import SearchCard from '../search-card/SearchCard';
import { SpellsRequestContext } from '../search-page/Contexts';
import { Fragment } from 'react';

function SearchResult() {
  return (
    <SpellsRequestContext.Consumer>
      {({ spellsRequest }) => (
        <Fragment>
          <div className={styles.spells__container}>
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
        </Fragment>
      )}
    </SpellsRequestContext.Consumer>
  );
}

export default SearchResult;
