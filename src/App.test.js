import React from 'react'
import { customRender, screen, cleanup, render } from './utilities/test-utils';
import userEvent from '@testing-library/user-event';
import App from './App';
import { getCurrentSession, signOut } from './services/auth/auth.service';

jest.mock('./services/auth/auth.service');

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test('renders without crashing', () => {
  getCurrentSession.mockResolvedValueOnce({});
  render(<App />);
});

test('clicking signin should show the auth modal', () => {
  getCurrentSession.mockResolvedValueOnce({});
  signOut.mockResolvedValueOnce({});
  render(<App />);

  userEvent.click(screen.getByTestId('signin'));

  expect(screen.getByText('Please Sign In')).toBeInTheDocument();
});