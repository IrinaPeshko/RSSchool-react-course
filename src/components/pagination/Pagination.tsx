import styles from './Pagination.module.css';
import { useAppDispatch } from '../../hooks/redux';
import { setPage } from '../../store/reducers/queryParams';
import { useRouter } from 'next/router';

const Pagination = (props: { isNextPage: boolean }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { limit, search } = router.query;
  let { page } = router.query;
  page = checkRouterElement(page, '10');
  if (+page < 1) {
    dispatch(setPage('1'));
    page = '1';
  }
  const isNextPageActive = props.isNextPage;

  const onPrevBtnClick = () => {
    page = checkRouterElement(page, '10');
    router.push({
      query: { limit, page: `${+page - 1}`, search },
    });
  };

  const onNextBtnClick = () => {
    page = checkRouterElement(page, '10');
    router.push({
      query: { limit, page: `${+page + 1}`, search },
    });
  };

  const classNames = (...args: string[]) => {
    return args.filter(Boolean).join(' ');
  };

  const disabledPrev = +page === 1;
  console.log(disabledPrev);
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

function checkRouterElement(
  element: string | string[] | undefined,
  defaultValue: string
) {
  return Array.isArray(element) ? element[0] : element ? element : defaultValue;
}
