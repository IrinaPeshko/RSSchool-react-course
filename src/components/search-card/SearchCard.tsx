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
        <div className={styles.imageBlock}>
          {props.image ? (
            <img
              className={styles.cardImg}
              src={props.image}
              alt="spells-image"
            />
          ) : (
            <img
              className={styles.cardImg}
              src="https://static.wikia.nocookie.net/harrypotter/images/4/48/Flipendo_Maxima_HM_Spell_Icon.png"
              alt="spells-image"
            />
          )}
        </div>
        <div className={styles.cardInfo}>
          <p>Effect: {props.effect}</p>
        </div>
      </div>
    </>
  );
};
export default SearchCard;
