import { useState } from 'react';

import styles from './LimitInput.module.css';
import { useDispatch } from 'react-redux';
import { setLimit, setPage } from '../../store/reducers/queryParams';

const LimitInput = (props: {
  limit: string;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dispatch = useDispatch();
  const [itemPerPage, setItemPerPage] = useState(props.limit);

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
          onChange={(event) => {setItemPerPage(event.target.value)}}
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
