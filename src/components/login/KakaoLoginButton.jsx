import React, { useState } from "react";
import KaKaoIcon from "@/assets/icon/KakaoIcon";

const KakaoLoginButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLoginClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/auth/login");
      if (!response.ok)
        throw new Error("로그인 URL을 가져오는데 실패했습니다.");

      const data = await response.json();
      const { loginUrl } = data; // 백엔드에서 보내주는 로그인 URL 필드명 확인 필요

      if (loginUrl) {
        // 실제 로그인 URL로 이동
        window.location.href = loginUrl;
      } else {
        alert("로그인 URL이 존재하지 않습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("로그인 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLoginClick}
      disabled={loading}
      className="flex items-center justify-center bg-[#FEE500] rounded-006 w-75 h-14 px-3.5"
      type="button"
    >
      <KaKaoIcon />
    </button>
  );
};

export default KakaoLoginButton;
