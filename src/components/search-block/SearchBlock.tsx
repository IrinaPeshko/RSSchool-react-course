import styles from './SearchBlock.module.css';
import magnifierGlassImage from '../../../public/magnifier-glass.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchParams } from '../../store/reducers/queryParams';
import { setPage } from '../../store/reducers/queryParams';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { checkRouterElement } from '@/utils/functions';

const SearchBlock = () => {
  const router = useRouter();
  let { search } = router.query;
  search = checkRouterElement(search, '');
  const [searchWord, setSearchWord] = useState(search);
  const dispatch = useDispatch();
  const { limit } = router.query;

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
          dispatch(setSearchParams(searchWord));
          dispatch(setPage('1'));
          router.push({
            query: { limit, page: '1', search: searchWord },
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
