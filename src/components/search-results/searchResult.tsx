import styles from './searchResult.module.css';
import SearchCard from '../search-card/SearchCard';
import { Link, useLocation } from 'react-router-dom';
import { SpellsRequestContext } from '../search-page/Contexts';
import { Fragment } from 'react';

function SearchResult() {
  const location = useLocation();
  return (
    <SpellsRequestContext.Consumer>
      {({ spellsRequest }) => (
        <Fragment>
          <div className={styles.spells__container}>
            {spellsRequest.map((el) => (
              <div key={el.id} className={styles.searchCard}>
                <Link
                  to={`/details/${el.id}`}
                  className={styles.searchCard}
                  onClick={(event) => {
                    if (location.pathname !== '/') {
                      event.preventDefault();
                    }
                  }}
                >
                  <div className={styles.person__info}>
                    <SearchCard
                      name={el.attributes.name}
                      effect={el.attributes.effect}
                      image={el.attributes.image}
                      category={el.attributes.category}
                      light={el.attributes.light}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </SpellsRequestContext.Consumer>
  );
}

export default SearchResult;


