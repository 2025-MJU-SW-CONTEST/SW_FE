import clsx from "clsx";

const CheckIcon = ({className}) => {
  return (
    <svg
      width="26"
      height="24"
      viewBox="0 0 25 24"
      className={clsx("pretendard_disabled_400", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M10.7 18.025L5 12.325L6.425 10.9L10.7 15.175L19.875 6L21.3 7.425L10.7 18.025Z" fill="currentColor"/>
    </svg>

  );
};

export default CheckIcon;