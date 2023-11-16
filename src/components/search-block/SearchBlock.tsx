import styles from './SearchBlock.module.css';
import magnifierGlassImage from '/magnifier-glass.png';
import { SearchWordsContext } from '../search-page/Contexts';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchParams } from '../../store/reducers/searchParamsSlice';

const SearchBlock = () => {
  const dispatch = useDispatch();
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
              onChange={(event) => setSearchWord(event.target.value)}
              data-testid="searchInput"
            />
            <div
              className={styles.searchButton}
              onClick={() => dispatch(setSearchParams(searchWord))}
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
