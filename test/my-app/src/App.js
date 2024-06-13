import React from 'react';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Owner1 from './pages/owner1';
import Owner2 from './pages/owner2';
import User from './temp_page/user';
import Verifier from './temp_page/verifier';


const router = createBrowserRouter([
  {
    path: "/owner1",
    element: <Owner1 />,
  },
  {
    path: "/owner2",
    element: <Owner2 />,
  },

  {
    path: "/user",
    element: <User />,
  },

  {
    path: "/verifier",
    element: <Verifier />,
  },

]);

const App = () => (
  <RouterProvider router={router} />
);

export default App;