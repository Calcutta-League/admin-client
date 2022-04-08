import React, { useState, Fragment } from 'react';
import { Divider, Modal, Row, Col, Button, message } from 'antd';
import NewTournamentRegimePhaseForm from './newTournamentRegimePhaseForm';
import { useTournamentDispatch, useTournamentState } from '../../context/tournamentContext';
import TournamentRegimePhaseTable from './tournamentRegimePhaseTable';

function TournamentRegimePhases(props) {

  const [visible, setVisible] = useState(false);

  const { selectedRegimeId } = useTournamentState();
  const tournamentDispatch = useTournamentDispatch();

  const dismissNewTournamentRegimePhaseModal = (triggerRegimePhaseDownload) => {
    dismiss();

    if (triggerRegimePhaseDownload) {
      tournamentDispatch({ type: 'update', key: 'regimePhaseRefreshTrigger', value: new Date().valueOf() });
    }
  }

  const displayModal = () => {
    if (!!selectedRegimeId) {
      setVisible(true);
    } else {
      message.error('Please select a Tournament Regime');
    }
  }

  const dismiss = () => {
    setVisible(false);
  }

  return (
    <Fragment>
      <Row justify='center'>
        <Col span={20}>
          <Divider orientation='left'>Tournament Regime Phases</Divider>
          <TournamentRegimePhaseTable />
          <Modal
            visible={visible}
            title='Set Tournament Regime Phases'
            onCancel={dismiss}
            footer={null}
          >
            <NewTournamentRegimePhaseForm tournamentId={props.tournamentId} dismiss={dismissNewTournamentRegimePhaseModal} />
          </Modal>
        </Col>
      </Row>
      <Row justify='center'>
        <Button
          type='primary'
          size='small'
          onClick={displayModal}
          style={{ marginTop: 12 }}
        >
          Set Regime Phases
        </Button>
      </Row>
    </Fragment>
  )
}

export default TournamentRegimePhases;