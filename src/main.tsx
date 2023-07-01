import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.tsx';
import AddCreator from './pages/addCreators.tsx';
import ShowCreators from './pages/showCreators.tsx';
import ViewCreator from './pages/viewCreator.tsx';
import EditCreator from './pages/editCreator.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add",
    element: <AddCreator />,
  },
  {
    path: "/creators",
    element: <ShowCreators />,
  },
  {
    path: "creators/:id",
    element: <ViewCreator />,
  },
  {
    path: "creators/edit/:id",
    element: <EditCreator />,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
