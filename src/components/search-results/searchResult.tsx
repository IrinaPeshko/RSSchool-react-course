import styles from './searchResult.module.css';
import { ShortPersonRequest } from '../../types/requests-types';
import SearchCard from '../search-card/SearchCard';

function SearchResult(props: {
  peopleRequest: ShortPersonRequest[];
  page: string;
  limitPerPage: string;
  // setVisiblePeople: React.Dispatch<React.SetStateAction<ShortPersonRequest[]>>;
}) {
  // const elementsCountTotal = props.peopleRequest.length;
  if (+props.limitPerPage && +props.page) {
    // const pagesCountTotal = elementsCountTotal / +props.limitPerPage;
    const startItem = (+props.page - 1) * +props.limitPerPage;
    const endItem = startItem + +props.limitPerPage;
    const visiblePeople = props.peopleRequest.slice(startItem, endItem);
    console.log(visiblePeople);
    const results = visiblePeople.map((el) => {
      return (
        <SearchCard
          key={el.key}
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
}

export default SearchResult;
