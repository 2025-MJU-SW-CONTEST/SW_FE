import React from 'react';
import {Outlet} from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex justify-center w-dvw h-dvh">
      <div className="min-w-(--min-screen-size) w-(--min-screen-size) h-full">
        <Outlet/>
      </div>
    </div>
  );
};

export default RootLayout;