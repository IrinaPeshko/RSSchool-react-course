import styles from './SearchBlock.module.css';
import magnifierGlassImage from '/magnifier-glass.png';
import { SearchWordsContext } from '../search-page/Contexts';
import { Fragment } from 'react';

const SearchBlock = () => {
  return (
    <SearchWordsContext.Consumer>
      {({ searchWord, setSearchWord, setRequest }) => (
        <Fragment>
          <div className={styles.searchBlock}>
            <input
              placeholder="Search..."
              type="text"
              className={styles.searchInput}
              value={searchWord}
              onChange={(event) => setSearchWord(event.target.value)}
              data-testid="searchInput"
            />
            <div
              className={styles.searchButton}
              onClick={() => setRequest(searchWord)}
              data-testid="searchBtn"
            >
              <img src={magnifierGlassImage} alt="magnifier-glass" />
            </div>
          </div>
        </Fragment>
      )}
    </SearchWordsContext.Consumer>
  );
};
export default SearchBlock;
