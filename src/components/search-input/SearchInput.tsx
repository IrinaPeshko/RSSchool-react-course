import React from 'react';
import styles from './SearchInput.module.css';
import { findPeople } from '../../api/api';
import SearchResult from '../search-results/searchResult';
import { PersonRequest, ShortPersonRequest } from '../../types/requests-types';
import ErrorButton from '../error-button/ErrorButton';

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
    isLoading: false,
    isErrorRequest: false,
  };

  onClickSearch = async (): Promise<ShortPersonRequest[] | undefined> => {
    const searchWord = this.state.searchWord.trim();
    this.setState({ isLoading: true, isErrorRequest: false });
    const requestArr = await findPeople(searchWord);
    if (requestArr instanceof Array && requestArr.length !== 0) {
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
      this.setState({ peopleRequest: shortRequestArr, isLoading: false });
      localStorage.setItem('inputValue', this.state.searchWord);
      console.log(shortRequestArr);
      return shortRequestArr;
    } else {
      localStorage.setItem('inputValue', this.state.searchWord);
      this.setState({ isLoading: false, isErrorRequest: true });
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
        <ErrorButton />
        {this.state.isLoading && <div className={styles.spinner}></div>}
        {!this.state.isLoading && !this.state.isErrorRequest && (
          <SearchResult renderRequest={this.state.peopleRequest} />
        )}
        {this.state.isErrorRequest && (
          <h2>We couldn&apos;t find anything matching your request.</h2>
        )}
      </>
    );
  }
}

export default SearchInput;
