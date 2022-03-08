import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      username: '',
      loading: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    this.setState({ loading: true });
    const { username } = this.state;
    const { history } = this.props;
    await createUser({ name: `${username}` });
    history.push('/search');
  }

  onInputChange({ target }) {
    const MIN_LENGTH = 3;
    const { value } = target;
    if (value.length >= MIN_LENGTH) {
      this.setState({ buttonDisabled: false });
      this.setState({ username: value });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  render() {
    const { buttonDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading
          ? <Loading />
          : (
            <div>
              <p>Login</p>
              <form>
                <label htmlFor="name">
                  <input
                    type="text"
                    name="name"
                    data-testid="login-name-input"
                    placeholder="Nome"
                    onChange={ this.onInputChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ buttonDisabled }
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>
              </form>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
