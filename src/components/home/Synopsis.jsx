import { useTranslation } from "react-i18next";

const Synopsis = ({ text }) => {
  const { t } = useTranslation(["title"]);

  return (
    <div className="flex flex-col gap-[9px] mt-[23px]">
      <div className="pretendard_bold text-018 leading-6">
        {t("title:title_movie_detail_synopsis")}
      </div>
      <div className="pretendard_regular text-014">{text}</div>
    </div>
  );
};

export default Synopsis;
