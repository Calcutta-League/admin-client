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
  }
}