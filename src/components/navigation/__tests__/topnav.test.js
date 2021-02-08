import React from 'react';
import { customRender, screen, cleanup, waitFor } from '../../../utilities/test-utils';
import userEvent from '@testing-library/user-event';
import Topnav from '../topnav';
import { getCurrentSession, signOut } from '../../../services/auth/auth.service';

jest.mock('../../../services/auth/auth.service');


afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test('unauthenticated navbar loads correctly', async () => {
  getCurrentSession.mockResolvedValueOnce({});
  customRender(<Topnav />, {});
  expect(screen.getByTestId('brand')).toHaveTextContent('Admin');
  expect(screen.getByTestId('signin')).toHaveTextContent('Sign In');
});

test('authenticated navbar loads correctly', async () => {
  getCurrentSession.mockResolvedValueOnce({idToken: {jwtToken: 'dummy_token'}});
  customRender(<Topnav />, {});
  await waitFor(() => expect(screen.getByTestId('myaccount')).toHaveTextContent('My Account'));

  userEvent.hover(screen.getByText('My Account'));
  await waitFor(() => screen.getByTestId('signout'));
  expect(screen.getByTestId('signout')).toHaveTextContent('Sign out');

  signOut.mockResolvedValueOnce({});
  await waitFor(() => userEvent.click(screen.getByText('Sign out')));
  expect(signOut).toHaveBeenCalled();
});