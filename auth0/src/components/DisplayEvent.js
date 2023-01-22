import React from 'react';
import EventDetails from '../events/EventDetails'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  Grid
} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react';
import { useState} from 'react';

const DisplayEvent = (props) => {
  // console.log(data.example[0].name)
  const {loginWithRedirect, isAuthenticated} = useAuth0();
  



  const [detail, setDetail] = useState(EventDetails);
  return (
    <Grid container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={15}
      rowSpacing={1}>
      
    {detail.map((event) => (
      
      <Box 
        width="300px" 
        
        sx={{
          display: 'flex-start',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '10vh',
          marginRight: '10px',
          marginLeft: '10px'
        }}

      >
        
       
          <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {event.name}
            </Typography>
            <Typography variant="body2" color='text.secondary'>
              {event.description}
              <br/>
              {event.location}
              <br/>
              {event.date}
            </Typography>
          </CardContent>
          <CardActions>
            {isAuthenticated && (
              <CardActions style={{justifyContent: 'center'}}>
                <Button variant="contained" size="small">
                  Sign up
                </Button>
                <Button size='small'>Learn More</Button>
              </CardActions>
            )}
          </CardActions>
          </Card>
        
        
        
      </Box>
      
    ))}
    </Grid>
      
    
    
      
  );
    
  
};

export default DisplayEvent;
