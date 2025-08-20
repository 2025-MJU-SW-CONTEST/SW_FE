import {useTranslation} from "react-i18next";
import FillyIcon from "@assets/icon/FillyIcon.jsx";
import NewChatIcon from "@assets/icon/NewChatIcon.jsx";

const AppBar = ({onClickNewChat}) => {
  const { t } = useTranslation(["title"]);

  return (
    <div className="flex items-end justify-between h-13.5 pb-010 px-[19px] pt-010 rounded-bl-010 rounded-br-010 shadow-[0px_1px_9.699999809265137px_0px_rgba(227,227,227,1.00)]">
      <div className="flex items-end gap-013">
        <div className="w-[31px] h-[31px] rounded-2xl bg-secondary-50">
          <FillyIcon className="w-full h-full"/>
        </div>
        <p className="pretendard_bold text-020">{t("title_fily")}</p>
      </div>
      <button className="cursor-pointer" onClick={onClickNewChat}>
        <NewChatIcon/>
      </button>
    </div>
  );
};

export default AppBar;