import { useState, useContext } from 'react';
import styles from './SearchPage.module.css';
import SearchResult from '../search-results/searchResult';
import ErrorButton from '../error-button/ErrorButton';
import SearchBlock from '../search-block/SearchBlock';

import LimitInput from '../limitPerPageInput/LimitInput';
import Pagination from '../pagination/Pagination';
import { SpellsRequestContext } from './Contexts';
import { useGetSpellsQuery } from '../../api/redux.api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIsMainLoading } from '../../store/reducers/isLoading';
import { setCards } from '../../store/reducers/cards';
// import { useAppSelector } from '../../hooks/redux';

function SearchPage() {
  const { spellsRequest } = useContext(SpellsRequestContext);
  // const [searchWord, setSearchWord] = useState(chooseSearchWord());
  // const [isLoading, setIsLoading] = useState(false);
  // const [limitPerPage, setLimitPerPage] = useState(chooseLimit());
  // const [page, setPage] = useState(choosePage());
  const [isNextPageActive] = useState(false);

  const page = useAppSelector((state) => state.queryParamsReducer.page);
  const limitPerPage = useAppSelector(
    (state) => state.queryParamsReducer.limit
  );
  const searchWord = useAppSelector(
    (state) => state.queryParamsReducer.searchParams
  );
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetSpellsQuery({
    limitPerPage,
    page,
    searchWord,
  });
  dispatch(setIsMainLoading(isLoading));
  dispatch(setCards(data));
  console.log(data, isLoading);

  // useEffect(() => {
  //   setSearchParams({ page: page, limit: limitPerPage });

  //   const onClickSearch = async (): Promise<
  //     SpellsRequestData[] | undefined
  //   > => {
  //     setIsNextPageActive(false);
  //     // setIsLoading(true);
  //     setIsErrorRequest(false);
  //     setSpellsRequest([]);

  //     const requestObj: SpellsRequest | void = await findSpells(
  //       request,
  //       limitPerPage,
  //       page
  //     );

  //     if (
  //       requestObj &&
  //       requestObj.data instanceof Array &&
  //       requestObj.data.length !== 0 &&
  //       requestObj.meta.pagination
  //     ) {
  //       const isNextPage = !!requestObj.meta.pagination.next;
  //       setIsNextPageActive(isNextPage);
  //       const requestArr = requestObj.data;
  //       setSpellsRequest(requestArr);
  //       // setIsLoading(false);
  //       localStorage.setItem('inputValue', request);
  //       return requestArr;
  //     } else {
  //       localStorage.setItem('inputValue', request);
  //       // setIsLoading(false);
  //       setIsErrorRequest(true);
  //     }
  //   };

  //   onClickSearch();
  // }, [request, limitPerPage, page, setSpellsRequest]);

  return (
    <div className={styles.searchPage}>
      <SearchBlock />
      <div className={styles.searchDetails}>
        <ErrorButton />
        <LimitInput />
      </div>
      {isLoading && <div className={styles.spinner}></div>}
      {!isLoading && <SearchResult />}
      {spellsRequest.length !== 0 && (
        <Pagination isNextPageActive={isNextPageActive} />
      )}
    </div>
  );
}

export default SearchPage;
