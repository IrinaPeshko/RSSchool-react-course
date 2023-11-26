import styles from './SearchBlock.module.css';
import React from 'react';
import magnifierGlassImage from '../../../public/magnifier-glass.png';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { checkRouterElement } from '@/utils/functions';

const SearchBlock = () => {
  const router = useRouter();
  let { search, limit } = router.query;
  limit = checkRouterElement(limit, '10');
  search = checkRouterElement(search, '');
  const [searchWord, setSearchWord] = useState(search);

  const onSearchBtnClick = () => {
    if (router.pathname === '/') {
      if (searchWord) {
        router.push({
          query: { page: '1', limit, search: searchWord },
        });
      } else {
        router.push({
          query: { page: '1', limit },
        });
      }
    }
  };
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
          onSearchBtnClick();
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
