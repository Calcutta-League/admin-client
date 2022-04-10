import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col, Card, Switch, Button, Divider } from 'antd';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import useData from '../../hooks/useData';
import TournamentSlotsTable from './tournamentSlotsTable';

const { Content } = Layout;
const { Title } = Typography;

function TournamentRegimePage(props) {

  const [metadataLoading, setMetadataLoading] = useState(true);
  const [adminOnly, setAdminOnly] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [slotCount, setSlotCount] = useState(null);

  const [metadataTrigger, setMetadataTrigger] = useState(null);

  const { authenticated } = useAuthState();

  const [metadata, metadataReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_METADATA}/${props.tournamentRegimeId}`,
    method: 'GET',
    refreshTrigger: metadataTrigger,
    conditions: [authenticated]
  });

  useEffect(() => {
    if (metadataReturnDate && metadata.length > 0) {
      console.log(metadata);
      setMetadataLoading(false);

      setAdminOnly(metadata[0].TestOnly);
      setDisabled(!!metadata[0].InvalidatedDate);
      setSlotCount(metadata[0].SlotCount);
    }
  }, [metadataReturnDate]);

  // need five POST endpoints:
    // AdminOnly
    // Disabled
    // Bulk Load
    // Single Load
    // Single Remove

  const regimeAdminOnlyChanged = () => {

  }

  const regimeDisabledChanged = () => {
    
  }

  const bulkLoadTournamentSlots = () => {

  }

  return (
    <Content>
      <Row justify='center'>
        <Title level={1}>{props.location.state.tournamentRegimeName}</Title>
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
            <Switch defaultChecked={adminOnly} onChange={regimeAdminOnlyChanged} />
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
            <Switch defaultChecked={disabled} onChange={regimeDisabledChanged} />
          </Card>
        </Col>
      </Row>
      <Row justify='center'>
        <Col span={20}>
          <Divider orientation='left'>Tournament Slots</Divider>
        </Col>
      </Row>
      <Row justify='center'>
        <Button
          type='primary'
          size='small'
          onClick={bulkLoadTournamentSlots}
          style={{ marginTop: 8, marginBottom: 8 }}
        >
          Bulk Load
        </Button>
      </Row>
      <Row justify='center'>
        <Col span={20}>
          <TournamentSlotsTable tournamentRegimeId={props.tournamentRegimeId} />
        </Col>
      </Row>
    </Content>
  );
}

export default TournamentRegimePage;