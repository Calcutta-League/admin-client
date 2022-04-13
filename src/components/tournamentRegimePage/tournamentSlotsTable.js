import React, { useState, useEffect } from 'react';
import { Table, Button, message, Space } from 'antd';
import { useTournamentState } from '../../context/tournamentContext';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import useData from '../../hooks/useData';
import { ButtonTableCell } from '../buttonTableCell';

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

  const editSlot = (slot) => {
    console.log(slot);
    message.error('Not implemented yet');
  }

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
        align='left'
        dataIndex='TeamName'
        title='Team'
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
            <Space>
              <Button
                type='primary'
                size='small'
                onClick={(event) => {
                  event.stopPropagation();
                  editSlot(record);
                }}
              >
                Edit
              </Button>
              <ButtonTableCell
                type='primary'
                danger
                size='small'
                onClick={(event) => {
                  event.stopPropagation();
                  removeSlot(record.TournamentSlotId)
                }}
              >
                Remove
              </ButtonTableCell>
            </Space>
          );
        }}
      />
    </Table>
  );
}

export default TournamentSlotsTable;