import React, { createContext, useReducer, useContext } from 'react';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

function authReducer(state, action) {
  switch(action.type) {
    case 'update': {
      let newState;
      if (action.key === 'token') {
        newState = {
          token: action.value,
          authenticated: action.value !== undefined
        }
      } else {
        newState = {
          [action.key]: action.value
        }
      }
      return {
        ...state,
        ...newState
      }
    }
    case 'clear': {
      return {};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthProvider({children, authenticated}) {
  let initialState = {};
  if (authenticated === true) {
    initialState = {
      authenticated: true
    };
  }
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
}

function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuthState, useAuthDispatch };