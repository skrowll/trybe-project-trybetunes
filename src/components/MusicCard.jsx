import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorites: [],
      checked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.setFavoritesState = this.setFavoritesState.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);
  }

  async componentDidMount() {
    await this.setFavoritesState();
    this.checkFavorite();
  }

  async handleChange({ target }) {
    const { value } = target;
    this.setState({ loading: true });
    await addSong(value);
    await this.setFavoritesState();
    this.checkFavorite();
    this.setState({ loading: false });
  }

  async setFavoritesState() {
    const favoritesSongs = await getFavoriteSongs();
    this.setState({ favorites: favoritesSongs });
  }

  checkFavorite() {
    const { favorites } = this.state;
    const { trackId } = this.props;
    if (favorites.includes(trackId.toString())) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
  }

  render() {
    const { trackName } = this.props;
    const { previewUrl } = this.props;
    const { trackId } = this.props;
    const { loading } = this.state;
    const { checked } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {loading
          ? (
            <Loading />
          )
          : (
            <div>
              <label htmlFor="favorite">
                <input
                  type="checkbox"
                  name="favorite"
                  value={ trackId }
                  onChange={ this.handleChange }
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ checked }
                />
                Favorita
              </label>
            </div>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
