import React, { useEffect, useState } from 'react';
import { Table, Switch, Button, message } from 'antd';
import 'antd/dist/antd.css';
import TournamentService from '../../services/tournament/tournament.service';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import { useTournamentDispatch, useTournamentState } from '../../context/tournamentContext';
import { navigate } from '@reach/router';
import useData from '../../hooks/useData';

const { Column } = Table;

function TournamentRegimeTable(props) {

  const [regimesLoading, setRegimesLoading] = useState(true);

  const { authenticated, token } = useAuthState();
  const { selectedRegimeId, tournamentRegimeRefreshTrigger } = useTournamentState();

  const tournamentDispatch = useTournamentDispatch();

  const [regimes, regimesReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIMES}/${props.tournamentId}`,
    method: 'GET',
    refreshTrigger: tournamentRegimeRefreshTrigger,
    conditions: [authenticated]
  });

  useEffect(() => {
    if (regimesReturnDate) {
      setRegimesLoading(false);
    }
  }, [regimesReturnDate]);

  const regimeSelected = (regime) => {
    tournamentDispatch({ type: 'update', key: 'selectedRegimeId', value: regime.TournamentRegimeId});
  }

  const regimeAdminFlagChanged = (value, event) => {
    event.stopPropagation();
    // TODO: implement
    message.error('Not Implemented Yet');
  }

  const regimeDisabledFlagChanged = (value, event) => {
    event.stopPropagation();
    // TODO: implement
    message.error('Not Implemented Yet');
  }

  const navigateToRegimePage = (tournamentRegimeId, tournamentRegimeName) => {
    navigate(`/tournaments/tournamentRegime/${tournamentRegimeId}`, { state: { tournamentRegimeName: tournamentRegimeName } });
  }

  const getRowClass = (record) => {
    if (record.TournamentRegimeId == selectedRegimeId) {
      return 'row-selected row-clickable';
    }
    return 'row-clickable';
  }

  return (
    <Table
      dataSource={regimes}
      loading={regimesLoading}
      pagination={false}
      onRow={(record) => {
        return {
          onClick: (event) => {
            regimeSelected(record)
          }
        }
      }}
      rowClassName={getRowClass}
      rowKey='TournamentRegimeId'
      size='small'
    >
      <Column
        align='left'
        dataIndex='TournamentRegimeName'
        title='TournamentRegime'
      />
      <Column
        align='center'
        dataIndex='TestOnly'
        title='Admin Only'
        render={(value) => {
          return <Switch defaultChecked={value} onChange={regimeAdminFlagChanged} />
        }}
      />
      <Column
        align='center'
        dataIndex='InvalidatedDate'
        title='Disabled'
        render={(value) => {
          let checked = !!value;
          return <Switch defaultChecked={checked} onChange={regimeDisabledFlagChanged} />
        }}
      />
      <Column
        align='center'
        title='Setup Status'
      />
      <Column
        align='right'
        title='Tournament Slots'
        render={(text, record) => {
          return (
            <Button
              type='primary'
              size='small'
              onClick={(event) => {
                event.stopPropagation()
                navigateToRegimePage(record.TournamentRegimeId, record.TournamentRegimeName)
              }}
            >
              Add/Edit
            </Button>
          );
        }}
      />
    </Table>
  )
}

export default TournamentRegimeTable;