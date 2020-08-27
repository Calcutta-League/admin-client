import React, { Fragment } from 'react';
import GameSelection from './gameSelection';

const columns = [
  {
    title: 'Home',
    dataIndex: 'Team1Name'
  },
  {
    title: 'Score',
    dataIndex: 'Team1Score'
  },
  {
    title: 'Away',
    dataIndex: 'Team2Name'
  },
  {
    title: 'Score',
    dataIndex: 'Team2Score'
  },
  {
    title: 'Date',
    dataIndex: 'EventDate'
  },
  {
    title: 'Time',
    dataIndex: 'EventDate'
  }
];

function Games() {

  return (
    <Fragment>
      <GameSelection />
      {/* GamesList */}
    </Fragment>
  );
}

export default Games;