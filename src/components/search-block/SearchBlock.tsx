import styles from './SearchBlock.module.css';
import magnifierGlassImage from '../../../public/magnifier-glass.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchParams } from '../../store/reducers/queryParams';
import { setPage } from '../../store/reducers/queryParams';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/redux';

import { useRouter } from 'next/router';

const SearchBlock = () => {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState('');
  const dispatch = useDispatch();
  const limit = useAppSelector((store) => store.queryParamsReducer.limit);
  // const limit = '10';
  // const [, setSearch] = useSearchParams();
  // const queryParams = router.query;
   
  // const queryParameters = router.query;
  // router.push(?page=1&limit=${newValue});
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
          localStorage.setItem('inputValue', searchWord);
          dispatch(setSearchParams(searchWord));
          dispatch(setPage('1'));
          router.push({
            query: { limit, page: '1' },
          });
        }}
        data-testid="searchBtn"
      >
        <Image
          src={magnifierGlassImage}
          alt="magnifier-glass"
          width={68}
          height={68}
          priority={true}
        />
      </div>
    </div>
  );
};

export default SearchBlock;
