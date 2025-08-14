import CalendarIcon from "@assets/icon/CalendarIcon.jsx";
import {useTranslation} from "react-i18next";

const Blank = () => {
  const {t} = useTranslation(["description"]);
  return (
    <div className="flex flex-col items-center gap-[29px]">
      <CalendarIcon/>
      <p className="pretendard_regular">{t("description_calendar_01")}</p>
    </div>
  );
};

export default Blank;