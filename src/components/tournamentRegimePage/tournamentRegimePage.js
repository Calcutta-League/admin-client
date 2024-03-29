import React, { Fragment, useEffect, useState } from 'react';
import { Typography, Row, Col, Button, Divider, message, Input, Modal } from 'antd';
import { API_CONFIG, MANAGEMENT_SERVICE_ENDPOINTS, TOURNAMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import useData from '../../hooks/useData';
import TournamentSlotsTable from './tournamentSlotsTable';
import { AdminFlagCard, BracketTypeCard, DisabledFlagCard } from './metadataCards';
import { useTournamentDispatch, useTournamentState } from '../../context/tournamentContext';
import NewTournamentSlotForm from './newTournamentSlotForm';
import TournamentRegimePayouts from './tournamentRegimePayouts';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

function TournamentRegimePage() {

  const location = useLocation();

  const [tournamentRegimeId, setTournamentRegimeId] = useState(null);

  const [metadataLoading, setMetadataLoading] = useState(true);
  const [adminOnly, setAdminOnly] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [slotCount, setSlotCount] = useState(null);
  const [bracketTypeId, setBracketTypeId] = useState(null);
  const [regimeDescription, setRegimeDescription] = useState('');
  const [syncSlotsLoading, setSyncSlotsLoading] = useState(false);

  const { authenticated } = useAuthState();
  const { tournamentRegimeMetadataTrigger } = useTournamentState();

  const tournamentDispatch = useTournamentDispatch();

  const [metadata, metadataReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: `${TOURNAMENT_SERVICE_ENDPOINTS.GET_TOURNAMENT_REGIME_METADATA}/${tournamentRegimeId}`,
    method: 'GET',
    refreshTrigger: tournamentRegimeMetadataTrigger,
    conditions: [authenticated, tournamentRegimeId]
  });

  useEffect(() => {
    console.log(location);
    const parsedTournamentRegimeId = +location.pathname.match(/\d{1,}($|(?=\/))/ig)[0];
    setTournamentRegimeId(parsedTournamentRegimeId);
  }, []);

  useEffect(() => {
    if (metadataReturnDate && metadata.length > 0) {
      setMetadataLoading(false);

      setAdminOnly(metadata[0].TestOnly);
      setDisabled(!!metadata[0].InvalidatedDate);
      setSlotCount(metadata[0].SlotCount);
      setBracketTypeId(metadata[0].BracketTypeId);
      setRegimeDescription(metadata[0].Description);
    }
  }, [metadataReturnDate]);

  const [descriptionPayload, setDescriptionPayload] = useState(null);
  const [descriptionTrigger, setDescriptionTrigger] = useState(null);
  const [allowDescriptionUpdate, setAllowDescriptionUpdate] = useState(false);
  const [descriptionUpdateLoading, setDescriptionUpdateLoading] = useState(false);

  const [descriptionUpdate, descriptionUpdateReturnDate] = useData({
    baseUrl: API_CONFIG.TOURNAMENT_SERVICE_BASE_URL,
    endpoint: TOURNAMENT_SERVICE_ENDPOINTS.SET_TOURNAMENT_REGIME_DESCRIPTION,
    method: 'POST',
    payload: descriptionPayload,
    refreshTrigger: descriptionTrigger,
    conditions: [authenticated, allowDescriptionUpdate]
  });

  const [syncResponse, syncResponseReturnDate, syncSlots] = useData({
    baseUrl: API_CONFIG.MANAGEMENT_SERVICE_BASE_URL,
    endpoint: MANAGEMENT_SERVICE_ENDPOINTS.SYNCHRONIZE_SLOTS,
    method: 'POST',
    conditions: [false]
  });

  useEffect(() => {
    setAllowDescriptionUpdate(false);
    setDescriptionUpdateLoading(false);

    if (descriptionUpdateReturnDate) {
      tournamentDispatch({ type: 'update', key: 'tournamentRegimeMetadataTrigger', value: new Date().valueOf() });
    }
  }, [descriptionUpdateReturnDate]);

  useEffect(() => {
    if (syncResponseReturnDate) {
      setSyncSlotsLoading(false);
    }

    if (syncResponse && syncResponseReturnDate) {
      console.log(syncResponse);
    }
  }, [syncResponse, syncResponseReturnDate]);

  const [newSlotVisible, setNewSlotVisible] = useState(false);


  // todo endpoints:
    // Bulk Load
    // Single Load
    // Single Remove

  const regimeDescriptionChanged = ({ target: { value }}) => {
    setRegimeDescription(value);
  }

  const updateRegimeDescription = () => {
    setDescriptionUpdateLoading(true);
    
    setDescriptionPayload({
      tournamentRegimeId: tournamentRegimeId,
      description: regimeDescription
    });

    setDescriptionTrigger(new Date().valueOf());
    setAllowDescriptionUpdate(true);
  }

  const newTournamentSlot = () => {
    setNewSlotVisible(true);
  }

  const bulkLoadTournamentSlots = () => {
    message.error('Not implemented yet');
  }

  const synchronizeSlots = () => {
    setSyncSlotsLoading(true);
    syncSlots({ tournamentRegimeId: tournamentRegimeId });
  }

  const dismissNewSlotModal = (triggerSlotsDownload) => {
    dismiss();

    if (triggerSlotsDownload) {
      tournamentDispatch({ type: 'update', key: 'slotsTrigger', value: new Date().valueOf() });
    }
  }

  const dismiss = () => {
    setNewSlotVisible(false);
  }

  return (
    <Fragment>
      <Row justify='center'>
        <Title level={1}>{location.state.tournamentRegimeName}</Title>
      </Row>
      <Row justify='space-around'>
        <Col xs={8} sm={6} md={4}>
          <AdminFlagCard tournamentRegimeId={tournamentRegimeId} adminOnly={adminOnly} loading={metadataLoading} />
        </Col>
        <Col xs={8} sm={6} md={4}>
          <BracketTypeCard tournamentRegimeId={tournamentRegimeId} bracketTypeId={bracketTypeId} loading={metadataLoading} />
        </Col>
        <Col xs={8} sm={6} md={4}>
          <DisabledFlagCard tournamentRegimeId={tournamentRegimeId} disabled={disabled} loading={metadataLoading} />
        </Col>
      </Row>
      <Row justify='center'>
        <Col span={20}>
          <Divider orientation='left'>Tournament Regime Description</Divider>
        </Col>
      </Row>
      <Row justify='center'>
        <Col xs={20} sm={16} md={12}>
          <Input.TextArea
            allowClear
            maxLength={500}
            rows={4}
            showCount
            value={regimeDescription}
            onChange={regimeDescriptionChanged}
          />
        </Col>
      </Row>
      <Row justify='center'>
        <Button
          type='primary'
          size='small'
          loading={descriptionUpdateLoading}
          onClick={updateRegimeDescription}
          style={{ marginTop: 8, marginBottom: 8 }}
        >
          Update Regime Description
        </Button>
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
          onClick={newTournamentSlot}
          style={{ marginTop: 8, marginBottom: 8 }}
        >
          New Slot
        </Button>
        <Button
          type='primary'
          size='small'
          disabled
          onClick={bulkLoadTournamentSlots}
          style={{ marginTop: 8, marginBottom: 8 }}
        >
          Bulk Load
        </Button>
        <Button
          type='primary'
          size='small'
          loading={syncSlotsLoading}
          onClick={synchronizeSlots}
          style={{ marginTop: 8, marginBottom: 8 }}
        >
          Synchronize
        </Button>
      </Row>
      <Row justify='center'>
        <Col span={20}>
          <TournamentSlotsTable tournamentRegimeId={tournamentRegimeId} sportId={location.state.sportId} />
        </Col>
        <Modal
          open={newSlotVisible}
          width={720}
          title='New Tournament Slot(s)'
          onCancel={dismiss}
          footer={null}
        >
          <NewTournamentSlotForm
            sportId={location.state.sportId}
            tournamentRegimeId={tournamentRegimeId}
            dismiss={dismissNewSlotModal}
          />
        </Modal>
      </Row>
      <Row justify='center'>
        <Col span={20}>
          <Divider orientation='left'>Default Payout Settings</Divider>
        </Col>
      </Row>
      <TournamentRegimePayouts tournamentRegimeId={tournamentRegimeId} />
    </Fragment>
  );
}

export default TournamentRegimePage;