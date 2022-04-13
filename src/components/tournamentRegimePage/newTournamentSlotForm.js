import React, { useState, useEffect } from 'react';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import { useAuthState } from '../../context/authContext';
import useData from '../../hooks/useData';
import { API_CONFIG, SPORTS_SERVICE_ENDPOINTS, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { SportTeamsSelect } from '../sportTeamsSelect';

const { Option } = Select;

const layout = {
  wrapperCol: { span: 24 }
};

const tailLayout = {
  style: { textAlign: 'center' },
  wrapperCol: { span: 24 }
};

const secondaryFormItemLayout = {
  wrapperCol: {
    span: 24,
    offset: 0
  }
}

const addFieldLayout = {
  wrapperCol: {
    xs: { span: 16, offset: 4 }
  }
};

function NewTournamentSlotForm(props) {

  const [loading, setLoading] = useState(false);
  const [newSlotFlag, setNewSlotFlag] = useState(false);
  const [newSlotTrigger, setNewSlotTrigger] = useState(null);
  const [newSlotPayload, setNewSlotPayload] = useState(null);

  const { authenticated } = useAuthState();

  const [newSlots, newSlotsReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.NEW_TOURNAMENT_SLOT,
    method: 'POST',
    refreshTrigger: newSlotTrigger,
    payload: newSlotPayload,
    conditions: [authenticated, newSlotFlag, newSlotTrigger]
  });

  useEffect(() => {
    setLoading(false);
    setNewSlotFlag(false);

    if (newSlotsReturnDate) {
      props.dismiss(true);
    }
  }, [newSlotsReturnDate]);

  const createNewTournamentSlots = (values) => {
    setLoading(true);

    const payload = {
      tournamentRegimeId: props.tournamentRegimeId,
      slots: values.slots
    }

    setNewSlotPayload(payload);
    setNewSlotTrigger(new Date().valueOf());
    setNewSlotFlag(true);
  }

  return (
    <Form
      {...layout}
      name='new-tournament-slot'
      onFinish={createNewTournamentSlots}
      layout='vertical'
    >
      <NewTournamentSlotFormList sportId={props.sportId} />
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' loading={loading}>
          Create Slot(s)
        </Button>
      </Form.Item>
    </Form>
  );
}

function NewTournamentSlotFormList(props) {

  return (
    <Form.List
      name='slots'
      rules={[
        {
          validator: async(_, slots) => {
            if (!slots || slots.length < 1) {
              return Promise.reject(new Error('At least one slot is required'));
            }
          }
        }
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map(({ key, name, ...restField }, index) => (
            <Space key={key} style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }} align='baseline'>
              <Form.Item
                {...restField}
                {...layout}
                label='Slot Name'
                name={[name, 'name']}
                rules={[
                  {
                    required: true,
                    message: 'Please enter a slot name or delete this field'
                  }
                ]}
              >
                <Input placeholder='Slot name' />
              </Form.Item>
              <Form.Item
                {...restField}
                {...secondaryFormItemLayout}
                label='Seed'
                name={[name, 'seed']}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                {...restField}
                {...secondaryFormItemLayout}
                label='Team'
                name={[name, 'teamId']}
              >
                <SportTeamsSelect sportId={props.sportId} />
              </Form.Item>
              {fields.length > 1 ? (
                <MinusCircleOutlined onClick={() => remove(name)} />
              ) : null}
            </Space>
          ))}
          <Form.Item
            style={{ textAlign: 'center' }}
            {...addFieldLayout}
          >
            <Button
              type='dashed'
              onClick={() => add()}
              style={{ width: '100%' }}
              icon={<PlusOutlined />}
            >
              Add Slot
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  )
}

export default NewTournamentSlotForm;