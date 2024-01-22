import React from 'react';
import styles from './LimitInput.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { checkRouterElement } from '@/utils/functions';

const LimitButton = () => {
  const router = useRouter();
  const { search } = router.query;
  let { limit } = router.query;
  limit = checkRouterElement(limit, '10');
  const [itemPerPage, setItemPerPage] = useState(limit);

  const onAcceptClick = async () => {
    if (router.pathname === '/') {
      if (search) {
        router.push({
          query: { page: '1', limit: itemPerPage, search },
        });
      } else {
        router.push({
          query: { page: '1', limit: itemPerPage },
        });
      }
    }
  };
  return (
    <div className={styles.container}>
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
      <button onClick={onAcceptClick} data-testid="limitAcceptBtn">
        Accept
      </button>
    </div>
  );
};
export default LimitButton;
