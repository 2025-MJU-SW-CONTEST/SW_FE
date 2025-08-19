import { useMemo, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import {
  updateAnalysis,
  mapAnalysis,
  getAnalysisById,
} from "@/apis/analysisService";
import Button from "@components/common/Button.jsx";
import BackHeader from "@/components/common/BackHeader";
import InterpretationInput from "@/components/home/InterpretationInput";

const EditInterpretation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const textareaRef = useRef(null);
  const { t } = useTranslation([
    "backheader",
    "button",
    "description",
    "placeholder",
  ]);

  const existingContent = location.state?.existingContent || "";
  const interpretationId =
    location.state?.interpretationId || params.id || params.interpretationId;

  const movieId = location.state?.movieId || params.movieId;

  const minChars = 50;
  const maxChars = 1000;

  const [content, setContent] = useState(existingContent);
  const [isActive, setIsActive] = useState(false);

  const totalLength = useMemo(() => [...(content || "")].length, [content]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, text }) =>
      updateAnalysis({ analysisId: id, content: text }),
    onSuccess: () => {
      const latestSent = (textareaRef.current?.value ?? content).trim();

      if (movieId) {
        // 수정 성공 → 해석 탭 열기 + 강제 리로드(서버 최신 반영)
        navigate(`/movies/${movieId}`, {
          replace: true,
          state: {
            openTab: "interpretation",
            forceReload: true,
            showUpdateToast: true,
          },
        });
      } else {
        navigate("/mypage/interpretations", {
          replace: true,
          state: {
            showUpdateToast: true,
            updatedInterpretation: {
              id: interpretationId,
              content: latestSent,
            },
          },
        });
      }
    },
    onError: (err) => {
      console.error(
        "[analysis:update:error]",
        err?.response?.status,
        err?.response?.data || err
      );
      alert("수정에 실패했어요. 잠시 후 다시 시도해 주세요.");
    },
  });

  const handleCompleteButton = async () => {
    if (!interpretationId) {
      navigate(-1);
      return;
    }
    const latest = (textareaRef.current?.value ?? content).trim();

    if (!isActive) return;

    await mutateAsync({ id: interpretationId, text: latest });
  };

  return (
    <div className="flex flex-col h-screen">
      <BackHeader
        label={t("backHeader:backHeader_editInterpretation")}
        onBack={() => navigate(-1)}
      />
      <div className="flex flex-col flex-1 overflow-y-auto min-h-0">
        <InterpretationInput
          ref={textareaRef}
          value={content}
          onChange={setContent}
          placeholder={t("placeholder:placeholder_interpretation")}
          minChars={minChars}
          maxChars={maxChars}
          onValidityChange={setIsActive}
        />
        <div className="w-full px-12.5 pb-[49px] mt-auto">
          <Button
            text={t("button:button_complete")}
            type="emphasis"
            onClick={handleCompleteButton}
            isActive={isActive && !isPending && totalLength <= maxChars}
          />
        </div>
      </div>
    </div>
  );
};

export default EditInterpretation;
