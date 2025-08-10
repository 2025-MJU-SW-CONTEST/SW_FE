import clsx from "clsx";

const CancelIcon = ({className}) => {
  return (
    <svg width="24"
         height="24"
         viewBox="0 0 25 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         className={clsx("pretendard_disabled_400", className)}>
      <path
        d="M6.9 19L5.5 17.6L11.1 12L5.5 6.4L6.9 5L12.5 10.6L18.1 5L19.5 6.4L13.9 12L19.5 17.6L18.1 19L12.5 13.4L6.9 19Z"
        fill="currentColor"/>
    </svg>

  );
};

export default CancelIcon;