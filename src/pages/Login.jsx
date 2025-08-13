import React from "react";
import KakaoLoginButton from "@/components/login/KakaoLoginButton";

const Login = () => {
  return (
    <div className="flex flex-col items-center gap-[253.21px]">
      <div className="mt-63.5">
        <img src="img/login.png" />
      </div>
      <div className="mb-[89px]">
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default Login;
