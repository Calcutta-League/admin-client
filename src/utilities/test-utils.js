import React from 'react'
import { render } from '@testing-library/react'
import { AuthProvider } from '../context/authContext'
import { NavProvider } from '../context/navContext'
import { GameProvider } from '../context/gameContext';


const AuthNavProviders = ({ children }) => {
  return (
    <AuthProvider>
      <NavProvider>
        {children}
      </NavProvider>
    </AuthProvider>
  );
}

const AuthNavGameProviders = ({ children }) => {
  return (
    <AuthProvider>
      <NavProvider>
        <GameProvider>
          {children}
        </GameProvider>
      </NavProvider>
    </AuthProvider>
  );
}

const AuthNavProvidersWithAuth = ({ children }) => {
  return (
    <AuthProvider authenticated={true}>
      <NavProvider>
        {children}
      </NavProvider>
    </AuthProvider>
  );
}

const AuthNavGameProvidersWithAuth = ({ children }) => {
  return (
    <AuthProvider authenticated={true}>
      <NavProvider>
        <GameProvider>
          {children}
        </GameProvider>
      </NavProvider>
    </AuthProvider>
  );
}

function providerConstructor(options) {
  let authProps = options.authProps;
  let navProps = options.navProps;
  let gameProps = options.gameProps;

  switch (options.provider) {
    case 'game':
      return (({ children }) => {
        return (
          <AuthProvider {...authProps}>
            <NavProvider {...navProps}>
              <GameProvider {...gameProps}>
                {children}
              </GameProvider>
            </NavProvider>
          </AuthProvider>
        );
      });
    default:
      return (({ children }) => {
        return (
          <AuthProvider {...authProps}>
            <NavProvider {...navProps}>
              {children}
            </NavProvider>
          </AuthProvider>
        );
      });
  }
}

const customRender = (ui, options) => {
  // render(ui, renderOptions(options));
  return render(ui, { wrapper: providerConstructor(options) });
}

const renderOptions = (options) => {
  if (options.authenticated === true) {
    switch (options.provider) {
      case 'none':
        return {}
      case 'game':
        return { wrapper: AuthNavGameProvidersWithAuth, ...options }
      default:
        return { wrapper: AuthNavProvidersWithAuth, ...options }
    }
  } else {
    switch (options.provider) {
      case 'none':
        return {}
      case 'game':
        return { wrapper: AuthNavGameProviders, ...options }
      default:
        return { wrapper: AuthNavProviders, ...options }
    }
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender }