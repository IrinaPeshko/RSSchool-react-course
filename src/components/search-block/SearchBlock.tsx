import { ShortPersonRequest } from '../../types/requests-types';
import styles from './SearchBlock.module.css';

const SearchBlock = (props: {
  searchWord: string;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSearch: () => Promise<ShortPersonRequest[] | undefined>;
}) => {
  return (
    <>
      <div className={styles.searchBlock}>
        <input
          placeholder="Search..."
          type="text"
          className={styles.searchInput}
          value={props.searchWord}
          onChange={props.onChangeInput}
        />
        <div className={styles.searchButton} onClick={props.onClickSearch}>
          <img src="./magnifier-glass.png" alt="magnifier-glass" />
        </div>
      </div>
    </>
  );
};
export default SearchBlock;
