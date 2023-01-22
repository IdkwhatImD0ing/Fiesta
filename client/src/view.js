import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router';
import {useReadChannelState} from '@onehop/react';
import {Box, Typography, Button, Divider} from '@mui/material';
import {Stack} from '@mui/system';
import {useAuth0} from '@auth0/auth0-react';
import {joinEvent, leaveEvent} from './components/firebaseHelper';
import {socket} from './index';
import Loading from './loading';
import {animated, useSpring} from 'react-spring';

export default function View() {
  const [registered, setRegistered] = useState(false);
  const {user, isAuthenticated} = useAuth0();
  const {id} = useParams();
  const {state} = useReadChannelState(id);
  const stateRef = useRef(state);
  useEffect(() => {
    if (state && user) {
      stateRef.current = state;
      if (Object.keys(state.registered).includes(user.email)) {
        setRegistered(true);
      } else {
        setRegistered(false);
      }
    }
  }, [state, user]);

  const dropDown1 = useSpring({
    from: {opacity: 0, transform: 'translateY(-50px)'},
    to: {opacity: 1, transform: 'translateY(0px)'},
    delay: 0,
  });
  const dropDown2 = useSpring({
    from: {opacity: 0, transform: 'translateY(-50px)'},
    to: {opacity: 1, transform: 'translateY(0px)'},
    delay: 500,
  });
  const dropDown3 = useSpring({
    from: {opacity: 0, transform: 'translateY(-50px)'},
    to: {opacity: 1, transform: 'translateY(0px)'},
    delay: 1000,
  });

  useEffect(() => {
    socket.on('join-success', (data) => {
      alert('You have joined the event!');
      joinEvent(user, stateRef.current.name, stateRef.current.date, id);
    });
    socket.on('leave-success', (data) => {
      alert('You have left the event!');
      leaveEvent(user, id);
    });
    socket.on('join-error', (data) => {
      console.log(data);
    });
    socket.on('leave-error', (data) => {
      console.log(data);
    });
    return () => {
      socket.off('join-success');
      socket.off('leave-success');
      socket.off('join-error');
      socket.off('leave-error');
    };
  }, [id, user]);
  if (!state) {
    return <Loading />;
  }
  if (state) {
    return (
      <Box
        width="100%"
        height="100%"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: '10vh',
        }}
      >
        <Stack direction="column" alignItems="center" justifyContent="center">
          <animated.div style={dropDown1}>
            <Box
              sx={{
                border: '1px solid black',
                borderRadius: '10px',
                padding: '10px',
              }}
            >
              <Typography variant="h2" align="center">
                {state.name}
              </Typography>
            </Box>
            <Typography
              variant="h5"
              align="center"
              sx={{
                marginBottom: '30px',
              }}
            >
              Created by: {state.creator.nickname}
            </Typography>
          </animated.div>
          <animated.div style={dropDown2}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                marginBottom: '20px',
              }}
            >
              Date: {new Date(state.date).toString()}
            </Typography>
            <Typography variant="h4" align="center">
              Location: {state.location}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={5}
              sx={{
                marginTop: '50px',
              }}
            >
              <Typography width="300px" variant="h6">
                {state.description}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Stack
                width="300px"
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Typography variant="h6" paragraph align="center">
                  Attending users:
                </Typography>
                {
                  // Go through each key in the state.registered object
                  Object.keys(state.registered).map((key) => {
                    return (
                      <Typography
                        key={state.registered[key].email}
                        variant="h6"
                        paragraph
                        align="center"
                      >
                        {state.registered[key].nickname}
                      </Typography>
                    );
                  })
                }
              </Stack>
            </Stack>
          </animated.div>

          {!isAuthenticated ? (
            <animated.div style={dropDown3}>
              <Typography variant="h6" paragraph align="center">
                Please log in to register for this event!
              </Typography>
            </animated.div>
          ) : (
            <>
              {!registered ? (
                <animated.div style={dropDown3}>
                  <Button
                    onClick={() => {
                      socket.emit('join', {user: user, channelId: id});
                    }}
                  >
                    Register!
                  </Button>
                </animated.div>
              ) : (
                <animated.div style={dropDown3}>
                  <Button
                    onClick={() => {
                      socket.emit('leave', {user: user, channelId: id});
                    }}
                  >
                    Unregister for this Event
                  </Button>
                </animated.div>
              )}
            </>
          )}
        </Stack>
      </Box>
    );
  }
}
