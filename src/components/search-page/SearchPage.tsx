import { useEffect, useState } from 'react';
import styles from './SearchPage.module.css';
import { findSpells } from '../../api/api';
import SearchResult from '../search-results/searchResult';
import { SpellsRequest, SpellsRequestData } from '../../types/requests-types';
import ErrorButton from '../error-button/ErrorButton';
import SearchBlock from '../search-block/SearchBlock';
import {
  chooseLimit,
  choosePage,
  chooseSearchWord,
} from '../../utils/chooseSearchWord';
import LimitInput from '../limitPerPageInput/LimitInput';
import Pagination from '../pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const peopleArr: SpellsRequestData[] = [];
  const [searchWord, setSearchWord] = useState(chooseSearchWord());
  const [peopleRequest, setPeopleRequest] = useState(peopleArr);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorRequest, setIsErrorRequest] = useState(false);
  const [limitPerPage, setLimitPerPage] = useState(chooseLimit());
  const [page, setPage] = useState(choosePage());
  const [isNextPageActive, setIsNextPageActive] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const onClickSearch = async (
    searchWord: string
  ): Promise<SpellsRequestData[] | undefined> => {
    setIsNextPageActive(false);
    setIsLoading(true);
    setIsErrorRequest(false);

    const requestObj: SpellsRequest | void = await findSpells(
      searchWord,
      limitPerPage,
      page
    );

    // const isRequestCorrect: boolean =
    //   requestObj &&
    //   requestObj.data instanceof Array &&
    //   requestObj.data.length !== 0
    //     ? true
    //     : false;

    if (
      requestObj &&
      requestObj.data instanceof Array &&
      requestObj.data.length !== 0
    ) {
      const isNextPage = !!requestObj.meta.pagination.next;
      setIsNextPageActive(isNextPage);

      const requestArr = requestObj.data;
      setPeopleRequest(requestArr);

      return requestArr;
    } else {
      setIsErrorRequest(true);
    }

    localStorage.setItem('inputValue', searchWord);
    setIsLoading(false);
  };

  useEffect(() => {
    setSearchParams({ page: page, limit: limitPerPage });
  }, [limitPerPage, page, setSearchParams]);

  useEffect(() => {
    onClickSearch('');
  }, []);

  return (
    <div className={styles.searchPage}>
      <SearchBlock
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        onClickSearch={() => onClickSearch(searchWord)}
      />
      <div className={styles.searchDetails}>
        <ErrorButton />
        <LimitInput
          limit={limitPerPage}
          setLimit={setLimitPerPage}
          setPage={setPage}
        />
      </div>
      {isLoading && <div className={styles.spinner}></div>}
      {!isLoading && !isErrorRequest && peopleRequest.length !== 0 && (
        <SearchResult peopleRequest={peopleRequest} />
      )}
      {isErrorRequest && (
        <h2>We couldn&apos;t find anything matching your request.</h2>
      )}
      {peopleRequest.length !== 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          isNextPageActive={isNextPageActive}
        />
      )}
    </div>
  );
}

export default SearchPage;
