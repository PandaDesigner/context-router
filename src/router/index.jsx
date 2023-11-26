import { createBrowserRouter } from 'react-router-dom';
import { LayaoutRoute, LayoutPrivate } from '../layouts';
import { Dashboard, Home, Logins, Register } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayaoutRoute />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Logins />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: 'dashboard',
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Dashboard />
          }
        ]
      }
    ]
  }
]);
