import styles from './searchResult.module.css';
import { ShortPersonRequest } from '../../types/requests-types';
import SearchCard from '../search-card/SearchCard';

function SearchResult(props: { renderRequest: ShortPersonRequest[] }) {
  const results = props.renderRequest.map((el, i) => {
    return (
      <SearchCard
        key={i}
        name={el.name}
        birth_year={el.birth_year}
        gender={el.gender}
        height={el.height}
        eye_color={el.eye_color}
        hair_color={el.hair_color}
      />
    );
  });
  return <div className={styles.people__container}>{results}</div>;
}

export default SearchResult;
