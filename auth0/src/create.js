import {Box, Stack, TextField, Typography, Button} from '@mui/material';
import React, {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {useAuth0} from '@auth0/auth0-react';
import io from 'socket.io-client';
const socket = io();

export default function Create(props) {
  const {user} = useAuth0();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState(dayjs(new Date()));

  useEffect(() => {
    return () => {
      socket.on('create-success', (data) => {
        console.log(data);
      });
      socket.on('create-error', (data) => {
        console.log(data);
      });
      return () => {
        socket.off('create-success');
        socket.off('create-error');
      };
    };
  }, []);

  const handleSubmit = () => {
    if (eventName === '' || eventDescription === '' || eventDate === '') {
      alert('Please fill out all fields');
      return;
    }
    const event = {
      name: eventName,
      description: eventDescription,
      location: location,
      date: eventDate,
      user: user,
    };
    socket.emit('create', event);
  };
  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        display: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.default',
        marginTop: '10vh',
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        <Typography variant="h2">Create Event</Typography>
        <TextField
          id="outlined-basic"
          label="Event Name"
          variant="outlined"
          onChange={(event) => {
            setEventName(event.target.value);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Date"
            value={eventDate}
            onChange={(val) => setEventDate(val)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Event Description"
          variant="outlined"
          multiline
          onChange={(event) => {
            setEventDescription(event.target.value);
          }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Create Event
        </Button>
      </Stack>
    </Box>
  );
}
