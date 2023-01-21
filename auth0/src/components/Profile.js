import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
import Avatar from '@mui/material/Avatar';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <div className='profile'>
                <Avatar className='avatar' src={user.picture} alt={user.name} style={{ justifyContent: "center", display: "flex" }}/>
                <h2 className='welcome-message'>Welcome back, {user.name}!</h2>
                <p className='welcome-email'>Logged in as {user.email}</p>
                {/* <JSONPretty data={user} /> */}
                {/* {JSON.stringify(user, null, 2)} */}
            </div>
        )
        
    )
  );
};

export default Profile;
