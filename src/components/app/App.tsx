import styles from './App.module.css';
import SearchInput from '../search-input/SearchInput';
import ErrorBoundary from '../error-boundary/ErrorBoundary';
import { Component } from 'react';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div className={styles.content}>
          <SearchInput />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
