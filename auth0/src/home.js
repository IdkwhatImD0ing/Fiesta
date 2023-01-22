import React from 'react';
import DisplayEvent from './components/DisplayEvent';
import {Grid} from '@mui/material';

export default function HomePage(props) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <DisplayEvent />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DisplayEvent />
      </Grid>
    </Grid>
  );
}
