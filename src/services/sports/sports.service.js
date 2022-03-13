import ApiService from '../apiService';
import { API_CONFIG, SPORTS_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { sportsEndpoints } from './sports.endpoints';

var SportsService = (function() {
  var instance;

  function createInstance() {
    var api = new ApiService(API_CONFIG.SPORTS_SERVICE_BASE_URL);
    return api;
  }

  if (!instance) {
    instance = createInstance();
  }
  return instance;
})();

/**
 * Adding each tournament service endpoint to the TournamentService instance
 */
SportsService.newEndpoint(SPORTS_SERVICE_ENDPOINTS.GET_SPORTS, sportsEndpoints.getSports);

export default SportsService;