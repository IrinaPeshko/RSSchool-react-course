import styles from './searchResult.module.css';
import SearchCard from '../search-card/SearchCard';
import { SpellsRequestData } from '../../types/requests-types';
import { Link } from 'react-router-dom';

function SearchResult(props: { peopleRequest: SpellsRequestData[] }) {
  const results = props.peopleRequest.map((el) => {
    const attribute = el.attributes;
    if (attribute) {
      return (
        <Link
          to={`/details/${el.id}`}
          key={el.attributes.slug}
          className={styles.searchCard}
        >
          <SearchCard
            name={el.attributes.name}
            effect={el.attributes.effect}
            image={el.attributes.image}
            category={el.attributes.category}
            light={el.attributes.light}
          />
        </Link>
      );
    }
  });
  return <div className={styles.people__container}>{results}</div>;
}

export default SearchResult;
