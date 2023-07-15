import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Skeleton } from 'antd';
import useData from '../../hooks/useData';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import { useTournamentState } from '../../context/tournamentContext';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const tailLayout = {
  style: { textAlign: 'center' },
  wrapperCol: { span: 24 }
};

function NewTournamentRegimePhaseForm(props) {

  const [loading, setLoading] = useState(false);

  const [phasesTrigger, setPhasesTrigger] = useState(null);
  const [regimePhasesTrigger, setRegimePhasesTrigger] = useState(null);

  const [updateRegimePhasesFlag, setUpdateRegimePhaseFlag] = useState(false);
  const [updateRegimePhasesTrigger, setUpdateRegimePhasesTrigger] = useState(null);
  const [updateRegimePhasesPayload, setUpdateRegimePhasesPayload] = useState(null);

  const { authenticated } = useAuthState();
  const { selectedRegimeId } = useTournamentState();

  const [phases, phasesReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_PHASES}/${props.tournamentId}`,
    method: 'GET',
    refreshTrigger: phasesTrigger,
    conditions: [authenticated]
  });

  const [regimePhases, regimePhasesReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_PHASES}/${selectedRegimeId}`,
    method: 'GET',
    refreshTrigger: regimePhasesTrigger,
    conditions: [authenticated, selectedRegimeId]
  });

  const [updateRegimePhasesResponse, updateRegimePhaseReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.SET_TOURNAMENT_REGIME_PHASES,
    method: 'POST',
    refreshTrigger: updateRegimePhasesTrigger,
    payload: updateRegimePhasesPayload,
    conditions: [authenticated, updateRegimePhasesFlag]
  });

  useEffect(() => {
    setLoading(false);
    setUpdateRegimePhaseFlag(false);

    if (updateRegimePhaseReturnDate) {
      props.dismiss(true);
    }
  }, [updateRegimePhaseReturnDate]);

  const generatePhaseList = () => {
    if (!phasesReturnDate || !regimePhasesReturnDate || regimePhases == null) {
      return <Skeleton active />;
    }
    
    return phases.map(phase => {
      const phaseId = phase.TournamentPhaseId;
      const regimePhaseMatch = regimePhases.find(regimePhase => regimePhase.TournamentPhaseId == phaseId);
      const isIncluded = !!regimePhaseMatch;

      return (
        <Form.Item
          key={phaseId}
          name={phaseId}
          valuePropName='checked'
          initialValue={isIncluded}
        >
          <Checkbox>{phase.Description}</Checkbox>
        </Form.Item>
      );
    });
  }

  const setTournamentRegimePhases = (values) => {
    console.log(values);
    setLoading(true);

    const phaseIds = Object.keys(values);
    const phases = phaseIds.filter(phaseId => !!values[phaseId]);

    const data = {
      tournamentRegimeId: selectedRegimeId,
      phases: phases
    };

    setUpdateRegimePhasesPayload(data);
    setUpdateRegimePhaseFlag(true);
    setUpdateRegimePhasesTrigger(new Date().valueOf());
  }

  return (
    <Form
      {...layout}
      name='new-tournament-regime-phase'
      onFinish={setTournamentRegimePhases}
    >
      {generatePhaseList()}
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' loading={loading}>
          Set Regime Phases
        </Button>
      </Form.Item>
    </Form>
  )
}

export default NewTournamentRegimePhaseForm;