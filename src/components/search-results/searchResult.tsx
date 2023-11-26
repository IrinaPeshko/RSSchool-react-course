import styles from './searchResult.module.css';
import Card from '../card/Card';
import React from 'react';
import { SpellsRequestData } from '../../types/requests-types';

function SearchResult(props: { spells: SpellsRequestData[] }) {
  const spellsRequest = props.spells;
  return (
    <>
      <div className={styles.spells__container}>
        {!spellsRequest ||
          (spellsRequest.length < 1 && (
            <h2>We couldn&apos;t find anything matching your request.</h2>
          ))}
        {spellsRequest && spellsRequest.map((el) => createCard(el))}
      </div>
    </>
  );
}

function createCard(el: SpellsRequestData) {
  return (
    <div key={el.id} className={styles.searchCard}>
      <div className={styles.person__info}>
        <Card
          name={el.attributes.name}
          effect={el.attributes.effect}
          image={el.attributes.image}
          category={el.attributes.category}
          light={el.attributes.light}
          id={el.id}
        />
      </div>
    </div>
  );
}

export default SearchResult;
