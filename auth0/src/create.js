import {Box, Stack, TextField, Typography, Button, Card, CardContent, Grid} from '@mui/material';
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
        marginBottom: '10vh'
      }}
    >
      <div className="App">
        <Typography variant="h2" align="center" >Create Event</Typography>

        <Card style={{maxWidth:500, margin:"0 auto", padding: "20px 5px"}}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  id="outlined-basic"
                  label="Event Name"
                  placeholder="Enter event name"
                  variant="outlined"
                  fullWidth
                  onChange={(event) => {
                    setEventName(event.target.value);
                  }}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Date"
                    value={eventDate}
                    onChange={(val) => setEventDate(val)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid xs={12} item>
                <TextField
                id="outlined-basic"
                label="Event Description"
                placeholder="Enter description here"
                variant="outlined"
                multiline rows={4}
                fullWidth
                onChange={(event) => {
                  setEventDescription(event.target.value);
                }}
              />
              </Grid>

              <Grid xs={12} item>
                <Button variant="contained" fullWidth onClick={handleSubmit}>
                  Create Event
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>

    
    </Box>
  );
}
