import React from 'react'
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test('renders without crashing', () => {
  render(<App />);
});

test('clicking signin should show the auth modal', () => {
  render(<App />);

  fireEvent.click(screen.getByTestId('signin'));

  expect(screen.getByText('Please Sign In')).toBeTruthy();
});