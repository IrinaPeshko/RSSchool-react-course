import styles from './Pagination.module.css';

const Pagination = (props: {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  isNextPageActive: boolean;
}) => {
  const onPrevBtnClick = () => {
    if (+props.page > 1) {
      const newPage = `${+props.page - 1}`;
      props.setPage(newPage);
      localStorage.setItem('page', newPage);
    }
  };
  const onNextBtnClick = () => {
    const newPage = `${+props.page + 1}`;
    props.setPage(newPage);
    localStorage.setItem('page', newPage);
  };
  function classNames(...args: string[]) {
    return args.filter(Boolean).join(' ');
  }
  const disabledPrev = +props.page === 1;
  const disabledNext = !props.isNextPageActive;

  const classNamePrevPage = classNames(
    +props.page === 1 ? styles.disabled : ''
  );
  const classNameNextPage = classNames(
    !props.isNextPageActive ? styles.disabled : ''
  );

  return (
    <div className={styles.paginationBlock}>
      <button
        className={classNamePrevPage}
        onClick={onPrevBtnClick}
        disabled={disabledPrev}
      >
        prev
      </button>
      <p>{props.page}</p>
      <button
        className={classNameNextPage}
        onClick={onNextBtnClick}
        disabled={disabledNext}
      >
        next
      </button>
    </div>
  );
};
export default Pagination;
