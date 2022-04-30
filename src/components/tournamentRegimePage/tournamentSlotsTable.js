import React, { Fragment, useState, useEffect } from 'react';
import { Table, Button, message, Space, Modal } from 'antd';
import { useTournamentDispatch, useTournamentState } from '../../context/tournamentContext';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import useData from '../../hooks/useData';
import { ButtonTableCell } from '../buttonTableCell';
import UpdateSlotForm from './updateSlotForm';

const { Column } = Table;

function TournamentSlotsTable(props) {

  const [regimeSlotsLoading, setRegimeSlotsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  const { slotsTrigger } = useTournamentState();
  const { authenticated } = useAuthState();

  const tournamentDispatch = useTournamentDispatch();

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
    setEditingSlot(slot);
    setVisible(true);
  }

  const removeSlot = () => {
    message.error('Not implemented yet');
  }

  const dismiss = () => {
    setVisible(false);
  }

  const dismissUpdateSlotModal = (triggerSlotsDownload) => {
    dismiss();
    setEditingSlot(null);

    if (triggerSlotsDownload) {
      setRegimeSlotsLoading(true);
      tournamentDispatch({ type: 'update', key: 'slotsTrigger', value: new Date().valueOf() });
    }
  }

  return (
    <Fragment>
      <Table
        dataSource={slots}
        loading={regimeSlotsLoading}
        pagination={false}
        rowKey='TournamentSlotId'
        size='small'
        scroll={{ y: 500 }}
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
      <Modal
        visible={visible}
        title='Update Slot'
        onCancel={dismiss}
        footer={null}
      >
        <UpdateSlotForm sportId={props.sportId} dismiss={dismissUpdateSlotModal} slot={editingSlot} />
      </Modal>
    </Fragment>
  );
}

export default TournamentSlotsTable;