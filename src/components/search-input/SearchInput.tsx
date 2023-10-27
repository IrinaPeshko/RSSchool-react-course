import React from 'react';
import styles from './SearchInput.module.css';
import { findPeople } from '../../api/api';
import SearchResult from '../search-results/searchResult';
import { PersonRequest, ShortPersonRequest } from '../../types/requests-types';

class SearchInput extends React.Component {
  componentDidMount(): void {
    this.onClickSearch();
  }

  chooseSearchWord(): string {
    const value: string | null = localStorage.getItem('inputValue');
    if (value) {
      return value;
    }
    return '';
  }

  state = {
    searchWord: this.chooseSearchWord(),
    peopleRequest: [],
  };

  onClickSearch = async (): Promise<ShortPersonRequest[] | undefined> => {
    const requestArr = await findPeople(this.state.searchWord);
    if (requestArr instanceof Array) {
      const shortRequestArr = requestArr.map((el: PersonRequest) => {
        return {
          name: el.name,
          birth_year: el.birth_year,
          gender: el.gender,
          height: el.height,
          eye_color: el.eye_color,
          hair_color: el.hair_color,
          url: el.url,
        };
      });
      this.setState({ peopleRequest: shortRequestArr });
      localStorage.setItem('inputValue', this.state.searchWord);
      return shortRequestArr;
    }
  };

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ searchWord: event.target.value });
    }
  };

  render() {
    return (
      <>
        <div className={styles.searchBlock}>
          <input
            placeholder="Search..."
            type="text"
            className={styles.searchInput}
            value={this.state.searchWord}
            onChange={this.onChangeInput}
          />
          <div className={styles.searchButton} onClick={this.onClickSearch}>
            <img src="/magnifier-glass.png" alt="magnifier-glass" />
          </div>
        </div>
        <div>
          <SearchResult renderRequest={this.state.peopleRequest} />
        </div>
      </>
    );
  }
}

export default SearchInput;
