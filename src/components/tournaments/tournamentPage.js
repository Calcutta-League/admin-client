import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Divider, Layout, Table, Switch, Card, Button } from 'antd';
import 'antd/dist/antd.css';
import TournamentService from '../../services/tournament/tournament.service';
import { TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import { navigate } from '@reach/router';

const { Content } = Layout;
const { Title } = Typography;
const { Column } = Table;

function TournamentPage(props) {

  const [name, setName] = useState(null);
  const [adminOnly, setAdminOnly] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const [metadataLoading, setMetadataLoading] = useState(true);
  const [phases, setPhases] = useState([]);
  const [phasesLoading, setPhasesLoading] = useState(true);
  const [regimes, setRegimes] = useState([]);
  const [regimesLoading, setRegimesLoading] = useState(true);
  const [selectedRegimeId, setSelectedRegimeId] = useState(null);
  const [regimePhases, setRegimePhases] = useState([]);
  const [regimePhasesLoading, setRegimePhasesLoading] = useState(false);

  const { authenticated, token } = useAuthState();

  useEffect(() => {
    if (!!authenticated) {
      fetchMetadata();
      fetchPhases();
      fetchRegimes();
    }
  }, [authenticated]);

  useEffect(() => {
    if (!!authenticated && selectedRegimeId != null) {
      fetchRegimePhases();
    }
  }, [authenticated, selectedRegimeId]);

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

  const fetchPhases = () => {
    TournamentService.callApi(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_PHASES, { tournamentId: props.tournamentId, token: token }).then(res => {
      let data = res.data;

      if (data.length > 0) {
        setPhases(data);
      }
      setPhasesLoading(false);
    }).catch(error => {
      console.log(error);
      setPhasesLoading(false);
    })
  }

  const fetchRegimes = () => {
    TournamentService.callApi(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIMES, { tournamentId: props.tournamentId, token: token }).then(res => {
      let data = res.data;

      if (data.length > 0) {
        setRegimes(data);
      }
      setRegimesLoading(false);
    }).catch(error => {
      console.log(error);
      setRegimesLoading(false);
    })
  }

  const fetchRegimePhases = () => {
    TournamentService.callApi(TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_PHASES, { tournamentRegimeId: selectedRegimeId, token: token }).then(res => {
      let data = res.data;
      console.log(data);
      if (data.length > 0) {
        setRegimePhases(data);
      }
      setRegimePhasesLoading(false);
    }).catch(error => {
      console.log(error);
      setRegimePhasesLoading(false);
    });
  }

  const tournamentAdminOnlyChanged = (value) => {
    setAdminOnly(value);
    // TODO: implement
  }

  const tournamentDisabledChanged = (value) => {
    setDisabled(value);
    // TODO: implement
  }

  const deletePhase = (phaseId) => {
    console.log(phaseId);
    // TODO: display warning popup
    // 1. flips table loading flag
    // 2. calls delete endpoint
    // 3. calls fetchPhases()
  }

  const newTournamentPhase = () => {
    // TODO: implement
  }

  const newTournamentRegime = () => {
    // TODO: implement
  }

  const regimeAdminFlagChanged = (value, event) => {
    event.stopPropagation();
    // TODO: implement
  }

  const regimeDisabledFlagChanged = (value, event) => {
    event.stopPropagation();
    // TODO: implement
  }

  const regimeSelected = (regime) => {
    if (regime.TournamentRegimeId != selectedRegimeId) {
      setRegimePhasesLoading(true);
    }
    
    setSelectedRegimeId(regime.TournamentRegimeId);
  }

  const navigateToRegimePage = (tournamentRegimeId, tournamentRegimeName) => {
    navigate(`/tournamentRegime/${tournamentRegimeId}`, { state: { tournamentRegimeName: tournamentRegimeName } });
  }

  const getRowClass = (record) => {
    if (record.TournamentRegimeId == selectedRegimeId) {
      return 'row-selected row-clickable';
    }
    return 'row-clickable';
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
      <Row justify='center'>
        <Col span={20}>
          <Divider orientation='left'>Tournament Phases</Divider>
          <Table
            dataSource={phases}
            loading={phasesLoading}
            pagination={false}
            rowKey='TournamentPhaseId'
            size='small'
          >
            <Column
              align='left'
              dataIndex='Description'
              title='Tournament Phase'
            />
            <Column
              align='center'
              dataIndex='Status'
              title='Status'
            />
            <Column
              align='right'
              render={(text, record) => {
                return (
                  <Button
                    type='primary'
                    danger
                    size='small'
                    onClick={() => { deletePhase(record.TournamentPhaseId) }}
                  >
                    Delete
                  </Button>
                )
              }}
            />
          </Table>
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
      <Row justify='center'>
        <Col span={20}>
          <Divider orientation='left'>Tournament Regimes</Divider>
          <Table
            dataSource={regimes}
            loading={regimesLoading}
            pagination={false}
            onRow={(record) => {
              return {
                onClick: (event) => {
                  regimeSelected(record)
                }
              }
            }}
            rowClassName={getRowClass}
            rowKey='TournamentRegimeId'
            size='small'
          >
            <Column
              align='left'
              dataIndex='TournamentRegimeName'
              title='TournamentRegime'
            />
            <Column
              align='center'
              dataIndex='TestOnly'
              title='Admin Only'
              render={(value) => {
                return <Switch defaultChecked={value} onChange={regimeAdminFlagChanged} />
              }}
            />
            <Column
              align='center'
              dataIndex='InvalidatedDate'
              title='Disabled'
              render={(value) => {
                let checked = !!value;
                return <Switch defaultChecked={checked} onChange={regimeDisabledFlagChanged} />
              }}
            />
            <Column
              align='center'
              title='Setup Status'
            />
            <Column
              align='right'
              title='Tournament Slots'
              render={(text, record) => {
                return (
                  <Button
                    type='primary'
                    size='small'
                    onClick={(event) => {
                      event.stopPropagation()
                      navigateToRegimePage(record.TournamentRegimeId, record.TournamentRegimeName)
                    }}
                  >
                    Add/Edit
                  </Button>
                );
              }}
            />
          </Table>
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
      <Row justify='center'>
        <Col span={20}>
          <Divider orientation='left'>Tournament Regime Phases</Divider>
          <Table
            dataSource={regimePhases}
            loading={regimePhasesLoading}
            pagination={false}
            rowKey='TournamentPhaseId'
            size='small'
          >
            <Column
              align='left'
              dataIndex='Description'
              title='Tournament Phase'
            />
            <Column
              align='center'
              dataIndex='Status'
              title='Status'
            />
          </Table>
          {/* Add RegimePhase Button */}
        </Col>
      </Row>
    </Content>
  );
}

export default TournamentPage;