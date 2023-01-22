import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router';
import {useReadChannelState} from '@onehop/react';
import {Box, Typography, Button} from '@mui/material';
import {Stack} from '@mui/system';
import {useAuth0} from '@auth0/auth0-react';
import {joinEvent, leaveEvent} from './components/firebaseHelper';
import {socket} from './index';

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
  }, []);

  if (state) {
    return (
      <Box
        width="100%"
        height="100"
        sx={{
          display: 'flex-start',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10vh',
        }}
      >
        <Stack direction="column" alignItems="center" justifyContent="center">
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
          <Typography variant="h5" align="center">
            Created by: {state.creator.name}
          </Typography>
          <Typography variant="h4" align="center">
            {state.date}
          </Typography>
          <Typography variant="h4" align="center">
            {state.location}
          </Typography>
          <Typography variant="h6" paragraph align="center">
            {state.description}
          </Typography>
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
                  {state.registered[key].name}
                </Typography>
              );
            })
          }
          {!isAuthenticated ? (
            <Typography variant="h6" paragraph align="center">
              Please log in to register for this event!
            </Typography>
          ) : (
            <>
              {!registered ? (
                <Button
                  onClick={() => {
                    socket.emit('join', {user: user, channelId: id});
                  }}
                >
                  Register!
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    socket.emit('leave', {user: user, channelId: id});
                  }}
                >
                  Unregister for this Event
                </Button>
              )}
            </>
          )}
        </Stack>
      </Box>
    );
  }
}
