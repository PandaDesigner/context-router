import { createBrowserRouter } from 'react-router-dom';
import { LayaoutRoute, LayoutPrivate } from '../layouts';
import { Dashboard, Home } from '../pages';

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
