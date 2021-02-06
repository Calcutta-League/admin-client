import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useGameState, useGameDispatch } from '../../context/gameContext';
import { Table, Typography, InputNumber, Row, Col, Input, Button, Tag } from 'antd';
import GameService from '../../services/games/games.service';
import { GAME_SERVICE_ENDPOINTS } from '../../utilities/constants';
import { useAuthState } from '../../context/authContext';
import { teamDisplayName, dateTimeDisplay } from '../../utilities/helper';
import { CheckCircleOutlined, ExclamationCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

function GamesList(props) {

  const gameColumns = [
    {
      title: 'Home',
      dataIndex: 'Team1Name',
      render: (text, record) => {
        return <Text>{teamDisplayName({ name: record.Team1Name, seed: record.Team1Seed })}</Text>
      }
    },
    {
      title: 'Score',
      dataIndex: 'Team1Score',
      render: (text, record) => {
        return (
          <InputNumber
            size='small'
            min={0}
            max={1000}
            defaultValue={record.Team1Score}
            onChange={(val) => {
              let params = {
                gameId: record.GameId,
                score: +val,
                isHome: true
              }
              scoreChange(params);
            }}
          />
        );
      }
    },
    {
      title: 'Away',
      dataIndex: 'Team2Name',
      render: (text, record) => {
        return <Text>{teamDisplayName({ name: record.Team2Name, seed: record.Team2Seed })}</Text>
      }
    },
    {
      title: 'Score',
      dataIndex: 'Team2Score',
      render: (text, record) => {
        return (
          <InputNumber
            size='small'
            min={0}
            max={1000}
            defaultValue={record.Team2Score}
            onChange={(val) => {
              let params = {
                gameId: record.GameId,
                score: +val,
                isHome: false
              }
              scoreChange(params);
            }}
          />
        );
      }
    },
    {
      title: 'Overtime',
      dataIndex: 'Overtime',
      align: 'center',
      render: (text, record) => {
        return (
          <Input
            type='checkbox'
            size='small'
            id={record.GameId}
            defaultChecked={record.Overtime}
            onChange={handleOvertimeFlag} 
          />
        );
      }
    },
    {
      title: 'Postponed',
      dataIndex: 'Postponed',
      align: 'center',
      render: (text, record) => {
        return (
          <Input
            type='checkbox'
            size='small'
            id={record.GameId}
            defaultChecked={record.Postponed}
            onChange={handlePostponedChange} 
          />
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'GameId',
      align: 'center',
      render: (text, record) => {
        let icon = <CheckCircleOutlined />;
        let color = 'success';
        
        if (record.Team1Score === null || record.Team2Score === null) {
          icon = <ExclamationCircleOutlined />;
          color = 'warning';
        }

        if (record.Postponed == true) {
          icon = <ClockCircleOutlined />;
          color = 'error';
        }

        return <Tag color={color}>{icon}</Tag>;
      }
    }
  ];

  const { sportId, gameDate } = useGameState();
  const { authenticated, token } = useAuthState();

  const gameDispatch = useGameDispatch();

  const [games, setGames] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [updateScoresLoading, setUpdateScoresLoading] = useState(false);

  const scoresRef = useRef({});

  useEffect(() => {
    requestGames();

    // add logic to request new metadata when the search date gets to a new point
    if (!!authenticated) {
      getGamesMetadata();
    }
  }, [sportId, gameDate, authenticated]);

  const requestGames = () => {
    if (sportId && gameDate && authenticated) {
      // send API request
      setTableLoading(true);
      console.log('request games for sportId: ' + sportId + ' on ' + gameDate);
      GameService.callApi(GAME_SERVICE_ENDPOINTS.GET_GAMES_BY_SPORT_ID, {
        token: token,
        sportId: sportId,
        gameDate: gameDate
      }).then(response => {
        console.log(response);
        setTableLoading(false);
        setGames(response.data);
      }).catch(error => {
        setTableLoading(false);
        console.log(error);
      });
    }
  }

  const getGamesMetadata = () => {
    let searchDate = new Date();
    let dateString = `${searchDate.getFullYear()}-${searchDate.getMonth() + 1}-${searchDate.getDate()}`;

    GameService.callApi(GAME_SERVICE_ENDPOINTS.GET_GAMES_METADATA, {
      token: token,
      sportId: sportId,
      searchDate: dateString
    }).then(response => {
      console.log(response);
      gameDispatch({ type: 'update', key: 'gamesMetadataArr', value: response.data });
    }).catch(error => {
      console.log(error);
    });
  }

  const scoreChange = ({ gameId, score, isHome }) => {
    console.log(gameId, score, isHome);

    if (scoresRef.current[gameId] === undefined) {
      scoresRef.current[gameId] = {};
    }

    if (isHome) {
      scoresRef.current[gameId].Team1Score = score;
    } else {
      scoresRef.current[gameId].Team2Score = score;
    }
  }

  const handleOvertimeFlag = (event) => {
    let gameId = event.target.id;

    if (scoresRef.current[gameId] === undefined) {
      scoresRef.current[gameId] = {};
    }

    scoresRef.current[gameId].Overtime = event.target.checked;
  }

  const handlePostponedChange = (event) => {
    let gameId = event.target.id;

    if (scoresRef.current[gameId] === undefined) {
      scoresRef.current[gameId] = {};
    }

    scoresRef.current[gameId].Postponed = event.target.checked;
  }

  const updateScores = (event) => {
    setUpdateScoresLoading(true);
    
    console.log(scoresRef.current);

    GameService.callApi(GAME_SERVICE_ENDPOINTS.UPDATE_SCORES, {
      token: token,
      data: scoresRef.current
    }).then(response => {
      console.log(response);
      setUpdateScoresLoading(false);
      scoresRef.current = {};
      requestGames();
    }).catch(error => {
      setUpdateScoresLoading(false);
      scoresRef.current = {};
      console.log(error);
    });
  }

  return (
    <Fragment>
      <Row gutter={[0, 16]} justify='center'>
        <Button
          type='primary'
          loading={updateScoresLoading}
          onClick={updateScores}
        >
          Update Scores
        </Button>
      </Row>
      <Row justify='center'>
        <Col lg={24} xl={20} xxl={16}>
          <Table
            columns={gameColumns}
            dataSource={games}
            loading={tableLoading}
            pagination={false}
            rowKey='GameId'
            size='small'
          />
        </Col>
      </Row>
    </Fragment>
  );
}

export default GamesList;