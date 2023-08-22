import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Select, DatePicker } from 'antd';
import { useGameState, useGameDispatch } from '../../context/gameContext';
import GameService from '../../services/games/games.service';
import { GAME_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import { getDatePickerStyleByDate, getGamesCountByDate } from './helper';

const { Option } = Select;

function GameSelection() {

  const { sportId, sportsOptions, gamesMetadataArr } = useGameState();
  const { authenticated, token } = useAuthState();

  const gameDispatch = useGameDispatch();

  useEffect(() => {
    if (!!authenticated) {
      getSportOptions();
    }
  }, [authenticated]);

  const getSportOptions = () => {
    GameService.callApi(GAME_SERVICE_ENDPOINTS.GET_SPORT_OPTIONS, { token: token }).then(data => {
      gameDispatch({ type: 'update', key: 'sportsOptions', value: data.data });
    }).catch(error => {
      console.log(error);
    });
  }

  const generateOptions = () => {
    if (sportsOptions != undefined && sportsOptions.length > 0) {
      const options = sportsOptions.map(sport => {
        return <Option value={sport.id} key={sport.id}>{sport.name}</Option>;
      });
  
      return (options);
    }
  }

  const handleSportSelection = (sportId) => {
    gameDispatch({ type: 'update', key: 'sportId', value: sportId });
  }

  const handleDateSelection = (dateObj, dateString) => {
    gameDispatch({ type: 'update', key: 'gameDate', value: dateString });
  }

  return (
    // <Input.Group size='medium'>
      <Row gutter={[0, 32]} justify='center' style={{ marginTop: '16px' }}>
        <Col>
          <Select style={{ width: '280px', margin: '8px 12px' }} value={sportId} onChange={handleSportSelection}>
            {generateOptions()}
          </Select>
          <DatePicker 
            style={{ width: '280px', margin: '8px 12px', justifyContent: 'center' }}
            onChange={handleDateSelection}
            cellRender={(current) => {
              let [numGames, numUnscoredGames] = getGamesCountByDate(current.format('YYYY-MM-DD'), gamesMetadataArr);

              let style = getDatePickerStyleByDate(current.format('YYYY-MM-DD'), numGames, numUnscoredGames);

              return (
                <div className="ant-picker-cell-inner" style={style}>
                  {current.date()}
                </div>
              );
            }}
          />
        </Col>
      </Row>
    // </Input.Group>
  );
}

export default GameSelection;