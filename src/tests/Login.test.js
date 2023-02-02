import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes componente Login', () => {
  test('Verifica se renderiza 1 input de email e 1 input de password', () => {
    renderWithRouterAndRedux(<App />);
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
});
