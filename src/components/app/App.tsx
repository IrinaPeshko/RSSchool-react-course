import styles from './App.module.css';
import SearchPage from '../search-page/SearchPage';
import ErrorBoundary from '../error-boundary/ErrorBoundary';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <div className={styles.content}>
          <SearchPage />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
