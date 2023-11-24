import styles from './Pagination.module.css';
import { useAppDispatch } from '../../hooks/redux';
import { setPage } from '../../store/reducers/queryParams';
import { useRouter } from 'next/router';
import { checkRouterElement } from '@/utils/functions';

const Pagination = (props: { isNextPage: boolean }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { search } = router.query;
  let { page, limit } = router.query;
  page = checkRouterElement(page, '1');
  if (+page < 1) {
    dispatch(setPage('1'));
    page = '1';
  }
  const isNextPageActive = props.isNextPage;

  const onPrevBtnClick = () => {
    page = checkRouterElement(page, '1');
    limit = checkRouterElement(limit, '10');
    if (router.pathname === '/') {
      if (search) {
        router.push({
          query: { page: `${+page - 1}`, limit, search },
        });
      } else {
        router.push({
          query: { page: `${+page - 1}`, limit },
        });
      }
    }
  };

  const onNextBtnClick = () => {
    page = checkRouterElement(page, '1');
    limit = checkRouterElement(limit, '10');
    if (router.pathname === '/') {
      if (search) {
        router.push({
          query: { page: `${+page + 1}`, limit, search },
        });
      } else {
        router.push({
          query: { page: `${+page + 1}`, limit },
        });
      }
    }
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
