import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpenses, getCoinApi, sumTotalValue } from '../redux/actions';
import fetchAPI from '../services/fetchAPI';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(getCoinApi());
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  dispatchSubmitToAction = async () => {
    const { dispatch, expenses } = this.props;
    const id = expenses.length;
    const dataAPI = await fetchAPI();
    delete dataAPI.USDT;
    const { value, description, currency, method, tag } = this.state;
    dispatch(addExpenses({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: dataAPI,
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.dispatchSubmitToAction();
    const { expenses } = this.props;
    await this.calculateTotalValue(expenses);
    this.setState({
      value: '',
      description: '',
    });
  };

  calculateTotalValue = (expenses) => {
    const { dispatch } = this.props;
    dispatch(sumTotalValue(expenses.reduce((sum, { value, currency, exchangeRates }) => {
      sum += value * exchangeRates[currency].ask;
      return sum;
    }, 0)));
  };

  render() {
    const { currencies } = this.props;
    const { description, value } = this.state;
    return (
      <form onSubmit={ this.handleSubmit } className="form-container">
        <label htmlFor="value-input">
          Valor:
          <input
            type="text"
            className="value-input"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            className="description-input"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="select-coin">
          Moeda:
          <select
            className="select-coin"
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
          >
            { currencies.map((currencie) => (
              <option
                value={ currencie }
                key={ currencie }
              >
                {currencie}
              </option>
            )) }
          </select>
        </label>

        <label htmlFor="method-select">
          Método de pagamento:
          <select
            className="method-select"
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option
              name="method"
              value="Dinheiro"
            >
              Dinheiro

            </option>
            <option
              name="method"
              value="Cartão de crédito"
            >
              Cartão de crédito

            </option>
            <option
              name="method"
              value="Cartão de débito"
            >
              Cartão de débito

            </option>
          </select>
        </label>

        <label htmlFor="category-select">
          Tag:
          <select
            className="category-select"
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option
              name="tag"
              value="Alimentação"
            >
              Alimentação

            </option>
            <option
              name="tag"
              value="Lazer"
            >
              Lazer
            </option>
            <option
              name="tag"
              value="Trabalho"
            >
              Trabalho
            </option>
            <option
              name="tag"
              value="Transporte"
            >
              Transporte
            </option>
            <option
              name="tag"
              value="Saúde"
            >
              Saúde
            </option>
          </select>
        </label>

        <button>Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
