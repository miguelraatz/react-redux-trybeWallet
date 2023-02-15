import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';
import '../Login.css';
import imagem from '../images/wallet.png';

class Login extends React.Component {
  state = {
    isDisabled: true,
    email: '',
    password: '',
  };

  validationButton = () => {
    const { email, password } = this.state;
    const MIN_LENGTH = 6;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const validationEmail = regex.test(email);
    if (validationEmail && password.length >= MIN_LENGTH) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.validationButton);
  };

  handleClick = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled, password } = this.state;
    return (
      <div className="container">
        <div
          className="container-login"
        >
          <img src={ imagem } alt="carteira" />
          <label
            htmlFor="email-input"
            className="label-email"
          >
            <input
              type="email"
              data-testid="email-input"
              className="input-email"
              name="email"
              placeholder="Email"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password-input" className="label-password">
            <input
              placeholder="Password"
              type="password"
              data-testid="password-input"
              className="input-password"
              name="password"
              onChange={ this.handleChange }
              value={ password }
            />
          </label>

          <button
            type="button"
            className="button-login"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
