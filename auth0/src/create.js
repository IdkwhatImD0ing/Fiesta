import {Box} from '@mui/material';
import React from 'react';

export default function Create(props) {
  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    ></Box>
  );
}
