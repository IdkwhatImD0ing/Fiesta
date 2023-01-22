import React from 'react';
import './App.css';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import Document from './_document';
import {useAuth0} from '@auth0/auth0-react';
import Create from './create';
import DisplayEvent from './components/DisplayEvent';
import { Grid } from '@mui/material'

function App() {
  const {isLoading} = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      
      {/* <Create /> */}
    </>
  );
}

export default App;
