import clsx from "clsx";

const CheckIcon = ({className}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 62 46"
      className={clsx("pretendard_disabled_400", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M21.681 45.7393L0 24.0583L5.42025 18.638L21.681 34.8988L56.5798 0L62 5.42025L21.681 45.7393Z"
            fill="currentColor"/>
    </svg>

  );
};

export default CheckIcon;