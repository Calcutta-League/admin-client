import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useAuthState } from '../context/authContext';

/**
 * @function useData - custom hook for hitting an API endpoint
 * @param {Object} options
 * @param {String} options.baseUrl - base url for the requested api service
 * @param {String} options.endpoint - API endpoint
 * @param {String} options.method - HTTP method
 * @param {Object} options.headers - HTTP headers
 * @param {Object} options.payload - HTTP payload - used for POST requests
 * @param {Function} options.processData - function for processing data returned by the API
 * @param {Number} options.refreshTrigger - changing this value will trigger another API call with the same configuration
 * @param {Array} options.conditions - a list of conditions that must evaluate to true in order to make the api call
 * @returns {[Array<Any>, Number, Function]}
 */
function useData({ baseUrl, endpoint, method, headers = {}, payload = {}, processData, refreshTrigger, conditions = [] }) {

  const [data, setData] = useState();
  const [fetchDate, setFetchDate] = useState();
  const [isValid, setIsValid] = useState(false);

  const { token } = useAuthState();

  // used for dependency arrays
  const [stringifiedEndpoint, stringifiedHeaders] = [endpoint, JSON.stringify(headers)];

  // If no processing function is passed just return the data
  // The callback hook ensures that the function is only created once
  // and hence the effect hook below doesn't start an infinite loop
  const processJson = useCallback(processData || ((jsonBody) => jsonBody), []);

  useEffect(() => {
    setIsValid(evaluateConditions());
  }, [...conditions]);

  useEffect(() => {
    if (isValid) {
      setData(null);
      fetchApi().then(data => {
        setData(data);
        setFetchDate(new Date().valueOf());
      });
    }
  }, [stringifiedEndpoint, stringifiedHeaders, processJson, refreshTrigger, isValid]);

  const evaluateConditions = () => {
    if (conditions.length == 0) return true;

    for (let condition of conditions) {
      if (!condition) return false;
    }

    return true;
  }

  const generateRequestOptions = ({ endpoint, method, headers = {}, payload = {} }) => {
    let options = {
      url: baseUrl + endpoint,
      headers: headers,
      method: method
    };

    if (token) {
      options.headers['x-cognito-token'] = token;
    }

    if (method == 'POST') {
      options.data = payload
    }

    return options;
  }

  const fetchApi = () => {
    let options = generateRequestOptions({ endpoint, method, headers, payload });

    return new Promise((resolve, reject) => {
      axios(options).then(response => {
        resolve(processJson(response.data));
      }).catch(error => {
        console.log(error);
        reject(error);
      });
    });
  };

  /**
   * @function
   * @description manual option for calling the API endpoint with an arbitrary payload. This method bypasses the conditions check and immediately sends the HTTP request
   * @param {Object} payload - payload for the HTTP request
   */
  const callApi = (payload) => {
    const options = generateRequestOptions({ endpoint, method, headers, payload });

    setData(null);
    axios(options).then(response => {
      setData(processJson(response.data));
      setFetchDate(new Date().valueOf());
    }).catch(error => {
      console.log(error);
    });
  }

  return [data, fetchDate, callApi];
};

export default useData;