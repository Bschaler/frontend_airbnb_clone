import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import SpotsIndex from './components/Spots/SpotsIndex';
import SpotDetail from './components/Spots/SpotDetail';
import CreateSpotForm from './components/Spots/CreateSpotForm';
import ManageSpots from './components/Spots/ManageSpots';
import EditSpots from './components/Spots/EditSpots';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotsIndex/>
      },
      {
      path: '/spots/:spotId',
      element: <SpotDetail/>
      },
      {
        path: '/spots/new',
        element: <CreateSpotForm/>
      },
      {
        path: '/spots/current',
        element: <ManageSpots/>
      },
      {
        path: '/spots/:spotId/edit',
        element: <EditSpots/>
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetail/>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;