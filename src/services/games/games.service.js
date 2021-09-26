import ApiService from '../apiService';
import { API_CONFIG, GAME_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { gameEndpoints } from './games.endpoints';

var GameService = (function() {
  var instance;

  function createInstance() {
    var api = new ApiService(API_CONFIG.GAME_SERVICE_BASE_URL);
    return api;
  }

  if (!instance) {
    instance = createInstance();
  }
  return instance;
})();

/**
 * Adding each game service endpoint to the GameService instance
 */
GameService.newEndpoint(GAME_SERVICE_ENDPOINTS.GET_SPORT_OPTIONS, gameEndpoints.getSportOptions);
GameService.newEndpoint(GAME_SERVICE_ENDPOINTS.GET_GAMES_BY_SPORT_ID, gameEndpoints.getGamesBySportId);
GameService.newEndpoint(GAME_SERVICE_ENDPOINTS.UPDATE_SCORES, gameEndpoints.updateScores);
GameService.newEndpoint(GAME_SERVICE_ENDPOINTS.GET_GAMES_METADATA, gameEndpoints.getGamesMetadata);

export default GameService;