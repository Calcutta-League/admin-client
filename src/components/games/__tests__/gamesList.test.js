import React from 'react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { customRender, screen, cleanup, waitFor } from '../../../utilities/test-utils';
import userEvent from '@testing-library/user-event';
import { API_CONFIG, GAME_SERVICE_ENDPOINTS } from '../../../utilities/constants';
import GamesList from '../gamesList';
import GameService from '../../../services/games/games.service';

const gameData = [
  { GameId: 1, Team1Id: 2, Team1Name: 'GameOneTeamOne', Team1Seed: 2, Team1Score: null, Team2Id: 3, Team2Name: 'GameOneTeamTwo', Team2Seed: 3, Team2Score: null, Overtime: false, Postponed: false }
];

const server = setupServer(
  rest.get(API_CONFIG.BASE_URL + GAME_SERVICE_ENDPOINTS.GET_GAMES_BY_SPORT_ID + '/:sportId/:gameDate', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(gameData
      )
    );
  }),

  rest.post(API_CONFIG.BASE_URL + GAME_SERVICE_ENDPOINTS.UPDATE_SCORES, (req, res, ctx) => {

  })
);

beforeAll(() => server.listen());

afterAll(() => server.close());

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  server.resetHandlers();
});

test('displays game data properly', async () => {
  customRender(<GamesList />, { provider: 'game', authProps: { authenticated: true }, gameProps: { sportId: 1, gameDate: 'dummy' }});

  await waitFor(() => screen.getByText('(2) GameOneTeamOne'));
  expect(screen.getByText('(2) GameOneTeamOne')).toBeInTheDocument();
  expect(screen.getByText('(3) GameOneTeamTwo')).toBeInTheDocument();
});

test('calls updateScores api with correct data', async () => {
  customRender(<GamesList />, { provider: 'game', authProps: { authenticated: true }, gameProps: { sportId: 1, gameDate: 'dummy' }});

  // wait for table to load the data
  await waitFor(() => screen.getByText('(2) GameOneTeamOne'));

  // insert test data
  let team1Input = screen.getByTestId('1_team1');
  let team2Input = screen.getByTestId('1_team2');
  userEvent.type(team1Input, '69');
  userEvent.type(team2Input, '68');

  jest.mock('../../../services/games/games.service', () => {
    return jest.fn().mockImplementation(() => {
      return {
        callApi: jest.fn((endpoint, params) => {
          return Promise.resolve(true);
        })
      };
    });
  });

  // click submit button
  userEvent.click(screen.getByText('Update Scores'));

  
})