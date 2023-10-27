import styles from './App.module.css';
import SearchInput from './search-input/SearchInput';

function App() {
  // request(PEOPLE);
  return (
    <div className={styles.content}>
      <SearchInput />
    </div>
  );
}

export default App;
