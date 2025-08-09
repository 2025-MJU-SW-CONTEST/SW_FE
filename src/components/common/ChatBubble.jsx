import clsx from "clsx";
import ImageButton from "@components/AIChat/ImageButton.jsx";
import CheckIcon from "@assets/icon/CheckIcon.jsx";
import CancelIcon from "@assets/icon/CancelIcon.jsx";

import {useTranslation} from "react-i18next";

const ChatBubble = ({type = "others", contentType = "text", text, image}) => {
  const {t} = useTranslation(["button"]);

  return (
    <div>
      <p className="font-family-pretendard font-normal text-012 text-font-500 text-center mb-[10px]">2025.08.26</p>
      <div className={clsx("flex flex-col", type === "me" ? "items-end": "items-start")}>
        <div className="flex items-start gap-2.5">
          {type === "others" && <div className="w-8 h-8 rounded-full bg-secondary"/>}
          <div
            className={clsx(
              "flex flex-col max-w-72 min-h-10 px-3.5 py-2.5 ",
              type ==="me" ? "bg-primary rounded-tl-020 rounded-tr-020 rounded-bl-020 rounded-br-lg " : "bg-secondary-100 rounded-tl-2xl rounded-tr-2xl rounded-bl-md rounded-br-2xl"
              )}>
            {contentType === "text" &&
              <p className="font-family-pretendard text-016 font-normal text-font-700 leading-tight">{text}</p>}
            {contentType === "image" && <img src={image} className="w-36 h-52"/>}
          </div>
        </div>
        {contentType === "image" && <div className={clsx("flex mt-[8px]", type === "others" ? "pl-10" : "")}>
          <ImageButton Icon={CheckIcon} text={t("button_yes")}/>
          <ImageButton Icon={CancelIcon} text={t("button_no")}/>
        </div>}
        <p className={clsx("font-family-pretendard font-normal text-012 text-font-500 mt-[10px]", type === "others" ? "pl-10" : "")}>오후 7:42</p>
      </div>
    </div>

  );
};

export default ChatBubble;