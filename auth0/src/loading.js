import {Box, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';

export default function Loading() {
  const [prompt, setPrompt] = useState(false);

  // After 5 seconds, show the prompt
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrompt(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Box
      width="100vw"
      height="100vh"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div id="preloader">
        <div id="loader"></div>
      </div>
      <Typography variant="h6" noWrap component="div">
        {!prompt ? 'Loading...' : 'Did you copy the link correctly?'}
      </Typography>
    </Box>
  );
}
