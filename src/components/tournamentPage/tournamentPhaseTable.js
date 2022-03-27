import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { useAuthState } from '../../context/authContext';
import TournamentService from '../../services/tournament/tournament.service';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { ButtonTableCell } from '../buttonTableCell';
import { useTournamentDispatch, useTournamentState } from '../../context/tournamentContext';
import useData from '../../hooks/useData';

const { Column } = Table;

function TournamentPhaseTable(props) {

  const [loading, setLoading] = useState(true);
  const [triggerDelete, setTriggerDelete] = useState(null);
  const [deletePayload, setDeletePayload] = useState(null);
  const [deleteFlag, setDeleteFlag] = useState(false);

  const { authenticated, token } = useAuthState();
  const { tournamentPhaseRefreshTrigger } = useTournamentState();

  const tournamentDispatch = useTournamentDispatch();

  const [phases, phasesReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_PHASES}/${props.tournamentId}`,
    method: 'GET',
    refreshTrigger: tournamentPhaseRefreshTrigger,
    conditions: [authenticated]
  });

  const [deletePhaseResponse, deletePhaseReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.DELETE_TOURNAMENT_PHASE,
    method: 'POST',
    refreshTrigger: triggerDelete,
    payload: deletePayload,
    conditions: [authenticated, deleteFlag]
  });

  useEffect(() => {
    if (deletePhaseResponse[0]?.Error) {
      message.error(deletePhaseResponse[0].Error);
    }

    setDeleteFlag(false);
    tournamentDispatch({ type: 'update', key: 'tournamentPhaseRefreshTrigger', value: new Date().valueOf() });
  }, [deletePhaseReturnDate]);

  useEffect(() => {
    // Phases haven't been downloaded yet, default to loading
    if (!phasesReturnDate) {
      setLoading(true);
    }

    // a refresh request has been made, but the fetch hasn't returned yet
    if ((tournamentPhaseRefreshTrigger || 0) > phasesReturnDate) {
      setLoading(true);
    }

    // data returned after the latest refresh request
    if ((tournamentPhaseRefreshTrigger || 0) <= phasesReturnDate) {
      setLoading(false);
    }
  }, [tournamentPhaseRefreshTrigger, phasesReturnDate]);

  useEffect(() => {
    // disable delete requests
    setDeleteFlag(false);
  }, [deletePhaseReturnDate]);

  const deletePhase = (phaseId) => {
    const data = {
      tournamentPhaseId: phaseId
    };

    // queue up the delete request
    setDeleteFlag(true);
    setDeletePayload(data);
    setTriggerDelete(new Date().valueOf());
  }

  return (
    <Table
      dataSource={phases}
      loading={loading}
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
            <ButtonTableCell
              type='primary'
              danger
              size='small'
              onClick={() => { deletePhase(record.TournamentPhaseId) }}
            >
              Delete  
            </ButtonTableCell>
          )
        }}
      />
    </Table>
  );
}

export default TournamentPhaseTable;