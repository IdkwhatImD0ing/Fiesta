import {Box, Button, Stack, Typography} from '@mui/material';
import React from 'react';
import {useAuth0} from '@auth0/auth0-react';

export default function SpashPage(props) {
  const {loginWithRedirect} = useAuth0();
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h1">Welcome to Event Coordinator</Typography>
        <Typography variant="h3">The #1 tool for event planning</Typography>
        <Button variant="contained" onClick={() => loginWithRedirect()}>
          Get Started Now!
        </Button>
      </Stack>
    </Box>
  );
}
