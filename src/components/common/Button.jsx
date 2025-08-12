import clsx from "clsx";

const Button = ({ text, type, className, onClick, isActive = true }) => {
  const buttonClass = clsx(
    "font-family-pretendard w-full h-[50px] rounded-006 cursor-pointer leading-loose text-016 font-bold focus:outline-none",
    isActive ? {
      "bg-primary text-primary-50": type === "normal",
      "bg-gradient-to-r from-primary to-secondary-500 text-primary-50": type === "emphasis",
      "bg-font-50 text-font-400": type === "disabled",
    } : "bg-font-200 text-font-400"
    ,
    className
  );

  return (
    <button className={buttonClass} onClick={onClick} disabled={!isActive}>
      {text}
    </button>
  );
};

export default Button;
