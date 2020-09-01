import React, { createContext, useReducer, useContext } from 'react'

const GameStateContext = createContext();
const GameDispatchContext = createContext();

function gameReducer(state, action) {
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

function GameProvider({children}) {
  const [state, dispatch] = useReducer(gameReducer, {});

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

function useGameState() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}

function useGameDispatch() {
  const context = useContext(GameDispatchContext);
  if (context === undefined) {
    throw new Error('useGameDispatch must be used within a GameProvider');
  }
  return context;
}

export { GameProvider, useGameState, useGameDispatch };