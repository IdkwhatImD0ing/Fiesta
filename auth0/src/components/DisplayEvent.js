import React from 'react'
import { Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react'

const DisplayEvent = (props) => {
    // console.log(data.example[0].name)
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const [events, setEvent] = useState([
        {
            name: "Event Name",
            description: "Short description of event",
            creator: {},
            date: "timestamp",
            location: "here",
            registered: ["name1", "name2"]
        },
        {
            name: "Event Name 2",
            description: "Short description of event",
            creator: {},
            date: "timestamp 2",
            location: "here 2",
            registered: ["name1", "name2"]
        }
    ])
    // console.log(event)
    
    return (
        // <Box
        // m='auto'
        // mt={5}
        // display="flex" 
        // width={350} height={200} 
        // alignItems="center"
        // justifyContent="center"
        // >
            
            <Card sx={{ 
                // maxWidth: 300, 
                minWidth: 200,
                // margin: 3,
                // padding: 2
                }} 
                variant="outlined"
            >
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" component="div">
                        {events.map((event) => {
                            return (
                                event.name
                            )
                        })}
                    </Typography>
                    <Typography variant="body2">
                        {events[1].description}
                    <br />
                        {events[1].location}
                    </Typography>
                </CardContent>
                {isAuthenticated && (
                <CardActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' size="small">Sign up for this event</Button>
                </CardActions>
                )}
                {!isAuthenticated && (
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    Sign in/Sign up to reserve your spot
                </Typography>
                )}
            </Card>
        // </Box>
    )
}

export default DisplayEvent