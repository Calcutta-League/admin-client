import React, { useEffect } from 'react';
import { Col, Menu, Row } from 'antd';
import { useAuthState, useAuthDispatch } from '../../context/authContext';
import { useNavDispatch } from '../../context/navContext';
import { getCurrentSession, signOut } from '../../services/auth/auth.service';
import { SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const authenticatedDropdown = [
  {
    key: 'signout',
    label: 'Sign out',
    style: { textAlign: 'center' }
  }
];

function Topnav() {

  const { authenticated } = useAuthState();

  const navDispatch = useNavDispatch();
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    getCurrentSession().then(session => {
      let token = session.idToken?.jwtToken;
      if (token !== undefined) {
        authDispatch({ type: 'update', key: 'token', value: token });
      }
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleMenuClick = (event) => {
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
    if (!!authenticated) {
      const authSubmenu = (
        <span className='submenu-title-wrapper'>
          <SettingOutlined />
          My Account
        </span>
      );

      return [
        { key: 'auth-submenu', label: authSubmenu, style: { marginLeft: 'auto' }, children: authenticatedDropdown }
      ];
    } else {
      return [
        { key: 'signin', label: 'Sign In', style: { marginLeft: 'auto' }}
      ];
    }
  }

  return (
    <nav className='topnav'>
      <Row justify='space-between' wrap={false}>
        <Col flex='1 1 175px'>
          <Menu
            mode='horizontal'
            theme='dark'
            selectable={false}
            onClick={handleMenuClick}
            style={{ lineHeight: '64px' }}
            items={[
              { key: 'brand', label: 'Admin', style: { fontSize: '32px' }}
            ]}
          />
        </Col>
        <Col flex='0 1 200px'>
          <Menu
            mode='horizontal'
            theme='dark'
            selectable={false}
            onClick={handleMenuClick}
            style={{ lineHeight: '64px' }}
            items={generateAuthMenu()}
          />
        </Col>
      </Row>
    </nav>
  )
}

export default Topnav;