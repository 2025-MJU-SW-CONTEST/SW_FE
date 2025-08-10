import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/store/useAuth";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuth((state) => state.setAccessToken);
  const setIsLogin = useAuth((state) => state.setIsLogin);
  const setUserInfo = useAuth((state) => state.setUserInfo);

  useEffect(() => {
    async function processOAuthCallback() {
      try {
        // 1. URL에서 카카오가 넘겨준 'code' 파라미터 파싱
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code"); // 카카오 인가 코드

        if (!authCode) {
          console.error("Authorization code not found in URL.");
          navigate("/login");
          return;
        }

        // 2. 파싱한 'code'를 백엔드의 '/auth/login'으로 보내 요청
        const response = await fetch("/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: authCode }),
        });

        if (!response.ok) {
          throw new Error(`Backend login error: ${response.status}`);
        }

        const authDto = await response.json(); // 백엔드가 DTO에 담아서 응답해주는 부분
        console.log("백엔드로부터 받은 DTO:", authDto);

        const { isRegistered, accessToken, id, nickname, email, profileUrl } =
          authDto; // DTO 필드명 확인

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("isLogin", true);
          setAccessToken(accessToken);
          setIsLogin(true);
          setUserInfo({ id, nickname, email, profileUrl });
        } else {
          console.error("Access token not found in DTO.");
          navigate("/login");
          return;
        }

        if (isRegistered) {
          navigate("/home");
        } else {
          navigate("/register", {
            state: { id, nickname, email, profileUrl },
          });
        }
      } catch (error) {
        console.error("OAuthCallback 처리 중 오류 발생:", error);
        alert("로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
        navigate("/login");
      }
    }

    processOAuthCallback();
  }, [navigate, setAccessToken, setIsLogin, setUserInfo]);

  return (
    <div>
      <p>카카오 로그인 최종 확인 중...</p>
    </div>
  );
};

export default OAuthCallback;
