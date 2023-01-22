import {Box, Button, Stack, Typography} from '@mui/material';
import React from 'react';
import {useAuth0} from '@auth0/auth0-react';

export default function SpashPage(props) {
  const {loginWithRedirect} = useAuth0();

  const imgLink =
    'https://images.unsplash.com/photo-1561907484-2cfeddf02318?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80';
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: `url(${imgLink})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Blur background but not children
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Typography textAlign="center" align="left" variant="h1">
          Welcome to Fiesta
        </Typography>
        <Typography variant="h3">The #1 tool for event planning</Typography>
        <Button variant="contained" onClick={() => loginWithRedirect()}>
          Get Started Now!
        </Button>
      </Stack>
    </Box>
  );
}
