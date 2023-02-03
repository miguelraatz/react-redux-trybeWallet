import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpenses, getCoinApi, addExpenseEdited } from '../redux/actions';
import fetchAPI from '../services/fetchAPI';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
    exchangeRates: {},
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(getCoinApi());
  }

  componentDidUpdate() {
    const { editor, expenseToEdit } = this.props;
    console.log(expenseToEdit);
    const { id } = this.state;
    if (editor && id !== expenseToEdit.id) {
      this.setState({
        value: expenseToEdit.value,
        description: expenseToEdit.description,
        currency: expenseToEdit.currency,
        method: expenseToEdit.method,
        tag: expenseToEdit.tag,
        id: expenseToEdit.id,
        exchangeRates: expenseToEdit.exchangeRates,
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  dispatchSubmitToAction = async () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    const dataAPI = await fetchAPI();
    delete dataAPI.USDT;
    this.setState({ exchangeRates: dataAPI }, () => {
      dispatch(addExpenses(this.state));
      this.setState({
        value: '',
        description: '',
        id: id + 1,
      });
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.dispatchSubmitToAction();
  };

  handleEdit = () => {
    const { dispatch } = this.props;
    dispatch(addExpenseEdited(this.state));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { description, value } = this.state;
    return (
      <form className="form-container">
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

        <button
          type="button"
          onClick={ editor ? this.handleEdit : this.handleSubmit }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenseToEdit: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  editor: wallet.editor,
  expenseToEdit: wallet.expenseToEdit,
});

export default connect(mapStateToProps)(WalletForm);
