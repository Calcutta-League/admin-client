import { GAME_SERVICE_ENDPOINTS } from '../../utilities/constants';

export const gameEndpoints = {
  getSportOptions: function(apiService, params) {
    console.log('getSportOptions call');
    console.log(params);
    let options = {
      method: 'GET',
      url: GAME_SERVICE_ENDPOINTS.GET_SPORT_OPTIONS
    }

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token };
    }

    return apiService(options);
  },

  getGamesBySportId: function(apiService, params) {
    let options = {
      method: 'GET',
      url: `${GAME_SERVICE_ENDPOINTS.GET_GAMES_BY_SPORT_ID}/${params.sportId}/${params.gameDate}`
    };

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token };
    }

    return apiService(options);
  },

  updateScores: function(apiService, params) {
    let options = {
      method: 'POST',
      url: GAME_SERVICE_ENDPOINTS.UPDATE_SCORES
    };

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token };
    }

    if (params.data !== undefined && typeof params.data == 'object') {
      options.data = params.data;
    }

    console.log(options);

    return apiService(options);
  }
};