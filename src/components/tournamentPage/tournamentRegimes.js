import React, { useState, Fragment } from 'react';
import { Divider, Modal, Row, Col, Button } from 'antd';
import { useTournamentDispatch } from '../../context/tournamentContext';
import TournamentRegimeTable from './tournamentRegimeTable';
import NewTournamentRegimeForm from './newTournamentRegimeForm';

function TournamentRegimes(props) {

  const [visible, setVisible] = useState(false);

  const tournamentDispatch = useTournamentDispatch();

  const dismissNewTournamentRegimeModal = (triggerRegimeDownload) => {
    dismiss();

    if (triggerRegimeDownload) {
      tournamentDispatch({ type: 'update', key: 'tournamentRegimeRefreshTrigger', value: new Date().valueOf() });
    }
  }

  const dismiss = () => {
    setVisible(false);
  }

  const newTournamentRegime = () => {
    setVisible(true);
  }

  return (
    <Fragment>
      <Row justify='center'>
        <Col span={20}>
          <Divider orientation='left'>Tournament Regimes</Divider>
          <TournamentRegimeTable tournamentId={props.tournamentId} />
          <Modal
            open={visible}
            width={720}
            title='New Tournament Regime'
            onCancel={dismiss}
            footer={null}
          >
            <NewTournamentRegimeForm tournamentId={props.tournamentId} dismiss={dismissNewTournamentRegimeModal} />
          </Modal>
        </Col>
      </Row>
      <Row justify='center'>
        <Button
          type='primary'
          size='small'
          onClick={newTournamentRegime}
          style={{ marginTop: 12 }}
        >
          New Regime
        </Button>
      </Row>
    </Fragment>
  )
}

export default TournamentRegimes;