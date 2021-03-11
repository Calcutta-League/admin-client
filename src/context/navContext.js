import React, { createContext, useReducer, useContext } from 'react'
import { calcuttaStore } from '../utilities/helper';

const NavStateContext = createContext()
const NavDispatchContext = createContext()

function navReducer(state, action) {
  switch (action.type) {
    case 'update': {
      setNavStorage(state, action);
      return {
        ...state,
        [action.key]: action.value
      }
    }
    case 'clear': {
      clearNavStorage();
      return {};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

/**
 * Stores context state in localstorage so that important lookup keys can be persisted through refreshes
 * @function setNavStorage
 * @param {Object} state - navContext's current state object
 * @param {Object} action - contains data for the next state update
 */
function setNavStorage(state, action) {
  let contextState = {
    ...state,
    [action.key]: action.value
  };
  
  calcuttaStore('set', 'navContext', contextState);
}

/**
 * Retrieves nav context data from localstorage to initialize certain component state after a refresh
 * @function getNavStorage
 */
function getNavStorage() {
  let contextState = calcuttaStore('get', 'navContext');

  return contextState === null ? {} : contextState;
}

function clearNavStorage() {
  calcuttaStore('clear', 'navContext');
}

function NavProvider(props) {
  let initialState = {...props};
  delete initialState.children;
  // initialize state from localstorage
  const [state, dispatch] = useReducer(navReducer, getNavStorage());

  return (
    <NavStateContext.Provider value={state}>
      <NavDispatchContext.Provider value={dispatch}>
        {props.children}
      </NavDispatchContext.Provider>
    </NavStateContext.Provider>
  );
}

function useNavState() {
  const context = useContext(NavStateContext);
  if (context === undefined) {
    throw new Error('useNavState must be used within a NavProvider');
  }
  return context;
}

function useNavDispatch() {
  const context = useContext(NavDispatchContext);
  if (context === undefined) {
    throw new Error('useNavDispatch must be used within a NavProvider');
  }
  return context;
}

export { NavProvider, useNavState, useNavDispatch }