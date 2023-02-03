import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpenses, editExpenses } from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => id !== expense.id);
    dispatch(deleteExpenses(newExpenses));
  };

  handleEdit = (expense) => {
    const { dispatch } = this.props;
    dispatch(editExpenses(expense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        {expenses.map((expense) => {
          const valueAsk = expense.exchangeRates[expense.currency].ask;
          return (
            <tbody key={ expense.id }>
              <tr>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(valueAsk).toFixed(2)}</td>
                <td>{(expense.value * valueAsk).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEdit(expense) }
                  >
                    Editar

                  </button>
                  <button
                    onClick={ () => this.handleDelete(expense.id) }
                    data-testid="delete-btn"
                    type="button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(Table);
