import React from 'react';
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
        { loading
          ? <Loading />
          : <p data-testid="header-user-name">{ username }</p> }
      </header>
    );
  }
}

export default Header;
