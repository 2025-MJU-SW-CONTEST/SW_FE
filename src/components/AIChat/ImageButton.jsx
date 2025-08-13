import clsx from "clsx";
import { useState } from "react";

const ImageButton = ({ Icon, text, onClick, isActive }) => {
  const [isHovered, setHovered] = useState(false);

  const activeOrHover = isActive || isHovered;

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={clsx(
        "cursor-pointer flex gap-007 items-center justify-center w-22 h-7 px-3.5 py-2.5 rounded-020",
        activeOrHover && "bg-gradient-to-r from-primary to-secondary-500",
        !activeOrHover && "hover:bg-gradient-to-r from-primary to-secondary-500"
      )}
    >
      <Icon className={activeOrHover ? "text-font-50" : "text-font-400"} />
      <p
        className={clsx(
          "font-family-pretendard text-014 leading-loose tracking-tight w-full",
          activeOrHover ? "text-font-50" : "text-font-400"
        )}
      >
        {text}
      </p>
    </button>
  );
};

export default ImageButton;
