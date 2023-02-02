// Coloque aqui suas actions
import fetchAPI from '../../services/fetchAPI';

export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_SUM = 'ADD_SUM';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

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

export const sumTotalValue = (payload) => ({
  type: ADD_SUM,
  payload,
});

export const deleteExpenses = (payload) => ({
  type: DELETE_EXPENSES,
  payload,
});

export const getCoinApi = () => async (dispatch) => {
  const apiValues = await fetchAPI();
  delete apiValues.USDT;
  dispatch(addCurrencies(Object.keys(apiValues)));
};
