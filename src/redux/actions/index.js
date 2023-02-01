// Coloque aqui suas actions
import fetchAPI from '../../services/fetchAPI';

export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export const addEmail = (payload) => ({
  type: ADD_LOGIN,
  payload,
});

export const addCurrencies = (payload) => ({
  type: ADD_CURRENCIES,
  payload,
});

export const getCoinApi = () => async (dispatch) => {
  const apiValues = await fetchAPI();
  delete apiValues.USDT;
  dispatch(addCurrencies(Object.keys(apiValues)));
};
