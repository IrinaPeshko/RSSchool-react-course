import styles from './App.module.css';
import SearchPage from '../search-page/SearchPage';
import ErrorBoundary from '../error-boundary/ErrorBoundary';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const location = useLocation()

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <div
          className={styles.content}
          onClick={() => {
            if (location.pathname !== '/') {
              navigate('/');
            }
          }}
        >
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
