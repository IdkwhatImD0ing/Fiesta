import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';
import NavBar from './components/NavBar';

import {hop} from '@onehop/client';
import io from 'socket.io-client';

hop.init({
  projectId: 'project_MTAxMTgzMzg3MDI5NjEwNTA1',
});
export const socket = io('localhost:5000');

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <NavBar />
    <App />
  </Auth0Provider>,
  document.getElementById('root'),
);
