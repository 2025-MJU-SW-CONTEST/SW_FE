import React from "react";
import KakaoLoginButton from "@/components/login/KakaoLoginButton";

const Login = () => {
  return (
    <div className="flex flex-col items-center gap-[189px]">
      <div className="mt-[198px] size-80 rounded-full bg-gray-300">
        {/*아직 디자인 안됨*/}
      </div>
      <div className="mb-[89px]">
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default Login;
