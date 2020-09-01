export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_BUILD_ENV == 'dev' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_API_URL
}

export const GAME_SERVICE_ENDPOINTS = {
  GET_SPORT_OPTIONS: '/getSportOptions',
  GET_GAMES_BY_SPORT_ID: '/getGamesBySportId',
  UPDATE_SCORES: '/updateScores'
};