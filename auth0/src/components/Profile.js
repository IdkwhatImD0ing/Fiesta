import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
import Avatar from '@mui/material/Avatar';

const Profile = () => {
  const {user, isAuthenticated} = useAuth0();
  console.log(user);
  return (
    isAuthenticated && (
      <div className="profile">
        <img src={user.picture} alt={user.name} />
        <h2>Welcome back, {user.name}!</h2>
        <p>Logged in as {user.email}</p>
        {/* <JSONPretty data={user} /> */}
        {/* {JSON.stringify(user, null, 2)} */}
      </div>
    )
  );
};

export default Profile;
