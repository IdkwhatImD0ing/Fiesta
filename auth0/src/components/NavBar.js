import {AppBar, Typography, Stack, Button, Box} from '@mui/material';

import {useAuth0} from '@auth0/auth0-react';
import Profile from './Profile';
import * as React from 'react';
import {Link} from 'react-router-dom';
import {animated, useSpring} from 'react-spring';

const NavBar = (props) => {
  const {isAuthenticated, loginWithRedirect} = useAuth0();
  const fromLeft = useSpring({
    from: {transform: 'translate3d(-50%,0,0)', opacity: 0},
    to: {transform: 'translate3d(0%,0,0)', opacity: 1},
    config: {duration: 500},
  });

  const fromRight = useSpring({
    from: {transform: 'translate3d(50%,0,0)', opacity: 0},
    to: {transform: 'translate3d(0%,0,0)', opacity: 1},
    config: {duration: 500},
  });

  return (
    <Box sx={{flexGrow: 1, position: 'absolute'}}>
      <AppBar position="fixed">
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
          <Link to={'/'} style={{textDecoration: 'none'}}>
            <animated.div style={fromLeft}>
              <Typography variant="h5" color="black" noWrap component="div">
                Fiesta
              </Typography>
            </animated.div>
          </Link>
          {!isAuthenticated ? (
            <animated.div style={fromRight}>
              <Button
                color={'inherit'}
                variant="contained"
                onClick={() => loginWithRedirect()}
              >
                Login / Signup
              </Button>
            </animated.div>
          ) : (
            <animated.div style={fromRight}>
              <Profile />
            </animated.div>
          )}
        </Stack>
      </AppBar>
    </Box>
  );
};

export default NavBar;
