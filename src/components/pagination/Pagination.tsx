import { ShortPersonRequest } from '../../types/requests-types';
import styles from './Pagination.module.css';

const Pagination = (props: {
  peopleRequest: ShortPersonRequest[];
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  limitPerPage: string;
  // setVisiblePeople: React.Dispatch<React.SetStateAction<ShortPersonRequest[]>>;
}) => {
  const onPrevBtnClick = () => {
    props.setPage(`${+props.page - 1}`);
  };
  const onNextBtnClick = () => {
    props.setPage(`${+props.page + 1}`);
  };
  return (
    <div className={styles.paginationBlock}>
      <button onClick={onPrevBtnClick}>prev</button>
      <p>{props.page}</p>
      <button onClick={onNextBtnClick}>next</button>
    </div>
  );
};
export default Pagination;
