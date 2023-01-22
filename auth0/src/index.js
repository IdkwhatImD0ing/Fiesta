import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';
import {hop} from '@onehop/client';
import io from 'socket.io-client';
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from '@mui/material/styles';

const themeOptions = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#FDB813',
      light: '#FFD700',
      dark: '#F9A825 ',
    },
    secondary: {
      main: '#BFBFBF',
      light: '#C0C0C0',
      dark: '#A9A9A9 ',
    },
    background: {
      default: '#000000',
    }
  },
});

hop.init({
  projectId: 'project_MTAxMTgzMzg3MDI5NjEwNTA1',
});
export const socket = io('https://scheduler.hop.sh/');

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <ThemeProvider theme={themeOptions}>
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
