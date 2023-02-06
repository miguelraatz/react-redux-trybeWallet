import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Teste do componente WalletForm', () => {
  test('Testa se renderiza os campos do formulário para preencher e adicionar uma despesa', () => {
    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
    };
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState });
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencySelect = screen.getByTestId('currency-input');
    const methodSelect = screen.getByTestId('method-input');
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencySelect).toBeInTheDocument();
    expect(methodSelect).toBeInTheDocument();
    expect(buttonAdd).toBeInTheDocument();
  });
  test('Teste se ao preencher todos os campos do formulário e adicionar uma despesa ela renderiza na tabela', async () => {
    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
    };
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState });
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencySelect = screen.getByTestId('currency-input');
    const methodSelect = screen.getByTestId('method-input');
    const tagSelect = screen.getByTestId('tag-input');
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'Pastel');
    await waitFor(() => userEvent.selectOptions(currencySelect, 'USD'));
    userEvent.selectOptions(methodSelect, 'Dinheiro');
    userEvent.selectOptions(tagSelect, 'Alimentação');
    userEvent.click(buttonAdd);

    const result = {
      id: 0,
      value: '10',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: 'Pastel',
    };
    await waitFor(() => {
      const stateGlobal = store.getState();
      return expect(stateGlobal.wallet.expenses[0]).toMatchObject(result);
    });
  });
});
