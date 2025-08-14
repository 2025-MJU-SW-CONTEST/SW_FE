import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

  const minChars = 50;
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleCompleteButton = () => {
    if (!isActive) {
      return;
    }
    if (!movieId) {
      console.error("movieId가 없습니다.");
      return;
    }
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
      <div className="flex flex-col flex-1 overflow-y-auto min-h-0 ">
        <InterpretationInput
          value={content}
          onChange={setContent}
          placeholder={t("placeholder:placeholder_interpretation")}
          minChars={minChars}
          onValidityChange={setIsActive}
        />
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
