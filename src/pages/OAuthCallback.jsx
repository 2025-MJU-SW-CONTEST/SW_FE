import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/store/useAuth";
import Spinner from "@/components/login/Spinner";

const API = import.meta.env.VITE_API_BASE_URL;

const OAuthCallback = () => {
  const navigate = useNavigate();
  const setAuthenticated = useAuth((s) => s.setAuthenticated);
  const setNeedsRegister = useAuth((s) => s.setNeedsRegister);
  const setChecking = useAuth((s) => s.setChecking);

  const processedRef = useRef(false);

  useEffect(() => {
    async function processOAuthCallback() {
      if (processedRef.current) return;
      processedRef.current = true;

      try {
        if (!API) {
          console.error("API 베이스 URL이 없습니다. .env.local 확인 필요");
          return navigate("/login", { replace: true });
        }

        setChecking();

        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code");
        if (!authCode) {
          console.error("Authorization code not found in URL.");
          return navigate("/login", { replace: true });
        }

        const res = await fetch(
          `${API}/auth/login/kakao?code=${encodeURIComponent(authCode)}`,
          { method: "GET" }
        );
        if (!res.ok) throw new Error(`Backend login error: ${res.status}`);

        // 토큰 헤더에 있는지 확인
        const authHeader =
          res.headers.get("Authorization") || res.headers.get("authorization");
        const tokenFromHeader = authHeader
          ? authHeader.replace(/^Bearer\s+/i, "")
          : null;

        let dto = {};
        try {
          dto = await res.json();
        } catch (_) {
          dto = {};
        }

        console.log("백엔드 DTO:", dto, "AuthHeader:", authHeader);

        const isRegistered =
          (dto.isRegistered ?? dto.registered ?? false) === true;

        if (!isRegistered) {
          // 회원가입 대기 상태 저장(새로고침 대비)
          setNeedsRegister({
            email: dto.email ?? null,
            nickname: dto.nickname ?? null,
            profileUrl: dto.profileUrl ?? null,
            tempToken: dto.tempToken ?? tokenFromHeader ?? null,
          });

          return navigate("/register", {
            replace: true,
            state: {
              email: dto.email ?? null,
              nickname: dto.nickname ?? null,
              profileUrl: dto.profileUrl ?? null,
              tempToken: dto.tempToken ?? tokenFromHeader ?? null,
            },
          });
        }

        // 가입 완료 사용자: 토큰이 바디 또는 헤더에 있어야 함
        const finalToken = dto.accessToken ?? tokenFromHeader;
        if (!finalToken) {
          console.error("가입 사용자지만 토큰이 바디/헤더 어디에도 없음");
          return navigate("/login", { replace: true });
        }

        setAuthenticated({
          token: finalToken,
          user: {
            id: dto.id ?? null,
            nickname: dto.nickname ?? null,
            email: dto.email ?? null,
            profileUrl: dto.profileUrl ?? null,
          },
        });
        localStorage.setItem("isLogin", true)
        return navigate("/", { replace: true });
      } catch (e) {
        console.error("OAuthCallback 처리 중 오류:", e);
        return navigate("/login", { replace: true });
      }
    }

    processOAuthCallback();
  }, [navigate, setAuthenticated, setNeedsRegister, setChecking]);

  return <Spinner message="카카오 로그인 최종 확인 중..." />;
};

export default OAuthCallback;
