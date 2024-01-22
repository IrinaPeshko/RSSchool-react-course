import styles from './App.module.css';
import { useState } from 'react';
import SearchPage from '../search-page/SearchPage';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ErrorBoundary from '../error-boundary/ErrorBoundary';
import { SpellsRequestContext } from '../search-page/Contexts';
import { SpellsRequestData } from '../../types/requests-types';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const spellsArr: SpellsRequestData[] = [];
  const [spellsRequest, setSpellsRequest] = useState(spellsArr);
  return (
    <ErrorBoundary>
      <SpellsRequestContext.Provider
        value={{ spellsRequest, setSpellsRequest }}
      >
        <div className={styles.container}>
          <div
            className={styles.content}
            onClick={() => {
              {
                location.pathname !== '/' && navigate('/');
              }
            }}
          >
            <SearchPage />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </SpellsRequestContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
