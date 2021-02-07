import React from 'react';
import { customRender, screen, cleanup } from '../../../utilities/test-utils';
import Topnav from '../topnav';


afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test('brand renders correctly', () => {
  customRender(<Topnav />, {});
  expect(screen.getByTestId('brand')).toHaveTextContent('Admin');
});

test('signin button appears when user is not signed in', () => {
  customRender(<Topnav />, {});
  expect(screen.getByTestId('signin')).toHaveTextContent('Sign In');
});