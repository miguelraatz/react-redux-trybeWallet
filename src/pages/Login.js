import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

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
      <div className="login-container">

        <label htmlFor="email-input">
          Email:
          <input
            type="email"
            data-testid="email-input"
            className="email-input"
            name="email"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="password-input">
          Password:
          <input
            type="password"
            data-testid="password-input"
            className="password-input"
            name="password"
            onChange={ this.handleChange }
            value={ password }
          />
        </label>

        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar

        </button>
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
