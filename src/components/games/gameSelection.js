import React, { useState } from 'react';
import { Input, Row, Col, Select, DatePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;

function GameSelection() {

  const [sportId, setSportId] = useState();
  const [dateString, setDateString] = useState('');

  const generateOptions = () => {
    return (
      [
        <Option value={5} key={5}>Major League Baseball</Option>,
        <Option value={6} key={6}>National Hockey League</Option>,
        <Option value={7} key={7}>National Basketball Association</Option>
      ]
    );
  }

  const handleSportSelection = (sportId) => {
    console.log(sportId);
    setSportId(sportId);

    requestGames();
  }

  const handleDateSelection = (dateObj, dateString) => {
    console.log(dateString);
    setDateString(dateString);

    requestGames();
  }

  const requestGames = () => {
    if (sportId && dateString) {
      // send API request
    }
  }

  return (
    <Input.Group size='medium'>
      <Row gutter={[0, 32]} justify='center' style={{ marginTop: '16px' }}>
        <Col>
          <Select style={{ width: '280px', margin: '0 12px' }} value={sportId} onChange={handleSportSelection}>
            {generateOptions()}
          </Select>
          <DatePicker style={{ width: '280px', margin: '0 12px', justifyContent: 'center' }} onChange={handleDateSelection} />
        </Col>
      </Row>
    </Input.Group>
  );
}

export default GameSelection;