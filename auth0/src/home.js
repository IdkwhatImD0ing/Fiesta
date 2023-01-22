import React, {useEffect, useState} from 'react';
import DisplayEvent from './components/DisplayEvent';
import {Grid, Box, Button, Typography, Stack} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react';

import SpashPage from './spash';
import {getAllEvents} from './components/firebaseHelper';

export default function HomePage(props) {
  const {isAuthenticated} = useAuth0();
  const {user} = useAuth0();
  const [events, setEvent] = useState(null);
  useEffect(() => {
    getAllEvents(user).then((data) => {
      setEvent(data);
    });
  }, [user]);
  return (
    <>
      {isAuthenticated ? (
        <Box
          height="100%"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10vh',
          }}
        >
          <Stack
            width="100%"
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={4}
          >
            {events && Object.keys(events).length === 0 && (
              <Typography variant="h4">
                You have no events! Create one below!
              </Typography>
            )}
            <Button variant="contained" href="/create">
              Create an Event!
            </Button>
            <Typography variant="h2">Your Events: </Typography>
            {events && (
              <Grid width="100%" container spacing={4}>
                {Object.keys(events).map((event) => (
                  <DisplayEvent
                    name={events[event].eventName}
                    date={Date(events[event].eventDate).toString()}
                    id={event}
                  />
                ))}
              </Grid>
            )}
          </Stack>
        </Box>
      ) : (
        <SpashPage />
      )}
    </>
  );
}
