import React from 'react';
import styles from './SearchInput.module.css';



class SearchInput extends React.Component {
  chooseStateWord(): string {
    localStorage.removeItem('inputValue');
    const value: string | null = localStorage.getItem('inputValue');
    if (value) {
      return value;
    }
    return '';
  }
  state = {
    searchWord: this.chooseStateWord(),
  };

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ searchWord: event.target.value });
    }
  };

  onClickSearch = () => {
    const request = this.state.searchWord
    console.log(request);
  }

  render() {
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
