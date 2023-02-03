// Coloque aqui suas actions
import fetchAPI from '../../services/fetchAPI';

export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_SUM = 'ADD_SUM';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const REPLACE_EXPENSE_EDIT = 'REPLACE_EXPENSE_EDIT';

export const addEmail = (payload) => ({
  type: ADD_LOGIN,
  payload,
});

export const addCurrencies = (payload) => ({
  type: ADD_CURRENCIES,
  payload,
});

export const addExpenses = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});

export const deleteExpenses = (payload) => ({
  type: DELETE_EXPENSES,
  payload,
});

export const editExpenses = (payload) => ({
  type: EDIT_EXPENSES,
  payload,
});

export const addExpenseEdited = (payload) => ({
  type: REPLACE_EXPENSE_EDIT,
  payload,
});

export const getCoinApi = () => async (dispatch) => {
  const apiValues = await fetchAPI();
  delete apiValues.USDT;
  dispatch(addCurrencies(Object.keys(apiValues)));
};
