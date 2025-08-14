import BottomNavigation from "@components/common/BottomNavigation.jsx";
import CustomCalendar from "@components/article/CustomCalendar.jsx";
import Blank from "@assets/icon/Article/Blank.jsx";
import Divider from "@assets/icon/Article/Divider.jsx";
import {useTranslation} from "react-i18next";
const Article = () => {
  const {t} = useTranslation(["description"]);

  return (
    <div>
      <div className="mt-[21px]">
        <CustomCalendar/>
        <Divider className="mt-[33px] mb-[133px]"/>
        <Blank/>
      </div>
      <BottomNavigation/>
    </div>
  );
};

export default Article;