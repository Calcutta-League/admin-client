import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { useTournamentState } from '../../context/tournamentContext';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import useData from '../../hooks/useData';

const { Column } = Table;

function TournamentSlotsTable(props) {

  const [regimeSlotsLoading, setRegimeSlotsLoading] = useState(true);

  const { slotsTrigger } = useTournamentState();
  const { authenticated } = useAuthState();

  const [slots, slotsReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_SLOTS}/${props.tournamentRegimeId}`,
    method: 'GET',
    refreshTrigger: slotsTrigger,
    conditions: [authenticated]
  });

  useEffect(() => {
    if (slotsReturnDate) {
      setRegimeSlotsLoading(false);
    }
  }, [slotsReturnDate]);

  const removeSlot = () => {
    message.error('Not implemented yet');
  }

  return (
    <Table
      dataSource={slots}
      loading={regimeSlotsLoading}
      pagination={false}
      rowKey='TournamentSlotId'
      size='small'
    >
      <Column
        align='left'
        dataIndex='TournamentSlotName'
        title='Name'
      />
      <Column
        align='center'
        dataIndex='Seed'
        title='Seed'
      />
      <Column
        align='center'
        dataIndex='Region'
        title='Region'
      />
      <Column
        align='right'
        render={(text, record) => {
          return (
            <Button
              type='primary'
              danger
              size='small'
              onClick={(event) => {
                event.stopPropagation();
                removeSlot(record.TournamentSlotId)
              }}
            >
              Remove
            </Button>
          );
        }}
      />
    </Table>
  );
}

export default TournamentSlotsTable;