import React from 'react';
import { Router } from '@reach/router';
import { Layout, Result } from 'antd';
import 'antd/dist/antd.css';

import Sidenav from './components/navigation/sidenav';
import { NavProvider } from './context/navContext';
import Games from './components/games/games';
import Topnav from './components/navigation/topnav';
import { AuthProvider } from './context/authContext';
import AuthModal from './components/modals/authModal';
import Tournaments from './components/tournaments/tournaments';
import TournamentPage from './components/tournaments/tournamentPage';
import TournamentRegimePage from './components/tournaments/tournamentRegimePage';
import { TournamentProvider } from './context/tournamentContext';

const { Header, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout style={{ height: '100vh' }}>
        <AuthProvider>
          <NavProvider>
            <Header style={{ padding: '0' }}>
              <Topnav />
            </Header>

            <Layout style={{ height: 'calc(100vh - 64px)' }}>
              <Sidenav />

              <Layout>
                <Content>
                  <Router>
                    <Games path='/games' />
                    <TournamentProvider path='/tournaments'>
                      <Tournaments path='/' />
                      <TournamentPage path='/:tournamentId' />
                      <TournamentRegimePage path='/tournamentRegime/:tournamentRegimeId' />
                    </TournamentProvider>
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
            <AuthModal />
          </NavProvider>
        </AuthProvider>
      </Layout>
    </div>
  );
}

export default App;
