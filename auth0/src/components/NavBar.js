import {AppBar, Typography, Stack, Button, Box, Toolbar} from '@mui/material';

import {useAuth0} from '@auth0/auth0-react';
import Profile from './Profile';
import * as React from 'react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
  const {isAuthenticated, loginWithRedirect} = useAuth0();

  return (
    <Box sx={{flexGrow: 1, position: 'absolute'}}>
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
          <Link to={'/'} style={{textDecoration: 'none', color: 'black'}}>
            <Typography variant="h6" noWrap component="div">
              Event Finder
            </Typography>
          </Link>
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
