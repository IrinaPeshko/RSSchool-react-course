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

function SearchPage() {
  const peopleArr: SpellsRequestData[] = [];
  const [searchWord, setSearchWord] = useState(chooseSearchWord());
  const [peopleRequest, setPeopleRequest] = useState(peopleArr);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorRequest, setIsErrorRequest] = useState(false);
  const [request, setRequest] = useState(chooseSearchWord());
  const [limitPerPage, setLimitPerPage] = useState(chooseLimit());
  const [page, setPage] = useState(choosePage());
  const [isNextPageActive, setIsNextPageActive] = useState(false);

  useEffect(() => {
    const onClickSearch = async (): Promise<
      SpellsRequestData[] | undefined
    > => {
      setIsNextPageActive(false);
      setIsLoading(true);
      setIsErrorRequest(false);
      const requestObj: SpellsRequest | void = await findSpells(
        request,
        limitPerPage,
        page
      );
      if (
        requestObj &&
        requestObj.data instanceof Array &&
        requestObj.data.length !== 0
      ) {
        const isNextPage = !!requestObj.meta.pagination.next;
        setIsNextPageActive(isNextPage);
        const requestArr = requestObj.data;
        setPeopleRequest(requestArr);
        setIsLoading(false);
        localStorage.setItem('inputValue', request);
        return requestArr;
      } else {
        localStorage.setItem('inputValue', request);
        setIsLoading(false);
        setIsErrorRequest(true);
      }
    };
    onClickSearch();
  }, [request, limitPerPage, page]);

  const onSetRequest = () => {
    setRequest(searchWord);
  };

  return (
    <>
      <SearchBlock
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        onClickSearch={onSetRequest}
      />
      <ErrorButton />
      <LimitInput
        limit={limitPerPage}
        setLimit={setLimitPerPage}
        setPage={setPage}
      />
      {isLoading && <div className={styles.spinner}></div>}
      {!isLoading && !isErrorRequest && (
        <SearchResult peopleRequest={peopleRequest} />
      )}
      {isErrorRequest && (
        <h2>We couldn&apos;t find anything matching your request.</h2>
      )}
      <Pagination
        page={page}
        setPage={setPage}
        isNextPageActive={isNextPageActive}
      />
    </>
  );
}

export default SearchPage;
