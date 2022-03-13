import React from 'react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { customRender, screen, cleanup, waitFor } from '../../../utilities/test-utils';
import userEvent from '@testing-library/user-event';
import GameSelection from '../gameSelection';
import { API_CONFIG, GAME_SERVICE_ENDPOINTS } from '../../../utilities/constants';

const server = setupServer(
  rest.get(API_CONFIG.GAME_SERVICE_BASE_URL + GAME_SERVICE_ENDPOINTS.GET_SPORT_OPTIONS, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
          { id: 1, name: 'Test Sport 1 '},
          { id: 2, name: 'Test Sport 2' }
        ]
      )
    );
  })
);

beforeAll(() => server.listen());

afterAll(() => server.close());

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  server.resetHandlers();
});

test('calls api on authenticated mount', async () => {
  customRender(<GameSelection />, { provider: 'game', authProps: { authenticated: true }});
  
  userEvent.click(screen.getByRole('combobox'));
  await waitFor(() => screen.getByText('Test Sport 1'));
  expect(screen.getByText('Test Sport 1')).toBeInTheDocument();
  expect(screen.getByText('Test Sport 2')).toBeInTheDocument();
});