import styles from './SearchCard.module.css';

const SearchCard = (props: {
  key: number;
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  eye_color: string;
  hair_color: string;
}) => {
  return (
    <>
      <div className={styles.person__info}>
        <h2 className="person__name">{props.name}</h2>
        <p>Year of birth: {props.birth_year}</p>
        <p>Gender: {props.gender}</p>
        <p>Height: {props.height}</p>
        <p>Eye color: {props.eye_color}</p>
        <p>Hair color: {props.hair_color}</p>
      </div>
    </>
  );
};
export default SearchCard;
