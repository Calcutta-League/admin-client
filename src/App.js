import React from 'react';
import { Router } from '@reach/router';
import { Layout, Result } from 'antd';
import 'antd/dist/antd.css';

import Sidenav from './components/sidenav/sidenav';
import { NavProvider } from './context/navContext';
import Games from './components/games/games';

const { Header, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout style={{ height: '100vh' }}>
        {/* <AuthProvider> */}
          <NavProvider>
            <Header style={{ padding: '0 25px' }}>
              {/* <Topnav /> */}
            </Header>

            <Layout style={{ height: 'calc(100vh - 64px)' }}>
              <Sidenav />

              <Layout>
                <Content>
                  <Router>
                    <Games path='/games' />
                    {/* <Sports path='/sports' />
                    <Tournaments path='/tournaments' />
                    <Leagues path='/leagues' />
                    <Users path='/users' /> */}
                    <Result
                      status="404"
                      title="404"
                      subTitle="Page not found"
                      default
                    />
                  </Router>
                </Content>
              </Layout>
            </Layout>
          </NavProvider>
        {/* </AuthProvider> */}
      </Layout>
    </div>
  );
}

export default App;
