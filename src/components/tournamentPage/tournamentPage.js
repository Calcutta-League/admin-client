import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Switch, Card } from 'antd';
import 'antd/dist/antd.css';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import TournamentPhases from './tournamentPhases';
import TournamentRegimes from './tournamentRegimes';
import useData from '../../hooks/useData';
import TournamentRegimePhases from './tournamentRegimePhases';
import { useTournamentDispatch } from '../../context/tournamentContext';

const { Title } = Typography;

function TournamentPage(props) {

  const [name, setName] = useState(null);
  const [adminOnly, setAdminOnly] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const [metadataLoading, setMetadataLoading] = useState(true);

  const [triggerMetadata, setTriggerMetadata] = useState(null);

  const [triggerAdminOnly, setTriggerAdminOnly] = useState(null);
  const [adminOnlyPayload, setAdminOnlyPayload] = useState(null);
  const [adminOnlyFlag, setAdminOnlyFlag] = useState(false);

  const [triggerDisabledFlag, setTriggerDisabledFlag] = useState(null);
  const [disabledFlagPayload, setDisabledFlagPayload] = useState(null);
  const [disabledFlagAllowed, setDisabledFlagAllowed] = useState(false);

  const { authenticated } = useAuthState();

  const tournamentDispatch = useTournamentDispatch();

  const [metadata, metadataReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_METADATA}/${props.tournamentId}`,
    method: 'GET',
    refreshTrigger: triggerMetadata,
    conditions: [authenticated]
  });

  const [adminFlagResponse, adminFlagReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.SET_TOURNAMENT_ADMIN_FLAG,
    method: 'POST',
    refreshTrigger: triggerAdminOnly,
    payload: adminOnlyPayload,
    conditions: [authenticated, adminOnlyFlag, !!triggerAdminOnly]
  });

  const [disabledFlagResponse, disabledFlagReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.SET_TOURNAMENT_DISABLED_FLAG,
    method: 'POST',
    refreshTrigger: triggerDisabledFlag,
    payload: disabledFlagPayload,
    conditions: [authenticated, disabledFlagAllowed, !!triggerDisabledFlag]
  });

  useEffect(() => {
    return (() => {
      tournamentDispatch({ type: 'update', key: 'selectedRegimeId', value: null });
      tournamentDispatch({ type: 'update', key: 'regimePhaseRefreshTrigger', value: null });
    })
  }, []);

  useEffect(() => {
    if (metadata && metadata.length) {
      setName(metadata[0].TournamentName);
      setAdminOnly(metadata[0].TestOnly);
      setDisabled(!!metadata[0].Invalidated);
    }

    setMetadataLoading(false);
  }, [metadataReturnDate]);

  useEffect(() => {
    if (!!adminFlagReturnDate) {
      triggerMetadataDownload();
      setAdminOnlyFlag(false);
    }
  }, [adminFlagReturnDate]);

  useEffect(() => {
    if (!!disabledFlagReturnDate) {
      triggerMetadataDownload();
      setDisabledFlagAllowed(false);
    }
  }, [disabledFlagReturnDate]);

  const triggerMetadataDownload = () => {
    setMetadataLoading(true);
    setTriggerMetadata(new Date().valueOf());
  }

  const tournamentAdminOnlyChanged = (value) => {
    setAdminOnly(value);

    const data = {
      tournamentId: props.tournamentId,
      adminFlag: value
    };

    setAdminOnlyPayload(data);
    setAdminOnlyFlag(true);
    setTriggerAdminOnly(new Date().valueOf());
  }

  const tournamentDisabledChanged = (value) => {
    setDisabled(value);

    const data = {
      tournamentId: props.tournamentId,
      disabledFlag: value
    }

    setDisabledFlagPayload(data);
    setDisabledFlagAllowed(true);
    setTriggerDisabledFlag(new Date().valueOf());
  }

  return (
    <Fragment>
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
            <Switch checked={adminOnly} onChange={tournamentAdminOnlyChanged} />
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
            <Switch checked={disabled} onChange={tournamentDisabledChanged} />
          </Card>
        </Col>
      </Row>
      <TournamentPhases tournamentId={props.tournamentId} />
      <TournamentRegimes tournamentId={props.tournamentId} />
      <TournamentRegimePhases tournamentId={props.tournamentId} />
    </Fragment>
  );
}

export default TournamentPage;