import { useTranslation } from "react-i18next";

const HashtagList = ({ hashtags }) => {
  const { t } = useTranslation(["description"]);

  return (
    <div className="flex flex-col gap-2">
      <div className="pretendard_regular text-014 font-semibold text-font-900">
        {t("description:description_hashtag")}
      </div>
      <div className="flex gap-2">
        {hashtags.map((tag) => (
          <div
            key={tag}
            className="flex items-center justify-center h-8 px-3 py-1.5 rounded-lg border border-primary text-primary-700 text-014 leading-5"
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashtagList;
