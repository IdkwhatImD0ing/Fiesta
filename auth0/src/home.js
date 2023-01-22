import React, {useEffect, useState} from 'react';
import DisplayEvent from './components/DisplayEvent';
import {Grid, Box, Button, Typography, Stack} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react';
import {animated, useSpring} from 'react-spring';
import SpashPage from './spash';
import {getAllEvents} from './components/firebaseHelper';
import Loading from './loading';

export default function HomePage(props) {
  const {isAuthenticated} = useAuth0();
  const {user} = useAuth0();
  const [events, setEvent] = useState(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllEvents(user).then((data) => {
      setEvent(data);
      setLoading(false);
    });
  }, [user]);
  const fadeFloatDown = useSpring({
    from: {opacity: 0, transform: 'translate3d(0,-40px,0)'},
    to: {opacity: 1, transform: 'translate3d(0,0px,0)'},
    config: {duration: 500},
    delay: 500,
  });

  const zoomInFade = useSpring({
    from: {opacity: 0, transform: 'scale(0.5)'},
    to: {opacity: 1, transform: 'scale(1)'},
    config: {duration: 500},
  });

  if (loading && isAuthenticated) {
    return <Loading />;
  }
  return (
    <>
      {isAuthenticated ? (
        <Box
          height="100%"
          width="100%"
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
            {(events === undefined || Object.keys(events).length === 0) && (
              <animated.div style={zoomInFade}>
                <Typography variant="h4">
                  You have no events! Create one below!
                </Typography>
              </animated.div>
            )}
            <animated.div style={zoomInFade}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Button variant="contained" href="/create">
                  Create an Event!
                </Button>
                <Typography variant="h2">Your Events: </Typography>
              </Box>
            </animated.div>
            {events && (
              <Grid width="100%" container spacing={4}>
                {Object.keys(events).map((event) => (
                  <DisplayEvent
                    animation={fadeFloatDown}
                    name={events[event].eventName}
                    date={new Date(events[event].eventDate).toString()}
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
