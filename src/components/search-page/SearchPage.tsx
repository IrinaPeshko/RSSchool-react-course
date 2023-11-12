import { useEffect, useState, useContext } from 'react';
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
import { SearchWordsContext, SpellsRequestContext } from './Contexts';

function SearchPage() {
  const { spellsRequest, setSpellsRequest } = useContext(SpellsRequestContext);
  const [searchWord, setSearchWord] = useState(chooseSearchWord());
  const [isLoading, setIsLoading] = useState(false);
  const [, setIsErrorRequest] = useState(false);
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
      setSpellsRequest([]);
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
        setSpellsRequest(requestArr); 
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
  }, [request, limitPerPage, page, setSpellsRequest]);

  return (
    <SearchWordsContext.Provider
      value={{ searchWord, setSearchWord, setRequest, request }}
    >
      <div className={styles.searchPage}>
        <SearchBlock />
        <div className={styles.searchDetails}>
          <ErrorButton />
          <LimitInput
            limit={limitPerPage}
            setLimit={setLimitPerPage}
            setPage={setPage}
          />
        </div>
        {isLoading && <div className={styles.spinner}></div>}
        {!isLoading && <SearchResult />}
        {spellsRequest.length !== 0 && (
          <Pagination
            page={page}
            setPage={setPage}
            isNextPageActive={isNextPageActive}
          />
        )}
      </div>
    </SearchWordsContext.Provider>
  );
}

export default SearchPage;
