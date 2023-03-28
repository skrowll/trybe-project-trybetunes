import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: [],
      artistName: '',
      collectionName: '',
      collectionImage: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.getTracks(id);
  }

  async getTracks(id) {
    const response = await getMusics(id);
    this.setState({ tracks: response });
    this.getInfos();
    // console.log(response[1]);
  }

  getInfos() {
    const { tracks } = this.state;
    this.setState({ artistName: tracks[0].artistName });
    this.setState({ collectionName: tracks[0].collectionName });
    this.setState({ collectionImage: tracks[0].artworkUrl100 });
  }

  render() {
    const { tracks, artistName, collectionName, collectionImage } = this.state;
    let a = [];
    let rest = [];
    [a, ...rest] = tracks;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
        {tracks.length > 0
          ? (
            <div>
              <img src={ collectionImage } alt={ a.collectionName } />
              <p data-testid="artist-name">{artistName}</p>
              <p data-testid="album-name">{collectionName}</p>
            </div>
          )
          : <Loading />}
        {tracks.length > 0
          ? (
            rest.map((track) => (
              <MusicCard
                key={ track.trackId }
                trackId={ track.trackId }
                trackName={ track.trackName }
                previewUrl={ track.previewUrl }
                track={ track }
              />
            ))
          )
          : <Loading />}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
