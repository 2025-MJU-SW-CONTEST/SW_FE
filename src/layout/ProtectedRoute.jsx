import {Navigate, Outlet} from "react-router-dom";
import {pagePath} from "@routes/pagePath.js";

const ProtectedRoute = () => {
  const isLogin = localStorage.getItem("isLogin");

  if (!isLogin) {
    return <Navigate to={"/" + pagePath.ONBOARDING} />;
  }

  return (
    <div className="flex justify-center w-dvw h-dvh bg-black">
      <div className="w-(--min-screen-size) h-full bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoute;