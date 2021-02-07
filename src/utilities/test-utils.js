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

const customRender = (ui, options) => {
  switch (options.provider) {
    case 'game':
      return render(ui, { wrapper: AuthNavGameProviders, ...options });
    default:
      return render(ui, { wrapper: AuthNavProviders, ...options });
  } 
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender }