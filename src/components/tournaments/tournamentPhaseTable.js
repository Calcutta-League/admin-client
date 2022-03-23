import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { useAuthState } from '../../context/authContext';
import TournamentService from '../../services/tournament/tournament.service';
import { TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';

const { Column } = Table;

function TournamentPhaseTable(props) {

  const [phases, setPhases] = useState([]);
  const [phasesLoading, setPhasesLoading] = useState(true);

  const { authenticated, token } = useAuthState();

  useEffect(() => {
    if (!!authenticated) {
      fetchPhases();
    }
  }, [authenticated]);

  const fetchPhases = () => {
    TournamentService.callApi(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_PHASES, { tournamentId: props.tournamentId, token: token }).then(res => {
      let data = res.data;

      if (data.length > 0) {
        setPhases(data);
      }
      setPhasesLoading(false);
    }).catch(error => {
      console.log(error);
      setPhasesLoading(false);
    })
  }

  const deletePhase = (phaseId) => {
    console.log(phaseId);
    // TODO: display warning popup
    // 1. flips table loading flag
    // 2. calls delete endpoint
    // 3. calls fetchPhases()
    message.error('Not Implemented Yet');
  }

  return (
    <Table
      dataSource={phases}
      loading={phasesLoading}
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
              danger
              size='small'
              onClick={() => { deletePhase(record.TournamentPhaseId) }}
            >
              Delete
            </Button>
          )
        }}
      />
    </Table>
  );
}

export default TournamentPhaseTable;