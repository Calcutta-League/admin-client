import React, { useEffect, useState } from 'react';
import { Table, Switch, Button, message, Space } from 'antd';
import 'antd/dist/antd.css';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import { useTournamentDispatch, useTournamentState } from '../../context/tournamentContext';
import { navigate } from '@reach/router';
import useData from '../../hooks/useData';
import { ButtonTableCell } from '../buttonTableCell';

const { Column } = Table;

function TournamentRegimeTable(props) {

  const [loading, setLoading] = useState(true);
  const [triggerDelete, setTriggerDelete] = useState(null);
  const [deletePayload, setDeletePayload] = useState(null);
  const [deleteFlag, setDeleteFlag] = useState(false);

  const { authenticated } = useAuthState();
  const { selectedRegimeId, tournamentRegimeRefreshTrigger } = useTournamentState();

  const tournamentDispatch = useTournamentDispatch();

  const [regimes, regimesReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIMES}/${props.tournamentId}`,
    method: 'GET',
    refreshTrigger: tournamentRegimeRefreshTrigger,
    conditions: [authenticated]
  });

  const [deleteRegimeResponse, deleteRegimeReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.DELETE_TOURNAMENT_REGIME,
    method: 'POST',
    refreshTrigger: triggerDelete,
    payload: deletePayload,
    conditions: [authenticated, deleteFlag]
  });

  useEffect(() => {
    if (deleteRegimeResponse && deleteRegimeResponse.length && deleteRegimeResponse[0]?.Error) {
      message.error(deleteRegimeResponse[0].Error);
    }

    setDeleteFlag(false);
    tournamentDispatch({ type: 'update', key: 'tournamentRegimeRefreshTrigger', value: new Date().valueOf() });
  }, [deleteRegimeReturnDate]);

  useEffect(() => {
    // Regimes haven't been downloaded yet, default to loading
    if (!regimesReturnDate) {
      setLoading(true);
    }

    // a refresh request has been made, but the fetch hasn't returned yet
    if ((tournamentRegimeRefreshTrigger || 0) > regimesReturnDate) {
      setLoading(true);
    }

    // data returned after the latest refresh request
    if ((tournamentRegimeRefreshTrigger || 0) <= regimesReturnDate) {
      setLoading(false);
    }
  }, [tournamentRegimeRefreshTrigger, regimesReturnDate]);

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

  const navigateToRegimePage = (tournamentRegimeId, tournamentRegimeName, sportId) => {
    navigate(`/tournaments/tournamentRegime/${tournamentRegimeId}`, { 
      state: { 
        tournamentRegimeName: tournamentRegimeName,
        sportId: sportId
      }
    });
  }

  const getRowClass = (record) => {
    if (record.TournamentRegimeId == selectedRegimeId) {
      return 'row-selected row-clickable';
    }
    return 'row-clickable';
  }

  const deleteRegime = (tournamentRegimeId) => {
    const data = {
      tournamentRegimeId: tournamentRegimeId
    };

    // queue up the delete request
    setDeleteFlag(true);
    setDeletePayload(data);
    setTriggerDelete(new Date().valueOf());
  }

  return (
    <Table
      dataSource={regimes}
      loading={loading}
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
        render={(text, record) => {
          return (
            <Space>
              <Button
                type='primary'
                size='small'
                onClick={(event) => {
                  event.stopPropagation()
                  navigateToRegimePage(record.TournamentRegimeId, record.TournamentRegimeName, record.SportId)
                }}
              >
                Setup
              </Button>
              <ButtonTableCell
                type='primary'
                danger
                size='small'
                onClick={(event) => {
                  event.stopPropagation();
                  deleteRegime(record.TournamentRegimeId)
                }}
              >
                Delete
              </ButtonTableCell>
            </Space>
          );
        }}
      />
    </Table>
  )
}

export default TournamentRegimeTable;