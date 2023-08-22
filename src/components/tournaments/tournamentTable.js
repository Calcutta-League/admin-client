import React, { useEffect, useState } from 'react';
import { Col, message, Row, Table, Space } from 'antd';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import { ButtonTableCell } from '../buttonTableCell';
import useData from '../../hooks/useData';
import { useNavigate } from 'react-router-dom';

const { Column } = Table;

function TournamentTable(props) {

  const navigate = useNavigate();

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

  const [markTournamentCompleteResponse, markTournamentCompleteReturnDate, sendMarkTournamentCompleteRequest] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.OVERRIDE_TOURNAMENT_STATUS,
    method: 'POST',
    // this is a hacky way to ensure we don't prematurely call this endpoint. A long term fix is to replace useData() with the version used in the march-madness-calcutta repo
    conditions: [false] // we call this endpoint manually, so we force the conditions to be false
  });

  const refreshTournaments = () => {
    setTriggerTournaments(new Date().valueOf());
    setTableLoading(true);
  }

  useEffect(() => {
    if (tournaments && tournaments.length > 0) {
      setTableLoading(false);
    }
  }, [tournamentsReturnDate]);

  useEffect(() => {
    console.log(markTournamentCompleteResponse);
    if (markTournamentCompleteResponse && markTournamentCompleteResponse.length && markTournamentCompleteResponse[0]?.Error) {
      message.error(markTournamentCompleteResponse[0].Error);
    }

    refreshTournaments();
  }, [markTournamentCompleteReturnDate]);

  useEffect(() => {
    if (deleteTournamentResponse && deleteTournamentResponse.length && deleteTournamentResponse[0]?.Error) {
      message.error(deleteTournamentResponse[0].Error);
    }

    setDeleteFlag(false);
    refreshTournaments();
  }, [deleteTournamentReturnDate]);

  const tournamentClicked = (tournament) => {
    navigate(`/tournaments/${tournament.TournamentId}`);
  }

  const markTournamentComplete = (tournamentId) => {
    sendMarkTournamentCompleteRequest({ tournamentIds: [tournamentId] });
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
                <Space>
                  { record.Status != 'Complete' ?
                    <ButtonTableCell
                      type='primary'
                      size='small'
                      onClick={(event) => {
                        event.stopPropagation();
                        markTournamentComplete(record.TournamentId);
                      }}
                    >
                      Mark Complete
                    </ButtonTableCell>
                    :
                    null
                  }
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
                </Space>
              );
            }}
          />
        </Table>
      </Col>
    </Row>
  );
}

export default TournamentTable;