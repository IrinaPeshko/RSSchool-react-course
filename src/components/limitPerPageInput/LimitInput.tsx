import { useState } from 'react';

import styles from './LimitInput.module.css';
import { setLimit, setPage } from '../../store/reducers/queryParams';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const LimitInput = () => {
  const dispatch = useAppDispatch();
  const limit = useAppSelector((state) => state.queryParamsReducer.limit);
  const [itemPerPage, setItemPerPage] = useState(limit);

  const onAcceptClick = () => {
    dispatch(setLimit(itemPerPage));
    dispatch(setPage('1'));
  };
  return (
    <>
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
    </>
  );
};
export default LimitInput;
