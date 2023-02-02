import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => id !== expense.id);
    dispatch(deleteExpenses(newExpenses));
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

        {expenses.map((
          {
            description,
            tag,
            method,
            value,
            exchangeRates,
            currency,
            id,
          },
        ) => {
          const valueAsk = exchangeRates[currency].ask;
          return (
            <tbody key={ id }>
              <tr>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(valueAsk).toFixed(2)}</td>
                <td>{(value * valueAsk).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button
                    onClick={ () => this.handleDelete(id) }
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
