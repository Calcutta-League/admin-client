import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { useAuthState } from '../../context/authContext';
import { useTournamentDispatch, useTournamentState } from '../../context/tournamentContext';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import useData from '../../hooks/useData';

const { Column } = Table;

function TournamentRegimePhaseTable() {

  const [regimePhasesLoading, setRegimePhasesLoading] = useState(false);
  const [phases, setPhases] = useState(null);

  const { authenticated } = useAuthState();
  const { selectedRegimeId, regimePhaseRefreshTrigger } = useTournamentState();

  const tournamentDispatch = useTournamentDispatch();

  useEffect(() => {
    return (() => {
      setPhases(null);
    });
  }, []);

  const [regimePhases, regimePhasesReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_PHASES}/${selectedRegimeId}`,
    method: 'GET',
    refreshTrigger: regimePhaseRefreshTrigger,
    conditions: [authenticated, selectedRegimeId]
  });

  useEffect(() => {
    if (selectedRegimeId) {
      setRegimePhasesLoading(true);
      tournamentDispatch({ type: 'update', key: 'regimePhaseRefreshTrigger', value: new Date().valueOf() });
    }
  }, [selectedRegimeId]);

  useEffect(() => {
    // a refresh request has been made, but the fetch hasn't returned yet
    if ((regimePhaseRefreshTrigger || 0) > regimePhasesReturnDate) {
      setRegimePhasesLoading(true);
    }

    // data returned after the latest refresh request
    if ((regimePhaseRefreshTrigger || 0) <= regimePhasesReturnDate) {
      setPhases(regimePhases);
      setRegimePhasesLoading(false);
    }
  }, [regimePhaseRefreshTrigger, regimePhasesReturnDate]);

  const removePhaseFromRegime = (tournamentRegimeId, tournamentPhaseId) => {
    // TODO: implement
    message.error('Not Implemented Yet');
  }

  return (
    <Table
      dataSource={phases}
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