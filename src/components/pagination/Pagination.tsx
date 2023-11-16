import { useDispatch } from 'react-redux';
import styles from './Pagination.module.css';
import { useAppSelector } from '../../hooks/redux';
import { setPage } from '../../store/reducers/queryParams';

const Pagination = (props: { isNextPageActive: boolean }) => {
  const dispatch = useDispatch();
  const page = useAppSelector((state) => state.queryParamsReducer.page);

  const onPrevBtnClick = () => {
    dispatch(setPage(`${+page - 1}`));
    localStorage.setItem('page', `${+page - 1}`);
  };

  const onNextBtnClick = () => {
    dispatch(setPage(`${+page + 1}`));
    localStorage.setItem('page', `${+page + 1}`);
  };

  const classNames = (...args: string[]) => {
    return args.filter(Boolean).join(' ');
  };

  const disabledPrev = +page === 1;
  const disabledNext = !props.isNextPageActive;

  const classNamePrevPage = classNames(disabledPrev ? styles.disabled : '');

  const classNameNextPage = classNames(
    !props.isNextPageActive ? styles.disabled : ''
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
        disabled={disabledNext}
        data-testid={'nextBtn'}
      >
        next
      </button>
    </div>
  );
};
export default Pagination;
