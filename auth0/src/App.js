import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import Create from './create';
import HomePage from './home';
import View from './view';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/create',
    element: <Create />,
  },
  {
    path: '/view/:id',
    element: <View />,
  },
]);

function App() {
  const {isLoading} = useAuth0();
  if (isLoading) return <div>Loading...</div>;
  return <RouterProvider router={router} />;
}

export default App;
