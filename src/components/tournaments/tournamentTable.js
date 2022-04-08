import React, { useEffect, useState } from 'react';
import { Col, message, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import { navigate } from '@reach/router';
import { ButtonTableCell } from '../buttonTableCell';
import useData from '../../hooks/useData';

const { Column } = Table;

function TournamentTable() {

  const [tableLoading, setTableLoading] = useState(true);
  const [triggerTournaments, setTriggerTournaments] = useState(null);

  const [deleteTrigger, setDeleteTrigger] = useState(null);
  const [deletePayload, setDeletePayload] = useState(null);
  const [deleteFlag, setDeleteFlag] = useState(false);

  const { authenticated } = useAuthState();

  const [tournaments, tournamentsReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENTS,
    method: 'GET',
    refreshTrigger: triggerTournaments,
    conditions: [authenticated]
  });

  const [deleteTournamentResponse, deleteTournamentReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.DELETE_TOURNAMENT,
    method: 'POST',
    refreshTrigger: deleteTrigger,
    payload: deletePayload,
    conditions: [authenticated, deleteFlag, !!deleteTrigger]
  });

  useEffect(() => {
    if (tournaments && tournaments.length > 0) {
      setTableLoading(false);
    }
  }, [tournamentsReturnDate]);

  useEffect(() => {
    if (deleteTournamentResponse && deleteTournamentResponse.length && deleteTournamentResponse[0]?.Error) {
      message.error(deleteTournamentResponse[0].Error);
    }

    setDeleteFlag(false);
    setTriggerTournaments(new Date().valueOf());
    setTableLoading(true);
  }, [deleteTournamentReturnDate]);

  const tournamentClicked = (tournament) => {
    navigate(`/tournaments/${tournament.TournamentId}`);
  }

  const deleteTournament = (tournamentId) => {
    setDeleteFlag(true);
    setDeletePayload({ tournamentId });
    setDeleteTrigger(new Date().valueOf());
  }

  return (
    <Row justify='center'>
      <Col lg={24} xl={20} xxl={16}>
        <Table
          dataSource={tournaments}
          loading={tableLoading}
          pagination={false}
          onRow={(record) => {
            return {
              onClick: () => { tournamentClicked(record) }
            }
          }}
          rowClassName='row-clickable'
          rowKey='TournamentId'
          size='small'
        >
          <Column
            align='left'
            dataIndex='Name'
            title='Tournament Name'
          />
          <Column
            align='center'
            dataIndex='Sport'
            title='Sport'
          />
          <Column
            align='center'
            dataIndex='Status'
            title='Status'
          />
          <Column
            align='center'
            dataIndex='Leagues'
            title='Leagues'
          />
          <Column
            align='center'
            dataIndex='IsHidden'
            title='Admin Only'
          />
          <Column
            align='center'
            dataIndex='IsDisabled'
            title='Disabled'
          />
          <Column
            align='right'
            width={120}
            render={(text, record) => {
              return (
                <ButtonTableCell
                  type='primary'
                  danger
                  size='small'
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteTournament(record.TournamentId);
                  }}
                >
                  Delete
                </ButtonTableCell>
              );
            }}
          />
        </Table>
      </Col>
    </Row>
  );
}

export default TournamentTable;