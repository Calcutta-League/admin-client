import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Divider, message, Checkbox } from 'antd';
import SportsService from '../../services/sports/sports.service';
import { SPORTS_SERVICE_ENDPOINTS, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import TournamentService from '../../services/tournament/tournament.service';
import NewTournamentPhaseFormList from './newTournamentPhaseFormList';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

const tailLayout = {
  style: { textAlign: 'center' },
  wrapperCol: { span: 24 }
};

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

    const body = {
      tournamentName: values.tournamentName,
      adminOnly: !!values.adminOnly,
      sportId: values.sport,
      phases: values.phases
    }

    TournamentService.callApi(TOURNAMENT_SERVICE_ENDPOINTS.NEW_TOURNAMENT, { token: token, data: body }).then(res => {
      console.log(res);
      setNewTournamentLoading(false);
      props.continue(res.data[0].NewTournamentId);
    }).catch(error => {
      console.log(error);
    });
  }

  const generateSportOptions = () => {
    if (sports && sports.length > 0) {
      return sports.map(sport => {
        return (
          <Option key={sport.SportId} value={sport.SportId}>{sport.Abbreviation}</Option>
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
        name='adminOnly'
        valuePropName='checked'
        wrapperCol={{ offset: 6, span: 16 }}
      >
        <Checkbox>Admin Only</Checkbox>
      </Form.Item>
      <Divider orientation='left'>Tournament Phases</Divider>
      <NewTournamentPhaseFormList />
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' loading={newTournamentLoading}>
          Continue
        </Button>
      </Form.Item>
    </Form>
  )
}

export default NewTournamentForm;