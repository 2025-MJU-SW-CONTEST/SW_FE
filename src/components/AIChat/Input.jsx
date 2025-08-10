import SendIcon from "@assets/icon/SendIcon.jsx";
import clsx from "clsx";

const Input = ({className, placeholder, value, setValue, onEnter, onClickButton, handleComposition}) => {
  return (
    <div className={clsx("flex items-start h-20 w-full max-w-(--min-screen-size) rounded-tl-010 rounded-tr-010 shadow-[0px_-2px_8px_rgba(227,227,227,0.8)] px-022 pt-016", className)}>
      <input
        type="text"
        value={value}
        onKeyDown={onEnter}
        onCompositionStart={() => handleComposition(true)}
        onCompositionEnd={() => handleComposition(false)}
        onChange={(e) => {setValue(e.target.value)}}
        className="w-full outline-none placeholder:text-font-500 ml-2"
        placeholder={placeholder}
      />
      <SendIcon className="text-primary" onClick={onClickButton}/>
    </div>

  );
};

export default Input;