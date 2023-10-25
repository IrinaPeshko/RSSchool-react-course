import styles from "./App.module.css";
import SearchInput from './search-input/SearchInput';
import { request, PEOPLE } from '../utils/requests';

function App() {
  function  a (a:any){
    return a
  }
  // request(PEOPLE);
  return (
    <div className={styles.content}>
      <SearchInput />
    </div>
  );
}

export default App;
