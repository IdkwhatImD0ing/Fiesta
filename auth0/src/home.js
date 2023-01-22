import React from 'react';
import DisplayEvent from './components/DisplayEvent';
import {Grid, Box} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react';
import EventDetails from './events/EventDetails';

import SpashPage from './spash';

export default function HomePage(props) {
  const {isAuthenticated} = useAuth0();
  return (
    <>
      {isAuthenticated ? (
        <Box
          height="100%"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid width="50%" container spacing={4}>
            {EventDetails.map((event) => (
              <DisplayEvent {...event} />
            ))}
          </Grid>
        </Box>
      ) : (
        <SpashPage />
      )}
    </>
  );
}
