import clsx from "clsx";
import ImageButton from "@components/AIChat/ImageButton.jsx";
import CheckIcon from "@assets/icon/CheckIcon.jsx";
import CancelIcon from "@assets/icon/CancelIcon.jsx";
import FillyIcon from "@assets/icon/FillyIcon.jsx";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

import {useTranslation} from "react-i18next";

const ChatBubble = ({ type, contentType, message, image, createdAt, showTime, showAvatar, activeButton, onClickCheck }) => {
  const { t } = useTranslation(["button"]);
  const formatTime = (time) => dayjs(time).format("A h:mm");
  if(localStorage.getItem("isSuccess") === "false"){
    activeButton = "";
  }

  return (
    <div className={clsx("flex flex-col", type === "USER" ? "items-end" : "items-start")}>
      <div className="flex items-start gap-2.5">
        {type !== "USER" &&
          <div className="w-8 h-8 rounded-full">
            {showAvatar && <FillyIcon className="w-full h-full"/>}
        </div>}
        <div
          className={clsx(
            "flex flex-col max-w-72 min-h-10 px-3.5 py-2.5",
            type === "USER"
              ? "bg-primary rounded-tl-020 rounded-tr-020 rounded-bl-020 rounded-br-lg"
              : "bg-secondary-100 rounded-tl-2xl rounded-tr-2xl rounded-bl-md rounded-br-2xl"
          )}
        >
          {contentType === "text" && (
            <p
              className={clsx(
                "font-family-pretendard text-016 font-normal leading-tight",
                type === "USER" ? "text-font-100" : "text-font-700"
              )}
            >
              {message.split("\\n").map((line, idx) => (
                <span key={idx}>
                   {line}
                  <br />
                </span>
              ))}
            </p>
          )}
          {contentType === "image" && <img src={image} className="w-36 h-52" />}
        </div>
      </div>

      {contentType === "image" && (
        <div className={clsx("flex mt-[8px]", type !== "user" ? "pl-10" : "")}>
          <ImageButton Icon={CheckIcon} text={t("button_yes")} isActive={activeButton === "yes"} onClick={() => onClickCheck("yes")}/>
          <ImageButton Icon={CancelIcon} text={t("button_no")} isActive={activeButton === "no"} onClick={() => onClickCheck("no")} />
        </div>
      )}

      {showTime && (
        <p
          className={clsx(
            "font-family-pretendard font-normal text-012 text-font-500 mt-[10px]",
            type !== "user" ? "pl-10" : ""
          )}
        >
          {formatTime(createdAt)}
        </p>
      )}
    </div>
  );
};


export default ChatBubble;