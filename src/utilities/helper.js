/**
 * Interacts with the localstorage API - primarily used by React context for persisting data through refreshes
 * @function calcuttaStore
 * @param {string} action 
 * @param {string} key 
 * @param {object} data 
 */
const calcuttaStore = (action, key, data) => {
  if (action === 'get') {
    let storageObj = JSON.parse(localStorage.getItem(key));

    return storageObj;
  } else if (action === 'set') {
    localStorage.setItem(key, JSON.stringify(data));

    return true;
  } else if (action === 'clear' && key !== undefined) {
    localStorage.removeItem(key);
  } else {
    localStorage.clear();
  }
}

const teamDisplayName = ({ name, seed }) => {
  if (seed !== undefined && seed !== null) {
    return `(${+seed}) ${name}`;
  }

  return name;
}

const dateTimeDisplay = (dateString) => {
  let date = new Date(dateString);

  return date.toLocaleDateString();
}

export {
  calcuttaStore,
  teamDisplayName,
  dateTimeDisplay
};