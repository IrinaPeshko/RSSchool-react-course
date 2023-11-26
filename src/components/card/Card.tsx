import React from 'react';
import styles from './Card.module.css';
import Link from 'next/link';
import Image from 'next/image';
import staticSpellImg from '../../../public/static-spell.webp';
import { useRouter } from 'next/router';

const Card = (props: {
  name: string;
  effect: string;
  image?: string;
  category: string;
  light: string;
  id: string;
  openDetail?: (id: string) => void;
}) => {
  const router = useRouter();
  const { page, limit, search } = router.query;
  const href = search
    ? {
        pathname: '/details/[id]',
        query: {
          id: props.id,
          page: page || '1',
          limit: limit || '10',
          search: search || '',
        },
      }
    : {
        pathname: '/details/[id]',
        query: {
          id: props.id,
          page: page || '1',
          limit: limit || '10',
        },
      };
  return (
    <>
      <Link
        href={href}
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
              <img
                className={styles.cardImg}
                src={props.image}
                alt="spells-image"
              />
            ) : (
              <Image
                width={140}
                height={170}
                priority={true}
                src={staticSpellImg}
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
