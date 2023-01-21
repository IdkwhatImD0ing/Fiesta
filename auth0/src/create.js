import {Box, Stack, TextField, Typography, Button} from '@mui/material';
import React, {useState} from 'react';
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';

export default function Create(props) {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(dayjs(new Date()));

  const handleSubmit = () => {
    if (eventName === '' || eventDescription === '' || eventDate === '') {
      alert('Please fill out all fields');
      return;
    }
    const event = {
      name: eventName,
      description: eventDescription,
      date: eventDate,
    };
    console.log(event);
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
