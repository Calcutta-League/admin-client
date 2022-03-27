import React, { useEffect, useState } from 'react';
import { Row, Col, Divider, Typography, Layout, Switch, Card, Button, message, Modal } from 'antd';
import 'antd/dist/antd.css';
import TournamentService from '../../services/tournament/tournament.service';
import { TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import TournamentRegimeTable from './tournamentRegimeTable';
import TournamentRegimePhaseTable from './tournamentRegimePhaseTable';
import TournamentPhases from './tournamentPhases';
import TournamentRegimes from './tournamentRegimes';

const { Content } = Layout;
const { Title } = Typography;

function TournamentPage(props) {

  const [name, setName] = useState(null);
  const [adminOnly, setAdminOnly] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const [metadataLoading, setMetadataLoading] = useState(true);

  const [newTournamentPhaseModalVisible, setNewTournamentPhaseModalVisible] = useState(false);

  const { authenticated, token } = useAuthState();

  useEffect(() => {
    if (!!authenticated) {
      fetchMetadata();
    }
  }, [authenticated]);

  const fetchMetadata = () => {
    TournamentService.callApi(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_METADATA, { tournamentId: props.tournamentId, token: token }).then(res => {
      let data = res.data;

      if (data.length > 0) {
        let name = data[0].TournamentName;
        let adminOnly = data[0].TestOnly;
        let disabled = !!data[0].Invalidated

        setName(name);
        setAdminOnly(adminOnly);
        setDisabled(disabled);
      }
      setMetadataLoading(false);
    }).catch(error => {
      console.log(error);
      setMetadataLoading(false);
    })
  }

  const tournamentAdminOnlyChanged = (value) => {
    setAdminOnly(value);
    // TODO: implement
    message.error('Not Implemented Yet');
  }

  const tournamentDisabledChanged = (value) => {
    setDisabled(value);
    // TODO: implement
    message.error('Not Implemented Yet');
  }

  const newTournamentRegime = () => {
    // TODO: implement
    message.error('Not Implemented Yet');
  }

  const newTournamentRegimePhase = () => {
    // TODO: implement
    message.error('Not Implemented Yet');
  }

  return (
    <Content>
      <Row justify='center'>
        <Title level={1}>{name}</Title>
      </Row>
      <Row justify='space-around'>
        <Col xs={10} sm={8} md={4}>
          <Card
            title='Admin Only'
            size='small'
            loading={metadataLoading}
            bodyStyle={{ textAlign: 'center' }}
            headStyle={{ textAlign: 'center '}}
          >
            <Switch defaultChecked={adminOnly} onChange={tournamentAdminOnlyChanged} />
          </Card>
        </Col>
        <Col xs={10} sm={8} md={4}>
          <Card
            title='Disabled'
            size='small'
            loading={metadataLoading}
            bodyStyle={{ textAlign: 'center' }}
            headStyle={{ textAlign: 'center '}}
          >
            <Switch defaultChecked={disabled} onChange={tournamentDisabledChanged} />
          </Card>
        </Col>
      </Row>
      <TournamentPhases tournamentId={props.tournamentId} />
      <TournamentRegimes tournamentId={props.tournamentId} />
      <Row justify='center'>
        <Col span={20}>
          <Divider orientation='left'>Tournament Regime Phases</Divider>
          <TournamentRegimePhaseTable />
        </Col>
      </Row>
      <Row justify='center'>
        <Button
          type='primary'
          size='small'
          onClick={newTournamentRegimePhase}
          style={{ marginTop: 12 }}
        >
          New Regime Phase
        </Button>
      </Row>
    </Content>
  );
}

export default TournamentPage;