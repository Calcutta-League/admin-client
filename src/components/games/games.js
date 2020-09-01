import React from 'react';
import GameSelection from './gameSelection';
import { GameProvider } from '../../context/gameContext';
import GamesList from './gamesList';

function Games() {

  return (
    <GameProvider>
      <GameSelection />
      <GamesList />
    </GameProvider>
  );
}

export default Games;