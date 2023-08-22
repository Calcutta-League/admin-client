import React, { useState } from 'react';
import { Select } from 'antd';
import useData from '../../hooks/useData';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';

const { Option } = Select;

function TournamentPhasesSelect(props) {

  const [phasesTrigger, setPhasesTrigger] = useState(null);

  const { authenticated } = useAuthState();

  const [phases, phasesReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_PHASES}/${props.tournamentRegimeId}`,
    method: 'GET',
    refreshTrigger: phasesTrigger,
    conditions: [authenticated]
  });

  const generateOptions = () => {
    if (phases && phases.length) {
      return phases.map(phase => {
        return <Option value={phase.TournamentPhaseId} key={phase.TournamentPhaseId}>{phase.Description}</Option>;
      })
    }
  }

  const phaseIdSelected = (phaseId) => {
    if (props.onChange) {
      props.onChange(phaseId);
    }
  }

  return (
    <Select
      allowClear
      style={{ width: props.width || 250 }}
      showSearch
      filterOption={(inputValue, option) => {
        return option.props.children.toString().toLowerCase().includes(inputValue.toLowerCase());
      }}
      defaultValue={props.value || null}
      onChange={phaseIdSelected}
      size={props.size || 'small'}
    >
      {generateOptions()}
    </Select>
  )
}

export default TournamentPhasesSelect;