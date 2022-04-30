import React, { useState } from 'react';
import { Select } from 'antd';
import { useAuthState } from '../../context/authContext';
import useData from '../../hooks/useData';
import { API_CONFIG, TOURNAMENT_SETTINGS_SERVICE_ENDPOINTS } from '../../utilities/constants';

const { Option } = Select;

function PayoutTypesSelect(props) {

  const [trigger, setTrigger] = useState(null);

  const { authenticated } = useAuthState();

  const [payoutTypes, payoutTypesReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SETTINGS_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SETTINGS_SERVICE_ENDPOINTS.GET_PAYOUT_TYPES,
    method: 'GET',
    refreshTrigger: trigger,
    conditions: [authenticated]
  });

  const generateOptions = () => {
    if (payoutTypes && payoutTypes.length) {
      return payoutTypes.map(payout => {
        return <Option value={payout.PayoutTypeId} key={payout.PayoutTypeId}>{payout.Description}</Option>;
      });
    }
  }

  const payoutTypeSelected = (payoutTypeId) => {
    if (props.onChange) {
      props.onChange(payoutTypeId);
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
      onChange={payoutTypeSelected}
      size={props.size || 'small'}
    >
      {generateOptions()}
    </Select>
  )
}

export default PayoutTypesSelect;