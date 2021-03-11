
import { getDatePickerStyleByDate, getGamesCountByDate } from '../helper';

describe('getGamesCountByDate', () => {
  test('returns the correct number of games', () => {
    let arr = [
      {
        EventDate: '2020-01-01',
        NumGames: 4,
        NumGamesWithoutScores: 5
      }
    ];

    let [a, b] = getGamesCountByDate('2020-01-01', arr);

    expect(a).toBe(4);
    expect(b).toBe(5);
  });
});

describe('getDatePickerStyleByDate', () => {
  test('returns green border', () => {
    let style = getDatePickerStyleByDate('2020-01-01', 5, 0);

    let expected = {
      border: '1px solid #53c41a',
      borderRadius: '50%'
    };

    expect(style).toMatchObject(expected);
  });

  test('returns red border', () => {
    let style = getDatePickerStyleByDate('2020-01-01', 5, 5);

    let expected = {
      border: '1px solid #ff4d4e',
      borderRadius: '50%'
    };

    expect(style).toMatchObject(expected);
  });
});