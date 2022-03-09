import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      loading: false,
      inputValue: '',
      artist: '',
      albums: '',
      albumsEmpty: true,
      returnText: '',
      cards: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.displayResponse = this.displayResponse.bind(this);
  }

  async handleClick() {
    this.setState({ loading: true });
    const { inputValue } = this.state;
    const response = await searchAlbumsAPI(inputValue);
    this.setState({ inputValue: '' });
    this.setState({ buttonDisabled: true });
    this.setState({ albums: response });
    this.setState({ loading: false });
    this.displayResponse();
  }

  onInputChange({ target }) {
    const MIN_LENGTH = 2;
    const { value } = target;
    this.setState({
      inputValue: value,
      artist: value,
    });
    if (value.length >= MIN_LENGTH) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  displayResponse() {
    const { albums, artist } = this.state;
    if (albums.length > 0) {
      this.setState({ albumsEmpty: false });
      this.setState({ returnText: `Resultado de álbuns de: ${artist}` });
      this.setState({
        cards: (
          <div>
            {albums.map((album) => (
              <Link
                key={ album.collectionId }
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <p>{album.collectionName}</p>
                <p>{album.artistName}</p>
              </Link>
            ))}
          </div>
        ),
      });
    } else {
      this.setState({ albumsEmpty: true });
      this.setState({ returnText: 'Nenhum álbum foi encontrado' });
    }
  }

  render() {
    const {
      buttonDisabled,
      loading,
      inputValue,
      albumsEmpty,
      returnText,
      cards,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        {loading
          ? <Loading />
          : (
            <div>
              <form>
                <label htmlFor="artist">
                  <input
                    type="text"
                    name="artist"
                    data-testid="search-artist-input"
                    placeholder="Nome do Artista"
                    value={ inputValue }
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
          )}
        <div>
          {albumsEmpty
            ? <p>{returnText}</p>
            : (
              <>
                <p>{returnText}</p>
                {cards}
              </>
            )}
        </div>
      </div>
    );
  }
}

export default Search;
