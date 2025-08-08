import {Navigate, Outlet} from "react-router-dom";
import {useState} from "react";
import {pagePath} from "@routes/pagePath.js";

const RootLayout = () => {
  const [isLogin, setIsLogin] = useState(false);

  if(!isLogin){
    return (
      <Navigate to={'/' + pagePath.ONBOARDING} replace/>
    )
  }
  return (
    <div className="flex justify-center w-dvw h-dvh">
      <div className="w-(--min-screen-size) h-full">
        <Outlet/>
      </div>
    </div>
  );
};

export default RootLayout;