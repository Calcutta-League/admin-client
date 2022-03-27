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
TournamentService.newEndpoint(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_METADATA, tournamentEndpoints.getTournamentMetadata);
TournamentService.newEndpoint(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_PHASES, tournamentEndpoints.getTournamentPhases);
TournamentService.newEndpoint(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIMES, tournamentEndpoints.getTournamentRegimes);
TournamentService.newEndpoint(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_PHASES, tournamentEndpoints.getTournamentRegimePhases);
TournamentService.newEndpoint(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_METADATA, tournamentEndpoints.getTournamentRegimeMetadata);
TournamentService.newEndpoint(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_SLOTS, tournamentEndpoints.getTournamentRegimeSlots);
TournamentService.newEndpoint(TOURNAMENT_SERVICE_ENDPOINTS.NEW_TOURNAMENT, tournamentEndpoints.newTournament);
TournamentService.newEndpoint(TOURNAMENT_SERVICE_ENDPOINTS.NEW_TOURNAMENT_PHASE, tournamentEndpoints.newTournamentPhase);
TournamentService.newEndpoint(TOURNAMENT_SERVICE_ENDPOINTS.DELETE_TOURNAMENT_PHASE, tournamentEndpoints.deleteTournamentPhase);

export default TournamentService;