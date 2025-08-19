import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getMovieDetail } from "@/apis/movieService";
import { toImageUrl } from "@/utils/images";
import useAuth from "@/store/useAuth";
import BackHeader from "@/components/common/BackHeader";
import MoviePoster from "@/components/home/MoviePoster";
import TabMenu from "@/components/home/TabMenu";
import Synopsis from "@/components/home/Synopsis";
import MovieRating from "@/components/home/MovieRating";
import CastList from "@/components/home/CastList";
import ChatButton from "@/components/home/ChatButton";
import MovieInterpretationTab from "@/components/home/MovieInterpretationTab";
import ToastMessage from "@/components/common/ToastMessage";
import BottomNavigation from "@/components/common/BottomNavigation";

const MovieDetailPage = ({ onChat }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["title", "popup"]);
  const { id } = useParams();
  const movieId = id;
  const myId = useAuth((s) => s.userInfo?.id) ?? null;

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("basic");
  const [errorMsg, setErrorMsg] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef(null);
  const location = useLocation();

  const [tabReloadKey, setTabReloadKey] = useState(0);

  // 서버 응답
  const mapDetail = (d) => {
    const raw = d?.movieCasts?.cast ?? [];
    const cast = raw.filter(Boolean).map((c, idx) => ({
      id: c.id ?? idx,
      name: c.name ?? "이름 미정",
      character: c.character ?? "",
      photoUrl: toImageUrl(c.profile_path),
    }));

    return {
      id: d.id,
      title: d.title,
      thumbnailUrl: toImageUrl(d.thumbnailUrl),
      rating: d.rating,
      summary: d.summary ?? "",
      cast,
    };
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      setIsLoading(true);
      setErrorMsg("");
      try {
        const data = await getMovieDetail(movieId);
        if (!alive) return;
        setMovie(mapDetail(data));
      } catch (err) {
        console.error("영화 상세 로딩 실패:", err);
        if (!alive) return;
        setErrorMsg(t("description:description_no_contents"));
      } finally {
        if (alive) setIsLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [movieId, t]);

  useEffect(() => {
    const state = location.state;
    if (!state) return;

    if (state.openTab === "interpretation") {
      setActiveTab("interpretation");
    }
    if (state.forceReload) {
      setTabReloadKey((k) => k + 1);
    }

    if (state.showCreateToast) {
      setToastMessage(t("popup:popup_toast_01"));
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => {
        setToastMessage("");
        toastTimerRef.current = null;
      }, 2000);
    }

    if (state.showDeleteToast) {
      setToastMessage(t("popup:popup_toast_02"));
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => {
        setToastMessage("");
        toastTimerRef.current = null;
      }, 2000);
    }

    if (state.showUpdateToast) {
      setToastMessage(t("popup:popup_toast_03"));
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => {
        setToastMessage("");
        toastTimerRef.current = null;
      }, 2000);
    }

    navigate(location.pathname, { replace: true, state: null });
  }, [location.key, t, navigate, location.pathname]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="pretendard_regular text-center text-font-400 mt-8">
        로딩중...
      </div>
    );
  }

  if (errorMsg || !movie) {
    return (
      <div className="pretendard_regular text-center text-font-400 mt-8">
        {errorMsg || "해당 영화 정보를 불러올 수 없습니다."}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen relative">
      <BackHeader label={movie.title} onBack={() => window.history.back()} />
      <div
        id="detailScrollable"
        className="flex-1 overflow-y-auto items-center pt-[31px] pb-20"
      >
        <div className="px-9.5">
          <MoviePoster
            src={movie.thumbnailUrl}
            alt={movie.title}
            className={"rounded-lg"}
          />
          <TabMenu activeTab={activeTab} onChange={setActiveTab} />
        </div>
        {activeTab === "basic" ? (
          <div className="px-9.5">
            <Synopsis text={movie.summary} />
            <div className="flex flex-col gap-4 w-full mt-6 ">
              <div className="pretendard_bold text-018 leading-6">
                {t("title:title_movie_detail_rating")}
              </div>
              <MovieRating rating={movie.rating} />
            </div>
            <div className="flex flex-col gap-3.5 w-full mt-10 ">
              <div className="pretendard_bold text-018 leading-6">
                {t("title:title_movie_detail_casting")}
              </div>
              <CastList cast={movie.cast || []} />
            </div>
            <ChatButton onClick={onChat} />
          </div>
        ) : (
          <MovieInterpretationTab
            key={`${movieId}-${tabReloadKey}`}
            currentUserId={myId}
            movieId={movieId}
          />
        )}
      </div>
      {toastMessage && <ToastMessage message={toastMessage} />}
      <BottomNavigation />
    </div>
  );
};

export default MovieDetailPage;
