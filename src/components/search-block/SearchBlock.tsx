import styles from './SearchBlock.module.css';
import magnifierGlassImage from '/magnifier-glass.png';
import { SearchWordsContext } from '../search-page/Contexts';
import { Fragment } from 'react';

const SearchBlock = (props: {
  onClickSearch: () => void;
}) => {
  return (
    <SearchWordsContext.Consumer>
      {({ searchWord, setSearchWord }) => (
        <Fragment>
          <div className={styles.searchBlock}>
            <input
              placeholder="Search..."
              type="text"
              className={styles.searchInput}
              value={searchWord}
              onChange={(event)=>setSearchWord(event.target.value)}
            />
            <div className={styles.searchButton} onClick={props.onClickSearch}>
              <img src={magnifierGlassImage} alt="magnifier-glass" />
            </div>
          </div>
        </Fragment>
      )}
    </SearchWordsContext.Consumer>
  );
};
export default SearchBlock;
