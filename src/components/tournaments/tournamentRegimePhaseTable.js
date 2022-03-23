import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { useAuthState } from '../../context/authContext';
import { useTournamentState } from '../../context/tournamentContext';
import TournamentService from '../../services/tournament/tournament.service';
import { TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';

const { Column } = Table;

function TournamentRegimePhaseTable() {

  const [regimePhases, setRegimePhases] = useState([]);
  const [regimePhasesLoading, setRegimePhasesLoading] = useState(false);

  const { authenticated, token } = useAuthState();
  const { selectedRegimeId } = useTournamentState();

  useEffect(() => {
    if (!!authenticated && selectedRegimeId != undefined) {
      fetchRegimePhases();
    }
  }, [authenticated, selectedRegimeId]);

  const fetchRegimePhases = () => {
    TournamentService.callApi(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_PHASES, { tournamentRegimeId: selectedRegimeId, token: token }).then(res => {
      let data = res.data;
      console.log(data);
      if (data.length > 0) {
        setRegimePhases(data);
      }
      setRegimePhasesLoading(false);
    }).catch(error => {
      console.log(error);
      setRegimePhasesLoading(false);
    });
  }

  const removePhaseFromRegime = (tournamentRegimeId, tournamentPhaseId) => {
    // TODO: implement
    message.error('Not Implemented Yet');
  }

  return (
    <Table
      dataSource={regimePhases}
      loading={regimePhasesLoading}
      pagination={false}
      rowKey='TournamentPhaseId'
      size='small'
    >
      <Column
        align='left'
        dataIndex='Description'
        title='Tournament Phase'
      />
      <Column
        align='center'
        dataIndex='Status'
        title='Status'
      />
      <Column
        align='right'
        render={(text, record) => {
          return (
            <Button
              type='primary'
              size='small'
              danger
              onClick={(event) => {
                event.stopPropagation();
                removePhaseFromRegime(record.TournamentRegimeId, record.TournamentPhaseId);
              }}
            >
              Remove
            </Button>
          )
        }}
      />
    </Table>
  );
}

export default TournamentRegimePhaseTable;