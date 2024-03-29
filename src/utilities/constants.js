export const API_CONFIG = {
  GAME_SERVICE_BASE_URL: process.env.REACT_APP_BUILD_ENV == 'dev' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_API_URL,
  TOURNAMENT_SERVICE_BASE_URL: process.env.REACT_APP_BUILD_ENV == 'dev' ? process.env.REACT_APP_DEV_TOURNAMENT_SERVICE_API_URL : process.env.REACT_APP_TOURNAMENT_SERVICE_API_URL,
  SPORTS_SERVICE_BASE_URL: process.env.REACT_APP_BUILD_ENV == 'dev' ? process.env.REACT_APP_DEV_SPORTS_SERVICE_API_URL : process.env.REACT_APP_SPORTS_SERVICE_API_URL,
  TOURNAMENT_SETTINGS_SERVICE_BASE_URL: process.env.REACT_APP_BUILD_ENV == 'dev' ? process.env.REACT_APP_DEV_TOURNAMENT_SETTINGS_SERVICE_API_URL : process.env.REACT_APP_TOURNAMENT_SETTINGS_SERVICE_API_URL,
  MANAGEMENT_SERVICE_BASE_URL: process.env.REACT_APP_BUILD_ENV == 'dev' ? process.env.REACT_APP_DEV_MANAGEMENT_SERVICE_API_URL : process.env.REACT_APP_MANAGEMENT_SERVICE_API_URL
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
  NEW_TOURNAMENT_SLOT: '/newTournamentSlot',
  DELETE_TOURNAMENT_PHASE: '/deleteTournamentPhase',
  DELETE_TOURNAMENT_REGIME: '/deleteTournamentRegime',
  DELETE_TOURNAMENT: '/deleteTournament',
  SET_TOURNAMENT_ADMIN_FLAG: '/setTournamentAdminFlag',
  SET_TOURNAMENT_DISABLED_FLAG: '/setTournamentDisabledFlag',
  SET_TOURNAMENT_REGIME_PHASES: '/setTournamentRegimePhases',
  SET_TOURNAMENT_REGIME_DESCRIPTION: '/setTournamentRegimeDescription',
  SET_TOURNAMENT_REGIME_BRACKET_TYPE: '/setTournamentRegimeBracketType',
  SET_TOURNAMENT_REGIME_DISABLED_FLAG: '/setTournamentRegimeDisabledFlag',
  SET_TOURNAMENT_REGIME_ADMIN_FLAG: '/setTournamentRegimeAdminFlag',
  UPDATE_TOURNAMENT_SLOT: '/updateTournamentSlot',
  OVERRIDE_TOURNAMENT_STATUS: '/overrideTournamentStatus'
};

export const SPORTS_SERVICE_ENDPOINTS = {
  GET_SPORTS: '/getSports',
  GET_TEAMS_BY_SPORT_ID: '/getTeamsBySportId'
};

export const TOURNAMENT_SETTINGS_SERVICE_ENDPOINTS = {
  GET_PAYOUT_SETTINGS: '/getPayoutSettings',
  GET_PAYOUT_TYPES: '/getPayoutTypes',
  SET_PAYOUT_SETTINGS: '/setPayoutSettings',
  DELETE_PAYOUT_SETTINGS: '/deletePayoutSettings'
};

export const MANAGEMENT_SERVICE_ENDPOINTS = {
  GET_LEGACY_LEAGUES: '/getLegacyLeagues',
  SYNC_LEAGUE: '/syncLeague',
  BATCH_SYNC_LEAGUES: '/batchSyncLeagues',
  SKIP_SYNC: '/skipSync',
  SYNCHRONIZE_SLOTS: '/synchronizeSlots'
};