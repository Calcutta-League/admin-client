import React from 'react';
import { Row, Col } from 'antd';
import TournamentRegimePayoutTable from './tournamentRegimePayoutTable';

function TournamentRegimePayouts(props) {

  return (
    <Row justify='center'>
      <Col span={20}>
        <TournamentRegimePayoutTable tournamentRegimeId={props.tournamentRegimeId} />
      </Col>
    </Row>
  )
}

export default TournamentRegimePayouts;