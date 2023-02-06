import { mockData } from '../../../cypress/mocks/data';

const INITIAL_STATE = {
  user: {
    email: 'tryber@teste.com',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '20',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'Pastel',
        exchangeRates: mockData,
      },
    ],
  },
};

const EXPENSE_TWO = {
  user: {
    email: 'tryber@teste.com',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 1,
        value: '1000',
        currency: 'USD',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Viagem',
        exchangeRates: mockData,
      },
    ],
  },
};

export { INITIAL_STATE, EXPENSE_TWO };
