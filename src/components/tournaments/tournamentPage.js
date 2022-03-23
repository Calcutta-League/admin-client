import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Layout, Switch, Card, Button, message } from 'antd';
import 'antd/dist/antd.css';
import TournamentService from '../../services/tournament/tournament.service';
import { TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import TournamentPhaseTable from './tournamentPhaseTable';
import TournamentRegimeTable from './tournamentRegimeTable';
import TournamentRegimePhaseTable from './tournamentRegimePhaseTable';

const { Content } = Layout;
const { Title } = Typography;

function TournamentPage(props) {

  const [name, setName] = useState(null);
  const [adminOnly, setAdminOnly] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const [metadataLoading, setMetadataLoading] = useState(true);

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

  const newTournamentPhase = () => {
    // TODO: implement
    message.error('Not Implemented Yet');
  }

  const newTournamentRegime = () => {
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
      <TournamentPhaseTable tournamentId={props.tournamentId} />
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
      <TournamentRegimeTable tournamentId={props.tournamentId} />
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
      <TournamentRegimePhaseTable />
    </Content>
  );
}

export default TournamentPage;