import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Amplify from '@aws-amplify/core';
import amplifyConfig from './config/amplifyConfig';

Amplify.configure({
  Auth: {
    region: amplifyConfig.cognito.REGION,
    userPoolId: amplifyConfig.cognito.USER_POOL_ID,
    userPoolWebClientId: amplifyConfig.cognito.APP_CLIENT_ID,
    authenticationFlowType: amplifyConfig.cognito.AUTH_FLOW
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
