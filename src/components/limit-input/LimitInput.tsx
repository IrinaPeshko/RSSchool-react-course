import { useState } from 'react';

import styles from './LimitInput.module.css';
import { setLimit, setPage } from '../../store/reducers/queryParams';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useRouter } from 'next/router';

const LimitButton = () => {
  const dispatch = useAppDispatch();
  const limit = useAppSelector((state) => state.queryParamsReducer.limit);
  const [itemPerPage, setItemPerPage] = useState(limit);
  const router = useRouter();
  // const queryParams = useRouter().query;

  const onAcceptClick = async () => {
    await dispatch(setLimit(itemPerPage));
    await dispatch(setPage('1'));
    router.push({
      query: { limit: itemPerPage, page: '1' },
    });
  };
  return (
    <div>
      <input
        type="number" 
        value={itemPerPage}
        onChange={(event) => {
          setItemPerPage(event.target.value);
        }}
        className={styles.limitInput}
        min="1"
        data-testid="limitInput"
      />
      <button onClick={onAcceptClick}>Accept</button>
    </div>
  );
};
export default LimitButton;
