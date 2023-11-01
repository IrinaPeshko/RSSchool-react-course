import styles from './SearchBlock.module.css';

const SearchBlock = (props: {
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  onClickSearch: () => void;
}) => {
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      props.setSearchWord(event.target.value);
    }
  };
  return (
    <>
      <div className={styles.searchBlock}>
        <input
          placeholder="Search..."
          type="text"
          className={styles.searchInput}
          value={props.searchWord}
          onChange={onChangeInput}
        />
        <div className={styles.searchButton} onClick={props.onClickSearch}>
          <img src="./magnifier-glass.png" alt="magnifier-glass" />
        </div>
      </div>
    </>
  );
};
export default SearchBlock;
