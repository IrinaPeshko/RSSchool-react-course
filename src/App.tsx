import './App.css';
import { request, PEOPLE } from './utils/requests';
function App() {
  request(PEOPLE);
  return (
    <>
      <p>Hello World!</p>
    </>
  );
}

export default App;
