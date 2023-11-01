import { useState } from 'react';

// import styles from './LimitInput.module.css';

const LimitInput = (props: {
  limit: string;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [itemPerPage, setItemPerPage] = useState(props.limit);

  const setItemCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setItemPerPage(event.target.value);
    }
  };

  const onAcceptClick = () => {
    props.setLimit(itemPerPage);
  };
  return (
    <>
      <div>
        <input type="number" value={itemPerPage} onChange={setItemCount} />
        <button onClick={onAcceptClick}>Accept</button>
      </div>
    </>
  );
};
export default LimitInput;
