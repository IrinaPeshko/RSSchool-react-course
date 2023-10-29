import styles from './App.module.css';
import SearchInput from '../search-input/SearchInput';
import ErrorBoundary from '../error-boundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className={styles.content}>
        <SearchInput />
      </div>
    </ErrorBoundary>
  );
}

export default App;
