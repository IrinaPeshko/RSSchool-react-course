import { useEffect, useState } from 'react';
import styles from './SearchPage.module.css';
import { createShortArr } from '../../api/api';
import SearchResult from '../search-results/searchResult';
import { ShortPersonRequest } from '../../types/requests-types';
import ErrorButton from '../error-button/ErrorButton';
import SearchBlock from '../search-block/SearchBlock';
import { chooseSearchWord } from '../../utils/chooseSearchWord';
import LimitInput from '../limitPerPageInput/LimitInput';
import Pagination from '../pagination/Pagination';

function SearchPage() {
  const peopleArr: ShortPersonRequest[] = [];
  const [searchWord, setSearchWord] = useState(chooseSearchWord());
  const [peopleRequest, setPeopleRequest] = useState(peopleArr);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorRequest, setIsErrorRequest] = useState(false);
  const [request, setRequest] = useState(chooseSearchWord());
  const [limitPerPage, setLimitPerPage] = useState('10');
  const [page, setPage] = useState('1');
  // const [visiblePeople, setVisiblePeople] = useState(peopleArr);

  useEffect(() => {
    const onClickSearch = async (): Promise<
      ShortPersonRequest[] | undefined
    > => {
      setIsLoading(true);
      setIsErrorRequest(false);
      const requestArr = await createShortArr(request);
      if (requestArr instanceof Array && requestArr.length !== 0) {
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
  }, [request]);

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
      <LimitInput limit={limitPerPage} setLimit={setLimitPerPage} />
      {isLoading && <div className={styles.spinner}></div>}
      {!isLoading && !isErrorRequest && (
        <SearchResult
          peopleRequest={peopleRequest}
          page={page}
          limitPerPage={limitPerPage}
          // setVisiblePeople={setVisiblePeople}
          // visiblePeople={visiblePeople}
        />
      )}
      {isErrorRequest && (
        <h2>We couldn&apos;t find anything matching your request.</h2>
      )}
      <Pagination
        peopleRequest={peopleRequest}
        page={page}
        setPage={setPage}
        limitPerPage={limitPerPage}
        // setVisiblePeople={setVisiblePeople}
        // visiblePeople ={visiblePeople}
      />
    </>
  );
}

export default SearchPage;
