import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { useAuthState, useAuthDispatch } from '../../context/authContext';
import { useNavDispatch } from '../../context/navContext';
import { getCurrentSession, signOut } from '../../services/auth/auth.service';
import { SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

function Topnav() {

  const { authenticated } = useAuthState();

  const navDispatch = useNavDispatch();
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    getCurrentSession().then(session => {
      console.log(session);
      let token = session.idToken?.jwtToken;
      if (token !== undefined) {
        authDispatch({ type: 'update', key: 'token', value: token });
      }
    });
  }, []);

  const handleMenuClick = (event) => {
    console.log(event);
    if (event.key == 'signin') {
      navDispatch({ type: 'update', key: 'authModalVisible', value: true });
    } else if (event.key == 'signout') {
      signOut().then(response => {
        authDispatch({ type: 'clear' });
      }).catch(error => {
        // error handling?
      });
    }
  }

  const generateAuthMenu = () => {
    console.log(!!authenticated);
    if (!!authenticated) {
      return (
        <SubMenu icon={<SettingOutlined />} title='My Account' style={{ float: 'right' }}>
          <Menu.Item key='signout' style={{ marginLeft: 'auto' }}>
            Sign out
          </Menu.Item>
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key='signin' style={{ float: 'right' }}>
          Sign In
        </Menu.Item>
      );
    }
  }

  return (
    <Menu
      mode='horizontal'
      theme='dark'
      selectable={false}
      onClick={handleMenuClick}
    >
      <Menu.Item key='brand' style={{ fontSize: '32px' }}>
        Admin
      </Menu.Item>
      {generateAuthMenu()}
    </Menu>
  )
}

export default Topnav;