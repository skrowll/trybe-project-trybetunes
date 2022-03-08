import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
  }

  onInputChange({ target }) {
    const MIN_LENGTH = 2;
    const { value } = target;
    if (value.length >= MIN_LENGTH) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        <form>
          <label htmlFor="artist">
            <input
              type="text"
              name="artist"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            onClick={ this.handleClick }
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
