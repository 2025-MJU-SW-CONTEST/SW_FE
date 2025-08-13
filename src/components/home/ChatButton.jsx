import { useTranslation } from "react-i18next";
import ChatIcon from "@/assets/icon/ChatIcon";

const ChatButton = ({ onClick }) => {
  const { t } = useTranslation(["button"]);

  return (
    <div className="flex justify-center mt-[31px] mb-[9px] ">
      <button
        onClick={onClick}
        className="flex justify-center items-center gap-2.5 w-[221px] h-12.5 py-2.5 bg-primary pretendard_bold text-016 text-primary-50 rounded-[6px] hover:bg-primary-600 transition cursor-pointer"
      >
        <ChatIcon />
        {t("button:button_chat")}
      </button>
    </div>
  );
};

export default ChatButton;
