import React from 'react';

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react';

const DisplayEvent = (props) => {
  // console.log(data.example[0].name)
  const {isAuthenticated} = useAuth0();
  return (
    <Grid item justifyContent="center" alignItems="center" xs={12} sm={6}>
      <Box
        sx={{
          display: 'flex-start',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '10vh',
          marginRight: '10px',
          marginLeft: '10px',
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.location}
              <br />
              {props.date}
            </Typography>
          </CardContent>
          <CardActions>
            {isAuthenticated && (
              <CardActions style={{justifyContent: 'center'}}>
                <Button size="small">Learn More</Button>
              </CardActions>
            )}
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};

export default DisplayEvent;
