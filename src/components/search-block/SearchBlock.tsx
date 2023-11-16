import styles from './SearchBlock.module.css';
import magnifierGlassImage from '/magnifier-glass.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchParams } from '../../store/reducers/searchParamsSlice';

const SearchBlock = () => {
  const [searchWord, setSearchWord] = useState(
    localStorage.getItem('inputValue') || ''
  );
  const dispatch = useDispatch();
  
  return (
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
              onClick={() => {
                localStorage.setItem('inputValue', searchWord)
                dispatch(setSearchParams(searchWord));
              console.log(searchWord);
            }}
              data-testid="searchBtn"
            >
              <img src={magnifierGlassImage} alt="magnifier-glass" />
            </div>
          </div>
  )
}
export default SearchBlock;
