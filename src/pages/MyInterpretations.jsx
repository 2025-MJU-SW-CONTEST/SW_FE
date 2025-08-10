import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import BackHeader from "@/components/common/BackHeader";
import InterpretationCard from "@/components/interpretation.jsx/InterpretationCard";
import ToastMessage from "@/components/common/ToastMessage";

const MyInterpretations = () => {
  const [mockInterpretations, setMockInterpretations] = useState([
    {
      id: 1,
      author: {
        nickname: "수박깔깔한 껍데기",
        profileUrl: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      content: `소니가 케이트에게 다시 만나자는 약속과 함께 새로운 대회를 찾아 나서는 장면은 희망을 잃지 않고 끈임없이 도전하는 그의 모습을 보여줍니다. 영화 속 여러 메시지를 깊게 해석했어요.`,
      hashtags: ["새로운_시대", "목표를_향해", "도전정신"],
    },
    {
      id: 2,
      author: {
        nickname: "바닷가의 고래",
        profileUrl: "https://randomuser.me/api/portraits/men/44.jpg",
      },
      content: `영화 '기생충'은 사회 계층 갈등을 흥미롭게 그려내며 웃음과 경악을 동시에 선사합니다.`,
      hashtags: ["사회문제", "계층갈등", "명작영화"],
    },
    {
      id: 3,
      author: {
        nickname: "자고싶다",
        profileUrl: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      content: `소니가 케이트에게 다시 만나자는 약속과 함께 새로운 대회를 찾아 나서는 장면은 희망을 잃지 않고 끈임없이 도전하는 그의 모습을 보여줍니다. 영화 속 여러 메시지를 깊게 해석했어요.`,
      hashtags: ["새로운_시대", "목표를_향해", "도전정신"],
    },
    {
      id: 4,
      author: {
        nickname: "집이 제일 좋아",
        profileUrl: "https://randomuser.me/api/portraits/men/44.jpg",
      },
      content: `영화 '기생충'은 사회 계층 갈등을 흥미롭게 그려내며 웃음과 경악을 동시에 선사합니다.`,
      hashtags: ["사회문제", "계층갈등", "명작영화"],
    },
    {
      id: 5,
      author: {
        nickname: "지금 새벽 4시",
        profileUrl: "https://randomuser.me/api/portraits/men/44.jpg",
      },
      content: `영화 '기생충'은 사회 계층 갈등을 흥미롭게 그려내며 웃음과 경악을 동시에 선사합니다.`,
      hashtags: ["사회문제", "계층갈등", "피곤"],
    },
  ]);

  const [items, setItems] = useState(mockInterpretations.slice(0, 5));
  const [toastMessage, setToastMessage] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation(["backheader", "description"]);

  // 내가 쓴 해석으로 가정
  const isMine = true;

  const fetchMoreData = () => {
    // 여기서 실제 API 콜
    setTimeout(() => {
      const nextItems = mockInterpretations.slice(
        items.length,
        items.length + 5
      );
      setItems(items.concat(nextItems));
      if (items.length + nextItems.length >= mockInterpretations.length) {
        setHasMore(false);
      }
    }, 1000);
  };

  const handleDelete = (id) => {
    const filteredAll = mockInterpretations.filter((item) => item.id !== id);
    setMockInterpretations(filteredAll);

    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);

    setToastMessage(t("description:description_toast_02"));
    setTimeout(() => setToastMessage(""), 2000);
  };

  return (
    <>
      <BackHeader
        label={t("backHeader:backHeader_myInterpretations")}
        onBack={() => navigate(-1)}
      />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="pretendard_regular text-center mb-1">로딩중...</div>
        }
        height={window.innerHeight - 106.991} // 화면 세로 크기 - 헤더 높이
      >
        <div className="flex flex-col py-[25px] px-4 gap-[25px]">
          {items.map((item) => (
            <InterpretationCard
              key={item.id}
              data={item}
              isMine={isMine}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </InfiniteScroll>
      {toastMessage && <ToastMessage message={toastMessage} />}
    </>
  );
};

export default MyInterpretations;
