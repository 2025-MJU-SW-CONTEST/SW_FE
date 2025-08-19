import { useTranslation } from "react-i18next";

const HashtagList = ({ hashtags, className = "" }) => {
  const { t } = useTranslation(["description"]);

  if (!Array.isArray(hashtags) || hashtags.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="pretendard_regular text-014 font-semibold text-font-900">
        {t("description:description_hashtag")}
      </div>
      <div className="flex flex-wrap gap-2">
        {hashtags.map((tag, idx) => (
          <div
            key={`${String(tag)}-${idx}`}
            className="flex items-center justify-center h-8 px-3 py-1.5 rounded-lg border border-primary text-primary-700 text-014 leading-5"
          >
            {String(tag)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashtagList;
