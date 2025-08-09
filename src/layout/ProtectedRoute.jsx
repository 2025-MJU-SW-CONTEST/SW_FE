import {Navigate, Outlet} from "react-router-dom";
import {pagePath} from "@routes/pagePath.js";

const ProtectedRoute = () => {
  const isLogin = localStorage.getItem("isLogin");

  if (!isLogin) {
    return <Navigate to={"/" + pagePath.ONBOARDING} />;
  }

  return (
    <div className="flex justify-center w-dvw h-dvh">
      <div className="w-(--min-screen-size) h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoute;