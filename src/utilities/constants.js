export const API_CONFIG = {
  GAME_SERVICE_BASE_URL: process.env.REACT_APP_BUILD_ENV == 'dev' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_API_URL,
  TOURNAMENT_SERVICE_BASE_URL: process.env.REACT_APP_BUILD_ENV == 'dev' ? process.env.REACT_APP_DEV_TOURNAMENT_SERVICE_API_URL : process.env.REACT_APP_TOURNAMENT_SERVICE_API_URL,
  SPORTS_SERVICE_BASE_URL: process.env.REACT_APP_BUILD_ENV == 'dev' ? process.env.REACT_APP_DEV_SPORTS_SERVICE_API_URL : process.env.REACT_APP_SPORTS_SERVICE_API_URL
}

export const GAME_SERVICE_ENDPOINTS = {
  GET_SPORT_OPTIONS: '/getSportOptions',
  GET_GAMES_BY_SPORT_ID: '/getGamesBySportId',
  UPDATE_SCORES: '/updateScores',
  GET_GAMES_METADATA: '/getGamesMetadata'
};

export const TOURNAMENT_SERVICE_ENDPOINTS = {
  GET_TOURNAMENTS: '/getTournaments',
  GET_TOURNAMENT_METADATA: '/getTournamentMetadata',
  GET_TOURNAMENT_PHASES: '/getTournamentPhases',
  GET_TOURNAMENT_REGIMES: '/getTournamentRegimes',
  GET_TOURNAMENT_REGIME_PHASES: '/getTournamentRegimePhases',
  GET_TOURNAMENT_REGIME_METADATA: '/getTournamentRegimeMetadata',
  GET_TOURNAMENT_REGIME_SLOTS: '/getTournamentRegimeSlots',
  GET_BRACKET_TYPES: '/getBracketTypes',
  NEW_TOURNAMENT: '/newTournament',
  NEW_TOURNAMENT_PHASE: '/newTournamentPhase',
  NEW_TOURNAMENT_REGIME: '/newTournamentRegime',
  DELETE_TOURNAMENT_PHASE: '/deleteTournamentPhase',
  DELETE_TOURNAMENT_REGIME: '/deleteTournamentRegime'
};

export const SPORTS_SERVICE_ENDPOINTS = {
  GET_SPORTS: '/getSports'
}