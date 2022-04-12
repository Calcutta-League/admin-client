import React, { useState, useEffect } from 'react';
import { Card, Switch, message } from 'antd'
import BracketTypes from '../bracketTypes/bracketTypes';
import { API_CONFIG, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import useData from '../../hooks/useData';
import { useTournamentDispatch } from '../../context/tournamentContext';

function AdminFlagCard(props) {

  const [adminFlagPayload, setAdminFlagPayload] = useState(null);
  const [adminFlagTrigger, setAdminFlagTrigger] = useState(null);
  const [allowAdminFlagUpdate, setAllowAdminFlagUpdate] = useState(false);

  const { authenticated } = useAuthState();

  const tournamentDispatch = useTournamentDispatch();

  const [setAdminFlag, setAdminFlagReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.SET_TOURNAMENT_REGIME_ADMIN_FLAG,
    method: 'POST',
    payload: adminFlagPayload,
    refreshTrigger: adminFlagTrigger,
    conditions: [authenticated, allowAdminFlagUpdate]
  });

  useEffect(() => {
    setAllowAdminFlagUpdate(false);

    if (setAdminFlagReturnDate) {
      tournamentDispatch({ type: 'update', key: 'tournamentRegimeMetadataTrigger', value: new Date().valueOf() });
    }
  }, [setAdminFlagReturnDate]);

  const regimeAdminOnlyChanged = (value) => {
    const payload = {
      tournamentRegimeId: props.tournamentRegimeId,
      adminFlag: value
    };

    setAdminFlagPayload(payload);
    setAdminFlagTrigger(new Date().valueOf());
    setAllowAdminFlagUpdate(true);
  }

  return (
    <Card
      title='Admin Only'
      size='small'
      loading={props.loading}
      bodyStyle={{ textAlign: 'center' }}
      headStyle={{ textAlign: 'center '}}
    >
      <Switch defaultChecked={props.adminOnly} onChange={regimeAdminOnlyChanged} />
    </Card>
  );
}

function BracketTypeCard(props) {

  const [bracketTypePayload, setBracketTypePayload] = useState(null);
  const [bracketTypeTrigger, setBracketTypeTrigger] = useState(null);
  const [bracketTypeUpdateFlag, setBracketTypeUpdateFlag] = useState(false);

  const { authenticated } = useAuthState();
  const tournamentDispatch = useTournamentDispatch();

  const [updateBracketType, updateBracketTypeReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.SET_TOURNAMENT_REGIME_BRACKET_TYPE,
    method: 'POST',
    payload: bracketTypePayload,
    refreshTrigger: bracketTypeTrigger,
    conditions: [authenticated, bracketTypeUpdateFlag]
  });

  useEffect(() => {
    setBracketTypeUpdateFlag(false);
    
    if (updateBracketTypeReturnDate) {
      tournamentDispatch({ type: 'update', key: 'tournamentRegimeMetadataTrigger', value: new Date().valueOf() });
    }
  }, [updateBracketTypeReturnDate]);

  const bracketTypeChanged = (value) => {
    console.log(props.tournamentRegimeId);
    const payload = {
      tournamentRegimeId: props.tournamentRegimeId,
      bracketTypeId: value
    };

    setBracketTypePayload(payload);
    setBracketTypeTrigger(new Date().valueOf());
    setBracketTypeUpdateFlag(true);
  }

  return (
    <Card
      title='Bracket Type'
      size='small'
      loading={props.loading}
      bodyStyle={{ textAlign: 'center' }}
      headStyle={{ textAlign: 'center '}}
    >
      <BracketTypes
        loading={props.loading}
        selectedBracketId={props.bracketTypeId}
        style={{ width: '100%' }}
        onChange={bracketTypeChanged}
      />
    </Card>
  )
}

function DisabledFlagCard(props) {

  const [disabledFlagPayload, setDisabledFlagPayload] = useState(null);
  const [disabledFlagTrigger, setDisabledFlagTrigger] = useState(null);
  const [allowDisabledFlagUpdate, setAllowDisabledFlagUpdate] = useState(false);

  const { authenticated } = useAuthState();

  const tournamentDispatch = useTournamentDispatch();

  const [setDisabledFlag, setDisabledFlagReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.SET_TOURNAMENT_REGIME_DISABLED_FLAG,
    method: 'POST',
    payload: disabledFlagPayload,
    refreshTrigger: disabledFlagTrigger,
    conditions: [authenticated, allowDisabledFlagUpdate]
  });

  useEffect(() => {
    setAllowDisabledFlagUpdate(false);

    if (setDisabledFlagReturnDate) {
      tournamentDispatch({ type: 'update', key: 'tournamentRegimeMetadataTrigger', value: new Date().valueOf() });
    }
  }, [setDisabledFlagReturnDate]);

  const regimeDisabledChanged = (value) => {
    const payload = {
      tournamentRegimeId: props.tournamentRegimeId,
      disabledFlag: value
    };

    setDisabledFlagPayload(payload);
    setDisabledFlagTrigger(new Date().valueOf());
    setAllowDisabledFlagUpdate(true);
  }

  return (
    <Card
      title='Disabled'
      size='small'
      loading={props.loading}
      bodyStyle={{ textAlign: 'center' }}
      headStyle={{ textAlign: 'center '}}
    >
      <Switch defaultChecked={props.disabled} onChange={regimeDisabledChanged} />
    </Card>
  );
}

export {
  AdminFlagCard,
  BracketTypeCard,
  DisabledFlagCard
}