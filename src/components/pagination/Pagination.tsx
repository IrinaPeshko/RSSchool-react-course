import styles from './Pagination.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setPage } from '../../store/reducers/queryParams';
import { useSearchParams } from 'react-router-dom';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const limit = useAppSelector((store) => store.queryParamsReducer.limit);
  const page = useAppSelector((state) => state.queryParamsReducer.page);
  if (+page < 1) {
    dispatch(setPage('1'));
  }
  const isNextPageActive = useAppSelector(
    (state) => state.queryParamsReducer.isNextPage
  );
  const [, setSearchParams] = useSearchParams();

  const onPrevBtnClick = () => {
    dispatch(setPage(`${+page - 1}`));
    setSearchParams({ limit, page: `${+page - 1}` });
  };

  const onNextBtnClick = () => {
    dispatch(setPage(`${+page + 1}`));
    setSearchParams({ limit, page: `${+page + 1}` });
  };

  const classNames = (...args: string[]) => {
    return args.filter(Boolean).join(' ');
  };

  const disabledPrev = +page === 1;
  const classNamePrevPage = classNames(disabledPrev ? styles.disabled : '');
  const classNameNextPage = classNames(
    !isNextPageActive ? styles.disabled : ''
  );

  return (
    <div className={styles.paginationBlock} data-testid="pagination">
      <button
        className={classNamePrevPage}
        onClick={onPrevBtnClick}
        disabled={disabledPrev}
        data-testid={'prevBtn'}
      >
        prev
      </button>
      <p>{page}</p>
      <button
        className={classNameNextPage}
        onClick={onNextBtnClick}
        disabled={!isNextPageActive}
        data-testid={'nextBtn'}
      >
        next
      </button>
    </div>
  );
};
export default Pagination;
