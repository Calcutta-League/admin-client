import React, { useState, Fragment } from 'react';
import { Divider, Modal, Row, Col, Button } from 'antd';
import TournamentPhaseTable from './tournamentPhaseTable';
import NewTournamentPhaseForm from '../tournaments/newTournamentPhaseForm';
import { useTournamentDispatch } from '../../context/tournamentContext';

function TournamentPhases(props) {

  const [visible, setVisible] = useState(false);

  const tournamentDispatch = useTournamentDispatch();

  const dismissNewTournamentPhaseModal = (triggerPhasesDownload) => {
    dismiss();

    if (triggerPhasesDownload) {
      console.log('trigger phase download flag');
      tournamentDispatch({ type: 'update', key: 'tournamentPhaseRefreshTrigger', value: new Date().valueOf() });
    }
  }

  const dismiss = () => {
    setVisible(false);
  }

  const newTournamentPhase = () => {
    setVisible(true);
  }

  return (
    <Fragment>
      <Row justify='center'>
        <Col span={20}>
          <Divider orientation='left'>Tournament Phases</Divider>
          <TournamentPhaseTable tournamentId={props.tournamentId} />
          <Modal
            visible={visible}
            title='New Tournament Phase'
            onCancel={dismiss}
            footer={null}
          >
            <NewTournamentPhaseForm tournamentId={props.tournamentId} dismiss={dismissNewTournamentPhaseModal} />
          </Modal>
        </Col>
      </Row>
      <Row justify='center'>
        <Button
          type='primary'
          size='small'
          onClick={newTournamentPhase}
          style={{ marginTop: 12 }}
        >
          New Phase
        </Button>
      </Row>
    </Fragment>
  )
}

export default TournamentPhases;