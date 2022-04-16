import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { SportTeamsSelect } from '../sportTeamsSelect';
import useData from '../../hooks/useData';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function UpdateSlotForm(props) {

  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    setUpdateSlotPayload(null);
  }, [props.slot.TournamentSlotId]);

  const [loading, setLoading] = useState(false);
  const [updateSlotFlag, setUpdateSlotFlag] = useState(false);
  const [updateSlotTrigger, setUpdateSlotTrigger] = useState(null);
  const [updateSlotPayload, setUpdateSlotPayload] = useState(null);

  const { authenticated } = useAuthState();

  const [updateSlotResponse, updateSlotReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.UPDATE_TOURNAMENT_SLOT,
    method: 'POST',
    refreshTrigger: updateSlotTrigger,
    payload: updateSlotPayload,
    conditions: [authenticated, updateSlotFlag]
  });

  useEffect(() => {
    if (updateSlotReturnDate) {
      setLoading(false);
      setUpdateSlotFlag(false);
      props.dismiss(true);
    }
  }, [updateSlotReturnDate]);

  const updateSlot = (values) => {
    setLoading(true);

    const slots = [
      {
        slotId: props.slot.TournamentSlotId,
        seed: values.seed,
        name: values.name,
        teamId: values.teamId
      }
    ];

    setUpdateSlotPayload({
      tournamentRegimeId: props.slot.TournamentRegimeId,
      slots: slots
    });
    setUpdateSlotFlag(true);
    setUpdateSlotTrigger(new Date().valueOf());
  }

  return (
    <Form
      {...layout}
      form={form}
      name='update-slot'
      onFinish={updateSlot}
      initialValues={{
        name: props.slot.TournamentSlotName,
        seed: props.slot.Seed,
        teamId: props.slot.TeamId
      }}
    >
      <Form.Item name='name' label='Slot Name' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='seed' label='Seed'>
        <InputNumber />
      </Form.Item>
      <Form.Item name='teamId' label='Team'>
        <SportTeamsSelect sportId={props.sportId} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' loading={loading}>
          Update Slot
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UpdateSlotForm;