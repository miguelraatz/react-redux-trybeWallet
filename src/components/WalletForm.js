import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCoinApi } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(getCoinApi());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div className="form-container">
        <label htmlFor="value-input">
          Valor:
          <input
            type="text"
            className="value-input"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            className="description-input"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="select-coin">
          Moeda:
          <select className="select-coin" data-testid="currency-input" name="select">
            { currencies.map((currencie) => (
              <option value={ currencie } key={ currencie }>{currencie}</option>
            )) }
          </select>
        </label>

        <label htmlFor="method-select">
          Método de pagamento:
          <select className="method-select" data-testid="method-input" name="select">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartão_de_crédito">Cartão de crédito</option>
            <option value="cartão_de_débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="category-select">
          Método de pagamento:
          <select className="category-select" data-testid="tag-input" name="select">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
