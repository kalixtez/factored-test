import React from 'react'
import ReactDOM from 'react-dom/client'

import Login from './Login.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Profile from './Profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/profile",
    element: <Profile/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);