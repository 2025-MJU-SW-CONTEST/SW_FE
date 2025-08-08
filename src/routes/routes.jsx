import React from 'react';
import {pagePath} from "@routes/pagePath.js";

import RootLayout from "@layout/RootLayout.jsx";
import Onboarding from "@pages/Onboarding.jsx";
import Login from "@pages/Login.jsx";
import Register from "@pages/Register.jsx";
import Home from "@pages/Home.jsx";
import AIChat from "@pages/AIChat.jsx";
import Article from "@pages/Article.jsx";
import Mypage from "@pages/Mypage.jsx";

const routes = [
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        index: pagePath.ONBOARDING,
        element: <Onboarding />,
      },
      {
        index: pagePath.LOGIN,
        element: <Login />,
      },
      {
        index: pagePath.REGISTER,
        element: <Register />,
      },
      {
        path: pagePath.ARTICLE,
        element: <Article/>
      },
      {
        path: pagePath.AICHAT,
        element: <AIChat/>
      },
      {
        path: pagePath.MYPAGE,
        element: <Mypage/>
      },
    ]
  }

];

export default routes;