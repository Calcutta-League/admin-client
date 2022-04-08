import React, { useState, useEffect, Fragment } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import useData from '../../hooks/useData';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
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

function NewTournamentRegimeForm(props) {

  const [loading, setLoading] = useState(false);
  const [newRegimeFlag, setNewRegimeFlag] = useState(false);
  const [newRegimeTrigger, setNewRegimeTrigger] = useState(null);
  const [newRegimePayload, setNewRegimePayload] = useState(null);

  const { authenticated } = useAuthState();

  const [newRegimeResponse, newRegimeReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.NEW_TOURNAMENT_REGIME,
    method: 'POST',
    refreshTrigger: newRegimeTrigger,
    payload: newRegimePayload,
    conditions: [authenticated, newRegimeFlag, newRegimeTrigger]
  });

  useEffect(() => {
    setLoading(false);
    setNewRegimeFlag(false);

    if (newRegimeReturnDate) {
      props.dismiss(true);
    }
  }, [newRegimeReturnDate]);

  const createTournamentRegime = (values) => {
    setLoading(true);

    const data = {
      tournamentId: props.tournamentId,
      regimes: values.regimes
    };

    setNewRegimePayload(data);
    setNewRegimeFlag(true);
    setNewRegimeTrigger(new Date().valueOf());
  }

  return (
    <Form
      {...layout}
      name='new-tournament-regime'
      onFinish={createTournamentRegime}
    >
      <NewTournamentRegimeFormList />
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' loading={loading}>
          Create Regime(s)  
        </Button>
      </Form.Item>
    </Form>
  );
}

function NewTournamentRegimeFormList() {

  const { authenticated } = useAuthState();

  const [bracketTypes, bracketTypesReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.GET_BRACKET_TYPES,
    method: 'GET',
    conditions: [authenticated]
  });

  const generateBracketOptions = () => {
    if (bracketTypes && bracketTypes.length) {
      return bracketTypes.map(bracket => {
        return <Option value={bracket.BracketTypeId} key={bracket.BracketTypeId}>{bracket.BracketName}</Option>
      });
    }

    return null;
  }

  return (
    <Form.List
      name='regimes'
      rules={[
        {
          validator: async(_, regimes) => {
            if (!regimes || regimes.length < 1) {
              return Promise.reject(new Error('At least one regime is required'));
            }
          }
        }
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map(({ key, name, ...restField }, index) => (
            <Fragment key={key}>
              <Space key={key} style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }} align='baseline'>
                <Form.Item
                  {...restField}
                  {...layout}
                  label='Regime'
                  name={[name, 'name']}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter a regime name or delete this field'
                    }
                  ]}
                >
                  <Input placeholder='Regime name' />
                </Form.Item>
                <Form.Item
                  {...restField}
                  {...secondaryFormItemLayout}
                  name={[name, 'bracketTypeId']}
                >
                  <Select allowClear style={{ width: 250 }}>
                    {generateBracketOptions()}
                  </Select>
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className='dynamic-delete-button'
                    onClick={() => remove(name)}
                  />
                ) : null}
              </Space>
              <Space key={`${key}_desc`} style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }} align='baseline'>
                <Form.Item
                  {...restField}
                  name={[name, 'description']}
                >
                  <Input.TextArea
                    placeholder='Regime description'
                    maxLength={500}
                    showCount
                    style={{ width: 500 }}
                  />
                </Form.Item>
              </Space>
            </Fragment>
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
              Add Regime  
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}  
    </Form.List>
  )
}

export default NewTournamentRegimeForm;