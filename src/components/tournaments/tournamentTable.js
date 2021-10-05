import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import { useTournamentDispatch, useTournamentState } from '../../context/tournamentContext';
import TournamentService from '../../services/tournament/tournament.service';
import { TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import { navigate } from '@reach/router';

const { Column } = Table;

function TournamentTable() {

  const [tableLoading, setTableLoading] = useState(true);

  const { tournaments } = useTournamentState();
  const { authenticated, token } = useAuthState();

  const tournamentDispatch = useTournamentDispatch();

  useEffect(() => {
    if (!!authenticated) {
      getTournaments();
    }
  }, [authenticated]);

  useEffect(() => {
    if (tournaments && tournaments.length > 0) {
      setTableLoading(false);
    }
  }, [tournaments]);

  const getTournaments = () => {
    TournamentService.callApi(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENTS, { token: token }).then(data => {
      console.log(data);
      tournamentDispatch({ type: 'update', key: 'tournaments', value: data.data });
    }).catch(error => {
      console.log(error);
    });
  }

  const tournamentClicked = (tournament) => {
    navigate(`/tournaments/${tournament.TournamentId}`);
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
        </Table>
      </Col>
    </Row>
  );
}

export default TournamentTable;