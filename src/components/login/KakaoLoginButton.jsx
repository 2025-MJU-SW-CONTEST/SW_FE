import React, { useState } from "react";
import KaKaoIcon from "@/assets/icon/KakaoIcon";
import Spinner from "./Spinner";

const KakaoLoginButton = () => {
  const [loading, setLoading] = useState(false);

  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const handleLoginClick = () => {
    try {
      setLoading(true);

      const state = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
      sessionStorage.setItem("kakao_oauth_state", state);

      const base = "https://kauth.kakao.com/oauth/authorize";
      const params = new URLSearchParams({
        response_type: "code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        scope: "account_email,profile_nickname",
        state,
      });

      window.location.assign(`${base}?${params.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleLoginClick}
        disabled={loading}
        className="flex items-center justify-center bg-[#FEE500] rounded-006 w-75 h-14 px-3.5"
        type="button"
      >
        <KaKaoIcon />
      </button>
      {loading && (
        <FullPageSpinner message="카카오 로그인 페이지로 이동 중..." />
      )}
    </>
  );
};

export default KakaoLoginButton;
