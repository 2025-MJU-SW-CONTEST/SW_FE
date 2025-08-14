import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import formatNewlines from "@/utils/formatText";
import InterpretationCard from "../interpretation.jsx/InterpretationCard";
import XIcon from "@/assets/icon/Home/XIcon";
import AddButton from "../common/AddButton";

const MovieInterpretationTab = ({
  interpretations,
  currentUserId,
  onDelete,
  movieId,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["description"]);

  // 내 해석과 타인 해석 분리
  const myInterpretations = interpretations.filter(
    (item) => item.author.id === currentUserId
  );
  const otherInterpretations = interpretations.filter(
    (item) => item.author.id !== currentUserId
  );

  const handleAddInterpretation = () => {
    console.log("현재 movieId:", movieId);
    navigate(`/movies/${movieId}/interpretation/new`);
  };

  if (interpretations.length === 0) {
    return (
      <>
        <div className="relative flex flex-col items-center mt-20 px-[23px] ">
          <XIcon className="w-16 h-16 mb-[13px]" />
          <p className="pretendard_regular text-center">
            {formatNewlines(t("description:description_no_interpretation"))}
          </p>
          <AddButton onClick={handleAddInterpretation} />
        </div>
      </>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* 해석 총 개수 */}
      <p className="w-full pl-[38px] pretendard_regular leading-6 text-font-500 pt-6.5 pb-0.5">
        {t("description:description_interpretation_count", {
          count: interpretations.length,
        })}
      </p>

      {/* 내 해석 최상단 */}
      {myInterpretations.map((item) => (
        <InterpretationCard
          key={item.id}
          data={item}
          isMine={true}
          onDelete={onDelete}
        />
      ))}

      {/* 타인 해석 */}
      {otherInterpretations.map((item) => (
        <InterpretationCard key={item.id} data={item} isMine={false} />
      ))}
      <AddButton onClick={handleAddInterpretation} />
    </div>
  );
};

export default MovieInterpretationTab;
