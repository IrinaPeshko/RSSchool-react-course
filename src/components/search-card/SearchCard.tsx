import styles from './SearchCard.module.css';

const SearchCard = (props: {
  name: string;
  effect: string;
  image: string;
  category: string;
  light: string;
}) => {
  return (
    <>
      <div className={styles.person__info}>
        <h2 className={styles.glow}>{props.name}</h2>
        {props.image ? (
          <img src={props.image} alt="spells-image" />
        ) : (
          <img
            src="https://static.wikia.nocookie.net/harrypotter/images/4/48/Flipendo_Maxima_HM_Spell_Icon.png"
            alt="spells-image"
          />
        )}
        <p>Effect: {props.effect}</p>
        <p>category: {props.category}</p>
        {props.light ? (
          <p>light: {props.light}</p>
        ) : (
          <p>light: emerald, white or sky blue</p>
        )}
      </div>
    </>
  );
};
export default SearchCard;
