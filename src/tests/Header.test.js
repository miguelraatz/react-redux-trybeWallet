import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Teste component Header', () => {
  test('Verifica se o email do estado global é renderizado na tela', () => {
    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
    };
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    const email = screen.getByText(/teste@teste\.com/i);
    const brl = screen.getByText(/brl/i);
    const sumTotalHeader = screen.getByTestId('total-field');
    expect(email).toBeInTheDocument();
    expect(brl).toBeInTheDocument();
    expect(sumTotalHeader).toBeInTheDocument();
  });
});
