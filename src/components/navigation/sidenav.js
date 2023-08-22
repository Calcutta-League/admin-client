import React from 'react';
import { Menu, Layout } from 'antd';
import { UserOutlined, TrophyOutlined, TableOutlined, FireOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import { useNavState, useNavDispatch } from '../../context/navContext';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const menuItems = [
  {
    key: 'games',
    icon: <FireOutlined />,
    label: 'Games'
  },
  {
    key: 'sports',
    icon: <DeploymentUnitOutlined />,
    label: 'Sports'
  },
  {
    key: 'tournaments',
    icon: <TrophyOutlined />,
    label: 'Tournaments'
  },
  {
    key: 'leagues',
    icon: <TableOutlined />,
    label: 'Leagues'
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'Users'
  }
];

function Sidenav() {

  const navigate = useNavigate();

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
        items={menuItems}
      />
    </Sider>
  )
}

export default Sidenav;