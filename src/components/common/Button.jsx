import clsx from "clsx";


const Button = ({text = "test", type = "normal", className}) => {
  const buttonClass = clsx(
    "font-family-pretendard w-full h-[50px] rounded-xl cursor-pointer",
    {
      "bg-primary text-white": type === "normal",
      "bg-primary-900": type === "emphasis",
      "bg-white ": type === "disabled",
    },
    className
  )

  return (
    <button className={buttonClass}>
      {text}
    </button>
  );
};

export default Button;