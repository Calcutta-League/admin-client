import React, { useState, Fragment } from 'react';
import { Button, Modal, Row } from 'antd';
import 'antd/dist/antd.css';
import { TournamentProvider } from '../../context/tournamentContext';
import TournamentTable from './tournamentTable';
import NewTournamentForm from './newTournamentForm';
import './tournamentStyle.css';
import { navigate } from '@reach/router';

function Tournaments() {

  const [modalVisible, setModalVisible] = useState(false);

  const showNewTournamentModal = () => {
    setModalVisible(true);
  }

  const hideNewTournamentModal = () => {
    setModalVisible(false);
  }

  const continueTournamentCreation = (newTournamentId) => {
    setModalVisible(false);

    // navigate to the new tournament's page
    navigate(`tournaments/${newTournamentId}`);
  }

  return (
    <Fragment>
      <TournamentTable />
      <Row justify='center'>
        <Button
          type='primary'
          size='small'
          onClick={showNewTournamentModal}
          style={{ marginTop: 12 }}
        >
          New Tournament
        </Button>
      </Row>
      <Modal
        visible={modalVisible}
        title='New Tournament'
        onCancel={hideNewTournamentModal}
        footer={null}
      >
        <NewTournamentForm continue={continueTournamentCreation} />
      </Modal>
    </Fragment>
  );
}

export default Tournaments;