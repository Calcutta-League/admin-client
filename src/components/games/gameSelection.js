import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Select, DatePicker } from 'antd';
import { useGameState, useGameDispatch } from '../../context/gameContext';
import GameService from '../../services/games/games.service';
import { GAME_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';

const { Option } = Select;

function GameSelection() {

  const { sportId, gameDate, sportsOptions } = useGameState();
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
    if (sportsOptions !== undefined) {
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
    <Input.Group size='medium'>
      <Row gutter={[0, 32]} justify='center' style={{ marginTop: '16px' }}>
        <Col>
          <Select style={{ width: '280px', margin: '0 12px' }} value={sportId} onChange={handleSportSelection}>
            {generateOptions()}
          </Select>
          <DatePicker style={{ width: '280px', margin: '0 12px', justifyContent: 'center' }} onChange={handleDateSelection} />
        </Col>
      </Row>
    </Input.Group>
  );
}

export default GameSelection;