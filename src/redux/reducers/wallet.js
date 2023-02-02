// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_CURRENCIES, ADD_EXPENSES, ADD_SUM, DELETE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  sumTotal: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case ADD_SUM:
    return {
      ...state,
      sumTotal: action.payload,
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
