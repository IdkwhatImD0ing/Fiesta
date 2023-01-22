import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import Create from './create';
import HomePage from './home';
import View from './view';
import NavBar from './components/NavBar';
import './App.css';
import Loading from './loading';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <NavBar />
        <HomePage />
      </>
    ),
  },
  {
    path: '/create',
    element: (
      <>
        <NavBar />
        <Create />
      </>
    ),
  },
  {
    path: '/view/:id',
    element: (
      <>
        <NavBar />
        <View />
      </>
    ),
  },
]);

function App() {
  const {isLoading} = useAuth0();
  if (isLoading) return <Loading />;
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
