import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, InputNumber } from 'antd';
import { useAuthState } from '../../context/authContext';
import useData from '../../hooks/useData';
import { API_CONFIG, TOURNAMENT_SETTINGS_SERVICE_ENDPOINTS } from '../../utilities/constants';
import PayoutTypesSelect from '../payoutTypesSelect/payoutTypesSelect';
import TournamentPhasesSelect from '../tournamentPhasesSelect/tournamentPhasesSelect';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function UpdatePayoutForm(props) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [updatePayoutFlag, setUpdatePayoutFlag] = useState(false);
  const [updatePayoutTrigger, setUpdatePayoutTrigger] = useState(null);
  const [updatePayoutPayload, setUpdatePayoutPayload] = useState(null);

  const { authenticated } = useAuthState();

  useEffect(() => {
    form.resetFields();
    setUpdatePayoutPayload(null);
  }, [props.payout.TournamentPayoutId]);

  const [updatePayoutResponse, updatePayoutReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SETTINGS_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SETTINGS_SERVICE_ENDPOINTS.SET_PAYOUT_SETTINGS,
    method: 'POST',
    refreshTrigger: updatePayoutTrigger,
    payload: updatePayoutPayload,
    conditions: [authenticated, updatePayoutFlag]
  });

  useEffect(() => {
    if (updatePayoutReturnDate) {
      setLoading(false);
      setUpdatePayoutFlag(false);
      props.dismiss(true);
    }
  }, [updatePayoutReturnDate]);

  const updatePayout = (values) => {
    console.log(values);
    setLoading(true);
    
    const payouts = [
      {
        payoutId: props.payout.TournamentPayoutId,
        regimeId: props.tournamentRegimeId,
        phaseId: values.phaseId,
        payoutTypeId: values.payoutTypeId,
        defaultPayoutRate: values.defaultPayoutRate,
        global: values.isGlobal
      }
    ];

    setUpdatePayoutPayload({ payouts: payouts });
    setUpdatePayoutFlag(true);
    setUpdatePayoutTrigger(new Date().valueOf());
  }

  return (
    <Form
      {...layout}
      form={form}
      name='update-payout'
      onFinish={updatePayout}
      initialValues={{
        phaseId: props.payout.TournamentPhaseId,
        payoutTypeId: props.payout.PayoutTypeId,
        isGlobal: props.payout.IsGlobal,
        defaultPayoutRate: props.payout.DefaultPayoutRate
      }}
    >
      <Form.Item name='phaseId' label='Phase'>
        <TournamentPhasesSelect tournamentRegimeId={props.tournamentRegimeId} />
      </Form.Item>
      <Form.Item name='payoutTypeId' label='Payout Type'>
        <PayoutTypesSelect />
      </Form.Item>
      <Form.Item name='isGlobal' label='Global?'>
        <Checkbox />
      </Form.Item>
      <Form.Item name='defaultPayoutRate' label='Default Payout'>
        <InputNumber />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' loading={loading}>
          Update Payout
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UpdatePayoutForm;

/**
 * @typedef TournamentPayout
 * @property {Number} [payoutId]
 * @property {Number} regimeId
 * @property {Number} [phaseId]
 * @property {Number} payoutTypeId
 * @property {Number} [finalPosition]
 * @property {Number} defaultPayoutRate
 * @property {String} [payoutRateSuffix]
 * @property {Number} [precision]
 * @property {Boolean} global
 */