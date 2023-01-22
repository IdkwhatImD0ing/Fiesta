import {AppBar, Typography, Stack, Button, Box, Toolbar} from '@mui/material';

import {useAuth0} from '@auth0/auth0-react';
import Profile from './Profile';
import * as React from 'react';

const NavBar = (props) => {
  const {window} = props;
  const {user, isAuthenticated, logout, loginWithRedirect} = useAuth0();

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'grey',
        }}
      >
        <Stack
          height="5vh"
          direction="row"
          alignItems="center"
          alignContent="center"
          justifyContent="space-between"
          sx={{
            paddingLeft: '10vw',
            paddingRight: '10vw',
          }}
        >
          <Typography variant="h6" noWrap component="div">
            Event Finder
          </Typography>
          {!isAuthenticated ? (
            <Button color="inherit" onClick={() => loginWithRedirect()}>
              Login / Signup
            </Button>
          ) : (
            <Profile />
          )}
        </Stack>
      </AppBar>
    </Box>
  );
};

export default NavBar;
