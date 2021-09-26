import React from 'react';
import { TournamentProvider } from '../../context/tournamentContext';
import TournamentTable from './tournamentTable';

function Tournaments() {

  return (
    <TournamentProvider>
      <TournamentTable />
      {/* New tournament button */}
    </TournamentProvider>
  );
}

export default Tournaments;