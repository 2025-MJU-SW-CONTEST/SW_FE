import KebabMenu from "@components/common/KebabMenu.jsx";
import {useTranslation} from "react-i18next";

const Content = ({title, description}) => {
  const {t } = useTranslation(['title']);
  return (
    <div className="bg-secondary-50 min-h-48 rounded-010 relative p-020">
      <div className="absolute w-[5px] h-6 right-8 top-5 cursor-pointer" >
        <KebabMenu menuMargin="mr-3"/>
      </div>
      <div className="absolute w-2 h-full bg-primary top-0 "/>
      <div className="pl-[41px]">
        <p
          className="font-family-pretendard text-016 font-bold text-font-800 leading-normal tracking-wide">{t("title_movie_name")}</p>
        <p className="pretendard_regular mt-2">{title}</p>
        <p
          className="font-family-pretendard text-016 font-bold text-font-800 leading-normal tracking-wide mt-5">{t("title_movie_article")}</p>
        <p className="pretendard_regular mt-2">{description}</p>
      </div>
    </div>
  );
};

export default Content;