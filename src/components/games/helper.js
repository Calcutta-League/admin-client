
/**
 * @function getGamesCountByDate
 *
 * @param {Number} year 
 * @param {Number} month 
 * @param {Number} date 
 * @param {Object[]} gamesMetadata 
 * @param {Date} gamesMetadata.EventDate
 * @param {Number} gamesMetadata.NumGames
 * @param {Number} gamesMetadata.NumGamesWithoutScores
 * @returns {Array<Number>} returns the number of games and the number of games without scores for a given year/month/date
 */
export const getGamesCountByDate = (current, gamesMetadata) => {
  let numGames = 0;
  let numUnscoredGames = 0;

  let obj = gamesMetadata.find(game => {
    return current === game.EventDate;
  });

  if (obj !== undefined) {
    numGames = obj.NumGames;
    numUnscoredGames = obj.NumGamesWithoutScores;
  }

  return [numGames, numUnscoredGames];
}

/**
 * @function getDatePickerStyleByDate
 * determines how to style each calendar date in the DatePicker component. Red circle if there are unscored games today or in the past, green circle if all games have been scored, blue circle if the date is a future date
 * @param {String} current 
 * @param {Number} numGames 
 * @param {Number} numUnscoredGames 
 * @returns {Object} returns a style object used in the datepicker component
 */
export const getDatePickerStyleByDate = (current, numGames, numUnscoredGames) => {
  let style = {};

  let today = new Date();
  let todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  let currentDate = new Date(current);

  let dateDiff = today.valueOf() - currentDate.valueOf();
  let pastFlag = dateDiff > 0;

  if (numGames > 0 && current !== todayString) {
    if (!pastFlag && numGames > 0) {
      // blue border
      style.border = '1px solid #1890ff';
      style.borderRadius = '50%';
    } else if (pastFlag && numUnscoredGames > 0) {
      // red border
      style.border = '1px solid #ff4d4e';
      style.borderRadius = '50%';
    } else if (pastFlag && numUnscoredGames == 0) {
      // green border
      style.border = '1px solid #53c41a';
      style.borderRadius = '50%';
    }
  }

  return style;
}