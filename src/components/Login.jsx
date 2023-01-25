import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      username: '',
      email: '',
      password: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleGuestClick = this.handleGuestClick.bind(this);
  }

  async handleClick() {
    const {
      username,
      email,
      password,
    } = this.state;
    const { history } = this.props;
    await createUser({
      username,
      email,
      password,
    });
    history.push('/search');
  }

  async handleGuestClick() {
    const { history } = this.props;
    await createUser({
      username: 'Convidado',
    });
    history.push('/search');
  }

  onInputChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      this.validateUser();
    });
  }

  validateUser() {
    const {
      username,
      email,
      password,
    } = this.state;
    const MIN_USERNAME_LENGTH = 3;
    const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const MIN_PASSWORD_LENGTH = 6;
    const validUsername = username.length >= MIN_USERNAME_LENGTH;
    const validEmail = EMAIL_REGEX.test(email);
    const validPassword = password.length >= MIN_PASSWORD_LENGTH;
    if (validEmail && validUsername && validPassword) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div className="page login_page">
        <section className="login_container">
          <h1 className="title login_title">Login</h1>
          <form className="login_form">
            <label className="label username_label" htmlFor="username">
              <input
                className="input username_input"
                type="text"
                name="username"
                placeholder="Nome de usuário"
                onChange={ this.onInputChange }
              />
            </label>
            <label className="label email_label" htmlFor="email">
              <input
                className="input email_input"
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={ this.onInputChange }
              />
            </label>
            <label className="label password_label" htmlFor="password">
              <input
                className="input password_input"
                type="password"
                name="password"
                placeholder="Senha"
                onChange={ this.onInputChange }
              />
            </label>
            <div className="buttons_container">
              <button
                className="button login_submit_button"
                type="button"
                disabled={ buttonDisabled }
                onClick={ this.handleClick }
              >
                ENTRAR
              </button>
              <button
                className="button login_guest_button"
                type="button"
                onClick={ this.handleGuestClick }
              >
                Entrar como Convidado
              </button>
            </div>
          </form>
        </section>
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
