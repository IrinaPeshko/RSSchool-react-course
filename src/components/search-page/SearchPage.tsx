import { useEffect, useState } from 'react';
import styles from './SearchPage.module.css';
import { findSpells } from '../../api/api';
import SearchResult from '../search-results/searchResult';
import {
  OneSpellRequest,
  SpellsRequest,
  SpellsRequestData,
} from '../../types/requests-types';
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
  const [request, setRequest] = useState(chooseSearchWord());
  const [limitPerPage, setLimitPerPage] = useState(chooseLimit());
  const [page, setPage] = useState(choosePage());
  const [isNextPageActive, setIsNextPageActive] = useState(false);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ page: page, limit: limitPerPage });
    const onClickSearch = async (): Promise<
      SpellsRequestData[] | undefined
    > => {
      setIsNextPageActive(false);
      setIsLoading(true);
      setIsErrorRequest(false);
      setPeopleRequest([]);
      const requestObj: SpellsRequest | OneSpellRequest | void =
        await findSpells(request, limitPerPage, page);
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
    <div className={styles.searchPage}>
      <SearchBlock
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        onClickSearch={onSetRequest}
      />
      <div className={styles.searchDetails}>
        <ErrorButton />
        <LimitInput
          limit={limitPerPage}
          setLimit={setLimitPerPage}
          setPage={setPage}
        />
      </div>
      {isLoading && <div className={styles.spinner}></div> }
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
