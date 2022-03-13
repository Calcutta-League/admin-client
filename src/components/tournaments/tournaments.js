import React, { useState } from 'react';
import { Button, Modal, Row } from 'antd';
import 'antd/dist/antd.css';
import { TournamentProvider } from '../../context/tournamentContext';
import TournamentTable from './tournamentTable';
import NewTournamentForm from './newTournamentForm';
import './tournamentStyle.css';

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
  }

  return (
    <TournamentProvider>
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
    </TournamentProvider>
  );
}

export default Tournaments;