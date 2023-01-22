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
import {useNavigate} from 'react-router';
import {useAuth0} from '@auth0/auth0-react';
import {animated, useSpring, useChain} from 'react-spring';

const DisplayEvent = (props) => {
  // console.log(data.example[0].name)
  const {isAuthenticated} = useAuth0();
  const navigate = useNavigate();

  return (
    <Grid
      item
      justifyContent="center"
      alignItems="center"
      xs={12}
      sm={6}
      key={props.id}
    >
      <animated.div style={props.animation}>
        <Box
          key={props.id}
          sx={{
            display: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Card key={props.id}>
            <CardContent key={props.id}>
              <Typography variant="h5" component="div">
                {props.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.date}
              </Typography>
            </CardContent>
            <CardActions>
              {isAuthenticated && (
                <CardActions style={{justifyContent: 'center'}}>
                  <Button
                    size="small"
                    onClick={() => {
                      navigate('/view/' + props.id);
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              )}
            </CardActions>
          </Card>
        </Box>
      </animated.div>
    </Grid>
  );
};

export default DisplayEvent;
