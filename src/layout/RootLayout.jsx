import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex justify-center w-dvw h-dvh bg-black">
      <div className="w-(--min-screen-size) h-full bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
