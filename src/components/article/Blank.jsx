import CalendarIcon from "@assets/icon/CalendarIcon.jsx";
import CloseIcon from "@assets/icon/Article/CloseIcon.jsx";

import clsx from "clsx";
import {useTranslation} from "react-i18next";

const Blank = ({type}) => {
  const {t} = useTranslation(["description"]);
  return (
    <div className={clsx("flex flex-col items-center mt-[130px]", type === "date" ? " gap-[29px]": "gap-[9px]")}>
      {type === "date" && <CalendarIcon/>}
      {type === "article" && <CloseIcon/>}
      <p className="pretendard_regular whitespace-pre-line text-center">{
        type === "article" ? t("description_calendar_02") :
        t("description_calendar_01")
      }</p>
    </div>
  );
};

export default Blank;