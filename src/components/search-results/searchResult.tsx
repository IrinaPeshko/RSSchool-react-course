import styles from './searchResult.module.css';
import SearchCard from '../search-card/SearchCard';
import { SpellsRequestData } from '../../types/requests-types';

function SearchResult(props: {
  peopleRequest: SpellsRequestData[];
}) {
    const results = props.peopleRequest.map((el) => {
      const attribute = el.attributes
      if (attribute) {
        return (
          <SearchCard
            key={el.id}
            name={el.attributes.name}
            effect={el.attributes.effect}
            image={el.attributes.image}
            category={el.attributes.category}
            light={el.attributes.light}
            
          />
        );
      }
    });
    return <div className={styles.people__container}>{results}</div>;
  }

export default SearchResult;
