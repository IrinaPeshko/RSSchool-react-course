import styles from './searchResult.module.css';
import SearchCard from '../search-card/SearchCard';
import { SpellsRequestData } from '../../types/requests-types';
import { Link, useLocation } from 'react-router-dom';

function SearchResult(props: { peopleRequest: SpellsRequestData[] }) {
  const location = useLocation();
  // const navigate = useNavigate()
  const results = props.peopleRequest.map((el) => {
    return (
      <div key={el.id} className={styles.searchCard}>
        <Link
          to={`/details/${el.id}`}
          className={styles.searchCard}
          onClick={(event) => {
            if (location.pathname !== '/') {
              event.preventDefault();
            }
          }}
        >
          <div className={styles.person__info}>
            <SearchCard
              name={el.attributes.name}
              effect={el.attributes.effect}
              image={el.attributes.image}
              category={el.attributes.category}
              light={el.attributes.light}
            />
          </div>
        </Link>
      </div>
    );
  });

  return <div className={styles.people__container}>{results}</div>;
}

export default SearchResult;
