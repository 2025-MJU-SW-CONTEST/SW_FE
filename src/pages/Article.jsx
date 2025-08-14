import BottomNavigation from "@components/common/BottomNavigation.jsx";
import CustomCalendar from "@components/article/CustomCalendar.jsx";
import Blank from "@assets/icon/Article/Blank.jsx";
import Divider from "@assets/icon/Article/Divider.jsx";
import AddButton from "@components/common/AddButton.jsx";
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
      <AddButton className="bottom-[85px]"/>
      <BottomNavigation/>
    </div>
  );
};

export default Article;