import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes componente Login', () => {
  test('Verifica se renderiza 1 input de email e 1 input de password', () => {
    renderWithRouterAndRedux(<App />);
    screen.logTestingPlaygroundURL();
    const inputEmail = screen.getByText(/email:/i);
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByText(/password:/i);
    expect(inputPassword).toBeInTheDocument();
  });
  test('Verifica se renderiza 1 button de login', () => {
    renderWithRouterAndRedux(<App />);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    expect(buttonLogin).toBeInTheDocument();
  });
  test('Verifica se o botão ativa depois de digitar email e password e também se ao clickar no botão de enviar ele nevega para a rota /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    expect(buttonLogin).toBeDisabled();
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    act(() => {
      userEvent.type(inputEmail, 'teste@teste.com');
      userEvent.type(inputPassword, '123456');
    });
    expect(buttonLogin).toBeEnabled();
    userEvent.click(buttonLogin);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
