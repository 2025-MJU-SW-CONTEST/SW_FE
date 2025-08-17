import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { getMovieDetail } from "@/apis/movieService";
import { toImageUrl } from "@/utils/images";

const MovieDetailPage = ({ onChat }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["title"]);
  const { id } = useParams();
  const movieId = id;

  const [movie, setMovie] = useState(null);
  const [interpretationsPage, setInterpretationsPage] = useState({
    items: [],
    page: 0,
    hasMore: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("basic");
  const [errorMsg, setErrorMsg] = useState("");

  const currentUserId = 101;
  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef(null);
  const location = useLocation();

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
      interpretations: [], // 해석 API 필요
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
    // 로그로 상태 확인
    console.log("location.state on mount/change:", location.state);

    const state = location.state;
    if (!state) return;

    // 새 해석 추가
    if (state.newInterpretation) {
      const newIt = state.newInterpretation;
      setMovie((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          interpretations: [newIt, ...(prev.interpretations || [])],
        };
      });
      setActiveTab("interpretation");
      setToastMessage(t("description:description_toast_01"));
    }

    // 수정 반영
    if (state.updatedInterpretation) {
      const updated = state.updatedInterpretation;
      setMovie((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          interpretations: (prev.interpretations || []).map((it) =>
            it.id === updated.id ? { ...it, ...updated } : it
          ),
        };
      });
      setActiveTab("interpretation");
      setToastMessage(t("description:description_toast_update")); // 수정 완료 토스트 키
    }
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimerRef.current = null;
    }, 2000);

    // state 처리가 끝났으면 한 번만 clear — replace 로 현재 경로에 state 제거
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

  const handleDeleteInterpretation = (interpretationId) => {
    if (!movie) return;

    // 1) 로컬 movie 상태에서 해당 해석 제거
    setMovie((prev) => {
      if (!prev) return prev;
      const updatedInterpretations = (prev.interpretations || []).filter(
        (it) => it.id !== interpretationId
      );
      return {
        ...prev,
        interpretations: updatedInterpretations,
      };
    });

    // 2) 전역 mock 데이터 동기화 — 목데이터를 직접 수정하는 경우
    //    실제 API 사용 시에는 여기서 서버 DELETE 호출을 하고 성공 시 상태를 갱신
    const globalIndex = mockMovieDetails.findIndex((m) => m.id === movie.id);
    if (globalIndex !== -1) {
      mockMovieDetails[globalIndex] = {
        ...mockMovieDetails[globalIndex],
        interpretations: mockMovieDetails[globalIndex].interpretations.filter(
          (it) => it.id !== interpretationId
        ),
      };
    }

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(t("description:description_toast_02"));
    toastTimerRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimerRef.current = null;
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen relative">
      <BackHeader label={movie.title} onBack={() => window.history.back()} />
      <div className="flex-1 overflow-y-auto items-center pt-[31px] pb-20">
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
            <>
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
            </>
          </div>
        ) : (
          <MovieInterpretationTab
            interpretations={movie.interpretations || []}
            currentUserId={currentUserId}
            onDelete={handleDeleteInterpretation}
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
