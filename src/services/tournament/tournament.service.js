import ApiService from "../apiService";
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from "../../utilities/constants";
import { tournamentEndpoints } from "./tournament.endpoints";

var TournamentService = (function() {
  var instance;

  function createInstance() {
    var api = new ApiService(API_CONFIG.TOURNAMENT_SERVICE_BASE_URL);
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
TournamentService.newEndpoint(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENTS, tournamentEndpoints.getTournaments);

export default TournamentService;