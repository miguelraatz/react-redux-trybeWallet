import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, sumTotal } = this.props;
    return (
      <div className="header-container">
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{sumTotal.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  sumTotal: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  sumTotal: globalState.wallet.sumTotal,
});

export default connect(mapStateToProps)(Header);
