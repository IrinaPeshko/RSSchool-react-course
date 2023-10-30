import React, { useEffect, useState } from 'react';
import styles from './SearchPage.module.css';
import { findPeople } from '../../api/api';
import SearchResult from '../search-results/searchResult';
import { PersonRequest, ShortPersonRequest } from '../../types/requests-types';
import ErrorButton from '../error-button/ErrorButton';
import SearchBlock from '../search-block/SearchBlock';
import { chooseSearchWord } from '../../utils/chooseSearchWord';

function SearchPage() {
  const peopleArr: ShortPersonRequest[] = [];
  const [searchWord, setSearchWord] = useState(chooseSearchWord());
  const [peopleRequest, setPeopleRequest] = useState(peopleArr);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorRequest, setIsErrorRequest] = useState(false);

  const onClickSearch = async (): Promise<ShortPersonRequest[] | undefined> => {
    const trimSearchWord = searchWord.trim();
    setIsLoading(true);
    setIsErrorRequest(false);
    const requestArr = await findPeople(trimSearchWord);
    if (requestArr instanceof Array && requestArr.length !== 0) {
      const shortRequestArr = requestArr.map((el: PersonRequest) => {
        return {
          name: el.name,
          birth_year: el.birth_year,
          gender: el.gender,
          height: el.height,
          eye_color: el.eye_color,
          hair_color: el.hair_color,
          url: el.url,
        };
      });
      setPeopleRequest(shortRequestArr);
      setIsLoading(false);

      localStorage.setItem('inputValue', searchWord);
      return shortRequestArr;
    } else {
      localStorage.setItem('inputValue', searchWord);
      setIsLoading(false);
      setIsErrorRequest(true);
    }
  };

  useEffect(() => {
    onClickSearch();
  }, []);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setSearchWord(event.target.value);
    }
  };

  return (
    <>
      <SearchBlock
        searchWord={searchWord}
        onChangeInput={onChangeInput}
        onClickSearch={onClickSearch}
      />
      <ErrorButton />
      {isLoading && <div className={styles.spinner}></div>}
      {!isLoading && !isErrorRequest && (
        <SearchResult renderRequest={peopleRequest} />
      )}
      {isErrorRequest && (
        <h2>We couldn&apos;t find anything matching your request.</h2>
      )}
    </>
  );
}

export default SearchPage;
