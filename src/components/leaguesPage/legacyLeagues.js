import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, InputNumber, Row, Space, Table, Typography, message } from 'antd';
import useData from '../../hooks/useData';
import { API_CONFIG, MANAGEMENT_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import { ButtonTableCell } from '../buttonTableCell';
import { useTournamentDispatch, useTournamentState } from '../../context/tournamentContext';

const { Title } = Typography;
const { Column } = Table;

function LegacyLeagues() {

  const [bulkSyncNum, setBulkSyncNum] = useState(10);
  const [bulkSyncLoading, setBulkSyncLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);

  const { authenticated } = useAuthState();
  const { fetchLegacyLeaguesRefreshTrigger } = useTournamentState();

  const tournamentDispatch = useTournamentDispatch();

  const [legacyLeagues, legacyLeaguesReturnDate, fetchLegacyLeagues] = useData({
    baseUrl: API_CONFIG.MANAGEMENT_SERVICE_BASE_URL,
    endpoint: MANAGEMENT_SERVICE_ENDPOINTS.GET_LEGACY_LEAGUES,
    method: 'GET',
    refreshTrigger: fetchLegacyLeaguesRefreshTrigger,
    conditions: [authenticated]
  });

  const [syncResponse, syncReturnDate, syncLeague] = useData({
    baseUrl: API_CONFIG.MANAGEMENT_SERVICE_BASE_URL,
    endpoint: MANAGEMENT_SERVICE_ENDPOINTS.SYNC_LEAGUE,
    method: 'POST',
    conditions: [false]
  });

  const [bulkSyncResponse, bulkSyncReturnDate, bulkSync] = useData({
    baseUrl: API_CONFIG.MANAGEMENT_SERVICE_BASE_URL,
    endpoint: MANAGEMENT_SERVICE_ENDPOINTS.BATCH_SYNC_LEAGUES,
    method: 'POST',
    conditions: [false]
  });

  const [skipResponse, skipReturnDate, skipSync] = useData({
    baseUrl: API_CONFIG.MANAGEMENT_SERVICE_BASE_URL,
    endpoint: MANAGEMENT_SERVICE_ENDPOINTS.SKIP_SYNC,
    method: 'POST',
    conditions: [false]
  });

  useEffect(() => {
    if (fetchLegacyLeaguesRefreshTrigger) {
      setTableLoading(true);
    }
  }, [fetchLegacyLeaguesRefreshTrigger]);

  useEffect(() => {
    if (legacyLeaguesReturnDate) {
      setTableLoading(false);
    }

    if (legacyLeagues && legacyLeaguesReturnDate) {
      console.log(legacyLeagues);
    }
  }, [legacyLeagues, legacyLeaguesReturnDate]);

  useEffect(() => {
    if (syncReturnDate && syncResponse) {
      console.log(syncResponse);
      message.info(syncResponse?.message);
    }
  }, [syncReturnDate, syncResponse]);

  useEffect(() => {
    if (bulkSyncReturnDate) {
      setBulkSyncLoading(false);
    }

    if (bulkSyncReturnDate && bulkSyncResponse) {
      console.log(bulkSyncResponse);
      message.info(bulkSyncResponse?.message);
      tournamentDispatch({ type: 'update', key: 'fetchLegacyLeaguesRefreshTrigger', value: new Date().valueOf() });
    }
  }, [bulkSyncResponse, bulkSyncReturnDate]);

  useEffect(() => {
    if (skipReturnDate && skipResponse) {
      console.log(skipResponse);
      message.info(skipResponse);
    }
  }, [skipResponse, skipReturnDate]);

  const onBulkSyncNumChange = (value) => {
    setBulkSyncNum(value);
  }

  const triggerBulkSync = () => {
    console.log('trigger bulk sync:', bulkSyncNum);
    setBulkSyncLoading(true);
    bulkSync({ numLeagues: bulkSyncNum });
  }

  const triggerLeagueSync = (leagueId) => {
    console.log('sync league:', leagueId);
    syncLeague({ leagueId: leagueId });
  }

  const markNonLegacy = (leagueId) => {
    console.log('mark non-legacy:', leagueId);
    skipSync({ leagueId: leagueId });
  }

  return (
    <Fragment>
      <Row justify='center'>
        <Title level={2}>Legacy Leagues</Title>
      </Row>
      <Row justify='center'>
        <InputNumber
          min={1}
          max={100}
          value={bulkSyncNum}
          onChange={onBulkSyncNumChange}
        />
        <Button
          type='primary'
          loading={bulkSyncLoading}
          onClick={triggerBulkSync}
        >
          Bulk Sync
        </Button>
      </Row>
      <Row justify='center'>
        <Col lg={24} xl={20} xxl={16}>
          <Table
            dataSource={legacyLeagues || []}
            loading={tableLoading}
            rowKey='LeagueId'
            size='small'
          >
            <Column
              align='left'
              dataIndex='LeagueId'
              title='Id'
            />
            <Column
              align='left'
              dataIndex='LeagueName'
              title='Name'
            />
            <Column
              align='left'
              dataIndex='TournamentName'
              title='Tournament'
            />
            <Column
              align='left'
              dataIndex='LeagueStatus'
              title='Status'
            />
            <Column
              align='left'
              dataIndex='UserCount'
              title='Users'
            />
            <Column
              align='left'
              dataIndex='NumAuctionSales'
              title='Auction Sales'
            />
            <Column
              align='left'
              dataIndex='NumBidRules'
              title='BidRules'
            />
            <Column
              align='left'
              dataIndex='NumTaxRules'
              title='TaxRules'
            />
            <Column
              align='right'
              width={120}
              render={(text, record) => {
                return (
                  <Space>
                    <ButtonTableCell
                      type='primary'
                      size='small'
                      cancelLoading={syncReturnDate}
                      onClick={(event) => {
                        event.stopPropagation();
                        triggerLeagueSync(record.LeagueId);
                      }}
                    >
                      Sync
                    </ButtonTableCell>
                    <ButtonTableCell
                      type='primary'
                      size='small'
                      cancelLoading={skipReturnDate}
                      onClick={(event) => {
                        event.stopPropagation();
                        markNonLegacy(record.LeagueId);
                      }}
                    >
                      Mark Non-Legacy
                    </ButtonTableCell>
                  </Space>
                )
              }}
            />
          </Table>
        </Col>
      </Row>
    </Fragment>
  );
}

export default LegacyLeagues;