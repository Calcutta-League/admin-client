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
  },

  getTournamentRegimeMetadata: function(apiService, params) {
    let options = {
      method: 'GET',
      url: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_METADATA}/${params.tournamentRegimeId}`
    }

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token }
    }

    return apiService(options);
  },

  getTournamentRegimeSlots: function(apiService, params) {
    let options = {
      method: 'GET',
      url: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_SLOTS}/${params.tournamentRegimeId}`
    }

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token }
    }

    return apiService(options);
  },

  newTournament: function(apiService, params) {
    const options = {
      method: 'POST',
      url: TOURNAMENT_SERVICE_ENDPOINTS.NEW_TOURNAMENT
    };

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token }
    }

    if (params.data !== undefined && typeof params.data == 'object') {
      options.data = params.data;
    }

    return apiService(options);
  },

  newTournamentPhase: function(apiService, params) {
    const options = {
      method: 'POST',
      url: TOURNAMENT_SERVICE_ENDPOINTS.NEW_TOURNAMENT_PHASE
    }

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token }
    }

    if (params.data !== undefined && typeof params.data == 'object') {
      options.data = params.data;
    }

    return apiService(options);
  },

  deleteTournamentPhase: function(apiService, params) {
    const options = {
      method: 'POST',
      url: TOURNAMENT_SERVICE_ENDPOINTS.DELETE_TOURNAMENT_PHASE
    }

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token }
    }

    if (params.data !== undefined && typeof params.data == 'object') {
      options.data = params.data;
    }

    return apiService(options);
  }
}