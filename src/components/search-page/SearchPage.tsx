import styles from './SearchPage.module.css';
import SearchResult from '../search-results/searchResult';
import ErrorButton from '../error-button/ErrorButton';
import SearchBlock from '../search-block/SearchBlock';
import LimitInput from '../limitPerPageInput/LimitInput';
import Pagination from '../pagination/Pagination';
import { useEffect } from 'react';
import { useGetSpellsQuery } from '../../api/reduxApi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIsMainLoading } from '../../store/reducers/isLoading';
import { setCards } from '../../store/reducers/cards';
import { useLocation } from 'react-router-dom';
import { setIsNextPage, setLimit, setPage } from '../../store/reducers/queryParams';


function SearchPage() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.queryParamsReducer.page);
  const limitPerPage = useAppSelector((state) => state.queryParamsReducer.limit);
  const searchWord = useAppSelector(
    (state) => state.queryParamsReducer.searchParams
  );

  const { data, isFetching } = useGetSpellsQuery({
    limitPerPage,
    page,
    searchWord,
  });
  
useEffect(() => {
  dispatch(setIsMainLoading(isFetching));
  dispatch(setCards(data?.spells));
  if (data) {
    dispatch(setIsNextPage(data.isNextPage));
  }
}, [data, isFetching]);

useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page');
  const limit = queryParams.get('limit');
  if(page && limit) {
  dispatch(setPage(page));
  dispatch(setLimit(limit));
  }
}, []);

  return (
    <div className={styles.searchPage}>
      <SearchBlock />
      <div className={styles.searchDetails}>
        <ErrorButton />
        <LimitInput />
      </div>
      {isFetching && <div className={styles.spinner}></div>}
      {!isFetching && <SearchResult />}
      {data?.spells.length !== 0 && !isFetching && (
        <Pagination />
      )}
    </div>
  );
}

export default SearchPage;
