import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { INITIAL_STATE } from './helpers/globalState';

describe('Testando a rota /carteira', () => {
  it('Testando se a tabela com as despesas contém os títulos corretos', () => {
    const initialEntries = ['/carteira'];
    const { history } = renderWithRouterAndRedux(
      <Wallet />,
      { initialEntries },
    );
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const tableDescriptionHeader = screen.getByRole('columnheader', { name: /descrição/i });
    const tableTagHeader = screen.getByRole('columnheader', { name: /tag/i });
    const tableMethodHeader = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const tableCambioHeader = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const valueConvertedHeader = screen.getByRole('columnheader', { name: /valor convertido/i });
    const coinHeaderConverted = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const buttonAddExpenseHeader = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(tableDescriptionHeader).toBeInTheDocument();
    expect(tableTagHeader).toBeInTheDocument();
    expect(tableMethodHeader).toBeInTheDocument();
    expect(tableCambioHeader).toBeInTheDocument();
    expect(valueConvertedHeader).toBeInTheDocument();
    expect(coinHeaderConverted).toBeInTheDocument();
    expect(buttonAddExpenseHeader).toBeInTheDocument();
  });
  it('Testando se as despesas são inseridas corretamente na tabela', async () => {
    const initialEntries = ['/carteira'];
    const { history } = renderWithRouterAndRedux(
      <Wallet />,
      { initialEntries, initialState: INITIAL_STATE },
    );
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const tableDescriptionBody = screen.getByText(/pastel/i);
    const tableCategoryBody = screen.getByRole('cell', { name: /alimentação/i });
    const tableMethodBody = screen.getByRole('cell', { name: /dinheiro/i });
    const tableValueBody = screen.getByRole('cell', { name: /20/i });
    const tableCambioBody = screen.getByText(/4\.75/i);
    const tableValueConverter = screen.getByRole('cell', { name: /95/i });
    const tableCoinConverter = screen.getByText(/dólar americano\/real brasileiro/i);

    expect(tableDescriptionBody).toBeInTheDocument();
    expect(tableCategoryBody).toBeInTheDocument();
    expect(tableMethodBody).toBeInTheDocument();
    expect(tableValueBody).toBeInTheDocument();
    expect(tableCambioBody).toBeInTheDocument();
    expect(tableValueConverter).toBeInTheDocument();
    expect(tableCoinConverter).toBeInTheDocument();
  });

  it('Testando se o botão de deletar uma despesa é exibido e sua funcionalidade', async () => {
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: INITIAL_STATE },
    );

    const btnDelete = screen.getByTestId('delete-btn');
    expect(btnDelete).toBeInTheDocument();

    const displayValue = screen.getByRole('cell', { name: /20/i });
    expect(displayValue).toBeInTheDocument();
    userEvent.click(btnDelete);

    expect(displayValue).not.toBeInTheDocument();
    expect(store.getState().wallet.expenses.length).toBe(0);
  });

  it('Testando se o botão de editar uma despesa é exibido e sua funcionalidade', async () => {
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: INITIAL_STATE },
    );
    const btnEdit = screen.getAllByTestId('edit-btn');
    userEvent.click(btnEdit[0]);
    const editSaveBtn = screen.getByTestId('edit');
    expect(editSaveBtn).toBeInTheDocument();

    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const selectCoin = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const category = screen.getByTestId('tag-input');

    userEvent.type(inputValue, '15');
    userEvent.type(inputDescription, 'Pastel');
    await waitFor(() => userEvent.selectOptions(selectCoin, 'USD'));
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(category, 'Alimentação');

    await waitFor(() => {
      userEvent.click(editSaveBtn);

      const stateGlobal = store.getState();
      expect(stateGlobal.wallet.expenses[0].value).toBe('1000');
      expect(stateGlobal.wallet.expenses[0].description).toBe('Viagem');
      expect(stateGlobal.wallet.expenses[0].currency).toBe('USD');
      expect(stateGlobal.wallet.expenses[0].method).toBe('Cartão de crédito');
      expect(stateGlobal.wallet.expenses[0].tag).toBe('Lazer');
      expect(stateGlobal.wallet.currencies).toEqual(INITIAL_STATE.wallet.currencies);
    });
  });
});
