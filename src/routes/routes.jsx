import React from "react";
import { pagePath } from "@routes/pagePath.js";

import RootLayout from "@layout/RootLayout.jsx";
import ProtectedRoute from "@layout/ProtectedRoute.jsx";

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
    element: <RootLayout />,
    children: [
      {
        path: pagePath.ONBOARDING,
        element: <Onboarding />,
      },
      {
        path: pagePath.LOGIN,
        element: <Login />,
      },
      {
        path: pagePath.REGISTER,
        element: <Register />,
      },
      {
        path: pagePath.ARTICLE,
        element: <Article />,
      },
      {
        path: pagePath.AICHAT,
        element: <AIChat />,
      },
      {
        path: pagePath.MYPAGE,
        element: <Mypage />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ]
  }
];

export default routes;
