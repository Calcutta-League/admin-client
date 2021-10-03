import { TOURNAMENT_SERVICE_ENDPOINTS } from "../../utilities/constants";

export const tournamentEndpoints = {
  getTournaments: function(apiService, params) {
    let options = {
      method: 'GET',
      url: TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENTS
    }

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token };
    }

    return apiService(options);
  },

  getTournamentMetadata: function(apiService, params) {
    let options = {
      method: 'GET',
      url: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_METADATA}/${params.tournamentId}`
    }

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token }
    }

    return apiService(options);
  },

  getTournamentPhases: function(apiService, params) {
    let options = {
      method: 'GET',
      url: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_PHASES}/${params.tournamentId}`
    }

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token }
    }

    return apiService(options);
  },

  getTournamentRegimes: function(apiService, params) {
    let options = {
      method: 'GET',
      url: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIMES}/${params.tournamentId}`
    }

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token }
    }

    return apiService(options);
  },

  getTournamentRegimePhases: function(apiService, params) {
    let options = {
      method: 'GET',
      url: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_PHASES}/${params.tournamentRegimeId}`
    }

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token }
    }

    return apiService(options);
  }
}