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

let mockMovieDetails = [
  {
    id: 1,
    title: "하이파이브",
    posterUrl: "/img/test.png",
    rating: 8.52,
    overview:
      "최고가 되지 못한 전설 VS 최고가 되고 싶은 루키! 한때 주목받는 유망주였지만 끔찍한 사고로 F1®에서 우승하지 못하고 한순간에 추락한 드라이버 '소니 헤이스'(브래드 피트). 그의 오랜 동료인 '루벤 세르반테스'(하비에르 바르뎀)에게 레이싱 복귀를 제안받으며 최하위 팀인 APXGP에 합류한다. 그러나 팀 내 떠오르는 천재 드라이버 '조슈아 피어스'(댐슨 이드리스)와 '소니 헤이스'의 갈등은 날이 갈수록 심해지고. 설상가상 우승을 향한 APXGP 팀의 전략 또한 번번이 실패하며 최하위권을 벗어나지 못하고 고전하는데··· 빨간 불이 꺼지고 운명을 건 레이스가 시작된다!",
    director: {
      name: "조셉 코신스키",
      role: "감독",
      photoUrl: "/img/cast/joseph_kosinski.png",
    },
    cast: [
      {
        name: "브래드 피트",
        role: "주연",
        photoUrl: "/img/cast/brad_pitt.png",
      },
      {
        name: "댐슨 이드리스",
        role: "주연",
        photoUrl: "/img/cast/damson_idris.png",
      },
      {
        name: "케리 콘든",
        role: "주연",
        photoUrl: "/img/cast/kerry_condon.png",
      },
      {
        name: "케리 콘",
        role: "주연",
        photoUrl: "/img/cast/kerry_condon.png",
      },
      {
        name: "머라이어 콘든",
        role: "주연",
        photoUrl: "/img/cast/kerry_condon.png",
      },
      {
        name: "아리아나 그란데",
        role: "조연",
        photoUrl: "/img/cast/kerry_condon.png",
      },
    ],
    interpretations: [
      // 영화 해석 목록 추가
      {
        id: 1,
        author: {
          id: 101,
          nickname: "수박깔깔한 껍데기",
          profileUrl: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        content: `조슈아 피어스는 이 영화에서 단순한 서브 캐릭터가 아니라 그는 새로운 시대를 상징하고, 전설과 나란히 달릴 수 있는 가능성 그 자체입니다. 그가 있었기에 소니의 승리는 더 아름다웠고, 관객은 조슈아의 눈빛 속에서 다음 세대의 가능성을 봤죠. 다음 세대를 위한 세대 교체를 암시하였고, 소니헤이즈가 알려준 방식들로 우승 트로피를 넘기는 장면은 F1이 단순한 개개인의 스포츠가 아닌 팀플레이가 중요한 스포츠라는걸 보여주는 결말이였습니다.`,
        hashtags: ["새로운_시대", "목표를_향해", "도전정신"],
        createdAt: "2025-08-10T12:00:00Z",
      },
      {
        id: 2,
        author: {
          id: 102,
          nickname: "바닷가의 고래",
          profileUrl: "https://randomuser.me/api/portraits/men/44.jpg",
        },
        content: `소니 헤이스가 가지고 있는 카드는 일종의 부적으로, 경기 전마다 카드를 섞어 하나를 주머니에 넣는 행동은 행운을 빌거나, 자신만의 의식을 통해 심리적 안정을 찾는 것으로 보입니다. 마지막 장면에서 케이트에게 다시 만나자는 약속과 함께 새로운 대회에 도전하는 모습은 레이싱에 대한 그의 열정과 삶의 의지를 보여줍니다.`,
        hashtags: ["사회문제", "계층갈등", "명작영화"],
        createdAt: "2025-08-11T08:30:00Z",
      },
      {
        id: 3,
        author: {
          id: 102,
          nickname: "바닷가의 고래",
          profileUrl: "https://randomuser.me/api/portraits/men/44.jpg",
        },
        content: `소니 헤이스가 가지고 있는 카드는 일종의 부적으로, 경기 전마다 카드를 섞어 하나를 주머니에 넣는 행동은 행운을 빌거나, 자신만의 의식을 통해 심리적 안정을 찾는 것으로 보입니다. 마지막 장면에서 케이트에게 다시 만나자는 약속과 함께 새로운 대회에 도전하는 모습은 레이싱에 대한 그의 열정과 삶의 의지를 보여줍니다.`,
        hashtags: ["사회문제", "계층갈등", "명작영화"],
        createdAt: "2025-08-11T08:30:00Z",
      },
      {
        id: 4,
        author: {
          id: 102,
          nickname: "바닷가의 고래",
          profileUrl: "https://randomuser.me/api/portraits/men/44.jpg",
        },
        content: `소니 헤이스가 가지고 있는 카드는 일종의 부적으로, 경기 전마다 카드를 섞어 하나를 주머니에 넣는 행동은 행운을 빌거나, 자신만의 의식을 통해 심리적 안정을 찾는 것으로 보입니다. 마지막 장면에서 케이트에게 다시 만나자는 약속과 함께 새로운 대회에 도전하는 모습은 레이싱에 대한 그의 열정과 삶의 의지를 보여줍니다.`,
        hashtags: ["사회문제", "계층갈등", "명작영화"],
        createdAt: "2025-08-11T08:30:00Z",
      },
      {
        id: 5,
        author: {
          id: 102,
          nickname: "바닷가의 고래",
          profileUrl: "https://randomuser.me/api/portraits/men/44.jpg",
        },
        content: `소니 헤이스가 가지고 있는 카드는 일종의 부적으로, 경기 전마다 카드를 섞어 하나를 주머니에 넣는 행동은 행운을 빌거나, 자신만의 의식을 통해 심리적 안정을 찾는 것으로 보입니다. 마지막 장면에서 케이트에게 다시 만나자는 약속과 함께 새로운 대회에 도전하는 모습은 레이싱에 대한 그의 열정과 삶의 의지를 보여줍니다.`,
        hashtags: ["사회문제", "계층갈등", "명작영화"],
        createdAt: "2025-08-11T08:30:00Z",
      },
      {
        id: 6,
        author: {
          id: 102,
          nickname: "바닷가의 고래",
          profileUrl: "https://randomuser.me/api/portraits/men/44.jpg",
        },
        content: `소니 헤이스가 가지고 있는 카드는 일종의 부적으로, 경기 전마다 카드를 섞어 하나를 주머니에 넣는 행동은 행운을 빌거나, 자신만의 의식을 통해 심리적 안정을 찾는 것으로 보입니다. 마지막 장면에서 케이트에게 다시 만나자는 약속과 함께 새로운 대회에 도전하는 모습은 레이싱에 대한 그의 열정과 삶의 의지를 보여줍니다.`,
        hashtags: ["사회문제", "계층갈등", "명작영화"],
        createdAt: "2025-08-11T08:30:00Z",
      },
      {
        id: 7,
        author: {
          id: 102,
          nickname: "바닷가의 고래",
          profileUrl: "https://randomuser.me/api/portraits/men/44.jpg",
        },
        content: `소니 헤이스가 가지고 있는 카드는 일종의 부적으로, 경기 전마다 카드를 섞어 하나를 주머니에 넣는 행동은 행운을 빌거나, 자신만의 의식을 통해 심리적 안정을 찾는 것으로 보입니다. 마지막 장면에서 케이트에게 다시 만나자는 약속과 함께 새로운 대회에 도전하는 모습은 레이싱에 대한 그의 열정과 삶의 의지를 보여줍니다.`,
        hashtags: ["사회문제", "계층갈등", "명작영화"],
        createdAt: "2025-08-11T08:30:00Z",
      },
    ],
  },
  {
    id: 2,
    title: "엘리오",
    posterUrl: "/img/test.png",
    rating: 8.8,
    overview: "현대 음악가가 만난 특별한 여름 이야기... (줄거리 내용)",
    director: {
      name: "조셉 코신스키",
      role: "감독",
      photoUrl: "/img/cast/joseph_kosinski.png",
    },
    cast: [
      { name: "배우 1", role: "주연", photoUrl: "/img/cast/actor1.png" },
      { name: "배우 2", role: "조연", photoUrl: "/img/cast/actor2.png" },
      { name: "배우 2", role: "조연", photoUrl: "/img/cast/actor2.png" },
      { name: "배우 2", role: "조연", photoUrl: "/img/cast/actor2.png" },
      { name: "배우 2", role: "조연", photoUrl: "/img/cast/actor2.png" },
    ],
    interpretations: [
      // 영화 해석 목록 추가
      {
        id: 1,
        author: {
          id: 101,
          nickname: "수박깔깔한 껍데기",
          profileUrl: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        content: `소니가 케이트에게 다시 만나자는 약속과 ...`,
        hashtags: ["새로운_시대", "목표를_향해", "도전정신"],
        createdAt: "2025-08-10T12:00:00Z",
      },
      {
        id: 2,
        author: {
          id: 102,
          nickname: "바닷가의 고래",
          profileUrl: "https://randomuser.me/api/portraits/men/44.jpg",
        },
        content: `영화 '기생충'은 사회 계층 갈등을 흥미롭게 ...`,
        hashtags: ["사회문제", "계층갈등", "명작영화"],
        createdAt: "2025-08-11T08:30:00Z",
      },
    ],
  },
];

const MovieDetailPage = ({ onChat }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["title"]);
  const { id } = useParams();
  const movieId = id;
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const currentUserId = 101; // 임시설정

  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const found = mockMovieDetails.find((m) => m.id === Number(id));
    setMovie(found || null);
  }, [id]);

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

  if (!movie) {
    return (
      <div className="pretendard_regular text-center text-font-400 mt-8">
        해당 영화 정보를 불러올 수 없습니다.
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
            src={movie.posterUrl}
            alt={movie.title}
            className={"rounded-lg"}
          />
          <TabMenu activeTab={activeTab} onChange={setActiveTab} />
        </div>
        {activeTab === "basic" ? (
          <div className="px-9.5">
            <>
              <Synopsis text={movie.overview} />
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
                <CastList director={movie.director} cast={movie.cast} />
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
