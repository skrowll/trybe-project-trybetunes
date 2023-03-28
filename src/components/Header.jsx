import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ username: user.name });
    this.setState({ loading: false });
  }

  render() {
    const { username, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h2>TrybeTunes</h2>
        {loading
          ? <Loading />
          : <p data-testid="header-user-name">{username}</p>}
        <nav>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
