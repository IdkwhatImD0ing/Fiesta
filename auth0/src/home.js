import React, {Fragment} from 'react';
import DisplayEvent from './components/DisplayEvent';
import {Grid} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react';

import SpashPage from './spash';

export default function HomePage(props) {
  const {isAuthenticated} = useAuth0();
  return (
    <>
      {isAuthenticated ? (



        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Fragment>
              <DisplayEvent />
            </Fragment>
            
          </Grid>

        </Grid>
      ) : (
        <SpashPage />
      )}
    </>
  );
}
