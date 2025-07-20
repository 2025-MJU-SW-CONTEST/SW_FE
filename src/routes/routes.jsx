import React from 'react';
import {pagePath} from "@routes/pagePath.js";

import RootLayout from "@layout/RootLayout.jsx";
import Home from "@pages/Home.jsx";

const routes = [
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ]
  }

];

export default routes;