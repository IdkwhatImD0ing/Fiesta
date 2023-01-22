import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {Avatar, Button, Stack, Typography} from '@mui/material';

const Profile = () => {
  const {user, logout} = useAuth0();
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Avatar
        className="avatar"
        src={user.picture}
        alt={user.name}
        style={{justifyContent: 'center', display: 'flex'}}
      />
      <Typography variant="h6" noWrap component="div">
        Hello {user.name}
      </Typography>
      <Button
        onClick={() => logout()}
        sx={{
          color: 'black',
        }}
      >
        Sign Out
      </Button>
    </Stack>
  );
};

export default Profile;
