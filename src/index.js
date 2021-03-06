import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';

import { Auth0Provider } from './utilities/auth-wrapper.js';
import config from './utilities/auth_config.js';
import * as Sentry from '@sentry/browser';

import ApolloClient from 'apollo-boost';
import { render } from 'react-dom';
// import { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

Sentry.init({ dsn: `${process.env.REACT_APP_SENTRY_DSN}` });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const client = new ApolloClient({
  uri: process.env.REACT_APP_GQL_API,
});

const ApolloApp = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Router>
        <Auth0Provider
          domain={config.domain}
          audience={config.audience}
          client_id={config.clientId}
          redirect_uri={window.location.origin}
          onRedirectCallback={onRedirectCallback}
        >
          <App />
        </Auth0Provider>
      </Router>
    </ApolloProvider>
  </Provider>
);
render(<ApolloApp />, document.getElementById('root'));
