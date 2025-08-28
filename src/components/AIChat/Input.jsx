import SendIcon from "@assets/icon/SendIcon.jsx";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const Input = ({
                 className,
                 placeholder,
                 value,
                 setValue,
                 onEnter,
                 onClickButton,
                 handleComposition,
                 isLoading,
               }) => {
  const { t } = useTranslation();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (onEnter) onEnter(e); // ✅ 부모에서 전달한 onEnter만 실행
    }
  };

  return (
    <div
      className={clsx(
        "h-20 w-full max-w-(--min-screen-size) rounded-tl-010 rounded-tr-010 px-022 pt-016",
        className,
        isLoading
          ? "bg-gray-100"
          : "shadow-[0px_-2px_8px_rgba(227,227,227,0.8)]"
      )}
    >
      {isLoading ? (
        <div className="w-full flex items-center justify-center gap-2">
          <img src={"img/load-32.gif"} className="w-12 h-12" />
          <p>{t("description:description_input_loading")}</p>
        </div>
      ) : (
        <div className="flex items-start h-20 w-full">
          <input
            type="text"
            value={value}
            onKeyDown={handleKeyDown} // ✅ 여기서만 처리
            onCompositionStart={() => handleComposition?.(true)}
            onCompositionEnd={() => handleComposition?.(false)}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="w-full outline-none placeholder:text-font-500 ml-2"
            placeholder={placeholder}
          />
          <SendIcon
            className="text-primary cursor-pointer"
            onClick={onClickButton} // ✅ 버튼 클릭 시에만 실행
          />
        </div>
      )}
    </div>
  );
};

export default Input;
