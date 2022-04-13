import React from 'react';
import { Select } from 'antd';
import { useAuthState } from '../../context/authContext';
import useData from '../../hooks/useData';
import { API_CONFIG, SPORTS_SERVICE_ENDPOINTS } from '../../utilities/constants';

const { Option } = Select;

/**
 * @typedef SportTeamsSelectProps
 * @property {Number} sportId - the sportId with which to search for teams
 * @property {boolean} [formItem]
 * @property {Number} [width] - width of the select box in pixels (default = 250)
 */

/**
 * @component SportTeamsSelect
 * @param {SportTeamsSelectProps} props
 */
function SportTeamsSelect(props) {

  const { authenticated } = useAuthState();

  const [teams, teamsReturnDate] = useData({
    baseUrl: API_CONFIG.SPORTS_SERVICE_BASE_URL,
    endpoint: `${SPORTS_SERVICE_ENDPOINTS.GET_TEAMS_BY_SPORT_ID}/${props.sportId}`,
    method: 'GET',
    conditions: [authenticated]
  });

  const generateTeamOptions = () => {
    if (teams && teams.length) {
      return teams.map(team => {
        return <Option value={team.TeamId} key={team.TeamId}>{team.Name}</Option>
      });
    }

    return null;
  }

  const teamSelected = (teamId) => {
    if (props.onChange) {
      props.onChange(teamId);
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
      onChange={teamSelected}
    >
      {generateTeamOptions()}
    </Select>
  );
}

export default SportTeamsSelect;