import React, { useState, useEffect, Fragment } from 'react';
import { message, Modal, Space, Table, Typography, Button } from 'antd';
import { ButtonTableCell } from '../buttonTableCell';
import useData from '../../hooks/useData';
import { API_CONFIG, TOURNAMENT_SETTINGS_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useTournamentDispatch, useTournamentState } from '../../context/tournamentContext';
import { useAuthState } from '../../context/authContext';
import { toPercentage } from '../../utilities/helper';
import UpdatePayoutForm from './updatePayoutForm';

const { Column } = Table;
const { Text } = Typography;

function TournamentRegimePayoutTable(props) {

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [editingPayout, setEditingPayout] = useState(null);

  const { payoutSettingsTrigger } = useTournamentState();
  const { authenticated } = useAuthState();

  const tournamentDispatch = useTournamentDispatch();

  const [payouts, payoutsReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SETTINGS_SERVICE_BASE_URL,
    endpoint: `${TOURNAMENT_SETTINGS_SERVICE_ENDPOINTS.GET_PAYOUT_SETTINGS}/${props.tournamentRegimeId}`,
    method: 'GET',
    refreshTrigger: payoutSettingsTrigger,
    conditions: [authenticated]
  });

  useEffect(() => {
    if (payoutsReturnDate) {
      setLoading(false);
    }
  }, [payoutsReturnDate]);

  const editPayout = (record) => {
    setEditingPayout(record);
    setVisible(true);
  };

  const deletePayout = (payoutId) => {
    message.error('Delete Payout');
  }

  const dismiss = () => {
    setVisible(false);
  }

  const dismissUpdatePayoutModal = (triggerPayoutsDownload) => {
    dismiss();
    setEditingPayout(null);

    if (triggerPayoutsDownload) {
      setLoading(true);
      tournamentDispatch({ type: 'update', key: 'payoutSettingsTrigger', value: new Date().valueOf() });
    }
  }

  return (
    <Fragment>
      <Table
        dataSource={payouts}
        loading={loading}
        pagination={false}
        rowKey='TournamentPayoutId'
        size='small'
        scroll={{ y: 500 }}
      >
        <Column
          align='left'
          dataIndex='TournamentPhaseDescription'
          title='Phase'
        />
        <Column
          align='left'
          dataIndex='PayoutTypeDescription'
          title='Payout Type'
        />
        <Column
          align='left'
          dataIndex='IsGlobal'
          title='Global Payout'
          render={(text, record) => {
            return (
              <Text>{record.IsGlobal ? 'Yes' : 'No'}</Text>
            );
          }}
        />
        <Column
          align='left'
          dataIndex='DefaultPayoutRate'
          title='Payout Rate'
          render={(text, record) => {
            return (
              <Text>{toPercentage(record.DefaultPayoutRate, record.PayoutRatePrecision)}</Text>
            )
          }}
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
                    editPayout(record);
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
                    deletePayout(record.TournamentPayoutId)
                  }}
                >
                  Remove
                </ButtonTableCell>
              </Space>
            )
          }}
        />
      </Table>
      <Modal
        open={visible}
        title='Update Payout'
        onCancel={dismiss}
        footer={null}
      >
        <UpdatePayoutForm tournamentRegimeId={props.tournamentRegimeId} dismiss={dismissUpdatePayoutModal} payout={editingPayout} />
      </Modal>
    </Fragment>
  );
}

export default TournamentRegimePayoutTable;