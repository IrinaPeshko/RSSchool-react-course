import React from 'react';
import styles from './SearchInput.module.css';
import { PEOPLE, request } from '../../utils/requests';

class SearchInput extends React.Component {
  componentDidMount(): void {
    this.onClickSearch();
  }

  chooseStateWord(): string {
    localStorage.setItem('inputValue', 'al');
    // localStorage.removeItem('inputValue');
    const value: string | null = localStorage.getItem('inputValue');
    if (value) {
      return value;
    }
    return '';
  }

  state = {
    searchWord: this.chooseStateWord(),
  };

  onClickSearch = async () => {
    const requestWord = this.state.searchWord;
    const link = PEOPLE + '/?search=' + requestWord;
    const requestArr = await request(link);
    this.setState({ peopleRequest: requestArr });
    console.log(requestArr);
    return requestArr;
  };

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ searchWord: event.target.value });
    }
  };

  render() {
    console.log(this.state);
    // this.onClickSearch();
    return (
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
    );
  }
}

export default SearchInput;
