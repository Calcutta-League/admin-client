import React from 'react';
import { Layout, Result } from 'antd';

import Sidenav from './components/navigation/sidenav';
import { NavProvider } from './context/navContext';
import Games from './components/games/games';
import Topnav from './components/navigation/topnav';
import { AuthProvider } from './context/authContext';
import AuthModal from './components/modals/authModal';
import Tournaments from './components/tournaments/tournaments';
import TournamentPage from './components/tournamentPage/tournamentPage';
import TournamentRegimePage from './components/tournamentRegimePage/tournamentRegimePage';
import { TournamentProvider } from './context/tournamentContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LegacyLeagues from './components/leaguesPage/legacyLeagues';

const { Header, Content } = Layout;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout style={{ height: '100vh' }}>
          <AuthProvider>
            <NavProvider>
              <Header style={{ padding: '0' }}>
                <Topnav />
              </Header>

              <Layout style={{ height: 'calc(100vh - 64px)' }}>
                <Sidenav />

                <Layout>
                  <Content style={{ overflow: 'auto', paddingBottom: '12px' }}>
                    <TournamentProvider>
                      <Routes>
                        <Route path='/games' element={<Games />} />
                        <Route path='/tournaments' element={<Tournaments />} />
                        <Route path='/tournaments/:tournamentId' element={<TournamentPage />} />
                        <Route path='/tournaments/tournamentRegime/:tournamentRegimeId' element={<TournamentRegimePage />} />
                        <Route path='/leagues' element={<LegacyLeagues />} />
                        {/* <Sports path='/sports' />
                        <Tournaments path='/tournaments' />
                        <Leagues path='/leagues' />
                        <Users path='/users' /> */}
                        {/* <Result
                          status="404"
                          title="404"
                          subTitle="Page not found"
                          default
                        /> */}
                      </Routes>
                    </TournamentProvider>
                  </Content>
                </Layout>
              </Layout>
              <AuthModal />
            </NavProvider>
          </AuthProvider>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
