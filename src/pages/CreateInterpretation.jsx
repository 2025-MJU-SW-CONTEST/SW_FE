import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ExclamationIcon from "@/assets/icon/ExclamationIcon";
import Button from "@components/common/Button.jsx";
import BackHeader from "@/components/common/BackHeader";
import InterpretationInput from "@/components/home/InterpretationInput";

const CreateInterpretation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const movieId = id;
  const { t } = useTranslation([
    "backheader",
    "button",
    "description",
    "placeholder",
  ]);

  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(content.trim().length > 0);
  }, [content]);

  const handleCompleteButton = () => {
    if (!isActive) return;
    if (!movieId) {
      console.error("movieId가 없습니다.");
      return;
    }
    // --- 실제 API 호출 예시 (axios/fetch로 대체) ---
    try {
      // 예: POST /api/movies/:movieId/interpretations
      // const res = await fetch(`/api/movies/${movieId}/interpretations`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ content: content.trim() }),
      // });
      // if (!res.ok) throw new Error("서버 에러");
      // const newInterpretation = await res.json();

      // --- 현재는 API 없으니 mock 새 항목 생성(테스트용) ---
      const newInterpretation = {
        id: Date.now(), // 임시 id
        content: content.trim(),
        author: {
          id: 101,
          nickname: "현재 사용자",
          profileUrl: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        createdAt: new Date().toISOString(),
        hashtags: ["테스트"],
      };

      // MovieDetailPage로 명시적 이동하며 state 전달 (이전 히스토리(-1)보다 안전)
      navigate(`/movies/${movieId}`, { state: { newInterpretation } });
    } catch (err) {
      console.error("해석 제출 실패", err);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <BackHeader
        label={t("backHeader:backHeader_writeInterpretation")}
        onBack={() => navigate(-1)}
      />
      <div className="flex flex-col flex-1 overflow-y-auto min-h-0 items-center">
        <InterpretationInput
          value={content}
          onChange={setContent}
          placeholder={t("placeholder:placeholder_interpretation")}
        />
        <div className="flex mt-3">
          <ExclamationIcon />
          <div className="pretendard_regular text-014 leading-6">
            {t("description:description_interpretation_announcement")}
          </div>
        </div>
        <div className="w-full px-12.5 pb-[49px] mt-auto">
          <Button
            text={t("button:button_complete")}
            type="emphasis"
            onClick={handleCompleteButton}
            isActive={isActive}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateInterpretation;
