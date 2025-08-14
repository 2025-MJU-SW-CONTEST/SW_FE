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
import OAuthCallback from "@/pages/OAuthCallback";
import MovieDetailPage from "@/pages/MovieDetailPage";
import MyInterpretations from "@/pages/MyInterpretations";
import MyNicknameChange from "@/pages/MyNicknameChange";
import EditInterpretation from "@/pages/EditInterpretation";
import CreateInterpretation from "@/pages/CreateInterpretation";

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
      {
        path: pagePath.OAUTH_CALLBACK_KAKAO,
        element: <OAuthCallback />,
      },
      {
        path: pagePath.MOVIE_DETAIL,
        element: <MovieDetailPage />,
      },
      {
        path: pagePath.MY_INTERPRETATIONS,
        element: <MyInterpretations />,
      },
      {
        path: pagePath.MY_NICKNAME,
        element: <MyNicknameChange />,
      },
      {
        path: pagePath.CREATE_INTERPRETATION,
        element: <CreateInterpretation />,
      },
      {
        path: pagePath.EDIT_INTERPRETATION,
        element: <EditInterpretation />,
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
    ],
  },
];

export default routes;
