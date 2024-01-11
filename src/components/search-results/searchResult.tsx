import React, { Component } from 'react';
import styles from './searchResult.module.css';
import { iRenderRequest } from '../../types/requests-types';

class SearchResult extends Component<iRenderRequest> {
  render(): React.ReactNode {
    const results = this.props.renderRequest.map((el, i) => {
      return (
        <div key={i} className={styles.person__info}>
          <h2 className={styles.glow}>{el.name}</h2>
          <p>Year of birth: {el.birth_year}</p>
          <p>Gender: {el.gender}</p>
          <p>Height: {el.height}</p>
          <p>Eye color: {el.eye_color}</p>
          <p>Hair color: {el.hair_color}</p>
        </div>
      );
    });
    return <div className={styles.people__container}>{results}</div>;
  }
}

export default SearchResult;
