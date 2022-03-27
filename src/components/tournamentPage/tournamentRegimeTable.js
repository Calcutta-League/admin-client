import React, { useEffect, useState } from 'react';
import { Table, Switch, Button, message } from 'antd';
import 'antd/dist/antd.css';
import TournamentService from '../../services/tournament/tournament.service';
import { TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import { useTournamentDispatch, useTournamentState } from '../../context/tournamentContext';
import { navigate } from '@reach/router';

const { Column } = Table;

function TournamentRegimeTable(props) {

  const [regimes, setRegimes] = useState([]);
  const [regimesLoading, setRegimesLoading] = useState(true);

  const { authenticated, token } = useAuthState();
  const { selectedRegimeId } = useTournamentState();

  const tournamentDispatch = useTournamentDispatch()

  useEffect(() => {
    if (!!authenticated) {
      fetchRegimes();
    }
  }, [authenticated]);

  const fetchRegimes = () => {
    TournamentService.callApi(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIMES, { tournamentId: props.tournamentId, token: token }).then(res => {
      let data = res.data;

      if (data.length > 0) {
        setRegimes(data);
      }
      setRegimesLoading(false);
    }).catch(error => {
      console.log(error);
      setRegimesLoading(false);
    });
  }

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