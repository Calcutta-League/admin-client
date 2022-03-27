import React, { useState } from 'react';
import { Form, message, Button } from 'antd';
import NewTournamentPhaseFormList from './newTournamentPhaseFormList';
import TournamentService from '../../services/tournament/tournament.service';
import { TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

const tailLayout = {
  style: { textAlign: 'center' },
  wrapperCol: { span: 24 }
};

function NewTournamentPhaseForm(props) {

  const [loading, setLoading] = useState(false);

  const { token } = useAuthState();

  const createTournamentPhase = (values) => {
    setLoading(true);
    console.log(values);

    const data = {
      tournamentId: props.tournamentId,
      phases: values.phases
    };

    TournamentService.callApi(TOURNAMENT_SERVICE_ENDPOINTS.NEW_TOURNAMENT_PHASE, { token: token, data: data }).then(res => {
      console.log(res);
      setLoading(false);
      props.dismiss(true);
    }).catch(error => {
      console.log(error);
      setLoading(false);
      message.error('unable to create new tournament phases');
    });
  }

  return (
    <Form
      {...layout}
      name='new-tournament-phase'
      onFinish={createTournamentPhase}
    >
      <NewTournamentPhaseFormList />
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' loading={loading}>
          Create Phase(s)
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewTournamentPhaseForm;