import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { useAuthState } from '../../context/authContext';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import useData from '../../hooks/useData';

const { Option } = Select;

function BracketTypes(props) {

  const [bracketTypesLoading, setBracketTypesLoading] = useState(true);

  const { authenticated } = useAuthState();

  const [bracketTypes, bracketTypesReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.GET_BRACKET_TYPES,
    method: 'GET',
    conditions: [authenticated]
  });

  useEffect(() => {
    if (bracketTypesReturnDate) {
      setBracketTypesLoading(false);
    }
  }, [bracketTypesReturnDate]);

  const generateBracketOptions = () => {
    if (bracketTypes && bracketTypes.length && !props.loading) {
      return bracketTypes.map(bracket => {
        return <Option value={bracket.BracketTypeId} key={bracket.BracketTypeId}>{bracket.BracketName}</Option>
      });
    }

    return null;
  }

  return (
    <Select
      allowClear
      style={props.style}
      loading={props.loading || bracketTypesLoading}
      defaultValue={props.selectedBracketId}
      onChange={props.onChange}
    >
      {generateBracketOptions()}
    </Select>
  );
}

export default BracketTypes;