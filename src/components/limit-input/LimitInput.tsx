import { useState } from 'react';

import styles from './LimitInput.module.css';
import { setLimit, setPage } from '../../store/reducers/queryParams';
import { useAppDispatch } from '../../hooks/redux';
import { useRouter } from 'next/router';

const LimitButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  let { limit } = router.query;
  limit = Array.isArray(limit) ? limit[0] : limit ? limit : '10';
  const [itemPerPage, setItemPerPage] = useState(limit);
  const { search } = router.query;

  const onAcceptClick = async () => {
    await dispatch(setLimit(itemPerPage));
    await dispatch(setPage('1'));
    router.push({
      query: { limit: itemPerPage, page: '1', search },
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
