import { SPORTS_SERVICE_ENDPOINTS } from '../../utilities/constants';

export const sportsEndpoints = {
  getSports: function(apiService, params) {
    let options = {
      method: 'GET',
      url: SPORTS_SERVICE_ENDPOINTS.GET_SPORTS
    }

    if (params.token !== undefined) {
      options.headers = { 'x-cognito-token': params.token }
    }

    return apiService(options);
  }
}