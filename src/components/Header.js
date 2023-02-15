import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div className="header-container">
        <p className="email-header" data-testid="email-field">{email}</p>
        <p
          className="total"
          data-testid="total-field"
        >
          {`R$ ${expenses
            .reduce((sum, { value, currency, exchangeRates }) => {
              sum += value * exchangeRates[currency].ask;
              return sum;
            }, 0).toFixed(2)}`}
        </p>
        <p className="text-brl" data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
