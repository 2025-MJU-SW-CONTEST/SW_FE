import React from "react";
import { useTranslation } from "react-i18next";

const Synopsis = ({ text }) => {
  const { t } = useTranslation(["title", "description"]);

  const display =
    typeof text === "string" && text.trim().length > 0
      ? text
      : t("description:description_no_summary");

  return (
    <div className="flex flex-col gap-[9px] mt-[23px]">
      <div className="pretendard_bold text-018 leading-6">
        {t("title:title_movie_detail_synopsis")}
      </div>
      <div className="pretendard_regular text-014">{display}</div>
    </div>
  );
};

export default Synopsis;
