import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@components/common/Button.jsx";
import BackHeader from "@/components/common/BackHeader";
import InterpretationInput from "@/components/home/InterpretationInput";
import ExclamationIcon from "@/assets/icon/ExclamationIcon";

const EditInterpretation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useTranslation([
    "backheader",
    "button",
    "description",
    "placeholder",
  ]);

  const existingContent = location.state?.existingContent || "";
  const interpretationIdFromState = location.state?.interpretationId;
  const interpretationIdFromParams = params.id || params.interpretationId;
  const interpretationId =
    interpretationIdFromState ?? interpretationIdFromParams;

  const movieId = location.state?.movieId ?? params.movieId;

  const minChars = 50;

  const [content, setContent] = useState(existingContent);
  const [isActive, setIsActive] = useState(false);

  // 디버그/표시용 현재 글자수(코드포인트 기준)
  const trimmedCodePointLength = useMemo(() => {
    const normalized = (content || "").replace(/\r\n/g, "\n").trim();
    return [...normalized].length;
  }, [content]);

  const handleCompleteButton = async () => {
    if (!isActive) {
      return;
    }

    if (!interpretationId) {
      console.error("EditInterpretation: interpretationId가 없습니다.");
      navigate(-1);
      return;
    }

    // --- 실제 API

    // mock/테스트용으로 수정된 객체 생성
    const updatedInterpretation = {
      id: interpretationId,
      content: content.trim(),
    };

    if (movieId) {
      navigate(`/movies/${movieId}`, {
        state: { updatedInterpretation },
      });
    } else {
      navigate(-1, { state: { updatedInterpretation } });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <BackHeader
        label={t("backHeader:backHeader_editInterpretation")}
        onBack={() => navigate(-1)}
      />
      <div className="flex flex-col flex-1 overflow-y-auto min-h-0">
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

export default EditInterpretation;
