import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Divider, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SportsService from '../../services/sports/sports.service';
import { SPORTS_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

const tailLayout = {
  style: { textAlign: 'center' },
  wrapperCol: { span: 24 }
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 6 },
  },
};

const addFieldLayout = {
  wrapperCol: {
    xs: { span: 16, offset: 4 }
  }
}

function NewTournamentForm(props) {

  const [newTournamentLoading, setNewTournamentLoading] = useState(false);
  const [sportsListLoading, setSportsListLoading] = useState(true);
  const [sports, setSports] = useState([]);

  const { authenticated, token } = useAuthState();

  useEffect(() => {
    if (!!authenticated) {
      fetchSports();
    }
  }, [authenticated]);

  const fetchSports = () => {
    SportsService.callApi(SPORTS_SERVICE_ENDPOINTS.GET_SPORTS, { token: token }).then(res => {
      let data = res.data;
      console.log(data);
      setSports(data);
      setSportsListLoading(false);
    }).catch(error => {
      console.log(error);
      message.error('Error downloading sports');
      setSportsListLoading(false);
    });
  }

  const createNewTournament = (values) => {
    // collect form fields and send create request
    setNewTournamentLoading(true);
    console.log(values);

    // call props.continue and pass in the new tournament's id
  }

  const generateSportOptions = () => {
    if (sports && sports.length > 0) {
      return sports.map(sport => {
        return (
          <Option value={sport.SportId}>{sport.Abbreviation}</Option>
        );
      });
    }

    return null;
  }

  return (
    <Form
      {...layout}
      name='new-tournament'
      onFinish={createNewTournament}
    >
      <Divider orientation='left'>Tournament</Divider>
      <Form.Item
        label='Name'
        name='tournamentName'
        rules={[{ required: true, message: 'Please input tournament name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Sport'
        name='sport'
        rules={[{ required: true, message: 'Please select a sport' }]}
      >
        <Select
          placeholder='Choose a sport'
          loading={sportsListLoading}
        >
          {generateSportOptions()}
        </Select>
      </Form.Item>
      <Form.Item
        label='Admin Only'
        name='adminOnly'
      >
        <Input type='checkbox' />
      </Form.Item>
      <Divider orientation='left'>Tournament Phases</Divider>
      <Form.List
        name='phases'
        rules={[
          {
            validator: async (_, phases) => {
              if (!phases || phases.length < 1) {
                return Promise.reject(new Error('At least one phase is required'));
              }
            },
          }
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? layout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Phases' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Please enter a phase name or delete this field',
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder='Phase name' style={{ width: '80%' }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className='dynamic-delete-button'
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
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
                Add Phase
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' loading={newTournamentLoading}>
          Continue
        </Button>
      </Form.Item>
    </Form>
  )
}

export default NewTournamentForm;