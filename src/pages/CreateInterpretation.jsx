import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import {
  createAnalysis,
  mapAnalysis,
  getAnalysisById,
} from "@/apis/analysisService";
import Button from "@components/common/Button.jsx";
import BackHeader from "@/components/common/BackHeader";
import InterpretationInput from "@/components/home/InterpretationInput";

const CreateInterpretation = () => {
  const navigate = useNavigate();
  const { id: movieId } = useParams();
  const { t } = useTranslation([
    "backheader",
    "button",
    "description",
    "placeholder",
  ]);

  const minChars = 50;
  const maxChars = 1000;

  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);

  const timerRef = useRef(null);
  const tickRef = useRef(null);

  const trimmed = useMemo(() => content.trim(), [content]);

  async function waitHashtagsReady(
    analysisId,
    { attempts = 5, interval = 1000 } = {}
  ) {
    for (let i = 0; i < attempts; i += 1) {
      try {
        const dto = await getAnalysisById(analysisId);
        const mapped = mapAnalysis(dto);
        if (Array.isArray(mapped.hashtags) && mapped.hashtags.length > 0) {
          return mapped;
        }
      } catch (e) {}
      await new Promise((r) => setTimeout(r, interval));
    }
    return null;
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ text }) => createAnalysis({ movieId, content: text }),
    onSuccess: async (dto) => {
      const id = dto?.analysis_id;
      // 0.8~1초 간격으로 최대 5회 재시도(총 4~5초)
      const ready = id
        ? await waitHashtagsReady(id, { attempts: 5, interval: 1000 })
        : null;

      // 상세로 이동: 해석 탭 열고 리로드
      navigate(`/movies/${movieId}`, {
        replace: true,
        state: {
          openTab: "interpretation",
          forceReload: true,
          showCreateToast: true,
        },
      });
    },
    onError: (err) => {
      console.error("[analysis:create:error]", err);
      alert("해석 등록에 실패했어요. 잠시 후 다시 시도해 주세요.");
    },
  });

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, []);

  const handleCompleteButton = async () => {
    if (!movieId) {
      console.error("movieId가 없습니다.");
      return;
    }

    if (!isActive || trimmed.length < minChars) return;

    if (trimmed.length > maxChars) {
      alert(`해석은 최대 ${maxChars}자까지 입력할 수 있어요.`);
      return;
    }

    await mutateAsync({ text: trimmed });
  };

  const canSubmit = isActive && !isPending && trimmed.length <= maxChars;

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
          maxChars={maxChars}
          onValidityChange={setIsActive}
        />
        <div className="w-full px-12.5 pb-[49px] mt-auto">
          <Button
            text={t("button:button_complete")}
            type="emphasis"
            onClick={handleCompleteButton}
            isActive={canSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateInterpretation;
