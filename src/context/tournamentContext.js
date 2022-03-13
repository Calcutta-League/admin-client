import React, { createContext, useReducer, useContext } from 'react';

const TournamentStateContext = createContext();
const TournamentDispatchContext = createContext();

function tournamentReducer(state, action) {
  switch(action.type) {
    case 'update': {
      return {
        ...state,
        [action.key]: action.value
      }
    }
    case 'clear': {
      return {}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TournamentProvider(props) {
  let initialState = {...props};
  delete initialState.children;

  const [state, dispatch] = useReducer(tournamentReducer, initialState);

  return (
    <TournamentStateContext.Provider value={state}>
      <TournamentDispatchContext.Provider value={dispatch}>
        {props.children}
      </TournamentDispatchContext.Provider>
    </TournamentStateContext.Provider>
  );
}

function useTournamentState() {
  const context = useContext(TournamentStateContext);
  if (context === undefined) {
    throw new Error('useTournamentState must be used within a TournamentProvider');
  }
  return context;
}

function useTournamentDispatch() {
  const context = useContext(TournamentDispatchContext);
  if (context === undefined) {
    throw new Error('useTournamentDispatch must be used within a TournamentProvider');
  }
  return context;
}

export { TournamentProvider, useTournamentState, useTournamentDispatch };