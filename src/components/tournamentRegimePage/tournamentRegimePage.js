import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col, Card, Switch, Button, Table } from 'antd';
import Column from 'rc-table/lib/sugar/Column';
import TournamentService from '../../services/tournament/tournament.service';
import { TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';

const { Content } = Layout;
const { Title } = Typography;

function TournamentRegimePage(props) {

  const [metadataLoading, setMetadataLoading] = useState(true);
  const [adminOnly, setAdminOnly] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [slotCount, setSlotCount] = useState(null);
  const [regimeSlotsLoading, setRegimeSlotsLoading] = useState(true);
  const [regimeSlots, setRegimeSlots] = useState([]);

  const { authenticated, token } = useAuthState();

  useEffect(() => {
    if (!!authenticated) {
      fetchMetadata();
      fetchSlots();
    }
  }, [authenticated]);

  const fetchMetadata = () => {
    const regimeId = props.tournamentRegimeId;

    TournamentService.callApi(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_METADATA, { tournamentRegimeId: regimeId, token: token }).then(res => {
      let data = res.data;

      if (data.length > 0) {
        let adminOnly = data[0].TestOnly;
        let disabled = !!data[0].InvalidatedDate;
        let slotCount = data[0].SlotCount;

        setAdminOnly(adminOnly);
        setDisabled(disabled);
        setSlotCount(slotCount);
      }
      setMetadataLoading(false);
    }).catch(error => {
      console.log(error);
      setMetadataLoading(false);
    })
  }

  const fetchSlots = () => {
    const regimeId = props.tournamentRegimeId;

    TournamentService.callApi(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_SLOTS, { tournamentRegimeId: regimeId, token: token }).then(res => {
      const data = res.data;

      if (data.length > 0) {
        setRegimeSlots(data);
      }
      setRegimeSlotsLoading(false);
    }).catch(error => {
      console.log(error);
      setMetadataLoading(false);
    })
  }

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

  const removeSlot = () => {

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
          <Table
            dataSource={regimeSlots}
            loading={regimeSlotsLoading}
            pagination={false}
            rowKey='TournamentSlotId'
            size='small'
          >
            <Column
              align='left'
              dataIndex='TournamentSlotName'
              title='Name'
            />
            <Column
              align='center'
              dataIndex='Seed'
              title='Seed'
            />
            <Column
              align='center'
              dataIndex='Region'
              title='Region'
            />
            <Column
              align='right'
              render={(text, record) => {
                return (
                  <Button
                    type='primary'
                    danger
                    size='small'
                    onClick={(event) => {
                      event.stopPropagation();
                      removeSlot(record.TournamentSlotId)
                    }}
                  >
                    Remove
                  </Button>
                );
              }}
            />
          </Table>
        </Col>
      </Row>
    </Content>
  );
}

export default TournamentRegimePage;