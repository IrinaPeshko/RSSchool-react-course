import { useRouter } from 'next/router';
import styles from './Card.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Card = (props: {
  name: string;
  effect: string;
  image: string;
  category: string;
  light: string;
  id: string;
  openDetail?: (id: string) => void;
}) => {
  const router = useRouter();

  return (
    <>
      <Link
        href={`/details/${props.id}`}
        className={styles.searchCard}
        data-testid="card"
        onClick={(event) => {
          if (router.pathname !== '/') {
            event.preventDefault();
          }
        }}
      >
        <div className={styles.person__info}>
          <h2 className={styles.glow}>{props.name}</h2>
          <div className={styles.imageBlock}>
            {props.image ? (
              <Image
                width={90}
                height={170}
                priority={true}
                className={styles.cardImg}
                src={props.image}
                alt="spells-image"
              />
            ) : (
              <Image
                width={90}
                height={170}
                priority={true}
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
      </Link>
    </>
  );
};
export default Card;
