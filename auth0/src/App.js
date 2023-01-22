import React from 'react';
import './App.css';
import * as ReactDOM from 'react-dom';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {useAuth0} from '@auth0/auth0-react';
import Create from './create';

const router = createBrowserRouter([
  {
    path: '/create',
    element: <Create />,
  },
]);

function App() {
  const {isLoading} = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return <RouterProvider router={router} />;
}

export default App;
