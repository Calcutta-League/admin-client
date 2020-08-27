import React from 'react';
import { Menu, Layout } from 'antd';
import { UserOutlined, TrophyOutlined, TableOutlined, FireOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import { useNavState, useNavDispatch } from '../../context/navContext';
import { navigate } from '@reach/router';

const { Sider } = Layout;

function Sidenav() {

  const { selectedMenuItem } = useNavState();

  const navDispatch = useNavDispatch();

  const handleSidenavClick = (event) => {
    navigate(`/${event.key}`);

    navDispatch({ type: 'update', key: 'selectedMenuItem', value: event.key });
  }

  return (
    <Sider width={200}>
      <Menu
        mode='inline'
        onClick={handleSidenavClick}
        defaultSelectedKeys={['games']}
        selectedKeys={[selectedMenuItem]}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key='games' icon={<FireOutlined />}>
          Games
        </Menu.Item>
        <Menu.Item key='sports' icon={<DeploymentUnitOutlined />}>
          Sports
        </Menu.Item>
        <Menu.Item key='tournaments' icon={<TrophyOutlined />}>
          Tournaments
        </Menu.Item>
        <Menu.Item key='leagues' icon={<TableOutlined />}>
          Leagues
        </Menu.Item>
        <Menu.Item key='users' icon={<UserOutlined />}>
          Users
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidenav;